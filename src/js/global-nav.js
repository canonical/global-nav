import canonicalProducts from './canonical-products';
import canonicalLogins from './canonical-logins';

function createFromHTML(html) {
  const div = window.document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
}

class GlobalNav {
  constructor(products, logins, breakpoint = 900) {
    this.homeUrl = 'https://www.canonical.com';
    this.logoUrl = 'https://assets.ubuntu.com/v1/9c74eb2d-logo-canonical-white.svg';
    this.products = products;
    this.logins = logins;
    this.breakpoint = breakpoint;
    this.wrapper = createFromHTML('<div id="canonical-global-nav" class="global-nav"></div>');
  }

  createNav() {
    const { wrapper } = this;
    const navRow = this.createNavRow();
    const navDropdown = this.createNavDropdown();
    const overlay = createFromHTML('<div class="global-nav__dropdown-overlay"></div>');

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
    
    const mobileDropdown = this.createMobileDropdown();

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

  createMobileDropdown() {
    const { products, logins } = this;
    const {
      flagships, others, resources, abouts
    } = products;

    const mobileDropdown = (
      `<div class="p-strip--dark is-shallow u-hide--medium u-hide--large global-nav--mobile">
        <div class="row">
          <h5 class="p-muted-heading p-footer__title">Products</h5>
          <ul class="p-list is-split second-level-nav">
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/">Ubuntu</a></li>
            <li class="p-list__item"><a class="p-link" href="https://maas.io/">MAAS</a></li>
            <li class="p-list__item"><a class="p-link" href="https://landscape.canonical.com/">Landscape</a></li>
            <li class="p-list__item"><a class="p-link" href="https://jujucharms.com/">Juju</a></li>
            <li class="p-list__item"><a class="p-link" href="https://linuxcontainers.org/">LXD</a></li>
            <li class="p-list__item"><a class="p-link" href="https://snapcraft.io/">Snaps</a></li>
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/openstack">OpenStack</a></li>
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/kubernetes">Kubernetes</a></li>
          </ul>
        </div>
        <div class="row">
          <h5 class="p-muted-heading p-footer__title">Other websites</h5>
          <ul class="p-list is-split second-level-nav">
            <li class="p-list__item"><a class="p-link" href="http://www.ubuntu.com/support">Enterprise Support</a></li>
            <li class="p-list__item"><a class="p-link" href="https://wiki.ubuntu.com/Mir">Mir</a></li>
            <li class="p-list__item"><a class="p-link" href="https://cloud-images.ubuntu.com/">Image Service</a></li>
            <li class="p-list__item"><a class="p-link" href="https://conjure-up.io/">Conjure-up</a></li>
            <li class="p-list__item"><a class="p-link" href="https://cloud-init.io/">Cloud-init</a></li>
            <li class="p-list__item"><a class="p-link" href="http://www.netplan.io/">Netplan</a></li>
          </ul>
        </div>
        <div class="row">
          <h5 class="p-muted-heading p-footer__title">Resources</h5>
          <ul class="p-list is-split second-level-nav">
            <li class="p-list__item"><a class="p-link" href="https://www.brighttalk.com/search?q=Canonical" title="Visit the Webinars - external site">Webinars</a></li>
            <li class="p-list__item"><a class="p-link" href="https://tutorials.ubuntu.com/" title="Visit the Tutorials - external site">Tutorials</a></li>
            <li class="p-list__item"><a class="p-link" href="/resources?content=videos" title="Visit the Videos">Videos</a></li>
            <li class="p-list__item"><a class="p-link" href="https://blog.ubuntu.com/archives?category=case-studies" title="Visit the Case studies - external site">Case studies</a></li>
            <li class="p-list__item"><a class="p-link" href="https://blog.ubuntu.com/archives?category=white-papers" title="Visit the White papers - external site">White papers</a></li>
            <li class="p-list__item"><a class="p-link" href="https://docs.ubuntu.com" title="Visit the Docs - external site">Docs</a></li>
            <li class="p-list__item"><a class="p-link" href="/cloud/training">Training</a></li>
            <li class="p-list__item"><a class="p-link" href="https://blog.ubuntu.com" title="Visit the Blog - external site">Blog</a></li>
            <li class="p-list__item"><a class="p-link" href="https://developer.ubuntu.com">Developer</a></li>
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/download/cloud">Install</a></li>
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/download">Download</a></li>
          </ul>
        </div>
        <div class="row">
          <h5 class="p-muted-heading p-footer__title">About</h5>
          <ul class="p-list is-split second-level-nav">
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com">Ubuntu</a></li>
            <li class="p-list__item"><a class="p-link" href="https://www.canonical.com">Canonical</a></li>
            <li class="p-list__item"><a class="p-link" href="https://blog.ubuntu.com/press-centre">Press centre</a></li>
            <li class="p-list__item"><a class="p-link" href="https://partners.ubuntu.com">Partners</a></li>
            <li class="p-list__item"><a class="p-link" href="https://shop.canonical.com/">Merchandise</a></li>
            <li class="p-list__item"><a class="p-link" href="https://mongoose.ubuntu.com/about/contact-us">Contact</a></li>
          </ul>
        </div>
      </div>`
    );

    return mobileDropdown;
  }

  addListeners() {
    const { breakpoint, wrapper } = this;
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
}

const canonicalGlobalNav = new GlobalNav(canonicalProducts, canonicalLogins);

export { canonicalGlobalNav };
