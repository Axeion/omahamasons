# Mizpah Lodge #302 — Design System
**mizpahomaha.com** · Omaha, Nebraska · Est. 1919

> A century-old Masonic lodge. Dark, dignified, and community-rooted. Deep navy backgrounds with warm gold accents, serif heritage typography paired with clean sans-serif body text — authoritative without being cold, historic without being stale.

---

## 1. Visual Theme & Atmosphere

### Overall Aesthetic
Mizpah Lodge embodies **Masonic tradition meets accessible community presence**. The interface feels like the lodge itself — dark wood paneling, candlelight gold, and the quiet gravity of a century-old institution. Every element communicates dignity and brotherhood while remaining welcoming to prospective members and community visitors who may know nothing about Freemasonry.

### Mood & Feeling
- **Dignified heritage**: Dark backgrounds evoke lodge room atmosphere and institutional gravity
- **Warm invitation**: Gold accents soften the darkness, signaling welcome rather than exclusivity
- **Community anchor**: Design reflects that this is a neighborhood institution, not a private club
- **Timeless craftsmanship**: Typography and layout reference the stonemason tradition — measured, deliberate, built to last
- **Editorial depth**: Rich historical content deserves generous spacing and clear hierarchy

### Design Density
**Low-to-medium density** with deliberate breathing room. Navigation is compact; content sections are generous. Cards and info panels use internal padding to prevent the dark background from feeling oppressive.

### Visual Character
- Deep navy backgrounds (`#0d1b26` range) as the dominant foundation
- Warm gold (`#c8972e`) as the primary brand accent — used for borders, highlights, active states, and key UI moments
- Blue (`#2a8fd4`) as a supporting functional color for primary action buttons and informational UI
- Off-white/light text (`#dce8f2`) for readability against dark surfaces
- Alegreya serif for display and headings — classical, scholarly weight
- Roboto sans-serif for body, labels, and UI — clean counterbalance
- Cards use elevated dark blue surface (`#152d42`) over the page background
- Depth created through box shadows and tonal shifts
- Border-radius: 3–4px — sharp and structured, not playful

---

## 2. Color Palette & Roles

### CSS Custom Properties

```css
:root {
  /* Brand */
  --primary:       #2a8fd4;   /* Blue — primary action buttons, informational UI */
  --primary-dark:  #1a6fa8;   /* Blue hover/active state */
  --primary-light: #4aa8e0;   /* Blue links */
  --accent:        #c8972e;   /* Gold — borders, headings, active nav, highlights */
  --accent-dark:   #a87824;   /* Gold dark variant */
  --accent-light:  #ddb84a;   /* Gold hover/light variant */

  /* Text */
  --text:          #dce8f2;   /* Primary body text */
  --text-light:    #7a9ab5;   /* Secondary/muted text, captions, placeholders */

  /* Backgrounds */
  --bg:            #0d1b26;   /* Page background (deep navy) */
  --bg-alt:        #091420;   /* Alternate section background (darker navy) */
  --bg-card:       #152d42;   /* Cards, panels, elevated surfaces */
  --bg-dark:       #070f17;   /* Deepest background — hero overlay, blockquotes */
  --bg-footer:     #040a10;   /* Footer background */

  /* Utility */
  --border:        rgba(255,255,255,0.1);    /* Default subtle border */
  --shadow:        0 4px 20px rgba(0,0,0,0.5); /* Card/element shadow */
}
```

### Color Roles Summary

| Color | Value | Usage |
|-------|-------|-------|
| Gold (`--accent`) | `#c8972e` | Headings, active nav, dividers, card top borders, badges |
| Gold light (`--accent-light`) | `#ddb84a` | Hover states on gold elements |
| Blue (`--primary`) | `#2a8fd4` | Primary `.btn-primary` buttons |
| Blue dark (`--primary-dark`) | `#1a6fa8` | Button hover, meeting info background |
| Blue light (`--primary-light`) | `#4aa8e0` | Body link color |
| Text (`--text`) | `#dce8f2` | All primary text |
| Text muted (`--text-light`) | `#7a9ab5` | Secondary text, captions, card body copy |
| Card bg (`--bg-card`) | `#152d42` | Info cards, WM card, payment cards, newsletter |
| Page bg (`--bg`) | `#0d1b26` | Page body |
| Alt bg (`--bg-alt`) | `#091420` | `.section-alt` background |
| Dark bg (`--bg-dark`) | `#070f17` | Hero overlay, blockquote background, deepest surfaces |

