// Helper to load sections into the main page
const sections = [
  "navbar",
  "main",
  "skills",
  "projects",
  "experience",
  "contact",
];

// Load all sections
const loadPromises = sections.map((section) => {
  return fetch(`sections/${section}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(section).innerHTML = html;
    });
});

// Wait for all sections to load, then set up smooth scrolling
Promise.all(loadPromises).then(() => {
  setupSmoothScrolling();
});

function setupSmoothScrolling() {
  // Get navbar height for offset calculation
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight + 40; // Add some extra padding

  // Add click event listeners to all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute("href").substring(1); // Remove #
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate target position with navbar offset
        const targetPosition = targetElement.offsetTop - navbarHeight;

        // Smooth scroll to target position
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}
