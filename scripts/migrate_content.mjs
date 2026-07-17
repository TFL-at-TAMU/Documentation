#!/usr/bin/env node
/**
 * Content migration tool: Docsify (site/docs/) -> Astro Starlight content
 * collection (src/content/docs/docs/). Supersedes the PoC importer
 * (scripts/poc_import_content.mjs).
 *
 * What it does, on top of the PoC's mirror-and-inject-frontmatter behavior:
 *   a. Excludes the staff-facing trees (IT/, Networking/, one staff service
 *      manual) entirely — path-based, content of those files is never read.
 *   b. Rewrites relative *.md cross-links to slugified Starlight URLs.
 *   c. De-duplicates H1s: Starlight renders frontmatter `title` as the page
 *      H1, so a body `# Title` is a second one.
 *   d. Copies non-image binaries (.stl/.ods/.zip/.pdf/.mmd) to
 *      public/files/<same relative path>, rewriting references.
 *
 * Modes:
 *   node scripts/migrate_content.mjs             mirror site/docs/ -> src/content/docs/docs/ (default)
 *   node scripts/migrate_content.mjs --in-place   transform files already sitting at the destination
 *                                                 (Phase 2: after `git mv`, no copy step)
 *
 * Both modes share the same per-file transform (frontmatter/title, link
 * rewriting, binary rewriting) — only "where do we read from / write to"
 * differs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IN_PLACE = process.argv.includes('--in-place');

const SRC_DOCS = path.join(repoRoot, 'site', 'docs');
const DEST_DOCS = path.join(repoRoot, 'src', 'content', 'docs', 'docs');
// The tree we actually walk and resolve links/binaries against.
const WALK_ROOT = IN_PLACE ? DEST_DOCS : SRC_DOCS;

const SAFETY_SRC = path.join(repoRoot, 'site', 'safety', 'README.md');
const SAFETY_DEST = path.join(repoRoot, 'src', 'content', 'docs', 'safety.md');
const PUBLIC_FILES_DEST = path.join(repoRoot, 'public', 'files');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);
const BINARY_EXTS = new Set(['.stl', '.ods', '.zip', '.pdf', '.mmd']);
const SKIP_FILES = new Set(['_sidebar.md', 'index.html', '.nojekyll']);

// ---------------------------------------------------------------------------
// a. STAFF-TREE EXCLUSION — purely path-based. Nothing under these repo-
// relative paths is ever opened, read, or copied to src/content/ or public/.
// See HANDOFF.md §6 / STARLIGHT_MIGRATION.md item 5 for the policy context.
// ---------------------------------------------------------------------------
const EXCLUDED = [
	'site/docs/IT',
	'site/docs/Networking',
	'site/docs/FDM Printers/Dual Head FDM Printer/Operations & Safety Manual/Raise3D E2 Printer Staff Service Manual.md',
];
// Same list, with the 'site/docs/' prefix stripped, so it matches paths
// relative to whichever root we're walking (site/docs/ by default, or the
// in-place destination under src/content/docs/docs/ with --in-place).
const EXCLUDED_REL = EXCLUDED.map((p) => p.replace(/^site\/docs\//, ''));

function isExcludedRel(relPosix) {
	return EXCLUDED_REL.some((ex) => relPosix === ex || relPosix.startsWith(ex + '/'));
}

function toPosixRel(root, absPath) {
	return path.relative(root, absPath).split(path.sep).join('/');
}

// ---------------------------------------------------------------------------
// Slugify — MUST stay identical to the copy of this function inlined into
// the hash-redirect script in astro.config.mjs's Starlight `head` config.
// Both are marked with "KEEP IN SYNC" comments; change one, change both.
//
// Rule: lowercase; spaces -> '-'; '&' dropped (leaving '--' where ' & ' was,
// since the two spaces around it each become their own '-'); everything else
// Astro's own slugger would strip (anything that isn't a-z 0-9 - _, INCLUDING
// periods — e.g. "3.0" -> "30", verified against real `dist/` output) is
// dropped too.
// ---------------------------------------------------------------------------
function slugifySegment(segment) {
	return segment
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/&/g, '')
		.replace(/[^a-z0-9\-_]/g, ''); // Astro's slugger drops periods too (e.g. "3.0" -> "30")
}

const stats = {
	pages: 0,
	images: 0,
	binaries: 0,
	linksRewritten: 0,
	linksIntoExcluded: [],
	anchoredLinks: [],
	unresolvableLinks: [],
	h1Stripped: 0,
	h1Demoted: 0,
	titlesFromBodyH1: 0,
	skipped: [],
	fixedImageRefs: [],
	binaryRefsRewritten: 0,
};

/** Quote a string as a safe double-quoted YAML scalar. */
function yamlQuote(s) {
	return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

/**
 * Split text into { frontmatter: {raw, body} | null, body }.
 * Returns the raw frontmatter body text (between the --- fences) unparsed
 * (we only need to read/replace the `title:` line, and must preserve every
 * other key, e.g. Google-Docs-export `source_id` / `modified`), plus the
 * markdown body that follows.
 */
function splitFrontmatter(text) {
	const fmOpen = /^---\r?\n/.exec(text);
	if (!fmOpen) return { fmBody: null, body: text };
	const rest = text.slice(fmOpen[0].length);
	const fmClose = /\r?\n---(\r?\n|$)/.exec(rest);
	if (!fmClose) return { fmBody: null, body: text }; // malformed; treat as plain content
	return {
		fmBody: rest.slice(0, fmClose.index),
		body: rest.slice(fmClose.index + fmClose[0].length),
	};
}

function getFrontmatterTitle(fmBody) {
	if (fmBody == null) return null;
	const m = /^title\s*:\s*(.*)$/m.exec(fmBody);
	if (!m) return null;
	let v = m[1].trim();
	if (
		(v.startsWith('"') && v.endsWith('"')) ||
		(v.startsWith("'") && v.endsWith("'"))
	) {
		v = v.slice(1, -1);
	}
	return v;
}

/**
 * c. Duplicate-H1 fix. Finds the first markdown heading in `body`. If it's
 * an H1, strips it (and blank lines immediately trailing it) and returns its
 * text; otherwise returns null and leaves body untouched. Non-heading
 * content before the first heading (common in Google-Docs exports) is left
 * in place either way.
 */
function stripLeadingH1(body) {
	const headingRe = /^(#{1,6})[ \t]+(.*)$/m;
	const m = headingRe.exec(body);
	if (!m || m[1] !== '#') return { body, h1Text: null };
	const start = m.index;
	let end = start + m[0].length;
	// Swallow the blank line(s) immediately after the stripped heading.
	while (body.slice(end, end + 2) === '\n\n') end += 1;
	if (body[end] === '\n') end += 1;
	const newBody = body.slice(0, start) + body.slice(end);
	return { body: newBody, h1Text: m[2].trim() };
}

/**
 * A handful of the Google-Docs exports use "Heading 1" for every top-level
 * section, not just the doc title (e.g. the safety manual: "# Purpose of
 * This Document", "# Scope & Applicability", "# General Safety Principles",
 * ... all as H1). stripLeadingH1() only removes the first one; Starlight
 * still renders the frontmatter `title` as an H1, so any of these that
 * survive in the body are a *second* real `<h1>` on the page. Demote any
 * remaining top-level `# ` headings to `## ` so there's exactly one H1 per
 * page (the frontmatter-derived one).
 */
function demoteRemainingH1s(body) {
	let count = 0;
	const out = body.replace(/^#(?!#)([ \t]+.*)$/gm, (full, rest) => {
		count++;
		return `##${rest}`;
	});
	return { body: out, count };
}

/**
 * Applies title-injection + duplicate-H1 dedupe to a markdown file's text.
 * `defaultTitle` is used only when there's neither an existing frontmatter
 * title nor a leading body H1 to draw one from (filename-derived).
 *
 * `forceTitle: true` (root README -> index.md, safety.md): the page's title
 * is owner-pinned, so `defaultTitle` always wins. The body's first H1 is
 * stripped only if it duplicates that title; a *different* first H1 is a
 * section heading, kept and demoted with the rest rather than promoted.
 */
function applyTitleAndH1(text, defaultTitle, { forceTitle = false } = {}) {
	const { fmBody, body } = splitFrontmatter(text);
	const existingTitle = getFrontmatterTitle(fmBody);
	let dedupedBody = body;
	let h1Text = null;
	const pinnedTitle = forceTitle ? defaultTitle : existingTitle;
	{
		const stripped = stripLeadingH1(body);
		const matchesPinned =
			stripped.h1Text !== null &&
			pinnedTitle !== null &&
			pinnedTitle.trim().toLowerCase() === stripped.h1Text.trim().toLowerCase();
		if (stripped.h1Text !== null && (!forceTitle || matchesPinned)) {
			dedupedBody = stripped.body;
			h1Text = stripped.h1Text;
		}
	}
	const demoted = demoteRemainingH1s(dedupedBody);
	dedupedBody = demoted.body;
	stats.h1Demoted += demoted.count;

	let finalTitle;
	if (forceTitle) {
		finalTitle = defaultTitle;
		if (h1Text !== null) stats.h1Stripped++;
	} else if (h1Text !== null) {
		stats.h1Stripped++;
		const matches =
			existingTitle !== null &&
			existingTitle.trim().toLowerCase() === h1Text.trim().toLowerCase();
		if (matches) {
			finalTitle = existingTitle;
		} else {
			finalTitle = h1Text;
			stats.titlesFromBodyH1++;
		}
	} else {
		finalTitle = existingTitle ?? defaultTitle;
	}

	let newFmBody;
	if (fmBody == null) {
		newFmBody = `title: ${yamlQuote(finalTitle)}\n`;
	} else if (/^title\s*:/m.test(fmBody)) {
		newFmBody = fmBody.replace(/^title\s*:.*$/m, `title: ${yamlQuote(finalTitle)}`);
	} else {
		newFmBody = `title: ${yamlQuote(finalTitle)}\n${fmBody}`;
	}
	if (!newFmBody.endsWith('\n')) newFmBody += '\n'; // original frontmatter's last line may lack one

	return `---\n${newFmBody}---\n\n${dedupedBody.replace(/^\n+/, '')}`;
}

/**
 * Repair relative image refs that only worked because Docsify clamps paths
 * that climb above the docs root (e.g. `../../assets/images/x.png` from a
 * file one folder deep). Astro resolves relative paths strictly and fails
 * the build on missing images, so rewrite any non-resolving
 * `assets/images/...` ref to the correct depth.
 */
function fixImageRefs(text, srcFileDir, srcRelFile) {
	return text.replace(
		/(!\[[^\]]*\]\()<?((?:\.\.\/)+assets\/images\/[^)>\s]+)>?(\))/g,
		(full, pre, ref, post) => {
			const resolved = path.resolve(srcFileDir, ref);
			if (fs.existsSync(resolved)) return full; // already correct
			const clamped = path.join(WALK_ROOT, ref.replace(/^(\.\.\/)+/, ''));
			if (!fs.existsSync(clamped)) return full; // genuinely missing; leave as-is
			const correct = path.relative(srcFileDir, clamped).split(path.sep).join('/');
			stats.fixedImageRefs.push(`${srcRelFile}: ${ref} -> ${correct}`);
			return `${pre}${correct}${post}`;
		}
	);
}

