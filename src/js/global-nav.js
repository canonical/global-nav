import { canonicalProducts, canonicalLogins } from './product-details';

function createFromHTML(html) {
  const div = window.document.createElement('div'); //eslint-disable-line
  div.innerHTML = html;
  return div.childNodes[0];
}

function createMobileDropdown(products) {
  const { flagships, others, resources, abouts } = products;

  function createListItem(obj) {
    return `<li class="global-nav__list-item">
        <a class="global-nav__link" href=${obj.url}>${obj.title}</a>
      </li>`;
  }

  const mobileFlagships = flagships
    .map(flagship => createListItem(flagship))
    .join('');

  const mobileOthers = others.map(other => createListItem(other)).join('');

  const mobileResources = resources
    .map(resource => createListItem(resource))
    .join('');

  const mobileAbouts = abouts.map(about => createListItem(about)).join('');

  const mobileDropdown = `<div class="global-nav__mobile-strip">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Products</h5>
        <ul class="global-nav__split-list">
          ${mobileFlagships}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Other websites</h5>
        <ul class="global-nav__split-list">
          ${mobileOthers}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">Resources</h5>
        <ul class="global-nav__split-list">
          ${mobileResources}
        </ul>
      </div>
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading global-nav__expanding-row">About</h5>
        <ul class="global-nav__split-list u-no-margin--bottom">
          ${mobileAbouts}
        </ul>
      </div>
    </div>`;

  return mobileDropdown;
}

