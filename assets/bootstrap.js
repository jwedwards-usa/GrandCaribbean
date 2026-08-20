(() => {
  const UNIT_PATTERN = /^\d{4}$/;
  const CONDO_PATH_PATTERN = /\/condos\/(\d{4})\.html$/i;
  const params = new URLSearchParams(window.location.search);
  const pathMatch = window.location.pathname.match(CONDO_PATH_PATTERN);
  const candidateUnit = document.body.dataset.unit || params.get('unit') || pathMatch?.[1] || '';
  const unit = UNIT_PATTERN.test(candidateUnit) ? candidateUnit : null;

  if (unit) {
    document.body.dataset.unit = unit;
  }

  if (pathMatch && !document.head.querySelector('base')) {
    const base = document.createElement('base');
    base.href = '../';
    document.head.prepend(base);
  }

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  const showLoadError = () => {
    const root = document.querySelector('#app') || document.body;
    root.innerHTML = '<main class="load-error"><h1>Condo guide data could not load</h1><p>Please reload the page.</p></main>';
  };

  const start = async () => {
    await Promise.all(
      Array.from({ length: 8 }, (_, index) => loadScript(`assets/research-${index + 1}.js`)),
    );

    window.GC_UNITS?.sort((left, right) => left.unit.localeCompare(right.unit));
    await loadScript('assets/current-overrides.js');

    if (unit) {
      await loadScript(`assets/galleries-${unit[0]}.js`);
    }

    await loadScript('assets/render.js');

    if (unit) {
      await loadScript('assets/carousel.js');
    }

    await loadScript('assets/crosschecks.js');
  };

  start().catch((error) => {
    console.error(error);
    showLoadError();
  });
})();
