
var path = require('path');
var fs = require('fs');
var filename = require('./filename');

module.exports = function(excludes, version, minify, callback) {
  var file = filename(excludes, minify, true);
  var fullpath = path.join(__dirname, '../dist', version, file);
  fs.readFile(fullpath, callback);
}
