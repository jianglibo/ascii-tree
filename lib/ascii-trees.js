var AsciiTree = require('./ascii-tree');
var lineUtil = require('./line-util');
module.exports = AsciiTrees;

function AsciiTrees(allLines, startTag, endTag, prepend, append, leadingChar) {
  this.allLines = allLines;
  this.startTag = startTag;
  this.endTag = endTag;
  this.prepend = prepend;
  this.append = append;
  if ((typeof leadingChar) === 'string') {
    this.leadingCharCode = leadingChar.charCodeAt(0);
  } else {
    this.leadingCharCode = leadingChar;
  }
}

AsciiTrees.prototype.convert = function() {
  var i = 0,
    allLines = this.allLines,
    lt,
    startTag = this.startTag,
    endTag = this.endTag,
    prepend = this.prepend,
    append = this.append,
    treeStarted = false,
    blocks = [],
    isBuffer = false,
    block = [];

  if (!allLines || allLines.length === 0) {
    return [];
  }

  isBuffer = Buffer.isBuffer(allLines[0]);
  if (prepend) {
    if (isBuffer) {
      if (!Buffer.isBuffer(prepend)) {
        prepend = new Buffer(prepend);
      }
    }
  }
  console.log(prepend);
  if (append) {
    if (isBuffer) {
      if (!Buffer.isBuffer(append)) {
        append = new Buffer(append);
      }
    }
  }

  console.log(append);
  allLines.forEach(function(line, idx) {
    lt = lineUtil.lineType(startTag, endTag, line);
    if (lt === 'NO') {
      block.push(line);
    } else {
      if (lt === 'START') {
        treeStarted = true;
        if (block.length > 0) {
          blocks.push(block);
        }
      } else {
        treeStarted = false;
        if (block.length > 0) {
          var result = new AsciiTree(block, this.leadingCharCode).convert();
          if (prepend) {
            result.unshift(prepend);
          }
          if (append) {
            result.push(append);
          }
          blocks.push(result);
        }
      }
      block = [];
    }
  }, this);

  if (block.length > 0) {
    if (treeStarted) {
      blocks.push(new AsciiTree(block, this.leadingCharCode).convert());
    } else {
      blocks.push(block);
    }
  }
  var afterLines = [];
  blocks.forEach(function(bk) {
    bk.forEach(function(line) {
      afterLines.push(line);
    });
  });
  return afterLines;
};
