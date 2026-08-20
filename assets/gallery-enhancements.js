(() => {
  const unitId = document.body.dataset.unit;
  const record = unitId && window.GC_GALLERIES?.[unitId];
  const gallery = document.querySelector('[data-rental-gallery-root]');

  if (!record || !gallery) return;

  if (record.sourceUrl && !gallery.querySelector('.gallery-full-link')) {
    const paragraph = document.createElement('p');
    paragraph.className = 'gallery-full-link';
    const link = document.createElement('a');
    link.className = 'action';
    link.href = record.sourceUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'View all photos on listing ↗';
    paragraph.append(link);
    gallery.append(paragraph);
  }

  const embeddedCount = window.GC_CAROUSEL?.uniqueImages
    ? window.GC_CAROUSEL.uniqueImages(record).length
    : (record.images || []).length;

  if (embeddedCount > 10) {
    gallery.querySelector('.carousel-dots')?.remove();
  }

  const carousel = gallery.matches('[data-rental-carousel]')
    ? gallery
    : gallery.querySelector('[data-rental-carousel]');
  if (!carousel) return;

  let touchStartX = null;
  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0]?.clientX ?? null;
  }, { passive: true });

  carousel.addEventListener('touchend', (event) => {
    if (touchStartX == null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchEndX - touchStartX;
    touchStartX = null;

    if (Math.abs(delta) < 45) return;
    const selector = delta < 0 ? '[data-carousel-next]' : '[data-carousel-prev]';
    carousel.querySelector(selector)?.click();
  }, { passive: true });
})();
