const SKILLS = [
  { key: "html5", title: "HTML5", years: 5, percent: 95,
    details: "HTML semântico, acessibilidade (ARIA), SEO e microdata.",
    techs: ["Semântica","A11y","Forms","SEO","Microdata"] },
  { key: "css3", title: "CSS3", years: 5, percent: 92,
    details: "Layouts responsivos (Flexbox, Grid), animações e metodologias BEM.",
    techs: ["Flexbox","Grid","BEM","SCSS","Animações"] },
  { key: "javascript", title: "JavaScript", years: 5, percent: 93,
    details: "ES6+, DOM, APIs REST, assíncrono e testes unitários.",
    techs: ["ES6+","Async/Await","Fetch","Design Patterns","Jest"] },
  { key: "react", title: "React.js", years: 3, percent: 85,
    details: "Hooks, Context API, roteamento e otimização de performance.",
    techs: ["Hooks","Context","Redux","Router","Testing Library"] },
];

document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.getElementById("skills");
  const contactSection = document.getElementById("contactSection");
  const contactBtn = document.getElementById("contactBtn");

  SKILLS.forEach(skill => skillsContainer.appendChild(createSkillCard(skill)));

  const observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      animateProgress(skillsContainer);
      observer.disconnect();
    }
  }, { threshold: 0.15 });
  observer.observe(skillsContainer);

  // Contato
  contactBtn.onclick = () => {
    contactSection.classList.toggle("hidden");
    contactSection.scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector(".closeContact").onclick = () => contactSection.classList.add("hidden");

  document.getElementById("toSkills").onclick = () =>
    document.getElementById("skills").scrollIntoView({ behavior: "smooth" });

  setupTheme();
});

function createSkillCard(skill) {
  const el = document.createElement("article");
  el.className = "skill";
  el.innerHTML = `
    <header>
      <h3>${skill.title}</h3>
      <div class="years">${skill.years} anos de experiência</div>
    </header>
    <div class="progressWrap"><div class="progress"></div></div>
    <div class="details">
      <p>${skill.details}</p>
      <div class="techList">${skill.techs.map(t => `<span class="tech">${t}</span>`).join("")}</div>
    </div>
    <button class="toggleDetail">Ver detalhes</button>
  `;
  const btn = el.querySelector(".toggleDetail");
  const details = el.querySelector(".details");
  btn.onclick = () => {
    const isOpen = details.classList.toggle("open");
    btn.textContent = isOpen ? "Ocultar detalhes" : "Ver detalhes";
  };
  return el;
}

function animateProgress(container) {
  container.querySelectorAll(".skill").forEach((el, i) => {
    const bar = el.querySelector(".progress");
    const { percent } = SKILLS[i];
    let current = 0;
    const animate = () => {
      current += (percent - current) * 0.1;
      bar.style.width = `${current.toFixed(1)}%`;
      if (current < percent - 0.5) requestAnimationFrame(animate);
    };
    setTimeout(() => requestAnimationFrame(animate), i * 150);
  });
}

function setupTheme() {
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme") || "auto";
  applyTheme(saved);
  btn.textContent = `Tema: ${saved}`;
  btn.onclick = () => {
    const current = localStorage.getItem("theme") || "auto";
    const next = current === "light" ? "dark" : current === "dark" ? "auto" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
    btn.textContent = `Tema: ${next}`;
  };
}

function applyTheme(mode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("theme-dark", mode === "dark" || (mode === "auto" && prefersDark));
}
