var assert = require('assert');
var combinations = require('../lib/combinations');


suite('combinations', function() {

  test('return all combos', function() {
    var combo = combinations();
    assert.equal(combo.length, 64);

    assert.deepEqual(combo[combo.length-1], []);
  });
  
});

