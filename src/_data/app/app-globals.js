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

  // Relative to siteRoot
  var assetsPath = '/jamstack-toolkit/assets';

  return {
    userFriendlyEnvString: userFriendlyEnvString,
    useApplicationHeader: useApplicationHeader,
    siteRootEnvs: siteRootEnvs,
    assetsPath: assetsPath,
  };
};
