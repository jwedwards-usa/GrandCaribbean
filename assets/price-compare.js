(() => {
  const units = window.GC_UNITS || [];
  const audit = window.GC_BOOKING_AUDIT || {};
  const requestedUnit = document.body.dataset.unit || new URLSearchParams(window.location.search).get('unit');

  if (!requestedUnit) {
    const verified = units.filter((unit) => unit.status === 'verified');
    const multiPlatform = verified.filter((unit) => audit[unit.unit]?.multiPlatform);
    const singlePlatform = verified.filter((unit) => audit[unit.unit] && !audit[unit.unit].multiPlatform);
    const notice = document.querySelector('#units .notice');

    if (notice && verified.length) {
      const summary = document.createElement('span');
      summary.append(' ');
      summary.append(`${multiPlatform.length} of ${verified.length} active rentals have 2+ validated booking platforms for price comparison.`);
      if (singlePlatform.length) {
        summary.append(` Audit exception: ${singlePlatform.map((unit) => `GC${unit.unit}`).join(', ')} currently has only one independently verified platform.`);
      }
      notice.append(summary);
    }
    return;
  }

  const unit = units.find((candidate) => candidate.unit === requestedUnit);
  const result = audit[requestedUnit];
  if (!unit || unit.status !== 'verified' || !result) return;

  const bookingHeading = [...document.querySelectorAll('h2')].find((heading) => heading.textContent.trim() === 'How to rent');
  if (bookingHeading) bookingHeading.textContent = 'Compare booking options';

  const linkList = bookingHeading?.nextElementSibling?.classList.contains('link-list')
    ? bookingHeading.nextElementSibling
    : document.querySelector('.link-list');
  if (!linkList) return;

  const notice = document.createElement('div');
  notice.className = `notice${result.multiPlatform ? '' : ' warn'}`;

  if (result.multiPlatform) {
    notice.innerHTML = `<strong>Price compare ${result.platformCount} booking platforms.</strong> Use the same dates and guest count on each site, then compare the total after taxes, cleaning/service fees, cancellation terms and card charges.`;
  } else {
    notice.innerHTML = `<strong>Single-platform audit exception.</strong> ${result.note || 'Only one independently verified booking platform was found for this active rental.'} No unverified mirror has been added just to inflate the link count.`;
  }

  linkList.before(notice);
})();
