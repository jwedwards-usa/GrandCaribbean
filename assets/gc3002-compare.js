(() => {
  const checked = '2026-08-19';
  const unit = (window.GC_UNITS || []).find((candidate) => candidate.unit === '3002');
  if (!unit) return;

  const booking = {
    channel: 'Skyscanner comparison',
    url: 'https://www.skyscanner.com.au/hotels/united-states/port-aransas-hotels/grand-carribean-agc-3002/ht-158617952',
    details: 'Exact AGC 3002 meta-search page comparing rates across hundreds of supplier sites',
    validation: 'Exact Grand Carribean AGC 3002 title + 5495 State Highway 361 address match',
    checked,
    secondary: true,
  };

  unit.bookings = unit.bookings || [];
  if (!unit.bookings.some((candidate) => candidate.url === booking.url)) {
    unit.bookings.push(booking);
  }

  unit.note = `${unit.note || ''} Skyscanner also has an exact AGC 3002 comparison page that searches hundreds of supplier sites; it is labeled as a comparison engine, not a direct manager.`.trim();

  if (window.GC_BOOKING_AUDIT) {
    const aliases = {
      'Vrbo / Silver Sands': 'Vrbo',
      'Vrbo / Silver Sands unit selector': 'Vrbo',
    };
    const platforms = [...new Set(unit.bookings.map((candidate) => aliases[candidate.channel] || candidate.channel))];
    window.GC_BOOKING_AUDIT['3002'] = {
      ...(window.GC_BOOKING_AUDIT['3002'] || {}),
      checked,
      platforms,
      platformCount: platforms.length,
      multiPlatform: platforms.length >= 2,
    };
  }
})();
