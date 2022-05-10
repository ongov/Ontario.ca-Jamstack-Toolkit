const localeStrings = require("./src/_data/localeStrings.json")

const fs = require('fs')
const matter = require('gray-matter')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"src/assets" : "jamstack-toolkit/assets"})

    eleventyConfig.addFilter("localeString", function(key) {
      // Solution for accessing page front matter from https://stackoverflow.com/a/67746326

      var page = this.ctx.page;
      var str = fs.readFileSync(page.inputPath, 'utf8')
      var data = matter(str).data;
      var lang = data.lang || "en";
      return `${localeStrings[key][lang]}`;
    });

    // Return your Object options:
    return {
      pathPrefix: "/",
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };