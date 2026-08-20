(() => {
  const unit = document.body.dataset.unit || decodeURIComponent(location.pathname.split('/').pop().replace(/\.html$/i, ''));
  const c = window.CONDOS.find(item => item.unit === unit);
  if (!c) {
    document.getElementById('condo-content').innerHTML = '<p>Unit details were not found.</p>';
    return;
  }

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  }[ch]));

  document.title = `Unit ${c.unit} · Grand Caribbean Condo Guide`;
  const status = c.verified
    ? 'Rental and registration details transcribed from posted on-site signage.'
    : 'Unit number observed on-site; some rental details are still missing.';
  const permit = c.permit ? `${esc(c.permitLabel)} ${esc(c.permit)}` : 'Not captured';
  const occupancy = c.occupancy ? `${c.occupancy} guests` : 'Not captured';
  const contact = c.contact || 'Not captured';
  const phone = c.phone ? `<a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>` : 'Not captured';

  let buttons = '';
  if (c.phone) buttons += `<a class="button primary" href="tel:${esc(c.phone)}">Call ${esc(c.phone)}</a>`;
  if (c.bookingUrl) buttons += `<a class="button primary" href="${esc(c.bookingUrl)}" target="_blank" rel="noopener">Open direct listing</a>`;
  if (c.operatorUrl && !c.bookingUrl) buttons += `<a class="button secondary" href="${esc(c.operatorUrl)}" target="_blank" rel="noopener">Visit ${esc(c.operator)}</a>`;

  const floorImage = c.floor >= 3 ? '../assets/marsh-view.webp' : '../assets/yellow-corridor.webp';

  document.getElementById('condo-content').innerHTML = `
    <a class="back-link" href="../index.html#units">← Back to all units</a>
    <section class="detail-hero">
      <div class="detail-title">
        <p class="eyebrow">${c.floor}${c.floor === 1 ? 'st' : c.floor === 2 ? 'nd' : c.floor === 3 ? 'rd' : 'th'} floor</p>
        <h1>Unit ${esc(c.unit)}</h1>
        <p class="detail-status">${status}</p>
      </div>
      <div class="detail-photo">
        <img src="${floorImage}" alt="On-site view of Grand Caribbean" width="800" height="600">
      </div>
    </section>

    <section class="detail-grid" aria-label="Unit details">
      <div class="detail-card"><span class="meta-label">Maximum occupancy</span><span class="meta-value">${occupancy}</span></div>
      <div class="detail-card"><span class="meta-label">Registration</span><span class="meta-value">${permit}</span></div>
      <div class="detail-card"><span class="meta-label">Rental / contact</span><span class="meta-value">${esc(contact)}</span></div>
      <div class="detail-card"><span class="meta-label">Phone</span><span class="meta-value">${phone}</span></div>
    </section>

    <section class="booking-box">
      <div>
        <h2>Booking reference</h2>
        <p>${esc(c.notes)}</p>
      </div>
      <div class="action-row">${buttons || '<span class="badge unknown">No booking contact captured yet</span>'}</div>
    </section>

    <section>
      <p class="eyebrow">Property context</p>
      <h2>Shared on-site views</h2>
      <div class="detail-gallery">
        <img src="../assets/upper-floor-view.webp" alt="Upper-floor exterior view from Grand Caribbean" loading="lazy" width="800" height="600">
        <img src="../assets/yellow-corridor.webp" alt="Yellow open-air corridor at Grand Caribbean" loading="lazy" width="800" height="600">
        <img src="../assets/marsh-view.webp" alt="Coastal landscape view from Grand Caribbean" loading="lazy" width="800" height="600">
      </div>
    </section>

    <p class="source-note"><strong>Source note:</strong> Details marked as photo-verified were read from registration or rental placards photographed at the property in August 2026. This independent guide is not a booking agent. Confirm current occupancy limits, permit numbers, pricing, and management before reserving.</p>
  `;
})();
