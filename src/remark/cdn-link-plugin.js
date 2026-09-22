// src/remark/cdn-link-plugin.js
//
// Docusaurus/remark plugin: rewrites paths starting with a chosen prefix
// (default "@cdn/") into full CDN URLs at build time. This lets you type
// short, VS-Code-autocompletable paths in your markdown while the actual
// files live on GitHub/jsDelivr, not in your deployed site.
//
// Usage in markdown or MDX:
//   ![My Photo](@cdn/Edutainme/photo1.jpg)
//   <img src="@cdn/Edutainme/photo1.jpg" />
//   [Curriculum PDF](@cdn/Edutainme/curriculum.pdf)
//
// All three forms get rewritten to the full jsDelivr URL at build time,
// e.g. https://cdn.jsdelivr.net/gh/guyklages/public@master/Edutainme/photo1.jpg

const { visit } = require('unist-util-visit');

const DEFAULT_PREFIX = '@cdn/';
const DEFAULT_BASE_URL = 'https://cdn.jsdelivr.net/gh/guyklages/public@master/';

function rewriteUrl(url, prefix, baseUrl) {
  if (typeof url !== 'string' || !url.startsWith(prefix)) {
    return url;
  }
  const relativePath = url.slice(prefix.length);
  return baseUrl + relativePath;
}

/**
 * @param {{ prefix?: string, baseUrl?: string }} [options]
 *   prefix  - the placeholder prefix to look for, defaults to "@cdn/"
 *   baseUrl - the CDN URL to substitute in, must end with "/"
 */
function cdnLinkPlugin(options = {}) {
  const prefix = options.prefix || DEFAULT_PREFIX;
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL;

  // Escape the prefix for safe use inside a RegExp (in case it ever
  // contains characters like "." that would otherwise be wildcards).
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rawHtmlPattern = new RegExp(
    `((?:src|href)=["'])${escapedPrefix}([^"']+)(["'])`,
    'g'
  );

  return function transformer(tree) {
    // Standard markdown syntax: ![alt](@cdn/path) and [text](@cdn/path)
    visit(tree, ['image', 'link'], (node) => {
      node.url = rewriteUrl(node.url, prefix, baseUrl);
    });

    // MDX JSX elements: <img src="@cdn/path" />, <a href="@cdn/path">…</a>,
    // <source src="@cdn/path" />, etc. Docusaurus parses .md/.mdx files
    // with MDX, so tags like these usually land here, not as raw HTML.
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (!node.attributes) return;
      for (const attr of node.attributes) {
        if (
          attr.type === 'mdxJsxAttribute' &&
          (attr.name === 'src' || attr.name === 'href') &&
          typeof attr.value === 'string'
        ) {
          attr.value = rewriteUrl(attr.value, prefix, baseUrl);
        }
      }
    });

    // Fallback for raw HTML nodes (covers edge cases where a tag isn't
    // parsed as MDX JSX, e.g. certain multi-line or unusual HTML blocks).
    visit(tree, 'html', (node) => {
      if (typeof node.value === 'string' && node.value.includes(prefix)) {
        node.value = node.value.replace(
          rawHtmlPattern,
          (_match, open, relPath, close) => `${open}${baseUrl}${relPath}${close}`
        );
      }
    });
  };
}

module.exports = cdnLinkPlugin;