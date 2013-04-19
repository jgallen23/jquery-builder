
var combinations = require('combinations');
var data = require('../data');

var versions = false;
module.exports = function() {
  if (versions) {
    return versions;
  }
  versions = data.versions;
  for (var version in versions) {
    versions[version] = combinations(versions[version].sort());
    versions[version].push([]);
  }
  return versions;
};
