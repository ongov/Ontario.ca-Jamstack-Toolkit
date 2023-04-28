const cc = require('config-chain');

const conf = cc(cc.find('.jam-on/app/conf.json'));

module.exports = () => {
  const userFriendlyEnvString = {
    dev: 'development',
    stage: 'staging',
    prod: 'production',
  };

  const useApplicationHeader = false;

  const excludeDefaultHeadTagTemplates = {
    charsetMeta: false,
    viewportMeta: false,
    language: false,
    favicons: false,
    socialMeta: false,
  };

  const footerType = 'default';

  const assetsPath = `/${conf.get('assetsDestination')}`;

  // Google Tag Manager can be configured here.  If set, the
  // GOOGLE_TAGMANAGER_ID environment variable will take precedence.
  const googleTagManagerID = '';

  return {
    userFriendlyEnvString,
    useApplicationHeader,
    excludeDefaultHeadTagTemplates,
    footerType,
    assetsPath,
    googleTagManagerID,
  };
};
