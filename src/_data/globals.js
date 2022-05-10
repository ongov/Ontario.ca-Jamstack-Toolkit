var env = process.env.ELEVENTY_ENV || "dev";

module.exports = function() {

  var userFriendlyEnvString = {
    dev: "development",
    stage: "staging",
    prod: "production"
  }

  var siteRootEnvs = {
    development: "",
    staging: "",
    prod: ""
  }

  var siteRoot = siteRootEnvs[env]

  return {
    designSystemRoot: siteRoot + "/assets/vendor/ontario-design-system",
    environment: env,
    siteRoot: siteRoot,
    userFriendlyEnvString: userFriendlyEnvString[env]
  }
}