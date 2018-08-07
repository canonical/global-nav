import { canonicalProducts, canonicalLogins } from './product-details';

function createFromHTML(html) {
  const div = window.document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
}

function createNavRow(homeUrl, logoUrl) {
  const navRow = createFromHTML(`<div class="global-nav__header global-nav__row">
    <div class="global-nav__logo">
      <a class="global-nav__logo-anchor" href=${homeUrl}>
        <img src=${logoUrl} width="74px">
      </a>
    </div>
    <ul class="global-nav__links">
      <li class="global-nav__link--dropdown">
        <a class="global-nav__link-anchor" href="#canonical-products">Products</a>
      </li>
      <li class="global-nav__link--dropdown">
        <a class="global-nav__link-anchor" href="#canonical-login">Login</a>
      </li>
    </ul>
  </div>`);

  return navRow;
}

function createMobileDropdown(products) {
  const {
    flagships, others, resources, abouts,
  } = products;

  function createListItem(obj) {
    return (
      `<li class="global-nav__list-item">
        <a class="global-nav__link" href=${obj.url}>${obj.title}</a>
      </li>`
    );
  }

  const mobileFlagships = flagships
    .map(flagship => createListItem(flagship))
    .join('');

  const mobileOthers = others
    .map(other => createListItem(other))
    .join('');

  const mobileResources = resources
    .map(resource => createListItem(resource))
    .join('');

  const mobileAbouts = abouts
    .map(about => createListItem(about))
    .join('');

  const mobileDropdown = (
    `<div class="global-nav--mobile u-hide--medium u-hide--large">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav--mobile-heading">Products</h5>
        <ul class="global-nav__split-list">
          ${mobileFlagships}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav--mobile-heading">Other websites</h5>
        <ul class="global-nav__split-list">
          ${mobileOthers}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav--mobile-heading">Resources</h5>
        <ul class="global-nav__split-list">
          ${mobileResources}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav--mobile-heading">About</h5>
        <ul class="global-nav__split-list">
          ${mobileAbouts}
        </ul>
      </div>
    </div>`
  );

  return mobileDropdown;
}

function createProductDropdown(products) {
  const {
    flagships, others, resources, abouts,
  } = products;

  const productFlagships = flagships
    .map((flagship, index) => {
      let flagshipMarkup = (
        `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${flagship.url}>
            <img class="global-nav__matrix-image" src=${flagship.logoUrl} alt="icon">
          </a>
          <div class="global-nav__matrix-content">
            <h4 class="global-nav__matrix-title"><a class="global-nav__link" href=${flagship.url}>${flagship.title}&nbsp;›</a></h4>
            <p class="global-nav__matrix-desc">${flagship.description}</p>
          </div>
        </li>`
      );

      // Check whether to add extra empty matrix items
      if (index === flagships.length - 1) {
        const extraMatrixCount = (2 * flagships.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          flagshipMarkup += (
            `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`
          );
        }
      }

      return flagshipMarkup;
    })
    .join('');

  const productOthers = others
    .map((other, index) => {
      let otherMarkup = (
        `<li class="global-nav__matrix-item">
          <div class="global-nav__matrix-content">
            <h4 class="global-nav__matrix-title"><a class="global-nav__link" href=${other.url}>${other.title}&nbsp;›</a></h4>
            <p class="global-nav__matrix-desc">${other.description}</p>
          </div>
        </li>`
      );

      // Check whether to add extra empty matrix items
      if (index === others.length - 1) {
        const extraMatrixCount = (2 * others.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          otherMarkup += (
            `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`
          );
        }
      }

      return otherMarkup;
    })
    .join('');

  const productResources = resources
    .map((resource) => {
      const resourceMarkup = (
        `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${resource.url} title="Visit ${resource.title}">${resource.title}</a>
        </li>`
      );
      return resourceMarkup;
    })
    .join('');

  const productAbouts = abouts
    .map((about) => {
      const aboutMarkup = (
        `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${about.url}>${about.title}</a>
        </li>`
      );
      return aboutMarkup;
    })
    .join('');

  const mobileDropdown = createMobileDropdown(products);

  const productDropdown = (
    `<div class="global-nav__dropdown-content u-hide" id="canonical-products">
      ${mobileDropdown}
      <div class="global-nav__strip u-hide--small">
        <div class="global-nav__row is-bordered">
          <ul class="global-nav__matrix">
            ${productFlagships}
          </ul>
        </div>
      </div>
      <div class="global-nav__strip u-hide--small">
        <div class="global-nav__row">
          <div class="global-nav__product-extras">
            <div class="global-nav__others-col">
              <h5 class="global-nav__muted-heading">Other websites</h5>
              <div class="global-nav__matrix">
                ${productOthers}
              </div>
            </div>
            <div class="global-nav__resources-col">
              <h5 class="global-nav__muted-heading">Resources</h5>
              <ul class="global-nav__split-list">
                ${productResources}
              </ul>
              <h5 class="global-nav__muted-heading">About</h5>
              <ul class="global-nav__split-list">
                ${productAbouts}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`
  );

  return productDropdown;
}

