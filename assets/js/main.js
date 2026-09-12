const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}


// Replace the old footer lockup with the clean, complete brand logo.
document.querySelectorAll('.footer-brand').forEach((oldBrand) => {
  const link = document.createElement('a');
  link.className = 'footer-brand-logo';
  link.href = 'index.html';
  link.setAttribute('aria-label', 'Les Esprits Pluriels, accueil');

  const logo = document.createElement('img');
  logo.src = 'assets/img/logo-footer.jpg';
  logo.alt = 'Les Esprits Pluriels — Comprendre · Accueillir · Avancer ensemble';

  link.appendChild(logo);
  oldBrand.replaceWith(link);
});
