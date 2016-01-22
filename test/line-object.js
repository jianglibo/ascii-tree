var path = require('path');
var fs = require('fs');
var assert = require('assert');
var LineObject = require('../line-object');
var DtreeConverter = require('../index');

describe('LineOjbect', function() {
  describe('#constructor', function() {
    it('should ok', function() {
      var lo = new LineObject();
      assert.equal(-1, lo.level);
      assert.equal("", lo.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });
  });
});

describe('DtreeConverter', function() {
  describe('#constructor', function() {
    it('should ok', function() {
      var lo = new LineObject();
      assert.equal(-1, lo.level);
      assert.equal("", lo.content);
      assert.deepEqual([], lo.children);
      assert(!lo.parent);
    });
  });
});
