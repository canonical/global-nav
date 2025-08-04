import { canonicalProducts } from './product-details';
import { initNavigationSliding } from './sliding-nav';
import { createMobileDropdown } from './mobile-dropdown';
import { createProductDropdown } from './product-dropdown';
import { createFromHTML, showAppropriateNavigation } from './utils';
import { addListeners } from './listeners';

export const createNav = ({
  breakpoint = 1036,
  mobileContainerSelector,
  desktopContainerSelector,
  isSliding = false,
} = {}) => {
  // Recruitment call to action
  // eslint-disable-next-line no-console
  console.log(
    'Interested in what makes us tick? Then we are interested in you! See our jobs page for more info: https://canonical.com/careers/engineering'
  );

  const container = document.querySelector('.global-nav'); //eslint-disable-line
  const mobileContainer = document.querySelector(mobileContainerSelector); //eslint-disable-line
  const desktopContainer = document.querySelector(desktopContainerSelector); //eslint-disable-line

  // Build global nav components
  const skipLink = createFromHTML(
    '<div class="skip-content" role="navigation"><a href="#main-content">Skip to main content</a></div'
  );
  const overlay = createFromHTML(
    '<div id="all-canonical-overlay" class="global-nav-overlay"></div>'
  );
  const navItem =
    createFromHTML(`<li class="p-navigation__item--dropdown-toggle global-nav__dropdown-toggle u-hide" id="all-canonical">
      <button href="#canonical-products" aria-controls="canonical-products" class="p-navigation__link global-nav__header-link-anchor"
          id="all-canonical-link" aria-expanded="false">
        All Canonical
      </button>
    </li>`);

  const mobileDropdownHTML = createMobileDropdown(canonicalProducts, isSliding);
  const mobileDropdown = createFromHTML(mobileDropdownHTML);

  const navDropdown = createFromHTML(
    `<div id="all-canonical-desktop" class="global-nav-dropdown is-dark" tabindex="-1">
      <div class="global-nav-dropdown__content u-hide" aria-hidden="true" id="canonical-products">
        ${createProductDropdown(canonicalProducts)}
      </div>
    </div>`
  );

  // Attach to the DOM
  document.body.insertBefore(skipLink, document.body.firstElementChild); //eslint-disable-line
  document.body.appendChild(overlay); //eslint-disable-line

  if (mobileContainer && desktopContainer) {
    const mobileDropdownList = mobileDropdown.querySelector(
      'ul.p-navigation__items'
    );
    mobileDropdownList.classList.add('u-hide');
    const globalNavButton = navItem.querySelector('button');
    desktopContainer.appendChild(navDropdown);
    mobileContainer.prepend(mobileDropdownList);
    container.prepend(globalNavButton);
    return;
  }

  document.body.appendChild(navDropdown); //eslint-disable-line

  if (container) {
    container.prepend(navItem);
    container.prepend(mobileDropdown);
    showAppropriateNavigation(breakpoint);
    addListeners(breakpoint);
  }

  if (isSliding) {
    initNavigationSliding(breakpoint);
  }
};