/** Compute the public `/docs/...` URL for a resolved *.md file under WALK_ROOT. */
function urlForMdTarget(resolvedAbsPath) {
	let relPosix = toPosixRel(WALK_ROOT, resolvedAbsPath);
	const segments = relPosix.split('/');
	if (segments[segments.length - 1].toLowerCase() === 'readme.md') {
		segments.pop(); // README.md maps to its directory's index
	} else {
		segments[segments.length - 1] = segments[segments.length - 1].replace(/\.md$/i, '');
	}
	const slugged = segments.map(slugifySegment).filter(Boolean).join('/');
	return slugged ? `/docs/${slugged}/` : '/docs/';
}

/** Compute the public `/files/...` URL for a copied binary, percent-encoding each segment. */
function urlForBinaryTarget(resolvedAbsPath) {
	const relPosix = toPosixRel(WALK_ROOT, resolvedAbsPath);
	const encoded = relPosix.split('/').map(encodeURIComponent).join('/');
	return `/files/${encoded}`;
}

const MD_LINK_RE = /\[([^\]]*)\]\(\s*(<[^>]*>|[^)\s][^)]*)\s*\)/g;

/**
 * b. Cross-link rewriting + binary "download link" rewriting (same syntax,
 * `[text](path)` / `[text](<path with spaces>)`), plus anchors (`#frag`)
 * kept verbatim. Percent-encoded paths (`%20` etc.) are decoded before
 * resolving against the filesystem.
 */
