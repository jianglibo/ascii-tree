var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');

module.exports = AsciiTreeBuilder;

function AsciiTreeBuilder() {
  this.content = null;
}

/**
 * @function withContent
 * @param {string|Buffer} content
 * @param {string} enc - string encoding.
 * @return {AsciiTreeBuilder} - return this instance.
 */
AsciiTreeBuilder.prototype.withContent = function(content, enc) {
  this.content = content;
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
  bytesLines = BytesLine.getArray(this.content, this.enc);
  return new AsciiTree(bytesLines, null, this.enc);
};
