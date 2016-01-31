var AbstractLine = require('./abstract-line');
var util = require('util');
var Char = require('./char');
var LineUtil = require('./line-util');

module.exports = BytesLine;

/**
 * @constructor
 * @augments AbstractLine
 * @param {byte[]} content - array of byte.
 * @param {byte[]} separator - line separator.
 */
function BytesLine(content, separator) {
  content = content || [];
  AbstractLine.call(this, content, separator);
}

util.inherits(BytesLine, AbstractLine);

BytesLine.prototype.getStringContent = function() {
  return new Buffer(this.content).toString();
};

BytesLine.prototype.prepend = function(prepend) {
  var buf = new Buffer(prepend),
    i = 0,
    a = [];
  for (; i < buf.length; i++) {
    a.push(buf[i]);
  }
  this.content = a.concat(this.content);
};

BytesLine.prototype.isWhiteLine = function() {
  var c = this.content;
  for (var i = 0; i < c.length; i++) {
    if (!Char.isWhiteSpace(c[i])) {
      return false;
    }
  }
  return true;
};

BytesLine.prototype.charCodeAt = function(idx) {
  idx = idx || 0;
  return this.content[idx];
};

/**
 * trim leadingCode and return the number trimed.
 * @function dropLeadingCode
 * @param {number} leadingCode - charCode
 * @return {Number} - the number of trimed leadingCode
 */
BytesLine.prototype.dropLeadingCode = function(leadingCode) {
  var c = this.content,
    i = 0;
  for (; i < c.length; i++) {
    if (c[i] !== leadingCode) {
      break;
    }
  }
  if (i > 0) {
    this.content = this.content.slice(i);
  }
  return i;
};

BytesLine.prototype.isEmpty = function() {
  return this.content.length === 0 && this.separator.length === 0;
};

BytesLine.prototype.toBuffer = function() {
  return new Buffer(this.content.concat(this.separator));
};

/** @namespace BytesLine */

/**
 * @function isBytesLine
 * @memberof BytesLine
 * @static
 * @return {Boolean}
 */
BytesLine.isBytesLine = function(o) {
  return typeof o === 'object' && o instanceof BytesLine;
};

/**
 * get array of BytesLine.
 * @function getArray
 * @memberof BytesLine
 * @static
 * @param {(string|Buffer)} src
 * @param {string} [enc=UTF-8] - encoding.
 * @return {BytesLine[]}
 */
BytesLine.getArray = function(src, enc) {
  var i = 0,
    code,
    lines = [],
    crlf = [],
    byteArray = [],
    crlfReached = false;

  if (typeof src === 'string') {
    src = enc ? new Buffer(src, enc) : new Buffer(src);
  }
  for (; i < src.length; i++) {
    code = src[i];
    if (code === 0x0D || code === 0x0A) {
      crlf.push(code);
      crlfReached = true;
    } else {
      if (crlfReached) {
        lines.push(new BytesLine(byteArray, crlf));
        byteArray = [];
        crlf = [];
      }
      byteArray.push(code);
      crlfReached = false;
    }
  }

  if (byteArray.length > 0 || crlf.length > 0) {
    lines.push(new BytesLine(byteArray, crlf));
  }
  return lines;
};