### Payment Brand Colors (contextual only)

Used only on payment CTAs. Not part of the lodge palette.
- PayPal: `#003087`
- Venmo: `#008CFF`

---

## 3. Typography Rules

### Font Stack

```css
/* Display & Headings */
font-family: 'Alegreya', 'Georgia', serif;

/* Body, UI, Labels */
font-family: 'Roboto', 'Segoe UI', sans-serif;
```

Loaded via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Size | Weight | Font | Color |
|---------|------|--------|------|-------|
| Hero H1 | 3rem (2.2rem mobile) | 700 | Alegreya | `#fff` |
| Page H1 (`.page-header`) | 2.4rem | 700 | Alegreya | `#fff` |
| Page subtitle | 1.05rem | 400 | Alegreya italic | `--accent` |
| Section H2 (`.section-header`) | 2rem | 700 | Alegreya | `--accent` |
| Card H3 | 1.1–1.4rem | 700 | Alegreya | `--accent` |
| Nav links | 0.9rem | 500 | Roboto uppercase | `--text` |
| Body | 0.95–1rem | 400 | Roboto | `--text` |
| Labels (form) | 0.8rem | 500 | Roboto uppercase | `--text-light` |
| Small/caption | 0.85–0.9rem | 400 | Roboto | `--text-light` |
| Button | 0.9rem | 600 | Roboto uppercase | varies by type |

### Typography Philosophy
Alegreya is used exclusively for headings and display text — it carries the historical, fraternal weight of the lodge. Roboto handles all functional UI: navigation, body copy, form labels, and buttons. **Never use Alegreya for UI elements (buttons, labels, inputs). Never use Roboto for section or card headings.**

---

## 4. Component Patterns

### Navigation Header

```
Background: --bg-dark (#070f17)
Border-bottom: 3px solid --accent (gold)
Logo: left-aligned image (images/header_miz.png), height 50px
Nav links: Roboto 0.9rem 500, --text, uppercase, letter-spacing 0.5px
Active/hover link: color --accent, background rgba(255,255,255,0.05)
Donate button: solid gold fill (#c8972e), dark text, border-radius 3px
Hamburger spans: background --accent (gold)
Mobile: hamburger toggle (.nav-toggle), nav slides in with class="open"
```

Shared via `js/header.js` — injected as first element in `<body>`. Active nav state set dynamically by URL match — **never hardcode `class="active"` in page files**.

### Page Header Banner

Used on all inner pages (not homepage):
```
Background: linear-gradient(135deg, --bg-dark 0%, #0d2d42 100%)
Border-bottom: 3px solid --accent
H1: Alegreya 2.4rem, #fff
Subtitle p: Alegreya italic 1.05rem, --accent
Padding: 60px vertical
```

### Cards / Info Cards (`.info-card`)

```css
.info-card {
  background: var(--bg-card);       /* #152d42 */
  border-radius: 4px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 20px;
}

.info-card h3 {
  font-family: 'Alegreya', serif;
  color: var(--accent);
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border);  /* subtle white border */
}
```

### Pillar Cards (`.pillar`) — three-column feature grid

```css
.pillar {
  text-align: center;
  padding: 35px 30px;
  background: var(--bg-card);
  border-radius: 4px;
  border-top: 3px solid var(--accent);
  box-shadow: var(--shadow);
}
.pillar h3 { color: var(--accent); font-size: 1.4rem; }
.pillar p  { color: var(--text-light); font-size: 0.95rem; }
.pillar-icon img {
  width: 64px; height: 64px;
  filter: brightness(0) invert(1);  /* force white */
}
```

### Buttons

#### Primary (Blue fill)
```css
.btn-primary {
  background: var(--primary);   /* #2a8fd4 */
  color: #fff;
  border-radius: 3px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.btn-primary:hover { background: var(--primary-dark); }
```

#### Accent (Gold fill)
```css
.btn-accent {
  background: var(--accent);    /* #c8972e */
  color: #0d1b26;
  border-radius: 3px;
}
.btn-accent:hover { background: var(--accent-light); }
```

#### Outline (Ghost)
```css
.btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid var(--accent);
  border-radius: 3px;
}
.btn-outline:hover {
  background: var(--accent);
  color: #0d1b26;
}
```

