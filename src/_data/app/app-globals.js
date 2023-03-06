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

  var excludeDefaultHeadTagTemplates = {
    charsetMeta: false,
    viewportMeta: false,
    language: false,
    favicons: false,
    socialMeta: false,
  };

  var footerType = 'default';

  // Relative to siteRoot
  var assetsPath = `/${conf.get('assetsDestination')}`;

  // Google Tag Manager can be configured here.  If set, the
  // GOOGLE_TAGMANAGER_ID environment variable will take precedence.
  var googleTagManagerID = '';

  return {
    userFriendlyEnvString: userFriendlyEnvString,
    useApplicationHeader: useApplicationHeader,
    footerType: footerType,
    siteRootEnvs: siteRootEnvs,
    assetsPath: assetsPath,
    googleTagManagerID: googleTagManagerID,
  };
};