function createLoginDropdown(logins) {
  const loginItems = logins
    .map((loginItem) => {
      const loginItemMarkup = (
        `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${loginItem.login}>
            <img class="global-nav__matrix-image" src=${loginItem.logoUrl} alt="">
          </a>
          <div class="global-nav__matrix-content">
            <a class="global-nav__link" href=${loginItem.login}>
              <h4 class="global-nav__matrix-title">${loginItem.title}</h4>
            </a>
            <p class="global-nav__matrix-desc">${loginItem.description}</p>
            <ul class="global-nav__inline-list">
              <li class="global-nav__list-item">
                <a class="global-nav__link" href=${loginItem.login}>Login&nbsp;›</a>
              </li>
              ${loginItem.signup ? `<li class="global-nav__list-item">
                <a class="global-nav__link" href=${loginItem.signup}>Sign up&nbsp;›</a>
              </li>` : ''}
            </ul>
          </div>
        </li>`
      );
      return loginItemMarkup;
    })
    .join('');

  const loginDropdown = (
    `<div class="global-nav__dropdown-content" id="canonical-login">
      <div class="global-nav__strip">
        <div class="global-nav__row">
          <h5 class="global-nav__muted-heading">Customer portals</h5>
        </div>
        <div class="global-nav__row">
          <ul class="global-nav__matrix">
            ${loginItems}
          </ul>
        </div>
      </div>
    </div>`
  );

  return loginDropdown;
}

function addListeners(breakpoint, wrapper) {
  const dropdownLinks = wrapper.querySelectorAll('.global-nav__link--dropdown');
  const dropdownContainer = wrapper.querySelector('.global-nav__dropdown');
  const dropdownContents = wrapper.querySelectorAll('.global-nav__dropdown-content');
  const dropdownLinksMobile = wrapper.querySelectorAll('.global-nav--mobile-heading');
  const overlay = wrapper.querySelector('.global-nav__overlay');
  const isMobile = window.innerWidth < breakpoint;

  function closeNav() {
    dropdownContainer.classList.remove('show-content');
    dropdownLinks.forEach(link => link.classList.remove('is-selected'));
    overlay.classList.remove('show-overlay');
  }

  function scrollGlobalNavToTop() {
    window.scrollTo(0, wrapper.offsetTop);
  }

  function openDropdown(dropdownLink) {
    const targetMenuLink = dropdownLink.querySelector('.global-nav__link-anchor');
    const targetMenuId = targetMenuLink.getAttribute('href');
    const targetMenu = wrapper.querySelector(targetMenuId);

    dropdownLink.classList.add('is-selected');
    dropdownContents.forEach(menu => menu !== targetMenu && menu.classList.add('u-hide'));
    targetMenu.classList.remove('u-hide');
    overlay.classList.add('show-overlay');

    if (isMobile) {
      scrollGlobalNavToTop();
    }
  }

  dropdownLinks.forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (dropdownContainer.classList.contains('show-content')) {
        if (dropdownLink.classList.contains('is-selected')) {
          closeNav();
        } else {
          dropdownLinks.forEach(link => link.classList.remove('is-selected'));
          openDropdown(dropdownLink);
        }
      } else {
        dropdownContainer.classList.add('show-content');
        openDropdown(dropdownLink);
      }
    });
  });

  dropdownLinksMobile.forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', (e) => {
      e.target.classList.toggle('is-active');
      scrollGlobalNavToTop();
    });
  });

  overlay.addEventListener('click', closeNav);
}

export const createNav = (
  breakpoint = 900,
  homeUrl = 'https://www.canonical.com',
  logoUrl = 'https://assets.ubuntu.com/v1/9c74eb2d-logo-canonical-white.svg',
  products = canonicalProducts,
  logins = canonicalLogins,
) => {
  // Build global nav components
  const wrapper = createFromHTML('<div id="canonical-global-nav" class="global-nav"></div>');
  const overlay = createFromHTML('<div class="global-nav__overlay"></div>');
  const navRow = createNavRow(homeUrl, logoUrl);
  const loginDropdown = createLoginDropdown(logins);
  const productDropdown = createProductDropdown(products);
  const navDropdown = createFromHTML(
    `<div class="global-nav__dropdown">
      ${loginDropdown}
      ${productDropdown}
    </div>`,
  );

  // Attach to the DOM
  document.body.insertBefore(wrapper, document.body.firstElementChild);
  wrapper.appendChild(navRow);
  wrapper.appendChild(navDropdown);
  wrapper.appendChild(overlay);

  // Add event listeners
  addListeners(breakpoint, wrapper);
};
