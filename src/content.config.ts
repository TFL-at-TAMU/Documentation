import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Set `comments: false` in a page's frontmatter to drop the comment box
				// from that page (see src/components/Footer.astro). Everything else gets
				// one once giscus is configured.
				comments: z.boolean().optional(),
			}),
		}),
	}),
};
