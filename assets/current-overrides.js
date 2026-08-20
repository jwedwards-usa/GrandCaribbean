(()=>{
  const meta=window.GC_META, units=window.GC_UNITS;
  if(!meta||!Array.isArray(units))return;

  meta.methodology='Booking links are shown only for exact-unit matches and were checked Aug. 19, 2026. On-site signs and booking-site capacity are kept separate when they differ. Property values are estimates; published assessment figures appear only when an exact-unit source was available. Verify availability, STR status and county values with the linked source.';

  const byUnit=id=>units.find(u=>u.unit===id);

  const u1003=byUnit('1003');
  if(u1003){
    const other=(u1003.bookings||[]).filter(b=>b.channel!=='Vrbo').map(b=>({...b,secondary:true}));
    u1003.bookings=[{
      channel:'Vrbo',
      url:'https://www.vrbo.com/3600060',
      details:'2 BR / 2 BA; sleeps 6; managed by Sand Key Vacation Rentals',
      validation:'Exact unit match',
      checked:'2026-08-19',
      secondary:false
    },...other];
  }

  const u4007=byUnit('4007');
  if(u4007){
    const other=(u4007.bookings||[]).filter(b=>b.url!=='https://www.vrbo.com/2620367').map(b=>({...b,secondary:true}));
    u4007.bookings=[{
      channel:'Vrbo',
      url:'https://www.vrbo.com/2620367',
      details:'2 BR / 2 BA; sleeps 6; managed by Sand Key Vacation Rentals',
      validation:'Exact unit + STR match',
      checked:'2026-08-19',
      secondary:false
    },...other];
  }
})();
