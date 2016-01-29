var chai = require('chai');
var assert = require('assert');
var strbuf2lines = require('../lib/strbuf2lines');

var expect = chai.expect;

describe('strbuf2lines', function() {
  it("should split line.", function() {
    var str = "a\rb\nc\r\n";
    var lines = strbuf2lines(str);
    assert.equal(3, lines.length);

    assert.equal("a".charCodeAt(0), lines[0].content[0]);
    assert.equal('\r'.charCodeAt(0), lines[0].separator[0]);

    assert.equal(2, lines[2].separator.length);

    str = "a\rb\r\n\r\n\nc\r\n";
    lines = strbuf2lines(str);

    assert.equal(5, lines[1].separator.length);
  });
});
