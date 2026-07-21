# Fab Lab Documentation Format Standard

Instructions for restructuring the TAMU Fab Lab machine documentation. The site is built with **Astro Starlight**, hosted on **Cloudflare Pages**, and edited by non-technical student staff through the GitHub web editor (every change goes through a PR into `main`; the site rebuilds on merge). Apply this standard to every machine page. A complete reference example (the Glowforge Pro page) is at the bottom — match its structure, tone, and formatting exactly.

## Background

The existing docs were written in Google Docs by multiple employees and exported to Markdown, leaving conversion artifacts (stray headers, broken formatting, inconsistent structure). Separate "operations manual" and "safety manual" files exist per machine. Those pairs are being replaced: **one manual page per machine**, with the safety content integrated inline at the point of hazard. Everything else a machine has — learning assignments, activity pages, model pages — is **not** covered by this standard and stays as its own pages alongside the manual.

## Files, frontmatter, and URLs

- Content lives under `src/content/docs/docs/` (folders become sidebar groups automatically — there is no sidebar file to edit). The merged manual page sits directly in the machine's folder, replacing the old operations + safety manual pair (and the `Operations & Safety Manual/` subfolder where one exists):

  ```
  docs/Laser Cutter/
    Laser Cutter (Glowforge Pro).md   ← the merged manual (this standard)
    Glowforge CO2 Laser Learning Assignment.md   ← unchanged
  ```

  Name the manual file after the page title so the URL matches it.

- Every page starts with YAML frontmatter carrying the title — **the title is NOT written as a `#` heading in the body** (Starlight renders the frontmatter title as the page H1; a body H1 duplicates it):

  ```markdown
  ---
  title: Laser Cutter (Glowforge Pro)
  ---
  ```

  Common name first, specific model in parentheses. When rewriting an old page, drop stale Google-Docs keys (`source_id`, `modified`) from the frontmatter.

- **The filename becomes the URL** (lowercased, spaces → `-`, `&` dropped). Renaming or merging a page breaks its old URL — when you do either, add a 301 line to `public/_redirects` (`/docs/old-page/ /docs/new-page/ 301`). The per-machine merges in this restructure each get one.
- Link to other pages by their **site URL**, not the file path: `[Which machine should I use?](/docs/which-machine/)`. Relative `.md`-file links do not resolve on the built site.
- Images live next to the page (or in the machine's folder) and are referenced relatively; give every image meaningful alt text. The build fails on broken image paths — that's working as intended.
- "Last updated" is rendered by the site from git history (`lastUpdated: true` in `astro.config.mjs`) — never write dates into the page.

## Page structure

Every machine page starts from these sections, in this order:

1. **Frontmatter title** — as above. No body H1.
2. **Untitled intro paragraph** — first thing in the body, no heading. Plain prose: what the machine does, what it's good at, typical jobs, key capacity numbers (bed size, max thickness, etc.). Ends with a link to the shared [Which machine should I use?](/docs/which-machine/) page. Do **not** use "What this machine is for" / "not for" headings — that content lives in the intro paragraph and the which-machine page respectively.
3. **Critical hazards callouts** — a stack of individual callouts immediately after the intro, **one hazard per callout**, no preamble line, covering ONLY what can't wait for a specific step. Order and type: a hard access requirement first, as a standout `:::danger[…]` callout (e.g. the laser cutter's TAMU laser certification); prohibited materials and off-limits features as `> [!WARNING]` callouts; emergency procedures (how to stop the machine, fire response) as titled `:::caution[…]` callouts (see Callout rules). Everything step-specific goes inline in Operating instead.
4. **`## Before you start`** — training/access requirements, the machine's **approved materials listed inline** (each machine's page owns its own list — there is no shared materials page), file format requirements, how to get files onto the machine, material size limits.
5. **`## Operating`** — the numbered procedure. Safety callouts placed inline, directly above or below the step where the hazard occurs.
6. **`## Finishing up`** — cleanup and shutdown. Always includes removing all material/scrap and "take your project with you — the lab has no storage" (this enforces lab policy at the moment it matters).
7. **`## Common problems`** — optional troubleshooting. Each entry: bold problem statement as the lead sentence, then a short prose paragraph with the fix. No numbered lists here.

**This structure is the default, not a straitjacket.** These pages are curated by hand, so when a machine's content is genuinely better served by an extra or reshaped section, do that — clarity beats conformity. (Example: the 3D scanner has a "Choosing scan and tracking modes" reference section between Before-you-start and Operating, because mode selection needs more than a step can hold; the Glowforge doesn't, because its settings chart lives next to the machine.) What never bends: the frontmatter/no-body-H1 rule, the callout meanings and their placement at the point of hazard, link/redirect mechanics, and safety content living on the machine page itself.

Regardless of structure, do **not** include:

- Metadata blocks ("Machine Name", "Location", "Version", "Last Updated", "Responsible Student Worker") — last-modified comes from git, and the rest is either in the title or doesn't belong on a public page
- "Stop conditions" sections — these become inline `> [!WARNING]` callouts at the relevant step
- "Questions or help" / "External resources" sections
- "End of operations manual" or any closing marker
- Separate safety manuals — delete them once their content is verified to be covered by the callouts in the merged page (git history keeps the original)

