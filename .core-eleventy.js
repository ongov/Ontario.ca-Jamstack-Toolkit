const globalLocaleStrings = require('./src/_data/core/core-locale-strings.json');
const appLocaleStrings = require('./src/_data/app/app-locale-strings.json');
const localeStrings = { ...globalLocaleStrings, ...appLocaleStrings };

const fs = require('fs');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');

coreConfigFunc = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets': 'jamstack-toolkit/assets',
  });

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter('markdown', (content) => {
    return md.renderInline(content);
  });

  eleventyConfig.addFilter('localeString', function (key) {
    // Solution for accessing page front matter from https://stackoverflow.com/a/67746326

    var page = this.ctx.page;
    var str = fs.readFileSync(page.inputPath, 'utf8');
    var data = matter(str).data;
    var lang = data.lang || 'en';

    if (key.includes('.')) {
      var keyArr = key.split('.');
      var localeString = localeStrings[keyArr.shift()];
      if (keyArr.length > 0) {
        keyArr.forEach((key) => {
          localeString = localeString[key];
        });
      }
    } else {
      var localeString = localeStrings[key];
    }
    return `${localeString[lang]}`;
  });
};

coreConfigObj = {};

module.exports = {
  configFunc: coreConfigFunc,
  configObj: coreConfigObj,
};
