// After a search result is clicked, highlight the matching text on the
// destination page, open any collapsed <details> that contain a match, and
// clear the highlight on the next click. Uses the CSS Custom Highlight API
// (no DOM changes, so React's rendering is untouched); the ::highlight style
// is in src/css/custom.css.

const STORAGE_KEY = 'pageSearchQuery';
const HIGHLIGHT_NAME = 'page-search';

export function rememberQuery(query) {
  try {
    sessionStorage.setItem(STORAGE_KEY, query.trim());
  } catch {
    // Storage unavailable (private window etc.): navigation still works.
  }
}

function takeQuery() {
  try {
    const q = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return q;
  } catch {
    return null;
  }
}

export function clearHighlight() {
  if (typeof CSS !== 'undefined' && CSS.highlights) {
    CSS.highlights.delete(HIGHLIGHT_NAME);
  }
}

function findRanges(root, query) {
  // Let any run of whitespace (including &nbsp;) in the query match any run
  // of whitespace in the page.
  const pattern = query
    .split(/\s+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[\\s\\u00a0]+');
  const regex = new RegExp(pattern, 'gi');
  const ranges = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest('script, style, noscript')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(node.data)) !== null) {
      const range = new Range();
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      ranges.push(range);
      if (m[0].length === 0) regex.lastIndex++;
    }
  }
  return ranges;
}

// Expand every collapsed <details> around the matches, outermost first.
// Docusaurus's <Details> is React-controlled, so click the <summary> (which
// runs its own handler and animation) instead of setting `open` directly.
function openDetailsAround(ranges) {
  const toOpen = new Set();
  for (const range of ranges) {
    for (
      let el = range.startContainer.parentElement?.closest('details');
      el;
      el = el.parentElement?.closest('details')
    ) {
      if (el.getAttribute('data-collapsed') === 'true' || !el.open) toOpen.add(el);
    }
  }
  const depth = (el) => {
    let d = 0;
    for (let p = el.parentElement; p; p = p.parentElement) d++;
    return d;
  };
  [...toOpen]
    .sort((a, b) => depth(a) - depth(b))
    .forEach((el) => el.querySelector(':scope > summary')?.click());
  return toOpen.size > 0;
}

export function highlightRemembered() {
  clearHighlight();
  const query = takeQuery();
  if (!query || typeof CSS === 'undefined' || !CSS.highlights) return;

  const root = document.querySelector('article') ?? document.querySelector('main');
  if (!root) return;

  const ranges = findRanges(root, query);
  if (ranges.length === 0) return;

  const opened = openDetailsAround(ranges);
  CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges));

  // Scroll the first match into view if the heading jump left it off-screen.
  // The page keeps shifting for a moment (the <details> expand animation,
  // images loading), so check again once it has settled.
  const scrollIfOffscreen = () => {
    const rect = ranges[0].getBoundingClientRect();
    if (rect.top < 80 || rect.bottom > window.innerHeight - 40) {
      ranges[0].startContainer.parentElement?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };
  setTimeout(scrollIfOffscreen, opened ? 450 : 0);
  setTimeout(scrollIfOffscreen, 1500);

  // Clear on the next click anywhere. Added on a timer so the click that
  // started the navigation can't clear it.
  setTimeout(() => {
    document.addEventListener('mousedown', clearHighlight, {once: true});
  }, 0);
}
