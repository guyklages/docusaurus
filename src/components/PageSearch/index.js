// Navbar search box with a live dropdown: matching pages (bold, with an
// occurrence-count badge) and, under each, the matching headings.
// Index comes from plugins/search-index and is lazy-loaded on first focus.

import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import styles from './styles.module.css';

const MIN_QUERY = 2;
const MAX_PAGES = 25;

function countOccurrences(haystack, needle) {
  let count = 0;
  let i = haystack.indexOf(needle);
  while (i !== -1) {
    count++;
    i = haystack.indexOf(needle, i + needle.length);
  }
  return count;
}

function search(index, query) {
  const q = query.trim().toLowerCase();
  if (q.length < MIN_QUERY) return [];
  const results = [];
  for (const page of index) {
    const matches = [];
    let total = 0;
    for (const s of page.sections) {
      const n = countOccurrences(s.h.toLowerCase(), q) + countOccurrences(s.t, q);
      if (n > 0) {
        matches.push({heading: s.h, anchor: s.a, count: n});
        total += n;
      }
    }
    if (total > 0) results.push({title: page.title, url: page.url, total, matches});
  }
  return results.sort((a, b) => b.total - a.total).slice(0, MAX_PAGES);
}

const hrefFor = (url, anchor) => (anchor ? `${url}#${anchor}` : url);

export default function PageSearch({mobile}) {
  const [index, setIndex] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef(null);
  const history = useHistory();

  const loadIndex = () => {
    if (index === null) {
      setLoadFailed(false);
      import('@search-index')
        .then((mod) => setIndex(mod.default))
        .catch(() => setLoadFailed(true));
    }
  };

  const results = useMemo(() => (index ? search(index, query) : []), [index, query]);
  // Flat list of headings for keyboard navigation.
  const flat = useMemo(
    () => results.flatMap((r) => r.matches.map((m) => hrefFor(r.url, m.anchor))),
    [results],
  );

  useEffect(() => setActive(-1), [query]);

  useEffect(() => {
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const close = () => setOpen(false);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat.length > 0) {
      history.push(flat[active >= 0 ? active : 0]);
      close();
    }
  };

  const showPanel = open && query.trim().length >= MIN_QUERY;
  let flatIndex = -1;

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, mobile && styles.rootMobile, 'navbar__item')}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search pages…"
        aria-label="Search pages"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          loadIndex();
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      {showPanel && (
        <div className={styles.panel} role="listbox">
          {index === null && !loadFailed && (
            <div className={styles.empty}>Loading…</div>
          )}
          {index === null && loadFailed && (
            <div className={styles.empty}>
              Couldn't load the search index.{' '}
              <button type="button" className={styles.retry} onClick={loadIndex}>
                Retry
              </button>
            </div>
          )}
          {index !== null && results.length === 0 && (
            <div className={styles.empty}>No results</div>
          )}
          {results.map((r) => (
            <div key={r.url} className={styles.page}>
              <Link to={r.url} className={styles.pageRow} onClick={close}>
                <span className={styles.pageTitle}>{r.title}</span>
                <span className={styles.badge}>{r.total}</span>
              </Link>
              {r.matches.map((m) => {
                flatIndex++;
                return (
                  <Link
                    key={m.anchor || '_top'}
                    to={hrefFor(r.url, m.anchor)}
                    className={clsx(
                      styles.heading,
                      flatIndex === active && styles.headingActive,
                    )}
                    onClick={close}>
                    <span>{m.heading}</span>
                    <span className={styles.headingCount}>{m.count}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
