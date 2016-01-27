var assert = require('assert');
var AsciiTree = require('../index').AsciiTree;
var AsciiTrees = require('../index').AsciiTrees;
var Line = require('../index').Line;
var LineUtil = require('../index').LineUtil;
var Char = require('../index').Char;


describe('required', function() {
  describe('#require()', function() {
    it('should ok', function() {
      assert(AsciiTree, "AsciiTree should imported.");
      assert(AsciiTrees, "AsciiTrees should imported.");
      assert(Line, "Line should imported.");
      assert(LineUtil, "LineUtil should imported.");
      assert(Char, "Char should imported.");
    });
  });
});
