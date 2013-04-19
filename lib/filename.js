var filename = function(excludes, minify) {
  if (arguments.length === 0) {
    excludes = [];
    minify = false;
  } else if (typeof excludes == 'boolean') {
    minify = excludes;
    excludes = [];
  } 
  if (!excludes) {
    excludes = [];
  }

  var filename = 'jquery';
  excludes.sort();

  if (excludes && excludes.length !== 0) {
    filename += '-' + excludes.join('-');
  }

  //clean
  filename = filename.replace(/\//g, '');

  if (minify) {
    filename += '.min';
  }

  filename += '.js';

  return filename;
};


if (typeof window === "undefined") {
  module.exports = filename;
}
