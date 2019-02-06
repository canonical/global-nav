import { canonicalProducts, canonicalLogins } from './product-details';

function createFromHTML(html) {
  const div = window.document.createElement('div'); //eslint-disable-line
  div.innerHTML = html;
  return div.childNodes[0];
}

function createNavHeader(homeUrl, logoUrl, maxWidth) {
  const navRow = createFromHTML(`<div class="global-nav__header">
    <div class="global-nav__header-row global-nav__row" style="max-width:${maxWidth}">
      <div class="global-nav__header-logo">
        <a class="global-nav__header-logo-anchor" href=${homeUrl}>
          <img src=${logoUrl} width="74px">
        </a>
      </div>
      <ul class="global-nav__header-list">
        <li class="global-nav__header-link">
          <a class="global-nav__header-link-anchor" href="#canonical-products">Products</a>
        </li>
        <li class="global-nav__header-link">
          <a class="global-nav__header-link-anchor" href="#canonical-login">Login</a>
        </li>
      </ul>
    </div>
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
    `<div class="global-nav__mobile-strip">
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
            <img class="global-nav__matrix-image" src=${flagship.logoUrl} width="32" height="32" alt="icon">
            <h4 class="global-nav__matrix-title">${flagship.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
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
            <p class="global-nav__matrix-desc u-no-margin--left">${other.description}</p>
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
    `${mobileDropdown}
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
            <h4 class="global-nav__matrix-title">${loginItem.title}</h4>
          </a>
          <div class="global-nav__matrix-content">
            <p class="global-nav__matrix-desc">${loginItem.description}</p>
            <ul class="global-nav__inline-list">
              <li class="global-nav__list-item">
                <a class="global-nav__link" href=${loginItem.login}>Login&nbsp;&rsaquo;</a>
              </li>
              ${loginItem.signup ? `<li class="global-nav__list-item">
                <a class="global-nav__link" href=${loginItem.signup}>Sign up&nbsp;&rsaquo;</a>
              </li>` : ''}
            </ul>
          </div>
        </li>`
      );
      return loginItemMarkup;
    })
    .join('');

  const loginDropdown = (
    `<div class="global-nav__strip">
      <div class="global-nav__row">
        <h5 class="global-nav__muted-heading">Customer portals</h5>
      </div>
      <div class="global-nav__row">
        <ul class="global-nav__matrix">
          ${loginItems}
        </ul>
      </div>
    </div>`
  );

  return loginDropdown;
}

