# TODO

## Site UI roadmap

Improvements drawn from reviewing reference docs sites (Linear, Cloudflare, Supabase,
Stripe/Astro). Tackling these **one at a time**.

### Queued
- [x] **Light/dark mode toggle** — defaults to the visitor's system setting, choice persisted.
      _(Done — [#10](https://github.com/TFL-at-TAMU/Documentation/pull/10).)_
- [ ] **Cleaner sidebar** (Linear-style), keeping the Cloudflare-style collapsible sections.
- [ ] **Lucide line icons** on top-level sidebar sections (Supabase-style). Add a
      section→icon map in `scripts/generate_sidebar.py`; render icons via the Lucide library.
- [ ] **"On this page" outline** — right-hand rail on desktop, hidden on mobile.

### Later (bigger / their own efforts)
- [ ] **Search** improvements.
- [ ] **Content structure / information architecture** — apply the Diátaxis model
      (tutorials / how-to / reference / explanation).
- [ ] **Landing page + top navigation bar.**
- [ ] **Page templates.**

## Tech debt / follow-ups
- [ ] **Reload-free light/dark toggle.** The current toggle reloads the page on switch because
      docsify-themeable captures some colors at render time, so an in-place attribute flip
      doesn't fully repaint. For an instant, reload-free toggle, evaluate a dedicated plugin
      (e.g. `docsify-darklight-theme`).
- [ ] **Fix or remove preview.**

---

_This file is the consolidated roadmap. Design detail for the in-flight UI work lives in the
plan notes; update items here as they ship._
