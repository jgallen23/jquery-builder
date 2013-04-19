var assert = require('assert');
var path = require('path');
var checkout = require('../lib/checkout');

var jqueryPath = path.join(__dirname, '../jquery');

suite('checkout', function() {

  test('checkout version', function(done) {

    checkout(jqueryPath, '1.9.1', function(err) {
      assert.ok(!err);
      //TODO some way to verify on current branch
      done();
    });

  });

  test('checkout version that doesn\'t exist');
  

});
