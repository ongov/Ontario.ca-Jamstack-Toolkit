var core = require( "./core/core-globals");
var app = require("./app/app-globals");

module.exports = function() {

  var globals = {
    assetsRoot: core().assetsRoot,
    designSystemRoot: core().designSystemRoot,
    environment: core().env,
    siteRoot: core().siteRoot,
    userFriendlyEnvString: app().userFriendlyEnvString[core().env]
  }

  return globals;
}