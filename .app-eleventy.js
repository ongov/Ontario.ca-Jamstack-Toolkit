const cc = require('config-chain');

var conf = cc(cc.find('.jam-on/app/conf.json'));

appConfigFunc = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets': conf.get('assetsDestination'),
  });
};

appConfigObj = {
  dir: {
    input: 'src',
    output: 'dist',
  },
};

module.exports = {
  configFunc: appConfigFunc,
  configObj: appConfigObj,
};
