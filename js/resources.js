// Resources Page Filter Functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-pill");
  const resourceCards = document.querySelectorAll(".resource-card");

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter cards with animation
      resourceCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          // Show card
          card.classList.remove("filtering-out");
          card.classList.remove("hidden");
        } else {
          // Hide card with animation
          card.classList.add("filtering-out");
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });

  // Add smooth scroll animation on page load
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all resource cards for scroll animation
  resourceCards.forEach((card) => {
    observer.observe(card);
  });
});
