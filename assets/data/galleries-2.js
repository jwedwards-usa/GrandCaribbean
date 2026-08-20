(() => {
  const lifeInParadisePhoto = (id, index) => ({
    src: `https://images.rezfusion.com/?optimize=true&quality=70&rotate=true&settings=default&source=https%3A%2F%2Fgallery.streamlinevrs.com%2Funits-gallery%2F00%2F0D%2F8B%2Fimage_${id}.jpeg&width=900`,
    alt: `Turtley Awesome 2001 rental listing photo ${index + 1}`,
    caption: `Life In Paradise listing photo ${index + 1}.`,
  });

  const turtleyAwesomeImageIds = [
    '167111013',
    '167111012',
    '167384344',
    '167384345',
    '167384346',
    '167384347',
    '167384348',
    '167384349',
    '167384350',
    '167384351',
    '167384352',
    '167384353',
    '167384354',
    '167384355',
    '167384356',
    '167454762',
    '167454763',
    '167454764',
    '167454765',
    '167384360',
    '167384361',
    '167384362',
    '167384363',
    '167384364',
    '167384365',
    '167384367',
    '167111011',
    '167111014',
    '167111015',
  ];

  window.GC_GALLERIES = Object.assign(window.GC_GALLERIES || {}, {
    2001: {
      sourceLabel: 'Life In Paradise — 2001GC Turtley Awesome',
      sourceUrl: 'https://www.lifeinparadise.com/port-aransas-vacation-rentals/2001gc-turtley-awesome',
      checked: '2026-08-19',
      imageDate: 'Not published by source',
      images: turtleyAwesomeImageIds.map(lifeInParadisePhoto),
    },
    2002: {
      sourceLabel: 'Airbnb — Grand Caribbean 2002',
      sourceUrl: 'https://www.airbnb.com/rooms/565431772518955675',
      checked: '2026-08-19',
      imageDate: 'Not published by source',
      images: [
        {
          src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-565431772518955675/original/136972cf-db5b-434a-a917-d3ca3cd2dae7.jpeg?im_w=720',
          alt: 'Grand Caribbean 2002 Airbnb listing photo 1',
          caption: 'Airbnb listing photo 1.',
        },
        {
          src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-565431772518955675/original/dc7150e3-74d4-4acc-8d48-f984ebafd0ce.jpeg?im_w=720',
          alt: 'Grand Caribbean 2002 Airbnb listing photo 2',
          caption: 'Airbnb listing photo 2.',
        },
        {
          src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-565431772518955675/original/0283ec19-d71e-4214-b488-11c28606d0bd.jpeg?im_w=720',
          alt: 'Grand Caribbean 2002 Airbnb listing photo 3',
          caption: 'Airbnb listing photo 3.',
        },
      ],
    },
    2005: {
      sourceLabel: 'Vrbo — Indigo Breeze 2005',
      sourceUrl: 'https://www.vrbo.com/3178380',
      checked: '2026-08-19',
      imageDate: 'Not published by source',
      images: [
        {
          src: 'https://media.vrbo.com/lodging/91000000/90210000/90201600/90201598/32f0a9ee.jpg?impolicy=resizecrop&ra=fit&rw=598',
          alt: 'Indigo Breeze 2005 Vrbo listing photo 1',
          caption: 'Vrbo listing photo 1.',
        },
        {
          src: 'https://media.vrbo.com/lodging/91000000/90210000/90201600/90201598/8d121f4a.jpg?impolicy=resizecrop&ra=fit&rw=297',
          alt: 'Indigo Breeze 2005 Vrbo listing photo 2',
          caption: 'Vrbo listing photo 2.',
        },
        {
          src: 'https://media.vrbo.com/lodging/91000000/90210000/90201600/90201598/0642c15c.jpg?impolicy=resizecrop&ra=fit&rw=297',
          alt: 'Indigo Breeze 2005 Vrbo listing photo 3',
          caption: 'Vrbo listing photo 3.',
        },
      ],
    },
    2008: {
      sourceLabel: 'Vrbo / Silver Sands — Condo #2008',
      sourceUrl: 'https://www.vrbo.com/en-sg/pdp/lo/105173239',
      checked: '2026-08-19',
      imageDate: 'Not published by source',
      images: [
        {
          src: 'https://images.trvl-media.com/lodging/106000000/105180000/105173300/105173239/1583717f.jpg?impolicy=resizecrop&ra=fit&rw=720',
          alt: 'Grand Caribbean Condo 2008 exact-unit listing photo',
          caption: 'Photo from the listing’s Condo #2008 gallery.',
        },
      ],
    },
    2009: {
      sourceLabel: 'PortAransas-US — Grand Caribbean 2009',
      sourceUrl: 'https://portaransas-us.com/en/p/villagrandcaribbean.html',
      checked: '2026-08-19',
      imageDate: 'Not published by source',
      images: [
        {
          src: 'https://portaransas-us.com/data/Photos/1920x1080w/16612/1661212/1661212080.JPEG',
          alt: 'Grand Caribbean 2009 exact-unit listing photo 1',
          caption: 'Exact-unit listing photo 1.',
        },
        {
          src: 'https://portaransas-us.com/data/Photos/1920x1080w/16612/1661212/1661212129.JPEG',
          alt: 'Grand Caribbean 2009 exact-unit listing photo 2',
          caption: 'Exact-unit listing photo 2.',
        },
        {
          src: 'https://portaransas-us.com/data/Photos/1920x1080w/16612/1661212/1661212064.JPEG',
          alt: 'Grand Caribbean 2009 exact-unit listing photo 3',
          caption: 'Exact-unit listing photo 3.',
        },
      ],
    },
  });
})();
