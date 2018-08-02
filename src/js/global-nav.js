import canonicalProducts from './canonical-products';
import canonicalLogins from './canonical-logins';

function createFromHTML(html) {
  const div = window.document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
}

class GlobalNav {
  constructor(products, logins, navBreakpoint = 768) {
    this.globalNavSelector = '.global-nav';
    this.homeUrl = 'https://www.canonical.com';
    this.logins = logins;
    this.logoUrl = 'https://assets.ubuntu.com/v1/9c74eb2d-logo-canonical-white.svg';
    this.navBreakpoint = navBreakpoint;
    this.overlay = createFromHTML('<div class="global-nav__dropdown-overlay"></div>');
    this.products = products;
    this.wrapper = createFromHTML('<div id="canonical-global-nav" class="global-nav"></div>');
  }

  createNav() {
    const { overlay, wrapper } = this;
    const navRow = this.createNavRow();
    const navDropdown = this.createNavDropdown();

    // Build global nav
    document.body.insertBefore(wrapper, document.body.firstElementChild);
    wrapper.appendChild(navRow);
    wrapper.appendChild(navDropdown);
    wrapper.appendChild(overlay);

    // Add event listeners
    this.addListeners();
  }

  createNavRow() {
    const { homeUrl, logoUrl } = this;
    const navRow = createFromHTML(`<div class="global-nav__row row">
      <div class="global-nav__logo">
        <a class="global-nav__logo-anchor" href=${homeUrl}>
          <img src=${logoUrl}>
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

  createNavDropdown() {
    const loginDropdown = this.createLoginDropdown();
    const productDropdown = this.createProductDropdown();
    const navDropdown = createFromHTML(
      `<div class="global-nav__dropdown">
        ${loginDropdown}
        ${productDropdown}
      </div>`,
    );

    return navDropdown;
  }

  createProductDropdown() {
    const {
      flagships, others, resources, abouts,
    } = this.products;

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
      </div>`
    );

    return productDropdown;
  }

  createLoginDropdown() {
    const { logins } = this;

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

  addListeners() {
    const { globalNavSelector, wrapper } = this;
    const dropdownLinks = wrapper.querySelectorAll(`${globalNavSelector}__link--dropdown`);
    const dropdownContainer = wrapper.querySelector(`${globalNavSelector}__dropdown`);
    const dropdownContents = wrapper.querySelectorAll(`${globalNavSelector}__dropdown-content`);
    const overlay = wrapper.querySelector(`${globalNavSelector}__dropdown-overlay`);

    function closeNav() {
      dropdownContainer.classList.remove('show-global-nav-content');
      dropdownLinks.forEach(link => link.classList.remove('is-selected'));
      overlay.classList.remove('is-visible');
    }

    function openDropdown(dropdownLink) {
      const targetMenuLink = dropdownLink.querySelector(`${globalNavSelector}__link-anchor`);
      const targetMenuId = targetMenuLink.getAttribute('href');
      const targetMenu = wrapper.querySelector(targetMenuId);

      dropdownLink.classList.add('is-selected');
      dropdownContents.forEach(menu => menu !== targetMenu && menu.classList.add('u-hide'));
      targetMenu.classList.remove('u-hide');
      overlay.classList.add('is-visible');
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
    overlay.addEventListener('click', closeNav);
  }
}

const canonicalGlobalNav = new GlobalNav(canonicalProducts, canonicalLogins);

export { canonicalGlobalNav };
