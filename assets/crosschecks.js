(()=>{
  const id=document.body.dataset.unit||new URLSearchParams(location.search).get('unit');
  if(!id||!window.GC_UNITS)return;
  const u=window.GC_UNITS.find(x=>x.unit===id);
  if(!u?.publicRefs?.length)return;
  const wrap=document.querySelector('main.detail .wrap');
  if(!wrap)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const section=document.createElement('section');
  section.className='public-crosschecks';
  section.innerHTML=`<h2>Independent public cross-checks</h2><div class="link-list">${u.publicRefs.map(r=>`<div class="booking"><strong>${esc(r.label)}</strong><p>${esc(r.note||'Independent exact-unit public reference.')}</p><a href="${esc(r.url)}" target="_blank" rel="noopener">Open source</a><div class="validation">Public-web corroboration · reviewed 2026-08-19</div></div>`).join('')}</div><p class="source-note">These references corroborate unit identity, property records, or historical rental use. A parcel/APN number is kept distinct from a short-term-rental permit unless a rental source explicitly identifies it as an STR number.</p>`;
  const headings=[...wrap.querySelectorAll('h2')];
  const anchor=headings.find(h=>h.textContent.trim()==='Sale, value & tax record')||headings.find(h=>h.textContent.trim()==='Onsite placard reference');
  if(anchor)wrap.insertBefore(section,anchor);
  else{
    const gallery=wrap.querySelector('.gallery');
    gallery?wrap.insertBefore(section,gallery):wrap.appendChild(section);
  }
})();
