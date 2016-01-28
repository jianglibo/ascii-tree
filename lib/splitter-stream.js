var through2 = require('through2');
var BytesLine = require('./bytes-line');

// windows 0d0a, unix 0a, mac 0d(os9 early) 0a(new version).
var OD = 0x0D;
var OA = 0x0A;

module.exports = SplitStream;

function SplitStream() {
  var byteArray = [];
  var crlf = [];
  var clrfReached = false;

  function reset() {
    byteArray = [];
    crlf = [];
  }

  return through2.obj(function(buf, enc, cb) {
    for (var i = 0; i < buf.length; i++) {
      if (buf[i] === OD || buf[i] === OA) {
        crlf.push(buf[i]);
        clrfReached = true;
      } else {
        if (clrfReached) {
          this.push(new BytesLine(byteArray, crlf));
          reset();
        }
        byteArray.push(buf[i]);
        clrfReached = false;
      }
    }
    cb(); // I had process this buf.
  }, function(cb) {
    var sl = new BytesLine(byteArray, crlf);
    if (!sl.isEmpty()) {
      this.push(sl);
      cb();
      reset();
    }
  });
}
