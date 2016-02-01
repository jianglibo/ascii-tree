var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');
var Convertor = require('./convertor');

module.exports = ConvertorBuilder;

function ConvertorBuilder() {
  this.content = null;
}

/**
 * @function withContent
 * @param {Buffer|string} content
 * @param {string} enc - string encoding.
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withContent = function(content, enc) {
  this.content = content;
  this.enc = enc;
  return this;
};

/**
 * @function withStartTag
 * @param {string} startTag
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withStartTag = function(startTag) {
  this.startTag = startTag;
  return this;
};

/**
 * @function withEndTag
 * @param {string} endTag
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withEndTag = function(endTag) {
  this.endTag = endTag;
  return this;
};
/**
 * @function withEncode
 * @param {string} enc - encoding.
 */
ConvertorBuilder.prototype.withEncode = function(enc) {
  this.enc = enc;
  return this;
};

/**
 * @function withPrepend
 * @param {string|Buffer} prepend
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withPrepend = function(prepend) {
  this.prepend = prepend;
  return this;
};

/**
 * @function withAppend
 * @param {string|Buffer} append
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withAppend = function(append) {
  this.append = append;
  return this;
};

/**
 * create an AsciiTree instance.
 * @function build
 * @return {AsciiTree}
 */
ConvertorBuilder.prototype.build = function() {
  return new Convertor(this.content, this.startTag, this.endTag, this.prepend, this.append, this.enc);
};
