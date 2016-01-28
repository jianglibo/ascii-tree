var AbstractLine = require('./abstract-line');
var util = require('util');
var Char = require('./char');

module.exports = BytesLine;

function BytesLine(content, separator) {
  AbstractLine.apply(this, arguments);
  if (!content) {
    this.content = [];
  }
}

util.inherits(BytesLine, AbstractLine);

BytesLine.prototype.getStringContent = function() {
  return this.content && new Buffer(this.content).toString();
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

BytesLine.isBytesLine = function(o) {
  return typeof o === 'object' && o instanceof BytesLine;
};
