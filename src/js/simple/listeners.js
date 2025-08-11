import { debounce, showAppropriateNavigation } from '../utils';

// global-nav links INCLUDING the desktop link to open the global-nav
let globalNavLinks = [];
// other navigation links coming from each project (global navigation not included)
let externalNavLinks = [];
// all navigation link elements -> use getNavElements() to get it as it makes sure it is initialized
let navElements = [];

function getNavElements() {
  if (navElements.length === 0) {
    globalNavLinks = [
      // eslint-disable-next-line no-undef
      ...document.querySelectorAll(
        '.global-nav__dropdown-toggle .global-nav__header-link-anchor'
      ),
    ];
    externalNavLinks = [
      // eslint-disable-next-line no-undef
      ...document.querySelectorAll(
        '.p-navigation__item--dropdown-toggle:not(.global-nav__dropdown-toggle) .p-navigation__link'
      ),
    ];
    navElements = [...globalNavLinks, ...externalNavLinks];
  }
  return navElements;
}

function hideDropdown(link) {
  const dropdown = link.parentNode.querySelector('.p-navigation__dropdown');
  if (dropdown) {
    dropdown.setAttribute('aria-hidden', 'true');
  } else {
    // if dropdown was not found try to find it by looking for the aria-controls element
    const targetMenuId = link.getAttribute('aria-controls');
    const targetMenu = document.body.querySelector(`#${targetMenuId}`); //eslint-disable-line
    if (targetMenu) {
      targetMenu.setAttribute('aria-hidden', 'true');
    }
  }
}

function closeOtherNavElements(element) {
  getNavElements()
    .filter(navElement => !navElement.isEqualNode(element))
    .forEach(link => {
      link.parentNode.classList.remove('is-active');
      link.parentNode.classList.remove('is-selected');
      hideDropdown(link);
    });
}

export function useClickOutsideListener() {
  // eslint-disable-next-line no-undef
  document.addEventListener('click', event => {
    const { target } = event;
    // if it wasn't a click in the navigation menu, then we close all dropdowns
    if (!target.closest('.p-navigation__item--dropdown-toggle')) {
      closeOtherNavElements(null);
    }
  });
}

export function useDesktopListeners() {
  /* eslint-disable */
  const primaryDropdownCTA = document.getElementById('all-canonical-link');
  const dropdownContainer = document.querySelector('.global-nav-dropdown');
  const dropdownContents = document.querySelectorAll(
    '.global-nav-dropdown__content'
  );
  const overlay = document.querySelector('.global-nav-overlay');
  const event = new Event('global-nav-opened');
  /* eslint-enable */

  function closeNav(delay = 250) {
    dropdownContainer.classList.remove('show-content');

    primaryDropdownCTA.classList.remove('is-selected');
    primaryDropdownCTA.parentNode.classList.remove('is-active');
    primaryDropdownCTA.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
      dropdownContents.forEach(menu => {
        menu.setAttribute('aria-hidden', 'true');
      });

      dropdownContents.forEach(menu => {
        menu.classList.add('u-hide');
      });
    }, delay);

    overlay.classList.remove('show-overlay');
  }

  function openNav() {
    const targetMenuId = primaryDropdownCTA.getAttribute('href');
    const targetMenu = document.body.querySelector(targetMenuId); //eslint-disable-line

    dropdownContainer.classList.add('show-content');
    // focus the container so keyboard key presses are handled by it
    dropdownContainer.focus();

    primaryDropdownCTA.classList.add('is-selected');
    primaryDropdownCTA.parentNode.classList.add('is-active');
    primaryDropdownCTA.setAttribute('aria-expanded', 'true');

    document.dispatchEvent(event); //eslint-disable-line

    dropdownContents.forEach(menu => {
      if (menu !== targetMenu) {
        menu.classList.add('u-hide');
        menu.setAttribute('aria-hidden', 'true');
      }
    });

    targetMenu.classList.remove('u-hide');
    targetMenu.setAttribute('aria-hidden', 'false');

    overlay.classList.add('show-overlay');
  }

  // close on click on the shadow overlay
  overlay.addEventListener('click', closeNav);

  // close on ESC pressed
  dropdownContainer.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      closeNav();
      primaryDropdownCTA.focus();
    }
  });

  // toggle contents on click
  primaryDropdownCTA.addEventListener('click', e => {
    e.preventDefault();
    // remove is-active from any other dropdown in the navigation that might be open
    closeOtherNavElements(primaryDropdownCTA);

    if (dropdownContainer.classList.contains('show-content')) {
      closeNav();
    } else {
      openNav();
    }

    e.stopPropagation();
  });

  return { closeDesktopGlobalNav: closeNav };
}

export function toggleLinkNavClasses(link, isActive) {
  const linkContainer = link.parentNode;
  if (isActive) {
    linkContainer.classList.remove('is-active');
    linkContainer.classList.remove('is-selected');
    linkContainer
      .querySelector('.p-navigation__dropdown')
      .setAttribute('aria-hidden', 'true');
  } else {
    linkContainer.classList.add('is-active');
    linkContainer.classList.add('is-selected');
    let dropdownContainerTarget = linkContainer.querySelector(
      '.p-navigation__dropdown'
    );
    if (link.classList.contains('js-back-button')) {
      // if it's a back button then the dropdown container is up the tree
      dropdownContainerTarget = linkContainer.closest(
        '.p-navigation__dropdown'
      );
    }
    if (dropdownContainerTarget) {
      dropdownContainerTarget.setAttribute('aria-hidden', 'false');
    }
  }
}

/**
 * IMPORTANT!
 *
 * These listeners also affect the desktop and mobile navigation links.
 * They work on both global-nav and the custom navigation of each project.
 *
 * closeDesktopGlobalNav is the function that handles the closing of the all-canonical-link
 * overlay (which is different than the rest of dropdowns).
 */
export function useNavElementsListeners(closeDesktopGlobalNav) {
  const navLinks = getNavElements().filter(
    element => element.id !== 'all-canonical-link'
  );

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // remove is-active from any other dropdown in the navigation that might be open
      closeOtherNavElements(link);
      // make sure to close the all-canonical-link
      closeDesktopGlobalNav(0);
      const isActive = link.parentNode.classList.contains('is-selected');
      toggleLinkNavClasses(link, isActive);

      e.stopPropagation();
    });
  });
}

export function useResizeListener(breakpoint) {
  /* eslint-disable */
  window.addEventListener(
    'resize',
    debounce(() => {
      showAppropriateNavigation(breakpoint);
    })
  );
  /* eslint-enable */
}
