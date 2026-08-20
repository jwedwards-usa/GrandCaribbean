(() => {
  const checked = '2026-08-20';
  const units = window.GC_UNITS || [];
  const byUnit = new Map(units.map((unit) => [unit.unit, unit]));

  const addBooking = (unit, booking, { first = false } = {}) => {
    if (!unit) return;
    unit.bookings = unit.bookings || [];
    if (unit.bookings.some((existing) => existing.url === booking.url)) return;
    if (first) unit.bookings.unshift(booking);
    else unit.bookings.push(booking);
  };

  const unit2009 = byUnit.get('2009');
  addBooking(unit2009, {
    channel: 'Sand Key direct',
    url: 'https://sandkeyvacationrentals.guestybookings.com/en/properties/64ef7180f526ff0042908733',
    details: 'Grand Caribbean ocean-view condo; direct Sand Key Vacation Rentals Guesty booking page',
    validation: 'Sand Key monthly page names Grand Caribbean Unit 2009 and its Book Now button resolves to this exact Guesty property; 3 BR / 3 BA / 8 guests',
    checked,
    secondary: false,
  }, { first: true });

  if (unit2009) {
    unit2009.note = 'Sand Key Vacation Rentals is confirmed as the current manager for GC2009. The exact Sand Key Guesty booking page is shown first, with the Sand Key winter/monthly page and independent OTA links retained for price comparison.';
  }

  const unit1003 = byUnit.get('1003');
  addBooking(unit1003, {
    channel: 'Life in Paradise direct',
    url: 'https://www.lifeinparadise.com/port-aransas-vacation-rentals/1003gc-goode-living',
    details: '1003GC Goode Living; current direct manager booking page',
    validation: 'Life in Paradise promoted exact Grand Caribbean #1003 / Goode Living with this direct URL on July 28, 2026; exact 2 BR / 2 BA / sleeps 6 identity',
    checked,
    secondary: false,
  }, { first: true });
  addBooking(unit1003, {
    channel: 'Vrbo / Life in Paradise',
    url: 'https://www.vrbo.com/es-es/p5266160vb',
    details: '1003GC Goode Living; current Life in Paradise-distributed Vrbo listing',
    validation: 'Exact 1003GC / Grand Caribbean #1003 / Goode Living title; current listing requires Life in Paradise rental agreement',
    checked,
    secondary: true,
  });

  if (unit1003) {
    unit1003.note = 'GC1003 has a live manager-attribution conflict worth preserving rather than hiding. The Aug. 19 onsite placard names Sand Key Realty, and the older exact Airbnb/Vrbo listings are Sand Key-hosted. However, Life in Paradise was actively promoting exact GC1003 / Goode Living on July 28, 2026 and a newer exact Vrbo listing requires a Life in Paradise rental agreement. Both sets of links are retained for comparison; confirm the currently authorized manager and final terms before paying.';
  }

  const aliases = {
    'Sand Key direct': 'Sand Key',
    'Sand Key monthly rates': 'Sand Key',
    'Sand Key Vacation Rentals': 'Sand Key',
    'Life in Paradise direct': 'Life in Paradise',
    'Vrbo / Life in Paradise': 'Vrbo',
    'Vrbo / Silver Sands': 'Vrbo',
    'Vrbo / Silver Sands unit selector': 'Vrbo',
  };

  ['1003', '2009'].forEach((unitNumber) => {
    const unit = byUnit.get(unitNumber);
    if (!unit || !window.GC_BOOKING_AUDIT) return;
    const platforms = [...new Set((unit.bookings || []).map((booking) => aliases[booking.channel] || booking.channel))];
    window.GC_BOOKING_AUDIT[unitNumber] = {
      ...(window.GC_BOOKING_AUDIT[unitNumber] || {}),
      checked,
      platforms,
      platformCount: platforms.length,
      multiPlatform: platforms.length >= 2,
    };
  });
})();
