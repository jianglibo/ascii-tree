var Readable = require('stream').Readable;
var fs = require('fs');
var chai = require('chai');
var through = require('through2');
var assert = require('assert');
var splitterStream = require('../lib/splitter-stream');
var BytesLine = require('../lib/bytes-line');
var logmsg = require('./logmsg');

var expect = chai.expect;
/**
because stream catch all errors, include assertion errors.
So I just pinrt it.
*/
describe('splitterStream', function() {
  describe('#pipe()', function() {
    it('should handle short line.', function(done) {
      var count = 0;
      var lines = [];
      var rs = fs.createReadStream('fixtures/gbk.txt')
        .pipe(splitterStream())
        .pipe(through.obj(function(line, enc, cb) {
          count++;
          lines.push(line);
          cb();
        }))
        .on('finish', function() {
          assert.equal(9, count);
          assert(BytesLine.isBytesLine(lines[0]), 'should be BytesLine');
          assert.deepEqual([0x0D, 0x0A], lines[0].separator);
          done();
        });
    });

    it('should handle long line.', function(done) {
      var count = 0;
      var lines = [];
      var rs = fs.createReadStream('fixtures/longline.txt')
        .pipe(splitterStream())
        .pipe(through.obj(function(sl, enc, cb) {
          count++;
          lines.push(sl);
          cb();
        }))
        .on('finish', function() {
          assert.equal(1, lines.length);
          assert.deepEqual([0x0D, 0x0A], lines[0].separator);
          done();
        });
    });
  });
});
