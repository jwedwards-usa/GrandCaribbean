(() => {
  const grid = document.getElementById('condo-grid');
  const search = document.getElementById('search');
  const floorFilter = document.getElementById('floor-filter');
  const occupancyFilter = document.getElementById('occupancy-filter');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const publicListings = {
    '1006': {label:'Silver Sands listing', url:'https://silversandsvacationrentals.com/property/b3fdd981-e48f-4320-b53f-c4c55b2d070e'},
    '1007': {label:'Port A Escapes listing', url:'https://www.portaescapes.com/rentals/grand-caribbean-gc1007'},
    '1008': {label:'Port A Escapes listing', url:'https://www.portaescapes.com/rentals/grand-caribbean-gc1008'},
    '1009': {label:'Port A Escapes listing', url:'https://www.portaescapes.com/rentals/a-change-in-latitude-gc1009'},
    '1010': {label:'Port A Escapes listing', url:'https://www.portaescapes.com/rentals/grand-caribbean-gc1010'}
  };

  function renderCard(c) {
    const badge = c.verified
      ? '<span class="badge">Photo-verified details</span>'
      : c.observed
        ? '<span class="badge unknown">Unit observed</span>'
        : '<span class="badge unknown">Details needed</span>';
    const occ = c.occupancy ? `${c.occupancy} guests` : 'Unknown';
    const permit = c.permit ? `${esc(c.permitLabel)} ${esc(c.permit)}` : 'Not captured';
    const contact = c.contact
      ? `<p class="card-contact"><strong>Rental/contact:</strong> ${esc(c.contact)}${c.phone ? ` · <a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>` : ''}</p>`
      : '<p class="card-contact">Rental contact has not yet been captured from the property.</p>';
    const name = c.name ? `<p class="card-contact"><strong>${esc(c.name)}</strong></p>` : '';
    const publicListing = publicListings[c.unit];
    const listingButton = publicListing
      ? `<a class="button primary" href="${esc(publicListing.url)}" target="_blank" rel="noopener">${esc(publicListing.label)}</a>`
      : c.bookingUrl
        ? `<a class="button primary" href="${esc(c.bookingUrl)}" target="_blank" rel="noopener">Direct listing</a>`
        : '';
    return `<article class="condo-card">
      <div class="card-top"><div><span class="meta-label">Unit</span><div class="unit-number">${esc(c.unit)}</div></div>${badge}</div>
      ${name}
      <div class="card-meta">
        <div class="meta-box"><span class="meta-label">Floor</span><span class="meta-value">${c.floor}</span></div>
        <div class="meta-box"><span class="meta-label">Max occupancy</span><span class="meta-value">${occ}</span></div>
        <div class="meta-box" style="grid-column:1/-1"><span class="meta-label">Registration</span><span class="meta-value">${permit}</span></div>
      </div>
      ${contact}
      <div class="card-actions">
        <a class="button secondary" href="condos/${encodeURIComponent(c.unit)}.html">View unit</a>
        ${listingButton}
      </div>
    </article>`;
  }

  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    const floor = floorFilter.value;
    const occupancy = occupancyFilter.value;
    const matches = window.CONDOS.filter(c => {
      const listing = publicListings[c.unit];
      const haystack = [c.unit,c.name,c.floor,c.occupancy,c.permit,c.contact,c.phone,c.operator,c.notes,listing?.label].filter(Boolean).join(' ').toLowerCase();
      return (!q || haystack.includes(q))
        && (!floor || String(c.floor) === floor)
        && (!occupancy || String(c.occupancy) === occupancy);
    });
    grid.innerHTML = matches.map(renderCard).join('');
    count.textContent = `${matches.length} ${matches.length === 1 ? 'unit' : 'units'}`;
    empty.hidden = matches.length !== 0;
  }

  [search,floorFilter,occupancyFilter].forEach(el => el.addEventListener('input', applyFilters));
  applyFilters();
})();