function addListeners(breakpoint, wrapper) {
  const headerLinks = wrapper.querySelectorAll('.global-nav__header-link');
  const dropdownContainer = wrapper.querySelector('.global-nav__dropdown');
  const dropdownContents = wrapper.querySelectorAll('.global-nav__dropdown-content');
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
    const targetMenuLink = headerLink.querySelector('.global-nav__header-link-anchor');
    const targetMenuId = targetMenuLink.getAttribute('href');
    const targetMenu = wrapper.querySelector(targetMenuId);

    headerLink.classList.add('is-selected');
    dropdownContents.forEach(menu => menu !== targetMenu && menu.classList.add('u-hide'));
    targetMenu.classList.remove('u-hide');
    overlay.classList.add('show-overlay');

    if (isMobile) {
      scrollGlobalNavToTop();
    }
  }

  headerLinks.forEach((headerLink) => {
    headerLink.addEventListener('click', (e) => {
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

  expandingRows.forEach((expandingRow) => {
    expandingRow.addEventListener('click', (e) => {
      e.target.classList.toggle('is-active');
      scrollGlobalNavToTop();
    });
  });

  overlay.addEventListener('click', closeNav);
}

export const createNav = ({
  maxWidth = '68rem',
  breakpoint = 900,
  homeUrl = 'https://www.canonical.com',
  logoUrl = 'data:image/svg+xml,%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3Csvg%20version%3D%271.1%27%20viewBox%3D%270%200%20191%2025%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%3Ctitle%3ECanonical%3C%2Ftitle%3E%0A%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%0A%3Cg%20transform%3D%27translate(-368%20-5148)%27%20fill%3D%27%23fff%27%3E%0A%3Cg%20transform%3D%27translate(1%204995)%27%3E%0A%3Cg%20transform%3D%27translate(367%20153)%27%3E%0A%3Cpath%20d%3D%27m11.228%2024.933c-1.6768%200-3.2032-0.275-4.5808-0.824-1.3776-0.55-2.5606-1.357-3.547-2.422-0.9877-1.064-1.7513-2.364-2.2904-3.898-0.54001-1.533-0.8098-3.297-0.8098-5.289s0.29844-3.7607%200.89531-5.3063c0.59649-1.5453%201.4118-2.8449%202.4452-3.8981%201.033-1.0527%202.2268-1.8547%203.5817-2.4043%201.3545-0.54884%202.7898-0.82384%204.3048-0.82384%201.033%200%201.958%200.06825%202.773%200.20595%200.814%200.1373%201.52%200.29762%202.118%200.48056%200.596%200.18333%201.078%200.36663%201.446%200.54963%200.367%200.1833%200.62%200.3206%200.758%200.4119l-0.999%202.748c-0.207-0.1377-0.505-0.2861-0.895-0.4464-0.391-0.16-0.844-0.3203-1.361-0.481-0.517-0.1595-1.085-0.2917-1.705-0.3948-0.619-0.1028-1.274-0.1544-1.962-0.1544-1.172%200-2.2392%200.2179-3.2033%200.6528-0.9646%200.4353-1.791%201.0647-2.4798%201.8889-0.6888%200.8246-1.2224%201.8262-1.6012%203.0051-0.3789%201.1794-0.5683%202.5023-0.5683%203.9663%200%201.421%200.1664%202.714%200.4994%203.882%200.3323%201.168%200.8376%202.169%201.5153%203.005%200.6768%200.836%201.5152%201.482%202.514%201.94%200.9992%200.459%202.1749%200.687%203.5299%200.687%201.516%200%202.773-0.16%203.771-0.481%201-0.32%201.751-0.606%202.256-0.858l0.861%202.747c-0.16%200.115-0.447%200.258-0.861%200.43-0.413%200.171-0.93%200.338-1.55%200.497-0.619%200.161-1.343%200.298-2.169%200.413-0.827%200.114-1.722%200.171-2.686%200.171z%27%2F%3E%0A%3Cpath%20d%3D%27m32.442%200.61667c0.826%201.7174%201.618%203.4516%202.376%205.2031%200.758%201.7516%201.521%203.5889%202.29%205.5122%200.769%201.924%201.555%203.956%202.359%206.097s1.664%204.471%202.583%206.989h-3.65c-0.391-1.03-0.758-2.049-1.102-3.056-0.345-1.008-0.701-2.027-1.068-3.057h-10.815l-2.17%206.113h-3.479c0.918-2.518%201.779-4.848%202.583-6.989%200.803-2.141%201.59-4.173%202.359-6.096%200.769-1.9239%201.533-3.7612%202.29-5.5128%200.758-1.7519%201.55-3.4861%202.377-5.2031l3.065-4.3e-4h2e-3zm-1.619%203.8123c-0.803%201.7174-1.566%203.5031-2.29%205.3579-0.723%201.8541-1.441%203.7901-2.152%205.8041h8.885c-0.735-1.991-1.463-3.921-2.187-5.787-0.723-1.8659-1.476-3.658-2.256-5.375z%27%2F%3E%0A%3Cpath%20d%3D%27m61.785%2024.418c-0.506-0.847-1.085-1.797-1.74-2.851-0.654-1.053-1.36-2.146-2.118-3.28-0.758-1.133-1.544-2.284-2.36-3.452-0.814-1.168-1.624-2.295-2.428-3.383-0.803-1.088-1.584-2.1127-2.341-3.0742-0.758-0.9615-1.459-1.8088-2.101-2.5417v18.581h-3.272v-23.8l2.652-3.3e-4c1.079%201.1448%202.233%202.4785%203.461%204.0012%201.228%201.523%202.445%203.0908%203.651%204.7051%201.205%201.614%202.341%203.2%203.409%204.757%201.068%201.558%201.968%202.943%202.704%204.156v-17.619l3.272-3.3e-4v23.8l-2.79%201e-3h1e-3z%27%2F%3E%0A%3Cpath%20d%3D%27m113.92%2024.418c-0.5-0.847-1.08-1.797-1.74-2.851-0.65-1.053-1.36-2.146-2.11-3.28-0.76-1.133-1.55-2.284-2.36-3.452-0.82-1.168-1.63-2.295-2.43-3.383-0.8-1.087-1.59-2.1127-2.34-3.0742-0.76-0.9615-1.46-1.8088-2.1-2.5417v18.581h-3.275v-23.8l2.655-3.3e-4c1.08%201.1448%202.23%202.4785%203.46%204.0012%201.23%201.523%202.44%203.0908%203.65%204.7051%201.2%201.614%202.34%203.2%203.41%204.757%201.07%201.558%201.97%202.943%202.7%204.156v-17.619l3.27-3.3e-4v23.8l-2.79%201e-3z%27%2F%3E%0A%3Cpath%20d%3D%27m122.78%200.61667h3.34v23.8h-3.34v-23.8z%27%2F%3E%0A%3Cpath%20d%3D%27m142.44%2024.933c-1.67%200-3.2-0.275-4.58-0.824-1.38-0.55-2.56-1.357-3.55-2.422-0.98-1.064-1.75-2.364-2.29-3.898s-0.81-3.297-0.81-5.289%200.3-3.7611%200.9-5.3067c0.6-1.5453%201.41-2.8449%202.45-3.8981%201.03-1.0527%202.22-1.8547%203.58-2.4043%201.35-0.54884%202.79-0.82384%204.3-0.82384%201.03%203e-6%201.96%200.06826%202.77%200.20596%200.82%200.1373%201.52%200.29761%202.12%200.48055%200.6%200.18333%201.08%200.36663%201.45%200.54963%200.37%200.1833%200.62%200.3206%200.76%200.4119l-1%202.748c-0.21-0.1377-0.51-0.2861-0.9-0.4464-0.39-0.16-0.84-0.3203-1.36-0.481-0.51-0.1595-1.08-0.2917-1.7-0.3948-0.62-0.1028-1.28-0.1544-1.97-0.1544-1.17%200-2.23%200.2179-3.2%200.6528-0.96%200.4353-1.79%201.0647-2.48%201.8889-0.69%200.8246-1.22%201.8262-1.6%203.0051-0.38%201.1794-0.57%202.5017-0.57%203.9667%200%201.42%200.17%202.713%200.5%203.881s0.84%202.17%201.52%203.006c0.67%200.836%201.51%201.482%202.51%201.94s2.18%200.687%203.53%200.687c1.52%200%202.77-0.16%203.77-0.481%201-0.32%201.75-0.606%202.26-0.859l0.86%202.748c-0.16%200.115-0.45%200.257-0.86%200.429-0.42%200.172-0.93%200.339-1.55%200.498-0.62%200.16-1.34%200.297-2.17%200.413-0.84%200.114-1.73%200.171-2.7%200.171h0.01z%27%2F%3E%0A%3Cpath%20d%3D%27m163.66%200.61667c0.82%201.7174%201.61%203.4516%202.37%205.2031%200.76%201.7516%201.52%203.5889%202.29%205.5122%200.77%201.924%201.56%203.956%202.36%206.097s1.67%204.471%202.58%206.989h-3.65c-0.39-1.03-0.75-2.049-1.1-3.056-0.34-1.008-0.7-2.027-1.07-3.057h-10.81l-2.17%206.113h-3.48c0.92-2.518%201.78-4.848%202.58-6.989%200.81-2.141%201.59-4.173%202.36-6.096%200.77-1.9239%201.54-3.7612%202.29-5.5128%200.76-1.7519%201.55-3.4861%202.38-5.2031l3.07-4.3e-4zm-1.62%203.8123c-0.81%201.7174-1.57%203.5031-2.29%205.3579-0.73%201.8541-1.45%203.7901-2.16%205.8041h8.89c-0.74-1.991-1.47-3.921-2.19-5.787-0.72-1.8659-1.47-3.658-2.25-5.375z%27%2F%3E%0A%3Cpath%20d%3D%27m191%2021.636v2.782h-14.36v-23.801l3.34-3.3e-4v21.019h11.02z%27%2F%3E%0A%3Cpath%20d%3D%27m81.072%2020.417c-4.385%200-7.939-3.544-7.939-7.917%200-4.3726%203.554-7.9163%207.939-7.9163%204.384%200%207.938%203.5441%207.938%207.9163%200%204.373-3.553%207.917-7.938%207.917z%27%2F%3E%0A%3Cpath%20d%3D%27m93.538%2012.5c0%206.867-5.582%2012.433-12.467%2012.433s-12.467-5.567-12.467-12.433c0-6.8663%205.581-12.433%2012.467-12.433%206.884%204.6e-4%2012.467%205.5667%2012.467%2012.433zm-12.466-9.4083c-5.211%200-9.435%204.2127-9.435%209.4083%200%205.197%204.224%209.409%209.435%209.409%205.21%200%209.434-4.212%209.434-9.409%200-5.196-4.226-9.4083-9.435-9.4083h1e-3z%27%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A',
  products = canonicalProducts,
  logins = canonicalLogins,
} = {}) => {
  // Build global nav components
  const wrapper = createFromHTML('<div id="canonical-global-nav" class="global-nav"></div>');
  const overlay = createFromHTML('<div class="global-nav__overlay"></div>');
  const navHeader = createNavHeader(homeUrl, logoUrl, maxWidth);
  const loginDropdown = createLoginDropdown(logins);
  const productDropdown = createProductDropdown(products);
  const navDropdown = createFromHTML(
    `<div class="global-nav__dropdown">
      <div class="global-nav__dropdown-content u-hide" id="canonical-login" style="max-width:${maxWidth}">
        ${loginDropdown}
      </div>
      <div class="global-nav__dropdown-content u-hide" id="canonical-products" style="max-width:${maxWidth}">
        ${productDropdown}
      </div>
    </div>`,
  );

  // Attach to the DOM
  document.body.insertBefore(wrapper, document.body.firstElementChild); //eslint-disable-line
  wrapper.appendChild(navHeader);
  wrapper.appendChild(navDropdown);
  wrapper.appendChild(overlay);

  // Add event listeners
  addListeners(breakpoint, wrapper);
};
