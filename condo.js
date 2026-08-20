const pathParts = window.location.pathname.split('/').filter(Boolean);
const unitId = pathParts[pathParts.length - 1];
const { property, units } = window.GRAND_CARIBBEAN;
const unit = units.find((item) => item.id === unitId);
const root = document.querySelector('#condo-root');

function valueOrPending(value, singular, plural = `${singular}s`) {
  if (!value) return 'To verify';
  return `${value} ${value === 1 ? singular : plural}`;
}

function observedDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .format(new Date(year, month - 1, day));
}

function rentalReferenceMarkup(reference) {
  if (!reference) return '';
  const phoneHref = reference.phone.replace(/[^\d+]/g, '');
  return `
    <article class="detail-card rental-reference">
      <p class="eyebrow">ON-SITE RENTAL REFERENCE</p>
      <h2>${reference.name}</h2>
      <p class="reference-phone"><a href="tel:${phoneHref}">${reference.phone}</a></p>
      <dl class="reference-facts">
        <div><dt>Max occupancy</dt><dd>${reference.maxOccupancy}</dd></div>
        <div><dt>STR number</dt><dd>${reference.strNumber}</dd></div>
      </dl>
      <p class="source-note">Observed ${observedDate(reference.observedDate)} on a rental placard at the complex. This is a reference, not a guarantee that the manager is still current.</p>
    </article>`;
}

function contextPhotoMarkup(photo) {
  if (!photo) return '';
  return `
    <figure class="detail-photo">
      <img src="${photo.src}" alt="${photo.alt}" width="480" height="360" loading="lazy" decoding="async">
      <figcaption>${photo.caption}</figcaption>
    </figure>`;
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
    ? `<a class="button" href="${unit.bookingUrl}" target="_blank" rel="noopener">View public listing ↗</a>`
    : '<span class="button button--disabled" aria-disabled="true">Online listing not yet verified</span>';

  const placardGuests = !unit.guests && unit.rentalReference?.maxOccupancy
    ? `${unit.rentalReference.maxOccupancy} max (placard)`
    : null;

  const sourceConflict = unit.bookingUrl && unit.rentalReference && unit.sourceLabel !== unit.rentalReference.name
    ? `<div class="source-alert"><strong>Sources differ.</strong> The public listing currently indexed is from ${unit.sourceLabel}, while the on-site placard photographed in August 2026 names ${unit.rentalReference.name}. Confirm the current manager before sending payment or booking.</div>`
    : '';

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
        <div><span>Guests</span><strong>${unit.guests ? `Up to ${unit.guests}` : (placardGuests || 'To verify')}</strong></div>
        <div><span>Floor</span><strong>${unit.floor}</strong></div>
      </div>

      ${sourceConflict}

      <div class="detail-columns">
        <article class="detail-card">
          <p class="eyebrow">PUBLIC LISTING</p>
          <h2>${unit.bookingUrl ? 'Online rental listing found' : 'Still researching'}</h2>
          ${unit.bookingUrl
            ? `<p>A public rental listing was found for this unit. Use it for live pricing, availability, exact amenities, policies, and listing photos.</p>`
            : `<p>We have not yet verified a current public online listing for this condo. On-site rental references, when available, are shown separately rather than treated as a live booking source.</p>`}
          ${booking}
          ${unit.sourceLabel ? `<p class="source-note">Public listing source currently indexed: ${unit.sourceLabel}. Rental information can change.</p>` : ''}
        </article>

        ${unit.rentalReference ? rentalReferenceMarkup(unit.rentalReference) : `
          <aside class="detail-card detail-card--soft">
            <p class="eyebrow">THE COMPLEX</p>
            <h2>${property.name}</h2>
            <p>${property.address}</p>
            <ul class="amenity-list">${property.amenities.map((item) => `<li>${item}</li>`).join('')}</ul>
          </aside>`}
      </div>

      ${unit.rentalReference ? `
        <aside class="detail-card detail-card--soft complex-reference">
          <p class="eyebrow">THE COMPLEX</p>
          <h2>${property.name}</h2>
          <p>${property.address}</p>
          <ul class="amenity-list">${property.amenities.map((item) => `<li>${item}</li>`).join('')}</ul>
        </aside>` : ''}

      ${contextPhotoMarkup(unit.contextPhoto)}

      <section class="research-note">
        <strong>Rental information changes.</strong>
        <p>This guide keeps public listing sources and photographed on-site rental references separate so a stale manager or booking page is easier to spot.</p>
      </section>
    </section>`;
}
