var through2 = require('through2');
var util = require('util');

module.exports = BlockStream;

/**
 * this transform get BytesLine stream, produce a BytesLine or array of BytesLine.
 * @function BlockStream
 * @param {(string|Regex)} startTag
 * @param {(string|endTag)} endTag
 * @return {Transform}
 */
function BlockStream(startTag, endTag) {
  var lineArray = [];
  var startTagReached = false;

  return through2.obj(function(bytesLine, enc, cb) {
    var lineType = bytesLine.isTagLine(startTag, endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      this.push(lineArray);
      lineArray = [];
      startTagReached = false;
    } else {
      if (startTagReached) {
        lineArray.push(bytesLine);
      } else {
        this.push(bytesLine);
      }
    }
    cb();
  }, function(cb) {
    if (lineArray.length > 0) { //unmatched tag.
      lineArray.forEach(function(it) {
        this.push(it);
      }, this);
      startTagReached = false;
      lineArray = [];
    }
    cb();
  });
}
