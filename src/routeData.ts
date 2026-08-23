import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide notification banner
//
// This is the single place to edit the announcement bar that appears at the top
// of EVERY docs page. To change the message, edit `BANNER_CONTENT` below. To take
// the banner down entirely (e.g. once the semester is underway), set
// `BANNER_ENABLED` to false — no other changes needed.
//
// `content` accepts inline HTML, so you can bold text or add a link.
// ─────────────────────────────────────────────────────────────────────────────

const BANNER_ENABLED = true;

const BANNER_CONTENT =
	'The Fab Lab reopens <strong>early September</strong> for the new semester — check back here for exact hours and machine checkout dates.';

export const onRequest = defineRouteMiddleware((context) => {
	if (!BANNER_ENABLED) return;

	const { starlightRoute } = context.locals;

	// Use `??=` so any page that sets its own `banner:` in frontmatter still wins.
	starlightRoute.entry.data.banner ??= { content: BANNER_CONTENT };
});
