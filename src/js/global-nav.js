import { canonicalProducts, canonicalProductsMobile } from './product-details';

function debounce(func, wait, immediate) {
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

function camelize(str) {
  // transform string to camelCase
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''; // check for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function createFromHTML(html) {
  const div = window.document.createElement('div'); //eslint-disable-line
  div.innerHTML = html;
  return div.childNodes[0];
}

function createMobileDropdown(allCanonicalDropdown) {
  function createListItem(obj, slide = '') {
    const objId = camelize(obj.title);

    let link;

    if (obj.children) {
      link = `
        <li
          class="p-navigation__item--dropdown-toggle"
          id="${objId}"
        >
          <button
            class="p-navigation__link"
            aria-controls="${objId}-menu"
          >
            ${obj.title}
          </button>
          ${slide}
        </li>
      `;
    } else {
      link = `
        <li>
          <a
            class="p-navigation__dropdown-item"
            href=${obj.url}
          >
            ${obj.title}
          </a>
        </li>
      `;
    }

    return link.trim();
  }

  function createNavSlide(obj, id) {
    const objCopy = { ...obj };

    if (objCopy.children) {
      const navLinks = [];
      obj.children.forEach(child => {
        if (child.children) {
          const childId = camelize(child.title);
          const childNavSlide = createNavSlide(child, childId);

          navLinks.push(createListItem(child, childNavSlide));
        } else {
          navLinks.push(createListItem(child));
        }
      });

      objCopy.navLinks = navLinks;
    }

    const navSide = `
      <ul
        class="p-navigation__dropdown"
        id="${id}-menu"
      >
        <li class="p-navigation__item--dropdown-close">
          <button 
            class="p-navigation__link"
            aria-controls="${id}-menu"
          >
            Back
          </button>
        </li>
        ${objCopy.navLinks ? `${objCopy.navLinks.join('')}` : ''}
      </ul>
    `;

    return navSide.trim();
  }

  const sideNavId = 'all-canonical-mobile';
  const allCanonicalDropdownSlide = createNavSlide(
    allCanonicalDropdown,
    sideNavId
  );

  const mobileDropdown = `
    <li 
      id="${sideNavId}" 
      class="p-navigation__item--dropdown-toggle u-hide"
    >
      <button aria-controls="${sideNavId}-menu" class="p-navigation__link">
        All Canonical
      </button>
      ${allCanonicalDropdownSlide}
    </li>
  `;

  return mobileDropdown.trim();
}

function createProductDropdown(products) {
  const { flagships, others, resources, abouts } = products;

  function createLinkListItems(item) {
    const items = item.links
      .map(link => {
        const itemMarkup = `<li class="p-inline-list__item">
        <a class="global-nav__link" href="${link.url}">
          ${link.text}
        </a>
      </li>`;

        return itemMarkup;
      })
      .join('');

    return items;
  }

  const productFlagships = flagships
    .map(flagship => {
      let linkList = '';

      if (flagship.links) {
        linkList = `<ul class="p-inline-list--middot is-dark u-no-margin--bottom u-sv1">
          ${createLinkListItems(flagship)}
        </ul>`;
      }
      let flagshipLinkContent = `<span class="p-heading--4">${flagship.title}</span>`;

      if (flagship.logoUrl) {
        flagshipLinkContent = `<img class="global-nav__image" src=${flagship.logoUrl} alt="">${flagshipLinkContent}`;
      }

      const flagshipMarkup = `<li class="p-list__item">
          <div class="row u-no-padding">
            <div class="col-4 col-medium-2">
              <a class="p-link--inverted" href=${flagship.url}>
                ${flagshipLinkContent}
              </a>
            </div>
            <div class="col-8 col-medium-4">
              <p class="u-no-max-width u-no-margin--bottom">${flagship.description}</p>
              ${linkList}
            </div>
          </div>
        </li>`;

      return flagshipMarkup;
    })
    .join('');

  const productOthers = others
    .map((other, index) => {
      let linkList = '';

      if (other.links) {
        linkList = `<ul class="global-nav__inline-list u-no-padding--bottom u-no-padding--left">
          ${createLinkListItems(other)}
        </ul>`;
      }

      let otherMarkup = `<li class="global-nav__matrix-item">
          <div class="global-nav__matrix-content">
            <span class="p-heading--5"><a class="p-link--inverted" href=${other.url}>${other.title}</a></span>
            <p class="global-nav__matrix-desc u-no-margin--left">${other.description}</p>
            ${linkList}
          </div>
        </li>`;

      // Check whether to add extra empty matrix items
      if (index === others.length - 1) {
        const extraMatrixCount = (2 * others.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          otherMarkup += `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`;
        }
      }

      return otherMarkup;
    })
    .join('');

  const productResources = resources
    .map(resource => {
      const resourceMarkup = `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${resource.url} title="Visit ${resource.title}">${resource.title}</a>
        </li>`;
      return resourceMarkup;
    })
    .join('');

  const productAbouts = abouts
    .map(about => {
      const aboutMarkup = `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${about.url}>${about.title}</a>
        </li>`;
      return aboutMarkup;
    })
    .join('');

  const productDropdown = `<div class="global-nav__strip">
      <div class="global-nav__row is-bordered">
        <ul class="p-list--divided u-sv3">
          ${productFlagships}
        </ul>

        <hr class="p-divider" />

        <div class="global-nav__flex-container row u-no-padding">
          <div class="global-nav__others-col col-8 col-medium-6">
            <span class="global-nav__muted-heading">Also from Canonical</span>
            <div class="global-nav__matrix">
              ${productOthers}
            </div>
          </div>
          <hr class="p-divider u-hide--large" />
          <div class="global-nav__resources-col col-2 col-medium-4">
            <span class="global-nav__muted-heading">Resources</span>
            <ul class="global-nav__list">
              ${productResources}
            </ul>
          </div>
          <div class="global-nav__about-col col-2 col-medium-2">
            <span class="global-nav__muted-heading">About</span>
            <ul class="global-nav__list">
              ${productAbouts}
            </ul>
          </div>
        </div>
      </div>
    </div>`;

  return productDropdown;
}

function showAppropriateNavigation(breakpoint) {
  /* eslint-disable */
  const desktopNav = document.getElementById('all-canonical');
  const desktopDropdown = document.getElementById('all-canonical-desktop');
  const mobileNav = document.getElementById('all-canonical-mobile');
  const overlay = document.getElementById('all-canonical-overlay');

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
  /* eslint-enable */
}

function addListeners(wrapper, breakpoint) {
  const primaryDropdownCTA = wrapper.querySelector('#all-canonical-link');
  const globalNavHeaderLinks = wrapper.querySelectorAll(
    '.global-nav__dropdown-toggle .global-nav__header-link-anchor'
  );
  /* eslint-disable */
  const externalNavDropdowns = document.querySelectorAll(
    '.p-navigation__item--dropdown-toggle:not(.global-nav__dropdown-toggle) .p-navigation__link'
  );
  const dropdownContainer = document.querySelector('.global-nav-dropdown');
  const dropdownContents = document.querySelectorAll(
    '.global-nav-dropdown__content'
  );
  const overlay = document.querySelector('.global-nav-overlay');
  const event = new Event('global-nav-opened');
  /* eslint-enable */

  function closeNav(delay = 250) {
    dropdownContainer.classList.remove('show-content');

    globalNavHeaderLinks.forEach(link => {
      link.classList.remove('is-selected');
      link.parentNode.classList.remove('is-active');
      link.setAttribute('aria-expanded', 'false');
    });

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

  function openDropdown(headerLink) {
    const targetMenuId = headerLink.getAttribute('href');
    const targetMenu = document.body.querySelector(targetMenuId); //eslint-disable-line

    headerLink.classList.add('is-selected');
    headerLink.parentNode.classList.add('is-active');
    headerLink.setAttribute('aria-expanded', 'true');

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

  globalNavHeaderLinks.forEach(headerLink => {
    headerLink.addEventListener('click', e => {
      e.preventDefault();

      externalNavDropdowns.forEach(link => {
        link.parentNode.classList.remove('is-active');
      });

      if (dropdownContainer.classList.contains('show-content')) {
        if (headerLink.classList.contains('is-selected')) {
          if (e.target === headerLink) {
            closeNav();
          }
        } else {
          globalNavHeaderLinks.forEach(link => {
            link.classList.remove('is-selected');
            link.parentNode.classList.remove('is-active');
            link.setAttribute('aria-expanded', 'false');
          });
          openDropdown(headerLink);
        }
      } else {
        dropdownContainer.classList.add('show-content');
        openDropdown(headerLink);
      }

      e.stopPropagation();
    });
  });

  externalNavDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', () => {
      closeNav(0);
    });
  });

  overlay.addEventListener('click', closeNav);

  dropdownContainer.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      closeNav();
      primaryDropdownCTA.focus();
    }
  });

  /* eslint-disable */
  window.addEventListener(
    'resize',
    debounce(() => {
      showAppropriateNavigation(breakpoint);
    })
  );
  /* eslint-enable */
}

export const createNav = ({ breakpoint = 620 } = {}) => {
  // Recruitment call to action
  // eslint-disable-next-line no-console
  console.log(
    'Interested in what makes us tick? Then we are interested in you! See our jobs page for more info: https://canonical.com/careers/all?filter=Engineering'
  );

  const container = document.querySelector('.global-nav'); //eslint-disable-line

  // Build global nav components
  const skipLink = createFromHTML(
    '<div class="skip-content" role="navigation"><a href="#main-content">Skip to main content</a></div'
  );
  const overlay = createFromHTML(
    '<div id="all-canonical-overlay" class="global-nav-overlay"></div>'
  );

  const navItem =
    createFromHTML(`<li class="p-navigation__item--dropdown-toggle global-nav__dropdown-toggle u-hide" id="all-canonical">
      <a href="#canonical-products" aria-controls="canonical-products" class="p-navigation__link global-nav__header-link-anchor" id="all-canonical-link" aria-expanded="false">All Canonical</a>
    </li>`);

  const mobileDropdownHTML = createMobileDropdown(canonicalProductsMobile);
  const mobileDropdown = createFromHTML(mobileDropdownHTML);

  const navDropdown = createFromHTML(
    `<div id="all-canonical-desktop" class="global-nav-dropdown">
      <div class="global-nav-dropdown__content u-hide" aria-hidden="true" id="canonical-products">
        ${createProductDropdown(canonicalProducts)}
      </div>
    </div>`
  );

  // Attach to the DOM
  document.body.insertBefore(skipLink, document.body.firstElementChild); //eslint-disable-line
  document.body.appendChild(overlay); //eslint-disable-line
  document.body.appendChild(navDropdown); //eslint-disable-line

  if (container) {
    container.prepend(navItem);
    container.prepend(mobileDropdown);
    showAppropriateNavigation(breakpoint);
    // Add event listeners
    addListeners(container, breakpoint);
  }
};
