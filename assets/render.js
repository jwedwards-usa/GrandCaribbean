(()=>{
const root=document.querySelector('#app')||document.body;
const meta=window.GC_META, units=window.GC_UNITS;
const statusLabel={verified:'Book online',contact:'Not available to rent','no-current':'No current booking link'};
const money=n=>n==null?'—':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unitHref=u=>`condos/${encodeURIComponent(u.unit)}.html`;
function approxSeries(r){
  const start=r.tableStartYear||2026, tax=Object.fromEntries(Object.entries(r.tax||{}).map(([k,v])=>[+k,+v]));
  const years=[]; for(let y=2026;y>=start;y--) years.push(y);
  const keys=Object.keys(tax).map(Number).sort((a,b)=>a-b); const latest=keys.length?Math.max(...keys):null;
  function taxBasis(y){
    if(tax[y]) return tax[y];
    const below=keys.filter(k=>k<y).pop(), above=keys.find(k=>k>y);
    if(below&&above){const t=(y-below)/(above-below);return Math.round(tax[below]+(tax[above]-tax[below])*t)}
    if(below) return tax[below]; if(above) return tax[above]; return null;
  }
  if(keys.length && r.currentApprox){
    const scale=r.currentApprox/tax[latest];
    return years.map(y=>({year:y,approx:y===2026?r.currentApprox:Math.round((taxBasis(Math.min(y,latest))*scale)/1000)*1000,published:tax[y]||null,pub:y===2026?'2026 preliminary':(tax[y]?'Published record':'Not available')}));
  }
  let historical=null;
  if(r.asking && r.asking.year<=start && r.asking.price) historical={year:r.asking.year,value:r.asking.price};
  if(r.lastSale && r.lastSale.price && r.lastSale.year<=start) historical={year:r.lastSale.year,value:r.lastSale.price};
  if(!historical) historical={year:start,value:Math.round(((r.currentApprox||0)*0.55)/1000)*1000};
  return years.map(y=>{
    const span=2026-historical.year||1, t=Math.max(0,Math.min(1,(y-historical.year)/span));
    const v=Math.round((historical.value+((r.currentApprox||historical.value)-historical.value)*t)/1000)*1000;
    return {year:y,approx:v,published:tax[y]||null,pub:y===2026?'2026 preliminary':(tax[y]?'Published record':'Not available')};
  });
}
function shell(content){return `<header class="top"><div class="wrap"><a class="brand" href="./">Grand Caribbean · Port A</a><small>Sources checked ${esc(meta.researchedOn)} · <a href="https://dunecrest.com/" target="_blank" rel="noopener">Dune Crest site</a></small></div></header>${content}<footer class="footer"><div class="wrap">Unofficial guide. Verify availability, prices, STR status and property records with the linked source. · <a href="https://dunecrest.com/" target="_blank" rel="noopener">Grand Caribbean at Dune Crest</a></div></footer>`}
function gallery(){
  const proxy=url=>`https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1100&q=70&output=webp`;
  const source='https://www.portaescapes.com/resort/grand-caribbean';
  const photos=[
    ['https://track-pm.s3.amazonaws.com/paescapes/image/ad43a160-278b-4588-8912-087686b0fd6f','Grand Caribbean exterior and pool'],
    ['https://track-pm.s3.amazonaws.com/paescapes/image/32756e67-0925-4894-8a42-9cd64c5d4fe0','Grand Caribbean beachfront pool and building'],
    ['https://track-pm.s3.amazonaws.com/paescapes/image/bcdb445f-74f3-4a3e-8717-8e6eabd6faeb','Boardwalk through the dunes at Grand Caribbean']
  ];
  return `<div class="gallery" aria-label="Grand Caribbean property photos">${photos.map(([src,alt])=>`<img src="${proxy(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`).join('')}</div><p class="source-note"><strong>Property photos:</strong> <a href="${source}" target="_blank" rel="noopener">Port A Escapes · Grand Caribbean</a> · <a href="https://dunecrest.com/" target="_blank" rel="noopener">Grand Caribbean at Dune Crest site</a>.</p>`;
}
function card(u){
  const title=u.name?`${u.unit} · ${esc(u.name)}`:`Condo ${u.unit}`;
  const occ=u.occupancy||u.placard?.maxOccupancy;
  const summary=u.status==='verified'?`${u.bookings.length} checked booking link${u.bookings.length===1?'':'s'}`:u.status==='contact'?'No live booking page':'Property and sale history';
  return `<article class="card" data-unit="${u.unit}" data-status="${u.status}" data-floor="${u.floor}" data-occ="${occ||0}"><span class="pill ${u.status}">${statusLabel[u.status]}</span><h2>${title}</h2><div class="facts"><span class="fact">${u.bedrooms} BR</span><span class="fact">${u.bathrooms} BA</span>${occ?`<span class="fact">Up to ${occ}</span>`:''}${u.str?`<span class="fact">STR ${esc(u.str)}</span>`:''}</div><p>${summary}</p><a class="open" href="${unitHref(u)}">View condo</a></article>`;
}
function landing(){
 document.title='Grand Caribbean Condo Guide | Port Aransas';
 const counts=Object.fromEntries(['verified','contact','no-current'].map(s=>[s,units.filter(u=>u.status===s).length]));
 root.innerHTML=shell(`<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><div class="eyebrow">Mustang Island · Port Aransas, Texas</div><h1>Grand Caribbean condo directory</h1><p>Search all ${units.length} condos. Compare rooms, guest capacity and current rental links; units without a live booking page include property history.</p><p><a class="action" href="https://dunecrest.com/" target="_blank" rel="noopener">Grand Caribbean at Dune Crest site ↗</a></p><div class="stats"><div class="stat"><strong>${counts.verified}</strong><br>online rentals</div><div class="stat"><strong>${counts.contact}</strong><br>not available to rent</div><div class="stat"><strong>${counts['no-current']}</strong><br>no current booking link</div></div></div><img src="${`https://images.weserv.nl/?url=${encodeURIComponent('https://track-pm.s3.amazonaws.com/paescapes/image/ad43a160-278b-4588-8912-087686b0fd6f')}&w=1200&q=72&output=webp`}" alt="Grand Caribbean beachfront condominium and pool"></div></section><main class="section" id="units"><div class="wrap"><div class="notice"><strong>Booking links:</strong> shown only for exact-unit matches. On-site occupancy and listing capacity stay separate when they differ.</div><div class="filters"><input id="q" type="search" placeholder="Search 3008, Beach Haven, STR…" aria-label="Search condos"><select id="status"><option value="">All rental states</option><option value="verified">Book online</option><option value="contact">Not available to rent</option><option value="no-current">No current booking link</option></select><select id="floor"><option value="">All floors</option>${[1,2,3,4].map(n=>`<option value="${n}">Floor ${n}</option>`).join('')}</select><select id="occ"><option value="">Any capacity</option><option value="4">4+ guests</option><option value="6">6+ guests</option><option value="8">8+ guests</option></select></div><div id="resultCount" class="source-note" aria-live="polite"></div><div id="cards" class="grid">${units.map(card).join('')}</div>${gallery()}<div class="method"><strong>Research notes.</strong> ${esc(meta.methodology)}</div></div></main>`);
 const q=document.querySelector('#q'),status=document.querySelector('#status'),floor=document.querySelector('#floor'),occ=document.querySelector('#occ'),cards=document.querySelector('#cards'),rc=document.querySelector('#resultCount');
 function filt(){const term=q.value.trim().toLowerCase(), st=status.value, fl=floor.value, oc=+occ.value||0; const list=units.filter(u=>{const occupancy=u.occupancy||u.placard?.maxOccupancy||0; const blob=[u.unit,u.name,u.str,u.placard?.manager,u.placard?.phone,...(u.bookings||[]).map(b=>`${b.channel} ${b.details}`)].filter(Boolean).join(' ').toLowerCase();return (!term||blob.includes(term))&&(!st||u.status===st)&&(!fl||String(u.floor)===fl)&&(!oc||occupancy>=oc)}); cards.innerHTML=list.map(card).join('')||'<div class="empty">No matching condos.</div>';rc.textContent=`Showing ${list.length} of ${units.length} condos`;}
 [q,status,floor,occ].forEach(el=>el.addEventListener('input',filt));filt();
}
function bookingBlock(u){
 if(u.status==='contact')return `<div class="notice warn"><strong>Not available to rent.</strong></div>`;
 if(!u.bookings.length)return `<div class="notice warn"><strong>No live booking page found.</strong> Checked ${esc(meta.researchedOn)}.</div>`;
 return `<div class="link-list">${u.bookings.map(b=>`<div class="booking"><strong>${esc(b.channel)}${b.secondary?' · secondary channel':''}</strong><p>${esc(b.details)}</p><a href="${esc(b.url)}" target="_blank" rel="noopener">Open ${esc(b.channel)}</a><div class="validation">${esc(b.validation)} · checked ${esc(b.checked)}</div></div>`).join('')}</div>`;
}
function placardBlock(u){if(!u.placard)return '';const p=u.placard;return `<h2>On-site rental sign</h2><div class="booking placard"><div class="badge-row">${p.maxOccupancy?`<span class="fact">Posted max ${p.maxOccupancy}</span>`:''}${p.str?`<span class="fact">STR / registration ${esc(p.str)}</span>`:''}</div><p>${p.manager?`Manager/contact: <strong>${esc(p.manager)}</strong>. `:''}${p.phone?`Phone: <a href="tel:${p.phone.replace(/[^0-9]/g,'')}">${esc(p.phone)}</a>. `:''}${p.note?esc(p.note):''}</p><div class="validation">From on-site photo · ${esc(p.checked||meta.researchedOn)}.</div></div>`}
function realtyBlock(u){const r=u.realty;if(!r)return '';const rows=approxSeries(r);return `<h2>Sale, value & tax record</h2><div class="value-cards"><div class="value-card"><small>Estimated value</small><strong>${money(r.currentApprox)}</strong><small>${esc(r.currentBasis)}</small></div><div class="value-card"><small>Latest sale record</small><strong>${r.lastSale?String(r.lastSale.year):'Not surfaced'}</strong><small>${r.lastSale?esc(r.lastSale.label):'No exact sale record found'}</small></div><div class="value-card"><small>History from</small><strong>${r.tableStartYear}</strong><small>${esc(r.startLabel)}</small></div></div>${r.asking?`<p class="sale-line"><strong>${r.asking.year} listing:</strong> ${money(r.asking.price)} — ${esc(r.asking.label)}</p>`:''}<div class="source-links">${r.links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener" title="${esc(l.note)}">${esc(l.label)}</a>`).join('')}<a href="${esc(r.officialTaxUrl)}" target="_blank" rel="noopener">Official Nueces CAD</a></div>${r.notes?.map(n=>`<p class="source-note">${esc(n)}</p>`).join('')||''}<h2>Year-by-year values</h2><div class="table-wrap"><table class="history"><thead><tr><th>Year</th><th>Estimated market value</th><th>Published assessment*</th><th>Source status</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${x.year}</td><td class="model">${money(x.approx)}</td><td>${x.published?money(x.published):'—'}</td><td class="muted">${esc(x.pub)}</td></tr>`).join('')}</tbody></table></div><p class="source-note"><strong>*Value note:</strong> market-value figures are modeled estimates, not appraisals or sale prices. Published assessment values appear only when an exact-unit source was available; blank years are intentional. Verify county values with Nueces CAD.</p>`}
function detail(u){
 document.title=`Unit ${u.unit}${u.name?` · ${u.name}`:''} | Grand Caribbean Condo Guide`;
 const d=document.querySelector('meta[name="description"]'); if(d)d.content=`Grand Caribbean Unit ${u.unit} in Port Aransas: ${u.bedrooms} bedrooms, ${u.bathrooms} baths, rental references, occupancy and property history.`;
 const ix=units.findIndex(x=>x.unit===u.unit), prev=units[ix-1], next=units[ix+1];
 const title=u.name?`Condo ${u.unit} · ${esc(u.name)}`:`Condo ${u.unit}`;
 const bookingOcc=u.occupancy?`${u.occupancy} guests`:'Not listed';
 const rentalHeading=u.status==='verified'?'How to rent':'Rental status';
 root.innerHTML=shell(`<main class="detail"><div class="wrap"><a class="back" href="./#units">← All condos</a><div class="detail-head"><div><div class="eyebrow">Floor ${u.floor}</div><h1>${title}</h1><div class="badge-row"><span class="pill ${u.status}">${statusLabel[u.status]}</span>${u.str?`<span class="fact">STR / registration ${esc(u.str)}</span>`:''}</div></div><div class="summary-card"><dl><div><dt>Bedrooms</dt><dd>${u.bedrooms}</dd></div><div><dt>Bathrooms</dt><dd>${u.bathrooms}</dd></div><div><dt>Listing capacity</dt><dd>${bookingOcc}</dd></div><div><dt>Interior</dt><dd>${u.sqft?`${Number(u.sqft).toLocaleString()} sf`:'Not verified'}</dd></div></dl></div></div>${u.beds?.length?`<div class="panel"><strong>Sleeping details</strong><p>${u.beds.map(esc).join(' · ')}</p></div>`:''}${u.note?`<p class="notice">${esc(u.note)}</p>`:''}<h2>${rentalHeading}</h2>${bookingBlock(u)}${placardBlock(u)}${realtyBlock(u)}<nav class="unit-nav" aria-label="Adjacent condos"><span>${prev?`<a href="${unitHref(prev)}">← Unit ${prev.unit}</a>`:''}</span><a href="./#units">All condos</a><span>${next?`<a href="${unitHref(next)}">Unit ${next.unit} →</a>`:''}</span></nav><div class="method"><strong>Research notes.</strong> ${esc(meta.methodology)}</div></div></main>`);
}
const params=new URLSearchParams(location.search), id=document.body.dataset.unit||params.get('unit'); const u=id&&units.find(x=>x.unit===id); if(u)detail(u);else landing();
})();
