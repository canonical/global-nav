# Canonical Global Nav

This project contains the JavaScript and styles to display a banner across the top of a page.

This banner displays a list of Canonical eco-system websites giving a user the ability to jump around the core sites easily.

## Usage

Use a node package manager to install this component and then link the JS file into the head of your site, with optional settings.

The styles will automatically be injected into the page's `<head>`.

1. Install via yarn or npm

```bash
yarn add @canonical/global-nav

```

...or...

```bash
npm install @canonical/global-nav --save
```

2. You can then install the library either by directly linking to it or via ES6 imports.

To consume the library directly, add a link to the JS file containing an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and run the `canonicalGlobalNav.createNav()` function;

```html
<script src="/node_modules/@canonical/global-nav/dist/iife.js"></script>
<script>
  canonicalGlobalNav.createNav();
</script>
```

To import it, simply call it from your site-wide JS file;

```js
import { createNav } from '@canonical/global-nav';
createNav();
```

### Options

The `createNav` function takes an object of options with the following property:

- `maxWidth`: The [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) of the global nav element (default: `68rem`)

For example, to set the `max-width` to `80rem`:

```html
<script src="/node_modules/@canonical/global-nav/dist/index.js"></script>

<script>
  canonicalGlobalNav.createNav({ maxWidth: '80rem' });
</script>
```

- `hiring`: A URL for a hiring page which will display a link in the header to the job page (default: `false`)

For example, to set the `hiring` to `https://boards.greenhouse.io/canonical/jobs/1586585`

```html
<script src="/node_modules/@canonical/global-nav/dist/index.js"></script>

<script>
  canonicalGlobalNav.createNav({
    hiring: 'https://boards.greenhouse.io/canonical/jobs/1586585',
  });
</script>
```

If you're importing;

```js
import { createNav } from '@canonical/global-nav';
createNav({ maxWidth: '80rem' });
```

## Building the Global nav

To build the JS into the `/dist` folder, run:

```bash
./run build
```

## Running the project locally

The simplest way to run the site locally is to first [install Docker](https://docs.docker.com/engine/installation/) (on Linux you may need to [add your user to the `docker` group](https://docs.docker.com/engine/installation/linux/linux-postinstall/)), and then use the `./run` script:

```bash
./run
```

You can also use the [dotrun snap](https://snapcraft.io/dotrun), by running:

```bash
dotrun
```

Once the containers are setup, you can visit <http://127.0.0.1:8300> in your browser.

### Watching changed files

For working on [Sass files](src/sass) and [JS files](src/js) , you may want to dynamically watch for changes to rebuild the dist files whenever something changes.

To setup the watcher, open a new terminal window and run:

```bash
./run watch
```

Before submitting your pull request, run the tests - which checks both the JS and Sass for errors.

```
./run test
```

### How to add inline svgs

Just because this was a bit of a pain, here is what I did.

1. [Shrink the svg](https://www.svgminify.com/) as much as possible
2. Upload it to the asset server for others - OPTIONAL
3. View it in a browser and grab the source code.
4. Convert the quotes from double `"` to single `'` - CRITICAL
5. [Encode the svg](https://meyerweb.com/eric/tools/dencoder/)
6. Add this with `data:image/svg+xml,` in the right place in product-details.js

### Release process

The package is versioned using [semantic versioning](https://semver.org/) and published to the NPM registry.

To cut a new release run;

```bash
npm version [patch|minor|major]
```

This will trigger the `prepublishonly` script which will ensure requisite artefacts are built before publishing.

Code licensed LGPLv3 by Canonical Ltd.

With ♥ from Canonical
