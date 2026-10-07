import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('articles')).filter((a) => !a.data.draft).sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
  const items = posts.map((p) => {
    const url = `${site.url}/${p.id.replace(/\.md$/, '')}/`;
    return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${p.data.publishDate.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)} – Health advice</title><link>${site.url}/health-blog/</link><description>Pharmacist-reviewed health, skincare and wellbeing advice from ${esc(site.name)}, Broadbeach.</description><language>en-au</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
