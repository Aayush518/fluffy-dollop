import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    excerpt: z.string(),
    readingTime: z.number(),
    featured: z.boolean().optional(),
  }),
});

const opinions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = { blog, opinions };