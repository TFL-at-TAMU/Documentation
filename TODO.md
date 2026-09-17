# TODO

> **New here / picking this up cold?** Start with [CLAUDE.md](CLAUDE.md) — project
> orientation, hard rules, workflow, and infra pointers.

## Owner setup (one-time, needs repo admin)

The Claude review credential and the required `build` check are both in place.
One admin task is still outstanding.

### History scrub (removes the old staff files from git history)

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

## Site wishlist

- [ ] **Lucide icons on sidebar groups** — Starlight-native path via the sidebar config.
- [ ] **Sidebar group ordering** — currently alphabetical; decide if curated order
      (e.g. printers first) is worth it.
- [ ] **"Fancy" safety page** — richer layout for `/safety/`.
- [ ] **Landing page refresh.**
- [ ] **Re-home the NeoDen YY1 Formatter downloads** — the two download buttons on the
      pick-and-place page point at Google Drive links (owner's interim choice; the Mac
      build is >25 MiB so Cloudflare Pages can't host it). Proper home: GitHub Releases
      on an org-owned formatter repo (source currently lives under the `juancajuanca1`
      personal account — transfer/fork it to `TFL-at-TAMU` first), then point the
      buttons at `releases/latest/download/…` URLs.
- [ ] **Dead-link cleanup** — a set of links was already dead pre-migration and left
      as-is; the build's link validator now reports them (see the `exclude` list in
      `astro.config.mjs` if any are grandfathered). Fix or remove as content gets touched.

## Content (owner-led, separate effort)

- [ ] **Machine-page revamps** — remaining machines per the list in
      [CLAUDE.md](CLAUDE.md) / [REVAMP_PROMPT.md](REVAMP_PROMPT.md): FDM
      Printers, PCB Machines (NeoDen solder stencil), SLA Printers, Workbenches.
      (The `Templates` group is already retired, and the shared
      [Which Machine?](src/content/docs/docs/Which%20Machine.md) page now exists —
      revisit its entry for each machine as that machine is revamped.)
- [ ] **Pin the manual first in the un-revamped machine groups** — FDM Printers, SLA
      Printers and Workbenches still have operations/safety pairs rather than a single
      manual, so there is no page to pin yet. Do it as each machine is revamped
      (`sidebar.order: 1`, see `DOCS_FORMAT.md`).
- [ ] **Rename the remaining "Learning Assignments" to "Activities"** — the Cricut
      revamp renamed the group and `DOCS_FORMAT.md` now makes `Activities/` the
      standard. Laser Cutter is done, and the 3D Scanner's was retired rather than
      renamed. **CNC Mill is the last of the revamped machines still on the old
      naming** — hold it until PR #66's content question is settled, then move
      `Learning Assignment/2D Relief Coin/2D Relief Coin.md` to
      `Activities/2D Relief Coin.md` with a 301. The un-revamped machines (Dual Head
      FDM, NeoDen solder stencil, both SLA printers, Workbenches) get renamed as each
      one is revamped. `docs/index.md` carries a parenthetical noting the leftover
      "Learning Assignments" sidebar labels — drop it once the last one is renamed.
- [ ] **Content structure / information architecture** — Diátaxis-style restructure of
      the manuals. Grain decisions still open: 3D-model stub pages (merge vs.
      standalone), Electric Workbench manual (combined vs. per-instrument).
- [ ] Re-home the student-facing **Networking IOT Learning Assignment** if it should
      return to the public site (its parent tree was staff-facing and now lives only in
      git history / Google Docs).

---

_This file is the consolidated roadmap; update items here as they ship._
