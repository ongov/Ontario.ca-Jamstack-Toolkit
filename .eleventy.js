module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets")

    // Return your Object options:
    return {
      pathPrefix: "/",
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };