// api/markdown.js

const GITHUB_OWNER = 'guyklages';
const GITHUB_REPO = 'docusaurus';
const GITHUB_BRANCH = 'main'; // change to "master" if that's your actual default branch

export async function GET(request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('path');

  if (!slug) {
    return new Response('Missing "path" query parameter.', { status: 400 });
  }

  // A single URL slug can map to different file layouts depending on which
  // docs section it came from (docs/, blog/, or a custom section like
  // portfolio/ or nium/), so try the common conventions in order and use
  // whichever one actually exists.
  const candidates = [
    `docs/${slug}.md`,
    `docs/${slug}.mdx`,
    `docs/${slug}/index.md`,
    `${slug}.md`,
    `${slug}.mdx`,
    `${slug}/index.md`,
    `blog/${slug}.md`,
    `blog/${slug}.mdx`,
  ];

  for (const path of candidates) {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;
    const res = await fetch(rawUrl);
    if (res.ok) {
      const text = await res.text();
      return new Response(text, {
        status: 200,
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      });
    }
  }

  return new Response(`No markdown source found for "${slug}".`, { status: 404 });
}