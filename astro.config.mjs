import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pricelinepacificfair.com.au',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/search/') && !page.includes('/404/'),
      changefreq: 'weekly',
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
