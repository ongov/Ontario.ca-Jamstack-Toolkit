var assert = require('assert');
var fs= require('fs');

describe('Site generation', function() {
  describe('root index.html present', function() {
    it('should generate a root index.html', function() {
      assert(fs.existsSync("dist/indexer.html"))
    });
  });
});