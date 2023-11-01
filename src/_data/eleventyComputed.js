const core = require('./core/core-eleventyComputed');
const app = require('./app/app-eleventyComputed');

module.exports = { ...core, ...app };
