var path = require('path');
var fs = require('fs');
var assert = require('assert');
var LineUtil = require('../lib/line-util');

describe('LineUtil', function() {
  describe('#isWhiteLine()', function() {
    it('should handle string', function() {
      var isWhiteLine = LineUtil.isWhiteLine(" \n\r\t");
      assert(isWhiteLine, " is white line");
    });

    it('should handle buffer', function() {
      var isWhiteLine = LineUtil.isWhiteLine(new Buffer(" \n\r\t"));
      assert(isWhiteLine, " is white line");
    });
  });

  describe('#guessLeadingCharCode()', function() {
    it('should handle string lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode(["app", "-abc.js"]);
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });

    it('should handle buffer lines.', function() {
      var leadingCharCode = LineUtil.guessLeadingCharCode([new Buffer("app"), new Buffer("-abc.js")]);
      assert.equal("-".charCodeAt(0), leadingCharCode);
    });
  });

  describe('#bufferTrim()', function() {
    it('should handle', function() {
      var bf,trimed;

      bf =  new Buffer("");
      trimed = LineUtil.bufferTrim(bf);

      assert.equal("", trimed.toString());

      bf =  new Buffer(" a ");
      trimed = LineUtil.bufferTrim(bf);
      assert.equal("a", trimed.toString());

      bf =  new Buffer("a       ");
      trimed = LineUtil.bufferTrim(bf);
      assert.equal("a", trimed.toString());
    });
  });

  describe('#lineType()', function() {
    var startTag = "{% asciitree %}";
    var endTag = "{% endasciitree %}";

    it('should handle string line.', function() {
      var lineType = LineUtil.lineType(startTag, endTag , "");
      assert.equal('NO', lineType);

      lineType = LineUtil.lineType(startTag, endTag, "{% asciitree %}");
      assert.equal('START', lineType);

      lineType = LineUtil.lineType(startTag, endTag, "{% endasciitree %}");
      assert.equal('END', lineType);
    });

    it('should handle buffer lines.', function() {

      var lineType = LineUtil.lineType(startTag,endTag ,new Buffer(""));
      assert.equal('NO', lineType);

      lineType = LineUtil.lineType(startTag, endTag, new Buffer(startTag));
      assert.equal('START', lineType);

      lineType = LineUtil.lineType(startTag, endTag, new Buffer(endTag));
      assert.equal('END', lineType);
    });
  });
});
