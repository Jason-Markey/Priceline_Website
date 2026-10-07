import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Articles that are live: not draft, and publishDate is not in the future (Australia/Brisbane).
 * Scheduled posts (publishDate ahead of the build date) are skipped until a build runs on or after that date.
 * The weekly GitHub Actions rebuild (.github/workflows/scheduled-rebuild.yml) publishes them automatically.
 */
export async function getLiveArticles(): Promise<CollectionEntry<'articles'>[]> {
  // ARTICLES_AS_OF=2027-12-31 npm run build  -> preview everything scheduled (testing only)
  const now = import.meta.env.ARTICLES_AS_OF ? new Date(import.meta.env.ARTICLES_AS_OF) : new Date();
  return (await getCollection('articles')).filter((a) => !a.data.draft && a.data.publishDate.getTime() <= now.getTime());
}
export const byNewest = (a: CollectionEntry<'articles'>, b: CollectionEntry<'articles'>) => b.data.publishDate.getTime() - a.data.publishDate.getTime();
export const slugOf = (a: CollectionEntry<'articles'>) => a.id.replace(/\.md$/, '');
