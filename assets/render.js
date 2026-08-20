(() => {
  const root = document.querySelector('#app') || document.body;
  const meta = window.GC_META;
  const units = window.GC_UNITS || [];

  const DUNE_CREST_URL = 'https://dunecrest.com/';
  const PROPERTY_PHOTO_SOURCE = 'https://www.portaescapes.com/rentals/grand-caribbean-gc1007';
  const PROPERTY_PHOTOS = [
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/bd2dcb12-3895-4503-a970-c5ab90654e4a',
      alt: 'Grand Caribbean building and boardwalk through the coastal dunes',
    },
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/eea916bc-c3fb-4180-ae50-b4a4000d46f7',
      alt: 'Grand Caribbean yellow building and curved swimming pool',
    },
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/243e8cf9-acdd-4d0b-8041-bfa0ad688dac',
      alt: 'Grand Caribbean pool deck overlooking the dunes and beach boardwalk',
    },
  ];

  const STATUS_LABELS = {
    verified: 'Book online',
    contact: 'Not available to rent',
    'no-current': 'No current booking link',
  };

  const escapeHtml = (value) => String(value ?? '').replace(
    /[&<>"']/g,
    (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[character],
  );

  const formatMoney = (value) => {
    if (value == null) {
      return '—';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const unitHref = (unit) => `condos/${encodeURIComponent(unit.unit)}.html`;

  const propertyPhotoUrl = (src, width) => (
    `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=72&output=webp`
  );

  const hasExactUnitGallery = (unit) => Boolean(window.GC_GALLERIES?.[unit.unit]);

  function buildValueHistory(realty) {
    const startYear = realty.tableStartYear || 2026;
    const tax = Object.fromEntries(
      Object.entries(realty.tax || {}).map(([year, value]) => [Number(year), Number(value)]),
    );
    const taxYears = Object.keys(tax).map(Number).sort((left, right) => left - right);
    const latestTaxYear = taxYears.length ? Math.max(...taxYears) : null;
    const years = [];

    for (let year = 2026; year >= startYear; year -= 1) {
      years.push(year);
    }

    const taxBasis = (year) => {
      if (tax[year]) {
        return tax[year];
      }

      const below = taxYears.filter((candidate) => candidate < year).pop();
      const above = taxYears.find((candidate) => candidate > year);

      if (below && above) {
        const progress = (year - below) / (above - below);
        return Math.round(tax[below] + (tax[above] - tax[below]) * progress);
      }

      if (below) {
        return tax[below];
      }

      if (above) {
        return tax[above];
      }

      return null;
    };

    if (taxYears.length && realty.currentApprox) {
      const scale = realty.currentApprox / tax[latestTaxYear];

      return years.map((year) => ({
        year,
        approximate: year === 2026
          ? realty.currentApprox
          : Math.round((taxBasis(Math.min(year, latestTaxYear)) * scale) / 1000) * 1000,
        published: tax[year] || null,
        source: year === 2026
          ? '2026 preliminary'
          : tax[year]
            ? 'Published record'
            : 'Not available',
      }));
    }

    let historical = null;

    if (realty.asking?.price && realty.asking.year <= startYear) {
      historical = { year: realty.asking.year, value: realty.asking.price };
    }

    if (realty.lastSale?.price && realty.lastSale.year <= startYear) {
      historical = { year: realty.lastSale.year, value: realty.lastSale.price };
    }

    if (!historical) {
      historical = {
        year: startYear,
        value: Math.round(((realty.currentApprox || 0) * 0.55) / 1000) * 1000,
      };
    }

    return years.map((year) => {
      const span = 2026 - historical.year || 1;
      const progress = Math.max(0, Math.min(1, (year - historical.year) / span));
      const approximate = Math.round(
        (historical.value + ((realty.currentApprox || historical.value) - historical.value) * progress) / 1000,
      ) * 1000;

      return {
        year,
        approximate,
        published: tax[year] || null,
        source: year === 2026
          ? '2026 preliminary'
          : tax[year]
            ? 'Published record'
            : 'Not available',
      };
    });
  }

  function renderShell(content) {
    return `
      <header class="top">
        <div class="wrap">
          <a class="brand" href="./">Grand Caribbean · Port A</a>
          <small>
            Unofficial condo guide · sources checked ${escapeHtml(meta.researchedOn)}
            · <a href="${DUNE_CREST_URL}" target="_blank" rel="noopener">Dune Crest site</a>
          </small>
        </div>
      </header>
      ${content}
      <footer class="footer">
        <div class="wrap">
          Unofficial guide. Verify availability, prices, STR status and property records with the linked source.
          · <a href="${DUNE_CREST_URL}" target="_blank" rel="noopener">Grand Caribbean at Dune Crest</a>
        </div>
      </footer>
    `;
  }

  function renderPropertyGallery() {
    return `
      <section class="property-gallery" aria-labelledby="property-gallery-title">
        <h2 id="property-gallery-title">Grand Caribbean property photos</h2>
        <div class="gallery" aria-label="Grand Caribbean exterior, pool and boardwalk photos">
          ${PROPERTY_PHOTOS.map((photo, index) => {
            const small = propertyPhotoUrl(photo.src, 720);
            const large = propertyPhotoUrl(photo.src, 1200);
            const sizes = index === 0
              ? '(max-width: 800px) calc(100vw - 32px), 560px'
              : '(max-width: 800px) calc(50vw - 20px), 280px';

            return `
              <img
                src="${escapeHtml(small)}"
                srcset="${escapeHtml(small)} 720w, ${escapeHtml(large)} 1200w"
                sizes="${sizes}"
                alt="${escapeHtml(photo.alt)}"
                loading="lazy"
                decoding="async"
                width="1200"
                height="800"
              >
            `;
          }).join('')}
        </div>
        <p class="source-note property-photo-source">
          <strong>Property photos:</strong>
          <a href="${PROPERTY_PHOTO_SOURCE}" target="_blank" rel="noopener">current Grand Caribbean rental listing</a>
          · <a href="${DUNE_CREST_URL}" target="_blank" rel="noopener">Grand Caribbean at Dune Crest site</a>
          · checked ${escapeHtml(meta.researchedOn)}.
        </p>
      </section>
    `;
  }

  function renderUnitCard(unit) {
    const title = unit.name
      ? `${unit.unit} · ${escapeHtml(unit.name)}`
      : `Condo ${unit.unit}`;
    const occupancy = unit.occupancy || unit.placard?.maxOccupancy;
    const summary = unit.status === 'verified'
      ? `${unit.bookings.length} checked booking link${unit.bookings.length === 1 ? '' : 's'}`
      : unit.status === 'contact'
        ? 'No current rental booking'
        : 'Property and sale history';

    return `
      <article class="card" data-unit="${unit.unit}" data-status="${unit.status}" data-floor="${unit.floor}" data-occ="${occupancy || 0}">
        <span class="pill ${unit.status}">${STATUS_LABELS[unit.status]}</span>
        <h2>${title}</h2>
        <div class="facts">
          <span class="fact">${unit.bedrooms} BR</span>
          <span class="fact">${unit.bathrooms} BA</span>
          ${occupancy ? `<span class="fact">Up to ${occupancy}</span>` : ''}
          ${unit.str ? `<span class="fact">STR ${escapeHtml(unit.str)}</span>` : ''}
        </div>
        <p>${summary}</p>
        <a class="open" href="${unitHref(unit)}">View condo</a>
      </article>
    `;
  }

  function renderLanding() {
    document.title = 'Grand Caribbean Condo Guide | Port Aransas';

    const counts = Object.fromEntries(
      ['verified', 'contact', 'no-current'].map((status) => [
        status,
        units.filter((unit) => unit.status === status).length,
      ]),
    );
    const heroPhoto = PROPERTY_PHOTOS[1];
    const heroSmall = propertyPhotoUrl(heroPhoto.src, 720);
    const heroLarge = propertyPhotoUrl(heroPhoto.src, 1200);

    root.innerHTML = renderShell(`
      <section class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <div class="eyebrow">Mustang Island · Port Aransas, Texas</div>
            <h1>Grand Caribbean condo directory</h1>
            <p>Search all ${units.length} condos. Compare rooms, guest capacity and current rental links; units without a live booking page include property history.</p>
            <p class="property-site-link">
              <a class="action" href="${DUNE_CREST_URL}" target="_blank" rel="noopener">Grand Caribbean at Dune Crest ↗</a>
            </p>
            <div class="stats">
              <div class="stat"><strong>${counts.verified}</strong><br>online rentals</div>
              <div class="stat"><strong>${counts.contact}</strong><br>not available to rent</div>
              <div class="stat"><strong>${counts['no-current']}</strong><br>no current booking link</div>
            </div>
          </div>
          <a class="hero-media" href="${PROPERTY_PHOTO_SOURCE}" target="_blank" rel="noopener" aria-label="Open the source listing for this Grand Caribbean property photo">
            <img
              src="${escapeHtml(heroSmall)}"
              srcset="${escapeHtml(heroSmall)} 720w, ${escapeHtml(heroLarge)} 1200w"
              sizes="(max-width: 800px) calc(100vw - 32px), 42vw"
              alt="${escapeHtml(heroPhoto.alt)}"
              decoding="async"
              fetchpriority="high"
              width="1200"
              height="800"
            >
          </a>
        </div>
      </section>
      <main class="section" id="units">
        <div class="wrap">
          <div class="notice"><strong>Booking links:</strong> shown only for exact-unit matches. On-site occupancy and listing capacity stay separate when they differ.</div>
          <div class="filters">
            <input id="q" type="search" placeholder="Search 3008, Beach Haven, STR…" aria-label="Search condos">
            <select id="status">
              <option value="">All rental states</option>
              <option value="verified">Book online</option>
              <option value="contact">Not available to rent</option>
              <option value="no-current">No current booking link</option>
            </select>
            <select id="floor">
              <option value="">All floors</option>
              ${[1, 2, 3, 4].map((floor) => `<option value="${floor}">Floor ${floor}</option>`).join('')}
            </select>
            <select id="occ">
              <option value="">Any capacity</option>
              <option value="4">4+ guests</option>
              <option value="6">6+ guests</option>
              <option value="8">8+ guests</option>
            </select>
          </div>
          <div id="resultCount" class="source-note" aria-live="polite"></div>
          <div id="cards" class="grid">${units.map(renderUnitCard).join('')}</div>
          ${renderPropertyGallery()}
          <div class="method"><strong>Research notes.</strong> ${escapeHtml(meta.methodology)}</div>
        </div>
      </main>
    `);

    const queryInput = document.querySelector('#q');
    const statusSelect = document.querySelector('#status');
    const floorSelect = document.querySelector('#floor');
    const occupancySelect = document.querySelector('#occ');
    const cards = document.querySelector('#cards');
    const resultCount = document.querySelector('#resultCount');

    const applyFilters = () => {
      const query = queryInput.value.trim().toLowerCase();
      const status = statusSelect.value;
      const floor = floorSelect.value;
      const minimumOccupancy = Number(occupancySelect.value) || 0;

      const filtered = units.filter((unit) => {
        const occupancy = unit.occupancy || unit.placard?.maxOccupancy || 0;
        const searchable = [
          unit.unit,
          unit.name,
          unit.str,
          unit.placard?.manager,
          unit.placard?.phone,
          ...(unit.bookings || []).map((booking) => `${booking.channel} ${booking.details}`),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return (!query || searchable.includes(query))
          && (!status || unit.status === status)
          && (!floor || String(unit.floor) === floor)
          && (!minimumOccupancy || occupancy >= minimumOccupancy);
      });

      cards.innerHTML = filtered.length
        ? filtered.map(renderUnitCard).join('')
        : '<div class="empty">No matching condos.</div>';
      resultCount.textContent = `Showing ${filtered.length} of ${units.length} condos`;
    };

    [queryInput, statusSelect, floorSelect, occupancySelect].forEach((element) => {
      element.addEventListener('input', applyFilters);
    });

    applyFilters();
  }

  function renderBookingSection(unit) {
    if (unit.status === 'contact') {
      return '<div class="notice"><strong>Not available to rent.</strong></div>';
    }

    if (!unit.bookings.length) {
      return `<div class="notice warn"><strong>No live booking page found.</strong> Checked ${escapeHtml(meta.researchedOn)}.</div>`;
    }

    return `
      <div class="link-list">
        ${unit.bookings.map((booking) => `
          <div class="booking">
            <strong>${escapeHtml(booking.channel)}${booking.secondary ? ' · secondary channel' : ''}</strong>
            <p>${escapeHtml(booking.details)}</p>
            <a href="${escapeHtml(booking.url)}" target="_blank" rel="noopener">Open ${escapeHtml(booking.channel)}</a>
            <div class="validation">${escapeHtml(booking.validation)} · checked ${escapeHtml(booking.checked)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderPlacardSection(unit) {
    if (!unit.placard) {
      return '';
    }

    const placard = unit.placard;
    const phoneHref = placard.phone?.replace(/[^0-9]/g, '');

    return `
      <h2>On-site rental sign</h2>
      <div class="booking placard">
        <div class="badge-row">
          ${placard.maxOccupancy ? `<span class="fact">Posted max ${placard.maxOccupancy}</span>` : ''}
          ${placard.str ? `<span class="fact">STR / registration ${escapeHtml(placard.str)}</span>` : ''}
        </div>
        <p>
          ${placard.manager ? `Manager/contact: <strong>${escapeHtml(placard.manager)}</strong>. ` : ''}
          ${placard.phone ? `Phone: <a href="tel:${phoneHref}">${escapeHtml(placard.phone)}</a>. ` : ''}
          ${placard.note ? escapeHtml(placard.note) : ''}
        </p>
        <div class="validation">From on-site photo · ${escapeHtml(placard.checked || meta.researchedOn)}.</div>
      </div>
    `;
  }

  function renderPublicReferences(unit) {
    if (!unit.publicRefs?.length) {
      return '';
    }

    return `
      <section class="public-crosschecks">
        <h2>Property cross-checks</h2>
        <div class="link-list">
          ${unit.publicRefs.map((reference) => `
            <div class="booking">
              <strong>${escapeHtml(reference.label)}</strong>
              <p>${escapeHtml(reference.note || 'Exact-unit public property reference.')}</p>
              <a href="${escapeHtml(reference.url)}" target="_blank" rel="noopener">Open source</a>
              <div class="validation">Public source · checked ${escapeHtml(meta.researchedOn)}</div>
            </div>
          `).join('')}
        </div>
        <p class="source-note">Property/APN identifiers are kept separate from STR permit numbers unless a rental source explicitly links them.</p>
      </section>
    `;
  }

  function renderRealtySection(unit) {
    const realty = unit.realty;

    if (!realty) {
      return '';
    }

    const rows = buildValueHistory(realty);
    const officialTaxUrl = realty.officialTaxUrl || meta.officialTaxUrl;

    return `
      <h2>Sale, value & tax record</h2>
      <div class="value-cards">
        <div class="value-card">
          <small>Estimated value</small>
          <strong>${formatMoney(realty.currentApprox)}</strong>
          <small>${escapeHtml(realty.currentBasis)}</small>
        </div>
        <div class="value-card">
          <small>Latest sale record</small>
          <strong>${realty.lastSale ? String(realty.lastSale.year) : 'Not surfaced'}</strong>
          <small>${realty.lastSale ? escapeHtml(realty.lastSale.label) : 'No exact sale record found'}</small>
        </div>
        <div class="value-card">
          <small>History from</small>
          <strong>${realty.tableStartYear}</strong>
          <small>${escapeHtml(realty.startLabel)}</small>
        </div>
      </div>
      ${realty.asking ? `<p class="sale-line"><strong>${realty.asking.year} listing:</strong> ${formatMoney(realty.asking.price)} — ${escapeHtml(realty.asking.label)}</p>` : ''}
      <div class="source-links">
        ${realty.links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener" title="${escapeHtml(link.note)}">${escapeHtml(link.label)}</a>`).join('')}
        <a href="${escapeHtml(officialTaxUrl)}" target="_blank" rel="noopener">Official Nueces CAD</a>
      </div>
      ${(realty.notes || []).map((note) => `<p class="source-note">${escapeHtml(note)}</p>`).join('')}
      <h2>Year-by-year values</h2>
      <div class="table-wrap">
        <table class="history">
          <thead>
            <tr>
              <th>Year</th>
              <th>Estimated market value</th>
              <th>Published assessment*</th>
              <th>Source status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${row.year}</td>
                <td class="model">${formatMoney(row.approximate)}</td>
                <td>${row.published ? formatMoney(row.published) : '—'}</td>
                <td class="muted">${escapeHtml(row.source)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p class="source-note"><strong>*Value note:</strong> market-value figures are modeled estimates, not appraisals or sale prices. Published assessment values appear only when an exact-unit source was available; blank years are intentional. Verify county values with Nueces CAD.</p>
    `;
  }

  function renderDetail(unit) {
    document.title = `Unit ${unit.unit}${unit.name ? ` · ${unit.name}` : ''} | Grand Caribbean Condo Guide`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = `Grand Caribbean Unit ${unit.unit} in Port Aransas: ${unit.bedrooms} bedrooms, ${unit.bathrooms} baths, rental references, occupancy and property history.`;
    }

    const index = units.findIndex((candidate) => candidate.unit === unit.unit);
    const previous = units[index - 1];
    const next = units[index + 1];
    const title = unit.name
      ? `Condo ${unit.unit} · ${escapeHtml(unit.name)}`
      : `Condo ${unit.unit}`;
    const listingCapacity = unit.occupancy ? `${unit.occupancy} guests` : 'Not listed';

    root.innerHTML = renderShell(`
      <main class="detail">
        <div class="wrap">
          <a class="back" href="./#units">← All condos</a>
          <div class="detail-head">
            <div>
              <div class="eyebrow">Floor ${unit.floor}</div>
              <h1>${title}</h1>
              <div class="badge-row">
                <span class="pill ${unit.status}">${STATUS_LABELS[unit.status]}</span>
                ${unit.str ? `<span class="fact">STR / registration ${escapeHtml(unit.str)}</span>` : ''}
              </div>
            </div>
            <div class="summary-card">
              <dl>
                <div><dt>Bedrooms</dt><dd>${unit.bedrooms}</dd></div>
                <div><dt>Bathrooms</dt><dd>${unit.bathrooms}</dd></div>
                <div><dt>Listing capacity</dt><dd>${listingCapacity}</dd></div>
                <div><dt>Interior</dt><dd>${unit.sqft ? `${Number(unit.sqft).toLocaleString()} sf` : 'Not verified'}</dd></div>
              </dl>
            </div>
          </div>
          ${unit.beds?.length ? `<div class="panel"><strong>Sleeping details</strong><p>${unit.beds.map(escapeHtml).join(' · ')}</p></div>` : ''}
          ${unit.note ? `<p class="notice">${escapeHtml(unit.note)}</p>` : ''}
          <h2>${unit.status === 'verified' ? 'How to rent' : 'Rental status'}</h2>
          ${renderBookingSection(unit)}
          ${renderPublicReferences(unit)}
          ${renderPlacardSection(unit)}
          ${renderRealtySection(unit)}
          ${hasExactUnitGallery(unit) ? '' : renderPropertyGallery()}
          <nav class="unit-nav" aria-label="Adjacent condos">
            <span>${previous ? `<a href="${unitHref(previous)}">← Unit ${previous.unit}</a>` : ''}</span>
            <a href="./#units">All condos</a>
            <span>${next ? `<a href="${unitHref(next)}">Unit ${next.unit} →</a>` : ''}</span>
          </nav>
          <div class="method"><strong>Research notes.</strong> ${escapeHtml(meta.methodology)}</div>
        </div>
      </main>
    `);
  }

  const requestedUnit = document.body.dataset.unit || new URLSearchParams(window.location.search).get('unit');
  const unit = requestedUnit && units.find((candidate) => candidate.unit === requestedUnit);

  if (unit) {
    renderDetail(unit);
  } else {
    renderLanding();
  }
})();
