(()=>{
  if(!document.head.querySelector('link[data-gc-carousel-style]')){const link=document.createElement('link');link.rel='stylesheet';link.href='assets/carousel.css';link.dataset.gcCarouselStyle='';document.head.appendChild(link)}
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const galleries=()=>window.GC_GALLERIES||{};

  function canonical(src){
    try{
      const u=new URL(src);
      ['im_w','rw','rh','w','h','width','height','quality','impolicy','ra'].forEach(k=>u.searchParams.delete(k));
      return `${u.origin}${u.pathname}?${[...u.searchParams.entries()].sort().map(([k,v])=>`${k}=${v}`).join('&')}`.replace(/\?$/,'');
    }catch{return src;}
  }

  function uniqueImages(record){
    const seen=new Set();
    return (record?.images||[]).filter(photo=>{
      const key=canonical(photo.src);
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    });
  }

  function optimized(src){
    try{
      const u=new URL(src);
      const host=u.hostname.toLowerCase();
      if(host.endsWith('muscache.com')){
        u.searchParams.set('im_w','720');
        return u.href;
      }
      if(host==='media.vrbo.com'||host==='images.trvl-media.com'){
        ['w','h','rh'].forEach(k=>u.searchParams.delete(k));
        u.searchParams.set('impolicy','resizecrop');
        u.searchParams.set('ra','fit');
        u.searchParams.set('rw','720');
        return u.href;
      }
      if(host==='images.rezfusion.com'){
        u.searchParams.set('optimize','true');
        u.searchParams.set('quality','65');
        u.searchParams.set('width','900');
        return u.href;
      }
      if(host==='track-pm.s3.amazonaws.com'||host==='portaransas-us.com'){
        return `https://images.weserv.nl/?url=${encodeURIComponent(u.href)}&w=900&q=60&output=webp`;
      }
      return u.href;
    }catch{return src;}
  }

  function sourceLine(record){
    return `<p class="carousel-source source-note"><strong>Source:</strong> <a href="${esc(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(record.sourceLabel)}</a> · <strong>Photo date:</strong> ${esc(record.imageDate||'Not published')} · checked ${esc(record.checked||'2026-08-19')}.</p>`;
  }

  function render(unit){
    const record=galleries()[unit.unit];
    if(!record)return '';
    const photos=uniqueImages(record);
    if(!photos.length){
      return `<section class="rental-gallery panel listing-gallery-unavailable" data-rental-gallery-root aria-label="Rental listing photo source for condo ${esc(unit.unit)}"><div class="carousel-head"><div><div class="eyebrow">Exact-unit listing</div><h2>Rental listing photos</h2></div></div><p>${esc(record.unavailableReason||'Photos are available on the listing, but no stable image files are available for this page.')}</p>${sourceLine(record)}</section>`;
    }
    const p=photos[0], many=photos.length>1;
    return `<section class="rental-gallery panel" data-rental-gallery-root data-rental-carousel data-unit="${esc(unit.unit)}" tabindex="0" aria-label="Rental listing photos for condo ${esc(unit.unit)}"><div class="carousel-head"><div><div class="eyebrow">Exact-unit listing</div><h2>Rental listing photos</h2></div><span class="carousel-count" data-carousel-count>1 / ${photos.length}</span></div><figure class="carousel-frame"><img class="carousel-image" data-carousel-image src="${esc(optimized(p.src))}" data-raw-src="${esc(p.src)}" alt="${esc(p.alt||`Condo ${unit.unit} rental listing photo 1`)}" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer" width="900" height="600">${many?`<button class="carousel-btn carousel-prev" type="button" data-carousel-prev aria-label="Previous rental photo">‹</button><button class="carousel-btn carousel-next" type="button" data-carousel-next aria-label="Next rental photo">›</button>`:''}<figcaption class="carousel-caption" data-carousel-caption aria-live="polite">${esc(p.caption||`Rental listing photo 1 of ${photos.length}.`)}</figcaption></figure>${many?`<div class="carousel-dots" aria-label="Choose rental photo">${photos.map((_,i)=>`<button type="button" class="carousel-dot" data-carousel-dot="${i}" aria-label="Show photo ${i+1}" aria-current="${i===0?'true':'false'}"></button>`).join('')}</div>`:''}${sourceLine(record)}</section>`;
  }

  function bind(){
    document.querySelectorAll('[data-rental-carousel]').forEach(el=>{
      const record=galleries()[el.dataset.unit], photos=uniqueImages(record);
      if(!record||!photos.length)return;
      let index=0;
      const image=el.querySelector('[data-carousel-image]');
      const count=el.querySelector('[data-carousel-count]');
      const caption=el.querySelector('[data-carousel-caption]');
      const dots=[...el.querySelectorAll('[data-carousel-dot]')];
      const show=next=>{
        index=(next+photos.length)%photos.length;
        const p=photos[index];
        image.dataset.fallbackUsed='0';
        image.dataset.rawSrc=p.src;
        image.src=optimized(p.src);
        image.alt=p.alt||`Condo ${el.dataset.unit} rental listing photo ${index+1}`;
        caption.textContent=p.caption||`Rental listing photo ${index+1} of ${photos.length}.`;
        if(count)count.textContent=`${index+1} / ${photos.length}`;
        dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));
      };
      image.addEventListener('error',()=>{
        if(image.dataset.fallbackUsed==='1')return;
        image.dataset.fallbackUsed='1';
        image.src=image.dataset.rawSrc;
      });
      el.querySelector('[data-carousel-prev]')?.addEventListener('click',()=>show(index-1));
      el.querySelector('[data-carousel-next]')?.addEventListener('click',()=>show(index+1));
      dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.carouselDot))));
      el.addEventListener('keydown',event=>{
        if(event.key==='ArrowLeft'){event.preventDefault();show(index-1)}
        if(event.key==='ArrowRight'){event.preventDefault();show(index+1)}
      });
    });
  }

  function mount(){
    if(document.querySelector('[data-rental-gallery-root]'))return;
    const id=document.body.dataset.unit;
    const unit=(window.GC_UNITS||[]).find(u=>u.unit===id);
    if(!unit)return;
    const html=render(unit);
    if(!html)return;
    const anchor=document.querySelector('.detail .gallery')||document.querySelector('.unit-nav');
    if(!anchor)return;
    anchor.insertAdjacentHTML('beforebegin',html);
    bind();
  }

  window.GC_CAROUSEL={render,bind,uniqueImages,optimized,mount};
  mount();
})();
