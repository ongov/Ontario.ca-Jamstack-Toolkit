const core = require('./.core-eleventy.js');
const app = require('./.app-eleventy.js');

module.exports = function (eleventyConfig) {
  core.config(eleventyConfig);

  // Return your Object options:
  return {
    pathPrefix: '/',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
