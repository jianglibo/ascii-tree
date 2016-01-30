var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');

module.exports = AsciiTreeBuilder;

function AsciiTreeBuilder() {
  this.content = null;
}

/**
 * @function withString
 * @param {string} str
 * @param {string} enc - string encoding.
 * @return {AsciiTreeBuilder} - return this instance.
 */
AsciiTreeBuilder.prototype.withString = function(str, enc) {
  this.isString = true;
  this.content = str;
  this.enc = enc;
  return this;
};

AsciiTreeBuilder.prototype.withEncode = function(enc) {
  this.enc = enc;
  return this;
};

/**
 * create an AsciiTree instance.
 * @function build
 * @return {AsciiTree}
 */
AsciiTreeBuilder.prototype.build = function() {
  var bytesLines;
  if (this.isString) {
      bytesLines = BytesLine.getArray(this.content, this.enc);
      return new AsciiTree(bytesLines,null, this.enc);
  }
};
