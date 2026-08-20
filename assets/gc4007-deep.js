(() => {
  const checked = '2026-08-19';
  const unit = (window.GC_UNITS || []).find((candidate) => candidate.unit === '4007');
  if (!unit) return;

  const additions = [
    {
      channel: 'Sand Key direct',
      url: 'https://sandkeyvacationrentals.guestybookings.com/en/properties/64ef7b89a56b3c003457da94',
      details: 'Incredible Ocean Views, Direct Beach Access, Pool; direct Sand Key Vacation Rentals booking engine',
      validation: 'Sand Key page names Grand Caribbean Unit 4007 and its Book Now button resolves to this exact Guesty property',
      checked,
      secondary: false,
    },
    {
      channel: 'Sand Key monthly rates',
      url: 'https://www.sandkeyvacationrentals.com/winter-texan-monthly-rents',
      details: 'Grand Caribbean Unit 4007; direct manager winter/monthly rate page with Book Now',
      validation: 'Exact unit name + 2 BR / 2 BA / 6-guest Grand Caribbean entry',
      checked,
      secondary: true,
    },
    {
      channel: 'Expedia',
      url: 'https://www.expedia.com/Corpus-Christi-Hotels-Grand-Caribbean-4007.h74565764.Hotel-Information',
      details: 'Incredible Ocean Views, Direct Beach Access, Pool; 2 bedrooms; 2 baths; sleeps 6',
      validation: 'Exact Grand Caribbean 4007 description + STR-200105680 + Sand Key manager match',
      checked,
      secondary: true,
    },
    {
      channel: 'Marriott Homes & Villas',
      url: 'https://homes-and-villas.marriott.com/en/properties/40303313-port-aransas-incredible-ocean-views-direct-beach-access-pool',
      details: 'Incredible Ocean Views, Direct Beach Access, Pool; alternate loyalty/booking channel',
      validation: 'Exact Sand Key property title, fourth-floor Grand Caribbean description, 2 BR / 2 BA / 6-guest layout',
      checked,
      secondary: true,
    },
    {
      channel: 'Skyscanner comparison',
      url: 'https://www.skyscanner.es/hoteles/estados-unidos/port-aransas-hoteles/grand-caribbean-4007/ht-217075775',
      details: 'Exact Grand Caribbean 4007 meta-search page comparing prices across hundreds of booking sites',
      validation: 'Exact property title + 5495 Texas 361 address',
      checked,
      secondary: true,
    },
    {
      channel: 'Trivago comparison',
      url: 'https://www.trivago.com/es-US/oar/casa-o-apartamento-entero-grand-caribbean-4007-top-floor-condo-with-amazing-beach-views-port-aransas?search=100-27709178',
      details: 'Grand Caribbean 4007 price/availability comparison page',
      validation: 'Exact unit title + top-floor Port Aransas condo identity',
      checked,
      secondary: true,
    },
    {
      channel: 'HiChee comparison',
      url: 'https://hichee.com/listings/35288150',
      details: 'Grand Caribbean 4007 comparison page covering Airbnb, Booking.com, Vrbo and other booking options',
      validation: 'Exact unit title + 2 BR / 2 BA / 6-guest layout',
      checked,
      secondary: true,
    },
  ];

  unit.bookings = unit.bookings || [];
  const seen = new Set(unit.bookings.map((booking) => booking.url));
  additions.forEach((booking) => {
    if (!seen.has(booking.url)) {
      unit.bookings.push(booking);
      seen.add(booking.url);
    }
  });

  unit.note = 'Deep booking audit confirms GC4007 is managed by Sand Key Vacation Rentals. The direct Sand Key Guesty booking page is shown first, followed by independent OTA and comparison routes. STR 200105680, the exact unit name, fourth-floor 2 BR / 2 BA layout and Sand Key host identity were used to reject fuzzy complex-level matches.';

  if (window.GC_BOOKING_AUDIT) {
    const aliases = {
      'Sand Key direct': 'Sand Key',
      'Sand Key monthly rates': 'Sand Key',
      'Vrbo / Silver Sands': 'Vrbo',
      'Vrbo / Silver Sands unit selector': 'Vrbo',
    };
    const platforms = [...new Set(unit.bookings.map((booking) => aliases[booking.channel] || booking.channel))];
    window.GC_BOOKING_AUDIT['4007'] = {
      ...(window.GC_BOOKING_AUDIT['4007'] || {}),
      checked,
      platforms,
      platformCount: platforms.length,
      multiPlatform: platforms.length >= 2,
    };
  }
})();
