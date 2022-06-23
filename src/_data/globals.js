var core = require('./core/core-globals');
var app = require('./app/app-globals');

module.exports = function () {
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
    useApplicationHeader: app().useApplicationHeader,
    footerType: core().allowedFooterTypes[app().footerType],
  };

  console.log(app().footerType, globals.footerType);

  if (!globals.footerType) {
    throw new Error(`'${app().footerType}' is not an allowed footer type`);
  }

  return globals;
};
