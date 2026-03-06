/**
 * meet-the-team.js
 * Forged Human Performance — Meet the Team page
 * Cards are always visible via CSS. JS only handles tap-to-flip on touch devices.
 */

"use strict";

// ============================================
// Tap-to-flip for touch / mobile devices
// ============================================
const initTapFlip = () => {
  const cards = document.querySelectorAll(".flip-card");
  if (!cards.length) return;

  const isTouchDevice =
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (!isTouchDevice) return;

  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // let links work normally
      cards.forEach((other) => {
        if (other !== card) other.classList.remove("is-flipped");
      });
      card.classList.toggle("is-flipped");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".flip-card")) {
      cards.forEach((c) => c.classList.remove("is-flipped"));
    }
  });
};

// ============================================
// Sticky nav
// ============================================
const initStickyNav = () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true },
  );
};

// ============================================
// Mobile hamburger menu
// ============================================
const initMobileMenu = () => {
  const hamburger = document.getElementById("hamburger");
  const navOptions = document.getElementById("navOptions");
  if (!hamburger || !navOptions) return;

  hamburger.addEventListener("click", () => {
    navOptions.classList.toggle("active");
    hamburger.innerHTML = navOptions.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navOptions.classList.remove("active");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
};

// ============================================
// Subtle hero parallax
// ============================================
const initHeroParallax = () => {
  const hero = document.querySelector(".team-hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < window.innerHeight) {
        hero.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.25}px)`;
      }
    },
    { passive: true },
  );
};

// ============================================
// Copyright year
// ============================================
const updateYear = () => {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
};

// ============================================
// Init
// ============================================
const init = () => {
  initStickyNav();
  initMobileMenu();
  initTapFlip();
  initHeroParallax();
  updateYear();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
