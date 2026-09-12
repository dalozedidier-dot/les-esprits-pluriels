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

// Préférence de densité de lecture
(() => {
  const body = document.body;
  if (!body) return;
  const saved = localStorage.getItem('lep-reading-density') || 'standard';
  body.dataset.density = saved;
  const header = document.querySelector('.site-header');
  if (!header) return;
  const wrap = document.createElement('div');
  wrap.className = 'reading-controls';
  wrap.setAttribute('aria-label', 'Densité de lecture');
  wrap.innerHTML = '<span>Lecture</span><button type="button" data-density-choice="standard">Standard</button><button type="button" data-density-choice="airy">Aérée</button><button type="button" data-density-choice="compact">Compacte</button>';
  header.insertAdjacentElement('afterend', wrap);
  const refresh = () => wrap.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.densityChoice === body.dataset.density ? 'true' : 'false'));
  wrap.addEventListener('click', event => {
    const btn = event.target.closest('button[data-density-choice]');
    if (!btn) return;
    body.dataset.density = btn.dataset.densityChoice;
    localStorage.setItem('lep-reading-density', body.dataset.density);
    refresh();
  });
  refresh();
})();

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
      const okCountry = !country.value || card.dataset.country === country.value;
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
