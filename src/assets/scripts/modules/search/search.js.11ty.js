const path = require('path');
const createJsModule = require('../../../../../config/eleventy/create-js-module');

const MODULE_FILE = 'search.js';
const filePath = path.join(__dirname, `/${MODULE_FILE}`);

module.exports = createJsModule(filePath);
