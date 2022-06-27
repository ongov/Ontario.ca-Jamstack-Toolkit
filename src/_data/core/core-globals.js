module.exports = function () {
  var env = process.env.ELEVENTY_ENV || 'dev';

  // Relative to assetsRoot (see app-globals.js)
  var designSystemPath = '/vendor/ontario-design-system';

  var allowedFooterTypes = {
    default: 'default',
    expanded: 'expanded',
  };

  return {
    allowedFooterTypes: allowedFooterTypes,
    designSystemPath: designSystemPath,
    env: env,
  };
};
