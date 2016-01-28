var AbstractLine = require('./abstract-line');
var util = require('util');
var Char = require('./char');

module.exports = BufferLine;

function BufferLine(content, separator) {
  AbstractLine.apply(this, arguments);
  if (!content) {
    this.content = new Buffer();
  }
}

util.inherits(BufferLine, AbstractLine);

BufferLine.prototype.getStringContent = function() {
  return this.content && this.content.toString();
};

BufferLine.prototype.prepend = function(prepend) {
  this.content = Buffer.concat([new Buffer(prepend), this.content]);
};

BufferLine.prototype.isWhiteLine = function() {
  var c = this.content;
  for (var i = 0; i < c.length; i++) {
    if (!Char.isWhiteSpace(c[i])) {
      return false;
    }
  }
  return true;
};

BufferLine.prototype.charCodeAt = function(idx) {
  idx = idx || 0;
  return this.content[idx];
};

BufferLine.prototype.dropLeadingCode = function(leadingCode) {
  var c = this.content,
    i = 0;
  for (; i < c.length; i++) {
    if (c[i] !== leadingCode) {
      break;
    }
  }
  if (i > 0) {
    this.content = c.slice(i);
  }
  return i;
};

BufferLine.prototype.isEmpty = function() {
  return this.content.length === 0 && this.separator.length === 0;
};

BufferLine.prototype.toBuffer = function() {
  return new Buffer(this.content.concat(this.separator));
};

BufferLine.isBufferLine = function(o) {
  return typeof o === 'object' && o instanceof BufferLine;
};
