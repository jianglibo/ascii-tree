module.exports = TreeLine;

function TreeLine(line, leadingCode) {
  this.line = line;
  this.leadingCode = leadingCode;
  this.children = [];
  this.parent = null;
  if (line) {
    this.level = line.dropLeadingCode(leadingCode);
  } else {
    this.level = -1;
  }
}

TreeLine.prototype.setupMeta = function() {
  var len = this.children.length,
    o;

  if (len > 0) {
    //first TreeLine
    o = this.children[0];
    o.selfPrefix = "├── ";
    o.childPrefix = "|   ";
    for (var i = 1; i < len - 1; i++) { //start from second to last two.
      o = this.children[i];
      o.selfPrefix = "├── ";
      o.childPrefix = "│   ";
    }
    //last
    o = this.children[len - 1];
    o.selfPrefix = "└── ";
    o.childPrefix = "    ";
  }

  this.children.forEach(function(it) {
    it.setupMeta();
  });
};

TreeLine.prototype.toLines = function(collector) {
  if (!collector) {
    collector = [];
  }
  var p = this.parent,
    childPrefix,
    line = this.line;

  if (this.level !== -1) { //is top
    line.prepend(this.selfPrefix);
    while (p && (p.level !== -1)) {
      childPrefix = p.childPrefix || "    ";
      line.prepend(childPrefix);
      p = p.parent;
    }
    collector.push(line);
  }

  this.children.forEach(function(it) {
    it.toLines(collector);
  });
  return collector;
};

TreeLine.prototype.addChild = function(treeLine) {
  var ld = treeLine.level - this.level; //top is -1, positive is lower level.
  if (ld === 0) { //same level
    return this.parent.addChild(treeLine);
  } else if (ld > 0) { //lower one level, only one level.
    this.children.push(treeLine);
    treeLine.parent = this;
    return treeLine;
  } else { // mutilple level.
    var p = this;
    for (; ld <= 0; ld++) {
      if (!p.parent) {
        break;
      }
      p = p.parent;
    }
    return p.addChild(treeLine);
  }
};
