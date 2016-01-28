var path = require('path');
var fs = require('fs');
var assert = require('assert');
var FileFilter = require('../lib/file-filter');


describe('FileFilter', function() {
  describe('#convert()', function() {
  //   it('should handle string tag string lines', function() {
  //     var lines = [];
  //     lines[0] = "---start---";
  //     lines[1] = "hello";
  //     lines[2] = "---end---";
  //     var wfp = new FileFilter(lines, lines[0], lines[2]);
  //
  //     var newLines = wfp.convert();
  //     assert.equal(1, newLines.length);
  //   });
  //
  //   it('should handle string tag buffer lines', function() {
  //     var lines = [];
  //     lines[0] = new Buffer("---start---");
  //     lines[1] = new Buffer("hello");
  //     lines[2] = new Buffer("---end---");
  //     var wfp = new FileFilter(lines, "---start---", "---end---");
  //
  //     var newLines = wfp.convert();
  //     assert.equal(1, newLines.length);
  //   });
  //
  //   it('should handle regex tag buffer lines', function() {
  //     var lines = [];
  //     lines[0] = new Buffer("{% asciitree %}");
  //     lines[1] = new Buffer("hello");
  //     lines[2] = new Buffer("{% endasciitree %}");
  //     var wfp = new FileFilter(lines, /^{%\s+asciitree\s+%}$/, /^{%\s+endasciitree\s+%}$/, "<pre>", "</pre>");
  //
  //     var newLines = wfp.convert();
  //     assert.equal(3, newLines.length);
  //     assert.equal("<pre>", newLines[0]);
  //     assert(Buffer.isBuffer(newLines[0]), "should return buffer");
  //     assert.equal("</pre>", newLines[2]);
  //   });
  });
});
