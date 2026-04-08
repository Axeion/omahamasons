/**
 * lightbox.js — Mizpah Lodge #302
 *
 * Provides:
 *   - Home page slideshow (#home-slideshow) that auto-rotates every 15 s
 *   - Gallery grid (#gallery-grid) with thumbnail tiles
 *   - Full-screen lightbox overlay for both
 *
 * To add new images: drop the file into images/lightbox/ and add an entry
 * to GALLERY_IMAGES below.
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
      src: 'images/lightbox/prateek-katyal-_YzGQvASeMk-unsplash.jpg',
      caption: 'Brotherhood',
    },
  ];

  /* ── Lightbox overlay ──────────────────────────────────────── */
  var lbIndex = 0;
  var overlay, lbImg, lbCaption;

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

    overlay.querySelector('.lb-close').addEventListener('click', closeLb);
    overlay.querySelector('.lb-prev').addEventListener('click', function () {
      showLb(lbIndex - 1);
    });
    overlay.querySelector('.lb-next').addEventListener('click', function () {
      showLb(lbIndex + 1);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lb-open')) return;
      if (e.key === 'Escape')      closeLb();
      if (e.key === 'ArrowLeft')   showLb(lbIndex - 1);
      if (e.key === 'ArrowRight')  showLb(lbIndex + 1);
    });
  }

  function showLb(index) {
    var n = GALLERY_IMAGES.length;
    lbIndex = ((index % n) + n) % n;
    lbImg.src       = GALLERY_IMAGES[lbIndex].src;
    lbImg.alt       = GALLERY_IMAGES[lbIndex].caption;
    lbCaption.textContent = GALLERY_IMAGES[lbIndex].caption;
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  /* ── Home page slideshow ───────────────────────────────────── */
  function buildSlideshow(container) {
    var current = 0;
    var timer;

    // Build HTML
    var html = '<div class="ss-track">';
    GALLERY_IMAGES.forEach(function (img, i) {
      html +=
        '<div class="ss-slide' + (i === 0 ? ' ss-active' : '') +
        '" data-index="' + i + '">' +
        '<img src="' + img.src + '" alt="' + img.caption + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
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
        showLb(parseInt(this.getAttribute('data-index'), 10));
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
        showLb(parseInt(this.getAttribute('data-index'), 10));
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
  });
})();
