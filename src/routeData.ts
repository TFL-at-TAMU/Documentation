import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { BANNER_ENABLED, BANNER_CONTENT } from './bannerConfig';

// Applies the site-wide notification banner to every Starlight docs page.
// The message and on/off switch live in src/bannerConfig.ts (shared with the
// standalone Astro pages so the banner stays in sync everywhere).

export const onRequest = defineRouteMiddleware((context) => {
	if (!BANNER_ENABLED) return;

	const { starlightRoute } = context.locals;

	// Use `??=` so any page that sets its own `banner:` in frontmatter still wins.
	starlightRoute.entry.data.banner ??= { content: BANNER_CONTENT };
});
