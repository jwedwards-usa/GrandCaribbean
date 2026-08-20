(() => {
  const checked = '2026-08-19';
  const units = window.GC_UNITS || [];
  const byUnit = new Map(units.map((unit) => [unit.unit, unit]));

  const additions = {
    '2001': [
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/1251486128823478988',
        details: '2001GC: Turtley Awesome; 8 guests; 3 bedrooms; 3 baths',
        validation: 'Exact unit/name + Life in Paradise host match',
        checked,
        secondary: true,
      },
      {
        channel: 'Vrbo',
        url: 'https://www.vrbo.com/4180112',
        details: '2001GC: Turtley Awesome; alternate booking platform',
        validation: 'Exact unit/name match',
        checked,
        secondary: true,
      },
    ],
    '2002': [
      {
        channel: 'Vrbo',
        url: 'https://www.vrbo.com/9662522ha',
        details: 'Grand Caribbean condo with ocean views; 3 bedrooms; 3 baths',
        validation: 'Exact title/layout + STR 200105630 match',
        checked,
        secondary: true,
      },
      {
        channel: 'Booking.com',
        url: 'https://www.booking.com/hotel/us/beachfront-port-aransas-condo-with-ocean-views.html',
        details: 'Beachfront Port Aransas condo with ocean views; Evolve-managed mirror',
        validation: 'Exact title/operator/layout match to Unit 2002',
        checked,
        secondary: true,
      },
    ],
    '2005': [
      {
        channel: 'Stayz',
        url: 'https://www.stayz.com.au/d/137423/grand-caribbean-at-dune-crest',
        details: 'Grand Caribbean results currently surface Indigo Breeze; select the Indigo Breeze card to compare dates/pricing',
        validation: 'Exact Indigo Breeze title + 2 BR / 2 BA / sleeps 4 match in Stayz inventory',
        checked,
        secondary: true,
      },
    ],
    '2008': [
      {
        channel: 'Silver Sands',
        url: 'https://silversandsvacationrentals.com/property/af70d671-b8f6-4e8c-8ba1-77a55f2ea397',
        details: 'Shore Thang; direct manager booking page',
        validation: 'Exact property + manager match',
        checked,
        secondary: false,
      },
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/1155872932386109741',
        details: 'Shore Thang; 4 guests; 2 bedrooms; 2 baths',
        validation: 'Exact STR 200105642 + Silver Sands host match',
        checked,
        secondary: true,
      },
      {
        channel: 'Vrbo',
        url: 'https://www.vrbo.com/4002543',
        details: 'Shore Thang; 2 bedrooms; 2 baths; sleeps 4',
        validation: 'Exact STR 200105642 match',
        checked,
        secondary: true,
      },
    ],
    '2009': [
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/17775144',
        details: 'Grand Caribbean Unit 2009; alternate short-term booking channel',
        validation: 'Exact STR 200105644 match',
        checked,
        secondary: true,
      },
      {
        channel: 'Sand Key Vacation Rentals',
        url: 'https://www.sandkeyvacationrentals.com/winter-texan-monthly-rents',
        details: 'Direct manager winter/monthly inventory page lists Grand Caribbean Unit 2009 with Book Now',
        validation: 'Exact unit + 3 BR / 3 BA / 8-guest match',
        checked,
        secondary: false,
      },
    ],
    '3002': [
      {
        channel: 'Ostrovok',
        url: 'https://ostrovok.ru/hotel/united_states_of_america/port_aransas/mid8760464/grand_carribean_agc_3002_2/',
        details: 'Grand Carribean AGC 3002; independent non-Expedia booking inventory with live room pricing',
        validation: 'Exact property title + 5495 State Highway 361 address match',
        checked,
        secondary: true,
      },
      {
        channel: 'T-Bank Travel',
        url: 'https://www.tbank.ru/travel/hotels/new/hotels/1843624/',
        details: 'Grand Carribean AGC 3002; independent travel-booking inventory',
        validation: 'Exact property title + Port Aransas address match',
        checked,
        secondary: true,
      },
      {
        channel: 'JTB',
        url: 'https://www.jtb.co.jp/ovs_htl/detail/search_detail/1066531/',
        details: 'Grand Carribean AGC 3002; separate international booking channel',
        validation: 'Exact property title + 5495 State Highway 361 address match',
        checked,
        secondary: true,
      },
      {
        channel: 'Hotels.ru',
        url: 'https://www.hotels.ru/rus/hotels/united_states/port_aransas/grand_carribean_agc_3002.htm',
        details: 'Grand Carribean AGC 3002; separate booking/payment route outside Expedia inventory',
        validation: 'Exact property title match',
        checked,
        secondary: true,
      },
    ],
    '3004': [
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/1081869189988434900',
        details: "Gulf'n My Life Away; 6 guests; 2 bedrooms; 2 baths",
        validation: 'Exact property name + Starkey/Portoro operator match',
        checked,
        secondary: true,
      },
    ],
    '3007': [
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/1421165774159268720',
        details: 'Grand Caribbean GC3007; alternate booking channel',
        validation: 'Exact STR 200105660 match',
        checked,
        secondary: true,
      },
      {
        channel: 'Vrbo',
        url: 'https://www.vrbo.com/4502644',
        details: 'Grand Caribbean GC3007; alternate booking channel',
        validation: 'Exact STR 200105660 + Port A Escapes listing match',
        checked,
        secondary: true,
      },
    ],
    '4001': [
      {
        channel: 'Airbnb',
        url: 'https://www.airbnb.com/rooms/1329922891657403234',
        details: 'Grand Caribbean GC4001; 8 guests; 3 bedrooms; 3 baths',
        validation: 'Exact STR 200105668 match',
        checked,
        secondary: true,
      },
      {
        channel: 'Vrbo',
        url: 'https://www.vrbo.com/4347177',
        details: 'Grand Caribbean GC4001; alternate booking channel',
        validation: 'Exact STR 200105668 + Port A Escapes listing match',
        checked,
        secondary: true,
      },
    ],
  };

  const weakerUrlsToReplace = new Set([
    'https://www.vrbo.com/en-sg/pdp/lo/105173239',
    'https://hotels.com.au/property/16881544/grand-carribean-agc-3002',
  ]);

  Object.entries(additions).forEach(([unitNumber, newBookings]) => {
    const unit = byUnit.get(unitNumber);
    if (!unit) return;

    unit.bookings = (unit.bookings || []).filter((booking) => !weakerUrlsToReplace.has(booking.url));
    const seen = new Set(unit.bookings.map((booking) => booking.url));

    newBookings.forEach((booking) => {
      if (!seen.has(booking.url)) {
        unit.bookings.push(booking);
        seen.add(booking.url);
      }
    });
  });

  const shoreThang = byUnit.get('2008');
  if (shoreThang) shoreThang.name = 'Shore Thang';

  const agc3002 = byUnit.get('3002');
  if (agc3002) {
    agc3002.note = 'Focused Aug. 19 follow-up found several exact non-Expedia booking distributors for AGC 3002. Expedia remains as the original listing source, but its Hotels.com mirror is omitted as redundant. No independently indexed owner-direct or local-manager book-now page for exact Unit 3002 was validated, so the additional links are labeled as third-party distributors rather than direct booking.';
  }

  const platformAliases = {
    'Vrbo / Silver Sands': 'Vrbo',
    'Vrbo / Silver Sands unit selector': 'Vrbo',
  };

  const platformName = (booking) => platformAliases[booking.channel] || booking.channel;

  window.GC_BOOKING_AUDIT = {};
  units.filter((unit) => unit.status === 'verified').forEach((unit) => {
    const platforms = [...new Set((unit.bookings || []).map(platformName))];
    window.GC_BOOKING_AUDIT[unit.unit] = {
      checked,
      platforms,
      platformCount: platforms.length,
      multiPlatform: platforms.length >= 2,
    };
  });

  const unit1010 = window.GC_BOOKING_AUDIT['1010'];
  if (unit1010) {
    unit1010.note = 'Only one independently verified booking platform surfaced in the Aug. 19 audit. Port A Escapes has a live calendar, but no exact Airbnb, Vrbo, Booking.com or Expedia mirror was validated.';
  }
})();
