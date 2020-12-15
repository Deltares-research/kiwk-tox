const eleventyTemplateClass = require('./eleventy-template-class');

module.exports = function (fullPath, frontMatter) {
  const fileName = fullPath.split('/').pop().split('.').shift();
  return class extends eleventyTemplateClass {
    FULL_PATH = fullPath;
    FILE_NAME = fileName;
    FRONT_MATTER = frontMatter || {};
  };
};
