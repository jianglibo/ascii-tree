var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Line = require('../lib/line');
var AsciiTree = require('../lib/ascii-tree');

describe('AsciiTree', function() {
  describe('#constructor', function() {
    it('should ok when one line', function() {
      var lo = new AsciiTree("hello");
      var topLine = lo.buildTree();
      var convertedlines = topLine.toLines();
      var childLo = topLine.children[0];

      assert.equal("", lo.leadingChar);
      assert.equal(0, childLo.level);
      assert.deepEqual(["└── hello"], convertedlines);
    });
  });

  describe('#buildTree', function() {
    it('should ok', function() {
      var lo = new AsciiTree("app\n-main.js\n-helper.js\n-others\n--Brocfile.js\npackage.json ");
      var topLine = lo.buildTree();
      var convertedlines = topLine.toLines();
      convertedlines.forEach(function(it) {
        console.log(it);
      });
    });
  });

});
