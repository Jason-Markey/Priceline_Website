import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Optional per-URL lastmod overrides (e.g. article modifiedDate), as { "<url or path>": "YYYY-MM-DD" }.
// Generated separately; the build date is used when the file is absent or has no entry for a URL.
let lastmodMap = {};
try { lastmodMap = JSON.parse(readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8')); } catch { /* none */ }
const buildDate = new Date();

export default defineConfig({
  site: 'https://pricelinepacificfair.com.au',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.includes('/404/'),
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
