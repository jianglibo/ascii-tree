var assert = require('assert');

var asciitree = require('../lib/index');


describe('required', function() {
  describe('#require()', function() {
    it('should ok', function() {
      assert(asciitree.AsciiTree, "AsciiTree should imported.");
      assert(asciitree.Convertor, "Convertor should imported.");
      assert(asciitree.TreeLine, "Line should imported.");
      assert(asciitree.LineUtil, "LineUtil should imported.");
      assert(asciitree.Char, "Char should imported.");
      assert(asciitree.BytesLine, "BytesLine should imported.");
      assert(asciitree.AsciiTreeBuilder, "AsciiTreeBuilder should imported.");
      assert(asciitree.ConvertorBuilder, "ConvertorBuilder should imported.");
    });
  });
});
