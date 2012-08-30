
var path = require('path');
var fs = require('fs');
var filename = require('./filename');

module.exports = function(excludes, minify, callback) {
  var file = filename(excludes, minify, true);
  var fullpath = path.join(__dirname, '../dist/'+file);
  fs.readFile(fullpath, callback);
}
