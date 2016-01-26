var AsciiTree = require('./ascii-tree');
module.exports = AsciiTrees;

function AsciiTrees(allLines, startTag, endTag, prepend, append, leadingChar) {
  this.allLines = allLines;
  this.startTag = startTag;
  this.endTag = endTag;
  this.prepend = prepend;
  this.append = append;
  this.leadingChar = leadingChar;
}

AsciiTrees.prototype.convert = function() {
  var i = 0,
    allLines = this.allLines,
    lt,
    startTag = this.startTag,
    endTag = this.endTag,
    treeStarted = false,
    blocks = [],
    block = [];

  allLines.forEach(function(line, idx) {
    lt = AsciiTrees.lineType(startTag, endTag, line);
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
          var result = new AsciiTree(block, this.leadingChar).convert();
          if (this.prepend) {
            result.unshift(this.prepend);
          }
          if (this.append) {
            result.push(this.append);
          }
          blocks.push(result);
        }
      }
      block = [];
    }
  }, this);

  if (block.length > 0) {
    if (treeStarted) {
      blocks.push(this.transform(block));
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

function lineType(startTag, endTag, line) {
  var trimed = line.trim(),
    isStartTagString = (typeof startTag) === 'string',
    isEndTagString = (typeof endTag) === 'string';

  if (isStartTagString) {
    if (trimed.indexOf(startTag) !== -1) {
      return 'START';
    }
  } else {
    if (startTag.exec(trimed)) {
      return 'START';
    }
  }

  if (isEndTagString) {
    if (trimed.indexOf(endTag) !== -1) {
      return 'END';
    }
  } else {
    if (endTag.exec(trimed)) {
      return 'END';
    }
  }
  return 'NO';
}

AsciiTrees.lineType = lineType;
