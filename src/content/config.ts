import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    category: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    galleryImages: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    readTime: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };
