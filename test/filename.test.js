var assert = require('assert');
var filename = require('../lib/filename');
var path = require('path');

suite('filename', function() {

  test('pass in nothing', function() {
    var file = filename();
    assert.equal(file, 'jquery.js');
  });

  test('pass in just minify', function() {
    var file = filename(true);
    assert.equal(file, 'jquery.min.js');
  });

  test('pass in excludes', function() {
    var file = filename(['ajax']);
    assert.equal(file, 'jquery-ajax.js');
  });

  test('pass in multiple excludes', function() {
    var file = filename(['ajax', 'offset']);
    assert.equal(file, 'jquery-ajax-offset.js');
  });

  test('pass in multiple excludes in any order', function() {
    var file = filename(['offset', 'ajax', 'css']);
    assert.equal(file, 'jquery-ajax-css-offset.js');
  });

  //test('pass in wrong excludes', function() {
    //assert.throws(function() {
      //filename(['poop']);
    //});
  //});

  test('pass in excludes and minify', function() {
    var file = filename(['ajax', 'offset'], true);
    assert.equal(file, 'jquery-ajax-offset.min.js');
  });

  test('pass in undefined for both args', function() {
    var file = filename(undefined, undefined);
    assert.equal(file, 'jquery.js');
  });

  test('remove /', function() {
    var file = filename(['ajax/xhr']);
    assert.equal(file, 'jquery-ajaxxhr.js');
  });

});

