# Starlight Migration Plan

**Status:** planned, not started. Written 2026-07-06 after the proof-of-concept was reviewed and approved.
**Execute by:** working through the phases below in order. Each phase is a separate PR and is safe to stop after.
**PoC branch:** `poc/starlight` (pushed to origin; commits `290f80d` + `a3b14ad`). It is a *reference implementation* — the real migration re-does the work properly (move, not copy), but every technical decision was validated there.

## Why we're migrating

The current site is Docsify: markdown rendered **in the browser** on every visit. Problems hit in practice:
- Docsify hijacks page elements (it grabbed the shared top bar's `<nav>` and absolutely positioned it — PR #25) and bakes theme colors at render time (theme toggle requires a reload).
- No build-time validation: broken image paths silently "work" (Docsify clamps `../` overshoots) until they don't.
- Weak SEO (empty HTML shell), no real search index, and the landing/safety/docs pages each hand-maintain their own copies of shared chrome.

Astro Starlight renders everything to static HTML at build time, autogenerates the sidebar from the folder tree (replacing `scripts/generate_sidebar.py`), ships Pagefind search, has first-class custom pages (landing), and is stewarded by Cloudflare (acquired Astro Jan 2026) — the same platform hosting this site.

## Decisions already made (do not re-litigate)

| Decision | Choice | Where proven |
|---|---|---|
| Framework | Astro **7.0.6** + Starlight **0.41.3**, pinned exact (no `^`) | PoC `package.json` |
| URL structure | `/` landing · `/docs/...` docs · `/safety/` manual — unchanged from today | PoC verified via curl + browser |
| Content location | `src/content/docs/docs/**` (docs), `src/content/docs/safety.md` (manual), **original filenames kept** (spaces/`&` — Astro slugifies routes) | PoC import |
| Sidebar | Starlight `autogenerate` per top-level folder. **Gotcha:** `autogenerate.directory` matches the **on-disk folder path** (`docs/CNC Mill`), NOT the slugified route (`docs/cnc-mill`). Slugified paths silently produce empty groups. | PoC commit `a3b14ad` |
| Theme | Gruvbox dark+light via `--sl-color-*` overrides in `src/styles/gruvbox.css`; Inter body / Space Grotesk headings via Google Fonts in Starlight `head` config | PoC |
| Callouts | `> [!NOTE]`-style GitHub alerts via `remark-github-blockquote-alert` (pinned 2.1.0) | PoC |
| Landing page | `src/pages/index.astro`, copy carried over verbatim from `site/index.html`, reads Starlight's `starlight-theme` localStorage key (falls back to legacy `theme` key, then system) | PoC |
| Slug pattern | Per segment: lowercase, spaces→`-`, `&` dropped (leaves `--`), `_` kept. E.g. `CNC Mill/Operations & Safety Manual/Carvera CNC Operation Manual.md` → `/docs/cnc-mill/operations--safety-manual/carvera-cnc-operation-manual/` | PoC |
| Node | v24 LTS installed system-wide on the dev machine (winget, 2026-07-06) | verified |

## Known issues the migration MUST fix (found in PoC, deliberately punted there)

1. **~112 relative `.md` cross-links 404** — content links like `[Carvera Safety Manual](<Carvera CNC Safety Manual.md>)` point at file paths, not slugified URLs. Fix in the conversion script: rewrite md-to-md links using the same slugify logic as Astro (per-segment; resolve relative paths first).
2. **Duplicate H1s** — frontmatter `title` renders as the page H1, and many docs carry their own `# Title` in the body. Fix in conversion: if the body's first heading is an H1 that (case-insensitively, trimmed) matches the title, strip it. If it *differs*, prefer the body H1 as the frontmatter title and strip it.
3. **Binary assets dead** (20 files: 7 `.stl`, 4 `.ods`, 4 `.mmd`, 2 `.zip`, 1 `.pdf`, plus `.nojekyll`/`index.html` which just get dropped) — copy binaries to `public/files/<mirrored path>` and rewrite references (download links and the `<model-viewer src>` attrs in the 7 model-wrapper pages) to those URLs.
4. **43 files have Google-Docs-export frontmatter** (`title` + `source_id` + `modified`) — keep as-is; only ensure `title` exists. The other 28 get injected titles (filename minus `.md`), except prefer the body-H1 rule from item 2.

## Compatibility shim for old deep links

`docs.aidanstew.art` already 301s to `https://tfl.aidanstew.art/docs/` (zone Redirect Rule) and browsers reattach `#/...` fragments — but Starlight URLs are slugged paths, so an old link like `.../docs/#/Studio%20Standards` lands on the docs index, not the page.

Fix: tiny inline script on the docs index page only (`src/content/docs/docs/index.md` can't hold it — put it in the Starlight `head` config, guarded by `location.pathname === '/docs/'`): if `location.hash` starts with `#/`, decode it, slugify each segment with the same rules as the slug pattern above, and `location.replace('/docs/' + slugged + '/')`. Keep the slugify function identical to the conversion script's (single source: document both). If the target 404s, the 404 page is acceptable fallback — do not over-engineer.

## What gets deleted (in the final phase, not before)

- `site/docs/` Docsify app + all content (content *moves* via `git mv` to preserve history)
- `site/index.html`, `site/safety/` (replaced by Astro pages/content)
- `site/assets/topbar.js` (Starlight header + landing-page bar replace it)
- `site/_headers` → **moves to `public/_headers`** (Astro copies `public/` into `dist/`); keep the `max-age=0, must-revalidate` policy
- `scripts/generate_sidebar.py` (obsolete: sidebar autogenerates)
- `.claude/launch.json` → replace the python server with `npx astro dev --port 4173` (or `astro preview` against `dist`)

## Header navigation parity

Starlight's default header = title + search + theme select + GitHub icon. It does **not** include the Home/Documentation/Safety/Contact links from the current shared top bar. Add them via Starlight **component override** of `Header` (or `SocialIcons` slot hack — prefer the documented Header override): render the four links, active state from `Astro.url.pathname`. The landing page keeps its own matching bar (already built in PoC). **Contact is still a placeholder (`#`)** — ask the owner where it should point before or during Phase 2 (Discord `https://discord.gg/Tvn9rsBUWH` is the likely answer).

## Phases (each = one PR, checks `check-file-size` + Cloudflare Pages must pass, admin-merge per repo convention)

### Phase 1 — Conversion tooling on the PoC base
Branch from `poc/starlight`. Upgrade `scripts/poc_import_content.mjs` into `scripts/migrate_content.mjs` implementing fixes 1–4 above (cross-links, H1 dedupe, binaries→`public/files/`, frontmatter). Re-run against `site/docs/` (still present on the branch), rebuild, and **verify**:
- `npm run build` zero warnings; spot-check 5 cross-links resolve (curl the target URLs from `dist/`)
- no page renders its title twice (grep built HTML: pages with two `<h1`)
- `.stl`/`.pdf`/`.ods`/`.zip` reachable under `/files/...`; `<model-viewer>` pages load their models
- old-hash shim: `/docs/#/Studio%20Standards` client-redirects to `/docs/studio-standards/`
- Header override shows the four nav links on docs pages

### Phase 2 — The real migration PR (to `main`)
Fresh branch from `main`. Recreate the Astro scaffold (copy from Phase 1 branch), then **`git mv`** content into place (history-preserving), run `scripts/migrate_content.mjs` in in-place mode (frontmatter/link rewrites applied to the moved files, committed as content edits), delete the list above, update `README.md` (new architecture, build commands, "how to add a doc" for contributors: *drop a `.md` file in the right folder — title comes from the filename or a `title:` frontmatter line*). Full local build + verification checklist from Phase 1 again.

### Phase 3 — Cloudflare cutover (dashboard, coordinated with Phase 2 merge)
Same coordination pattern as the `site/` restructure (see `hosting-architecture` memory / repo history):
1. Merge the Phase 2 PR. Production build will fail or go stale — expected; the last good deploy keeps serving.
2. In the Pages project (**documentation**, account `7cb3961b81cd8b4c62808cb72b47dff6`): Settings → Build: **Build command** `npm ci && npm run build` · **Build output directory** `dist` · add env var **`NODE_VERSION=24`** (build image default may be older).
3. Deployments → **Retry** the failed deploy. Verify live: `/`, `/docs/`, `/safety/`, one deep manual URL, `/files/` binary, search, dark/light, the old-hash shim, and that `docs.aidanstew.art/#/...` still lands sensibly.
4. Keep the zone Redirect Rule unchanged.

### Phase 4 — Cleanup
Delete `poc/starlight` branch; update `TODO.md` (sidebar icons / "on this page" / reload-free toggle are now solved or re-scoped by Starlight — Lucide icons on sidebar groups have a Starlight-native path via config); note remaining wishlist (Contact destination, fancy safety page, Diátaxis content structure).

## Rollback

Revert the Phase 2 merge commit on `main`, flip Cloudflare build settings back (`python3 scripts/generate_sidebar.py` / output `site` / remove NODE_VERSION), retry deploy. The Docsify site is fully recoverable from git history at any point.

## Delegation playbook (how this was/should be run)

- Owner preference: **supervisor model reviews, cheaper subagent (Sonnet) codes.** Spawn with `isolation: worktree`, full self-contained brief (agents start cold), local commits only — supervisor reviews, pushes, PRs, merges.
- Lesson from the PoC: agents verify what you tell them to verify. The PoC agent confirmed sidebar *labels* existed but not that groups had *children* (they were empty). **Briefs must demand behavioral verification** (counts of links inside groups, curl of actual child URLs), and the supervisor re-verifies independently.
- Second lesson: browser caching masked a correct fix twice in this project. When verifying rebuilt output, check `dist/` HTML on disk first, then hard-refresh (cache-busting query) in the browser.

## Open questions for the owner (ask before Phase 2)

1. Where should **Contact** point? (Discord invite is the standing guess.)
2. Sidebar group ordering: alphabetical (current) or curated (e.g. printers first)?
3. Keep `documentation-63v.pages.dev` publicly accessible or restrict to the custom domain?
