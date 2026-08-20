(() => {
  const { units, managers } = window.GC_DATA;
  const byId = Object.fromEntries(units.map(u => [u.id, u]));

  function floorLabel(n) {
    return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} Floor`;
  }

  function contactText(u) {
    return (u.contacts || []).map(id => managers[id]?.name || id).join(' · ');
  }

  function detailCount() {
    return units.filter(u => u.str || u.maxOccupancy || (u.contacts && u.contacts.length)).length;
  }

  function observedCount() {
    return units.filter(u => u.observed).length;
  }

  function managerMarkup(id) {
    const m = managers[id];
    if (!m) return '';
    const phoneHref = `tel:+1${m.phone.replace(/\D/g,'')}`;
    return `
      <div class="contact">
        <strong>${m.name}</strong>
        <div>${m.phone}</div>
        <div class="contact-actions">
          <a class="btn btn-primary" href="${phoneHref}">Call</a>
          ${m.website ? `<a class="btn btn-secondary" href="${m.website}" target="_blank" rel="noopener">Website</a>` : ''}
        </div>
      </div>`;
  }

  function cardMarkup(u) {
    const href = `units/${u.id}.html`;
    const manager = contactText(u) || 'Rental contact not captured';
    return `
      <a class="unit-card" href="${href}" data-search="${[
        u.id, u.name || '', u.str || '', manager, u.maxOccupancy || ''
      ].join(' ').toLowerCase()}">
        <div class="unit-top">
          <div class="unit-number">Unit ${u.id}</div>
          ${u.str ? '<span class="verified">Placard details</span>' :
                   u.observed ? '<span class="verified unknown">Door seen</span>' :
                                '<span class="verified unknown">Need details</span>'}
        </div>
        <div class="unit-name">${u.name || '&nbsp;'}</div>
        <div class="unit-meta">
          <div><strong>Max:</strong> ${u.maxOccupancy ? `${u.maxOccupancy} guests` : 'Not captured'}</div>
          <div><strong>STR:</strong> ${u.str || 'Not captured'}</div>
          <div><strong>Contact:</strong> ${manager}</div>
        </div>
        <div class="card-arrow">View condo details →</div>
      </a>`;
  }

  function renderHome() {
    document.title = 'Grand Caribbean Condo Guide | Port Aransas';
    document.body.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html"><span class="brand-mark">☀</span><span>Grand Caribbean Guide</span></a>
          <nav class="nav-links" aria-label="Primary">
            <a href="#units">Condos</a>
            <a href="#views">Views</a>
            <a href="#about">About the data</a>
          </nav>
        </div>
      </header>
      <main>
        <section class="hero">
          <div class="hero-inner">
            <div class="hero-copy">
              <div class="eyebrow">Port Aransas, Texas · Unofficial condo directory</div>
              <h1>Find the right Grand Caribbean condo.</h1>
              <p>Browse every unit by floor, occupancy, STR number, and photographed rental contact — without loading a heavyweight booking site.</p>
              <form class="search-shell" id="heroSearch">
                <input id="heroSearchInput" aria-label="Search condos" placeholder="Try 3008, Sand Key, 8 guests, or an STR number">
                <button type="submit">Search condos</button>
              </form>
            </div>
          </div>
        </section>

        <section class="section tight">
          <div class="stats">
            <div class="stat"><strong>${units.length}</strong><span>condos indexed across four floors</span></div>
            <div class="stat"><strong>${detailCount()}</strong><span>units with rental placard details transcribed</span></div>
            <div class="stat"><strong>${observedCount()}</strong><span>units confirmed in the August 2026 photo walk</span></div>
          </div>
        </section>

        <section class="section" id="units">
          <div class="section-title">
            <div>
              <div class="eyebrow" style="color:var(--teal)">Condo directory</div>
              <h2>Search all units</h2>
            </div>
            <p>Use the filters below. Unknown fields stay visible so the directory can be filled in over time.</p>
          </div>

          <div class="filter-bar">
            <input id="unitSearch" placeholder="Search unit, manager, STR, phone or condo name" aria-label="Search unit directory">
            <select id="floorFilter" aria-label="Filter by floor">
              <option value="">All floors</option>
              <option value="1">1st floor</option>
              <option value="2">2nd floor</option>
              <option value="3">3rd floor</option>
              <option value="4">4th floor</option>
            </select>
            <select id="occupancyFilter" aria-label="Filter by occupancy">
              <option value="">Any occupancy</option>
              <option value="4">4 guests</option>
              <option value="6">6 guests</option>
              <option value="8">8 guests</option>
            </select>
          </div>
          <div id="directory"></div>
        </section>

        <section class="photo-strip" id="views">
          <div class="section">
            <div class="section-title">
              <div><div class="eyebrow">Photo walk</div><h2>Upper-floor views</h2></div>
              <p style="color:#cfdee3">Optimized WebP images from the August 2026 walk-through; intentionally small for low-bandwidth browsing.</p>
            </div>
            <div class="photo-grid">
              <figure class="photo-card">
                <img src="assets/images/marsh-view.webp" loading="lazy" alt="Marsh and coastal neighborhood view from an upper floor">
                <figcaption>Marsh-facing view from an upper level of the complex.</figcaption>
              </figure>
              <figure class="photo-card">
                <img src="assets/images/neighborhood-view.webp" loading="lazy" alt="Nearby coastal homes and parking area viewed from an upper floor">
                <figcaption>Neighborhood and horizon view from the complex.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section class="section" id="about">
          <div class="about-card">
            <div class="eyebrow" style="color:var(--teal)">About this guide</div>
            <h2>Built from onsite placards, not scraped booking claims.</h2>
            <p>Rental contacts, maximum occupancy, condo names and STR numbers shown here were transcribed from signs photographed at Grand Caribbean on August 19, 2026. Management can change, so treat the contact information as a useful lead and verify it before paying or booking. Units without captured details remain in the directory rather than being guessed.</p>
          </div>
        </section>
      </main>
      <footer class="site-footer">
        <div class="footer-inner"><strong>Grand Caribbean Condo Guide</strong> · Unofficial reference site. Verify rental details with the current owner or manager before booking.</div>
      </footer>`;

    const directory = document.getElementById('directory');
    const search = document.getElementById('unitSearch');
    const floor = document.getElementById('floorFilter');
    const occ = document.getElementById('occupancyFilter');

    function draw() {
      const q = search.value.trim().toLowerCase();
      const floorVal = floor.value;
      const occVal = occ.value;
      const filtered = units.filter(u => {
        const hay = [u.id, u.name || '', u.str || '', contactText(u), ...(u.contacts||[]).map(id => managers[id]?.phone || '')].join(' ').toLowerCase();
        return (!q || hay.includes(q)) &&
          (!floorVal || String(u.floor) === floorVal) &&
          (!occVal || String(u.maxOccupancy || '') === occVal);
      });

      if (!filtered.length) {
        directory.innerHTML = `<div class="empty-state">No condos match those filters. Try a unit number, manager, STR number, or a broader occupancy.</div>`;
        return;
      }

      directory.innerHTML = [1,2,3,4].map(f => {
        const items = filtered.filter(u => u.floor === f);
        if (!items.length) return '';
        return `<div class="floor-block">
          <div class="floor-heading"><span class="floor-badge">${floorLabel(f)}</span><h3>${items.length} unit${items.length === 1 ? '' : 's'}</h3></div>
          <div class="unit-grid">${items.map(cardMarkup).join('')}</div>
        </div>`;
      }).join('');
    }

    [search, floor, occ].forEach(el => el.addEventListener('input', draw));
    draw();

    document.getElementById('heroSearch').addEventListener('submit', e => {
      e.preventDefault();
      search.value = document.getElementById('heroSearchInput').value;
      draw();
      document.getElementById('units').scrollIntoView({behavior:'smooth'});
      setTimeout(() => search.focus(), 450);
    });
  }

  function renderUnit(unitId) {
    const u = byId[unitId];
    if (!u) {
      document.body.innerHTML = `<main class="section"><h1>Unit not found</h1><p><a href="./">Back to the condo directory</a></p></main>`;
      return;
    }

    const ix = units.findIndex(x => x.id === unitId);
    const prev = units[ix - 1];
    const next = units[ix + 1];
    const managerNames = contactText(u) || 'Rental contact not captured';
    document.title = `Unit ${u.id}${u.name ? ` · ${u.name}` : ''} | Grand Caribbean`;

    document.body.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="./"><span class="brand-mark">☀</span><span>Grand Caribbean Guide</span></a>
          <nav class="nav-links" aria-label="Primary"><a href="./#units">All condos</a><a href="./#about">About the data</a></nav>
        </div>
      </header>
      <main>
        <section class="unit-hero">
          <div class="unit-hero-inner">
            <div class="breadcrumb"><a href="./">Condo directory</a> / ${floorLabel(u.floor)} / Unit ${u.id}</div>
            <div class="unit-kicker">${floorLabel(u.floor)}</div>
            <h1>Unit ${u.id}</h1>
            <div class="unit-subtitle">${u.name ? `${u.name} · ` : ''}${managerNames}</div>
          </div>
        </section>

        <section class="section">
          <div class="detail-layout">
            <div>
              <div class="detail-panel">
                <h2>Condo details</h2>
                <div class="fact-grid">
                  <div class="fact"><div class="label">Maximum occupancy</div><div class="value">${u.maxOccupancy ? `${u.maxOccupancy} guests` : 'Not captured'}</div></div>
                  <div class="fact"><div class="label">STR number</div><div class="value">${u.str || 'Not captured'}</div></div>
                  <div class="fact"><div class="label">Floor</div><div class="value">${floorLabel(u.floor)}</div></div>
                  <div class="fact"><div class="label">Onsite photo status</div><div class="value">${u.str ? 'Placard transcribed' : u.observed ? 'Unit observed' : 'Details needed'}</div></div>
                </div>
                ${u.amenities?.length ? `<h3 style="margin-top:22px">Notes from the placard</h3><ul class="note-list">${u.amenities.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
                ${u.notes?.length ? `<h3 style="margin-top:22px">Verification notes</h3><ul class="note-list">${u.notes.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
                <div class="notice">Placard information was photographed August 19, 2026. Rental managers and rules can change; verify current details before booking or sending payment.</div>
              </div>

              <div class="sibling-nav">
                <span>${prev ? `<a href="units/${prev.id}.html">← Unit ${prev.id}</a>` : ''}</span>
                <span>${next ? `<a href="units/${next.id}.html">Unit ${next.id} →</a>` : ''}</span>
              </div>
            </div>

            <aside class="detail-panel">
              <h2>Rental references</h2>
              ${u.contacts?.length ? `<div class="contact-list">${u.contacts.map(managerMarkup).join('')}</div>` : `<p class="source-note">No rental-contact placard was captured for this unit yet.</p>`}
              ${u.listing ? `<div style="margin-top:12px"><a class="btn btn-secondary" href="${u.listing}" target="_blank" rel="noopener">${u.listingLabel || 'Open listing'}</a></div>` : ''}
              <p class="source-note" style="margin-top:16px">These contacts are included as leads from onsite signage, not as endorsements.</p>
            </aside>
          </div>
        </section>
      </main>
      <footer class="site-footer"><div class="footer-inner"><strong>Grand Caribbean Condo Guide</strong> · <a href="./#units">Browse all condos</a></div></footer>`;
  }

  const unitId = document.body.dataset.unit || new URLSearchParams(window.location.search).get('unit');
  if (unitId) {
    renderUnit(unitId);
  } else {
    renderHome();
  }
})();
