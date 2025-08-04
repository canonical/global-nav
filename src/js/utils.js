export function debounce(func, wait, immediate) {
  let timeout;

  return () => {
    const context = this;
    const args = arguments; // eslint-disable-line
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function createFromHTML(html) {
  const div = window.document.createElement('div'); //eslint-disable-line
  div.innerHTML = html;
  return div.childNodes[0];
}

export function showAppropriateNavigation(breakpoint) {
  /* eslint-disable */
  const desktopNav = document.getElementById('all-canonical');
  const desktopDropdown = document.getElementById('all-canonical-desktop');
  const mobileNav = document.getElementById('all-canonical-mobile');
  const overlay = document.getElementById('all-canonical-overlay');
  /* eslint-enable */

  // eslint-disable-next-line no-undef
  if (window.innerWidth >= breakpoint) {
    desktopNav.classList.remove('u-hide');
    desktopDropdown.classList.remove('u-hide');
    overlay.classList.remove('u-hide');
    mobileNav.classList.add('u-hide');
  } else {
    desktopNav.classList.add('u-hide');
    desktopDropdown.classList.add('u-hide');
    overlay.classList.add('u-hide');
    mobileNav.classList.remove('u-hide');
  }
}
