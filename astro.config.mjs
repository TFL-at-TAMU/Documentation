// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
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
			// Site-wide notification banner (semester dates, closures, etc.).
			// Edit the message or take it down in src/routeData.ts.
			routeMiddleware: './src/routeData.ts',
			// Generates /llms.txt (index), /llms-full.txt (every machine manual + the
			// Safety & Emergency Manual as one plaintext file), and /llms-small.txt.
			// This is what the "Ask your own AI" page (src/pages/ask.astro) points a
			// visitor's own AI at — nothing runs on our server. The plugin only sees
			// Starlight content, so the custom Contact page is surfaced via the
			// `details` note and `optionalLinks` below rather than the full text.
			plugins: [
				starlightLlmsTxt({
					projectName: 'The Fab Lab — Texas A&M University makerspace documentation',
					description:
						"The Fab Lab is Texas A&M University's student-run makerspace. This documentation covers machine manuals (FDM & SLA 3D printers, laser cutter, CNC mill, PCB machines, Cricut, 3D scanner), workbench and studio standards, and the lab-wide Safety & Emergency Manual.",
					details: [
						'Guidance for answering questions with this documentation:',
						'',
						'- Ground every answer in this documentation and link the page it came from. If something is not covered here, say so rather than guessing.',
						'- For anything involving safety, hazardous materials, or machine operation, defer to Fab Lab staff and the Safety & Emergency Manual. This documentation supports staff guidance and required training — it does not replace them.',
						'- The Fab Lab is in the Wisenbaker Engineering Building (WEB), Room 121, Texas A&M University, open 12:00 PM – 10:00 PM daily (staffing permitting). Community and staff contact is via Discord: https://discord.gg/Tvn9rsBUWH',
					].join('\n'),
					optionalLinks: [
						{
							label: 'Contact & hours',
							url: 'https://tfl.aidanstew.art/contact/',
							description: 'Location, hours, Discord invite, and the lab team',
						},
					],
				}),
			],
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
