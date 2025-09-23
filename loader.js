// Section loader and smooth scrolling
const sections = [
  "navbar",
  "about",
  "main",
  "skills",
  "projects",
  "experience",
  "contact",
];

const loadPromises = sections.map((section) => {
  return fetch(`sections/${section}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(section).innerHTML = html;
    });
});

Promise.all(loadPromises).then(() => {
  setupSmoothScrolling();
  renderSkillBadges();
  renderProjectCards();
});

function setupSmoothScrolling() {
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight + 70;
  const navLinks = [
    ...document.querySelectorAll(".nav-link"),
    ...document.querySelectorAll(".cta-btn"),
  ];
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  function updateNavbarGlass() {
    if (window.scrollY > 10) {
      navbar.classList.add("glass");
    } else {
      navbar.classList.remove("glass");
    }
  }
  window.addEventListener("scroll", updateNavbarGlass);
  updateNavbarGlass();
});
