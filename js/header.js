/**
 * header.js — Mizpah Lodge #302
 *
 * Injects the shared site header and handles:
 *   - Active nav-link highlighting based on the current page
 *   - Mobile hamburger toggle
 *   - Mobile dropdown toggle
 *
 * Usage: place <script src="js/header.js"></script> as the first
 * element inside <body> on every page. The header is inserted
 * immediately before this script tag so it appears at the top.
 */
(function () {
  var headerHTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <img src="images/header_miz.png" alt="Mizpah Lodge #302 A.F. &amp; A.M." class="logo-img">
      </a>

      <button class="nav-toggle" aria-label="Toggle navigation" onclick="toggleNav()">
        <span></span><span></span><span></span>
      </button>

      <nav class="main-nav" id="mainNav">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="calendar.html">Calendar</a></li>
          <li><a href="scholarships.html">Scholarships &amp; Forms</a></li>
          <li><a href="dues.html">Lodge Dues</a></li>
          <li><a href="club-1919.html">Club 1919</a></li>
          <li><a href="contact.html">Contact Us</a></li>
          <li><a href="https://www.paypal.com/donate" target="_blank" rel="noopener" class="btn-donate">Donate</a></li>
        </ul>
      </nav>
    </div>
  </header>`;

  // Inject the header HTML immediately before this script tag
  document.currentScript.insertAdjacentHTML('beforebegin', headerHTML);

  // Highlight the nav link matching the current page
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      // If this link is inside a dropdown, also mark the parent anchor active
      var dropdown = link.closest('.has-dropdown');
      if (dropdown) {
        var parentLink = dropdown.querySelector(':scope > a');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  // Mobile hamburger toggle
  window.toggleNav = function () {
    document.getElementById('mainNav').classList.toggle('open');
  };

  // Mobile dropdown toggle — prevent navigation on small screens, toggle instead
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });
})();
