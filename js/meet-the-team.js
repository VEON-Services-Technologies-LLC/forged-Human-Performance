/**
 * meet-the-team.js  —  Forged Human Performance
 * Cards are always visible via CSS.
 * This file only handles: tap-to-flip, sticky nav, hamburger.
 */
(function () {
  "use strict";

  /* ── Tap-to-flip ── */
  function initFlip() {
    var cards = document.querySelectorAll(".flip-card");
    if (!cards.length) return;

    Array.prototype.forEach.call(cards, function (card) {
      card.addEventListener("click", function (e) {
        // Let anchor clicks navigate normally
        if (e.target.closest && e.target.closest("a")) return;
        if (e.target.tagName === "A") return;

        var flipped = card.classList.contains("is-flipped");

        // Close all cards
        Array.prototype.forEach.call(cards, function (c) {
          c.classList.remove("is-flipped");
        });

        // Open this one if it wasn't already open
        if (!flipped) {
          card.classList.add("is-flipped");
        }

        e.stopPropagation();
      });
    });

    // Tap outside → close all
    document.addEventListener("click", function () {
      Array.prototype.forEach.call(cards, function (c) {
        c.classList.remove("is-flipped");
      });
    });
  }

  /* ── Sticky nav ── */
  function initNav() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      },
      { passive: true },
    );
  }

  /* ── Hamburger ── */
  function initHamburger() {
    var btn = document.getElementById("hamburger");
    var nav = document.getElementById("navOptions");
    if (!btn || !nav) return;

    btn.addEventListener("click", function () {
      nav.classList.toggle("active");
      btn.innerHTML = nav.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    var links = document.querySelectorAll(".nav-link");
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        btn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* ── Copyright year ── */
  function initYear() {
    var el = document.getElementById("current-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Init ── */
  function init() {
    initFlip();
    initNav();
    initHamburger();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
