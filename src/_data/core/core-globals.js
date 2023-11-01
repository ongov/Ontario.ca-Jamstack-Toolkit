module.exports = () => {
  const env = process.env.ELEVENTY_ENV || 'dev';

  // Relative to assetsRoot (see app-templateGlobals.js)
  const designSystemPath = '/vendor/ontario-design-system';

  const allowedFooterTypes = {
    default: 'default',
    expanded: 'expanded',
  };

  const allowedApplicationHeaderTypes = {
    default: 'default',
    serviceOntario: 'serviceOntario',
  };

  return {
    allowedFooterTypes,
    allowedApplicationHeaderTypes,
    designSystemPath,
    env,
  };
};
