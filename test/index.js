var assert = require('assert');
var AsciiTree = require('../index').AsciiTree;
var Convertor = require('../index').Convertor;
var TreeLine = require('../index').TreeLine;
var LineUtil = require('../index').LineUtil;
var Char = require('../index').Char;


describe('required', function() {
  describe('#require()', function() {
    it('should ok', function() {
      assert(AsciiTree, "AsciiTree should imported.");
      assert(Convertor, "Convertor should imported.");
      assert(TreeLine, "Line should imported.");
      assert(LineUtil, "LineUtil should imported.");
      assert(Char, "Char should imported.");
    });
  });
});
