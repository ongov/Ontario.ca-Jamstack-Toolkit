module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/": "home-page/page-assets" });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};