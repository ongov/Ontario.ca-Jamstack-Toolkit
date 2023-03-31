const core = require('./core/core-globals');
const app = require('./app/app-globals');

module.exports = () => {
  const { env } = core();

  const siteRoot = app().siteRootEnvs[env];

  const assetsRoot = siteRoot + app().assetsPath;

  const designSystemRoot = assetsRoot + core().designSystemPath;

  const globals = {
    assetsRoot,
    designSystemRoot,
    environment: env,
    siteRoot,
    userFriendlyEnvString: app().userFriendlyEnvString[env],
    useApplicationHeader: app().useApplicationHeader,
    footerType: core().allowedFooterTypes[app().footerType],
  };

  if (!globals.footerType) {
    throw new Error(
      `'${
        app().footerType
      }' is not an allowed footer type; allowed types are ${JSON.stringify(
        Object.keys(core().allowedFooterTypes),
      )}`,
    );
  }

  return globals;
};
