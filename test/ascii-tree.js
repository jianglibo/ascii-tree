var path = require('path');
var fs = require('fs');
var assert = require('assert');
var StringLine = require('../lib/string-line');
var BufferLine = require('../lib/buffer-line');
var BytesLine = require('../lib/bytes-line');
var AsciiTree = require('../lib/ascii-tree');
var LineUtil = require('../lib/line-util');


describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should handle string lines', function() {
      var tree = new AsciiTree([new StringLine("hello")]);
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      var childTreeLine = topLine.children[0];

      assert.equal(null, tree.leadingCharCode);
      assert.equal(0, childTreeLine.level);
      assert.equal("└── hello", convertedlines[0].content);
    });

    it('should handle buffer lines', function() {
      var tree = new AsciiTree([new BufferLine(new Buffer("hello"))]);
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      var childLo = topLine.children[0];

      assert.equal(null, tree.leadingCharCode);
      assert.equal(0, childLo.level);
      assert.equal(1, convertedlines.length);
      assert.deepEqual([new Buffer("└── hello")], [convertedlines[0].content]);
    });
  });


  describe('#buildTree', function() {
    it('should handle strings', function() {
      var tree = new AsciiTree(LineUtil.stringLines(["app","-main.js", "-helper.js", "-others", "--Brocfile.js","---uuvv.js", "package.json "]));
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      assert.equal(7, convertedlines.length);
      var code = '|'.charCodeAt(0);
      assert.equal(9500, '├'.charCodeAt(0));
      assert.equal(9492, '└'.charCodeAt(0));
      assert.equal(code, convertedlines[1].charCodeAt());
      // convertedlines.forEach(function(it) {
      //   console.log(it.content);
      // });
    });

    it('should handle buffers', function() {
      var tree = new AsciiTree(LineUtil.bufferLines(["app","-main.js", "-helper.js", "-others", "--Brocfile.js","---uuvv.js", "package.json "]));
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      assert(Buffer.isBuffer(convertedlines[0].content), "should return buffer.");
      assert.equal('|'.charCodeAt(0), convertedlines[1].content[0]);
      // convertedlines.forEach(function(it) {
      //   console.log(it);
      // });
    });
  });

});
