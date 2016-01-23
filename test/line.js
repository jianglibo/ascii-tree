var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Line = require('../lib/line');
var AsciiTree = require('../lib/ascii-tree');

describe('Line', function() {
  describe('#constructor', function() {
    it('should ok', function() {
      var lo = new Line();
      assert.equal(-1, lo.level);
      assert.equal("", lo.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });
  });
});

describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should ok', function() {
      var lo = new Line();
      assert.equal(-1, lo.level);
      assert.equal("", lo.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });
  });
});
