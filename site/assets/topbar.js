/* The Fab Lab — shared top navigation bar.
 *
 * One source of truth for the bar's markup, links, styling, and the light/dark toggle, used by
 * every page (the landing page at /, the docs at /docs/, and the safety manual at /safety/).
 * The bar is a fixed, self-styled element inserted at the top of <body>; page content sits
 * beneath it. Colors are hardcoded Gruvbox keyed off [data-theme] on <html> (set before paint
 * by each page's no-FOUC script), so the bar themes correctly everywhere with no page CSS.
 *
 * Page-specific behavior (the docs site's mobile sidebar drawer + relocated search) lives in
 * that page and augments the bar this file builds — see site/docs/index.html.
 */
(function () {
  // --- Single source of truth for the nav links. Edit here to change every page's bar. ---
  var NAV = [
    { label: 'Home',          href: '/' },
    { label: 'Documentation', href: '/docs/' },
    { label: 'Safety',        href: '/safety/' },
    { label: 'Contact',       href: '#/' }   // placeholder destination for now
  ];

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  // Bar styling. Injected as the FIRST element in <head> so any page's own stylesheet (loaded
  // after) can override these defaults — e.g. the docs site hides the nav links on mobile in
  // favour of its hamburger. Gruvbox palette: https://github.com/morhetz/gruvbox
  var CSS = [
    ':root { --topbar-h: 56px; }',
    ".topbar { position: fixed; top: 0; left: 0; right: 0; height: var(--topbar-h); display: flex; align-items: center; gap: 1.5rem; padding: 0 1rem 0 1.25rem; border-bottom: 1px solid; z-index: 20; box-sizing: border-box; }",
    ':root[data-theme="light"] .topbar { background: #f9f5d7; border-color: #d5c4a1; }',
    ':root[data-theme="dark"]  .topbar { background: #1d2021; border-color: #504945; }',
    ".topbar-brand { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 700; font-size: 1.25rem; letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none; white-space: nowrap; }",
    ':root[data-theme="light"] .topbar-brand { color: #b57614; }',
    ':root[data-theme="dark"]  .topbar-brand { color: #fabd2f; }',
    '.topbar-nav { display: flex; gap: 1.25rem; }',
    '.topbar-nav a { text-decoration: none; font-size: 0.95rem; opacity: 0.8; white-space: nowrap; }',
    ':root[data-theme="light"] .topbar-nav a { color: #3c3836; }',
    ':root[data-theme="dark"]  .topbar-nav a { color: #ebdbb2; }',
    ':root[data-theme="light"] .topbar-nav a:hover, :root[data-theme="light"] .topbar-nav a.active { color: #b57614; opacity: 1; }',
    ':root[data-theme="dark"]  .topbar-nav a:hover, :root[data-theme="dark"]  .topbar-nav a.active { color: #fabd2f; opacity: 1; }',
    '.topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 0.75rem; }',
    '.theme-toggle { display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; padding: 0; flex: none; background: transparent; border: 1px solid; border-radius: 6px; cursor: pointer; transition: color 0.15s ease, border-color 0.15s ease; }',
    ':root[data-theme="light"] .theme-toggle { color: #3c3836; border-color: #d5c4a1; }',
    ':root[data-theme="dark"]  .theme-toggle { color: #ebdbb2; border-color: #504945; }',
    ':root[data-theme="light"] .theme-toggle:hover { color: #b57614; border-color: #b57614; }',
    ':root[data-theme="dark"]  .theme-toggle:hover { color: #fabd2f; border-color: #fabd2f; }',
    '.theme-toggle svg { width: 1.1rem; height: 1.1rem; }',
    /* Default mobile: keep the brand + links, just tighten spacing. Pages with their own
       mobile nav (the docs hamburger) override this. */
    '@media (max-width: 768px) { .topbar { gap: 0.85rem; padding: 0 0.9rem; } .topbar-brand { font-size: 1.05rem; } .topbar-nav { gap: 0.85rem; font-size: 0.9rem; } }'
  ].join('\n');

  function injectCSS() {
    if (document.getElementById('fablab-topbar-css')) return;
    var style = document.createElement('style');
    style.id = 'fablab-topbar-css';
    style.textContent = CSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  function curTheme() { return document.documentElement.getAttribute('data-theme') || 'light'; }

  function makeToggle() {
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    var dark = curTheme() === 'dark';
    btn.innerHTML = dark ? SUN : MOON;            // show the icon for the mode you'd switch TO
    var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.addEventListener('click', function () {
      // Persist, then reload: docsify-themeable bakes some colors at render time, so an in-place
      // flip doesn't fully repaint; the no-FOUC <head> script reapplies the saved theme on load.
      var next = curTheme() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (e) {}
      document.documentElement.setAttribute('data-theme', next);
      window.location.reload();
    });
    return btn;
  }

  function isActive(href) {
    if (href.charAt(0) === '#') return false;
    var p = location.pathname;
    if (href === '/') return p === '/' || p === '/index.html';
    var base = href.replace(/\/$/, '');
    return p === base || p === base + '/' || p.indexOf(base + '/') === 0;
  }

  // Build the bar once and insert it at the top of <body>. Idempotent — returns the existing bar
  // if already mounted (so docsify pages can safely call this on every route change).
  function mount() {
    injectCSS();
    var existing = document.querySelector('.topbar');
    if (existing) return existing;

    var links = NAV.map(function (item) {
      return '<a' + (isActive(item.href) ? ' class="active"' : '') + ' href="' + item.href + '">' + item.label + '</a>';
    }).join('');

    var bar = document.createElement('header');
    bar.className = 'topbar';
    bar.innerHTML =
      '<a class="topbar-brand" href="/">The Fab Lab</a>' +
      '<nav class="topbar-nav">' + links + '</nav>' +
      '<div class="topbar-actions"></div>';
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector('.topbar-actions').appendChild(makeToggle());
    return bar;
  }

  // Expose for docsify pages that augment the bar (hamburger, search) after each render.
  window.FabLabTopbar = { mount: mount, makeToggle: makeToggle };

  // Plain pages (the landing page): mount as soon as the DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
