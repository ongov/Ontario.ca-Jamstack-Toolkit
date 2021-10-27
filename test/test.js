var assert = require('assert');
var fs= require('fs');

describe('Site generation', function() {
  describe('root index.html present', function() {
    it('should generate a root index.html', function() {
      assert(fs.existsSync("dist/index.html"))
    });
  });
  describe('Ontario design system folder present', function() {
    it('should copy over the design system assets', function() {
      assert(fs.existsSync("dist/assets/vendor/ontario-design-system"))
    });
  });
  describe('Site CSS file present', function() {
    it('Should copy over the site CSS file', function() {
      assert(fs.existsSync("dist/assets/css/style.css"))
    });
  });
});