var fs = require('fs');
var chai = require('chai');
var through = require('through2');
var assert = require('assert');
var treeStream = require('../lib/tree-stream');
var blockStream = require('../lib/block-stream');
var splitterStream = require('../lib/splitter-stream');
var AbstractLine = require('../lib/abstract-line');


var expect = chai.expect;
var fn = "whole.txt";

describe('TreeStream', function() {
  describe('#pipe()', function() {
    it('should handle tag file.', function(done) {
      var rs = fs.createReadStream('fixtures/' + fn)
        .pipe(splitterStream())
        .pipe(blockStream("*", "**"))
        .pipe(treeStream())
        .pipe(through.obj(function(line, enc, cb) {
          cb(null, line.toBuffer());
        }))
        .pipe(fs.createWriteStream('fixtures-out/' + fn))
        .on('finish', function() {
          // values1.forEach(function(it) {
          //   assert(it instanceof AbstractLine, "should be an AbstractLine.");
          // });
          // assert.equal(6, count); // tag line not include.
          done();
        });
    });
  });
});
