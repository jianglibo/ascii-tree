var fs = require('fs');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');
var BufferConvertor = require('../lib/buffer-convertor');
var LineUtil = require('../lib/line-util');

describe('BlockFilter', function() {
  describe('#constructor', function() {
    it('array push should work.', function(){
      var a = [];
      a.push([1, 2, 3]);
      assert.equal(1, a.length);
    });
    it('should handle string', function() {
      var s = "a\rxx\rbbbb\r-b1\ryy\rxx\raaa\r-uuuuu\ryy\r";
      var lines = BytesLine.getArray(s);
      assert.equal(9, lines.length);
      var bufConvertor = new BufferConvertor(s, 'xx', 'yy').convert();
      var bufArray = bufConvertor.toBufferArray();
      assert.equal(5, bufArray.length);
      console.log(bufArray);
      var strArray = bufConvertor.toStringArray();
      console.log(strArray);
      assert.equal('└── bbbb\r', strArray[1]);

    });
  });
});
