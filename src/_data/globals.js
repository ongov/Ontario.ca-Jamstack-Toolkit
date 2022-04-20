require('dotenv').config()

// contains eleventy application level configuration options
module.exports = function() {
  var env = process.env.ELEVENTY_ENV || "development";
  var assetsDir = "/home-page/page-assets";

  var exampleFetcheUrl = {
    development: "https://api.kanye.rest",
    staging: "https://geek-jokes.sameerkumar.website/api?format=json",
  }
  
  return {
    designSystemRoot: `/${assetsDir}/vendor/ontario-design-system`,
    environment: env,
    assetsDir: assetsDir,
    apiFetchUrl: exampleFetcheUrl[env]
  }
}