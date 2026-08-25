# TODO

> **New here / picking this up cold?** Start with [CLAUDE.md](CLAUDE.md) — project
> orientation, hard rules, workflow, and infra pointers.

## Owner setup (one-time, needs repo admin — created by the maintainability PR)

- [ ] Add the `ANTHROPIC_API_KEY` repo secret (or `CLAUDE_CODE_OAUTH_TOKEN` for
      subscription auth) so the automatic Claude PR review workflow can run
      (`.github/workflows/claude-review.yml`). Until then the workflow skips itself.
- [ ] Make the **`build`** check required in the `main` branch ruleset, next to
      `check-file-size`, so PRs that break the site can't merge.
- [ ] **History scrub**: the unpublished staff trees were removed from the working tree
      but remain in git history. Run
      `git filter-repo --invert-paths --path 'site/docs/IT' --path 'site/docs/Networking' --path 'site/docs/FDM Printers/Dual Head FDM Printer/Operations & Safety Manual/Raise3D E2 Printer Staff Service Manual.md'`
      on a fresh clone (first sweep `git log --all --follow --name-only` for any earlier
      paths of those files and add them), force-push `main` with ruleset bypass, have
      everyone re-clone, then ask GitHub Support to purge cached views/forks.
- [ ] Delete the stale `poc/starlight` branch (superseded by the merged migration).

## Site wishlist

- [ ] **Lucide icons on sidebar groups** — Starlight-native path via the sidebar config.
- [ ] **Real contact details** for Jimmy Walker / Aidan Stewart / Paul Deere on
      `/contact/` (visible placeholders + `TODO` comments are in `src/pages/contact.astro`).
- [ ] **Sidebar group ordering** — currently alphabetical; decide if curated order
      (e.g. printers first) is worth it.
- [ ] **"Fancy" safety page** — richer layout for `/safety/`.
- [ ] **Landing page refresh.**
- [ ] **Dead-link cleanup** — a set of links was already dead pre-migration and left
      as-is; the build's link validator now reports them (see the `exclude` list in
      `astro.config.mjs` if any are grandfathered). Fix or remove as content gets touched.

## Content (owner-led, separate effort)

- [ ] **Machine-page revamps** — remaining machines per the list in
      [CLAUDE.md](CLAUDE.md) / [REVAMP_PROMPT.md](REVAMP_PROMPT.md): Cricut, FDM
      Printers, PCB Machines (NeoDen ×2), SLA Printers, Workbenches. Then retire the
      `Templates` group and create the shared which-machine page.
- [ ] **Content structure / information architecture** — Diátaxis-style restructure of
      the manuals. Grain decisions still open: 3D-model stub pages (merge vs.
      standalone), Electric Workbench manual (combined vs. per-instrument).
- [ ] Re-home the student-facing **Networking IOT Learning Assignment** if it should
      return to the public site (its parent tree was staff-facing and now lives only in
      git history / Google Docs).

---

_This file is the consolidated roadmap; update items here as they ship._
