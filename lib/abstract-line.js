module.exports = AbstractLine;

function AbstractLine(content, separator) {
  this.content = content;
  this.separator = separator;
}

AbstractLine.prototype.trimBufferOrArray = function(buf) {
  var i = 0,
    start = 0,
    end = buf.length;

  for (i = 0; i < buf.length; i++) {
    if (!Char.isWhiteSpace(buf[i])) {
      start = i;
      break;
    }
  }

  for (i = buf.length - 1; i > -1; i--) {
    var b = buf[i];
    if (!Char.isWhiteSpace(b)) {
      end = i + 1;
      break;
    }
  }
  return buf.slice(start, end);
};

AbstractLine.prototype.getStringContent = function() {
  console.error("please implement getStringContent method in inherited class.");
};

AbstractLine.prototype.dropLeadingCode = function() {
  console.error("please implement dropLeadingCode method in inherited class.");
};

AbstractLine.prototype.isWhiteLine = function(line) {
  console.error("please implement isWhiteLine method in inherited class.");
};

AbstractLine.prototype.charCodeAt = function(idx) {
  console.error("please implement charCodeAt method in inherited class.");
};

AbstractLine.prototype.prepend = function(prepend) {
  console.error("please implement prepend method in inherited class.");
};

AbstractLine.prototype.append = function(append) {
  console.error("please implement append method in inherited class.");
};

AbstractLine.prototype.isTagLine = function(startTag, endTag) {
  var line;
  try {
    line = this.getStringContent();
  } catch (err) { //if line got encode problem, it will not be a tagLine.
    return 'NO';
  }

  AbstractLine.prototype.isAbstractLine = function() {
    return typeof o === 'object' && o instanceof AbstractLine;
  };

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
};
