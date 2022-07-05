const core = require('./.core-eleventy.js');
const app = require('./.app-eleventy.js');

module.exports = function (eleventyConfig) {
  core.configFunc(eleventyConfig);
  app.configFunc(eleventyConfig);

  // Return your Object options:
  return { ...core.configObj, ...app.configObj };
};
