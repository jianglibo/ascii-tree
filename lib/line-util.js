var Char = require('./char');

module.exports = LineUtil;

function LineUtil() {}

LineUtil.getLineMeta = function(line, leadingCode) {
  var level = 0,
    i = 0,
    content;
  if (Buffer.isBuffer(line)) {
    for (; i < line.length; i++) {
      if (line[i] === leadingCode) { // if leadingChar = "", always false.
        level++;
      } else {
        content = line.slice(i);
        break;
      }
    }
  } else {
    for (; i < line.length; i++) {
      if (line.charCodeAt(i) === leadingCode) { // if leadingChar = "", always false.
        level++;
      } else {
        content = line.substring(i);
        break;
      }
    }
  }
  return {
    level: level,
    content: content
  };
};

LineUtil.guessLeadingCharCode = function(lines) {
  if (!lines || lines.length === 0) {
    return null;
  }

  var countmap = [],
    leader,
    isBuffer = Buffer.isBuffer(lines[0]),
    i = 0;

  lines.forEach(function(line) {
    if (!LineUtil.isWhiteLine(line)) {
      leader = isBuffer ? line[0] : line.charCodeAt(0);
      var found = false;
      for (i = 0; i < countmap.length; i++) {
        var it = countmap[i];
        if (it.value === leader) {
          it.count = it.count + 1;
          found = true;
          break;
        }
      }
      if (!found) {
        countmap.push({
          value: leader,
          count: 1
        });
      }
    }
  });

  countmap.sort(function(a, b) {
    return b.count - a.count;
  });

  for (i = 0; i < countmap.length; i++) {
    if (!Char.isAlphaNumeric(countmap[i].value)) {
      return countmap[i].value;
    }
  }
  return null;
};

LineUtil.isWhiteLine = function(line) {
  if (!line || line.length === 0) {
    return true;
  }
  if (Buffer.isBuffer(line)) {
    for (var i = 0; i < line.length; i++) {
      if (!Char.isWhiteSpace(line[i])) {
        return false;
      }
    }
    return true;
  } else {
    return !line.trim();
  }
};

LineUtil.bufferTrim = function(buf) {
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

/**
startTag and endTag are alwaye be string.
*/
LineUtil.lineType = function(startTag, endTag, line) {
  if (Buffer.isBuffer(line)) {
    try {
      line = line.toString();
    } catch (err) { //if line got encode problem, it will not be tagLine.
      return 'NO';
    }
  }

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
