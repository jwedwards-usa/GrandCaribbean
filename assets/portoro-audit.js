(() => {
  const checked = '2026-08-19';
  const units = window.GC_UNITS || [];
  const byUnit = new Map(units.map((unit) => [unit.unit, unit]));

  const portoroBookings = {
    '3004': {
      channel: 'Portoro',
      url: 'https://www.portoro.com/properties/gulfn-my-life-away-starkey-by-portoro',
      details: "Gulf'n My Life Away; direct Starkey Properties by Portoro booking; 2 bedrooms; 2 baths; up to 6 guests",
      validation: 'Exact property name + Grand Caribbean Condominiums + Starkey/Portoro manager match',
      checked,
      secondary: false,
    },
    '3010': {
      channel: 'Portoro',
      url: 'https://www.portoro.com/properties/beach-haven-starkey-by-portoro',
      details: 'Beach Haven; direct Starkey Properties by Portoro booking; 3 bedrooms; 3 baths; up to 8 guests',
      validation: 'Exact Beach Haven identity + Grand Caribbean Condominiums + third-floor beachfront match',
      checked,
      secondary: false,
    },
  };

  Object.entries(portoroBookings).forEach(([unitNumber, booking]) => {
    const unit = byUnit.get(unitNumber);
    if (!unit) return;

    unit.bookings = unit.bookings || [];
    if (!unit.bookings.some((candidate) => candidate.url === booking.url)) {
      unit.bookings.push(booking);
    }
  });

  const aliases = {
    'Vrbo / Silver Sands': 'Vrbo',
    'Vrbo / Silver Sands unit selector': 'Vrbo',
  };

  Object.keys(portoroBookings).forEach((unitNumber) => {
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
