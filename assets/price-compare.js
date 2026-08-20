(() => {
  const units = window.GC_UNITS || [];
  const audit = window.GC_BOOKING_AUDIT || {};
  const requestedUnit = document.body.dataset.unit
    || new URLSearchParams(window.location.search).get('unit');

  const appendLandingSummary = () => {
    const verifiedUnits = units.filter((unit) => unit.status === 'verified');
    const multiPlatformUnits = verifiedUnits.filter((unit) => audit[unit.unit]?.multiPlatform);
    const singlePlatformUnits = verifiedUnits.filter(
      (unit) => audit[unit.unit] && !audit[unit.unit].multiPlatform,
    );
    const notice = document.querySelector('#units .notice');

    if (!notice || !verifiedUnits.length) {
      return;
    }

    const summary = document.createElement('span');
    summary.append(
      ` ${multiPlatformUnits.length} of ${verifiedUnits.length} active rentals have 2+ validated booking platforms for price comparison.`,
    );

    if (singlePlatformUnits.length) {
      const exceptions = singlePlatformUnits.map((unit) => `GC${unit.unit}`).join(', ');
      summary.append(` Audit exception: ${exceptions} currently has only one independently verified platform.`);
    }

    notice.append(summary);
  };

  const createComparisonNotice = (result) => {
    const notice = document.createElement('div');
    notice.className = `notice${result.multiPlatform ? '' : ' warn'}`;

    const heading = document.createElement('strong');
    heading.textContent = result.multiPlatform
      ? `Price compare ${result.platformCount} booking platforms.`
      : 'Single-platform audit exception.';

    const message = result.multiPlatform
      ? 'Use the same dates and guest count on each site, then compare the final total after taxes, cleaning and service fees, cancellation terms, and card charges.'
      : `${result.note || 'Only one independently verified booking platform was found for this active rental.'} Unverified mirrors are excluded.`;

    notice.append(heading, ` ${message}`);
    return notice;
  };

  if (!requestedUnit) {
    appendLandingSummary();
    return;
  }

  const unit = units.find((candidate) => candidate.unit === requestedUnit);
  const result = audit[requestedUnit];

  if (!unit || unit.status !== 'verified' || !result) {
    return;
  }

  const bookingHeading = [...document.querySelectorAll('h2')]
    .find((heading) => heading.textContent.trim() === 'How to rent');
  const linkList = bookingHeading?.nextElementSibling;

  if (!bookingHeading || !linkList?.classList.contains('link-list')) {
    return;
  }

  bookingHeading.textContent = 'Compare booking options';
  linkList.before(createComparisonNotice(result));
})();
