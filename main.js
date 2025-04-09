// Configuration du menu avec pages associées
const menuItems = [
  { icon: 'home', text: 'Accueil', angle: 0, page: 'index.html' },
  { icon: 'users', text: 'Qui sommes nous', angle: 60, page: 'qui-sommes-nous.html' },
  { icon: 'briefcase', text: 'Nos prestations', angle: 120, page: 'prestations.html' },
  { icon: 'image', text: 'Nos réalisations', angle: 180, page: 'realisations.html' },
  { icon: 'piggy-bank', text: 'Grille tarifs', angle: 240, page: 'tarifs.html' },
  { icon: 'mail', text: 'Contact', angle: 300, page: 'contact.html' },
];

// Création des éléments du menu circulaire
const menuItemsContainer = document.querySelector('.menu-items');
menuItems.forEach(({ icon, text, angle, page }, index) => {
  const radius = 200;
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius + 250;
  const y = Math.sin(radian) * radius + 250;

  const button = document.createElement('button');
  button.className = 'menu-item';
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  button.classList.add('menu-item-hidden');
  button.dataset.index = index;

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
         viewBox="0 0 24 24" fill="none" stroke="currentColor" 
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${getIconPath(icon)}
    </svg>
    <span>${text}</span>
  `;

  // Redirection vers la bonne page au clic
  button.addEventListener('click', () => {
    window.location.href = page;
  });

  menuItemsContainer.appendChild(button);
});

// Fonction pour obtenir le chemin SVG de l'icône
function getIconPath(icon) {
  const icons = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    'piggy-bank': '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  };
  return icons[icon] || '';
}

// Gestion de l'ouverture/fermeture du menu avec animation
function toggleMenu() {
  const menu = document.getElementById('circular-menu');
  const menuItems = document.querySelectorAll('.menu-item');

  if (menu.classList.contains('hidden')) {
    // Ouverture du menu
    menu.classList.remove('hidden');
    menu.classList.add('fade-in');

    menuItems.forEach(item => {
      item.classList.add('menu-item-hidden');
      setTimeout(() => {
        item.classList.remove('menu-item-hidden');
        item.classList.add('menu-item-visible');
      }, 100 * parseInt(item.dataset.index));
    });
  } else {
    // Fermeture du menu
    menuItems.forEach(item => {
      item.classList.remove('menu-item-visible');
      item.classList.add('menu-item-hidden');
    });

    setTimeout(() => {
      menu.classList.add('hidden');
      menu.classList.remove('fade-in');
      menuItems.forEach(item => {
        item.classList.remove('menu-item-hidden');
      });
    }, 500);
  }
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

// Lancer l'animation du logo une fois le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
  animateLogo();
});
