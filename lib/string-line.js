var AbstractLine = require('./abstract-line');
var util = require('util');

module.exports = StringLine;

function StringLine(content, separator) {
  AbstractLine.apply(this, arguments);
  if (!content) {
    this.content = "";
  }
}

util.inherits(StringLine, AbstractLine);

StringLine.prototype.getStringContent = function() {
  return this.content;
};

StringLine.prototype.prepend = function(prepend) {
  this.content = prepend + this.content;
};

StringLine.prototype.isWhiteLine = function() {
  return !this.content.trim();
};

StringLine.prototype.dropLeadingCode = function(leadingCode) {
  var c = this.content,
    i = 0;

  for (; i < c.length; i++) {
    if (c.charCodeAt(i) !== leadingCode) {
      break;
    }
  }

  if (i > 0) {
    this.content = this.content.substring(i);
  }
  return i;
};

StringLine.prototype.charCodeAt = function(idx) {
  idx = idx || 0;
  return this.content.charCodeAt(idx);
};

StringLine.prototype.isEmpty = function() {
  return this.content.length === 0 && this.separator.length === 0;
};

StringLine.prototype.toBuffer = function() {
  return new Buffer(this.content.concat(this.separator));
};

StringLine.isStringLine = function(o) {
  return typeof o === 'object' && o instanceof StringLine;
};
