(() => {
  const unit = document.body.dataset.unit || decodeURIComponent(location.pathname.split('/').pop().replace(/\.html$/i,''));
  const c = window.CONDOS.find(item => item.unit === unit);
  const target = document.getElementById('condo-content');
  if (!c) {
    target.innerHTML = '<p>Unit details were not found. <a href="../index.html#units">Back to all units</a>.</p>';
    return;
  }

  const PUBLIC_REFS = {
    '1006': [
      {
        label: 'Silver Sands rental — GC1006-Port A Condo',
        url: 'https://silversandsvacationrentals.com/property/b3fdd981-e48f-4320-b53f-c4c55b2d070e',
        note: 'Public rental listing identifies GC1006 as 2 bedrooms, 2 full baths and sleeping 6. That matches the photographed maximum occupancy. The public rental page does not display STR 200105618.'
      }
    ],
    '1007': [
      {
        label: 'Port A Escapes rental — Grand Caribbean GC1007',
        url: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1007',
        note: 'Direct public match: Unit 1007, 2 bedrooms, 2 baths, 6 guests and STR#200105620. This independently confirms the photographed unit, STR and occupancy. The photographed placard names Sand Key Realty, while this current public listing is operated by Port A Escapes, so verify the current booking party.'
      }
    ],
    '1008': [
      {
        label: 'Port A Escapes rental — Grand Caribbean GC1008',
        url: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1008',
        note: 'Direct public match: 5495 State Highway 361 #1008, 2 bedrooms, 2 baths, 6 guests and STR#200105622. The photographed placard says Port Aransas Escapes at 361-749-3591; the current public listing is on Port A Escapes, so verify which contact currently handles the rental.'
      }
    ],
    '1009': [
      {
        label: 'Port A Escapes rental — A Change In Latitude GC1009',
        url: 'https://www.portaescapes.com/rentals/a-change-in-latitude-gc1009',
        note: 'Current public rental page confirms Unit 1009 at 5495 State Hwy 361 #1009 with 3 bedrooms and 3 baths. It currently advertises sleeping 7, while the photographed placard states maximum occupancy 8; both values are shown rather than silently replacing the placard value.'
      },
      {
        label: 'Vrbo cross-check — GC1009',
        url: 'https://www.vrbo.com/2438010',
        note: 'The public Vrbo listing identifies A Change In Latitude GC1009 and prints STR#200105624, independently matching the photographed STR number.'
      }
    ],
    '1010': [
      {
        label: 'Port A Escapes rental — Grand Caribbean GC1010',
        url: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1010',
        note: 'Current public rental page independently confirms Grand Caribbean Unit 1010 at 5495 State Hwy 361 #1010 as a 3-bedroom, 3-bath condo for 6 guests. The rental page does not currently print STR 200105626.'
      },
      {
        label: 'Homes.com property record — Unit 1010',
        url: 'https://www.homes.com/property/5495-state-highway-361-port-aransas-tx-unit-1010/z6t6mrlhl7rmy/',
        note: 'The public property record identifies the same Unit 1010 and lists APN 200105626. This strongly corroborates the photographed 1010 ↔ 200105626 mapping, but it is a property-record APN cross-check rather than a second rental-site STR claim.'
      }
    ]
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  const suffix = c.floor === 1 ? 'st' : c.floor === 2 ? 'nd' : c.floor === 3 ? 'rd' : 'th';
  document.title = `Unit ${c.unit}${c.name ? ` · ${c.name}` : ''} · Grand Caribbean Condo Guide`;
  const status = c.verified
    ? 'Rental and registration details transcribed from posted on-site signage.'
    : c.observed
      ? 'Unit number observed on-site; some rental details are still missing.'
      : 'This condo is indexed, but photo-derived rental details have not yet been captured.';
  const permit = c.permit ? `${esc(c.permitLabel)} ${esc(c.permit)}` : 'Not captured';
  const occupancy = c.occupancy ? `${c.occupancy} guests` : 'Not captured';
  const contact = c.contact || 'Not captured';
  const phone = c.phone ? `<a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>` : 'Not captured';
  let buttons = '';
  if (c.phone) buttons += `<a class="button primary" href="tel:${esc(c.phone)}">Call ${esc(c.phone)}</a>`;
  if (c.bookingUrl) buttons += `<a class="button primary" href="${esc(c.bookingUrl)}" target="_blank" rel="noopener">Open direct listing</a>`;
  if (c.operatorUrl && !c.bookingUrl) buttons += `<a class="button secondary" href="${esc(c.operatorUrl)}" target="_blank" rel="noopener">Visit ${esc(c.operator || c.contact)}</a>`;
  const floorImage = c.floor >= 3 ? '../assets/marsh-view.webp' : '../assets/yellow-corridor.webp';
  const publicRefs = PUBLIC_REFS[c.unit] || [];
  const publicBlock = publicRefs.length ? `
    <section class="booking-box" aria-label="Public listing cross-checks">
      <div>
        <p class="eyebrow">Public cross-checks</p>
        <h2>Current rental and property references</h2>
        <p>These links are kept separate from the photographed placard data. Where a live listing disagrees with the sign, the difference is called out rather than overwriting the on-site record.</p>
        ${publicRefs.map(ref => `<div style="margin-top:1rem"><strong>${esc(ref.label)}</strong><p class="source-note">${esc(ref.note)}</p></div>`).join('')}
      </div>
      <div class="action-row">${publicRefs.map(ref => `<a class="button secondary" href="${esc(ref.url)}" target="_blank" rel="noopener">Open ${esc(ref.label)}</a>`).join('')}</div>
    </section>` : '';

  target.innerHTML = `
    <a class="back-link" href="../index.html#units">← Back to all units</a>
    <section class="detail-hero">
      <div class="detail-title">
        <p class="eyebrow">${c.floor}${suffix} floor</p>
        <h1>Unit ${esc(c.unit)}</h1>
        ${c.name ? `<p class="detail-status"><strong>${esc(c.name)}</strong></p>` : ''}
        <p class="detail-status">${status}</p>
      </div>
      <div class="detail-photo"><img src="${floorImage}" alt="On-site view of Grand Caribbean" width="800" height="600"></div>
    </section>
    <section class="detail-grid" aria-label="Unit details">
      <div class="detail-card"><span class="meta-label">Maximum occupancy</span><span class="meta-value">${occupancy}</span></div>
      <div class="detail-card"><span class="meta-label">Registration</span><span class="meta-value">${permit}</span></div>
      <div class="detail-card"><span class="meta-label">Rental / contact</span><span class="meta-value">${esc(contact)}</span></div>
      <div class="detail-card"><span class="meta-label">Phone</span><span class="meta-value">${phone}</span></div>
    </section>
    <section class="booking-box">
      <div><p class="eyebrow">On-site source</p><h2>Photographed booking reference</h2><p>${esc(c.notes)}</p></div>
      <div class="action-row">${buttons || '<span class="badge unknown">No booking contact captured yet</span>'}</div>
    </section>
    ${publicBlock}
    <section>
      <p class="eyebrow">Property context</p><h2>Shared on-site views</h2>
      <div class="detail-gallery">
        <img src="../assets/upper-floor-view.webp" alt="Upper-floor exterior view from Grand Caribbean" loading="lazy" width="800" height="600">
        <img src="../assets/yellow-corridor.webp" alt="Yellow open-air corridor at Grand Caribbean" loading="lazy" width="800" height="600">
        <img src="../assets/marsh-view.webp" alt="Coastal landscape view from Grand Caribbean" loading="lazy" width="800" height="600">
      </div>
    </section>
    <p class="source-note"><strong>Source note:</strong> Photo-verified details were read from registration or rental placards photographed at the property in August 2026. Public rental/property links are separate cross-checks reviewed August 19, 2026 and can change independently. This guide is not a booking agent; confirm current occupancy, registration, pricing and management before reserving.</p>`;
})();
