const core = require('./.core-eleventy');
const app = require('./.app-eleventy');

module.exports = (eleventyConfig) => {
  core.configFunc(eleventyConfig);
  app.configFunc(eleventyConfig);

  // Return your Object options:
  return { ...core.configObj, ...app.configObj };
};
