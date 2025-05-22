// Navigation Architecte - JavaScript

// Configuration du menu avec pages associées
const menuConfig = [
  { 
      icon: 'home', 
      title: 'Accueil', 
      description: 'Découvrez notre vision architecturale et nos valeurs créatives',
      page: 'index.html' 
  },
  { 
      icon: 'users', 
      title: 'Qui sommes-nous', 
      description: 'Rencontrez notre équipe d\'architectes passionnés et expérimentés',
      page: 'qui-sommes-nous.html' 
  },
  { 
      icon: 'briefcase', 
      title: 'Nos prestations', 
      description: 'Services complets d\'architecture et de conception sur mesure',
      page: 'prestations.html' 
  },
  { 
      icon: 'image', 
      title: 'Nos réalisations', 
      description: 'Portfolio de nos projets architecturaux les plus remarquables',
      page: 'realisations.html' 
  },
  { 
      icon: 'dollar', 
      title: 'Grille tarifaire', 
      description: 'Transparence totale sur nos honoraires et modalités',
      page: 'tarifs.html' 
  },
  { 
      icon: 'mail', 
      title: 'Contact', 
      description: 'Échangeons sur votre projet architectural de rêve',
      page: 'contact.html' 
  },
  { 
      icon: 'layers', // Utilisation d'une icône appropriée
      title: 'Conception à la réalisation', 
      description: 'Accompagnement complet de la conception à la réalisation de votre projet',
      page: 'conception.html' 
  }
];

// Fonction pour obtenir le SVG de l'icône
function getIconSVG(iconName) {
  const icons = {
      home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
      image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
      dollar: '<path d="M12 2v20m8-10a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"/><path d="M9.5 8.5c.5-.5 1.5-.5 2.5 0s1 1 1 1.5-1 1-1 1.5-1.5.5-2.5 0"/><path d="M12 17v1m0-18v1"/>',
      mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
      layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
  };
  return icons[iconName] || '';
}

// Initialisation de la navigation
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
      // Créer le bouton menu
      const menuButton = document.createElement('button');
      menuButton.className = 'menu-button';
      menuButton.id = 'menuButton';
      menuButton.innerHTML = `
          <div class="hamburger">
              <span></span>
              <span></span>
              <span></span>
          </div>
      `;

      // Créer l'overlay de navigation
      const navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      navOverlay.id = 'navOverlay';

      // Créer le menu
      let navHTML = `
          <div class="brand-logo">ARCHITECTE</div>
          <div class="nav-container">
              <nav class="nav-menu">
      `;

      menuConfig.forEach(item => {
          navHTML += `
              <a href="${item.page}" class="nav-item" data-page="${item.page}">
                  <svg class="nav-item-icon" viewBox="0 0 24 24">
                      ${getIconSVG(item.icon)}
                  </svg>
                  <div class="nav-item-title">${item.title}</div>
                  <div class="nav-item-description">${item.description}</div>
              </a>
          `;
      });

      navHTML += `
              </nav>
          </div>
      `;

      navOverlay.innerHTML = navHTML;

      // Ajouter au DOM
      document.body.appendChild(menuButton);
      document.body.appendChild(navOverlay);
  }

  bindEvents() {
      const menuButton = document.getElementById('menuButton');
      const navOverlay = document.getElementById('navOverlay');
      const navItems = document.querySelectorAll('.nav-item');

      // Toggle menu
      menuButton.addEventListener('click', () => this.toggleMenu());

      // Fermer en cliquant sur l'overlay
      navOverlay.addEventListener('click', (e) => {
          if (e.target === navOverlay) {
              this.toggleMenu();
          }
      });

      // Fermer avec Escape
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.isMenuOpen) {
              this.toggleMenu();
          }
      });

      // Gestion des clics sur les liens
      navItems.forEach(item => {
          item.addEventListener('click', (e) => {
              e.preventDefault();
              this.navigateToPage(item);
          });
      });
  }

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      
      const menuButton = document.getElementById('menuButton');
      const navOverlay = document.getElementById('navOverlay');
      const navItems = document.querySelectorAll('.nav-item');

      menuButton.classList.toggle('active');
      navOverlay.classList.toggle('active');

      if (this.isMenuOpen) {
          // Animer l'entrée des éléments
          setTimeout(() => {
              navItems.forEach((item, index) => {
                  setTimeout(() => {
                      item.classList.add('animate');
                  }, index * 100);
              });
          }, 200);
      } else {
          // Réinitialiser les animations
          navItems.forEach(item => {
              item.classList.remove('animate');
          });
      }
  }

  navigateToPage(item) {
      // Animation de sortie
      item.style.transform = 'scale(0.95)';
      item.style.opacity = '0.7';
      
      setTimeout(() => {
          // Navigation réelle
          window.location.href = item.dataset.page;
      }, 150);
  }

  startParticleAnimation() {
      // Ajouter les keyframes pour l'animation des particules
      if (!document.getElementById('particle-animation')) {
          const style = document.createElement('style');
          style.id = 'particle-animation';
          style.textContent = `
              @keyframes floatUp {
                  to {
                      transform: translateY(-${window.innerHeight + 100}px);
                      opacity: 0;
                  }
              }
          `;
          document.head.appendChild(style);
      }

      // Créer des particules périodiquement
      setInterval(() => this.createParticle(), 2000);
  }

  createParticle() {
      const particle = document.createElement('div');
      particle.style.cssText = `
          position: fixed;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          left: ${Math.random() * window.innerWidth}px;
          top: ${window.innerHeight + 10}px;
          animation: floatUp ${3 + Math.random() * 4}s linear forwards;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
          if (particle.parentNode) {
              particle.remove();
          }
      }, 7000);
  }
}

// Initialiser la navigation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new ArchitectNavigation();
});

// Export pour utilisation modulaire (optionnel)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArchitectNavigation;
}

// Animation du logo
function animateLogo() {
  const logo = document.getElementById('animated-logo');
  if (!logo) return;

  function updatePosition() {
    const x = Math.sin(Date.now() / 1000) * 10;
    const y = Math.cos(Date.now() / 1000) * 10;
    logo.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(updatePosition);
  }

  updatePosition();
}

// Gestion de la bannière de cookies
function acceptCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
}

// Vérification si l'utilisateur a déjà accepté les cookies
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookie-banner').style.display = 'none';
  }
});

// Lancer l'animation du logo une fois le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
  animateLogo();
});
