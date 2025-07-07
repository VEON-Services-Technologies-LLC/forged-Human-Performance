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
