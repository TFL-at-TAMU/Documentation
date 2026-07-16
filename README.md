# Documentation

The Fab Lab (TFL at TAMU) documentation site: machine manuals, learning assignments, and shop
standards for a university makerspace. Built with [Astro](https://astro.build/) and
[Starlight](https://starlight.astro.build/).

**Live site:** https://tfl.aidanstew.art — landing at `/`, docs at `/docs/`, safety manual at
`/safety/`, contact at `/contact/`.

> The old `docs.aidanstew.art` host 301-redirects to `https://tfl.aidanstew.art/docs/`, and a
> compatibility shim (see `astro.config.mjs`) client-redirects old Docsify `#/…` hash links to
> their new slugged URL.

## Stack

- **Astro** `7.0.6` + **Starlight** `0.41.3` (pinned exact versions — see `package.json`).
- Static output: everything renders to HTML at build time (no client-side rendering of content).
- GitHub-style `> [!NOTE]` callouts via `remark-github-blockquote-alert`.
- Gruvbox light/dark theme (`src/styles/gruvbox.css`), Inter (body) / Space Grotesk (headings).
- Starlight's sidebar autogenerates from the content folder tree — no separate sidebar file to
  maintain.

## Layout

| Path | What it is |
|---|---|
| `src/content/docs/docs/**` | The documentation manuals and learning assignments (Starlight content collection). Sidebar groups mirror the folder structure. |
| `src/content/docs/safety.md` | The Fab Lab Safety & Emergency Manual, served at `/safety/`. |
| `src/pages/` | Custom, non-Starlight pages: `index.astro` (landing page at `/`) and `contact.astro` (`/contact/`). |
| `src/components/Header.astro` | Starlight header override that adds the shared Home / Documentation / Safety / Contact nav links. |
| `public/files/` | Downloadable binaries referenced from the docs (`.stl`, `.pdf`, `.ods`, `.zip`) — served at `/files/...`. |
| `public/_headers` | Cloudflare Pages response headers (cache control). |
| `scripts/migrate_content.mjs` | The one-time Docsify → Starlight content migration tool. Not part of the normal contributor workflow — kept for reference. |

Staff-facing docs (credentials, networking/IT internals, service manuals) live elsewhere and are
intentionally excluded from this site.

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

**Cloudflare Pages** builds with `npm ci && npm run build`, output directory `dist`.

## How to add a doc

1. Drop a `.md` file into the right folder under `src/content/docs/docs/` (create a new folder if
   it's a new machine or category — folders become sidebar groups automatically).
2. The page title comes from the filename, or you can set it explicitly with a `title:` line in
   YAML frontmatter:

   ```markdown
   ---
   title: My Machine Operation Manual
   ---

   Page content here...
   ```
3. That's it — the sidebar updates automatically on the next build, no separate navigation file to
   edit.

If your doc links to another doc, use a normal relative Markdown link
(`[Safety Manual](../Safety%20Manual.md)`); if it references a binary file (`.stl`/`.pdf`/`.ods`/
`.zip`), put the binary in the same folder as the doc — binaries aren't served directly from
`src/content/`, so ask a maintainer to run the migration/relocation step if you're adding new
non-image binaries.

## Contributing

- **All changes go through a pull request** into `main` (direct pushes are blocked by a branch
  ruleset).
- A required status check, **`check-file-size`**, fails any PR that adds a file larger than
  **25 MiB** — Cloudflare Pages rejects single files above that limit. Host large assets
  off-Pages (a GitHub Release asset or an R2 bucket) and link to them instead of committing them.
