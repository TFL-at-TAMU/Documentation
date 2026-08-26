# Machine-revamp kickoff prompt

Copy the block below into the first message of a fresh session to revamp one
machine's docs. Fill the two `[…]` slots. Keep this file in sync with reality:
update the "already done" list as machines ship, and let it point at
`CLAUDE.md` + `DOCS_FORMAT.md` for process detail rather than restating it.

---

You're helping revamp the public documentation site for **The Fab Lab**, a
Texas A&M student makerspace (`TFL-at-TAMU/Documentation`, built with Astro
Starlight, live at `tfl.aidanstew.art`). We're rebuilding the machine docs
one machine per session. **This session's machine: [MACHINE NAME].**

**Why this work matters — read this before anything else.** These pages are
read by nervous first-time students standing at an unfamiliar, sometimes
dangerous machine. The goal is documentation that is genuinely *good*: clear
enough to follow under pressure, safe, honest, and consistent from machine to
machine. Quality and safety beat speed here — there is no deadline, and a
page that's 90% done and shipped wrong is worse than one done right. What you
put into this determines what students get out of it.

**Read first, in this order (don't skip — they carry the accumulated decisions
of this project):**
1. `CLAUDE.md` — project context, the machine-revamp workflow, the
   verification bar, and the hard constraints. Follow it.
2. `DOCS_FORMAT.md` — the format standard for machine pages. It's a strong
   default, not a straitjacket: follow it, but reshape when a machine's
   content is genuinely better served another way (it says when).
3. The finished pages under `src/content/docs/docs/`, and imitate them rather
   than reinventing: **the 3D Scanner trio** (manual + "How 3D Scanning Works"
   background page + lean assignment) is the gold standard for the end state;
   the **Laser Cutter (Glowforge)**, **CNC Mill (Carvera)**, and **Solder
   Reflow Oven** pages are also done and worth studying.

**What to produce for this machine:** merge its operations + safety manuals
into one machine page per the standard; slim any learning assignments to pure
exercises (teaching content goes in the manual or a shared background page);
clean up the Google-Docs export damage (paragraphs turned into `##` headings,
`[[a]]` comment markers, google-redirect URLs, metadata blocks); add
`public/_redirects` 301s for every retired URL; repoint inbound links. If the
repo's copy of a manual looks stale, ask me — I may have a fresher one.

**Voice and judgment (this is where good vs. mediocre is decided):**
- Write in direct second person, plain language for a non-engineering
  audience. Imperative steps. Bold the things a user must find or click.
- **Warnings must stay credible.** A callout only where there's a real
  hazard — never a rule for the sake of looking safe. If something is
  genuinely safe, say so plainly (e.g. "Class 1 — eye-safe, no precautions
  needed") rather than hedging. Over-warning trains people to ignore
  warnings; I care about this a lot.
- **Never invent** a spec, location, setting, or policy. If you don't know
  it, that's what the questions below and `[bracketed placeholders]` /
  `:::note[Staff note — <machine> lead]` callouts are for.

**Talk to me — I'm the site owner (Fab Lab VP) and I'm usually right here.**
Strongly prefer asking me a concise **multiple-choice question** over leaving
a staff note or guessing, whenever a real decision comes up: access/training
policy, an ambiguous or conflicting procedure, an unclear machine fact, a
capacity number the manuals don't give. Staff notes are the fallback for when
I'm *not* around, not the default. For anything visual or aesthetic (layout,
styling), render the options and show me before committing — don't iterate
blindly through merges.

**Process and quality bar (full detail in `CLAUDE.md`):** work on your
session branch; open one PR into `main` per coherent change and squash-merge
your own PRs, then reset your branch onto `origin/main` and force-push
(stacking on pre-squash history causes phantom conflicts). Cloudflare
auto-deploys `main` in ~2 minutes. **Verify behaviorally before every merge**,
never just by eye: `npm run build` clean; every internal link and slugged
route resolves in `dist/`; no page has two `<h1>`; no staff-tree content
leaks into the build; and screenshot the built page at **desktop and ~390px
mobile** and actually look at it. Hard constraints: **plain `.md` only** (MDX
was evaluated and rejected for staff editability); **no subagents** (I pay
per token and prefer direct work); **never add staff-facing content** to this
public repo (credentials, IT/networking internals, service manuals — those
live in Google Docs).

**Already done (don't redo):** Laser Cutter · 3D Scanner · CNC Mill · Solder
Reflow Oven · NeoDen Pick & Place. **Everything else** is fair game per the
remaining list in `CLAUDE.md`.

**Machine-specific notes for this session (may be empty):**
[PASTE FRESH DOC ATTACHMENTS OR NOTES HERE — e.g. "attached manuals are
newer than the repo's", "the [machine] lead is in the room with me",
known quirks, decisions already made.]

---
