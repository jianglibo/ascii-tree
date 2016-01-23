var Line= require('./line');

module.exports = AsciiTree;

function AsciiTree(lines, leadingChar) {
  if ((typeof lines) === 'string') {
    this.lines = lines.split("\n");
  } else {
    this.lines = lines;
  }
  this.leadingChar = leadingChar || this.guessLeadingChar();
}

AsciiTree.prototype.convert = function() {
  var topLine = this.buildTree();
  return topLine.toLines();
};

AsciiTree.prototype.buildTree = function() {
  var topLine = new Line(),
    leadingChar = this.leadingChar,
    currentLine = topLine;

  this.lines.forEach(function(it) {
    if (it.trim()) {
      currentLine = currentLine.addChild(this.getLineMeta(it, leadingChar));
    }
  }, this);

  topLine.setupMeta();
  return topLine;
};

AsciiTree.prototype.getLineMeta = function(line) {
  var level = 0,
    leadingChar = this.leadingChar,
    content;
  for (var i = 0; i < line.length; i++) {
    if (line.charAt(i) === leadingChar) { // if leadingChar = "", always false.
      level++;
    } else {
      content = line.substring(i);
      break;
    }
  }
  return {
    level: level,
    content: content
  };
};

// leading char cannot be alphanumeric
AsciiTree.prototype.guessLeadingChar = function() {
  var countmap = {},
    leader,
    oneCount,
    max = 0,
    maxLeaders = [];

  this.lines.forEach(function(line) {
    if (line.trim().length > 0) {
      leader = line.charAt(0);
      if (countmap[leader]) {
        countmap[leader] = countmap[leader] + 1;
      } else {
        countmap[leader] = 1;
      }
    }
  });

  Object.keys(countmap).forEach(function(key) {
    oneCount = countmap[key];
    if (oneCount > max) {
      max = oneCount;
    }
  });

  Object.keys(countmap).forEach(function(key) {
    oneCount = countmap[key];
    if (oneCount === max) {
      maxLeaders.push(key);
    }
  });

  if (maxLeaders.length > 1) {
    var re = /\w/;
    for (var i = 0; i < maxLeaders.length; i++) {
      if (!re.exec(maxLeaders[i])) {
        return maxLeaders[i];
      }
    }
  }
  if (/[A-Za-z0-9]/.exec(maxLeaders[0])) {
    return "";
  }
  return maxLeaders[0];
};