## Callout rules

- Standard syntax is `> [!WARNING]` and `> [!NOTE]` (GitHub blockquote-alert style). The site supports these already — nothing to install or configure per page. `[!TIP]`, `[!IMPORTANT]`, and `[!CAUTION]` also render, but machine pages should rarely need more than WARNING and NOTE.
- One hazard per callout — don't bundle several warnings into one block.
- Callouts are **reserved for safety warnings and genuinely important notes**. Never use them for decoration, tips, or general emphasis.
- Place each warning at the point of hazard — a warning about fires during cutting belongs next to the cutting step, not in a separate section.
- **Custom-titled callouts** use Starlight's aside syntax (`:::type[Custom Title]` … `:::`), which renders in a visually distinct filled style. Three sanctioned uses — reserve each type for its meaning so the colors stay unambiguous:
  - **Emergency procedures** — `:::caution[EMERGENCY STOP]`, `:::caution[FIRE PROCEDURE]` (orange filled). Any callout that tells the user what to do when something goes wrong gets this treatment, visually distinct from ordinary warnings.
  - **Certification / hard access requirements** — `:::danger[LASER CERTIFICATION REQUIRED]` (red, unmistakable).
  - **Staff notes** — `:::note[Staff note — <machine> lead]` for an unresolved lab-policy question that the responsible staffer needs to settle (e.g. a procedure the old manuals left ambiguous). State the question, the options, and what to update once decided. Remove the note when it's resolved. These are publicly visible — write accordingly.
- An aside placed between numbered steps at column 0 splits the list; just continue the numbering explicitly (`8.`) and the built page renders it correctly.

## Style

- Direct second person ("you"), imperative steps ("Turn on the power switch"), plain language for a non-engineering audience.
- Bold the things a user must locate or click: **button names**, **switch locations**, **app labels**, **key terms**.
- Machine-specific facts that are unknown or lab-configuration-dependent go in **[bracketed placeholders]** so staff can fill them in — never invent locations, settings, or account details.
- "Which machine should I use" guidance lives in one shared page that machine pages link to — don't duplicate it per machine. (Approved materials are the opposite: listed inline on each machine's page.)

## Migration checklist per page

1. Strip Google Docs export artifacts: stray `##` on non-headings, bold-as-heading lines, empty headings, escaped characters, redundant title repetition, stale frontmatter keys.
2. Merge the machine's safety manual into the machine page as callouts per the rules above; confirm every safety item is either in the top hazards block or inline, then delete the safety manual file.
3. Rewrite sections to the structure above; move "not for" content to the which-machine page.
4. Add `public/_redirects` entries for the retired operation- and safety-manual URLs → the merged page.
5. Check links: every internal link uses the `/docs/…/` URL form and resolves on the built site.
6. Build locally if you can (`npm ci && npx astro build`) — it catches broken images and malformed frontmatter. If you're editing from the GitHub web editor, the PR's Cloudflare build check does the same job.

## Rollout notes (one-time, not per page)

