// Font loading detection
function loadFonts() {
  // Create test elements
  const testElements = {
    avenir: document.createElement("span"),
    newake: document.createElement("span"),
  };

  testElements.avenir.style.fontFamily = "Avenir";
  testElements.avenir.style.fontWeight = "300";
  testElements.avenir.style.visibility = "hidden";
  testElements.avenir.textContent = "A";

  testElements.newake.style.fontFamily = "Newake";
  testElements.newake.style.visibility = "hidden";
  testElements.newake.textContent = "N";

  document.body.appendChild(testElements.avenir);
  document.body.appendChild(testElements.newake);

  // Check periodically
  const checkInterval = setInterval(() => {
    const avenirLoaded =
      testElements.avenir.offsetWidth !== testElements.newake.offsetWidth;
    const newakeLoaded =
      testElements.newake.offsetWidth !== testElements.avenir.offsetWidth;

    if (avenirLoaded && newakeLoaded) {
      clearInterval(checkInterval);
      document.documentElement.classList.add("fonts-loaded");
      console.log("Custom fonts loaded successfully");
    }
  }, 100);

  // Fallback timeout
  setTimeout(() => {
    clearInterval(checkInterval);
    console.log("Font loading check timeout reached");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", loadFonts);

// Sticky navbar with scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("navOptions");

hamburger.addEventListener("click", function () {
  navOptions.classList.toggle("active");
  hamburger.innerHTML = navOptions.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navOptions.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// divider

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("testimonialsTrack");
  const dotsContainer = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = document.querySelectorAll(".testimonial-card");

  // Clone cards for infinite loop
  const cloneCards = () => {
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  };
  cloneCards();

  let currentIndex = 0;
  let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
  const cardCount = cards.length;
  let dotCount = Math.ceil(cardCount / cardsPerView);

  // Create dots
  const createDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };
  createDots();

  // Update slider position
  function updateSlider() {
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardMargin =
      parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
    const cardWidth = cards[0].offsetWidth + cardMargin;

    // Handle infinite loop
    if (currentIndex >= cardCount) {
      currentIndex = 0;
      track.style.transition = "none";
      track.style.transform = `translateX(0)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
        updateSlider();
      }, 10);
      return;
    }
    if (currentIndex < 0) {
      currentIndex = cardCount - 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${cardCount * cardWidth}px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.5s ease";
        updateSlider();
      }, 10);
      return;
    }

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    document.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex % dotCount);
    });
  }

  function goToSlide(index) {
    currentIndex = index * cardsPerView;
    updateSlider();
  }

  // Navigation
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
  });

  // Handle resize
  window.addEventListener("resize", () => {
    const newCardsPerView = window.innerWidth <= 768 ? 1 : 2;
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      dotCount = Math.ceil(cardCount / cardsPerView);
      createDots();
      updateSlider();
    }
  });

  // Initialize
  updateSlider();

  // Auto-advance (optional)
  let autoSlide = setInterval(() => {
    currentIndex++;
    updateSlider();
  }, 5000);

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex++;
      updateSlider();
    }, 5000);
  });
});

// Expandable feature items
document.addEventListener("DOMContentLoaded", function () {
  const featureItems = document.querySelectorAll(".expandable-item");

  featureItems.forEach((item) => {
    const header = item.querySelector(".feature-header");

    header.addEventListener("click", function () {
      // Close all other items at the same level
      if (item.parentElement.classList.contains("product-features")) {
        const siblings = Array.from(item.parentElement.children);
        siblings.forEach((sibling) => {
          if (sibling !== item) {
            sibling.classList.remove("active");
          }
        });
      }

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});

// FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // First close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Then toggle current item
      item.classList.toggle("active");
    });
  });
});

// Lead Magnet Popup Functionality - Updated
document.addEventListener("DOMContentLoaded", function () {
  const blueprintCTA = document.getElementById("blueprint-cta");
  const popupContainer = document.getElementById("form-popup-container");
  const overlay = document.querySelector(".form-popup-overlay");
  const closeBtn = document.querySelector(".close-popup-btn");
  const formIframe = document.getElementById("lead-magnet-iframe");

  function adjustPopupContent() {
    if (formIframe && popupContainer.style.display === "block") {
      // Adjust iframe height based on content
      const wrapper = document.querySelector(".form-popup-wrapper");
      const maxHeight = window.innerHeight * 0.9 - 60; // 60px for padding and close button
      const idealHeight = 450; // Adjust this to match your form's ideal height

      formIframe.style.height = `${Math.min(idealHeight, maxHeight)}px`;
      wrapper.style.maxHeight = `${maxHeight + 40}px`;
    }
  }

  if (blueprintCTA) {
    blueprintCTA.addEventListener("click", function (e) {
      e.preventDefault();
      popupContainer.style.display = "block";
      document.body.style.overflow = "hidden";
      document.body.classList.add("no-scroll");

      // Reset iframe src to ensure fresh load
      formIframe.src = formIframe.src;

      // Adjust dimensions after short delay to allow iframe to load
      setTimeout(adjustPopupContent, 100);
    });
  }

  function closePopup() {
    popupContainer.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("no-scroll");
  }

  if (overlay) overlay.addEventListener("click", closePopup);
  if (closeBtn) closeBtn.addEventListener("click", closePopup);

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popupContainer.style.display === "block") {
      closePopup();
    }
  });

  // Adjust on window resize
  window.addEventListener("resize", function () {
    if (popupContainer.style.display === "block") {
      adjustPopupContent();
    }
  });
});

// 60-Min Session Popup Functionality
/* document.addEventListener("DOMContentLoaded", function () {
  const sessionCta = document.querySelector(
    ".service-card:nth-child(2) .service-card-cta"
  );
  const sessionPopup = document.getElementById("session-popup-container");
  const sessionOverlay = document.querySelector(".session-popup-overlay");
  const closeSessionBtn = document.querySelector(".close-session-popup-btn");
  const sessionIframe = document.getElementById("session-availability-iframe");

  function adjustIframeHeight() {
    if (sessionIframe) {
      // Adjust height based on content (you may need to adjust this based on your form)
      const formHeight = 420; // Approximate height of your form
      const windowHeight = window.innerHeight;
      const maxHeight = Math.min(formHeight, windowHeight * 0.8 - 40); // 40px for padding

      sessionIframe.style.height = `${maxHeight}px`;
    }
  }

  if (sessionCta) {
    sessionCta.addEventListener("click", function (e) {
      e.preventDefault();
      sessionPopup.style.display = "block";
      document.body.style.overflow = "hidden";
      document.body.classList.add("no-scroll");
      adjustIframeHeight();

      // Reset iframe src to ensure fresh load
      sessionIframe.src = sessionIframe.src;
    });
  }

  function closeSessionPopup() {
    sessionPopup.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("no-scroll");
  }

  if (sessionOverlay)
    sessionOverlay.addEventListener("click", closeSessionPopup);
  if (closeSessionBtn)
    closeSessionBtn.addEventListener("click", closeSessionPopup);

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sessionPopup.style.display === "block") {
      closeSessionPopup();
    }
  });

  // Adjust on window resize
  window.addEventListener("resize", function () {
    if (sessionPopup.style.display === "block") {
      adjustIframeHeight();
    }
  });
}); */