#### Donate (nav)
```css
.btn-donate {
  background: var(--accent);
  color: #0d1b26 !important;
  border-radius: 3px;
  padding: 10px 18px;
  font-weight: 700;
}
.btn-donate:hover { background: var(--accent-light); }
```

### Form Inputs

```css
.form-group input,
.form-group textarea,
.form-group select {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text);
  font-family: 'Roboto', sans-serif;
  padding: 10px 14px;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(200,151,46,0.15);
  outline: none;
}
```

Form labels:
```css
.form-group label {
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-light);
}
```

### Dividers

```css
.section-header .divider {
  width: 60px;
  height: 3px;
  background: var(--accent);
  margin: 10px auto;
}
```

### Blockquotes

Used on the About page for historical quotes:
```css
blockquote {
  border-left: 4px solid var(--accent);
  padding: 15px 20px;
  margin: 25px 0;
  font-style: italic;
  color: var(--text-light);
  background: var(--bg-dark);
  border-radius: 0 4px 4px 0;
}
blockquote cite {
  display: block;
  margin-top: 10px;
  font-style: normal;
  font-size: 0.9rem;
  color: var(--accent);
}
```

### Tables (`.dues-table`)

```css
.dues-table th {
  background: var(--primary-dark);  /* blue */
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.82rem;
}
.dues-table td {
  border-bottom: 1px solid var(--border);
  color: var(--text);
}
.dues-table .total-row td {
  color: var(--accent);
  font-weight: 700;
  background: rgba(200,151,46,0.1);
}
```

### Newsletter Block

```css
.newsletter {
  background: var(--bg-card);
  border: 1px solid var(--accent);
  padding: 40px;
  border-radius: 4px;
  text-align: center;
}
```

### Benediction (footer pull quote)

```css
.benediction {
  font-style: italic;
  text-align: center;
  padding: 20px;
  border-left: 3px solid var(--accent);
  background: rgba(200,151,46,0.05);
  border-radius: 0 3px 3px 0;
}
```

---

## 5. Layout & Spacing

### Page Structure

```
<header class="site-header">     ← injected via js/header.js (first element in <body>)
<div class="page-header">        ← inner page banner (not on homepage)
<section class="content-page">   ← main content wrapper for inner pages
  <div class="container">        ← max-width constrained, centered
<footer class="site-footer">
```

### Container

```css
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
}
```

Inner page containers often constrained further inline: `style="max-width:1000px;"` or `style="max-width:900px;"`.

### Section Spacing

```css
.section        { padding: 70px 0; }
.content-page   { padding: 40px 0; }
.section-alt    { background: var(--bg-alt); }   /* #091420 */
.section-dark   { background: var(--bg-dark); }  /* #070f17 */
```

### Grid Patterns

Three-column (pillars, payment methods):
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20–30px;
/* collapses to 1fr at 768px */
```

Two-column (welcome, contact, scholarships):
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
/* collapses to 1fr at 768px */
```

Footer:
```css
grid-template-columns: 2fr 1fr 1fr;
```

### Breakpoints

| Name | Value | Behavior |
|------|-------|----------|
| Mobile | `≤ 768px` | Single column, hamburger nav, stacked grids |
| Desktop | `> 768px` | Full multi-column layouts |

---

## 6. Shared Infrastructure

### Header System

All pages use a shared header injected via JavaScript:

```
js/header.js  ← single source of truth for nav markup and active-link logic
```

Every page body opens with:
```html
<script src="js/header.js"></script>
```
placed as the **first element inside `<body>`**. The script uses `document.currentScript.insertAdjacentHTML('beforebegin', headerHTML)` to inject the header synchronously before the script tag.

Active nav state is set dynamically by matching `window.location.pathname` — **never hardcode `class="active"` in page files**.

### Copyright Year

All footers use:
```html
<script>document.write(new Date().getFullYear())</script>
```
Never hardcode a year.

### Contact Form

`contact.html` submits to Formspree (`https://formspree.io/f/xldrdgjd`) via AJAX with `Accept: application/json`. On success, `form.reset()` is called and a success message is shown. Never full-page redirect.

### Newsletter

Mailchimp embed in `index.html`. POST to Mailchimp list-manage URL. Includes honeypot field (`b_...`). Opens in `target="_blank"`.

### Payment Links
- PayPal: `https://www.paypal.me/mizpah302`
- Venmo: `https://www.venmo.com/u/mizpah302`

---

## 7. Voice & Copy Tone

