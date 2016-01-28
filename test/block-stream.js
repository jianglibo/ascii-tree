var fs = require('fs');
var chai = require('chai');
var through = require('through2');
var assert = require('assert');
var blockstream = require('../lib/block-stream');
var splitterStream = require('../lib/splitter-stream');
var AbstractLine = require('../lib/abstract-line');
var logmsg = require('./logmsg');


var expect = chai.expect;
/**
because stream catch all errors, include assertion errors.
So I just pinrt it.
*/


describe('BlockStream', function() {
  describe('#pipe()', function() {
    it('should handle notag file.', function(done) {
      var count = 0;
      var values = [0x61, 0x62, 0x63];
      var values1 = [];

      var rs = fs.createReadStream('fixtures/afile.txt')
        .pipe(splitterStream())
        .pipe(blockstream("xx", "yy"))
        .pipe(through.obj(function(line, enc, cb) {
          count++;
          values1.push(line);
          cb();
        }))
        .on('finish', function() {
          values1.forEach(function(it){
            assert(it instanceof AbstractLine, "should be an AbstractLine.");
          });
          assert.equal(3, count);
          assert.equal(values[0], values1[0].content[0]);
          assert.equal(values[1], values1[1].content[0]);
          assert.equal(values[2], values1[2].content[0]);
          done();
        });
    });

    it('should handle tag file.', function(done) {
      var count = 0;
      var isBlockCount = 0;
      var notBlockCount = 0;
      var rs = fs.createReadStream('fixtures/tagfile.txt')
        .pipe(splitterStream())
        .pipe(blockstream("xx", "yy"))
        .pipe(through.obj(function(lineOrBlock, enc, cb) {
          count++;
          if (lineOrBlock instanceof AbstractLine) {
            notBlockCount++;
          } else {
            isBlockCount++;
          }
          cb();
        }))
        .on('finish', function() {
          assert.equal(3, count, "total should be 2");
          assert.equal(1, isBlockCount, "should have 1 block");
          assert.equal(2, notBlockCount, "should have 2 notblock");
          done();
        });
    });

    it('should handle tag unclosed file.', function(done) {
      var count = 0;
      var isBlockCount = 0;
      var notBlockCount = 0;
      var rs = fs.createReadStream('fixtures/tagfileopen.txt')
        .pipe(splitterStream())
        .pipe(blockstream("xx", "yy"))
        .pipe(through.obj(function(lineOrBlock, enc, cb) {
          count++;
          if (lineOrBlock instanceof AbstractLine) {
            notBlockCount++;
          } else {
            isBlockCount++;
          }
          cb();
        }))
        .on('finish', function() {
          assert.equal(5, count, "total should be 5");
          assert.equal(0, isBlockCount, "should have no block");
          assert.equal(5, notBlockCount, "should have 5 notblock");
          done();
        });
    });
  });
});
