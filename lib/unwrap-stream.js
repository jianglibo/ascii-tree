/**
 * @module
 */
var through2 = require('through2');
var util = require('util');

module.exports = UnwrapStream;

function UnwrapStream() {
  return through2.obj(function(wrappedLine, enc, cb) {
    this.push(wrappedLine.toBuffer());
    cb();
  });
}
