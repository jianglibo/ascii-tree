var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');

module.exports = BufferConvertor;

/**
 * @constructor BufferConvertor
 * @param {(string|Buffer)} bufOrStr
 * @param {string|Regex} startTag
 * @param {string|Regex} endTag
 * @param {{string}} [enc=UTF-8] - encoding.
 */
function BufferConvertor(bufOrStr, startTag, endTag, enc) {
  if (typeof bufOrStr === 'string') {
    this.buf = enc ? new Buffer(bufOrStr, enc) : new Buffer(bufOrStr);
  } else {
    this.buf = bufOrStr;
  }
  this.startTag = startTag;
  this.endTag = endTag;
  this.enc = enc;
  this.mixedLines = [];
}
/**
 * process all AsciiTree in buffer.
 * @function filter
 * @return {BufferConvertor} - return this.
 */

BufferConvertor.prototype.convert = function() {
  var i = 0,
    allLines = BytesLine.getArray(this.buf),
    oneLine,
    lineArray = [],
    startTagReached = false,
    lineType;
  for (; i < allLines.length; i++) {
    oneLine = allLines[i];
    lineType = oneLine.isTagLine(this.startTag, this.endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      this.mixedLines.push(new AsciiTree(lineArray).convert().toBytesLines());
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
BufferConvertor.prototype.toBufferArray = function() {
  var flattedLines = this.mixedLines.reduce(function(val, it) {
    return val.concat(it);
  }, []);
  
  return flattedLines.map(function(it) {
    return it.toBuffer();
  });
};
/**
 * @function toStringArray
 * @return {string[]} - array of string.
 */
BufferConvertor.prototype.toStringArray = function() {
  var enc = this.enc,
    bufs = this.toBufferArray();
  return bufs.map(function(it) {
    return enc ? it.toString(enc) : it.toString();
  });
};

/**
 * @function toBuffer
 * @return {Buffer} - whole buffer with asciitree converted.
 */
BufferConvertor.prototype.toBuffer = function() {
  return Buffer.concat(this.toBufferArray());
};

BufferConvertor.prototype.toString = function() {
  var enc = this.enc,
    buf = this.toBuffer();

  return enc ? buf.toString(enc) : buf.toString();
};