- [ ] Enable `lastUpdated: true` in `astro.config.mjs` — and verify the dates are right on the deployed site, not just locally (Cloudflare's build clone depth could affect git-derived dates).
- [ ] Create the load-bearing shared page: `/docs/which-machine/`.
- [ ] Consider adding the `starlight-links-validator` plugin so builds fail on broken internal links (there are ~35 known-dead legacy links to clean up or remove first).
- [ ] Retire the two master templates under `docs/Templates/` once this standard replaces them.

---

# Reference example: Glowforge Pro page

The canonical example of the format. File: `docs/Laser Cutter/Laser Cutter (Glowforge Pro).md` → `/docs/laser-cutter/laser-cutter-glowforge-pro/`, replacing today's `Glowforge Operation Manual.md` + `Glowforge Safety Manual.md` (each retired URL gets a `_redirects` line pointing here).

```markdown
---
title: Laser Cutter (Glowforge Pro)
---
```

The Glowforge Pro cuts and engraves flat sheet materials — plywood, MDF, acrylic, cardboard, leather, and more — by tracing your design with a 45W CO₂ laser. It's the fastest way in the lab to go from a 2D drawing to a physical part, and it excels at precise cuts, interlocking parts, enclosures, signage, and surface engraving. Most jobs finish in minutes. It accepts sheets up to about 20.4" × 12", cuts within a roughly 19.5" × 11" area, and cuts reliably through stock up to about 1/4" thick. If you're not sure this is the right machine for your project, see [Which machine should I use?](/docs/which-machine/).

:::danger[LASER CERTIFICATION REQUIRED]
You must hold **TAMU laser safety certification** to operate this machine — be ready to show it to staff. No certification, no laser.
:::

> [!WARNING]
> **Never cut PVC, vinyl, or any material containing chlorine.** It releases gas that is toxic to you and corrodes the machine. Polycarbonate (Lexan), ABS, HDPE, and fiberglass are also prohibited — they melt, catch fire, or produce hazardous fumes. Cut only staff-approved materials.

> [!WARNING]
> **Never leave the machine unattended during a job** unless a staff member has explicitly OK'd it for a long job.

:::caution[EMERGENCY STOP]
**Do not open the lid while a job is running.** To stop the machine, press the **glowing button** on top — it pauses the job. To kill all power, flip the **ON/OFF switch at the rear** of the machine.
:::

:::caution[FIRE PROCEDURE]
Small, brief flames at the cut point are normal. If a flame persists, keep the lid closed (it starves the fire), pause the job, and get a staff member immediately. **Only if no staff member can reach the machine in time:** open the lid and throw the **fire blanket** (located **[location]**) over the workpiece.
:::

> [!WARNING]
> **The passthrough slot on the front and back is off-limits** unless a staff member has specifically trained you on it. Using the slot exposes the laser (Class 4 operation) and requires extra safety precautions.

## Before you start

- You must complete laser cutter training before operating this machine. Ask a staff member if you haven't.
- Only cut **staff-approved materials**: wood, acrylic, cardboard, rubber (lab-provided), and metal (**engraving only**). If your material isn't listed or you don't know what it is, ask a staff member — don't guess.
- Prepare your design as an **SVG or PDF** for cutting. Plain images (JPG/PNG) can be engraved but not cut.
- The Glowforge is controlled entirely from a web browser — there's no local software and no USB port. Have your file accessible from the lab computer via [cloud location / email / drive].
- Material must fit within about 20.4" × 12" and be no thicker than 1/2" with the crumb tray in place.

## Operating

1. Turn on the power switch on the **back-left** of the machine and wait for it to calibrate — the head will move around and the app will say "Homing," then "Ready." The exhaust fans run automatically during a print, so there's nothing separate to switch on. [Adjust if the lab uses an external booster fan.]
2. Open the lid and place your material flat on the honeycomb crumb tray. Warped material is a fire and focus hazard — use hold-down pins to flatten it, and never stack material.
3. On the lab computer, go to **app.glowforge.com**, sign in to the lab account, and upload your file (or open it from the design library).
4. Your material appears live in the lid camera view. **Drag and position your design** directly on the camera image. The preview is close but not pixel-perfect — leave a small margin from the material edges.
5. Set your material:
   - **Proofgrade material** (has a QR code): the machine detects it and loads settings automatically.
   - **Everything else**: choose "Unknown material," enter the thickness, and use the settings from the **material settings chart** posted next to the machine. Start with the chart's values — don't improvise settings on unfamiliar material.
6. Click **Set Focus** in the app and place the focus target on the area you'll be cutting. Wait for the camera view to refresh, then double-check your design's position.
7. Click **Print** in the app, then press the **glowing button on top of the machine** when it pulses.

> [!WARNING]
> Stay at the machine for the entire job. A small, candle-like flame at the cut point that moves with the laser head is normal. A flame that lingers, spreads, or persists after the head moves on is not — **pause the job with the button and follow the fire procedure at the top of this page**.

8. When the job finishes, **wait for the fans to quiet down** (10–15 seconds) so smoke clears before opening the lid.
9. Remove your parts and any scrap. If pieces fell through the crumb tray, lift it out and collect them.

## Finishing up

- Remove all material and scrap from the bed, including cutoffs in the tray underneath.
- Brush or vacuum debris off the crumb tray, and confirm the tray is seated flat in its dimples for the next user.
- Sign out of the Glowforge app if you used a personal account.
- Leave the machine on — it stays on by default.
- Take your project and materials with you — the lab has no storage.

## Common problems

**The laser isn't cutting all the way through.** Run Set Focus on the exact area being cut, confirm your thickness entry and settings match the chart for your material, and check that the material is flat and the crumb tray is seated properly. If those all check out, the lens or windows may need cleaning — ask a staff member; optics are cleaned with Zeiss wipes only.

**The cut is offset from where I placed it.** The camera preview has slight distortion, especially near the bed edges. Run Set Focus before positioning (focus height affects the preview), keep designs away from the extreme edges, and cut a small test shape first for alignment-critical work.

**Cut edges are heavily charred.** Power is too high or speed too low for the material. Masking the surface with paper transfer tape before cutting also reduces scorch marks on wood.

**The button is glowing yellow / the app says the machine is too hot or cold.** The Glowforge pauses when it's outside its operating temperature range. Give it a few minutes to cool down or warm up — don't restart the job repeatedly.

**The app says "Offline."** The Glowforge needs internet and Wi-Fi to do anything. Check the lab network, then power-cycle the machine. If it won't reconnect, tell a staff member.

---

## Open items (fill in before or during migration)

- [ ] Fire extinguisher location for the Glowforge page
- [ ] Where students stage/access their files on the lab computer
- [ ] Whether an external booster fan exists on the exhaust run (adjust Operating step 1)
- [ ] Shared lab Glowforge account vs. personal accounts (affects step 3 and Finishing up)
- [ ] Write `/docs/which-machine/` and `/docs/approved-materials/` — both are load-bearing links
