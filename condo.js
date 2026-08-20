(async()=>{
  const unit=document.body.dataset.unit||decodeURIComponent(location.pathname.split('/').pop().replace(/\.html$/i,''));
  if(!/^\d{4}$/.test(unit)){
    document.getElementById('condo-content').innerHTML='<p>Unit details were not found. <a href="../index.html">Open the condo directory</a>.</p>';
    return;
  }
  document.body.dataset.unit=unit;
  if(!document.head.querySelector('base')){
    const base=document.createElement('base'); base.href='../'; document.head.prepend(base);
  }
  const style=document.createElement('link'); style.rel='stylesheet'; style.href='assets/styles.css'; document.head.appendChild(style);
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(s)});
  try{
    for(let i=1;i<=8;i++) await load(`assets/research-${i}.js`);
    await load('assets/render.js');
  }catch(err){
    console.error(err);
    document.getElementById('condo-content').innerHTML='<p>Condo research data could not load. <a href="../index.html">Open the condo directory</a>.</p>';
  }
})();
