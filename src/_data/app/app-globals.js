const cc = require('config-chain');

var conf = cc(cc.find('.jam-on/app/conf.json'));

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
  var assetsPath = `/${conf.get('assetsDestination')}`;

  return {
    userFriendlyEnvString: userFriendlyEnvString,
    useApplicationHeader: useApplicationHeader,
    footerType: footerType,
    siteRootEnvs: siteRootEnvs,
    assetsPath: assetsPath,
  };
};
