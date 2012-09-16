
var combinations = require('combinations');
var modules = require('../modules');

module.exports = function() {
  var combo = combinations(modules.sort());
  combo.push([]);
  return combo;
}
