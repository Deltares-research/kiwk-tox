const path = require('path');
const createJsModule = require('../config/eleventy/createJsModule');

const MODULE_FILE = 'main.js';
const filePath = path.join(__dirname, `/${MODULE_FILE}`);

module.exports = createJsModule(filePath);
