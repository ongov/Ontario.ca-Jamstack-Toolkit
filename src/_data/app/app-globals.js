module.exports = function () {
  var userFriendlyEnvString = {
    dev: 'development',
    stage: 'staging',
    prod: 'production',
  };

  var siteRootEnvs = {
    dev: '',
    stage: '',
    prod: '',
  };

  var useApplicationHeader = false;

  var footerType = 'default';

  // Relative to siteRoot
  var assetsPath = '/example-pages/assets';

  return {
    userFriendlyEnvString: userFriendlyEnvString,
    useApplicationHeader: useApplicationHeader,
    footerType: footerType,
    siteRootEnvs: siteRootEnvs,
    assetsPath: assetsPath,
  };
};
