import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    category: z.enum(['Diseño web', 'SEO', 'SEO + IA']),
    readingTime: z.number().int().positive().default(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
