module.exports = LineObject;

function LineObject(lineo) {
  if (!lineo) {
    this.level = -1;
    this.content = "";
  } else {
    this.level = lineo.level;
    this.content = lineo.content;
  }
  this.children = [];
  this.parent = null;
}

LineObject.prototype.setupMeta = function() {
  var len = this.children.length,
    o;

  if (len > 0) {
    //first line
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

LineObject.prototype.toLines = function(collector) {
  if (!collector) {
    collector = [];
  }
  var p = this.parent,
    childPrefix,
    content;

  if (this.level !== -1) { //is top
    content = this.selfPrefix + this.content;
    while (p && (p.level !== -1)) {
      childPrefix = p.childPrefix || "    ";
      content = childPrefix + content;
      p = p.parent;
    }
    // console.log(content);
    collector.push(content);
  }

  this.children.forEach(function(it) {
    it.toLines(collector);
  });
  return collector;
};

LineObject.prototype.addChild = function(lineo) {
  var ld = lineo.level - this.level; //top is -1, positive is lower level.
  var result;
  if (ld === 0) { //same level
    return this.parent.addChild(lineo);
  } else if (ld > 0) { //lower one level, only one level.
    result = new LineObject(lineo);
    this.children.push(result);
    result.parent = this;
    return result;
  } else { // mutilple level.
    var p = this;
    for (; ld <= 0; ld++) {
      if (!p.parent) {
        break;
      }
      p = p.parent;
    }
    return p.addChild(lineo);
  }
};
