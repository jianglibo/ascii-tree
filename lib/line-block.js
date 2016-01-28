module.exports = LineBlock;

function LineBlock(lines) {
  this.isBlock = true;
  this.lines = lines;
}

LineBlock.prototype.isEmpty = function() {
  return this.lines.length === 0;
};
