/**
 * lightbox.js — Mizpah Lodge #302
 *
 * Provides:
 *   - Home page slideshow (#home-slideshow) that auto-rotates every 15 s
 *   - Gallery grid (#gallery-grid) with thumbnail tiles
 *   - Full-screen lightbox overlay for both of the above
 *   - Inline page images (.lb-image) that open in the lightbox on click
 *     without rotating — useful for photo-illustrated content pages
 *
 * To add new gallery images: drop the file into images/lightbox/ and push
 * to main. The GitHub Action will detect the new file, add it to
 * images/lightbox/manifest.json with an auto-generated caption, and update
 * GALLERY_IMAGES below automatically. Edit manifest.json to customise captions.
 *
 * To make any inline <img> pop out: add class="lb-image" to it and load
 * this script on that page.
 */
(function () {
  var GALLERY_IMAGES = [
    {
      src: 'images/lightbox/officers-group.jpg',
      caption: 'Mizpah Lodge #302 Officers',
    },
    {
      src: 'images/lightbox/mizpahglgroup.jpg',
      caption: 'Members of Mizpah Lodge #302',
    },
    {
      src: 'images/lightbox/futcherdedication.jpg',
      caption: 'Futcher Dedication Ceremony',
    },
    {
      src: 'images/lightbox/buildingexterior.jpg',
      caption: 'Mizpah Lodge — 1124 S. 48th Street, Omaha',
    },
    {
      src: 'images/lightbox/fb_bluffcity.jpg',
      caption: 'Mizpah Visits Bluff City Lodge in Iowa',
    },
    {
      src: 'images/lightbox/fb_eastergroup.jpg',
      caption: 'Mizpah Partners with Morton Meadows for a great Easter egg hunt!',
    },
    {
      src: 'images/lightbox/fbgroup.jpg',
      caption: 'Mizpah celebrates the visit of a Brother from Portland, Oregon',
    },
    {
      src: 'images/lightbox/fbgrow.jpg',
      caption: 'Mizpah members & visitors discuss their feelings at our Monthly Grow night',
    },
    {
      src: 'images/lightbox/patrick&ericcoin.jpg',
      caption: 'Grand Custodian Eric presents W.B. Patrick with his MM proficency coin.',
    },
  ];

  /* ── Shared lightbox state ─────────────────────────────────── */
  var currentSet = [];
  var lbIndex    = 0;
  var overlay, lbImg, lbCaption, lbPrev, lbNext;

  /* ── Lightbox overlay ──────────────────────────────────────── */
  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous image">&#10094;</button>' +
      '<div class="lb-content">' +
        '<img class="lb-img" src="" alt="">' +
        '<p class="lb-caption"></p>' +
      '</div>' +
      '<button class="lb-next" aria-label="Next image">&#10095;</button>';
    document.body.appendChild(overlay);

    lbImg     = overlay.querySelector('.lb-img');
    lbCaption = overlay.querySelector('.lb-caption');
    lbPrev    = overlay.querySelector('.lb-prev');
    lbNext    = overlay.querySelector('.lb-next');

    overlay.querySelector('.lb-close').addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function () { navigateLb(-1); });
    lbNext.addEventListener('click', function () { navigateLb(1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lb-open')) return;
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowLeft')  navigateLb(-1);
      if (e.key === 'ArrowRight') navigateLb(1);
    });
  }

  /**
   * Open the lightbox with a given image set and starting index.
   * Pass showNav = false to hide prev/next arrows (single-image pop-out).
   */
  function openLb(imageSet, index) {
    currentSet = imageSet;
    var n = currentSet.length;
    lbIndex = ((index % n) + n) % n;
    updateLbDisplay();
    // Hide nav arrows when there is only one image in the set
    var multi = n > 1;
    lbPrev.style.display = multi ? '' : 'none';
    lbNext.style.display = multi ? '' : 'none';
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function navigateLb(dir) {
    var n = currentSet.length;
    lbIndex = ((lbIndex + dir) % n + n) % n;
    updateLbDisplay();
  }

  function updateLbDisplay() {
    lbImg.src             = currentSet[lbIndex].src;
    lbImg.alt             = currentSet[lbIndex].caption;
    lbCaption.textContent = currentSet[lbIndex].caption;
  }

  function closeLb() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  /* ── Home page slideshow ───────────────────────────────────── */
  function buildSlideshow(container) {
    var current = 0;
    var timer;

    var html = '<div class="ss-track">';
    GALLERY_IMAGES.forEach(function (img, i) {
      html +=
        '<div class="ss-slide' + (i === 0 ? ' ss-active' : '') +
        '" data-index="' + i + '">' +
        '<img src="' + img.src + '" alt="' + img.caption +
        '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
        '<div class="ss-caption">' + img.caption + '</div>' +
        '</div>';
    });
    html += '</div>';
    html += '<button class="ss-prev" aria-label="Previous">&#10094;</button>';
    html += '<button class="ss-next" aria-label="Next">&#10095;</button>';
    html += '<div class="ss-dots" role="tablist">';
    GALLERY_IMAGES.forEach(function (_, i) {
      html +=
        '<button class="ss-dot' + (i === 0 ? ' ss-dot-active' : '') +
        '" role="tab" aria-label="Go to slide ' + (i + 1) + '"></button>';
    });
    html += '</div>';
    container.innerHTML = html;

    var slides = container.querySelectorAll('.ss-slide');
    var dots   = container.querySelectorAll('.ss-dot');

    function goTo(n) {
      var len = slides.length;
      current = ((n % len) + len) % len;
      slides.forEach(function (s, i) {
        s.classList.toggle('ss-active', i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('ss-dot-active', i === current);
      });
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 15000);
    }

    container.querySelector('.ss-prev').addEventListener('click', function () {
      goTo(current - 1); resetTimer();
    });
    container.querySelector('.ss-next').addEventListener('click', function () {
      goTo(current + 1); resetTimer();
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
    });
    slides.forEach(function (slide) {
      slide.addEventListener('click', function () {
        openLb(GALLERY_IMAGES, parseInt(this.getAttribute('data-index'), 10));
      });
    });

    resetTimer();
  }

  /* ── Gallery grid ──────────────────────────────────────────── */
  function buildGallery(container) {
    var html = '';
    GALLERY_IMAGES.forEach(function (img, i) {
      html +=
        '<button class="gal-item" data-index="' + i + '" ' +
        'style="background-image:url(\'' + img.src + '\')" ' +
        'aria-label="View: ' + img.caption + '">' +
        '<span class="gal-caption">' + img.caption + '</span>' +
        '</button>';
    });
    container.innerHTML = html;
    container.querySelectorAll('.gal-item').forEach(function (item) {
      item.addEventListener('click', function () {
        openLb(GALLERY_IMAGES, parseInt(this.getAttribute('data-index'), 10));
      });
    });
  }

  /* ── Inline page images (.lb-image) ───────────────────────── */
  function initPageImages() {
    var pageImgs = Array.prototype.slice.call(
      document.querySelectorAll('img.lb-image')
    );
    if (!pageImgs.length) return;

    // Build an image set from the page's .lb-image elements.
    // img.src returns the absolute URL, which is fine for the overlay.
    var imgSet = pageImgs.map(function (img) {
      return { src: img.src, caption: img.alt };
    });

    pageImgs.forEach(function (img, i) {
      img.addEventListener('click', function () {
        openLb(imgSet, i);
      });
    });
  }

  /* ── Init ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    createOverlay();
    var ss  = document.getElementById('home-slideshow');
    var gal = document.getElementById('gallery-grid');
    if (ss)  buildSlideshow(ss);
    if (gal) buildGallery(gal);
    initPageImages();
  });
})();
