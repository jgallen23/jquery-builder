var assert = require('assert');
var path = require('path');
var build = require('../lib/grunt-build');

var jqueryPath = path.join(__dirname, '../jquery');

suite('grunt-build', function() {

  test('build with no excludes', function(done) {
    build(jqueryPath, null, function(err, js, jsmin) {
      console.log(arguments);
      done();
    });
  });

  test('build with excludes', function(done) {
    build(jqueryPath, ['css', 'ajax'], function(err, js, jsmin) {
      console.log(arguments);
      done();
    });
    
  });
  

});
