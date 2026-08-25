# CLAUDE.md — start here

Orientation for an AI session (or any new maintainer) seeing this repo for the first time.
Read this file fully before changing anything; it carries the project's accumulated
decisions. Deeper detail lives in the files it links to.

## What this is

The public documentation site for **The Fab Lab**, Texas A&M University's student-run
makerspace: machine manuals, learning assignments, shop standards, and the lab-wide
Safety & Emergency Manual. Repo `TFL-at-TAMU/Documentation` — **public**. Built with
**Astro + Starlight** (versions pinned exact in `package.json`), hosted on
**Cloudflare Pages**, which auto-deploys `main` (~2 minutes).

**Live:** https://tfl.aidanstew.art — landing `/`, docs `/docs/`, safety manual
`/safety/`, contact `/contact/`, "Ask your own AI" `/ask/`.

**The audience is nervous first-time students standing at unfamiliar, sometimes dangerous
machines.** Clarity and safety beat speed and cleverness everywhere on this site. There is
no deadline; a page shipped 90% right is worse than one done right.

## Repo map

| Path | What it is |
|---|---|
| `src/content/docs/docs/**` | The manuals and assignments (Starlight content collection). Folders become sidebar groups; original names with spaces/`&` are kept and Astro slugifies the routes. `index.md` is the docs home. |
| `src/content/docs/safety.md` | The Safety & Emergency Manual (`/safety/`). |
| `src/pages/` | Custom non-Starlight pages: `index.astro` (landing), `contact.astro`, `ask.astro` ("Ask your own AI" — hands visitors a prompt pointing their AI at `/llms-full.txt`). |
| `src/components/Header.astro` | Starlight header override adding the shared Home / Documentation / Safety / Contact nav (+ `MobileMenuFooter.astro`). |
| `src/routeData.ts` | The site-wide notification banner. Edit `BANNER_CONTENT` / flip `BANNER_ENABLED` there — nothing else to touch. |
| `src/styles/gruvbox.css` | The theme (Gruvbox light/dark; Inter body, Space Grotesk headings). |
| `astro.config.mjs` | Starlight config: sidebar, edit-link, llms-txt plugin, fonts, and the old-Docsify hash-redirect shim (its slug rule is documented inline — keep it intact). |
| `public/files/` | Downloadable binaries (`.stl`, `.pdf`, `.ods`, `.zip`) served at `/files/…`. |
| `public/_redirects` | Cloudflare Pages 301s. **Every page rename or merge adds a line here.** |
| `public/_headers` | Cache policy (`max-age=0, must-revalidate` — deploys were repeatedly masked by browser caching before this). |
| `DOCS_FORMAT.md` | **The format standard for machine pages.** Read it before writing or restructuring any machine content. |
| `REVAMP_PROMPT.md` | Kickoff prompt for per-machine doc-revamp sessions (workflow details below). |
| `CONTRIBUTING.md` | Student contributor guide pointer (the real guide is a docs page on the site). |
| `TODO.md` | The live roadmap. |

Staff-facing docs (credentials, IT/networking internals, service manuals) live in Google
Docs, **not this repo** — this site is user-facing only. Do not add staff content here.

## Commands

```bash
npm ci            # install (Node 20+; Cloudflare builds with NODE_VERSION=24)
npx astro dev     # dev server with live reload at localhost:4321
npm run build     # static build to dist/ — this is also the main correctness check
npx astro preview # serve the production build locally
```

The build **fails on broken image paths and broken internal links** (the
`starlight-links-validator` plugin) — that is working as intended; fix the path, don't
work around the check.

## Hard rules (each was decided deliberately — don't re-litigate in-session)

- **Plain `.md` only** for content. MDX was evaluated and rejected: non-technical student
  staff must be able to edit pages.
- **Never invent a machine fact** — no specs, locations, settings, or policies you don't
  have a source for. Use `[bracketed placeholders]` or a
  `:::note[Staff note — <machine> lead]` callout, or ask the owner. `draft: true` in
  frontmatter unpublishes a page that isn't ready.
- **Follow `DOCS_FORMAT.md`** for machine pages — a strong default, not a straitjacket
  (it says what never bends: frontmatter title / no body H1, callout semantics at the
  point of hazard, link/redirect mechanics, safety content on the machine page itself).
- **Warnings must stay credible**: callouts only for real hazards. Over-warning trains
  people to ignore warnings.
- **Renamed or merged a page? Add a 301** to `public/_redirects` in the same change.
- **No subagents** — the owner pays per token and prefers direct work.
- **Aesthetic/CSS decisions belong to the owner**: render options and show them before
  committing; they often prefer to hand-tweak the file themselves.
- **No files ≥ 25 MiB** (Cloudflare Pages hard limit; CI enforces it). Host big assets
  elsewhere (GitHub Release, R2) and link them.

## Gotchas that have already cost debugging rounds

- Sidebar `autogenerate.directory` in `astro.config.mjs` matches the **on-disk folder
  path** (`docs/CNC Mill`), *not* the slugified route (`docs/cnc-mill`). A slugified path
  silently produces an empty sidebar group.
- The hash-redirect shim in `astro.config.mjs` encodes the slug rule old Docsify links
  depend on (per segment: lowercase, spaces→`-`, `&` dropped, other non `[a-z0-9-_]`
  dropped). Don't alter it casually.
- **Browser caching masks deploys.** When verifying web output: check the built file in
  `dist/` first, then hard-refresh (Ctrl+Shift+R) or cache-bust the URL.
- Repo-layout changes and Cloudflare build settings must change together; if they diverge
  the production build fails (Cloudflare keeps serving the last good deploy, so the site
  stays up).
- When serving `dist/` locally for a headless-browser check, serve with correct
  `Content-Type: text/html` or scripts won't execute and tests false-fail.

## Workflow and verification bar

All changes go through a **PR into `main`** (direct pushes are blocked by a ruleset).
Work on a session branch; one PR per coherent change; squash-merge; after each merge,
reset the session branch onto `origin/main` and force-push (stacking on pre-squash
history causes phantom conflicts).

**Before every merge, verify behaviorally — never just by eye:**

1. `npm run build` completes clean (this also validates internal links and images).
2. Every internal link and slugged route you touched resolves in `dist/`.
3. No page renders two `<h1>` elements.
4. Screenshot the built page at desktop **and** ~390 px mobile width, and actually look
   at both.

CI on every PR: a build check and a 25 MiB file-size check, plus an automatic Claude
review comment (`.github/workflows/`).

## Machine-page revamp workflow

The machine docs are being rebuilt one machine per session against `DOCS_FORMAT.md`.
Kick off such a session with the prompt in `REVAMP_PROMPT.md` (keep that file's
"already done" list current as machines ship). Per machine: merge the operations +
safety manual pair into one machine page; slim assignments to lean exercises; clean
Google-Docs export damage (`##` on paragraphs, `[[a]]` comment markers,
google-redirect URLs, metadata blocks); add `_redirects` 301s for every retired URL;
repoint inbound links. The **3D Scanner trio** (manual + "How 3D Scanning Works" +
lean assignment) is the gold standard to imitate; Laser Cutter, CNC Mill, and Solder
Reflow Oven are also done.

## Talking to the owner

The owner (Fab Lab VP, solo maintainer) is usually present and prefers a concise
**multiple-choice question** over a guess or a staff-note fallback whenever a real
decision comes up — access policy, ambiguous procedure, unclear machine fact, layout
choice. Ask; don't assume.
