const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}


// Filtres de l'annuaire
(() => {
  const country = document.querySelector('#filter-country');
  const need = document.querySelector('#filter-need');
  const door = document.querySelector('#filter-door');
  const reset = document.querySelector('#directory-reset');
  const counter = document.querySelector('#directory-count');
  if (!country || !need) return;
  const cards = [...document.querySelectorAll('.resource-card[data-country]')];
  const sections = [...document.querySelectorAll('.directory-country')];
  const params = new URLSearchParams(window.location.search);
  if (params.get('country') && [...country.options].some(o => o.value === params.get('country'))) country.value = params.get('country');
  if (params.get('need') && [...need.options].some(o => o.value === params.get('need'))) need.value = params.get('need');
  if (door && params.get('door') && [...door.options].some(o => o.value === params.get('door'))) door.value = params.get('door');
  const apply = () => {
    let visible = 0;
    cards.forEach(card => {
      const okCountry = !country.value || card.dataset.country === country.value || card.dataset.region === country.value;
      const needs = (card.dataset.need || '').split(/\s+/);
      const doors = (card.dataset.door || '').split(/\s+/);
      const okNeed = !need.value || needs.includes(need.value);
      const okDoor = !door || !door.value || doors.includes(door.value);
      card.hidden = !(okCountry && okNeed && okDoor);
      if (!card.hidden) visible += 1;
    });
    sections.forEach(section => {
      const cardList = [...section.querySelectorAll('.resource-card')];
      if (cardList.length) section.hidden = !cardList.some(card => !card.hidden);
    });
    if (counter) counter.textContent = visible + (visible > 1 ? ' ressources affichées' : ' ressource affichée');
  };
  country.addEventListener('change', apply);
  need.addEventListener('change', apply);
  if (door) door.addEventListener('change', apply);
  if (reset) reset.addEventListener('click', () => { country.value = ''; need.value = ''; if (door) door.value = ''; apply(); });
  apply();
})();