function rewriteMarkdownLinks(text, srcFileDir, srcRelFile) {
	return text.replace(MD_LINK_RE, (full, linkText, rawDest) => {
		let dest = rawDest.trim();
		const bracketed = dest.startsWith('<') && dest.endsWith('>');
		if (bracketed) dest = dest.slice(1, -1);

		if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(dest)) return full; // absolute URL / scheme — leave alone
		if (dest.startsWith('#')) return full; // same-page anchor — leave alone

		const anchorMatch = /^(.*?)(#.*)?$/.exec(dest);
		const pathPart = anchorMatch[1];
		const anchorPart = anchorMatch[2] || '';

		let decodedPath;
		try {
			decodedPath = decodeURIComponent(pathPart);
		} catch {
			decodedPath = pathPart;
		}

		const lowerPath = decodedPath.toLowerCase();
		const isMd = lowerPath.endsWith('.md');
		const binaryExt = BINARY_EXTS.has(path.extname(lowerPath)) ? path.extname(lowerPath) : null;
		if (!isMd && !binaryExt) return full; // not a link we rewrite (image, external asset, etc.)

		if (path.basename(lowerPath) === '_sidebar.md') {
			stats.unresolvableLinks.push(`${srcRelFile}: [${linkText}](${dest}) (sidebar, not migrated)`);
			return full;
		}

		const resolved = path.resolve(srcFileDir, decodedPath);
		if (!fs.existsSync(resolved)) {
			stats.unresolvableLinks.push(`${srcRelFile}: [${linkText}](${dest})`);
			return full;
		}

		const relFromRoot = toPosixRel(WALK_ROOT, resolved);
		if (isExcludedRel(relFromRoot)) {
			stats.linksIntoExcluded.push(`${srcRelFile}: [${linkText}](${dest})`);
			// fall through — still rewritten like a normal link, per spec (will 404)
		}

		const url = isMd ? urlForMdTarget(resolved) : urlForBinaryTarget(resolved);
		const finalUrl = url + anchorPart;
		if (anchorPart) stats.anchoredLinks.push(`${srcRelFile}: [${linkText}](${dest})`);

		stats.linksRewritten++;
		return `[${linkText}](${finalUrl})`;
	});
}

