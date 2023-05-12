const cc = require('config-chain');

const conf = cc(cc.find('.jam-on/app/conf.json'));

function appConfigFunc(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets': conf.get('assetsDestination'),
  });
}

const appConfigObj = {
  dir: {
    input: 'src',
    output: 'dist',
  },
};

module.exports = {
  configFunc: appConfigFunc,
  configObj: appConfigObj,
};
