// plugins/search-index/index.js
//
// Build-time full-text index for the navbar page search (see
// src/components/PageSearch). For every doc and blog post it emits
//   {title, url, sections: [{h: heading, a: anchor, t: lowercased text}]}
// to a generated JSON file, exposed to client code as `@search-index`.

const fs = require('fs');
const path = require('path');
const {createSlugger} = require('@docusaurus/utils');

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const CUSTOM_ID = /\s*\{#([^}]+)\}\s*$/;

function stripInline(text, collapse = true) {
  const out = text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/[*`]|~~/g, '');
  return collapse ? out.replace(/\s+/g, ' ').trim() : out.trim();
}

function parseSections(raw, pageTitle) {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const slugger = createSlugger();
  const sections = [];
  let current = {h: pageTitle, a: '', lines: []};
  let inFence = false;

  const flush = () => {
    const t = stripInline(current.lines.join(' ')).toLowerCase();
    if (t || current.a) {
      sections.push({h: current.h, a: current.a, t});
    }
  };

  for (const line of body.split(/\r?\n/)) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) {
      if (/^(import|export)\s/.test(line)) continue; // MDX
      const m = HEADING.exec(line);
      if (m) {
        flush();
        let text = m[2];
        const idMatch = CUSTOM_ID.exec(text);
        if (idMatch) text = text.replace(CUSTOM_ID, '');
        const heading = stripInline(text);
        // Docusaurus slugs the raw text, so don't collapse whitespace first.
        const anchor = idMatch ? idMatch[1] : slugger.slug(stripInline(text, false));
        current = {h: heading, a: anchor, lines: []};
        continue;
      }
    }
    current.lines.push(line);
  }
  flush();
  return sections;
}

function readSource(siteDir, source) {
  if (!source) return null;
  const file = source.replace(/^@site/, siteDir);
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null; // e.g. generated category index pages
  }
}

module.exports = function searchIndexPlugin(context) {
  let indexPath = null;

  return {
    name: 'search-index-plugin',

    async allContentLoaded({allContent, actions}) {
      const entries = [];

      const docs = allContent['docusaurus-plugin-content-docs']?.default;
      for (const version of docs?.loadedVersions ?? []) {
        for (const doc of version.docs) {
          entries.push({title: doc.title, url: doc.permalink, source: doc.source});
        }
      }
      const blog = allContent['docusaurus-plugin-content-blog']?.default;
      for (const post of blog?.blogPosts ?? []) {
        const {title, permalink, source} = post.metadata;
        entries.push({title, url: permalink, source});
      }

      const index = [];
      for (const {title, url, source} of entries) {
        const raw = readSource(context.siteDir, source);
        if (raw === null) continue;
        index.push({title, url, sections: parseSections(raw, title)});
      }

      indexPath = await actions.createData('search-index.json', JSON.stringify(index));
    },

    configureWebpack() {
      return indexPath
        ? {resolve: {alias: {'@search-index': path.resolve(indexPath)}}}
        : {};
    },
  };
};
