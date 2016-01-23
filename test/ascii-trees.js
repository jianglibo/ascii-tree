var path = require('path');
var fs = require('fs');
var assert = require('assert');
var AsciiTrees = require('../lib/ascii-trees');


describe('AsciiTrees', function() {
  describe('#process()', function() {
    it('string tag should work', function() {
      var lines = [];
      lines[0] = "---start---";
      lines[1] = "hello";
      lines[2] = "---end---";
      var wfp = new AsciiTrees(lines, lines[0], lines[2]);

      var newLines = wfp.convert();
      assert.equal(1, newLines.length);
    });

    it('regex tag should work', function() {
      var lines = [];
      lines[0] = "{% asciitree %}";
      lines[1] = "hello";
      lines[2] = "{% endasciitree %}";
      var wfp = new AsciiTrees(lines, /^{%\s+asciitree\s+%}$/, /^{%\s+endasciitree\s+%}$/, "<pre>", "</pre>");

      var newLines = wfp.convert();
      assert.equal(3, newLines.length);
      assert.equal("<pre>", newLines[0]);
      assert.equal("</pre>", newLines[2]);
    });
  });
});
