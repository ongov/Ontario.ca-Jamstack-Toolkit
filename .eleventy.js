module.exports = function (eleventyConfig) {
  // set location of assets folder
  eleventyConfig.addPassthroughCopy({ "src/assets/": "home-page/page-assets" });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};