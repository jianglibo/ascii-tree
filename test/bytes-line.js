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
    it("should work.", function() {
      var bf = new BytesLine([0x0D, 0x0A], []).toBuffer();
      assert.deepEqual(new Buffer([0x0D, 0x0A]), bf);

      bf = new BytesLine([0x0D, 0x0A], [0x0D]).toBuffer();
      assert.deepEqual(new Buffer([0x0D, 0x0A, 0x0D]), bf);
    });
  });

  describe('#getArray()', function() {
    it("should handle string.", function() {
      var lines = BytesLine.getArray("a\rbbbbbbbb\rc\r\r\r");
      assert.equal(3, lines.length);
      assert.equal('a'.charCodeAt(0), lines[0].content[0]);
      assert.deepEqual([0x0D, 0x0D, 0x0D], lines[2].separator);
    });
    it("should handle buffer.", function() {
      var lines = BytesLine.getArray(new Buffer("a\rb\rcccccccccccccc\r\r\r"));
      assert.equal(3, lines.length);
      assert.equal('a'.charCodeAt(0), lines[0].content[0]);
      assert.deepEqual([0x0D, 0x0D, 0x0D], lines[2].separator);
    });
  });
});
