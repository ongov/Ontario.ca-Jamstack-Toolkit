var core = require( "./core/core-globals");
var app = require("./app/app-globals");

module.exports = function() {

  var env = core().env;

  var globals = {
    assetsRoot: core().assetsRoot,
    designSystemRoot: core().designSystemRoot,
    environment: env,
    siteRoot: core().siteRoot,
    userFriendlyEnvString: app().userFriendlyEnvString[env]
  }

  return globals;
}