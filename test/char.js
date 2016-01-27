var path = require('path');
var fs = require('fs');
var assert = require('assert');
var Char = require('../lib/char');

describe('sort', function() {
    it('should ok', function() {
      var a = [{value: 55, count: 3}, {value: 66, count: 1}];
      a.sort(function(x, y){
        return x.count - y.count;
      });
      assert.equal(1, a[0].count);

      a.sort(function(x, y){
        return x.count - y.count;
      });
      assert.equal(1, a[0].count);
    });
});

describe('Char', function() {
  describe('#isAlphaNumeric()', function() {
    it('should ok', function() {
      assert.equal(10, Char.numerics.length);
      assert.equal(52, Char.alphas.length);
      assert.equal(26, Char.lowAlphas.length);
      assert.equal(26, Char.upAlphas.length);

      assert(Char.isAlphaNumeric("0"), "'0' is alphanumeric");
      assert(!Char.isAlphaNumeric(0), "0 is alphanumeric");
    });
  });
});

describe('Character', function() {
  describe('#charAt()', function() {
    it('should ok', function() {
      assert.equal(0x61, "a".charCodeAt(0));
      assert.equal('a', "a".charAt(0));

      assert.equal(0x7A, "z".charCodeAt(0));

      assert.equal(0x30, "0".charCodeAt(0));
      assert.equal(0x39, "9".charCodeAt(0));

      assert.equal(0x41, "A".charCodeAt(0));
      assert.equal(0x5A, "Z".charCodeAt(0));

      assert.equal(0x20, " ".charCodeAt(0));
      assert.equal(0x0A, "\n".charCodeAt(0));
      assert.equal(0x0D, "\r".charCodeAt(0));
      assert.equal(0x09, "\t".charCodeAt(0));

      assert.equal(0x6211, "我".charCodeAt(0));
      assert.equal('我', "我".charAt(0));

      var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var iay = [0x61, 0x7A];
      assert.equal(1, iay.indexOf(0x7A));
    });
  });
});
