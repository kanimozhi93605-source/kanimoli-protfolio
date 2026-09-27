/* ============================================================
   A. Kanimoli — Portfolio scripts
   1. Mobile navigation toggle
   2. Close menu on link click / outside click
   3. Scroll-reveal animation (IntersectionObserver)
   4. Contact form UI feedback (no backend — front-end only)
   5. Footer year
   6. Active navigation link on scroll
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1 & 2. Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');

  function closeMenu(){
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu(){
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      var clickInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
      if (!clickInsideNav && navLinks.classList.contains('is-open')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  /* ---------- 3. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* Fallback: show everything immediately */
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Contact form (front-end only) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formStatus  = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = contactForm.name.value.trim();
      var email = contactForm.email.value.trim();
      var message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in every field before sending.';
        return;
      }

      /* This form has no backend attached yet.
         It opens the visitor's email client with the message pre-filled,
         addressed to Kanimoli's email, so the message still reaches her. */
      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:kanimozhi93605@gmail.com?subject=' + subject + '&body=' + body;

      formStatus.textContent = 'Opening your email app to send this message…';
      contactForm.reset();
    });
  }

  /* ---------- 5. Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.style.boxShadow = '0 8px 24px -16px rgba(0,0,0,0.6)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 6. Active nav link on scroll ---------- */
  var navLinkEls = document.querySelectorAll('[data-nav-link]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

  function setActiveLink(id){
    navLinkEls.forEach(function (link) {
      var isMatch = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isMatch);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

});
