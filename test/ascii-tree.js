var path = require('path');
var fs = require('fs');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');
var AsciiTree = require('../lib/ascii-tree');
var LineUtil = require('../lib/line-util');
var os = require('os');

describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should handle string lines', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello")).convert();
      assert.equal(null, tree.leadingCharCode);
      assert.equal("└── hello", tree.toString());
    });

    it('should handle eol', function() {
      var eol = os.EOL;
      assert.equal('string', typeof eol);
    });
  });

  describe('#append', function() {
    it('should handle append has separator', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello\r")).append(["a", "b"]).convert();
      var appends = tree.appends;
      var lines = tree.lines;

      var strs = tree.toStringArray();

      assert.equal(3, strs.length);

      assert.deepEqual([0x0D], lines[0].separator);
      assert.deepEqual([0x0D], appends[0].separator);
      assert.deepEqual([0x0D], appends[1].separator);
    });
    it('should handle append no separator', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello")).append(["a", "b"]).convert();
      var appends = tree.appends;
      var lines = tree.lines;

      assert.deepEqual([],lines[0].separator);
      assert.deepEqual([], appends[0].separator);
      assert.deepEqual([], appends[1].separator);
    });
    it('should handle append last line has no separator', function() {
      var tree = new AsciiTree(BytesLine.getArray("abc\rhello")).append(["a", "b"]).convert();
      var appends = tree.appends;
      var lines = tree.lines;

      var strs = tree.toStringArray();
      assert.equal(4, strs.length);

      assert.deepEqual([0x0D], lines[0].separator, "line 1");
      assert.deepEqual([0x0D], lines[1].separator, "line 2");
      assert.deepEqual([0x0D], appends[0].separator, "line 3");
      assert.deepEqual([0x0D], appends[1].separator, "line 4");

    });
  });
  describe('#prepend', function() {
    it('should handle prepend has separator', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello\r")).prepend(["a", "b"]).convert();
      var prepends = tree.prepends;
      var lines = tree.lines;

      var strs = tree.toStringArray();
      assert.equal(3, strs.length);

      assert.deepEqual([0x0D], lines[0].separator, "line 1");
      assert.deepEqual([0x0D], prepends[0].separator, "line 2");
      assert.deepEqual([0x0D], prepends[1].separator, "line 3");
    });
    it('should handle prepend has no separator', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello")).prepend(["a", "b"]).convert();
      var prepends = tree.prepends;
      var lines = tree.lines;

      assert.deepEqual([], lines[0].separator, "line 1");
      assert.deepEqual([], prepends[0].separator, "line 2");
      assert.deepEqual([], prepends[1].separator, "line 3");
    });

    it('should handle prepend last line has no separator', function() {

      var tree = new AsciiTree(BytesLine.getArray("abc\rhello")).prepend(["a", "b"]).convert();
      var prepends = tree.prepends;
      var lines = tree.lines;

      var strs = tree.toStringArray();
      assert.equal(4, strs.length);

      assert.deepEqual([0x0D], lines[0].separator, "line 1");
      assert.deepEqual([], lines[1].separator, "line 2");
      assert.deepEqual([0x0D], prepends[0].separator, "line 3");
      assert.deepEqual([0x0D], prepends[1].separator, "line 4");

      tree = new AsciiTree(BytesLine.getArray("abc\rhello")).prepend("a").append("b").convert();
      prepends = tree.prepends;
      lines = tree.lines;

      strs = tree.toStringArray();
      assert.equal(4, strs.length);

      assert.deepEqual([0x0D], lines[0].separator, "line 1");
      assert.deepEqual([0x0D], lines[1].separator, "line 2");
      assert.deepEqual([0x0D], prepends[0].separator, "line 3");

    });
  });
});
