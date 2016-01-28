var chalk = require('chalk');

process.on('uncaughtException', function(err) {
  console.log(chalk.red(err));
});

module.exports = function logmsg(expected, actual, name) {
  var v = (name || "value") + " should be " + expected + ". actual value is: " + actual;
  if (expected != actual) {
    console.log(chalk.red(v));
  } else {
    console.log(v);
  }
};
