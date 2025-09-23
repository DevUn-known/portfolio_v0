// Project cards rendering logic
function renderProjectCards() {
  if (!projects) {
    setTimeout(renderProjectCards, 100);
    return;
  }
  const container = document.getElementById("projects-cards");
  if (!container) {
    setTimeout(renderProjectCards, 100);
    return;
  }
  let cardsHTML = "";
  projects.forEach((project, i) => {
    const stack = Array.isArray(project.techStack)
      ? project.techStack
          .map((tech) => `<span class='project-tech'>${tech}</span>`)
          .join("")
      : "";
    cardsHTML += `
      <div class="project-card project-card-${i}">
        <div class="project-image-container">
          <img src="${project.image}" alt="${project.name}" class="project-image" />
        </div>
        <div class="project-title">${project.name}</div>
        <div class="project-desc">${project.description}</div>
        <div class="project-stack">${stack}</div>
        <a href="${project.link}" class="project-link" target="_blank">View Project</a>
      </div>
    `;
  });
  container.innerHTML = cardsHTML;
}
