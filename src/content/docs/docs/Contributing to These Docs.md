---
title: Contributing to These Docs
---

These docs are written and maintained by Fab Lab staff and student workers — people like
you. If you spot a mistake, an outdated step, or a machine quirk the page doesn't mention,
you can fix it yourself from your browser. **No Git experience or software installs
needed** — this page walks you through every click.

Every change you propose becomes a **pull request** (a "PR"): your edit, shown
side-by-side with the original, waiting for a maintainer to approve and publish it. You
can't break the site — nothing goes live until a maintainer merges your PR, and automatic
checks catch things like broken links first. So be bold.

> [!NOTE]
> You'll need a free [GitHub account](https://github.com/signup), and for anything beyond
> a simple text edit you'll want to be added to the Fab Lab's GitHub organization — ask a
> maintainer on [Discord](https://discord.gg/Tvn9rsBUWH) and they'll add you in a minute.

## Fixing or improving a page

1. On the page you want to change, scroll to the bottom and click **Edit page**. GitHub
   opens the page's text in an editor. (If GitHub offers to "fork this repository",
   accept — that's just GitHub making you a personal copy to edit.)
2. Make your change. The pages are plain text with light
   [Markdown](https://www.markdownguide.org/basic-syntax/) formatting — `## Heading`,
   `**bold**`, `1.` numbered steps. Copy the style of the text around your edit, and use
   the **Preview** tab to check how it looks.
3. Click the green **Commit changes...** button. In the box that pops up, replace the
   default message with a short description of what you changed (e.g. "Fix bed size on
   Bambu page"), keep *"Create a new branch and start a pull request"* selected, and
   click **Propose changes**.
4. On the next screen, click **Create pull request**. Done — that's the whole thing.

A maintainer will get notified, and an automatic reviewer (Claude, an AI) will usually
leave a comment on your PR within a few minutes pointing out anything worth
double-checking — broken links, formatting slips, a missing step. Its comments are
suggestions to help you, not a gate. If you know something it doesn't, say so.

To respond to feedback or fix something in your open PR, open the **Files changed** tab
of the PR, click the **⋯** menu on the file, choose **Edit file**, and commit again —
your PR updates automatically. You never need to start over.

## Adding photos or images

Images live in the same folder as the page that uses them, so this is a two-step trip:
upload the image, then reference it from the page — both in the *same* pull request.

1. In the repo, browse to the machine's folder under
   [`src/content/docs/docs/`](https://github.com/TFL-at-TAMU/Documentation/tree/main/src/content/docs/docs)
   (e.g. `Laser Cutter`).
2. Click **Add file → Upload files**, and drag your image in. Give the file a
   descriptive name *before* uploading (`glowforge-lid-latch.jpg`, not `IMG_4032.jpg`).
   Keep photos reasonably sized — a phone photo is fine, but nothing over a few MB.
3. Under the upload box, select *"Create a new branch for this commit and start a pull
   request"*, then **Propose changes** → but **don't** click "Create pull request" as
   your final step yet if you also need to edit the page — first:
4. While on **your new branch** (GitHub shows its name in the branch picker, top-left of
   the file listing), open the page that should show the image, click the pencil
   (**Edit this file**), and add an image line where it belongs:

   ```markdown
   ![The lid latch on the front-right corner](glowforge-lid-latch.jpg)
   ```

   The text in `[...]` describes the image for screen readers and broken-image
   fallbacks — always write it. Commit directly to the same branch.
5. Now open the pull request for your branch (GitHub will be offering a yellow
   *"Compare & pull request"* banner). One PR, image + page together.

If that branch dance goes sideways, don't worry — just upload the image in one PR and
ask in the PR comment for help wiring it into the page. Someone will finish it with you.

## Adding a whole new page

1. In the right folder, click **Add file → Create new file**. Name it after the page
   title, ending in `.md` — e.g. `Changing the Laser Tube.md`. Folders become sidebar
   sections automatically, so putting the file in `Laser Cutter/` is all the navigation
   setup there is.
2. Start the file with exactly this (the site renders the title as the page heading —
   don't repeat it as a `#` line in the body):

   ```markdown
   ---
   title: Changing the Laser Tube
   ---

   Your content starts here...
   ```
3. Commit and open the PR the same way as above.

Machine manuals follow a house structure (hazard callouts up top, *Before you start*,
*Operating*, *Finishing up*) — see
[DOCS_FORMAT.md](https://github.com/TFL-at-TAMU/Documentation/blob/main/DOCS_FORMAT.md)
or just copy the shape of a finished page like the
[Laser Cutter manual](/docs/laser-cutter/laser-cutter-glowforge-pro/). Don't let the
format stop you from contributing, though — content first; a maintainer can reshape.

## Editing several files at once (the power tool)

On any page of the repo on GitHub, press the **`.`** (period) key. A full editor
(VS Code in your browser) opens where you can edit and create multiple files, then
commit them all as one pull request from the source-control icon in the left sidebar.
Nothing to install, and it handles images too.

## Ground rules

- **Never write specs, settings, or policies you're not sure of.** If you don't know,
  say so in the page as `[placeholder]` or ask the machine lead — a confident wrong
  number on a machine page is dangerous.
- **No private info.** This repo and site are public: no credentials, no personal phone
  numbers or emails, no staff-only procedures.
- **No huge files.** Anything over 25 MB fails the checks automatically. Big files
  (videos, 3D scans) need a maintainer's help to host elsewhere.
- **Renaming or deleting a page?** That breaks its web address, which needs a redirect
  entry — mention it in your PR and a maintainer will handle the redirect, or see
  `public/_redirects` if you're comfortable.

Stuck at any step? Ask on [Discord](https://discord.gg/Tvn9rsBUWH) — helping you land
your first PR is a normal request, not an imposition.
