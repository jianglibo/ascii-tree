/** @namespace LineUtil */
var Char = require('./char');
var BytesLine = require('./bytes-line');

module.exports = LineUtil;

function LineUtil() {}

/**
 * @function buffer2bytes
 * @memberof LineUtil
 * @static
 * @param {Buffer} buf
 * @return {byte[]}
 */
LineUtil.buffer2bytes = function(buf) {
  var bytes = [];
  for (var i = 0; i < buf.length; i++) {
    bytes.push(buf[i]);
  }
  return bytes;
};

/**
 * @function guessLeadingCharCode
 * @memberof LineUtil
 * @static
 * @param {BytesLine[]} lines
 * @return {Number} - the leading char's code.
 */
LineUtil.guessLeadingCharCode = function(lines) {
  if (!lines || lines.length === 0) {
    return null;
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
