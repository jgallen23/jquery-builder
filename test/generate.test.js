var filename = require('../lib/filename');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var exists = fs.existsSync || path.existsSync;
var combinations = require('../lib/combinations');


suite('generate', function() {
  test('make sure all files have been generated', function() {

    var combos = combinations();

    combos.forEach(function(combo) {
      var f1 = filename(combo, false);
      assert.equal(exists(path.join(__dirname, '../dist/'+f1)), true, f1)
      var f2 = filename(combo, true);
      assert.equal(exists(path.join(__dirname, '../dist/'+f2)), true, f2)
    });
    
  });
});

