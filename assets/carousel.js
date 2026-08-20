(() => {
  const MAX_DOTS = 10;
  const SWIPE_THRESHOLD = 45;

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

  const galleries = () => window.GC_GALLERIES || {};

  function ensureStylesheet() {
    if (document.head.querySelector('link[data-gc-carousel-style]')) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/carousel.css';
    link.dataset.gcCarouselStyle = '';
    document.head.appendChild(link);
  }

  function canonicalizeUrl(src) {
    try {
      const url = new URL(src);
      const removableParameters = [
        'im_w',
        'rw',
        'rh',
        'w',
        'h',
        'width',
        'height',
        'quality',
        'impolicy',
        'ra',
      ];

      removableParameters.forEach((parameter) => url.searchParams.delete(parameter));
      const query = [...url.searchParams.entries()]
        .sort()
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      return `${url.origin}${url.pathname}${query ? `?${query}` : ''}`;
    } catch {
      return src;
    }
  }

  function uniqueImages(record) {
    const seen = new Set();

    return (record?.images || []).filter((photo) => {
      const key = canonicalizeUrl(photo.src);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  function optimizedUrl(src) {
    try {
      const url = new URL(src);
      const host = url.hostname.toLowerCase();

      if (host.endsWith('muscache.com')) {
        url.searchParams.set('im_w', '720');
        return url.href;
      }

      if (host === 'media.vrbo.com' || host === 'images.trvl-media.com') {
        ['w', 'h', 'rh'].forEach((parameter) => url.searchParams.delete(parameter));
        url.searchParams.set('impolicy', 'resizecrop');
        url.searchParams.set('ra', 'fit');
        url.searchParams.set('rw', '720');
        return url.href;
      }

      if (host === 'images.rezfusion.com') {
        url.searchParams.set('optimize', 'true');
        url.searchParams.set('quality', '65');
        url.searchParams.set('width', '900');
        return url.href;
      }

      if (host === 'track-pm.s3.amazonaws.com' || host === 'portaransas-us.com') {
        return `https://images.weserv.nl/?url=${encodeURIComponent(url.href)}&w=900&q=60&output=webp`;
      }

      return url.href;
    } catch {
      return src;
    }
  }

  function renderSource(record) {
    return `
      <p class="carousel-source source-note">
        <strong>Photos:</strong>
        <a href="${escapeHtml(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.sourceLabel)}</a>
        · <strong>Photo date:</strong> ${escapeHtml(record.imageDate || 'Not published')}
        · checked ${escapeHtml(record.checked || '2026-08-19')}.
      </p>
      <p class="carousel-source-actions">
        <a class="action" href="${escapeHtml(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">View all photos on listing ↗</a>
      </p>
    `;
  }

  function renderDots(photoCount) {
    if (photoCount <= 1 || photoCount > MAX_DOTS) {
      return '';
    }

    return `
      <div class="carousel-dots" aria-label="Choose rental photo">
        ${Array.from({ length: photoCount }, (_, index) => `
          <button
            type="button"
            class="carousel-dot"
            data-carousel-dot="${index}"
            aria-label="Show photo ${index + 1}"
            aria-current="${index === 0 ? 'true' : 'false'}"
          ></button>
        `).join('')}
      </div>
    `;
  }

  function render(unit) {
    const record = galleries()[unit.unit];

    if (!record) {
      return '';
    }

    const photos = uniqueImages(record);

    if (!photos.length) {
      return `
        <section class="rental-gallery panel listing-gallery-unavailable" data-rental-gallery-root aria-label="Rental listing photo source for condo ${escapeHtml(unit.unit)}">
          <div class="carousel-head">
            <div>
              <div class="eyebrow">Exact-unit listing</div>
              <h2>Rental listing photos</h2>
            </div>
          </div>
          <p>${escapeHtml(record.unavailableReason || 'Photos are available on the listing, but no stable image files are available for this page.')}</p>
          ${renderSource(record)}
        </section>
      `;
    }

    const firstPhoto = photos[0];
    const hasMultiple = photos.length > 1;

    return `
      <section class="rental-gallery panel" data-rental-gallery-root data-rental-carousel data-unit="${escapeHtml(unit.unit)}" tabindex="0" aria-label="Rental listing photos for condo ${escapeHtml(unit.unit)}">
        <div class="carousel-head">
          <div>
            <div class="eyebrow">Exact-unit listing</div>
            <h2>Rental listing photos</h2>
          </div>
          <span class="carousel-count" data-carousel-count>1 / ${photos.length}</span>
        </div>
        <figure class="carousel-frame">
          <img
            class="carousel-image"
            data-carousel-image
            src="${escapeHtml(optimizedUrl(firstPhoto.src))}"
            data-raw-src="${escapeHtml(firstPhoto.src)}"
            alt="${escapeHtml(firstPhoto.alt || `Condo ${unit.unit} rental listing photo 1`)}"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            referrerpolicy="no-referrer"
            width="900"
            height="600"
          >
          ${hasMultiple ? '<button class="carousel-btn carousel-prev" type="button" data-carousel-prev aria-label="Previous rental photo">‹</button>' : ''}
          ${hasMultiple ? '<button class="carousel-btn carousel-next" type="button" data-carousel-next aria-label="Next rental photo">›</button>' : ''}
          <figcaption class="carousel-caption" data-carousel-caption aria-live="polite">
            ${escapeHtml(firstPhoto.caption || `Rental listing photo 1 of ${photos.length}.`)}
          </figcaption>
        </figure>
        ${renderDots(photos.length)}
        ${renderSource(record)}
      </section>
    `;
  }

  function bindCarousel(element) {
    const record = galleries()[element.dataset.unit];
    const photos = uniqueImages(record);

    if (!record || !photos.length) {
      return;
    }

    let index = 0;
    let touchStartX = null;
    const image = element.querySelector('[data-carousel-image]');
    const count = element.querySelector('[data-carousel-count]');
    const caption = element.querySelector('[data-carousel-caption]');
    const dots = [...element.querySelectorAll('[data-carousel-dot]')];

    const show = (nextIndex) => {
      index = (nextIndex + photos.length) % photos.length;
      const photo = photos[index];

      image.dataset.fallbackUsed = '0';
      image.dataset.rawSrc = photo.src;
      image.src = optimizedUrl(photo.src);
      image.alt = photo.alt || `Condo ${element.dataset.unit} rental listing photo ${index + 1}`;
      caption.textContent = photo.caption || `Rental listing photo ${index + 1} of ${photos.length}.`;

      if (count) {
        count.textContent = `${index + 1} / ${photos.length}`;
      }

      dots.forEach((dot, dotIndex) => {
        dot.setAttribute('aria-current', String(dotIndex === index));
      });
    };

    image.addEventListener('error', () => {
      if (image.dataset.fallbackUsed === '1') {
        return;
      }

      image.dataset.fallbackUsed = '1';
      image.src = image.dataset.rawSrc;
    });

    element.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(index - 1));
    element.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(index + 1));

    dots.forEach((dot) => {
      dot.addEventListener('click', () => show(Number(dot.dataset.carouselDot)));
    });

    element.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + 1);
      }
    });

    element.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0]?.clientX ?? null;
    }, { passive: true });

    element.addEventListener('touchend', (event) => {
      if (touchStartX == null) {
        return;
      }

      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const delta = touchEndX - touchStartX;
      touchStartX = null;

      if (Math.abs(delta) < SWIPE_THRESHOLD) {
        return;
      }

      show(index + (delta < 0 ? 1 : -1));
    }, { passive: true });
  }

  function bind() {
    document.querySelectorAll('[data-rental-carousel]').forEach(bindCarousel);
  }

  function mount() {
    if (document.querySelector('[data-rental-gallery-root]')) {
      return;
    }

    const unitId = document.body.dataset.unit;
    const unit = (window.GC_UNITS || []).find((candidate) => candidate.unit === unitId);

    if (!unit) {
      return;
    }

    const html = render(unit);
    const anchor = document.querySelector('.unit-nav');

    if (!html || !anchor) {
      return;
    }

    anchor.insertAdjacentHTML('beforebegin', html);
    bind();
  }

  ensureStylesheet();
  window.GC_CAROUSEL = {
    bind,
    mount,
    optimizedUrl,
    render,
    uniqueImages,
  };
  mount();
})();
