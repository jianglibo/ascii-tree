var through2 = require('through2');
var util = require('util');
var LineBlock = require('./line-block');

module.exports = BlockStream;

/**
 * @function BlockStream
 * @param {(string|Regex)} startTag
 * @param {(string|endTag)} endTag
 * @return {Transform}
 */
function BlockStream(startTag, endTag) {
  var bytesLines = [];
  var startTagReached = false;

  return through2.obj(function(bytesLine, enc, cb) {
    var lineType = bytesLine.isTagLine(startTag, endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      this.push(new LineBlock(bytesLines));
      bytesLines = [];
      startTagReached = false;
    } else {
      if (startTagReached) {
        bytesLines.push(bytesLine);
      } else {
        this.push(bytesLine);
      }
    }
    cb();
  }, function(cb) {
    if (bytesLines.length > 0) {
      if (startTagReached) { //unmatching tag pair.
        bytesLines.forEach(function(it) {
          this.push(it);
        }, this);
        startTagReached = false;
      } else {
        this.push(new LineBlock(bytesLines));
      }
      bytesLines = [];
    }
    cb();
  });
}
