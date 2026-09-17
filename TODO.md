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
- [ ] **Page comments with text references** — let readers comment on any page, and
      anchor a comment to a specific passage they select (the Medium/Google-Docs
      model: highlight a sentence, leave a note on it). The point is catching the
      step that's wrong or unclear at the exact place it's wrong, from someone
      standing at the machine — which is where most of this site's errors get found.

      Nothing is decided yet. What has to be worked out first:

      - **Where comments live.** The site is static on Cloudflare Pages, so there is
        no backend today. Options: Cloudflare D1/KV behind a Worker (we already use
        Cloudflare, and it keeps the data ours), or a hosted layer like Giscus
        backed by GitHub Discussions (no infrastructure, but commenting needs a
        GitHub account — probably a non-starter for students).
      - **Who can post, and moderation.** A public makerspace site with anonymous
        comments needs a spam answer and a staff deletion path before it ships.
        This is the part most likely to sink the feature, so decide it early.
      - **How an anchor survives an edit.** The hard part. A comment pinned to
        "step 4" breaks the moment a page is revamped — and these pages are being
        revamped machine by machine right now. Character offsets break on any edit;
        quoting the selected text and re-finding it is more durable and can degrade
        to "this comment's passage no longer exists" instead of pointing at the
        wrong sentence. Worth deciding what happens to orphaned comments.
      - **Whether it's the right tool.** The [Contributing to These Docs](/docs/contributing-to-these-docs/)
        page already routes fixes to PRs, and there's a Discord. A comment that
        nobody reads is worse than no comment box, so it needs an owner who
        triages them.

- [ ] **Dead-link cleanup** — a set of links was already dead pre-migration and left
      as-is; the build's link validator now reports them (see the `exclude` list in
      `astro.config.mjs` if any are grandfathered). Fix or remove as content gets touched.

## Content (owner-led, separate effort)

- [ ] **Machine-page revamps** — remaining machines per the list in
      [CLAUDE.md](CLAUDE.md) / [REVAMP_PROMPT.md](REVAMP_PROMPT.md): PCB Machines
      (NeoDen solder stencil), SLA Printers, Workbenches. FDM Printers came off this
      list when the Raise3D E2 left the lab — the Bambu X1C is the only FDM machine
      now, and it is already revamped.
      (The `Templates` group is already retired, and the shared
      [Which Machine?](src/content/docs/docs/Which%20Machine.md) page now exists —
      revisit its entry for each machine as that machine is revamped.)
- [ ] **Pin the manual first in the un-revamped machine groups** — SLA Printers and
      Workbenches still have operations/safety pairs rather than a single manual, so
      there is no page to pin yet. Do it as each machine is revamped
      (`sidebar.order: 1`, see `DOCS_FORMAT.md`).
- [ ] **Rename the remaining "Learning Assignments" to "Activities"** — the Cricut
      revamp renamed the group and `DOCS_FORMAT.md` now makes `Activities/` the
      standard. Laser Cutter is done, and the 3D Scanner's was retired rather than
      renamed. **CNC Mill is the last of the revamped machines still on the old
      naming** — hold it until PR #66's content question is settled, then move
      `Learning Assignment/2D Relief Coin/2D Relief Coin.md` to
      `Activities/2D Relief Coin.md` with a 301. The un-revamped machines (NeoDen
      solder stencil, both SLA printers, Workbenches) get renamed as each
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
