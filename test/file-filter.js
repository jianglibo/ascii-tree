var assert = require('assert');
var through2 = require('through2');
var FileFilter = require('../lib/file-filter');

var splitterStream = require('../lib/splitter-stream');
var blockStream = require('../lib/block-stream');
var treeStream = require('../lib/tree-stream');
var fixtures = require('./fixtures');

var startTag = "---start---";
var endTag = "---end---";

describe('FileFilter', function() {
  describe('#convert()', function() {
    it('block-stream should work.', function(done) {
      var count = 0;
      var blocks = [];
      var src = through2.obj(function(buf, enc, cb) {
        cb(null, buf);
      });

      src.pipe(splitterStream())
        .pipe(blockStream(startTag, endTag))
        .pipe(through2.obj(function(block, enc, cb) {
          count++;
          blocks.push(block);
          cb();
        })).on('finish', function() {
          assert.equal(1, count);
          assert.equal(fixtures.stringArray.length, blocks[0].lines.length);

          done();
        });

      src.write(startTag);
      src.write('\r');
      fixtures.stringArray.forEach(function(it){
        src.write(it);
        src.write('\r');
      });
      src.write(endTag);
      src.write('\r\r\r');
      src.end();
    });

    it('should handle stream input.', function(done) {
      var count = 0;

      var src = through2.obj(function(buf, enc, cb) {
        cb(null, buf);
      });

      src.pipe(splitterStream())
        .pipe(blockStream(startTag, endTag))
        .pipe(treeStream())
        .pipe(through2.obj(function(line, enc, cb) {
          count++;
          cb();
        })).on('finish', function() {
          assert.equal(fixtures.stringArray.length, count);
          done();
        });

      src.write(startTag);
      src.write('\r');
      fixtures.stringArray.forEach(function(it) {
        src.write(it);
        src.write('\r');
      });
      src.write(endTag);
      src.end();
    });
  });
});
