(async()=>{
  const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(s)});
  try{
    for(let i=1;i<=8;i++) await load(`assets/research-${i}.js`);
    await load('assets/current-overrides.js');
    await load('assets/render.js');
    await load('assets/crosschecks.js');
  }catch(err){
    console.error(err);
    document.body.innerHTML='<main style="max-width:760px;margin:48px auto;padding:20px;font:16px system-ui"><h1>Condo guide data could not load</h1><p>Please reload the page. If the problem persists, use the repository issue tracker.</p></main>';
  }
})();
