# Documentation

The Fab Lab (TFL at TAMU) documentation site. Content lives as Markdown under [`docs/`](docs/)
and is rendered in the browser by [Docsify](https://docsify.js.org/) — there is no build step
for the content itself, the Markdown is served as-is.

**Live site:** https://docs.aidanstew.art

## Hosting

The site is hosted on **Cloudflare Pages**, auto-deploying on every push to `main`.

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `python3 scripts/generate_sidebar.py` |
| Build output directory | `docs` |

The build command regenerates the navigation sidebar (see below). If it is ever cleared, the
site still deploys and serves the last-committed `docs/_sidebar.md` — the sidebar just stops
updating automatically.

## Navigation sidebar

`docs/_sidebar.md` is **generated**, not hand-edited. [`scripts/generate_sidebar.py`](scripts/generate_sidebar.py)
walks the `docs/` folder tree and writes a Docsify sidebar from it (folders become section
headers, `.md` files become links). It uses only the Python standard library — no dependencies.

It runs automatically as the Cloudflare Pages **build command** on every deploy, so you never
need to edit the sidebar by hand. Just add, rename, or remove Markdown files and the navigation
follows on the next deploy.

To preview the regenerated sidebar locally, run it from the repo root:

```bash
python3 scripts/generate_sidebar.py
```

## Contributing

- **All changes go through a pull request** into `main` (direct pushes are blocked by a branch
  ruleset).
- A required status check, **`check-file-size`**, fails any PR that adds a file larger than
  **25 MiB** — Cloudflare Pages rejects single files above that limit. Host large assets
  off-Pages (a GitHub Release asset or an R2 bucket) and link to them instead of committing them.
