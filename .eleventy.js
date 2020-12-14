const filters = require('./config/eleventy/filters.js');
const transforms = require('./config/eleventy/transforms.js');
const shortcodes = require('./config/eleventy/shortcodes.js');
const iconsprite = require('./config/eleventy/iconsprite.js');

module.exports = function (config) {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Icon Sprite
  config.addNunjucksAsyncShortcode('iconsprite', iconsprite);

  // Asset Watch Targets
  config.addWatchTarget('./src/assets');
  config.addWatchTarget('./src/*.{js,scss}');

  // Layouts
  config.addLayoutAlias('base', 'base.njk');

  // Pass-through files
  config.addPassthroughCopy({ 'src/static/': '/' });

  config.addPassthroughCopy('src/assets/images');
  config.addPassthroughCopy('src/assets/fonts');

  // Deep-Merge
  config.setDataDeepMerge(true);

  // Base Config
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'components',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['njk', '11ty.js'],
    htmlTemplateEngine: 'njk',
  };
};
