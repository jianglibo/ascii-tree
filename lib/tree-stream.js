/**
 * this transform used after BlockStream.
 * @module
 */
var through2 = require('through2');
var util = require('util');
var AsciiTree = require('./ascii-tree');
var BytesLine = require('./bytes-line');

module.exports = TreeStream;

function TreeStream() {
  return through2.obj(function(bytesLines, enc, cb) {
    if (BytesLine.isBytesLine(bytesLines)) {
      this.push(bytesLines);
    } else {
      new AsciiTree(bytesLines,null, enc).convert().toBytesLineArray().forEach(function(it) {
        this.push(it);
      }, this);
    }
    cb();
  });
}
