window.GRAND_CARIBBEAN = (() => {
  const baseUnits = [];
  for (let floor = 1; floor <= 4; floor += 1) {
    for (let stack = 1; stack <= 10; stack += 1) {
      const id = `${floor}0${String(stack).padStart(2, '0')}`;
      baseUnits.push({
        id,
        floor,
        stack,
        bedrooms: null,
        baths: null,
        guests: null,
        title: `Grand Caribbean ${id}`,
        bookingUrl: null,
        sourceLabel: null,
        rentalReference: null,
        contextPhoto: null,
        note: 'Condo-specific details are being verified.',
        verified: false
      });
    }
  }

  const observed = (name, phone, maxOccupancy, strNumber) => ({
    name,
    phone,
    maxOccupancy,
    strNumber,
    observedDate: '2026-08-19',
    source: 'On-site rental placard photographed at the complex'
  });

  const verified = {
    '1002': {
      rentalReference: observed('Port Aransas Escapes', '361-749-3591', 8, '200105610')
    },
    '1003': {
      rentalReference: observed('Sand Key Realty', '361-749-4255', 6, '200105612')
    },
    '1004': {
      rentalReference: observed('Starkey Properties', '361-749-3591', 6, '200105614')
    },
    '1005': {
      title: 'Peace of the Sea GC1005', bedrooms: 2, baths: 2, guests: 6,
      bookingUrl: 'https://www.portaescapes.com/rentals/peace-of-the-sea-gc1005',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '1006': {
      rentalReference: observed('Silver Sands Vacation Rentals', '361-749-2600', 6, '200105618')
    },
    '1007': {
      title: 'Grand Caribbean GC1007', bedrooms: 2, baths: 2, guests: 6,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1007',
      sourceLabel: 'Port A Escapes', verified: true,
      rentalReference: observed('Sand Key Realty', '361-749-4255', 6, '200105620')
    },
    '1008': {
      title: 'Grand Caribbean GC1008', bedrooms: 2, baths: 2, guests: 6,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1008',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '1009': {
      title: 'A Change In Latitude GC1009', bedrooms: 3, baths: 3, guests: 7,
      bookingUrl: 'https://www.portaescapes.com/rentals/a-change-in-latitude-gc1009',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '2002': {
      rentalReference: observed('Zenaida Castillo', '361-389-4507', 8, '200105630')
    },
    '2003': {
      rentalReference: observed('Port A Retreat', '361-649-2776', 6, '200105633')
    },
    '3007': {
      title: 'Grand Caribbean GC3007', bedrooms: 2, baths: 2, guests: 4,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc3007',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '3008': {
      title: 'Grand Caribbean GC3008', bedrooms: 2, baths: 2, guests: 4,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc3008',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '3010': {
      rentalReference: observed('Starkey Properties', '361-749-3591', 8, '200105666')
    },
    '4001': {
      title: 'Grand Caribbean GC4001', bedrooms: 3, baths: null, guests: null,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc4001',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '4010': {
      contextPhoto: {
        src: '../../assets/photos/fourth-floor-breezeway.webp',
        alt: 'Fourth-floor Grand Caribbean breezeway beside unit 4010 overlooking green marshland',
        caption: 'Fourth-floor breezeway beside unit 4010. This is an exterior/common-area reference photo, not an interior condo photo.'
      }
    }
  };

  const units = baseUnits.map((unit) => ({ ...unit, ...(verified[unit.id] || {}) }));
  return {
    property: {
      name: 'Grand Caribbean at Dune Crest',
      address: '5495 State Highway 361, Port Aransas, TX 78373',
      unitCount: 40,
      amenities: ['Gulf-front location', 'Beach boardwalk', 'Community pool', 'BBQ area', 'Outdoor shower'],
      photos: [
        {
          src: 'assets/photos/jolly-yellow-exterior.webp',
          alt: 'Yellow Grand Caribbean exterior and white railings seen from an upper floor',
          caption: 'The complex’s sunny yellow exterior from an upper-floor breezeway.'
        },
        {
          src: 'assets/photos/upper-floor-view.webp',
          alt: 'View from an upper floor across nearby homes, parking and coastal grassland',
          caption: 'Upper-floor view across the neighboring homes and coastal flats.'
        }
      ],
      disclaimer: 'Independent informational guide. Not the official HOA, property manager, or booking agent.'
    },
    units
  };
})();
