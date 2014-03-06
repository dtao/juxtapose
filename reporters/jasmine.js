/*
 * To see this reporter in action, simply run:
 * node reporters/jasmine-test.js
 */
var juxtapose = require('../juxtapose');

function JasmineReporter() {
  this.failingSpecs = [];
}

JasmineReporter.prototype.reportSpecResults = function(spec) {
  if (!spec.results().passed()) {
    this.failingSpecs.push(spec);
  }
};

JasmineReporter.prototype.reportRunnerResults = function(runner) {
  this.failingSpecs.forEach(function(spec) {
    spec.results().getItems().forEach(function(item) {
      if (!item.passed()) {
        console.warn('Expected these to match:');
        console.warn(juxtapose(item.expected, item.actual) + '\n');
      }
    });
  });
};

module.exports = JasmineReporter;
