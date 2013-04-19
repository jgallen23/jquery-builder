var assert = require('assert');
var path = require('path');
var build = require('../lib/grunt-build');

var jqueryPath = path.join(__dirname, '../jquery');

suite('grunt-build', function() {

  test('build with no excludes', function(done) {
    build(jqueryPath, null, function(err, js, jsmin) {
      assert.equal(err, null);
      assert.equal(typeof js, 'string');
      assert.equal(typeof jsmin, 'string');
      done();
    });
  });

  test('build with excludes', function(done) {
    build(jqueryPath, ['css', 'ajax'], function(err, js, jsmin) {
      assert.equal(err, null);
      assert.equal(typeof js, 'string');
      assert.equal(typeof jsmin, 'string');
      done();
    });
    
  });
  

});
