// Giscus configuration — the page comment box at the bottom of every docs page.
//
// Comments are stored as GitHub Discussions on this repository, so there is no
// database and no server of ours in the loop: the widget is an iframe from
// giscus.app talking to the GitHub API. Readers need a free GitHub account to
// post (the same account the "Edit page" contributing flow already needs), and
// comments appear immediately — moderation is after the fact, from the
// Discussions tab on GitHub.
//
// ── One-time setup, needed before any of this renders (repo admin) ───────────
// Until GISCUS_CATEGORY_ID below is filled in, the comment box is omitted from
// every page and the site builds and ships exactly as it does today.
//
//   1. Enable Discussions: repo Settings → General → Features → check
//      "Discussions". (A proxy blocks this write from an agent session, so it
//      has to be a human click.)
//   2. Create the category: Discussions → the pencil icon beside "Categories"
//      → New category. Name it to match GISCUS_CATEGORY below, and set its
//      format to **Announcement**. Announcement format means only maintainers
//      can open a new discussion — giscus still opens one per page on a
//      reader's behalf, but nobody can start loose threads by hand.
//   3. Install the giscus app on this repo:
//      https://github.com/apps/giscus — "Install" → select TFL-at-TAMU →
//      limit it to the Documentation repository.
//   4. Get the category ID: open https://giscus.app, enter
//      TFL-at-TAMU/Documentation, pick the category from step 2, and copy the
//      `data-category-id` value out of the generated snippet into
//      GISCUS_CATEGORY_ID below. (It looks like `DIC_kwDO…`.)
//
// Repo visibility, the app install, and the category all have to line up or
// the widget renders a giscus error box in place of the comments.

/** `owner/repo` holding the Discussions. Must stay a public repo. */
export const GISCUS_REPO = 'TFL-at-TAMU/Documentation';

/** The repo's GraphQL node ID (from the GitHub API — this one is verified). */
export const GISCUS_REPO_ID = 'R_kgDOSeyiyA';

/** Discussion category name, exactly as typed in step 2 above. */
export const GISCUS_CATEGORY = 'Page Comments';

/** Category node ID from step 4. Empty = comments off site-wide. */
export const GISCUS_CATEGORY_ID = '';

/**
 * giscus themes for the site's dark and light modes. `transparent_dark` lets
 * the page's own #232323 ground show through instead of GitHub's near-black;
 * a CSS URL can go here instead if the widget ever needs the full Heat palette
 * (see ADVANCED-USAGE.md in the giscus repo).
 */
export const GISCUS_THEME_DARK = 'transparent_dark';
export const GISCUS_THEME_LIGHT = 'light';

/** Whether setup is finished. Every consumer checks this before rendering. */
export const GISCUS_CONFIGURED = GISCUS_CATEGORY_ID !== '';

if (!GISCUS_CONFIGURED) {
	// Runs once per build, not once per page — this module is only evaluated once.
	console.warn(
		'[giscus] GISCUS_CATEGORY_ID is empty, so page comments are omitted from this build. See src/giscusConfig.ts for the setup steps.'
	);
}
