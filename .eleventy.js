module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/vendor")

    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };