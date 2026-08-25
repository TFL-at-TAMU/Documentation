// ─────────────────────────────────────────────────────────────────────────────
// Site-wide notification banner — single source of truth
//
// This is the ONE place to edit the announcement bar shown at the top of the
// site. Both the Starlight docs pages (via src/routeData.ts) and the standalone
// Astro pages (the landing page src/pages/index.astro and Contact page) read
// these values, so the notice stays in sync everywhere.
//
//   • To change the message: edit BANNER_CONTENT (inline HTML is allowed).
//   • To take the banner down: set BANNER_ENABLED to false. Nothing else needed.
// ─────────────────────────────────────────────────────────────────────────────

export const BANNER_ENABLED = true;

export const BANNER_CONTENT =
	'The Fab Lab opens for the new semester on <strong>Monday, August 31</strong> — the second week of classes. Check back here for hours and machine checkout dates.';
