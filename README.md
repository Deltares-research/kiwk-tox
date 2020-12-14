# KIWK TOX

This project is a static site, generated with [Eleventy](https://www.11ty.dev/) and using the [maxboeck/eleventastic template](https://github.com/maxboeck/eleventastic) for CSS, JS and SVG icon setup.

## Getting Started

To install the necessary packages, run this command in the root folder of the site:

```
npm install
````

__Commands__

* Run `npm start` for a development server and live reloading
* Run `npm run build` to generate a production build

### CSS

Styling works with Sass. The main index file is in `src/components/main.scss`. Import any SCSS code you want in there; it will be processed and optimized. The output is in `dist/assets/styles/main.css`

### JS

Javascript can be written in ES6 syntax. The main index file is in `src/components/main.js`. It will be transpiled to ES5 with babel, bundled together with webpack, and minified in production. The output is in `dist/assets/scripts/index.js`

### SVG Icons

All SVG files added to `src/assets/icons` will be bundled into a `symbol` sprite file. The SVG filename will then be used as the symbol identifier and the icon can be used as a shortcode.

For example, if you have a `github.svg` file in that folder, you can display it anywhere by using `{% icon "github" %}` in your templates.

### Critical CSS

Currently, ciritcal CSS will only be inlined in the head of the homepage. This is done by using the [critical](https://github.com/addyosmani/critical) package in an automatic transform.
