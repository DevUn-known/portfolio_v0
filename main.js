// Helper to load sections into the main page
const sections = [
  "navbar",
  "about",
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
  // Trigger skills rendering if function exists
  if (typeof renderSkillBadges === "function") {
    renderSkillBadges();
  }
});

// List of skills to display
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Responsive Design",
  "UI/UX Principles",
  // Add more skills as needed
];

let showAllSkills = false;
const INITIAL_SKILLS_COUNT = 6; // Show only 6 skills initially

function renderSkillBadges() {
  const container = document.getElementById("skills-badges");
  if (!container) {
    setTimeout(renderSkillBadges, 100);
    return;
  }

  const allSkills = Object.keys(skillColors);
  const skillsToShow = showAllSkills
    ? allSkills
    : allSkills.slice(0, INITIAL_SKILLS_COUNT);

  let badgesHTML = "";
  skillsToShow.forEach((skill, i) => {
    const bgColor = skillColors[skill] || "#e5e7eb";
    const isGradient = bgColor.startsWith("linear-gradient");
    const textColor = isGradient
      ? "#fff"
      : bgColor === "#f7df1e"
      ? "#18181b"
      : "#fff";
    const borderColor = isGradient ? "rgba(255,255,255,0.7)" : textColor;
    const boxShadow = isGradient
      ? "0 4px 18px 0 rgba(56,189,248,0.18), 0 2px 12px rgba(0,0,0,0.10)"
      : "0 2px 12px rgba(0,0,0,0.10)";
    badgesHTML += `<span class="skill-badge skill-badge-${i}" style="
      background: ${bgColor};
      color: ${textColor};
      border: 2px solid ${borderColor};
      box-shadow: ${boxShadow};
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: default;
    ">${skill}</span>`;
  });

  // Add show more/less button if there are more skills than the initial count
  if (allSkills.length > INITIAL_SKILLS_COUNT) {
    const buttonText = showAllSkills
      ? "Show Less"
      : `Show More (+${allSkills.length - INITIAL_SKILLS_COUNT})`;
    badgesHTML += `<button id="toggle-skills-btn" class="show-more-btn" onclick="toggleSkills()" style="
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255,255,255,0.7);
      box-shadow: 0 4px 18px 0 rgba(56,189,248,0.18), 0 2px 12px rgba(0,0,0,0.10);
      transition: all 0.3s ease;
      cursor: pointer;
    ">${buttonText}</button>`;
  }

  // Add hover effect via style tag
  badgesHTML += `<style>
    .skill-badge:hover {
      transform: scale(1.12);
      box-shadow: 0 8px 32px 0 rgba(56,189,248,0.28), 0 4px 24px rgba(0,0,0,0.18) !important;
      z-index: 2;
    }
    
    .show-more-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 32px 0 rgba(56,189,248,0.35), 0 4px 24px rgba(0,0,0,0.2) !important;
      background: linear-gradient(135deg, #0ea5e9, #0891b2);
    }
    
    .show-more-btn:active {
      transform: scale(1.02);
    }
  </style>`;
  container.innerHTML = badgesHTML;
}

function toggleSkills() {
  showAllSkills = !showAllSkills;
  renderSkillBadges();
}

// Render badges after all sections are loaded
Promise.all(loadPromises).then(() => {
  renderSkillBadges();
});

function setupSmoothScrolling() {
  // Get navbar height for offset calculation
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight + 70; // Add some extra padding

  // Add click event listeners to all navigation links
  const navLinks = [
    ...document.querySelectorAll(".nav-link"),
    ...document.querySelectorAll(".cta-btn"),
  ];

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

// Toggle glass effect on navbar when scrolled
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
  updateNavbarGlass(); // Initial check
});
