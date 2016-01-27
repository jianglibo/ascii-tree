var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Line = require('../lib/line');
var AsciiTree = require('../lib/ascii-tree');

describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should handle string lines', function() {
      var tree = new AsciiTree(["hello"]);
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      var childLo = topLine.children[0];

      assert.equal(null, tree.leadingCharCode);
      assert.equal(0, childLo.level);
      assert.deepEqual(["└── hello"], convertedlines);
    });

    it('should handle buffer lines', function() {
      var tree = new AsciiTree([new Buffer("hello")]);
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      var childLo = topLine.children[0];

      assert.equal(null, tree.leadingCharCode);
      assert.equal(0, childLo.level);
      assert.deepEqual([new Buffer("└── hello")], convertedlines);
    });
  });


  describe('#buildTree', function() {
    it('should handle strings', function() {
      var tree = new AsciiTree("app\n-main.js\n-helper.js\n-others\n--Brocfile.js\npackage.json ".split("\n"));
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      assert.equal('|', convertedlines[1].charAt(0));
      convertedlines.forEach(function(it) {
        console.log(it);
      });
    });

    it('should handle buffers', function() {
      var ba = [];
      ba.push(new Buffer("app"));
      ba.push(new Buffer("-main.js"));
      ba.push(new Buffer("-helper.js"));
      ba.push(new Buffer("--Brocfile.js"));
      ba.push(new Buffer("package.json"));
      var tree = new AsciiTree(ba);
      var topLine = tree.buildTree();
      var convertedlines = topLine.toLines();
      assert.equal('|'.charCodeAt(0), convertedlines[1][0]);
      convertedlines.forEach(function(it) {
        console.log(it);
      });
    });
  });

});
