#!/usr/bin/env node
/**
 * update-gallery.js
 *
 * Keeps images/lightbox/manifest.json and the GALLERY_IMAGES array in
 * js/lightbox.js in sync with whatever image files are in images/lightbox/.
 *
 * Rules:
 *   - Existing manifest entries keep their captions and their position.
 *   - New image files are appended with an auto-generated caption derived
 *     from the filename (dashes/underscores → spaces, Title Case).
 *   - Entries whose image file has been deleted are removed.
 *
 * Run locally:  node .github/scripts/update-gallery.js
 * Run by CI:    triggered automatically on push when an image changes.
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const LIGHTBOX_DIR  = 'images/lightbox';
const MANIFEST_PATH = path.join(LIGHTBOX_DIR, 'manifest.json');
const LIGHTBOX_JS   = 'js/lightbox.js';
const IMAGE_EXTS    = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);

// ── Load existing manifest ──────────────────────────────────────────────────
let manifest = [];
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (e) {
    console.warn('Warning: could not parse manifest.json — starting fresh.');
  }
}

// ── Scan directory for image files ─────────────────────────────────────────
const files = fs.readdirSync(LIGHTBOX_DIR)
  .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
  .sort();

const onDisk = new Set(files.map(f => `${LIGHTBOX_DIR}/${f}`));

// ── Build updated manifest ──────────────────────────────────────────────────
// 1. Retain existing entries that still have a file (preserves captions & order)
const updated = manifest.filter(entry => {
  if (!onDisk.has(entry.src)) {
    console.log(`  - removed: ${entry.src}`);
    return false;
  }
  return true;
});

const inManifest = new Set(updated.map(e => e.src));

// 2. Append newly discovered files with auto-generated captions
files.forEach(filename => {
  const src = `${LIGHTBOX_DIR}/${filename}`;
  if (!inManifest.has(src)) {
    const caption = filename
      .replace(/\.[^.]+$/, '')              // strip extension
      .replace(/[-_]+/g, ' ')              // dashes/underscores → spaces
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase()); // Title Case
    updated.push({ src, caption });
    console.log(`  + added:   ${src} → "${caption}"`);
  }
});

// ── Write manifest.json ─────────────────────────────────────────────────────
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(updated, null, 2) + '\n');
console.log(`\nWrote ${MANIFEST_PATH} (${updated.length} image${updated.length !== 1 ? 's' : ''})`);

// ── Rewrite GALLERY_IMAGES block in lightbox.js ────────────────────────────
// Escape backslashes and single quotes so a filename or caption containing
// an apostrophe can't break (or inject into) the generated JavaScript.
const escJs = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const arrayBody = updated
  .map(({ src, caption }) =>
    `    {\n      src: '${escJs(src)}',\n      caption: '${escJs(caption)}',\n    }`)
  .join(',\n');

const replacement = `var GALLERY_IMAGES = [\n${arrayBody},\n  ];`;

const GALLERY_RE = /var GALLERY_IMAGES\s*=\s*\[[\s\S]*?\];/;

let js = fs.readFileSync(LIGHTBOX_JS, 'utf8');

if (!GALLERY_RE.test(js)) {
  console.error('\nERROR: GALLERY_IMAGES array not found in lightbox.js — aborting.');
  process.exit(1);
}

const updated_js = js.replace(GALLERY_RE, replacement);

if (updated_js === js) {
  console.log(`GALLERY_IMAGES in ${LIGHTBOX_JS} already up to date.`);
} else {
  fs.writeFileSync(LIGHTBOX_JS, updated_js);
  console.log(`Updated GALLERY_IMAGES in ${LIGHTBOX_JS}`);
}
