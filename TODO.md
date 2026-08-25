# TODO

> **New here / picking this up cold?** Start with [CLAUDE.md](CLAUDE.md) — project
> orientation, hard rules, workflow, and infra pointers.

## Owner setup (one-time, needs repo admin — created by the maintainability PR)

Each of these is a manual step GitHub only lets a repo admin do; the code side is
already in place. Do them after the maintainability PR merges.

### 1. Add the Claude credential (turns the review bot on)

The review workflow (`.github/workflows/claude-review.yml`) skips itself until one of
these secrets exists, so student PRs never see a red X in the meantime.

- On your own machine run `claude setup-token` — it mints a token from your existing
  Claude subscription (no separate API billing).
- In the repo: **Settings → Secrets and variables → Actions → New repository secret**.
  Name it `CLAUDE_CODE_OAUTH_TOKEN`, paste the token, save.
- (Alternative, if you'd rather bill a metered API account: name the secret
  `ANTHROPIC_API_KEY` and paste an API key from console.anthropic.com instead. The
  workflow accepts either.)

### 2. Make `build` a required check (blocks PRs that break the site)

- **Settings → Rules → Rulesets** → open the ruleset protecting `main` (the one that
  already requires `check-file-size`). If none exists, **New ruleset → New branch
  ruleset**, target branch `main`.
- Enable **Require status checks to pass**, click **Add checks**, and add **`build`**
  (it appears in the list after the build workflow has run on at least one PR — open
  this repo's first PR, let CI run, then come back). Leave `check-file-size` checked too.
- Save. Now a red build blocks merge; optionally add `Claude review` here as well if you
  ever want the bot's pass to be required (not recommended — it's meant to advise, not gate).

### 3. History scrub (removes the old staff files from git history)

The staff trees were deleted from the working tree, but old commits still contain them —
including the credentials doc. This rewrites history to purge them. It's disruptive
(everyone must re-clone), so pick a quiet moment.

1. Fresh clone: `git clone https://github.com/TFL-at-TAMU/Documentation && cd Documentation`
2. Check for any earlier paths those files lived at:
   `git log --all --follow --name-only -- 'site/docs/*' | less` — add any extra paths you
   find to the `--path` list below.
3. Install the tool (`pip install git-filter-repo`) and run:
   ```
   git filter-repo --invert-paths \
     --path 'site/docs/IT' \
     --path 'site/docs/Networking' \
     --path 'site/docs/FDM Printers/Dual Head FDM Printer/Operations & Safety Manual/Raise3D E2 Printer Staff Service Manual.md'
   ```
4. Force-push the rewritten history: `git push origin --force --all` (you may need to
   temporarily allow force-pushes in the ruleset, then re-lock it).
5. Tell any collaborators to delete their local clone and re-clone — old clones still hold
   the removed history.
6. Treat the exposed credentials as burned regardless (rotation was already done), and
   optionally email GitHub Support to purge cached views and any forks.

### 4. Delete the stale `poc/starlight` branch

- [ ] Superseded by the merged migration — **Branches → delete `poc/starlight`** (or
      `git push origin --delete poc/starlight`).

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
