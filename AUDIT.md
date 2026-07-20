# Hallmark Audit — omahamasons.com
*2026-07-20 · branch `claude/hallmark-audit` · read-only audit, no edits made*

Graded against `DESIGN.md` (this is a system-managed project: the dark navy/gold
heritage system is declared, so dark surfaces, the shared page-header banner, and
identical footers across pages are **conformance, not tells**) plus the Hallmark
anti-pattern catalog.

---

## Critical (ships as slop)

**[critical] The 3-column feature grid + icon-tile cards — `index.html:158-215`, `css/style.css:378-410`**
"Our Three Pillars": three equal `repeat(3, 1fr)` columns, each a centered
icon-above-heading-above-three-lines tile. This is the single most-recognised
LLM section shape; `dues.html` payment methods (`css/style.css:725`) repeats it.
→ Break the grid: vary column widths or heights, pull icons inline with headings,
or set the three pillars as a typographic row (large Alegreya words + hairline
rules) — the lodge's three-pillar concept is strong enough to carry without cards.

**[critical] The AI nav — `js/header.js:14-38`**
Wordmark hard-left, seven inline uppercase links, CTA button hard-right, sticky,
hairline border-bottom. The dark/gold dressing helps, but the shape is the
genre-blind default fingerprint.
→ Lean into the heritage genre: a masthead-style nav (centered wordmark/seal with
links beneath a gold rule) would say "century-old institution" instead of "SaaS
template" — and the shared `header.js` makes it a one-file change.

**[critical] Card-in-card — `rsvp.html` (`#next-meeting` inside `.event-info-card`)**
The next-meeting banner ships its own `--bg-card` background + gold border and is
nested inside the event-info card, which has the same background + gold border.
Border-in-border with no semantic reason. (Introduced by the recent feature work.)
→ On the RSVP page, render the banner borderless/transparent (contextual variant)
or move it above the card; keep the bordered look only on the homepage where it
sits on plain background.

## Major (looks AI-generated)

**[major] Design-system drift: two golds on one page — `rsvp.html:48-217` (8+ instances)**
Legacy gold `#c9a84c` survives as `rgba(201,168,76,…)` in card borders, stepper
buttons, and rules, while text/labels now use the system gold `--accent`
(`#c8972e`). Two near-miss golds on one page erodes the system.
→ Replace every `rgba(201,168,76,x)` with `rgba(200,151,46,x)` or introduce a
`--accent-soft` token in `DESIGN.md` and reference it.

**[major] `DESIGN.md` out of sync with shipped code — `DESIGN.md` throughout**
The system doc mandates `document.write` for the year (pages now use
`.copyright-year` spans), lists `scholarships.html` (renamed `membership.html`),
omits `gallery.html`/`404.html`, says logo height 50px (CSS ships 75px,
`css/style.css:106`), references a stale branch, and has no section for the new
light theme. On a system-managed project the doc **is** the system.
→ Amend `DESIGN.md` to match shipped reality (incl. a § for the
`prefers-color-scheme: light` palette and the `.copyright-year` convention).

**[major] The AI footer (partial) — all pages, `css/style.css:791-844`**
Three link columns + hairline top rule + tiny centered copyright is most of the
standard SaaS footer. The benediction pull-quote above it is genuinely
distinctive and keeps this out of critical.
→ Make the benediction the footer's anchor (statement-style close) and compress
the link columns into a single inline row beneath it.

**[major] Emoji as icons + mismatched icon sets — `contact.html:73-107`, `shop.html:34`, `trestle-board.html`, `rsvp.html`**
Entity emoji (🏠 ✉ 📞 📧 📅, a 4rem 🛒, 📄 file icons) render OS-dependently and
clash with the SVG line icons used on `index.html` — two icon voices on one site.
→ Pick one SVG set (the existing line-icon voice), replace every emoji glyph;
or drop icons and lead with typographic labels.

**[major] `transition: all` — `css/style.css:289` (`.btn`), `css/style.css:825` (`.body-link`)**
Animates every property including ones that must be instant.
→ Name the properties: `transition: background-color 0.2s, color 0.2s`.

**[major] Auto-rotating slideshow with no pause — `js/lightbox.js:187`**
The home slideshow advances every 15s with no pause-on-hover/focus (WCAG 2.2.2).
→ Pause the interval on `mouseenter`/`focusin`, resume on leave; honor
`prefers-reduced-motion` by not auto-advancing at all.

**[major] Missing system reference — every page (Hallmark bookkeeping)**
No page carries a system stamp tying it to `DESIGN.md`; pages predate Hallmark.
→ One-line stamp at the top of `css/style.css`
(`/* Hallmark · design-system: DESIGN.md · genre: heritage-editorial */`)
covers the whole site; per-page stamps unnecessary for a single-stylesheet site.

## Minor (small taste issues)

**[minor] Straight quotes in rendered copy — benediction on all 12 pages (e.g. `index.html:406`)**
`"May the Lord…"` uses straight quotes. → Curly: `“…”`.

**[minor] Three-dot ellipsis — `rsvp.html:406` placeholder**
`…should know...` → `…` (U+2026); same in any other placeholder.

**[minor] `z-index: 9999`/`10000` — `css/style.css:1181,1225`**
Arbitrary large values in the lightbox. → Adopt a named scale
(`--z-overlay: 100; --z-modal: 110; …`).

**[minor] Every `.section` padded identically — `css/style.css:326` (70px 0)**
Uniform vertical rhythm on every section reads templated. → Tighten one,
expand another (e.g. 48px above the newsletter, 96px around the pillars).

**[minor] Double hover signal — `css/style.css` `.gal-item:hover` (scale + shadow)**
Two signals on one element. → Keep the scale, drop the shadow (or vice versa).

---

**Summary — 3 critical · 7 major · 5 minor**

**Verdict — reads as AI-generated in its section shapes; the system itself is sound.**
The palette, type pairing (Alegreya/Roboto), benediction, and lighthouse hero are
distinctive and worth keeping. The tells are concentrated in *structure* — the
3-column pillars, the default nav/footer shapes, and icon inconsistency. Fixing
the three criticals plus the icon/gold drift would move this to
"close, fix the minors."
