(() => {
  const UNIT_PATTERN = /^\d{4}$/;
  const CONDO_PATH_PATTERN = /\/condos\/(\d{4})\.html$/i;
  const DATA_ROOT = 'assets/data';
  const UNIT_SHARD_COUNT = 8;

  const params = new URLSearchParams(window.location.search);
  const pathMatch = window.location.pathname.match(CONDO_PATH_PATTERN);
  const candidateUnit = document.body.dataset.unit || params.get('unit') || pathMatch?.[1] || '';
  const requestedUnit = UNIT_PATTERN.test(candidateUnit) ? candidateUnit : null;

  if (requestedUnit) {
    document.body.dataset.unit = requestedUnit;
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
      Array.from(
        { length: UNIT_SHARD_COUNT },
        (_, index) => loadScript(`${DATA_ROOT}/units-${index + 1}.js`),
      ),
    );
    await loadScript(`${DATA_ROOT}/overrides.js`);

    window.GC_UNITS?.sort((left, right) => left.unit.localeCompare(right.unit));
    const hasRequestedUnit = Boolean(
      requestedUnit
      && window.GC_UNITS?.some((candidate) => candidate.unit === requestedUnit),
    );

    if (hasRequestedUnit) {
      await loadScript(`${DATA_ROOT}/galleries-${requestedUnit[0]}.js`);
    }

    await loadScript('assets/render.js');
    await loadScript('assets/price-compare.js');

    if (hasRequestedUnit) {
      await loadScript('assets/carousel.js');
    }
  };

  start().catch((error) => {
    console.error(error);
    showLoadError();
  });
})();
