var through2 = require('through2');
var util = require('util');
var LineBlock = require('./line-block');

module.exports = BlockStream;

function BlockStream(startTag, endTag) {
  var lines = [];
  var startTagReached = false;

  return through2.obj(function(line, enc, cb) {
    var lineType = line.isTagLine(startTag, endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      this.push(new LineBlock(lines));
      lines = [];
      startTagReached = false;
    } else {
      if (startTagReached) {
        lines.push(line);
      } else {
        this.push(line);
      }
    }
    cb();
  }, function(cb) {
    if (lines.length > 0) {
      if (startTagReached) { //unmatching tag pair.
        lines.forEach(function(it) {
          this.push(it);
        }, this);
        startTagReached = false;
      } else {
        this.push(new LineBlock(lines));
      }
      lines = [];
    }
    cb();
  });
}
