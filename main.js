// Configuration du menu
const menuConfig = [
  { icon: 'home', title: 'Accueil', page: 'index.html', description: '' },
  { icon: 'users', title: 'Qui sommes-nous', page: 'qui-sommes-nous.html', description: 'Histoire et présentation' },
  { icon: 'briefcase', title: 'Nos prestations', page: 'prestations.html', description: 'Nous pouvons vous proposer' },
  { icon: 'image', title: 'Nos réalisations', page: 'realisations.html', description: 'Quelques projets en AP ou PC' },
  { icon: 'dollar', title: 'Grille tarifaire', page: 'tarifs.html', description: 'Transparence totale sur nos honoraires et modalités' },
  { icon: 'mail', title: 'Contact', page: 'contact.html', description: 'Échangeons sur votre projet architectural de rêve' },
  { icon: 'layers', title: 'Conception à la réalisation', page: 'conception.html', description: 'Accompagnement complet de la conception à la réalisation' }
];

// Icônes SVG
function getIconSVG(icon) {
  const icons = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    dollar: '<path d="M12 2v20m8-10a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"/><path d="M9.5 8.5c.5-.5 1.5-.5 2.5 0s1 1 1 1.5-1 1-1 1.5-1.5.5-2.5 0"/><path d="M12 17v1m0-18v1"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
  };
  return icons[icon] || '';
}

// Classe principale
class ArchitectNavigation {
  constructor() {
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.createNavigation();
    this.bindEvents();
    this.startParticleAnimation();
  }

  createNavigation() {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.id = 'menuButton';
    menuButton.innerHTML = `
      <div class="hamburger">
        <span></span><span></span><span></span>
      </div>
    `;

    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.id = 'navOverlay';

    let navHTML = `
      <div class="brand-logo">A2S PROJECT</div>
      <div class="nav-container"><nav class="nav-menu">
    `;
    menuConfig.forEach(item => {
      navHTML += `
        <a href="${item.page}" class="nav-item" data-page="${item.page}">
          <svg class="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${getIconSVG(item.icon)}</svg>
          <div class="nav-item-title">${item.title}</div>
          <div class="nav-item-description">${item.description}</div>
        </a>
      `;
    });
    navHTML += '</nav></div>';
    navOverlay.innerHTML = navHTML;

    document.body.appendChild(menuButton);
    document.body.appendChild(navOverlay);
  }

  bindEvents() {
    const menuButton = document.getElementById('menuButton');
    const navOverlay = document.getElementById('navOverlay');

    menuButton.addEventListener('click', () => this.toggleMenu());

    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) this.toggleMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) this.toggleMenu();
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        item.style.transform = 'scale(0.95)';
        item.style.opacity = '0.7';
        setTimeout(() => window.location.href = item.dataset.page, 150);
      });
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navOverlay = document.getElementById('navOverlay');
    const menuButton = document.getElementById('menuButton');
    const navItems = document.querySelectorAll('.nav-item');

    menuButton.classList.toggle('active');
    navOverlay.classList.toggle('active');

    if (this.isMenuOpen) {
      setTimeout(() => {
        navItems.forEach((item, i) => {
          setTimeout(() => item.classList.add('animate'), i * 100);
        });
      }, 200);
    } else {
      navItems.forEach(item => item.classList.remove('animate'));
    }
  }

  startParticleAnimation() {
    setInterval(() => this.createParticle(), 2000);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      pointer-events: none;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight}px;
      animation: floatUp ${3 + Math.random() * 4}s linear forwards;
      z-index: 1;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
  }
}

// Animation logo
function animateLogo() {
  const logo = document.getElementById('animated-logo');
  if (!logo) return;
  function loop() {
    const x = Math.sin(Date.now() / 800) * 10;
    const y = Math.cos(Date.now() / 800) * 10;
    logo.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}

// Cookies
function acceptCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  new ArchitectNavigation();
  animateLogo();
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookie-banner').style.display = 'none';
  }
});
