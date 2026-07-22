// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { remarkAlert } from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
	site: 'https://tfl.aidanstew.art',
	markdown: {
		// GitHub-style blockquote alerts: > [!NOTE], > [!IMPORTANT], > [!CAUTION], ...
		// (non-deprecated form: markdown.remarkPlugins directly is deprecated
		// in favor of a `unified()` processor from @astrojs/markdown-remark)
		processor: unified({ remarkPlugins: [remarkAlert] }),
	},
	integrations: [
		starlight({
			title: 'The Fab Lab',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/TFL-at-TAMU/Documentation',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/TFL-at-TAMU/Documentation/edit/main/',
			},
			customCss: ['./src/styles/gruvbox.css'],
			head: [
				// Fonts matching the current site: Inter (body) + Space Grotesk (headings).
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap',
					},
				},
				// Old-Docsify-hash compatibility shim. Old deep links look like
				// /docs/#/Studio%20Standards or /docs/#/CNC%20Mill/... — Starlight
				// uses slugged paths instead, so on the bare /docs/ index we decode
				// a leading `#/...` hash and client-redirect to the slugged URL.
				// A 404 on a bad target is an acceptable fallback (not over-engineered).
				{
					tag: 'script',
					content: `(function () {
	if (location.pathname !== '/docs/' || location.hash.slice(0, 2) !== '#/') return;

	// KEEP IN SYNC with slugifySegment() in scripts/migrate_content.mjs — both
	// must slugify path segments identically or old links land on the wrong page.
	function slugifySegment(segment) {
		return segment
			.toLowerCase()
			.replace(/ /g, '-')
			.replace(/&/g, '')
			.replace(/[^a-z0-9\\-_]/g, ''); // Astro's slugger drops periods too (e.g. "3.0" -> "30")
	}

	var segments = location.hash
		.slice(2)
		.split('/')
		.map(function (s) {
			try {
				return decodeURIComponent(s);
			} catch (e) {
				return s;
			}
		})
		.filter(Boolean);
	if (segments.length === 0) return;

	// A trailing README (with or without .md) maps to its directory's index,
	// same as the migration script's urlForMdTarget().
	var lastIndex = segments.length - 1;
	var lastNoExt = segments[lastIndex].replace(/\\.md$/i, '');
	if (lastNoExt.toLowerCase() === 'readme') {
		segments.pop();
	} else {
		segments[lastIndex] = lastNoExt;
	}

	var slugged = segments.map(slugifySegment).filter(Boolean).join('/');
	location.replace(slugged ? '/docs/' + slugged + '/' : '/docs/');
})();`,
				},
			],
			sidebar: [
				{ label: 'Welcome', slug: 'docs' },
				{ label: 'Studio Standards', slug: 'docs/studio-standards' },
				// NOTE: autogenerate.directory matches the on-disk folder path under src/content/docs/
				// (original names with spaces/&), NOT the slugified route segment.
				{ label: '3D Scanner', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/3D Scanner' } }] },
				{ label: 'CNC Mill', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/CNC Mill' } }] },
				{ label: 'Cricut', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/Cricut' } }] },
				{ label: 'FDM Printers', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/FDM Printers' } }] },
				{ label: 'Laser Cutter', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/Laser Cutter' } }] },
				{ label: 'PCB Machines', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/PCB Machines' } }] },
				{ label: 'SLA Printers', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/SLA Printers' } }] },
				{ label: 'Templates', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/Templates' } }] },
				{ label: 'Workbenches', collapsed: true, items: [{ autogenerate: { collapsed: true, directory: 'docs/Workbenches' } }] },
			],
			components: {
				Header: './src/components/Header.astro',
				MobileMenuFooter: './src/components/MobileMenuFooter.astro',
			},
		}),
	],
});
