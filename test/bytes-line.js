var chai = require('chai');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');

var expect = chai.expect;

describe('BytesLine', function() {
  describe('#isEmpty()', function() {
    it("should be empty.", function() {
      var bl = new BytesLine([], []);
      assert(bl.isEmpty(), "should be empty.");
    });
  });

  describe('#toBuffer()', function() {
    it("should have length of 2.", function() {
      var bf = new BytesLine([0x0D, 0x0A], []).toBuffer();
      assert(bf.length === 2, "should be empty.");
    });
  });
});