function createProductDropdown(products) {
  const { flagships, others, resources, abouts } = products;

  const productFlagships = flagships
    .map((flagship, index) => {
      let flagshipMarkup = `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${flagship.url}>
            <img class="global-nav__matrix-image" src=${
              flagship.logoUrl
            } alt="icon">
            <h4 class="global-nav__matrix-title">${flagship.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
            <p class="global-nav__matrix-desc">${flagship.description}</p>
          </div>
        </li>`;

      // Check whether to add extra empty matrix items
      if (index === flagships.length - 1) {
        const extraMatrixCount = (2 * flagships.length) % 3;
        for (let i = 0; i < extraMatrixCount; i += 1) {
          flagshipMarkup += `<li class="global-nav__matrix-item">
              &nbsp;
            </li>`;
        }
      }

      return flagshipMarkup;
    })
    .join('');

  const productOthers = others
    .map((other, index) => {
      let otherMarkup = `<li class="global-nav__matrix-item">
          <div class="global-nav__matrix-content">
            <h4 class="global-nav__matrix-title"><a class="global-nav__link" href=${
              other.url
            }>${other.title}&nbsp;›</a></h4>
            <p class="global-nav__matrix-desc u-no-margin--left">${
              other.description
            }</p>
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
          <a class="global-nav__link" href=${resource.url} title="Visit ${
        resource.title
      }">${resource.title}</a>
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

  const mobileDropdown = createMobileDropdown(products);

  const productDropdown = `${mobileDropdown}
    <div class="global-nav__strip u-hide--mobile">
      <div class="global-nav__row is-bordered">
        <ul class="global-nav__matrix">
          ${productFlagships}
        </ul>
      </div>
    </div>
    <div class="global-nav__strip u-hide--mobile">
      <div class="global-nav__row">
        <div class="global-nav__flex-container">
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
    </div>`;

  return productDropdown;
}

function createLoginDropdown(logins) {
  const loginItems = logins
    .map(loginItem => {
      const loginItemMarkup = `<li class="global-nav__matrix-item">
          <a class="global-nav__link" href=${loginItem.login}>
            <img class="global-nav__matrix-image" src=${
              loginItem.logoUrl
            } alt="">
            <h4 class="global-nav__matrix-title">${loginItem.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
            <p class="global-nav__matrix-desc">${loginItem.description}</p>
            <ul class="global-nav__inline-list">
              <li class="global-nav__list-item">
                <a class="global-nav__link" href=${
                  loginItem.login
                }>Login&nbsp;&rsaquo;</a>
              </li>
              ${
                loginItem.signup
                  ? `<li class="global-nav__list-item">
                <a class="global-nav__link" href=${
                  loginItem.signup
                }>Sign up&nbsp;&rsaquo;</a>
              </li>`
                  : ''
              }
            </ul>
          </div>
        </li>`;
      return loginItemMarkup;
    })
    .join('');

  const loginDropdown = `<div class="global-nav__strip">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading">Customer portals</h5>
      </div>
      <div class="global-nav__row">
        <ul class="global-nav__matrix">
          ${loginItems}
        </ul>
      </div>
    </div>`;

  return loginDropdown;
}

function addListeners(breakpoint, wrapper) {
  const headerLinks = wrapper.querySelectorAll('.global-nav__header-link');
  const dropdownContainer = wrapper.querySelector('.global-nav__dropdown');
  const dropdownContents = wrapper.querySelectorAll(
    '.global-nav__dropdown-content'
  );
  const expandingRows = wrapper.querySelectorAll('.global-nav__expanding-row');
  const overlay = wrapper.querySelector('.global-nav__overlay');
  const isMobile = window.innerWidth < breakpoint; //eslint-disable-line

  function closeNav() {
    dropdownContainer.classList.remove('show-content');
    headerLinks.forEach(link => link.classList.remove('is-selected'));
    overlay.classList.remove('show-overlay');
  }

  function scrollGlobalNavToTop() {
    window.scrollTo(0, wrapper.offsetTop); //eslint-disable-line
  }

  function openDropdown(headerLink) {
    const targetMenuLink = headerLink.querySelector(
      '.global-nav__header-link-anchor'
    );
    const targetMenuId = targetMenuLink.getAttribute('href');
    const targetMenu = wrapper.querySelector(targetMenuId);

    headerLink.classList.add('is-selected');
    dropdownContents.forEach(
      menu => menu !== targetMenu && menu.classList.add('u-hide')
    );
    targetMenu.classList.remove('u-hide');
    overlay.classList.add('show-overlay');

    if (isMobile) {
      scrollGlobalNavToTop();
    }
  }

  headerLinks.forEach(headerLink => {
    headerLink.addEventListener('click', e => {
      e.preventDefault();

      if (dropdownContainer.classList.contains('show-content')) {
        if (headerLink.classList.contains('is-selected')) {
          closeNav();
        } else {
          headerLinks.forEach(link => link.classList.remove('is-selected'));
          openDropdown(headerLink);
        }
      } else {
        dropdownContainer.classList.add('show-content');
        openDropdown(headerLink);
      }
    });
  });

  expandingRows.forEach(expandingRow => {
    expandingRow.addEventListener('click', e => {
      e.target.classList.toggle('is-active');
      scrollGlobalNavToTop();
    });
  });

  overlay.addEventListener('click', closeNav);
}

export const createNav = ({ maxWidth = '68rem', showLogins = true } = {}) => {
  // Recruitment call to action
  console.log(
    'Interested in what makes us tick? Then we are interested in you! See our jobs page for more info: http://ubunt.eu/dev-jobs'
  );

  // Build global nav components
  const wrapper = createFromHTML(
    '<div id="canonical-global-nav" class="global-nav"></div>'
  );
  const overlay = createFromHTML('<div class="global-nav__overlay"></div>');
  var loginsHTML = '';
  var loginsLink = '';

  if (showLogins) {
    loginsLink = [
      '<li class="global-nav__header-link">',
      '  <a class="global-nav__header-link-anchor" href="#canonical-login">Login</a>',
      '</li>',
    ].join('\n');

    loginsHTML = [
      `<div class="global-nav__dropdown-content u-hide" id="canonical-login" style="max-width:${maxWidth}">`,
      `  ${createLoginDropdown(canonicalLogins)}`,
      '</div>',
    ].join('\n');
  }

  const navHeader = createFromHTML(`<div class="global-nav__header">
    <div class="global-nav__header-row global-nav__row" style="max-width:${maxWidth}">
      <div class="global-nav__header-logo">
        <a class="global-nav__header-logo-anchor" href="https://www.canonical.com">
          <svg height="25" width="191">
            <g fill="#fff" fill-rule="evenodd">
            <path d="M11.228 24.933c-1.677 0-3.203-.275-4.58-.824A9.64 9.64 0 0 1 3.1 21.687c-.988-1.064-1.751-2.364-2.29-3.898C.27 16.256 0 14.492 0 12.5s.298-3.76.895-5.306c.597-1.546 1.412-2.845 2.446-3.898A10.5 10.5 0 0 1 6.922.89a11.355 11.355 0 0 1 4.305-.824c1.033 0 1.958.069 2.773.206.814.138 1.52.298 2.118.481a9.794 9.794 0 0 1 1.446.55c.367.183.62.32.758.411l-.999 2.748a5.345 5.345 0 0 0-.895-.446 16.75 16.75 0 0 0-1.361-.48 13.055 13.055 0 0 0-1.705-.396 11.98 11.98 0 0 0-1.962-.154c-1.172 0-2.24.218-3.203.653a6.887 6.887 0 0 0-2.48 1.889c-.689.824-1.222 1.826-1.601 3.005-.38 1.18-.569 2.502-.569 3.966 0 1.421.167 2.714.5 3.882.332 1.168.837 2.169 1.515 3.005a6.87 6.87 0 0 0 2.514 1.94c1 .459 2.175.687 3.53.687 1.516 0 2.773-.16 3.771-.481 1-.32 1.751-.606 2.256-.858l.861 2.747c-.16.115-.447.258-.861.43-.413.171-.93.338-1.55.497a19.713 19.713 0 0 1-4.855.584zM32.442.617a143.474 143.474 0 0 1 2.376 5.203 213.081 213.081 0 0 1 2.29 5.512c.769 1.924 1.555 3.956 2.359 6.097s1.664 4.471 2.583 6.989H38.4a96.614 96.614 0 0 1-1.102-3.056 258.651 258.651 0 0 0-1.068-3.057H25.415l-2.17 6.113h-3.479a777.62 777.62 0 0 1 2.583-6.989 303.06 303.06 0 0 1 2.359-6.096 215.83 215.83 0 0 1 2.29-5.513c.758-1.752 1.55-3.486 2.377-5.203H32.442zm-1.619 3.812a89.372 89.372 0 0 0-2.29 5.358 191.05 191.05 0 0 0-2.152 5.804h8.885a376.257 376.257 0 0 0-2.187-5.787 102.796 102.796 0 0 0-2.256-5.375zM61.785 24.418a191.584 191.584 0 0 0-1.74-2.851 116.948 116.948 0 0 0-2.118-3.28 207.206 207.206 0 0 0-2.36-3.452 150.026 150.026 0 0 0-2.428-3.383 124.226 124.226 0 0 0-2.341-3.074 64.257 64.257 0 0 0-2.101-2.542v18.581h-3.272V.617h2.652a69.167 69.167 0 0 1 3.461 4.001 161.18 161.18 0 0 1 3.651 4.705c1.205 1.614 2.341 3.2 3.409 4.757a90.472 90.472 0 0 1 2.704 4.156V.617h3.272v23.8h-2.79.001zM113.92 24.418c-.5-.847-1.08-1.797-1.74-2.851-.65-1.053-1.36-2.146-2.11-3.28-.76-1.133-1.55-2.284-2.36-3.452-.82-1.168-1.63-2.295-2.43-3.383-.8-1.087-1.59-2.113-2.34-3.074a68.028 68.028 0 0 0-2.1-2.542v18.581h-3.275V.617h2.655a69.568 69.568 0 0 1 3.46 4.001 157.59 157.59 0 0 1 7.06 9.462 83.85 83.85 0 0 1 2.7 4.156V.617h3.27v23.8h-2.79zM122.78.617h3.34v23.8h-3.34V.617zM142.44 24.933c-1.67 0-3.2-.275-4.58-.824a9.662 9.662 0 0 1-3.55-2.422c-.98-1.064-1.75-2.364-2.29-3.898s-.81-3.297-.81-5.289.3-3.761.9-5.307c.6-1.545 1.41-2.845 2.45-3.898a10.416 10.416 0 0 1 3.58-2.404c1.35-.549 2.79-.824 4.3-.824 1.03 0 1.96.068 2.77.206.82.137 1.52.298 2.12.48.6.184 1.08.367 1.45.55.37.183.62.32.76.412l-1 2.748a5.551 5.551 0 0 0-.9-.446c-.39-.16-.84-.32-1.36-.481-.51-.16-1.08-.292-1.7-.395a12.07 12.07 0 0 0-1.97-.155c-1.17 0-2.23.218-3.2.653a6.938 6.938 0 0 0-2.48 1.89c-.69.824-1.22 1.825-1.6 3.004-.38 1.18-.57 2.502-.57 3.967 0 1.42.17 2.713.5 3.881s.84 2.17 1.52 3.006c.67.836 1.51 1.482 2.51 1.94s2.18.687 3.53.687c1.52 0 2.77-.16 3.77-.481 1-.32 1.75-.606 2.26-.859l.86 2.748c-.16.115-.45.257-.86.429-.42.172-.93.339-1.55.498a19.645 19.645 0 0 1-4.87.584h.01zM163.66.617c.82 1.717 1.61 3.451 2.37 5.203.76 1.751 1.52 3.589 2.29 5.512.77 1.924 1.56 3.956 2.36 6.097s1.67 4.471 2.58 6.989h-3.65c-.39-1.03-.75-2.049-1.1-3.056-.34-1.008-.7-2.027-1.07-3.057h-10.81l-2.17 6.113h-3.48c.92-2.518 1.78-4.848 2.58-6.989.81-2.141 1.59-4.173 2.36-6.096.77-1.924 1.54-3.761 2.29-5.513.76-1.752 1.55-3.486 2.38-5.203h3.07zm-1.62 3.812a82.767 82.767 0 0 0-2.29 5.358c-.73 1.854-1.45 3.79-2.16 5.804h8.89c-.74-1.991-1.47-3.921-2.19-5.787s-1.47-3.658-2.25-5.375zM191 21.636v2.782h-14.36V.617h3.34v21.019H191zM81.072 20.417c-4.385 0-7.939-3.544-7.939-7.917 0-4.373 3.554-7.916 7.939-7.916 4.384 0 7.938 3.544 7.938 7.916 0 4.373-3.553 7.917-7.938 7.917z"/>
            <path d="M93.538 12.5c0 6.867-5.582 12.433-12.467 12.433S68.604 19.366 68.604 12.5 74.185.067 81.071.067c6.884 0 12.467 5.567 12.467 12.433zM81.072 3.092c-5.211 0-9.435 4.212-9.435 9.408 0 5.197 4.224 9.409 9.435 9.409 5.21 0 9.434-4.212 9.434-9.409 0-5.196-4.226-9.408-9.435-9.408h.001z"/>
            </g>
          </svg>
        </a>
      </div>
      <ul class="global-nav__header-list">
        <li class="global-nav__header-link">
          <a class="global-nav__header-link-anchor" href="#canonical-products">Products</a>
        </li>
        ${loginsLink}
      </ul>
    </div>
  </div>`);

  const navDropdown = createFromHTML(
    `<div class="global-nav__dropdown">
      <div class="global-nav__dropdown-content u-hide" id="canonical-products" style="max-width:${maxWidth}">
        ${createProductDropdown(canonicalProducts)}
      </div>
      ${loginsHTML}
    </div>`
  );

  // Attach to the DOM
  document.body.insertBefore(wrapper, document.body.firstElementChild); //eslint-disable-line
  wrapper.appendChild(navHeader);
  wrapper.appendChild(navDropdown);
  wrapper.appendChild(overlay);

  // Add event listeners
  addListeners(900, wrapper);
};