- **Formal but warm** — never stuffy, never casual
- **Brotherhood is assumed** — write as if addressing someone who belongs or wants to
- **History is an asset** — dates, names, and milestones are used actively, not stored in footers
- **Community service is core** — not a footnote; woven into page content
- Page subtitles are short and purposeful (e.g., *"Join our Brotherhood & support our community"*)
- CTAs are action-first: "Reserve Your Seat", "Download Petition Form", "Contact the Secretary"

---

## 8. Agent Prompt Reference

Use this block when prompting Claude Code to build or modify pages for this site:

```yaml
# Mizpah Lodge #302 — mizpahomaha.com

## Identity
Masonic lodge, Omaha Nebraska, founded 1919.
Dark navy aesthetic, gold + blue accents, serif/sans type pairing.

## Colors
Page background:  #0d1b26  (--bg)
Alt background:   #091420  (--bg-alt)
Card background:  #152d42  (--bg-card)
Deep background:  #070f17  (--bg-dark)
Footer:           #040a10  (--bg-footer)
Gold accent:      #c8972e  (--accent) — headings, borders, active states, dividers
Gold light:       #ddb84a  (--accent-light) — gold hover
Blue primary:     #2a8fd4  (--primary) — action buttons
Blue dark:        #1a6fa8  (--primary-dark) — button hover, meeting info bg
Blue light:       #4aa8e0  (--primary-light) — body links
Text primary:     #dce8f2  (--text)
Text muted:       #7a9ab5  (--text-light)
Border:           rgba(255,255,255,0.1)  (--border)
Shadow:           0 4px 20px rgba(0,0,0,0.5)  (--shadow)

## Typography
Headings: Alegreya serif — color --accent or #fff depending on context
Body/UI:  Roboto sans-serif — color --text (#dce8f2)
Form labels: Roboto 0.8rem, 500 weight, uppercase, letter-spacing 0.06em, color --text-light
Never use Alegreya for buttons or form labels.
Never use Roboto for section headings or card titles.

## Components
Cards:          bg #152d42, border-radius 4px, box-shadow, padding 30px
Pillar cards:   same as cards + border-top 3px solid --accent
Primary button: bg #2a8fd4 (blue), color #fff, border-radius 3px
Accent button:  bg #c8972e (gold), color #0d1b26, border-radius 3px
Outline button: transparent, border 2px solid --accent, color #fff
Inputs:         bg rgba(255,255,255,0.06), border rgba(255,255,255,0.1), focus border --accent
Blockquotes:    border-left 4px solid --accent, bg --bg-dark, color --text-light, italic
Divider:        60px wide, 3px tall, background --accent

## Shared Header
js/header.js injected as first element in <body>.
Never hardcode the <header> block in page files.
Never hardcode class="active" on nav links — set dynamically by URL match.

## Fonts (Google Fonts)
Alegreya: ital,wght@0,400;0,700;1,400
Roboto: wght@300;400;500;700

## Layout
Container: max-width 1140px, centered, padding 0 20px
Mobile breakpoint: 768px (single column, hamburger nav)
Three-col grid: repeat(3, 1fr), gap 20–30px, collapses to 1fr at 768px
Two-col grid: 1fr 1fr, gap 40px, collapses to 1fr at 768px

## Domain
mizpahomaha.com (GitHub Pages, custom domain)
Repo: github.com/Axeion/omahamasons
Branch: claude/bold-dark-theme
```

---

## 9. Pages Reference

| File | Nav Label | Purpose |
|------|-----------|---------|
| `index.html` | Home | Hero, pillars, WM message, what is Freemasonry, newsletter |
| `about.html` | About Us | Lodge history, MWB Futcher legacy, centennial, community partnerships |
| `calendar.html` | Calendar | Google Calendar embed |
| `scholarships.html` | Membership | Petition for initiation + scholarship applications |
| `dues.html` | Lodge Dues | Annual dues breakdown, payment methods, Club 1919 section |
| `contact.html` | Contact Us | Contact form (Formspree AJAX) + lodge info + map |
| `rsvp.html` | *(unlisted)* | Monthly business meeting dinner RSVP |
| `trestle-board.html` | *(unlisted)* | Newsletter archive (not linked from nav) |
| `shop.html` | *(unlisted)* | Etsy storefront link |
| `club-1919.html` | *(unlisted)* | Legacy page — content moved to dues.html |
| `js/header.js` | *(script)* | Shared nav — injected into all pages |
