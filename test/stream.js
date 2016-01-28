var assert = require('assert');
var through = require('through2');
var logmsg = require('./logmsg');
var fs = require('fs');

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

describe('FileStream', function() {
  it('should ok', function(done) {
      var rr = fs.createReadStream('./fixtures/tree.txt');
      var bufs = [];
      rr.pipe(through.obj(function(buf, enc, cb){
        bufs.push(buf);
        cb();
      })).on('finish', function(){
        var str = "";
        for(var value of bufs) {
          str += value.toString();
        }
        assert.equal("abc", str.substring(0,3));
        done();
      });
  });
});

describe('Stream', function() {
  it('should ok', function(done) {
      var received = [];

      var start = prefixStream("hello");

      start.pipe(through.obj(function(buf, enc, cb) {
        received.push(buf);
        cb();
      })).on('finish', function() {
        assert.equal(4, received.length);
        done();
      });
      start.write('11111.');
      start.write('111111.');
      start.write('111111.');
      start.end();
  });
});