const HTML_ATTR_RE = /\b(src|href|data)="([^"]+)"/g;

/** d. Rewrite <model-viewer src="…">, <object data="…">, <a href="…"> binary refs. */
function rewriteHtmlBinaryRefs(text, srcFileDir, srcRelFile) {
	return text.replace(HTML_ATTR_RE, (full, attr, rawVal) => {
		if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(rawVal)) return full; // absolute URL

		let decoded;
		try {
			decoded = decodeURIComponent(rawVal);
		} catch {
			decoded = rawVal;
		}
		const ext = path.extname(decoded).toLowerCase();
		if (!BINARY_EXTS.has(ext)) return full;

		const resolved = path.resolve(srcFileDir, decoded);
		if (!fs.existsSync(resolved)) {
			stats.unresolvableLinks.push(`${srcRelFile}: ${attr}="${rawVal}"`);
			return full;
		}
		stats.binaryRefsRewritten++;
		return `${attr}="${urlForBinaryTarget(resolved)}"`;
	});
}

function copyBinary(srcPath, srcFileDir /* unused, kept for symmetry */) {
	const relPosix = toPosixRel(WALK_ROOT, srcPath);
	const destPath = path.join(PUBLIC_FILES_DEST, ...relPosix.split('/'));
	fs.mkdirSync(path.dirname(destPath), { recursive: true });
	fs.copyFileSync(srcPath, destPath);
	stats.binaries++;
}

/**
 * Fenced code blocks (``` / ~~~) must pass through untouched: a `# comment`
 * line inside one would otherwise be demoted like a heading, and link-ish
 * text would get rewritten. Replace each fence with an inert placeholder
 * before transforming, restore afterwards. (No current doc has fences —
 * this guards the tool against future content, incl. Phase 2's in-place run.)
 */
