import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Articles live in src/content/articles/<slug>.md
 * The filename is the URL: sunburn-treatment.md -> /sunburn-treatment/
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    seoTitle: z.string().optional(),
    publishDate: z.coerce.date(),
    modifiedDate: z.coerce.date(),
    category: z.enum(['health-advice', 'skincare-beauty', 'local-guides', 'prescriptions', 'vaccinations', 'travel', 'vitamins-supplements', 'dental-oral-care', 'baby-child', 'haircare']),
    author: z.string().default('Priceline Pharmacy Pacific Fair team'),
    reviewer: z.string().default('Jason Markey'),
    tags: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    references: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
