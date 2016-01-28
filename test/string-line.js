var chai = require('chai');
var assert = require('assert');
var StringLine = require('../lib/string-line');

var expect = chai.expect;

describe('BytesLine', function() {
  describe('#charCodeAt()', function() {
    it("should work.", function() {
      var sl = new StringLine("ab");
      assert.equal(97, sl.charCodeAt());
    });
  });
});
