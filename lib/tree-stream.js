var through2 = require('through2');
var util = require('util');
var AsciiTree = require('./ascii-tree');

module.exports = TreeStream;

function TreeStream() {
  return through2.obj(function(blockOrLine, enc, cb) {
    if (blockOrLine.isBlock) {
      var convertedLines = new AsciiTree(blockOrLine.lines).convert();
      convertedLines.forEach(function(it) {
        this.push(it);
      }, this);
    } else {
      this.push(blockOrLine);
    }
    cb();
  });
}
