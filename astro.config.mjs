import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// Sitemap lastmod is only given when it's true: an article's modifiedDate, or a page's dateModified prop (read from
// the .astro file below); the blog index takes the newest article's. Pages without a date (home, category pages) get
// none, rather than the build date on every URL every week, which search engines learn to ignore.
// src/data/lastmod.json, if present, overrides these, as { "<url or path>": "YYYY-MM-DD" }.
let lastmodMap = {};
try { lastmodMap = JSON.parse(readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8')); } catch { /* none */ }
const buildDate = new Date();
const lastmodByPath = {};
for (const f of readdirSync(new URL('./src/pages/', import.meta.url), { recursive: true })) {
  if (!f.endsWith('.astro') || f.includes('[')) continue;
  const mod = (readFileSync(new URL(`./src/pages/${f}`, import.meta.url), 'utf8').match(/dateModified="(\d{4}-\d{2}-\d{2})"/) || [])[1];
  if (mod) lastmodByPath[f === 'index.astro' ? '/' : `/${f.replace(/(\/?index)?\.astro$/, '')}/`] = mod;
}

// Category pages with fewer than 3 live articles are rendered noindex (see src/pages/category/[category].astro),
// so keep them out of the sitemap too. Counts live articles the same way src/lib/articles.ts does.
// Brisbane calendar date (UTC+10, no DST): see articlesAsOf() in src/lib/articles.ts.
const asOf = process.env.ARTICLES_AS_OF ? new Date(process.env.ARTICLES_AS_OF) : new Date(buildDate.getTime() + 10 * 60 * 60 * 1000);
const liveByCategory = {};
for (const f of readdirSync(new URL('./src/content/articles/', import.meta.url))) {
  if (!f.endsWith('.md')) continue;
  const fm = readFileSync(new URL(`./src/content/articles/${f}`, import.meta.url), 'utf8').split('---')[1] || '';
  const cat = (fm.match(/^category:\s*([\w-]+)/m) || [])[1];
  const date = (fm.match(/^publishDate:\s*([\d-]+)/m) || [])[1];
  const draft = /^draft:\s*true/m.test(fm);
  const live = date && !draft && new Date(date).getTime() <= asOf.getTime();
  if (cat && live) liveByCategory[cat] = (liveByCategory[cat] || 0) + 1;
  // An article's lastmod is its modifiedDate. The blog index changes whenever an article goes live or is updated, so it
  // takes the newest of those dates.
  const changed = [date, (fm.match(/^modifiedDate:\s*([\d-]+)/m) || [])[1]].filter(Boolean).sort().pop();
  if (live && changed) {
    lastmodByPath[`/${f.replace(/\.md$/, '')}/`] = changed;
    if (changed > (lastmodByPath['/health-blog/'] || '')) lastmodByPath['/health-blog/'] = changed;
  }
}
const thinCategories = Object.keys(liveByCategory).filter((c) => liveByCategory[c] < 3);

/**
 * Markdown tables in articles: wrap each one in the site's stacking-table wrapper and label every cell with its column
 * header, so on phones each row becomes a readable card (see .table-wrap--stack in src/styles/global.css) instead of a
 * table that has to be scrolled sideways.
 */
function rehypeStackTables() {
  const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join('')).trim();
  const els = (n, tag) => (n.children || []).filter((c) => c.type === 'element' && c.tagName === tag);
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        const head = els(child, 'thead')[0];
        const headCells = head ? els(els(head, 'tr')[0] || {}, 'th') : [];
        const labels = headCells.map(text);
        // An empty top-left header ("| | A | B |") means the first column labels each row. Give the corner an
        // invisible label (an empty <th> is an accessibility error) and make first-column cells row headers.
        const rowHeaders = headCells.length > 1 && !labels[0];
        if (rowHeaders) {
          headCells[0].children = [{ type: 'element', tagName: 'span', properties: { className: ['sr-only'] }, children: [{ type: 'text', value: 'Compared' }] }];
        }
        for (const body of els(child, 'tbody')) {
          for (const tr of els(body, 'tr')) {
            els(tr, 'td').forEach((td, i) => {
              if (i === 0 && rowHeaders) {
                td.tagName = 'th';
                td.properties = { ...(td.properties || {}), scope: 'row' };
              } else if (i > 0 && labels[i]) {
                td.properties = { ...(td.properties || {}), dataLabel: labels[i] };
              }
            });
          }
        }
        return { type: 'element', tagName: 'div', properties: { className: ['table-wrap', 'table-wrap--stack'] }, children: [child] };
      }
      walk(child);
      return child;
    });
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://pricelinepacificfair.com.au',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  markdown: { rehypePlugins: [rehypeStackTables] },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.includes('/404/') && !thinCategories.some((c) => page.includes(`/category/${c}/`)),
      changefreq: 'weekly',
      serialize: (item) => {
        const path = item.url.replace(/^https?:\/\/[^/]+/, '');
        const date = lastmodMap[item.url] ?? lastmodMap[path] ?? lastmodByPath[path];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
