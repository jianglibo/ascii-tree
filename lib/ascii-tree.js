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
  this.enc = enc;
}
/**
 * @function toStringLines
 * @return {string[]} - converted lines.
 */
AsciiTree.prototype.toStringLines = function() {
  var enc = this.enc;
  return this.toBytesLines().map(function(it) {
    return enc ? it.toBuffer().toString(enc) : it.toBuffer().toString();
  });
};

/**
 * @function toString
 * @return {string} - converted string.
 */
AsciiTree.prototype.toString = function() {
  var enc = this.enc,
    bytesArray,
    buf;

  bytesArray = this.toBytesLines().reduce(function(val, it) {
    return val.concat(it.content, it.separator);
  }, []);
  buf = new Buffer(bytesArray);
  return enc ? buf.toString(enc) : buf.toString();
};

/**
 * @function toBytesLines
 * @return {BytesLine[]} - return array of BytesLine.
 */
AsciiTree.prototype.toBytesLines = function() {
  return this.topLine.toLines();
};

/**
 * @function convert
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
