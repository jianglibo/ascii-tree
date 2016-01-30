var path = require('path');
var fs = require('fs');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');
var AsciiTree = require('../lib/ascii-tree');
var LineUtil = require('../lib/line-util');

describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should handle string lines', function() {
      var tree = new AsciiTree(BytesLine.getArray("hello")).convert();
      assert.equal(null, tree.leadingCharCode);
      assert.equal("└── hello", tree.toString());
    });
  });
});
