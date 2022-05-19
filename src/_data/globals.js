var core = require( "./core/core-globals");
var app = require("./app/app-globals");

module.exports = function() {

  var env = core().env;

  var siteRoot = app().siteRootEnvs[env];

  var assetsRoot = siteRoot + app().assetsPath;

  var designSystemRoot = assetsRoot + core().designSystemPath;

  var globals = {
    assetsRoot: assetsRoot,
    designSystemRoot: designSystemRoot,
    environment: env,
    siteRoot: siteRoot,
    userFriendlyEnvString: app().userFriendlyEnvString[env],
    useApplicationHeader: app().useApplicationHeader
  }

  return globals;
}