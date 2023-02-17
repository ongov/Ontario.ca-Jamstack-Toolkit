const globalLocaleStrings = require('./src/_data/core/core-locale-strings.json');
const appLocaleStrings = require('./src/_data/app/app-locale-strings.json');
const localeStrings = { ...globalLocaleStrings, ...appLocaleStrings };

const fs = require('fs');
const matter = require('gray-matter');
const markdownIt = require('markdown-it');
const cc = require('config-chain');

var appConf = cc(cc.find('.jam-on/app/conf.json'));
var appVersionMetadata = cc(cc.find('.jam-on/app/versionMetadata.json'));
var toolkitVersion;

try {
  toolkitVersion = appVersionMetadata.get('tagOrBranch');
} catch (e) {
  try {
    toolkitVersion = appConf.get('toolkitPackageJSONVersion');
  } catch (e) {
    toolkitVersion = 'version undetermined';
    console.warn(
      "Your version of the Ontario.ca Jamstack Toolkit can't be determined and some features may not work correctly; you can try performing an upgrade to the latest release using the `jam-on.mjs` CLI to resolve this issue, or contact the Ontario.ca Service Integration team for help."
    );
  }
}

coreConfigFunc = function (eleventyConfig) {
  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter('markdown', (content) => {
    return md.renderInline(content);
  });

  eleventyConfig.addShortcode('toolkitVersion', () => toolkitVersion);

  eleventyConfig.addShortcode(
    'currentYear',
    () => `${String(new Date().getFullYear())}`
  );
  eleventyConfig.addShortcode(
    'currentShortYear',
    () => `${String(new Date().getFullYear()).slice(-2)}`
  );

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
    if (Array.isArray(localeString)) {
      localeString = localeString.map((str) => {
        return str[lang];
      });
      return localeString;
    }
    return `${localeString[lang]}`;
  });
};

coreConfigObj = {
  pathPrefix: '/',
};

module.exports = {
  configFunc: coreConfigFunc,
  configObj: coreConfigObj,
};
