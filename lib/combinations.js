
var combinations = require('combinations');
var components = require('../components');

module.exports = function() {
  var combo = combinations(components);
  combo.push([]);
  return combo;
}
