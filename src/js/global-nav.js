import canonicalProducts from './products';
import canonicalLogin from './login';

class GlobalNav {
  constructor(products, login) {
    this.products = products;
    this.login = login;
  }
}

const canonicalGlobalNav = new GlobalNav(canonicalProducts, canonicalLogin);

export { canonicalGlobalNav };
