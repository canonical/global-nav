# Canonical Ltd Global nav

This project contains the JavaScript and styles to display a banner across the top of a page. This banner displays a list of corporate eco-system websites. Giving a user the ability to jump arounds the core sites easily.

## Usage

Simply use a node pacakage manager to install this component and then link the JS file into the head of your site, with optional settings. The styles will automatically be injected into the page's `<head>`.

1. Install via yarn or npm

``` bash
yarn add global-nav
npm install global-nav --save
```

2. Add a link to the JS file and run the `canonicalGlobalNav.createNav()` function

``` html
<script src="/node_modules/global-nav/dist/index.js"></script>
<script>canonicalGlobalNav.createNav();</script>
```

### Options

The `createNav` function takes an object of options with the following properties:

- `maxWidth`: The [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) of the global nav element (default: `68rem`)
- `showLogins`: Should the "logins" drop-down be shown? (default: `false`)

For example, to use the global-nav without the "login" section, and set the `max-width` to `80rem`:

``` html
<script src="/node_modules/global-nav/dist/index.js"></script>
<script>canonicalGlobalNav.createNav({showLogins: false, maxWidt: '80rem'});</script>
```

## Building the Global nav

To build the JS into the `/dist` folder, run:

```
yarn build
```

You can view the build files in action by opening the `index.html` in the root of this project.

## Hacking

When developing this project you can run the following command to listen to changes in the `src/js/*js` and `src/sass/*scss` and builds them into the `/dist` folder.

```
yarn watch
```

Before submitting your pull request. Run the lint, which checks both the JS and Sass for errors.

```
yarn lint
```

## Contributing

If you would like to help improve this project, here is a list of commands to help you get started.

Code licensed LGPLv3 by Canonical Ltd.

With ♥ from Canonical 
