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
        note: 'Condo-specific details are being verified.',
        verified: false
      });
    }
  }

  const verified = {
    '1005': {
      title: 'Peace of the Sea GC1005', bedrooms: 2, baths: 2, guests: 6,
      bookingUrl: 'https://www.portaescapes.com/rentals/peace-of-the-sea-gc1005',
      sourceLabel: 'Port A Escapes', verified: true
    },
    '1007': {
      title: 'Grand Caribbean GC1007', bedrooms: 2, baths: 2, guests: 6,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc1007',
      sourceLabel: 'Port A Escapes', verified: true
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
    '4001': {
      title: 'Grand Caribbean GC4001', bedrooms: 3, baths: null, guests: null,
      bookingUrl: 'https://www.portaescapes.com/rentals/grand-caribbean-gc4001',
      sourceLabel: 'Port A Escapes', verified: true
    }
  };

  const units = baseUnits.map((unit) => ({ ...unit, ...(verified[unit.id] || {}) }));
  return {
    property: {
      name: 'Grand Caribbean at Dune Crest',
      address: '5495 State Highway 361, Port Aransas, TX 78373',
      unitCount: 40,
      amenities: ['Gulf-front location', 'Beach boardwalk', 'Community pool', 'BBQ area', 'Outdoor shower'],
      disclaimer: 'Independent informational guide. Not the official HOA, property manager, or booking agent.'
    },
    units
  };
})();
