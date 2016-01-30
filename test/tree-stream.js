var fs = require('fs');
var chai = require('chai');
var through = require('through2');
var assert = require('assert');
var treeStream = require('../lib/tree-stream');
var blockStream = require('../lib/block-stream');
var splitterStream = require('../lib/splitter-stream');
var AbstractLine = require('../lib/abstract-line');


var expect = chai.expect;

describe('TreeStream', function() {
  describe('#pipe()', function() {
    it('should handle notag file.', function(done) {
      var count = 0;
      var values1 = [];

      var rs = fs.createReadStream('fixtures/tagfile.txt')
        .pipe(splitterStream())
        .pipe(blockStream("xx", "yy"))
        .pipe(treeStream())
        .pipe(through.obj(function(line, enc, cb) {
          count++;
          values1.push(line);
          cb();
        }))
        .on('finish', function() {
          values1.forEach(function(it) {
            assert(it instanceof AbstractLine, "should be an AbstractLine.");
          });
          assert.equal(6, count); // tag line not include.
          done();
        });
    });
  });
});
