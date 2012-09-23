
var combinations = require('combinations');
var data = require('../data');

module.exports = function() {
  var combo = combinations(data.modules.sort());
  combo.push([]);
  return combo;
}
