const fs = require('fs');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const cc = require('config-chain');

const globalLocaleStrings = require('./src/_data/core/core-locale-strings.json');
const appLocaleStrings = require('./src/_data/app/app-locale-strings.json');

const localeStrings = { ...globalLocaleStrings, ...appLocaleStrings };

const appConf = cc(cc.find('.jam-on/app/conf.json'));
const appVersionMetadata = cc(cc.find('.jam-on/app/versionMetadata.json'));
let toolkitVersion;

try {
  toolkitVersion = appVersionMetadata.get('tagOrBranch');
} catch (e) {
  try {
    toolkitVersion = appConf.get('toolkitPackageJSONVersion');
  } catch {
    toolkitVersion = 'version undetermined';
    /* eslint-disable no-console */
    console.warn(
      "Your version of the Ontario.ca Jamstack Toolkit can't be determined and some features may not work correctly; you can try performing an upgrade to the latest release using the `jam-on.mjs` CLI to resolve this issue, or contact the Ontario.ca Service Integration team for help.",
    );
    /* eslint-enable no-console */
  }
}

function coreConfigFunc(eleventyConfig) {
  const md = new MarkdownIt({
    html: true,
  });

  eleventyConfig.addFilter('markdown', (content) => md.renderInline(content));
  eleventyConfig.addShortcode('toolkitVersion', () => toolkitVersion);
  eleventyConfig.addShortcode(
    'currentYear',
    () => `${String(new Date().getFullYear())}`,
  );
  eleventyConfig.addShortcode(
    'currentShortYear',
    () => `${String(new Date().getFullYear()).slice(-2)}`,
  );
  /* eslint-disable func-names */
  eleventyConfig.addFilter('localeString', function (key) {
    /* eslint-enable func-names */
    // Solution for accessing page front matter from https://stackoverflow.com/a/67746326

    const { page } = this.ctx;
    const str = fs.readFileSync(page.inputPath, 'utf8');
    const { data } = matter(str);
    const lang = data.lang || 'en';
    let localeString;

    if (key.includes('.')) {
      const keyArr = key.split('.');
      localeString = localeStrings[keyArr.shift()];
      if (keyArr.length > 0) {
        keyArr.forEach((k) => {
          localeString = localeString[k];
        });
      }
    } else {
      localeString = localeStrings[key];
    }
    if (Array.isArray(localeString)) {
      localeString = localeString.map((string) => string[lang]);
      return localeString;
    }

    return `${localeString[lang]}`;
  });
}

const coreConfigObj = {
  pathPrefix: '/',
};

module.exports = {
  configFunc: coreConfigFunc,
  configObj: coreConfigObj,
};
