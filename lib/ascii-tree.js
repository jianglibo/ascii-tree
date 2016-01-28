var lineUtil= require('./line-util');
var TreeLine = require('../lib/tree-line');

module.exports = AsciiTree;

function AsciiTree(lines, leadingCharCode) {
    this.lines = lines;
    this.leadingCharCode = leadingCharCode || lineUtil.guessLeadingCharCode(this.lines);
}

AsciiTree.prototype.convert = function() {
  var topLine = this.buildTree();
  return topLine.toLines();
};

AsciiTree.prototype.buildTree = function() {
  var topLine = new TreeLine(),
    leadingCharCode = this.leadingCharCode,
    currentLine = topLine;

  this.lines.forEach(function(it) {
    if (!it.isWhiteLine()) {
      currentLine = currentLine.addChild(new TreeLine(it, leadingCharCode));
    }
  }, this);

  topLine.setupMeta();
  return topLine;
};
