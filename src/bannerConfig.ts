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
	'<strong>Labor Day weekend:</strong> the Fab Lab closes at <strong>7 PM today</strong> and is <strong>closed all day Monday</strong>. We reopen <strong>Tuesday, September 8</strong>.';
