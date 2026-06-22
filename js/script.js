document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('themeToggle');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  metaThemeColor.content = theme === 'light' ? '#ffffff' : '#0f172a';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
themeToggle.setAttribute('aria-label', initialTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

const skills = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Git', icon: '📦' },
  { name: 'Figma', icon: '✏️' },
  { name: 'TypeScript', icon: '📘' },
];

const projects = [
  {
    title: 'Project One',
    description: 'A full-stack web application with real-time features and a polished user interface.',
    url: '#',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Project Two',
    description: 'An e-commerce platform with secure checkout, inventory management, and analytics.',
    url: '#',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    title: 'Project Three',
    description: 'A developer tool that automates workflows and integrates with popular CI/CD pipelines.',
    url: '#',
    tags: ['TypeScript', 'Docker', 'API'],
  },
];

const skillsGrid = document.getElementById('skillsGrid');
skills.forEach((skill) => {
  const item = document.createElement('div');
  item.className = 'skill-item';
  item.innerHTML = `
    <span class="skill-icon" aria-hidden="true">${skill.icon}</span>
    <span class="skill-name">${skill.name}</span>
  `;
  skillsGrid.appendChild(item);
});

const grid = document.getElementById('projectGrid');
projects.forEach((project) => {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  const tagsHtml = project.tags
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join('');
  card.innerHTML = `
    <div class="project-card-header">
      <div class="project-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
      </div>
    </div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">${tagsHtml}</div>
    <a href="${project.url}" class="project-link">
      View Project
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  `;
  grid.appendChild(card);
});

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Dynamic card hover glow effect (Mouse tracking)
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.project-card, .skill-item, .visual-card');
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
