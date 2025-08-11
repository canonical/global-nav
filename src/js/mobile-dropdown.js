function createListItem(obj) {
  return `<li>
      <a class="p-navigation__dropdown-item" href=${obj.url}>${obj.title}</a>
    </li>`;
}

function createBackItem(id) {
  return `<li class="p-navigation__item--dropdown-close">
      <button href=${`#${id}`} aria-controls=${id} class="p-navigation__link js-back-button">
        Back
      </button>
    </li>`;
}

export function createMobileDropdown(products, isSliding) {
  const { flagships, others, abouts } = products;

  const mobileFlagships = flagships.map(flagship => createListItem(flagship));
  const mobileOthers = others.map(other => createListItem(other));
  const mobileAbouts = abouts.map(about => createListItem(about));

  // if is sliding navigation we need to add the "back" buttons
  if (isSliding) {
    mobileFlagships.unshift(createBackItem('products'));
    mobileOthers.unshift(createBackItem('also-from-canonical'));
    mobileAbouts.unshift(createBackItem('about'));
  }

  // for sliding navigation we can't have the same wrapping elements
  return `<${isSliding ? 'div' : 'li'} id="all-canonical-mobile" class="u-hide">
    ${isSliding ? '' : '<ul class="p-navigation__items">'}
      <li class="p-navigation__item--dropdown-toggle global-nav__dropdown-toggle">
        <button href="#products" class="p-navigation__link global-nav__header-link-anchor" aria-controls="products">
          Products
        </button>
        <ul id="products" class="p-navigation__dropdown" ${
          isSliding ? 'aria-hidden="true"' : ''
        }>
          ${mobileFlagships.join('')}
        </ul>
      </li>
      <li class="p-navigation__item--dropdown-toggle global-nav__dropdown-toggle">
        <button href="#also-from-canonical" class="p-navigation__link global-nav__header-link-anchor" aria-controls="also-from-canonical">
          Also from Canonical
        </button>
        <ul id="also-from-canonical" class="p-navigation__dropdown" ${
          isSliding ? 'aria-hidden="true"' : ''
        }>
          ${mobileOthers.join('')}
        </ul>
      </li>
      <li class="p-navigation__item--dropdown-toggle global-nav__dropdown-toggle">
        <button href="#about" class="p-navigation__link global-nav__header-link-anchor" aria-controls="about">
          About
        </button>
        <ul id="about" class="p-navigation__dropdown u-no-margin--bottom" ${
          isSliding ? 'aria-hidden="true"' : ''
        }>
          ${mobileAbouts.join('')}
        </ul>
      </li>
    ${isSliding ? '' : '</ul>'}
  </${isSliding ? 'div' : 'ul'}>`;
}