function maskFences(text) {
	const blocks = [];
	const masked = text.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, (block) => {
		blocks.push(block);
		return `\u0000FENCE${blocks.length - 1}\u0000`;
	});
	return { masked, blocks };
}

function unmaskFences(text, blocks) {
	return text.replace(/\u0000FENCE(\d+)\u0000/g, (_, i) => blocks[Number(i)]);
}

/**
 * Full per-file markdown transform pipeline shared by both modes: image-ref
 * repair, cross-link + binary-ref rewriting, then title/H1 dedupe last (so
 * dedupe operates on the final body).
 */
function transformMarkdown(text, fileDir, relFile, defaultTitle, opts) {
	const { masked, blocks } = maskFences(text);
	let out = masked;
	out = fixImageRefs(out, fileDir, relFile);
	out = rewriteMarkdownLinks(out, fileDir, relFile);
	out = rewriteHtmlBinaryRefs(out, fileDir, relFile);
	out = applyTitleAndH1(out, defaultTitle, opts);
	return unmaskFences(out, blocks);
}

// ---------------------------------------------------------------------------
// Default mode: mirror site/docs/ -> src/content/docs/docs/
// ---------------------------------------------------------------------------
function importDocsTree(srcDir, destDir) {
	for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
		const srcPath = path.join(srcDir, entry.name);
		const relFromRoot = toPosixRel(WALK_ROOT, srcPath);

		if (isExcludedRel(relFromRoot)) {
			stats.skipped.push(`${toPosixRel(repoRoot, srcPath)} (excluded staff tree)`);
			continue;
		}

		if (entry.isDirectory()) {
			importDocsTree(srcPath, path.join(destDir, entry.name));
			continue;
		}

		if (SKIP_FILES.has(entry.name)) {
			if (entry.name !== '_sidebar.md') {
				stats.skipped.push(toPosixRel(repoRoot, srcPath));
			}
			continue;
		}

		const ext = path.extname(entry.name).toLowerCase();
		if (ext === '.md') {
			const isRootReadme =
				entry.name === 'README.md' && path.resolve(srcDir) === path.resolve(SRC_DOCS);
			const destName = isRootReadme ? 'index.md' : entry.name;
			const defaultTitle = isRootReadme
				? 'The Fab Lab Documentation'
				: entry.name.replace(/\.md$/, '');
			const relFile = toPosixRel(repoRoot, srcPath);
			let text = fs.readFileSync(srcPath, 'utf8');
			text = transformMarkdown(text, srcDir, relFile, defaultTitle, {
				forceTitle: isRootReadme,
			});
			fs.mkdirSync(destDir, { recursive: true });
			fs.writeFileSync(path.join(destDir, destName), text);
			stats.pages++;
		} else if (IMAGE_EXTS.has(ext)) {
			fs.mkdirSync(destDir, { recursive: true });
			fs.copyFileSync(srcPath, path.join(destDir, entry.name));
			stats.images++;
		} else if (BINARY_EXTS.has(ext)) {
			copyBinary(srcPath, srcDir);
		} else {
			stats.skipped.push(toPosixRel(repoRoot, srcPath));
		}
	}
}

