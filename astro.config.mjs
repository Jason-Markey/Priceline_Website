import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// Optional per-URL lastmod overrides (e.g. article modifiedDate), as { "<url or path>": "YYYY-MM-DD" }.
// Generated separately; the build date is used when the file is absent or has no entry for a URL.
let lastmodMap = {};
try { lastmodMap = JSON.parse(readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8')); } catch { /* none */ }
const buildDate = new Date();

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
  if (cat && date && !draft && new Date(date).getTime() <= asOf.getTime()) liveByCategory[cat] = (liveByCategory[cat] || 0) + 1;
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
        const labels = head ? els(els(head, 'tr')[0] || {}, 'th').map(text) : [];
        for (const body of els(child, 'tbody')) {
          for (const tr of els(body, 'tr')) {
            els(tr, 'td').forEach((td, i) => {
              if (i > 0 && labels[i]) td.properties = { ...(td.properties || {}), dataLabel: labels[i] };
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
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  markdown: { rehypePlugins: [rehypeStackTables] },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.includes('/404/') && !thinCategories.some((c) => page.includes(`/category/${c}/`)),
      changefreq: 'weekly',
      serialize: (item) => {
        const path = item.url.replace(/^https?:\/\/[^/]+/, '');
        const override = lastmodMap[item.url] ?? lastmodMap[path];
        item.lastmod = override ? new Date(override).toISOString() : buildDate.toISOString();
        return item;
      },
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
