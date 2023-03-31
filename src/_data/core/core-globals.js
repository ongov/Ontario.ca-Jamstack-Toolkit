module.exports = () => {
  const env = process.env.ELEVENTY_ENV || 'dev';

  // Relative to assetsRoot (see app-globals.js)
  const designSystemPath = '/vendor/ontario-design-system';

  const allowedFooterTypes = {
    default: 'default',
    expanded: 'expanded',
  };

  return {
    allowedFooterTypes,
    designSystemPath,
    env,
  };
};
