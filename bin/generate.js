#!/usr/bin/env node

var resistance = require('resistance');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var exists = fs.existsSync || path.existsSync;
var filename = require('../lib/filename');
var combinations = require('../lib/combinations')();
var data = require('../data');
var currentVersion;

var getExcludesString = function(excludes) {
  var excludesArray = [];
  excludes.forEach(function(exclude) {
    if (exclude) {
      excludesArray.push('-'+exclude);
    }
  });
  return excludesArray.join(',');
}

var process = function(excludes, next) {
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
    var outfile = path.join(__dirname, '../dist', currentVersion, filename(excludes, false));
    var outfileMin = path.join(__dirname, '../dist', currentVersion, filename(excludes, true));
    fs.renameSync(uncompressedFile, outfile);
    fs.renameSync(compressedFile, outfileMin);
    console.log('Generated ' + excludes);
    next();
  });

};

var versionQueue = resistance.queue(function(version, next) {
  
  currentVersion = version;
  var cmd = 'git checkout ' + version + '&& git submodule update';
  var cwd = path.join(__dirname, '../jquery');
  exec(cmd, {
    cwd: cwd
  });
  
  var versionPath = path.join(__dirname, '../dist/', currentVersion);
  if (!exists(versionPath)) {
    console.log('Creating '+version);
    fs.mkdirSync(versionPath);
    var queue = resistance.queue(process, true);
    queue.push(combinations);
    queue.run(function(results) {
      next();
    });
  } else {
    console.log('Skipping '+version);
    next();
  }
}, true);

versionQueue.push(data.versions);
versionQueue.run();
