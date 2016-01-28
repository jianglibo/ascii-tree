var assert = require('assert');

describe('Regex tag', function() {
  describe('#tag', function() {
    it('should ok', function() {
      var startTag = /^{%\s+asciitree\s+%}$/;
      var startLine = "{% asciitree %}";
      assert(startTag.exec(startLine), "startTag should match");

      startLine = "{% asciitree                %}";
      assert(startTag.exec(startLine), "startTag should match1");

      startLine = "{% asciitree                %}";
      assert(startTag.exec(startLine), "startTag should match2");
    });
  });
});
