#!/usr/bin/env node

var resistance = require('resistance');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var filename = require('../lib/filename');
var combinations = require('../lib/combinations')();

var getExcludesString = function(excludes) {
  var excludesArray = [];
  excludes.forEach(function(exclude) {
    if (exclude) {
      excludesArray.push('-'+exclude);
    }
  });
  return excludesArray.join(',');
}

var queue = resistance.queue(function(excludes, next) {
  var excludesString = getExcludesString(excludes);
  var cmd = 'grunt';
  if (excludesString) {
    cmd += ' custom:'+excludesString;
  }
  var cwd = path.join(__dirname, '../jquery');
  exec(cmd, {
    cwd: cwd 
  }, function() {
    var uncompressedFile = path.join(cwd, 'dist/jquery.js');
    var compressedFile = path.join(cwd, 'dist/jquery.min.js');
    var outfile = path.join(__dirname, '../dist', filename(excludes, false));
    var outfileMin = path.join(__dirname, '../dist', filename(excludes, true));
    fs.renameSync(uncompressedFile, outfile);
    fs.renameSync(compressedFile, outfileMin);
    console.log('Generated ' + excludes);
    next();
  });

}, true);

queue.push(combinations);
queue.run(function(results) {

});
