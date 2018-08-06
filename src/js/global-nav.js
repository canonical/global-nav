import { canonicalProducts, canonicalLogins } from './product-details';

function createFromHTML(html) {
  const div = window.document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
}

function createNavRow(homeUrl, logoUrl) {
  const navRow = createFromHTML(`<div class="global-nav__row row">
    <div class="global-nav__logo">
      <a class="global-nav__logo-anchor" href=${homeUrl}>
        <img src=${logoUrl} width="74px">
      </a>
    </div>
    <ul class="global-nav__links p-inline-list">
      <li class="global-nav__link--dropdown p-inline-list__item">
        <a class="global-nav__link-anchor" href="#canonical-products">Products</a>
      </li>
      <li class="global-nav__link--dropdown p-inline-list__item">
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
      `<li class="p-list__item">
        <a class="p-link" href=${obj.url}>${obj.title}</a>
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
    `<div class="p-strip--dark is-shallow u-hide--medium u-hide--large global-nav--mobile">
      <div class="row">
        <h5 class="p-muted-heading p-footer__title">Products</h5>
        <ul class="p-list is-split second-level-nav">
          ${mobileFlagships}
        </ul>
      </div>
      <div class="row">
        <h5 class="p-muted-heading p-footer__title">Other websites</h5>
        <ul class="p-list is-split second-level-nav">
          ${mobileOthers}
        </ul>
      </div>
      <div class="row">
        <h5 class="p-muted-heading p-footer__title">Resources</h5>
        <ul class="p-list is-split second-level-nav">
          ${mobileResources}
        </ul>
      </div>
      <div class="row">
        <h5 class="p-muted-heading p-footer__title">About</h5>
        <ul class="p-list is-split second-level-nav">
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
        `<li class="p-matrix__item">
          <a href=${flagship.url}>
            <img class="p-logomark" src=${flagship.logoUrl} alt="icon">
          </a>
          <div class="p-matrix__content">
            <h4 class="p-matrix__title"><a class="p-link" href=${flagship.url}>${flagship.title}&nbsp;›</a></h4>
            <p class="p-matrix__desc">${flagship.description}</p>
          </div>
        </li>`
      );

      // Check whether to add extra empty matrix items
      if (index === flagships.length - 1) {
        const extraMatrixCount = (2 * flagships.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          flagshipMarkup += (
            `<li class="p-matrix__item u-hide--small">
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
        `<h5><a class="p-link" href=${other.url}>${other.title}&nbsp;›</a></h5>
        <p>${other.description}</p>`
      );

      if (index % 2 === 0) {
        otherMarkup = `<div class="col-3">${otherMarkup}`;
      } else {
        otherMarkup = `${otherMarkup}</div>`;
      }

      return otherMarkup;
    })
    .join('');

  const productResources = resources
    .map((resource) => {
      const resourceMarkup = (
        `<li class="p-list__item">
          <a class="p-link" href=${resource.url} title="Visit ${resource.title}">${resource.title}</a>
        </li>`
      );
      return resourceMarkup;
    })
    .join('');

  const productAbouts = abouts
    .map((about) => {
      const aboutMarkup = (
        `<li class="p-list__item">
          <a class="p-link" href=${about.url}>${about.title}</a>
        </li>`
      );
      return aboutMarkup;
    })
    .join('');

  const mobileDropdown = createMobileDropdown(products);

  const productDropdown = (
    `<div class="global-nav__dropdown-content" id="canonical-products">
      <div class="p-strip--dark is-shallow u-hide--small u-no-padding--bottom">
        <div class="row u-hide--small">
          <ul class="p-matrix u-no-margin--bottom">
            ${productFlagships}
          </ul>
        </div>
      </div>
      <div class="p-strip--dark is-shallow u-hide--small">
        <div class="row is-bordered">
          <div class="col-9">
            <h5 class="p-muted-heading">Other websites</h5>
            <div class="row">
              ${productOthers}
            </div>
          </div>
          <div class="col-3">
            <h5 class="p-muted-heading">Resources</h5>
            <ul class="p-list is-split">
              ${productResources}
            </ul>
            <h5 class="p-muted-heading">About</h5>
            <ul class="p-list is-split u-no-margin--bottom">
              ${productAbouts}
            </ul>
          </div>
        </div>
      </div>
      ${mobileDropdown}
    </div>`
  );

  return productDropdown;
}

function createLoginDropdown(logins) {
  const loginItems = logins
    .map((loginItem) => {
      const loginItemMarkup = (
        `<li class="p-matrix__item">
          <a class="p-link" href=${loginItem.login}>
            <img class="p-logomark u-hide--small" src=${loginItem.logoUrl} alt="">
          </a>
          <div class="p-matrix__content">
            <a class="p-link" href=${loginItem.login}>
              <h4 class="p-matrix__title">${loginItem.title}</h4>
            </a>
            <p class="p-matrix__desc u-sv1">${loginItem.description}</p>
            <ul class="p-inline-list u-no-margin--bottom">
              <li class="p-inline-list__item">
                <a class="p-link--inverted" href=${loginItem.login}>Login&nbsp;›</a>
              </li>
              ${loginItem.signup ? `<li class="p-inline-list__item">
                <a class="p-link--inverted" href=${loginItem.signup}>Sign up&nbsp;›</a>
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
      <div class="p-strip--dark is-shallow">
        <div class="row">
          <h5 class="p-muted-heading u-mobile-heading">Customer portals</h5>
        </div>
        <div class="row">
          <ul class="p-matrix u-no-margin--bottom">
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
  const dropdownLinksMobile = wrapper.querySelectorAll('.global-nav--mobile .p-footer__title');
  const overlay = wrapper.querySelector('.global-nav__dropdown-overlay');
  const isMobile = window.innerWidth < breakpoint;

  function closeNav() {
    dropdownContainer.classList.remove('show-global-nav-content');
    dropdownLinks.forEach(link => link.classList.remove('is-selected'));
    overlay.classList.remove('is-visible');
  }

  function openDropdown(dropdownLink) {
    const targetMenuLink = dropdownLink.querySelector('.global-nav__link-anchor');
    const targetMenuId = targetMenuLink.getAttribute('href');
    const targetMenu = wrapper.querySelector(targetMenuId);

    dropdownLink.classList.add('is-selected');
    dropdownContents.forEach(menu => menu !== targetMenu && menu.classList.add('u-hide'));
    targetMenu.classList.remove('u-hide');
    overlay.classList.add('is-visible');
    if (isMobile) window.scrollTo(0, wrapper.offsetTop);
  }

  dropdownLinks.forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (dropdownContainer.classList.contains('show-global-nav-content')) {
        if (dropdownLink.classList.contains('is-selected')) {
          closeNav();
        } else {
          dropdownLinks.forEach(link => link.classList.remove('is-selected'));
          openDropdown(dropdownLink);
        }
      } else {
        dropdownContainer.classList.add('show-global-nav-content');
        openDropdown(dropdownLink);
      }
    });
  });

  dropdownLinksMobile.forEach((dropdownLink) => {
    dropdownLink.addEventListener('click', e => e.target.classList.toggle('active'));
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
  const overlay = createFromHTML('<div class="global-nav__dropdown-overlay"></div>');
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
