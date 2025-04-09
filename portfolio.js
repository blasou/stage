// Gestion des filtres du portfolio
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Mise à jour des boutons actifs
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        // Filtrage des projets
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.opacity = '1';
            }, 100);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });