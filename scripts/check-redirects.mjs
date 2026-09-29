// Verifies that every site-local target in public/_redirects exists in the built
// site (dist/). Runs as part of `npm run build`, after `astro build`.
//
// Why: the machine permalinks (/m/<machine>/) are printed on QR stickers, so a
// permalink whose target page has been renamed or moved would send a student at a
// machine to a 404. starlight-links-validator checks links inside pages, but it
// never reads _redirects — this does. It also catches a retired-URL 301 that was
// pointed at a page which has since moved again.
//
// A target must resolve directly: a route ending in "/" needs dist/<route>/index.html,
// and anything else needs dist/<path> as a file. Pointing one redirect at another
// redirect's source is reported as an error, since the target should be a live page.
// External (http://) targets are not checked.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '..', '..');
const redirectsPath = join(root, 'public', '_redirects');
const dist = join(root, 'dist');

if (!existsSync(dist)) {
	console.error(`check-redirects: ${dist} does not exist — run \`astro build\` first.`);
	process.exit(1);
}

const lines = readFileSync(redirectsPath, 'utf8').split('\n');
const rules = [];
for (const [index, raw] of lines.entries()) {
	const line = raw.trim();
	if (!line || line.startsWith('#')) continue;
	const [source, target, code] = line.split(/\s+/);
	if (!source || !target) {
		console.error(`check-redirects: _redirects line ${index + 1} is not "source target [code]": ${raw}`);
		process.exit(1);
	}
	rules.push({ line: index + 1, source, target, code: code ?? '302' });
}

const sources = new Set(rules.map((r) => r.source));
const errors = [];

for (const rule of rules) {
	const { line, source, target } = rule;
	if (/^https?:\/\//.test(target)) continue;
	// Dynamic rules (splats / placeholders) are mapped, not looked up.
	if (/[:*]/.test(target)) continue;

	if (sources.has(target)) {
		errors.push(`line ${line}: ${source} -> ${target} points at another redirect's source; point it at the live page instead.`);
		continue;
	}

	const path = decodeURIComponent(target.split(/[?#]/)[0]);
	const onDisk = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
	if (!existsSync(onDisk) || !statSync(onDisk).isFile()) {
		errors.push(`line ${line}: ${source} -> ${target} does not exist in dist/ (looked for ${onDisk.slice(root.length + 1)}).`);
	}
}

const permalinks = rules.filter((r) => r.source.startsWith('/m/') && !/[:*]/.test(r.source));
for (const rule of permalinks) {
	if (!rule.source.endsWith('/')) {
		errors.push(`line ${rule.line}: permalink ${rule.source} must end with "/" (the trailing-slash rule sends /m/x to /m/x/).`);
	}
	if (rule.code !== '302') {
		errors.push(`line ${rule.line}: permalink ${rule.source} must be a 302 so browsers never cache it (see the comment in _redirects).`);
	}
}

if (errors.length) {
	console.error(`check-redirects: ${errors.length} problem(s) in public/_redirects:`);
	for (const e of errors) console.error(`  ${e}`);
	process.exit(1);
}

console.log(`check-redirects: all ${rules.length} redirect targets resolve (${permalinks.length} machine permalinks).`);
