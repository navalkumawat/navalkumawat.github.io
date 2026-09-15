/* ═══════════════════════════════════════════════════════
   Naval Kishor Kumawat — portfolio behaviour
   No dependencies. Everything degrades gracefully.
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── theme ─────────────────────────────────────────── */

  var THEME_KEY = 'nk-theme';
  var toggle = document.getElementById('themeToggle');

  function readStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function storeTheme(v) {
    try { localStorage.setItem(THEME_KEY, v); } catch (e) { /* private mode */ }
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#08090d' : '#fbfbfd');
  }

  // Dark is the intended default. Only an explicit choice by the visitor
  // (stored below) ever moves us off it.
  var stored = readStoredTheme();
  if (stored === 'light' || stored === 'dark') applyTheme(stored);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ── years of experience, always current ───────────── */

  var CAREER_START = new Date(2016, 9, 1); // Oct 2016
  var years = Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000));

  var WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
               'eleven','twelve','thirteen','fourteen','fifteen'];

  Array.prototype.forEach.call(document.querySelectorAll('[data-years]'), function (el) {
    el.setAttribute('data-count', String(years));
    el.textContent = String(years);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-years-inline]'), function (el) {
    el.textContent = WORDS[years] || String(years);
  });

  /* ── scroll reveal + counters ──────────────────────── */

  var reveals = document.querySelectorAll('.reveal');

  Array.prototype.forEach.call(reveals, function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--d', d);
  });

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = String(target); return; }

    var duration = 900;
    var start = null;
    var done = false;

    function settle() {
      if (done) return;
      done = true;
      el.textContent = String(target);
    }

    function step(ts) {
      if (done) return;
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      if (p >= 1) { settle(); return; }
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // If rAF is throttled (backgrounded tab, reduced power mode) the count can
    // stall short of the real number. Guarantee the final value regardless.
    setTimeout(settle, duration + 250);
  }

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        Array.prototype.forEach.call(entry.target.querySelectorAll('[data-count]'), countUp);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(reveals, function (el) { revealObserver.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in'); });
  }

  /* ── nav: stuck state, scroll progress, active link ── */

  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  var links = document.querySelectorAll('.nav-links a');
  var sections = [];

  Array.prototype.forEach.call(links, function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#' && id.length > 1) {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: a, el: sec });
    }
  });

  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;

    if (nav) nav.classList.toggle('stuck', y > 12);

    if (progress) {
      var max = document.body.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    var current = null;
    var probe = y + window.innerHeight * 0.32;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= probe) current = s.link;
    });
    Array.prototype.forEach.call(links, function (a) {
      a.classList.toggle('active', a === current);
    });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ───────────────────────────────────── */

  var menuBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || menuBtn.contains(e.target)) return;
      closeMenu();
    });
  }

  /* ── card spotlight follows the cursor ─────────────── */

  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.card'), function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ── footer year ───────────────────────────────────── */

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
