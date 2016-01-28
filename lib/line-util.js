var Char = require('./char');
var BytesLine = require('./bytes-line');
var BufferLine = require('./buffer-line');
var StringLine = require('./string-line');

module.exports = LineUtil;

function LineUtil() {}

LineUtil.stringLines = function createStringLines(strlines) {
  return strlines.map(function(it){
    return new StringLine(it);
  });
};

LineUtil.bufferLines = function createStringLines(strlines) {
  return strlines.map(function(it){
    return new BufferLine(new Buffer(it));
  });
};

LineUtil.guessLeadingCharCode = function(lines) {
  if (!lines || lines.length === 0) {
    return null;
  }
  if (typeof lines[0] === 'string') {
    lines = LineUtil.stringLines(lines);
  }
  var countmap = [],
    leader,
    i = 0;
  lines.forEach(function(line) {
    if (!line.isWhiteLine()) {
      leader = line.charCodeAt(0);
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
