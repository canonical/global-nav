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

export function createProductDropdown(products) {
  const { flagships, others, abouts } = products;

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
            <div class="col-3 col-medium-2">
              <a class="p-link--inverted" href=${flagship.url}>
                ${flagshipLinkContent}
              </a>
            </div>
            <div class="col-9 col-medium-4">
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

  const productAbouts = abouts
    .map(about => {
      const aboutMarkup = `<li class="global-nav__list-item">
          <a class="global-nav__link" href=${about.url}>${about.title}</a>
        </li>`;
      return aboutMarkup;
    })
    .join('');

  return `<div class="global-nav__strip">
      <div class="global-nav__row is-bordered">
        <ul class="p-list--divided u-sv3">
          ${productFlagships}
        </ul>

        <hr class="p-divider" />

        <div class="global-nav__flex-container row u-no-padding">
          <div class="global-nav__others-col col-9 col-medium-6">
            <span class="global-nav__muted-heading">Also from Canonical</span>
            <div class="global-nav__matrix">
              ${productOthers}
            </div>
          </div>
          <hr class="p-divider u-hide--large" />
          <div class="global-nav__about-col col-3 col-medium-2">
            <span class="global-nav__muted-heading">About</span>
            <ul class="global-nav__list">
              ${productAbouts}
            </ul>
          </div>
        </div>
      </div>
    </div>`;
}
