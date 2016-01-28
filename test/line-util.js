var path = require('path');
var fs = require('fs');
var assert = require('assert');
var LineUtil = require('../lib/line-util');
var BytesLine = require('../lib/bytes-line');

describe('LineUtil', function() {
  describe('#guessLeadingCharCode()', function() {
    it('should handle raw string lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode(["app", "-abc.js"]);
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });

    it('should handle string lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode(LineUtil.stringLines(["app", "-abc.js"]));
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });

    it('should handle buffer lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode(LineUtil.bufferLines(["app","-abc.js"]));
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });
  });
});
