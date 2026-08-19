const { units } = window.GRAND_CARIBBEAN;
const grid = document.querySelector('#unit-grid');
const search = document.querySelector('#search');
const form = document.querySelector('#search-form');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const filters = [...document.querySelectorAll('[data-floor]')];
let activeFloor = 'all';

function detailText(unit) {
  const facts = [];
  if (unit.bedrooms) facts.push(`${unit.bedrooms} bed${unit.bedrooms === 1 ? '' : 's'}`);
  if (unit.baths) facts.push(`${unit.baths} bath${unit.baths === 1 ? '' : 's'}`);
  if (unit.guests) facts.push(`sleeps ${unit.guests}`);
  return facts.length ? facts.join(' · ') : `Floor ${unit.floor} · details pending`;
}

function card(unit) {
  const article = document.createElement('article');
  article.className = 'unit-card';
  article.innerHTML = `
    <div class="unit-card__top">
      <span class="floor-badge">Floor ${unit.floor}</span>
      ${unit.verified ? '<span class="verified">Listing found</span>' : '<span class="pending">Researching</span>'}
    </div>
    <h3><a href="condos/${unit.id}/">Unit ${unit.id}</a></h3>
    <p class="unit-title">${unit.title}</p>
    <p class="unit-meta">${detailText(unit)}</p>
    <a class="card-link" href="condos/${unit.id}/">View condo <span aria-hidden="true">→</span></a>
  `;
  return article;
}

function render() {
  const q = search.value.trim().toLowerCase();
  const matches = units.filter((unit) => {
    const floorMatches = activeFloor === 'all' || String(unit.floor) === activeFloor;
    const queryMatches = !q || `${unit.id} ${unit.title}`.toLowerCase().includes(q);
    return floorMatches && queryMatches;
  });

  grid.replaceChildren(...matches.map(card));
  count.textContent = `${matches.length} condo${matches.length === 1 ? '' : 's'} shown`;
  empty.hidden = matches.length !== 0;
}

search.addEventListener('input', render);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  render();
  document.querySelector('#condos').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    activeFloor = button.dataset.floor;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    render();
  });
});

document.querySelectorAll('[data-query]').forEach((button) => {
  button.addEventListener('click', () => {
    search.value = button.dataset.query;
    activeFloor = 'all';
    filters.forEach((item) => item.classList.toggle('is-active', item.dataset.floor === 'all'));
    render();
  });
});

render();
