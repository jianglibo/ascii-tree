var lineUtil = require('./line-util');
var TreeLine = require('./tree-line');
var BytesLine = require('./bytes-line');

module.exports = AsciiTree;

/**
 * @constructor
 * @param {BytesLine[]} - array of BytesLine
 * @param {number} [leadingCharCode] - charCode of leading.Optional, will guess.
 * @param {string} [enc=UTF-8] - encoding.
 */
function AsciiTree(lines, leadingCharCode, enc) {
  this.lines = lines || [];
  this.leadingCharCode = leadingCharCode || lineUtil.guessLeadingCharCode(this.lines);
  this.topLine = null;
  this.enc = Buffer.isEncoding(enc) ? enc : null;
}
/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {Buffer[]} - converted Buffers.
 */
AsciiTree.prototype.toBufferArray = function() {
  var enc = this.enc;
  return this.toBytesLineArray().map(function(it) {
    return it.toBuffer();
  });
};
/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {string[]} - converted lines.
 */
AsciiTree.prototype.toStringArray = function() {
  var enc = this.enc;
  return this.toBufferArray().map(function(it) {
    return enc ? it.toString(enc) : it.toString();
  });
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {string} - converted string.
 */
AsciiTree.prototype.toString = function() {
  return this.toStringArray().reduce(function(val, it) {
    return val + it;
  }, "");
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {BytesLine[]} - return array of BytesLine.
 */
AsciiTree.prototype.toBytesLineArray = function() {
  return this.topLine.toLines();
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {AsciiTree} - return this instance.
 */
AsciiTree.prototype.convert = function() {
  var topLine = new TreeLine(),
    leadingCharCode = this.leadingCharCode,
    currentLine = topLine;

  this.lines.forEach(function(it) {
    if (!it.isWhiteLine()) {
      currentLine = currentLine.addChild(new TreeLine(it, leadingCharCode));
    }
  }, this);
  topLine.setupMeta();
  this.topLine = topLine;
  return this;
};
