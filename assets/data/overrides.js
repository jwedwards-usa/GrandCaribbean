(() => {
  const DEFAULT_CHECKED = '2026-08-19';
  const units = window.GC_UNITS || [];
  const byUnit = new Map(units.map((unit) => [unit.unit, unit]));

  const platformAliases = {
    'Sand Key direct': 'Sand Key',
    'Sand Key monthly rates': 'Sand Key',
    'Sand Key Vacation Rentals': 'Sand Key',
    'Life in Paradise direct': 'Life in Paradise',
    'Vrbo / Life in Paradise': 'Vrbo',
    'Vrbo / Silver Sands': 'Vrbo',
    'Vrbo / Silver Sands unit selector': 'Vrbo',
  };

  const checkedByUnit = {
    '1003': '2026-08-20',
    '2009': '2026-08-20',
  };

  const overrides = {
    '1003': {
      prepend: [
        {
          channel: 'Life in Paradise direct',
          url: 'https://www.lifeinparadise.com/port-aransas-vacation-rentals/1003gc-goode-living',
          details: '1003GC Goode Living; current direct manager booking page',
          validation: 'Exact GC1003 / Goode Living identity; 2 BR / 2 BA / sleeps 6',
          checked: '2026-08-20',
          secondary: false,
        },
      ],
      append: [
        {
          channel: 'Vrbo / Life in Paradise',
          url: 'https://www.vrbo.com/es-es/p5266160vb',
          details: '1003GC Goode Living; current Life in Paradise-distributed Vrbo listing',
          validation: 'Exact 1003GC / Goode Living title; Life in Paradise rental agreement',
          checked: '2026-08-20',
          secondary: true,
        },
      ],
      note: 'Manager attribution is mixed. The Aug. 19 onsite placard and older exact listings reference Sand Key, while current exact listings also identify Life in Paradise. Confirm the authorized manager and final terms before payment.',
    },
    '1005': {
      note: 'The current listing sleeps 6; the onsite placard posts a maximum occupancy of 8 and a different booking contact. Verify current legal occupancy and manager before booking.',
    },
    '2001': {
      append: [
        {
          channel: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/1251486128823478988',
          details: '2001GC: Turtley Awesome; 8 guests; 3 bedrooms; 3 baths',
          validation: 'Exact unit/name + Life in Paradise host match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Vrbo',
          url: 'https://www.vrbo.com/4180112',
          details: '2001GC: Turtley Awesome; alternate booking platform',
          validation: 'Exact unit/name match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '2002': {
      append: [
        {
          channel: 'Vrbo',
          url: 'https://www.vrbo.com/9662522ha',
          details: 'Grand Caribbean condo with ocean views; 3 bedrooms; 3 baths',
          validation: 'Exact title/layout + STR 200105630 match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Booking.com',
          url: 'https://www.booking.com/hotel/us/beachfront-port-aransas-condo-with-ocean-views.html',
          details: 'Beachfront Port Aransas condo with ocean views; Evolve-managed mirror',
          validation: 'Exact title/operator/layout match to Unit 2002',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '2005': {
      append: [
        {
          channel: 'Stayz',
          url: 'https://www.stayz.com.au/d/137423/grand-caribbean-at-dune-crest',
          details: 'Grand Caribbean results surface Indigo Breeze for date and price comparison',
          validation: 'Exact Indigo Breeze title + 2 BR / 2 BA / sleeps 4 match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
      note: 'The current listing sleeps 4; the onsite placard posts a maximum occupancy of 8. Verify current legal occupancy before booking.',
    },
    '2008': {
      removeUrls: [
        'https://www.vrbo.com/en-sg/pdp/lo/105173239',
      ],
      name: 'Shore Thang',
      prepend: [
        {
          channel: 'Silver Sands',
          url: 'https://silversandsvacationrentals.com/property/af70d671-b8f6-4e8c-8ba1-77a55f2ea397',
          details: 'Shore Thang; direct manager booking page',
          validation: 'Exact property + manager match',
          checked: DEFAULT_CHECKED,
          secondary: false,
        },
      ],
      append: [
        {
          channel: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/1155872932386109741',
          details: 'Shore Thang; 4 guests; 2 bedrooms; 2 baths',
          validation: 'Exact STR 200105642 + Silver Sands host match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Vrbo',
          url: 'https://www.vrbo.com/4002543',
          details: 'Shore Thang; 2 bedrooms; 2 baths; sleeps 4',
          validation: 'Exact STR 200105642 match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '2009': {
      prepend: [
        {
          channel: 'Sand Key direct',
          url: 'https://sandkeyvacationrentals.guestybookings.com/en/properties/64ef7180f526ff0042908733',
          details: 'Grand Caribbean Unit 2009; direct Sand Key Vacation Rentals booking page',
          validation: 'Exact Unit 2009 + 3 BR / 3 BA / 8-guest match',
          checked: '2026-08-20',
          secondary: false,
        },
        {
          channel: 'Sand Key monthly rates',
          url: 'https://www.sandkeyvacationrentals.com/winter-texan-monthly-rents',
          details: 'Grand Caribbean Unit 2009; direct manager winter/monthly inventory',
          validation: 'Exact unit + 3 BR / 3 BA / 8-guest match',
          checked: '2026-08-20',
          secondary: true,
        },
      ],
      append: [
        {
          channel: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/17775144',
          details: 'Grand Caribbean Unit 2009; alternate short-term booking channel',
          validation: 'Exact STR 200105644 match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
      note: 'Sand Key Vacation Rentals is confirmed as the current manager for GC2009. Direct, monthly, and independent OTA links are retained for comparison.',
    },
    '3002': {
      removeUrls: [
        'https://hotels.com.au/property/16881544/grand-carribean-agc-3002',
      ],
      append: [
        {
          channel: 'Ostrovok',
          url: 'https://ostrovok.ru/hotel/united_states_of_america/port_aransas/mid8760464/grand_carribean_agc_3002_2/',
          details: 'Grand Carribean AGC 3002; independent non-Expedia booking inventory',
          validation: 'Exact property title + 5495 State Highway 361 address match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'T-Bank Travel',
          url: 'https://www.tbank.ru/travel/hotels/new/hotels/1843624/',
          details: 'Grand Carribean AGC 3002; independent travel-booking inventory',
          validation: 'Exact property title + Port Aransas address match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'JTB',
          url: 'https://www.jtb.co.jp/ovs_htl/detail/search_detail/1066531/',
          details: 'Grand Carribean AGC 3002; separate international booking channel',
          validation: 'Exact property title + 5495 State Highway 361 address match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Hotels.ru',
          url: 'https://www.hotels.ru/rus/hotels/united_states/port_aransas/grand_carribean_agc_3002.htm',
          details: 'Grand Carribean AGC 3002; separate booking/payment route outside Expedia inventory',
          validation: 'Exact property title match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Skyscanner comparison',
          url: 'https://www.skyscanner.com.au/hotels/united-states/port-aransas-hotels/grand-carribean-agc-3002/ht-158617952',
          details: 'Exact AGC 3002 meta-search page comparing supplier rates',
          validation: 'Exact title + 5495 State Highway 361 address match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
      note: 'Exact non-Expedia distributors and a Skyscanner comparison page were verified for AGC 3002. No independently indexed owner-direct or local-manager booking page was validated.',
    },
    '3004': {
      prepend: [
        {
          channel: 'Portoro',
          url: 'https://www.portoro.com/properties/gulfn-my-life-away-starkey-by-portoro',
          details: "Gulf'n My Life Away; direct Starkey Properties by Portoro booking; 2 bedrooms; 2 baths; up to 6 guests",
          validation: 'Exact property name + Grand Caribbean + Starkey/Portoro manager match',
          checked: DEFAULT_CHECKED,
          secondary: false,
        },
      ],
      append: [
        {
          channel: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/1081869189988434900',
          details: "Gulf'n My Life Away; 6 guests; 2 bedrooms; 2 baths",
          validation: 'Exact property name + Starkey/Portoro operator match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '3006': {
      note: 'No exact current public booking page was verified on 2026-08-19. The onsite placard provides a rental contact, so the property history is retained for reference.',
    },
    '3007': {
      append: [
        {
          channel: 'Airbnb',
          url: 'https://www.airbnb.com/rooms/1421165774159268720',
          details: 'Grand Caribbean GC3007; alternate booking channel',
          validation: 'Exact STR 200105660 match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Vrbo',
          url: 'https://www.vrbo.com/4502644',
          details: 'Grand Caribbean GC3007; alternate booking channel',
          validation: 'Exact STR 200105660 + Port A Escapes listing match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '3010': {
      prepend: [
        {
          channel: 'Portoro',
          url: 'https://www.portoro.com/properties/beach-haven-starkey-by-portoro',
          details: 'Beach Haven; direct Starkey Properties by Portoro booking; 3 bedrooms; 3 baths; up to 8 guests',
          validation: 'Exact Beach Haven identity + Grand Caribbean + third-floor layout match',
          checked: DEFAULT_CHECKED,
          secondary: false,
        },
      ],
    },
    '4001': {
      append: [
        {
          channel: 'Vrbo',
          url: 'https://www.vrbo.com/4347177',
          details: 'Grand Caribbean GC4001; alternate booking channel',
          validation: 'Exact STR 200105668 + Port A Escapes listing match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
    },
    '4007': {
      prepend: [
        {
          channel: 'Sand Key direct',
          url: 'https://sandkeyvacationrentals.guestybookings.com/en/properties/64ef7b89a56b3c003457da94',
          details: 'Grand Caribbean Unit 4007; direct Sand Key Vacation Rentals booking page',
          validation: 'Exact Unit 4007 + Sand Key booking-engine match',
          checked: DEFAULT_CHECKED,
          secondary: false,
        },
        {
          channel: 'Sand Key monthly rates',
          url: 'https://www.sandkeyvacationrentals.com/winter-texan-monthly-rents',
          details: 'Grand Caribbean Unit 4007; direct manager winter/monthly rates',
          validation: 'Exact unit + 2 BR / 2 BA / 6-guest match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
      append: [
        {
          channel: 'Expedia',
          url: 'https://www.expedia.com/Corpus-Christi-Hotels-Grand-Caribbean-4007.h74565764.Hotel-Information',
          details: 'Grand Caribbean 4007; 2 bedrooms; 2 baths; sleeps 6',
          validation: 'Exact unit description + STR 200105680 + Sand Key manager match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Marriott Homes & Villas',
          url: 'https://homes-and-villas.marriott.com/en/properties/40303313-port-aransas-incredible-ocean-views-direct-beach-access-pool',
          details: 'Grand Caribbean 4007; alternate loyalty/booking channel',
          validation: 'Exact Sand Key title + fourth-floor 2 BR / 2 BA / 6-guest match',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Skyscanner comparison',
          url: 'https://www.skyscanner.es/hoteles/estados-unidos/port-aransas-hoteles/grand-caribbean-4007/ht-217075775',
          details: 'Exact Grand Caribbean 4007 meta-search page',
          validation: 'Exact property title + 5495 Texas 361 address',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'Trivago comparison',
          url: 'https://www.trivago.com/es-US/oar/casa-o-apartamento-entero-grand-caribbean-4007-top-floor-condo-with-amazing-beach-views-port-aransas?search=100-27709178',
          details: 'Grand Caribbean 4007 price and availability comparison page',
          validation: 'Exact unit title + top-floor Port Aransas condo identity',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
        {
          channel: 'HiChee comparison',
          url: 'https://hichee.com/listings/35288150',
          details: 'Grand Caribbean 4007 comparison page across major booking options',
          validation: 'Exact unit title + 2 BR / 2 BA / 6-guest layout',
          checked: DEFAULT_CHECKED,
          secondary: true,
        },
      ],
      note: 'GC4007 is managed by Sand Key Vacation Rentals. Direct Sand Key links are shown first, followed by exact OTA and comparison routes.',
    },
  };

  const mergeBookings = (existingBookings, additions, prepend) => {
    const existing = existingBookings || [];
    const seenUrls = new Set(existing.map((booking) => booking.url));
    const uniqueAdditions = (additions || []).filter((booking) => {
      if (seenUrls.has(booking.url)) {
        return false;
      }

      seenUrls.add(booking.url);
      return true;
    });

    return prepend
      ? [...uniqueAdditions, ...existing]
      : [...existing, ...uniqueAdditions];
  };

  Object.entries(overrides).forEach(([unitNumber, override]) => {
    const unit = byUnit.get(unitNumber);

    if (!unit) {
      return;
    }

    if (override.removeUrls?.length) {
      const removedUrls = new Set(override.removeUrls);
      unit.bookings = (unit.bookings || []).filter((booking) => !removedUrls.has(booking.url));
    }

    unit.bookings = mergeBookings(unit.bookings, override.prepend, true);
    unit.bookings = mergeBookings(unit.bookings, override.append, false);

    if (Object.prototype.hasOwnProperty.call(override, 'name')) {
      unit.name = override.name;
    }

    if (Object.prototype.hasOwnProperty.call(override, 'note')) {
      unit.note = override.note;
    }
  });

  window.GC_BOOKING_AUDIT = Object.fromEntries(
    units
      .filter((unit) => unit.status === 'verified')
      .map((unit) => {
        const platforms = [...new Set(
          (unit.bookings || []).map(
            (booking) => platformAliases[booking.channel] || booking.channel,
          ),
        )];

        return [
          unit.unit,
          {
            checked: checkedByUnit[unit.unit] || DEFAULT_CHECKED,
            platforms,
            platformCount: platforms.length,
            multiPlatform: platforms.length >= 2,
          },
        ];
      }),
  );

  if (window.GC_BOOKING_AUDIT['1010']) {
    window.GC_BOOKING_AUDIT['1010'].note = 'Port A Escapes is the only independently verified booking platform found for GC1010 in the Aug. 19 review.';
  }
})();
