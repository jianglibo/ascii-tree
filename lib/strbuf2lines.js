var BytesLine = require('./bytes-line');

module.exports = function(str) {
  var i = 0,
    code,
    lines = [],
    crlf = [],
    byteArray = [],
    crlfReached = false;
    
  for (; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code === 0x0D || code === 0x0A) {
      crlf.push(code);
      crlfReached = true;
    } else {
      if (crlfReached) {
        lines.push(new BytesLine(byteArray, crlf));
        byteArray = [];
        crlf = [];
      }
      byteArray.push(code);
      clrfReached = false;
    }
  }

  if (byteArray.length > 0 || crlf.length > 0) {
    lines.push(new BytesLine(byteArray, crlf));
  }

  return lines;
};
