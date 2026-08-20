(()=>{
  const unit=document.body.dataset.unit||decodeURIComponent(location.pathname.split('/').pop().replace(/\.html$/i,''));
  if(/^\d{4}$/.test(unit)) location.replace(`../units/${unit}.html`);
  else document.getElementById('condo-content').innerHTML='<p>Unit details were not found. <a href="../index.html">Open the condo directory</a>.</p>';
})();
