# Contributing

Thanks for helping improve the Fab Lab docs!

**If you're a student or staff member fixing documentation:** you don't need to know Git.
Read **[Contributing to These Docs](https://tfl.aidanstew.art/docs/contributing-to-these-docs/)**
on the site — it walks through every click, from the "Edit page" button to adding photos.

The short version:

- Every change is a **pull request into `main`** (direct pushes are blocked). A
  maintainer reviews and merges; nothing goes live until then, so you can't break the site.
- Automatic checks run on every PR: the site must **build** cleanly (broken links and
  images fail here) and no file may exceed **25 MiB**. An automatic Claude review also
  leaves a feedback comment — treat it as a helpful first reader, not a gate.
- Machine pages follow the format standard in [DOCS_FORMAT.md](DOCS_FORMAT.md).
- This repo is **public**: never commit credentials, personal contact info, or
  staff-only material.

**If you're working on the site's code** (Astro/Starlight, styling, CI): start with
[CLAUDE.md](CLAUDE.md) — repo map, hard rules, and the pre-merge verification bar.
