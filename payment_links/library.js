/**
 * Solutions Library - JavaScript
 * Optimized for performance and smooth UX
 */

// Use strict mode for better performance
"use strict";

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit execution rate
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if element is in viewport
 */
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// ============================================
// Card Animations
// ============================================

/**
 * Animate cards on scroll
 */
const animateCards = () => {
  const cards = document.querySelectorAll(".library-card");

  cards.forEach((card, index) => {
    if (isInViewport(card) && !card.classList.contains("animated")) {
      setTimeout(() => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
        card.classList.add("animated");
      }, 50);
    }
  });
};

// ============================================
// Copy Button Functionality
// ============================================

/**
 * Initialize copy buttons for payment links
 */
const initCopyButtons = () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Get the parent payment link
      const paymentLink = this.closest(".payment-link");
      const url = paymentLink.getAttribute("href");
      const linkTitle = paymentLink.querySelector(".link-title").textContent;
      const btnText = this.querySelector(".btn-text");

      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(url);

        // Visual feedback - add copied state
        this.classList.add("copied");
        if (btnText) btnText.textContent = "Copied!";

        // Log the copy action
        console.log("Link copied to clipboard:", {
          title: linkTitle,
          url: url,
          timestamp: new Date().toISOString(),
        });

        // Show tooltip
        showCopyTooltip(this, "Copied to clipboard!");

        // Remove copied state after 2 seconds
        setTimeout(() => {
          this.classList.remove("copied");
          if (btnText) btnText.textContent = "Copy";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
        if (btnText) btnText.textContent = "Error";
        showCopyTooltip(this, "Failed to copy");

        // Fallback for older browsers
        fallbackCopy(url, this);

        setTimeout(() => {
          if (btnText) btnText.textContent = "Copy";
        }, 2000);
      }
    });
  });
};

/**
 * Show temporary tooltip for copy feedback
 */
const showCopyTooltip = (button, message) => {
  // Remove any existing tooltip
  const existingTooltip = document.querySelector(".copy-tooltip");
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // Create tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "copy-tooltip";
  tooltip.textContent = message;
  tooltip.style.cssText = `
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
    `;

  button.style.position = "relative";
  button.appendChild(tooltip);

  // Remove tooltip after 2 seconds
  setTimeout(() => {
    tooltip.style.opacity = "0";
    setTimeout(() => tooltip.remove(), 300);
  }, 1500);
};

/**
 * Fallback copy method for older browsers
 */
const fallbackCopy = (text, button) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.cssText = "position: fixed; top: -9999px; left: -9999px;";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const btnText = button.querySelector(".btn-text");

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      button.classList.add("copied");
      if (btnText) btnText.textContent = "Copied!";
      showCopyTooltip(button, "Copied!");
      setTimeout(() => {
        button.classList.remove("copied");
        if (btnText) btnText.textContent = "Copy";
      }, 2000);
    }
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }

  document.body.removeChild(textArea);
};

// ============================================
// Link Tracking
// ============================================

/**
 * Track payment link clicks
 */
const trackLinkClicks = () => {
  const paymentLinks = document.querySelectorAll(".payment-link");

  paymentLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const linkTitle = this.querySelector(".link-title").textContent;
      const linkUrl = this.getAttribute("href");

      // Log the click (can be replaced with analytics)
      console.log("Payment link clicked:", {
        title: linkTitle,
        url: linkUrl,
        timestamp: new Date().toISOString(),
      });

      // Optional: Add analytics tracking here
      // Example: gtag('event', 'click', { 'event_category': 'payment_link', 'event_label': linkTitle });
    });
  });
};

// ============================================
// Smooth Scroll Enhancement
// ============================================

/**
 * Add smooth scroll to all internal links
 */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

// ============================================
// Card Hover Effects Enhancement
// ============================================

/**
 * Add parallax effect to card icons on mouse move
 */
const initCardParallax = () => {
  const cards = document.querySelectorAll(".library-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const icon = this.querySelector(".card-icon");
      if (!icon) return;

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const moveX = deltaX * 5;
      const moveY = deltaY * 5;

      icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".card-icon");
      if (icon) {
        icon.style.transform = "translate(0, 0) scale(1)";
      }
    });
  });
};

// ============================================
// Performance Monitoring
// ============================================

/**
 * Log page performance metrics
 */
const logPerformanceMetrics = () => {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log("Performance Metrics:", {
          pageLoadTime: `${pageLoadTime}ms`,
          connectTime: `${connectTime}ms`,
          renderTime: `${renderTime}ms`,
        });
      }, 0);
    });
  }
};

// ============================================
// Lazy Loading Enhancement
// ============================================

/**
 * Lazy load card content for better performance
 */
const initLazyLoading = () => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    document.querySelectorAll(".library-card").forEach((card) => {
      observer.observe(card);
    });
  }
};

// ============================================
// Keyboard Navigation
// ============================================

/**
 * Enhance keyboard navigation
 */
const initKeyboardNav = () => {
  const paymentLinks = document.querySelectorAll(".payment-link");

  paymentLinks.forEach((link, index) => {
    link.addEventListener("keydown", function (e) {
      // Enter or Space to open link
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }

      // Arrow keys to navigate between links
      if (e.key === "ArrowDown" && paymentLinks[index + 1]) {
        e.preventDefault();
        paymentLinks[index + 1].focus();
      }

      if (e.key === "ArrowUp" && paymentLinks[index - 1]) {
        e.preventDefault();
        paymentLinks[index - 1].focus();
      }
    });
  });
};

// ============================================
// Initialization
// ============================================

/**
 * Detect if page is loaded in iframe (for GoHighLevel)
 */
const detectIframe = () => {
  if (window.self !== window.top) {
    document.body.classList.add("iframe-mode");
    console.log("✓ Iframe mode detected");
  }
};

/**
 * Initialize all features when DOM is ready
 */
const init = () => {
  // Check if in iframe
  detectIframe();

  // Core functionality
  initCopyButtons();
  trackLinkClicks();
  initSmoothScroll();
  initKeyboardNav();

  // Visual enhancements
  animateCards();
  initCardParallax();
  initLazyLoading();

  // Performance monitoring
  logPerformanceMetrics();

  // Scroll event with debounce for performance
  const debouncedScroll = debounce(animateCards, 100);
  window.addEventListener("scroll", debouncedScroll, { passive: true });

  console.log("✓ Solutions Library initialized");
};

// ============================================
// Start the application
// ============================================

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ============================================
// Error Handling
// ============================================

window.addEventListener("error", (e) => {
  console.error("Application error:", e.message);
});

// ============================================
// Export for testing (if needed)
// ============================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    debounce,
    isInViewport,
    animateCards,
  };
}
