const pathParts = window.location.pathname.split('/').filter(Boolean);
const unitId = pathParts[pathParts.length - 1];
const { property, units } = window.GRAND_CARIBBEAN;
const unit = units.find((item) => item.id === unitId);
const root = document.querySelector('#condo-root');

function valueOrPending(value, singular, plural = `${singular}s`) {
  if (!value) return 'To verify';
  return `${value} ${value === 1 ? singular : plural}`;
}

if (!unit) {
  document.title = 'Condo not found · Grand Caribbean';
  root.innerHTML = `
    <section class="detail-shell not-found">
      <p class="eyebrow">CONDO DIRECTORY</p>
      <h1>Condo not found</h1>
      <p>That unit is not in the current Grand Caribbean directory.</p>
      <a class="button" href="../../">Back to all condos</a>
    </section>`;
} else {
  document.title = `Unit ${unit.id} · Grand Caribbean Condo Guide`;
  const booking = unit.bookingUrl
    ? `<a class="button" href="${unit.bookingUrl}" target="_blank" rel="noopener">View current listing ↗</a>`
    : '<span class="button button--disabled" aria-disabled="true">Booking link not yet verified</span>';

  root.innerHTML = `
    <section class="detail-shell">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../">All condos</a><span>/</span><span>Unit ${unit.id}</span></nav>
      <div class="detail-hero">
        <div>
          <p class="eyebrow">FLOOR ${unit.floor} · UNIT ${unit.id}</p>
          <h1>${unit.title}</h1>
          <p class="lede">An independent reference page for Grand Caribbean condo ${unit.id} in Port Aransas.</p>
        </div>
        <div class="unit-number" aria-hidden="true">${unit.id}</div>
      </div>

      <div class="fact-grid">
        <div><span>Bedrooms</span><strong>${valueOrPending(unit.bedrooms, 'bedroom')}</strong></div>
        <div><span>Bathrooms</span><strong>${valueOrPending(unit.baths, 'bath')}</strong></div>
        <div><span>Guests</span><strong>${unit.guests ? `Up to ${unit.guests}` : 'To verify'}</strong></div>
        <div><span>Floor</span><strong>${unit.floor}</strong></div>
      </div>

      <div class="detail-columns">
        <article class="detail-card">
          <p class="eyebrow">UNIT DETAILS</p>
          <h2>What we know</h2>
          ${unit.verified
            ? `<p>A current public listing was found for this unit. Use the source link for live pricing, availability, exact amenities, policies, and photos.</p>`
            : `<p>We have created the condo page and unit location, but have not yet verified a current public rental listing for this specific unit. No bedroom count, capacity, manager, or booking link is shown until sourced.</p>`}
          ${booking}
          ${unit.sourceLabel ? `<p class="source-note">Source currently indexed: ${unit.sourceLabel}. Rental information can change.</p>` : ''}
        </article>

        <aside class="detail-card detail-card--soft">
          <p class="eyebrow">THE COMPLEX</p>
          <h2>${property.name}</h2>
          <p>${property.address}</p>
          <ul class="amenity-list">${property.amenities.map((item) => `<li>${item}</li>`).join('')}</ul>
        </aside>
      </div>

      <section class="research-note">
        <strong>Know a better listing for unit ${unit.id}?</strong>
        <p>This directory is designed to track the current manager or booking page for each individually owned condo without pretending unverified details are current.</p>
      </section>
    </section>`;
}
