var path = require('path');
var fs = require('fs');
var assert = require('assert');
var TreeLine = require('../lib/tree-line');
var StringLine = require('../lib/string-line');
var BufferLine = require('../lib/buffer-line');
var BytesLine = require('../lib/bytes-line');
var AsciiTree = require('../lib/ascii-tree');

var space = ' '.charCodeAt(0);
var a = 'a'.charCodeAt(0);

describe('TreeLine', function() {
  describe('#constructor', function() {
    it('should handle topLine', function() {
      var lo = new TreeLine();
      assert.equal(-1, lo.level);
      assert.equal(null, lo.line);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });

    it('should handle stringline', function() {
      var lo = new TreeLine(new StringLine("    abc"), space);
      assert.equal(4, lo.level);
      assert.equal('abc', lo.line.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });

    it('should handle BytesLine', function() {
      var bl = [space, space, a, a + 1, a + 2];
      var lo = new TreeLine(new BytesLine(bl), space);
      assert.equal(2, lo.level);
      assert.deepEqual([a, a + 1, a + 2], lo.line.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });

    it('should handle BufferLine', function() {
      var bl = [space, space, a, a + 1, a + 2];
      var lo = new TreeLine(new BufferLine(new Buffer(bl)), space);
      assert.equal(2, lo.level);
      assert.deepEqual(new Buffer([a, a + 1, a + 2]), lo.line.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });
  });
});
