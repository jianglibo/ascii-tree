var Line= require('./line');
var lineUtil= require('./line-util');

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
  var topLine = new Line(),
    leadingCharCode = this.leadingCharCode,
    currentLine = topLine;

  this.lines.forEach(function(it) {
    if (!lineUtil.isWhiteLine(it)) {
      currentLine = currentLine.addChild(lineUtil.getLineMeta(it, leadingCharCode));
    }
  }, this);

  topLine.setupMeta();
  return topLine;
};
