var exec = require('child_process').exec;
var path = require('path');

var getExcludesString = function(excludes) {
  if (!excludes) {
    excludes = [];
  }
  var excludesArray = [];
  excludes.forEach(function(exclude) {
    if (exclude) {
      excludesArray.push('-'+exclude);
    }
  });
  return excludesArray.join(',');
};

module.exports = function(jQueryPath, excludes, callback) {
  var excludesString = getExcludesString(excludes) || '';
  var cmd = 'grunt custom:'+excludesString;
  exec(cmd, {
    cwd: jQueryPath
  }, function(err) {
    if (err) {
      return callback(err);
    }

    var uncompressedFile = path.join(jQueryPath, 'dist/jquery.js');
    var compressedFile = path.join(jQueryPath, 'dist/jquery.min.js');

    callback(null, uncompressedFile, compressedFile);
  });

};
