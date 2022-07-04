appConfigFunc = function (eleventyConfig) {};

appConfigObj = {
  pathPrefix: '/',
  dir: {
    input: 'src',
    output: 'dist',
  },
};

module.exports = {
  configFunc: appConfigFunc,
  configObj: appConfigObj,
};
