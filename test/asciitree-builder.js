var path = require('path');
var fs = require('fs');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');
var AsciiTreeBuilder = require('../lib/asciitree-builder');
var LineUtil = require('../lib/line-util');

describe('AsciiTreeBuilder', function() {
  describe('#constructor', function() {
    it('should handle string', function() {
      var tree = new AsciiTreeBuilder().withContent("hello").withEncode("UTF-8").build().convert();
      assert.equal(null, tree.leadingCharCode);
      assert.equal("└── hello", tree.toString());
    });
  });
});
