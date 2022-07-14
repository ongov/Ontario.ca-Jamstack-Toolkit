appConfigFunc = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets': 'example-pages/jamstack-toolkit/assets',
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
