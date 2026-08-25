# Documentation

The Fab Lab (TFL at TAMU) documentation site: machine manuals, learning assignments, and shop
standards for a university makerspace. Built with [Astro](https://astro.build/) and
[Starlight](https://starlight.astro.build/).

**Live site:** https://tfl.aidanstew.art — landing at `/`, docs at `/docs/`, safety manual at
`/safety/`, contact at `/contact/`, "Ask your own AI" at `/ask/`.

> The old `docs.aidanstew.art` host 301-redirects to `https://tfl.aidanstew.art/docs/`, and a
> compatibility shim (see `astro.config.mjs`) client-redirects old Docsify `#/…` hash links to
> their new slugged URL.

**New here?**

- Fixing or writing documentation → read the on-site guide, **Contributing to These Docs**
  (linked from [CONTRIBUTING.md](CONTRIBUTING.md)). No Git knowledge needed.
- Working on the site itself (or you're an AI session) → start with **[CLAUDE.md](CLAUDE.md)**,
  then [DOCS_FORMAT.md](DOCS_FORMAT.md) for the machine-page standard and [TODO.md](TODO.md)
  for the roadmap.

## Stack

- **Astro** + **Starlight** (pinned exact versions — see `package.json`).
- Static output: everything renders to HTML at build time (no client-side rendering of content).
- GitHub-style `> [!NOTE]` callouts via `remark-github-blockquote-alert`.
- Build-time internal-link validation via `starlight-links-validator` (broken links fail the build).
- Gruvbox light/dark theme (`src/styles/gruvbox.css`), Inter (body) / Space Grotesk (headings).
- Starlight's sidebar autogenerates from the content folder tree — no separate sidebar file to
  maintain.

## Layout

| Path | What it is |
|---|---|
| `src/content/docs/docs/**` | The documentation manuals and learning assignments (Starlight content collection). Sidebar groups mirror the folder structure. |
| `src/content/docs/safety.md` | The Fab Lab Safety & Emergency Manual, served at `/safety/`. |
| `src/pages/` | Custom, non-Starlight pages: `index.astro` (landing page at `/`), `contact.astro` (`/contact/`), and `ask.astro` (`/ask/`, the "Ask your own AI" page). |
| `src/components/Header.astro` | Starlight header override that adds the shared Home / Documentation / Safety / Contact nav links. |
| `src/routeData.ts` | The site-wide notification banner (message + on/off switch live here). |
| `public/files/` | Downloadable binaries referenced from the docs (`.stl`, `.pdf`, `.ods`, `.zip`) — served at `/files/...`. |
| `public/_redirects` | Cloudflare Pages 301s for renamed/merged pages. |
| `public/_headers` | Cloudflare Pages response headers (cache control). |

Staff-facing docs (credentials, networking/IT internals, service manuals) live in Google Docs,
**not this repo** — this site is user-facing only.

## Local development

Requires Node.js v20+ (v22/v24 both work).

```bash
npm ci
npx astro dev
```

This starts a dev server with live reload at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs the static site to `dist/`. Preview the production build locally with `npx astro preview`.

## Hosting / infra reference

| Thing | Value |
|---|---|
| Host | Cloudflare Pages, project **`documentation`**, account `7cb3961b81cd8b4c62808cb72b47dff6` |
| Build command | `npm ci && npm run build` (env var `NODE_VERSION=24`), output directory `dist` |
| Deploys | Automatic on every merge to `main` (~2 minutes; hard-refresh when checking) |
| Primary domain | `tfl.aidanstew.art` (placeholder personal domain, not final) |
| Old domain | `docs.aidanstew.art` → 301 → `tfl.aidanstew.art/docs/` via a zone Redirect Rule (preserves old Docsify `#/…` hash links) |
| pages.dev | `documentation-63v.pages.dev` |
| Caching | `public/_headers` sets `max-age=0, must-revalidate` (browser caching repeatedly masked deploys before this) |

## How to add a doc

1. Drop a `.md` file into the right folder under `src/content/docs/docs/` (create a new folder if
   it's a new machine or category — folders become sidebar groups automatically).
2. Start the file with YAML frontmatter carrying the title (don't repeat it as a `#` heading in
   the body):

   ```markdown
   ---
   title: My Machine Operation Manual
   ---

   Page content here...
   ```
3. That's it — the sidebar updates automatically on the next build, no separate navigation file to
   edit.

Machine pages follow the format standard in [DOCS_FORMAT.md](DOCS_FORMAT.md). Link to other pages
by their site URL (`[Safety Manual](/safety/)`), put images next to the page that uses them, and
put downloadable binaries (`.stl`/`.pdf`/`.ods`/`.zip`) under `public/files/` mirroring the doc's
folder path — they're served at `/files/…`.

## Contributing

- **All changes go through a pull request** into `main` (direct pushes are blocked by a branch
  ruleset). The solo maintainer merges with
  `gh pr merge <n> --repo TFL-at-TAMU/Documentation --squash --admin --delete-branch`.
- CI on every PR: **`build`** (the site must build clean — broken links and images fail here) and
  **`check-file-size`** (fails any file larger than **25 MiB**, Cloudflare Pages' hard per-file
  limit — host large assets off-Pages, e.g. a GitHub Release asset or an R2 bucket, and link to
  them instead). A Claude workflow also leaves an automatic review comment on each PR.