// ---------------------------------------------------------------------------
// --in-place mode: files already sit at src/content/docs/docs/**; apply the
// same transforms directly, and still copy binaries out to public/files/
// (they don't belong in the content collection).
// ---------------------------------------------------------------------------
function transformInPlace(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const entryPath = path.join(dir, entry.name);
		const relFromRoot = toPosixRel(WALK_ROOT, entryPath);

		if (isExcludedRel(relFromRoot)) {
			// Should not normally occur in-place (excluded trees are never
			// git-mv'd in), but honor the same path-based guard defensively.
			fs.rmSync(entryPath, { recursive: true, force: true });
			stats.skipped.push(`${relFromRoot} (excluded staff tree, removed in-place)`);
			continue;
		}

		if (entry.isDirectory()) {
			transformInPlace(entryPath);
			continue;
		}

		if (SKIP_FILES.has(entry.name)) {
			if (entry.name !== '_sidebar.md') stats.skipped.push(relFromRoot);
			else fs.rmSync(entryPath, { force: true });
			continue;
		}

		const ext = path.extname(entry.name).toLowerCase();
		if (ext === '.md') {
			const isRootIndex = entry.name === 'index.md' && path.resolve(dir) === path.resolve(WALK_ROOT);
			const defaultTitle = isRootIndex
				? 'The Fab Lab Documentation'
				: entry.name.replace(/\.md$/, '');
			let text = fs.readFileSync(entryPath, 'utf8');
			text = transformMarkdown(text, dir, relFromRoot, defaultTitle, {
				forceTitle: isRootIndex,
			});
			fs.writeFileSync(entryPath, text);
			stats.pages++;
		} else if (IMAGE_EXTS.has(ext)) {
			stats.images++; // already in place; nothing to do
		} else if (BINARY_EXTS.has(ext)) {
			copyBinary(entryPath, dir);
			fs.rmSync(entryPath, { force: true }); // binaries don't belong in the content collection
		}
	}
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
if (!IN_PLACE) {
	// Fresh import: clear previous output so deletions upstream propagate.
	fs.rmSync(DEST_DOCS, { recursive: true, force: true });
	fs.rmSync(PUBLIC_FILES_DEST, { recursive: true, force: true });
	importDocsTree(SRC_DOCS, DEST_DOCS);

	// Safety manual -> /safety/
	const safetyText = fs.readFileSync(SAFETY_SRC, 'utf8');
	const transformedSafety = transformMarkdown(
		safetyText,
		path.dirname(SAFETY_SRC),
		toPosixRel(repoRoot, SAFETY_SRC),
		'Fab Lab Safety & Emergency Manual',
		{ forceTitle: true }
	);
	fs.mkdirSync(path.dirname(SAFETY_DEST), { recursive: true });
	fs.writeFileSync(SAFETY_DEST, transformedSafety);
	stats.pages++;
} else {
	transformInPlace(WALK_ROOT);
	// Safety manual, if present at its destination, gets the same treatment.
	if (fs.existsSync(SAFETY_DEST)) {
		let text = fs.readFileSync(SAFETY_DEST, 'utf8');
		text = transformMarkdown(
			text,
			path.dirname(SAFETY_DEST),
			toPosixRel(repoRoot, SAFETY_DEST),
			'Fab Lab Safety & Emergency Manual',
			{ forceTitle: true }
		);
		fs.writeFileSync(SAFETY_DEST, text);
	}
}

// ---------------------------------------------------------------------------
// f. Report
// ---------------------------------------------------------------------------
console.log(`Mode: ${IN_PLACE ? '--in-place' : 'copy (default)'}`);
console.log(`Pages written: ${stats.pages}`);
console.log(`Images copied: ${stats.images}`);
console.log(`Binaries copied to public/files/: ${stats.binaries}`);
console.log(`Binary HTML attr refs rewritten (model-viewer/object/a): ${stats.binaryRefsRewritten}`);
console.log(`Links rewritten: ${stats.linksRewritten}`);
console.log(`H1s stripped (duplicate-H1 fix): ${stats.h1Stripped}`);
console.log(`H1s demoted to H2 (extra body H1s beyond the first): ${stats.h1Demoted}`);
console.log(`Titles overridden from body-H1: ${stats.titlesFromBodyH1}`);
console.log(`Files skipped: ${stats.skipped.length}`);
for (const f of stats.skipped) console.log(`  - ${f}`);
console.log(`Docsify-clamped image refs repaired: ${stats.fixedImageRefs.length}`);
for (const f of stats.fixedImageRefs) console.log(`  - ${f}`);
console.log(`Links into excluded (staff) trees: ${stats.linksIntoExcluded.length}`);
for (const f of stats.linksIntoExcluded) console.log(`  - ${f}`);
console.log(`Anchored links (#fragment kept as-is): ${stats.anchoredLinks.length}`);
for (const f of stats.anchoredLinks) console.log(`  - ${f}`);
console.log(`Unresolvable links (left unchanged): ${stats.unresolvableLinks.length}`);
for (const f of stats.unresolvableLinks) console.log(`  - ${f}`);
