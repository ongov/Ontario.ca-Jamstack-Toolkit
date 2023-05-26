/* global describe:readonly */
/* global it:readonly */

const assert = require('assert');
const fs = require('fs');

const enRoot = 'example-pages/jamstack-toolkit';
const frRoot = 'example-pages/jamstack-toolkit';
const assetsDestination = 'example-pages/assets';
const odsDir = `dist/${assetsDestination}/vendor/ontario-design-system`;
const enPageLocation = `dist/${enRoot}/index.html`;
const frPageLocation = `dist/${frRoot}/index.html`;
const expectedNoDsFiles = 6;

describe('Site generation', () => {
  describe('Top-level redirect page present', () => {
    it('should generate a top-level redirect page', () => {
      assert(fs.existsSync('dist/index.html'));
    });
  });
  describe('English-language example page present', () => {
    it('should generate an English-language example page', () => {
      assert(fs.existsSync(enPageLocation));
    });
  });
  describe('French-language example page present', () => {
    it('should generate a French-language example page', () => {
      assert(fs.existsSync(frPageLocation));
    });
  });
  describe('Ontario design system inclusion', () => {
    it('should copy over the design system assets', () => {
      assert(
        fs.existsSync(odsDir),
        'Expected directory for design system not found',
      );
      const actualLength = fs.readdirSync(odsDir).length;
      const expectedLength = expectedNoDsFiles;
      assert(
        actualLength === expectedLength,
        `The expected number of files in design system directory were not found, expected ${expectedLength}, got ${actualLength}`,
      );
    });
  });
  describe('Site CSS file present', () => {
    it('Should copy over the site CSS file', () => {
      assert(fs.existsSync('dist/example-pages/assets/css/style.css'));
    });
  });
});
