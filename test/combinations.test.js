var assert = require('assert');
var combinations = require('../lib/combinations');


suite('combinations', function() {

  test('return all combos', function() {
    var versions = combinations();
    assert.equal(typeof versions, 'object');
    assert.equal(versions['1.8.3'].length, 64);
    assert.deepEqual(versions['1.8.3'][versions['1.8.3'].length-1], []);
    console.log(versions['1.9.1'].length);
  });
  
});

