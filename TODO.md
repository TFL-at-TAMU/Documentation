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
- [ ] **STL viewer for model pages** — several pages are nothing but a
      `<model-viewer>` tag pointing at an `.stl` under `/files/`, but no script is
      loaded anywhere on the site, so the tag renders as nothing. The six Elegoo chess
      pieces (`SLA Printers/Elegoo Saturn 4 Ultra 16K Resin 3D Printer/Activities/
      ornate_chess_*.md`) are parked as `draft: true` until a viewer exists — their URLs
      301 to the Chess Piece activity meanwhile, and they are the only `<model-viewer>`
      tags left in the repo now the Raise3D E2 pages are retired. (`SLA Printers/FormLabs
      Form 3 Resin printer/Learning Assignments/Lattice_Benchy_FCC.md` is a related but
      separate case: its viewer and download were already removed because the `.stl`
      exceeded the 25 MiB limit.)
- [x] **Page comments (giscus)** — every docs page carries a comment box at the
      bottom, backed by GitHub Discussions on this repo. Readers sign in with a
      free GitHub account (the same one the Edit page flow already needs),
      comments post immediately, and moderation is after the fact from the
      Discussions tab. Code: `src/components/Comments.astro` +
      `src/components/Footer.astro`; settings in `src/giscusConfig.ts`; origin
      lock in `giscus.json`. A page opts out with `comments: false`.

      The GitHub side is set up: Discussions on, the giscus app installed, and
      an Announcement-format **Page Comments** category holding the threads. The
      steps are recorded at the top of `src/giscusConfig.ts` in case they're ever
      redone.

      Deferred from this MVP, worth revisiting once there's real usage:

      - **Comments anchored to a passage** — the original ask here was the
        Medium/Google-Docs model: highlight the step that's wrong and comment on
        *that*, which is where most of this site's errors get found. giscus is
        per-page only. The options that do anchor are Hypothesis (hosted, needs
        a hypothes.is account, data isn't ours) or building it on Cloudflare
        (Pages Functions + D1 + Turnstile, no login needed). If it gets built,
        the hard part is still anchor survival across the machine-page revamps:
        quote the selected text and re-find it, degrading to "this passage no
        longer exists" rather than pointing at the wrong sentence.
      - **Anonymous commenting.** A GitHub account is a real wall for a
        first-year who just wants to say "the bed is 256mm not 250". If the
        comment box sits unused, that's the first thing to suspect.
      - **Whether anyone triages them.** A comment nobody reads is worse than no
        comment box. Watch the Discussions tab for a semester and decide.
      - **Moderation posture.** Comments currently go live instantly. Pre-moderation
        is worth reconsidering for the machine pages and `/safety/` specifically,
        where a wrong comment sits under a correct procedure.

- [ ] **Dead-link cleanup** — a set of links was already dead pre-migration and left
      as-is; the build's link validator now reports them (see the `exclude` list in
      `astro.config.mjs` if any are grandfathered). Fix or remove as content gets touched.

## Content (owner-led, separate effort)

- [ ] **Machine-page revamps** — remaining machines per the list in
      [CLAUDE.md](CLAUDE.md) / [REVAMP_PROMPT.md](REVAMP_PROMPT.md): PCB Machines

      (NeoDen solder stencil) and the Formlabs Form 3 with its wash/cure machines.
      FDM Printers came off this list when the Raise3D E2 left the lab — the Bambu
      X1C is the only FDM machine now, and it is already revamped. Workbenches came
      off it when the electric workbenches were revamped, and the Elegoo Saturn 4
      Ultra and its Mercury 3.0 wash/cure station are done.
      (The `Templates` group is already retired, and the shared
      [Which Machine?](src/content/docs/docs/Which%20Machine.md) page now exists —
      revisit its entry for each machine as that machine is revamped.)
- [ ] **Pin the manual first in the un-revamped machine groups** — only the Formlabs
      Form 3 still has operations/safety pairs rather than a single manual, so
      there is no page to pin yet. Do it as each machine is revamped
      (`sidebar.order: 1`, see `DOCS_FORMAT.md`).
- [ ] **Rename the remaining "Learning Assignments" to "Activities"** — the Cricut
      revamp renamed the group and `DOCS_FORMAT.md` now makes `Activities/` the
      standard. Laser Cutter is done, and the 3D Scanner's was retired rather than
      renamed. **CNC Mill is the last of the revamped machines still on the old
      naming** — hold it until PR #66's content question is settled, then move
      `Learning Assignment/2D Relief Coin/2D Relief Coin.md` to
      `Activities/2D Relief Coin.md` with a 301. The un-revamped machines (NeoDen
      solder stencil and the Formlabs Form 3) get renamed as each
      one is revamped. `docs/index.md` carries a parenthetical noting the leftover
      "Learning Assignments" sidebar labels — drop it once the last one is renamed.
- [ ] **Content structure / information architecture** — Diátaxis-style restructure of
      the manuals. Grain decision still open: 3D-model stub pages (merge vs.
      standalone). The electric workbenches settled the multi-instrument case — a bench
      page plus one page per instrument under `Instruments/`.
- [ ] Re-home the student-facing **Networking IOT Learning Assignment** if it should
      return to the public site (its parent tree was staff-facing and now lives only in
      git history / Google Docs).

---

_This file is the consolidated roadmap; update items here as they ship._
