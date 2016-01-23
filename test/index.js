var assert = require('assert');
var AsciiTree = require('../index').AsciiTree;
var AsciiTrees = require('../index').AsciiTrees;
var Line = require('../index').Line;

describe('required', function() {
  describe('#require()', function() {
    it('should ok', function() {
      assert(AsciiTree, "AsciiTree should imported.");
      assert(AsciiTrees, "AsciiTrees should imported.");
      assert(Line, "Line should imported.");
    });
  });
});
