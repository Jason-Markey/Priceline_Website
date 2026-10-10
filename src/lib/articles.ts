import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Articles that are live: not draft, and publishDate is not in the future (Australia/Brisbane).
 * Scheduled posts (publishDate ahead of the build date) are skipped until a build runs on or after that date.
 * The weekly GitHub Actions rebuild (.github/workflows/scheduled-rebuild.yml) publishes them automatically.
 */
export async function getLiveArticles(): Promise<CollectionEntry<'articles'>[]> {
  const asOf = articlesAsOf();
  return (await getCollection('articles')).filter((a) => !a.data.draft && a.data.publishDate.getTime() <= asOf);
}

/**
 * The cut-off for "live", as a timestamp comparable with publishDate.
 * publishDate "2026-10-19" parses as midnight UTC. Brisbane is UTC+10 all year (no daylight saving), so shifting "now"
 * forward 10 hours compares calendar dates in Brisbane: an article dated Monday is live in a build that runs any time
 * on that Monday in Brisbane, including the 6am Monday scheduled rebuild (which is still Sunday in UTC).
 * Keep in step with the same calculation in astro.config.mjs (thin-category sitemap filter) and tools/check-articles.py.
 * ARTICLES_AS_OF=2027-12-31 npm run build  -> preview everything scheduled (testing only)
 */
export function articlesAsOf(): number {
  if (import.meta.env.ARTICLES_AS_OF) return new Date(import.meta.env.ARTICLES_AS_OF).getTime();
  return Date.now() + 10 * 60 * 60 * 1000;
}
// Newest first; same-day articles in slug order so every build (local or CI) lists them identically.
export const byNewest = (a: CollectionEntry<'articles'>, b: CollectionEntry<'articles'>) =>
  b.data.publishDate.getTime() - a.data.publishDate.getTime() || a.id.localeCompare(b.id);
export const slugOf = (a: CollectionEntry<'articles'>) => a.id.replace(/\.md$/, '');
