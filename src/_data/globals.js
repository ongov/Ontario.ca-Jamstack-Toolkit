var env = process.env.ELEVENTY_ENV || "dev";

module.exports = function() {

  var userFriendlyEnvString = {
    dev: "development",
    stage: "staging",
    prod: "production"
  };

  var siteRootEnvs = {
    dev: "",
    stage: "",
    prod: ""
  };

  var siteRoot = siteRootEnvs[env];

  var assetsRoot = siteRoot + "/jamstack-toolkit/assets";

  var designSystemRoot = assetsRoot + "/vendor/ontario-design-system"

  return {
    assetsRoot: assetsRoot,
    designSystemRoot: designSystemRoot,
    environment: env,
    siteRoot: siteRoot,
    userFriendlyEnvString: userFriendlyEnvString[env]
  }
}