var grunt = require('grunt');
var bytesize = require('bytesize');
var fs = require('fs');
var path = require('path');
var async = require('async');


var baseDir = path.join(__dirname, '../dist');

var getFileSize = function(file, callback) {
  bytesize.fileSize(file, true, function(err, size) {
    if (err) {
      return callback(err);
    }
    bytesize.gzipSize(file, true, function(err, gzipsize) {
      callback(err, {
        file: path.basename(file),
        normal: size,
        gzip: gzipsize
      });
    });
  });
}

var readVersion = function(version, callback) {
  var dir = path.join(baseDir, version);
  fs.readdir(dir, function(err, files) {
    files = files.map(function(file) {
      return path.join(dir, file);
    });
    async.mapSeries(files, getFileSize, function(err, results) {
      var out = {};
      results.forEach(function(result) {
        out[result.file] = { normal: result.normal, gzip: result.gzip };
      });
      callback(err, { version: version, files: out });
    });
  });
}

var writeFile = function(obj, callback) {
  var jsonString = JSON.stringify(obj);
  fs.writeFile(path.join(__dirname, '../filesizes.json'), jsonString, callback);
}

var run = function(callback) {
  fs.readdir(baseDir, function(err, files) {
    var versions = [];
    files.forEach(function(file) {
      var stat = fs.statSync(path.join(baseDir, file));
      if (stat.isDirectory()) {
        versions.push(file);
      }
    });

    async.mapSeries(versions, readVersion, function(err, results) {
      var sizes = {};
      results.forEach(function(obj) {
        sizes[obj.version] = obj.files;
      });
      writeFile(sizes, callback);
    });
  });
}

grunt.registerTask('filesize', function() {
  var done = this.async();

  run(done);

});
run(function() {});


