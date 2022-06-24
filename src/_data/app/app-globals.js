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

  var footerType = 'expandedGeneral';

  // Relative to siteRoot
  var assetsPath = '/jamstack-toolkit/assets';

  return {
    userFriendlyEnvString: userFriendlyEnvString,
    useApplicationHeader: useApplicationHeader,
    footerType: footerType,
    siteRootEnvs: siteRootEnvs,
    assetsPath: assetsPath,
  };
};
