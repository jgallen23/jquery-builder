var filename = require('../lib/filename');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var exists = fs.existsSync || path.existsSync;
var combinations = require('../lib/combinations');
var data = require('../data.json');


suite('generate', function() {
  test('make sure all files have been generated', function() {

    var combos = combinations();
    var versions = data.versions


    versions.forEach(function(version) { 

      combos.forEach(function(combo) {
        var f1 = filename(combo, false);
        assert.equal(exists(path.join(__dirname, '../dist/'+version+'/'+f1)), true, f1)
        var f2 = filename(combo, true);
        assert.equal(exists(path.join(__dirname, '../dist/'+version+'/'+f2)), true, f2)
      });
    })
    
  });
});

