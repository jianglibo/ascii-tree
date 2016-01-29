var assert = require('assert');
var through = require('through2');
var fs = require('fs');


describe('ErrorException', function() {
  it('error should not piped', function(done) {
    var errmsg = false;

    var start = through.obj(function(buf, enc, cb) {
      this.emit('error', new Error("hello error."));
      cb();
    });

    var second = through.obj(function(buf, enc, cb) {
      cb();
    }).on('error', function(err) {
      errmsg = true;
    });

    try {
      start.pipe(second);
      start.write('hello');
      start.end();
    } catch (err) {
      assert(!errmsg);
      done();
    }
  });
  it('call cb(error) should also not piped.', function(done) {
    var errmsg = false;
    var onfinishCalled = false;
    var start = through.obj(function(buf, enc, cb) {
      cb(new Error("hello error."), buf);
    });

    var second = through.obj(function(buf, enc, cb) {
      cb();
    }).on('error', function(err) {
      errmsg = true;
    }).on('finish', function(){
      onfinishCalled = true;
    });
    try {
      start.pipe(second);
      start.write("abc");
      start.end();
    } catch (err) {
      assert(!errmsg);
      assert(!onfinishCalled);
      done();
    }
  });
});
