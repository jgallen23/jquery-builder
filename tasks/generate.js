var combinations = require('../lib/combinations')();
var async = require('async');
var path = require('path');
var fs = require('fs');
var exists = fs.existsSync || path.existsSync;
var data = require('../data');
var checkout = require('../lib/checkout');
var gruntBuild = require('../lib/grunt-build');
var filename = require('../lib/filename');
var grunt = require('grunt');

var jqueryPath = path.join(__dirname, '../jquery');

var generate = function(version, callback) {

  console.log('Checking out '+version);
  checkout(jqueryPath, version, function(err, version) {
    if (err) {
      return callback(err);
    }

    var outputDir = path.join(__dirname, '../dist', version);
    if (!exists(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    async.mapSeries(combinations, function(combination, callback) {

      console.log('\tBuilding ' + combination);
      var outfile = path.join(outputDir, filename(combination, false));
      var outfileMin = path.join(outputDir, filename(combination, true));

      if (exists(outfile) && exists(outfileMin)) {
        console.log('\tSkipping '+combination);
        console.log('');
        callback();
      } else {

        gruntBuild(jqueryPath, combination, function(err, js, jsmin) {
          if (err) {
            return callback(err);
          }
          fs.renameSync(js, outfile);
          fs.renameSync(jsmin, outfileMin);
          console.log('\tGenerated ' + combination);
          console.log('');
          callback();

        });

      }

    }, function(err, out) {
      callback(err);
    });
  });
};



grunt.registerTask('generate', function() {
  this.async();
  async.mapSeries(data.versions, generate, function(err, results) {
  });
});

