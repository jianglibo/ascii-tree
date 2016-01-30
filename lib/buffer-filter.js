var BytesLine = require('./bytes-line');

module.exports = BufferFilter;

/**
 * @constructor BufferFilter
 * @param {(string|Buffer)} bufOrStr
 * @param {{string}} [enc=UTF-8] - encoding.
 */
function BufferFilter(bufOrStr, enc) {
  if (typeof bufOrStr === 'string') {
    this.buf = enc ? new Buffer(bufOrStr, enc) : new Buffer(bufOrStr);
  } else {
    this.buf = bufOrStr;
  }
  this.enc = enc;
  this.mixedLines = [];
}
/**
 * process all AsciiTree in buffer.
 * @function filter
 * @return {BufferFilter} - return this.
 */

BufferFilter.prototype.filter = function() {
  var i = 0,
    allLines = BytesLine.getArray(this.buf),
    oneLine,
    lineArray = [],
    startTagReached = false,
    lineType;

  for (; i < allLines.length; i++) {
    oneLine = allLines[i];
    lineType = oneLine.isTagLine(startTag, endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      this.mixedLines.push(lineArray);
      lineArray = [];
      startTagReached = false;
    } else {
      if (startTagReached) {
        lineArray.push(oneLine);
      } else {
        this.mixedLines.push(oneLine);
      }
    }
  }

  for (i = 0; i < lineArray.length; i++) {
    this.mixedLines.push(lineArray[i]);
  }
  return this;
};
/**
 * @function toBufferArray
 * @return {Buffer[]} - flatted array of Buffer.
 */
BufferFilter.prototype.toBufferArray = function() {
  var flattedLines = this.mixedLines.reduce(function(val, it){
    return val.concat(it);
  }, []);
  return flattedLines.map(function(it){
    return it.toBuffer();
  });
};

/**
 * @function toBuffer
 * @return {Buffer} - whole buffer with asciitree converted.
 */
BufferFilter.prototype.toBuffer = function() {
  return Buffer.concat(this.toBufferArray());
};

BufferFilter.prototype.toString = function() {
  return this.enc ? this.toBuffer().toString(this.enc) : this.toBuffer().toString();
};
