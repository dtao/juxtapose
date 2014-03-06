/*
 * NOTE: This reporter doesn't work yet.
 *
 * To see this reporter in action, run:
 * mocha reporters/mocha-test.js --reporter juxtapose/reporters/mocha
 */
var juxtapose = require('./juxtapose');

function MochaReporter(runner) {
  var failures = [];

  console.log('created reporter!');

  runner.on('fail', function(test, err) {
    failures.push(test);
  });

  runner.on('end', function() {
    failures.forEach(function(test) {
      console.warn('Expected these to match:');
      console.warn(juxtapose(test.expected, test.actual) + '\n');
    });
  });
}

module.exports = MochaReporter;
