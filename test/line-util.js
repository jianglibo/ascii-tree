var path = require('path');
var fs = require('fs');
var assert = require('assert');
var LineUtil = require('../lib/line-util');
var BytesLine = require('../lib/bytes-line');

describe('LineUtil', function() {
  describe('#guessLeadingCharCode()', function() {
    it('should handle raw string lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode(BytesLine.getArray("app\r-abc.js"));
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });
  });
});
