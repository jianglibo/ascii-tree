var chai = require('chai');
var assert = require('assert');
var util = require('util');
var AbstractLine = require('../lib/abstract-line');

var expect = chai.expect;

describe('inherits', function() {
  describe('#constructor()', function() {
    it("should work.", function() {
      function AbLine(bytes, separator) {
        AbstractLine.apply(this, arguments);
      }
      util.inherits(AbLine, AbstractLine);

      AbLine.prototype.isTagLine = function() {
        return "callAbLines";
      };

      var bl = new AbLine("a", "b");

      assert(bl instanceof AbLine, "should be instanceof Abline");
      assert(bl instanceof AbstractLine, "should be instanceof AbstractLine");

      assert.equal("a", bl.content);
      assert.equal("b", bl.separator);

      assert.equal("callAbLines", bl.isTagLine());
      // console.error("not implement.");
    });
  });
});
