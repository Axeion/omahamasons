# Design Reference — Mizpah Lodge #302

Dark, dignified, community-rooted. Deep navy backgrounds, warm gold accents, serif display type paired with clean sans-serif body text.

---

## Colors

```css
--primary:      #2a8fd4   /* blue — primary action buttons */
--primary-dark: #1a6fa8
--accent:       #c8972e   /* gold — borders, highlights, active states */
--accent-light: #ddb84a
--text:         #dce8f2   /* off-white body text */
--text-light:   #7a9ab5   /* muted/secondary text */
--bg:           #0d1b26   /* page background */
--bg-alt:       #091420   /* alternating section background */
--bg-card:      #152d42   /* card/panel surfaces */
--bg-dark:      #070f17   /* deeper dark sections */
--bg-footer:    #040a10
--border:       rgba(255,255,255,0.1)
--shadow:       0 4px 20px rgba(0,0,0,0.5)
```

## Typography

- **Display / headings**: `Alegreya` (Google Fonts) — serif, scholarly weight
- **Body / UI**: `Roboto` (Google Fonts) — clean sans-serif
- Headings use `color: var(--accent)` in section contexts
- Page-level `h1` uses `color: #fff`

```html
<link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

## Buttons

```html
<a class="btn btn-primary">Blue fill</a>   <!-- primary actions -->
<a class="btn btn-outline">Gold border</a>  <!-- secondary actions -->
<a class="btn btn-accent">Gold fill</a>     <!-- subscribe / donate -->
```

```css
.btn { padding: 12px 28px; border-radius: 3px; font-weight: 600;
       text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }
.btn-primary { background: #2a8fd4; color: #fff; }
.btn-outline  { background: transparent; color: #fff; border: 2px solid #c8972e; }
.btn-accent   { background: #c8972e; color: #0d1b26; }
```

## Layout

- Max content width: `1140px`, centered, `padding: 0 20px`
- Sections: `padding: 70px 0`; alternating `--bg` / `--bg-alt` / `--bg-dark`
- Section headers: centered `h2` in `--accent`, 60px wide 3px gold divider bar beneath

## Cards / Panels

```css
.info-card  { background: #152d42; border-radius: 4px; padding: 30px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
/* accent-top variant */
border-top: 3px solid #c8972e;
/* accent-left variant */
border-left: 4px solid #c8972e;
```

Card headings use `color: var(--accent)` with a `border-bottom: 2px solid rgba(255,255,255,0.1)`.

## Forms / Inputs

```css
input, textarea, select {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #dce8f2;
  border-radius: 3px;
  padding: 10px 14px;
}
input:focus { border-color: #c8972e; box-shadow: 0 0 0 3px rgba(200,151,46,0.15); }
```

## Key Patterns

- **Sticky header**: `background: #070f17`, `border-bottom: 3px solid #c8972e`
- **Page hero** (inner pages): `background: linear-gradient(135deg, #070f17 0%, #0d2d42 100%)`, `border-bottom: 3px solid #c8972e`
- **Blockquote**: `border-left: 4px solid #c8972e`, `background: #070f17`, italic text
- **Gold divider**: `width: 60px; height: 3px; background: #c8972e; margin: 10px auto`
- **Hover lift on cards**: `transform: translateY(-4px)` on `:hover`
- Responsive breakpoint: `768px` — single-column stacking

## Stylesheet

All styles live in `css/style.css`. Link it as: `<link rel="stylesheet" href="css/style.css">`
