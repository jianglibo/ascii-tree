module.exports = AbstractLine;

/**
 * @constructor
 */
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

/**
 * @function
 * @memberof AbstractLine
 * @instance
 * @abstract
 * @return {string}
 */
AbstractLine.prototype.getStringContent = function() {
  throw new Error('must be implemented by subclass!');
};

/**
 * drop leading code and return the number dropped.
 * @function dropLeadingCode
 * @memberof AbstractLine
 * @instance
 * @abstract
 * @return {Number} - return number of leadingCode dropped.
 */
AbstractLine.prototype.dropLeadingCode = function() {
  throw new Error('must be implemented by subclass!');
};

/**
 * if content and separator are both empty array, return true.
 * @function
 * @memberof AbstractLine
 * @instance
 * @abstract
 * @return {Number} - return number of leadingCode dropped.
 */
AbstractLine.prototype.isWhiteLine = function(line) {
  throw new Error('must be implemented by subclass!');
};

/**
 * @function
 * @memberof AbstractLine
 * @instance
 * @abstract
 * @return {Number} - return number of leadingCode dropped.
 */
AbstractLine.prototype.prepend = function(prepend) {
  throw new Error('must be implemented by subclass!');
};

/**
 * @function
 * @memberof AbstractLine
 * @instance
 * @abstract
 * @return {Number} - return number of leadingCode dropped.
 */
AbstractLine.prototype.append = function(append) {
  throw new Error('must be implemented by subclass!');
};
/**
 * test is this object is a tagLine.
 * @function
 * @memberof AbstractLine
 * @instance
 * @param {string|Regex} startTag
 * @param {string|Regex} endTag
 * @return {Boolean}
 */
AbstractLine.prototype.isTagLine = function(startTag, endTag) {
  var line;
  try {
    line = this.getStringContent();
  } catch (err) { //if line got encode problem, it will not be a tagLine.
    return 'NO';
  }

  var trimed = line.trim(),
    isStartTagString = (typeof startTag) === 'string',
    isEndTagString = (typeof endTag) === 'string';

  if (isStartTagString) {
    if (trimed === startTag) {
      return 'START';
    }
  } else {
    if (startTag.exec(trimed)) {
      return 'START';
    }
  }

  if (isEndTagString) {
    if (trimed === endTag) {
      return 'END';
    }
  } else {
    if (endTag.exec(trimed)) {
      return 'END';
    }
  }
  return 'NO';
};

AbstractLine.prototype.isAbstractLine = function() {
  return typeof o === 'object' && o instanceof AbstractLine;
};
