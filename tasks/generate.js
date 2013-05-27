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

    var i = 1;
    var length = combinations[version].length;
    async.mapSeries(combinations[version], function(combination, callback) {

      var outfile = path.join(outputDir, filename(combination, false));
      var outfileMin = path.join(outputDir, filename(combination, true));

      if (exists(outfile) && exists(outfileMin)) {
        console.log('Skipping ['+version+'] ('+i+'/'+length+') '+combination);
        i++;
        callback();
      } else {

        gruntBuild(jqueryPath, combination, function(err, js, jsmin) {
          if (err) {
            return callback(err);
          }
          fs.renameSync(js, outfile);
          fs.renameSync(jsmin, outfileMin);
          console.log('Generated ['+version+'] ('+i+'/'+length+') ' + combination);
          i++;
          callback();

        });

      }

    }, function(err, out) {
      callback(err);
    });
  });
};



grunt.registerTask('generate', function() {
  var done = this.async();
  var versions = Object.keys(data.versions);
  async.mapSeries(versions, generate, function(err, results) {
    if (err) {
      grunt.log.error(err);
    }
    done();
  });
});

