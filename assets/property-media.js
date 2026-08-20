(() => {
  const DUNE_CREST_URL = 'https://dunecrest.com/';
  const PROPERTY_PHOTO_SOURCE = 'https://www.portaescapes.com/rentals/grand-caribbean-gc1007';
  const PROPERTY_PHOTOS = [
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/bd2dcb12-3895-4503-a970-c5ab90654e4a',
      alt: 'Grand Caribbean building and boardwalk through the coastal dunes',
    },
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/eea916bc-c3fb-4180-ae50-b4a4000d46f7',
      alt: 'Grand Caribbean yellow beachfront building and curved swimming pool',
    },
    {
      src: 'https://track-pm.s3.amazonaws.com/paescapes/image/243e8cf9-acdd-4d0b-8041-bfa0ad688dac',
      alt: 'Grand Caribbean pool deck overlooking the dunes and beach boardwalk',
    },
  ];

  const optimized = (src, width = 1100) => (
    `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=70&output=webp`
  );

  const makeLink = (href, text, className = '') => {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = text;
    if (className) link.className = className;
    return link;
  };

  const headerNote = document.querySelector('.top .wrap small');
  if (headerNote && !headerNote.querySelector('a[href="https://dunecrest.com/"]')) {
    headerNote.append(' · ', makeLink(DUNE_CREST_URL, 'Dune Crest site'));
  }

  const footer = document.querySelector('.footer .wrap');
  if (footer && !footer.querySelector('a[href="https://dunecrest.com/"]')) {
    footer.append(' · ', makeLink(DUNE_CREST_URL, 'Grand Caribbean at Dune Crest'));
  }

  const detail = document.querySelector('.detail');
  if (detail) {
    detail.querySelector('.gallery')?.remove();
    return;
  }

  const hero = document.querySelector('.hero');
  const heroImage = hero?.querySelector('img');
  if (heroImage) {
    heroImage.src = optimized(PROPERTY_PHOTOS[1].src, 1200);
    heroImage.alt = PROPERTY_PHOTOS[1].alt;
  }

  const heroCopy = hero?.querySelector('.hero-copy');
  if (heroCopy && !heroCopy.querySelector('.property-site-link')) {
    const paragraph = document.createElement('p');
    paragraph.className = 'property-site-link';
    paragraph.append(makeLink(DUNE_CREST_URL, 'Grand Caribbean at Dune Crest site ↗', 'action'));
    heroCopy.querySelector('.stats')?.before(paragraph);
  }

  const gallery = document.querySelector('.section .gallery');
  if (!gallery) return;

  gallery.setAttribute('aria-label', 'Grand Caribbean property photos');
  gallery.replaceChildren(...PROPERTY_PHOTOS.map((photo) => {
    const image = document.createElement('img');
    image.src = optimized(photo.src);
    image.alt = photo.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }));

  if (!gallery.nextElementSibling?.classList.contains('property-photo-source')) {
    const source = document.createElement('p');
    source.className = 'source-note property-photo-source';
    source.append('Property photos: ', makeLink(PROPERTY_PHOTO_SOURCE, 'current Grand Caribbean rental listing'), ' · ', makeLink(DUNE_CREST_URL, 'Grand Caribbean at Dune Crest site'));
    gallery.after(source);
  }
})();
