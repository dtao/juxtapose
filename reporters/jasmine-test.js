var env = require('jasmine-node').getEnv(),
    JasmineReporter = require('./jasmine');

env.addReporter(new JasmineReporter());

describe('object example', function() {
  it('uses juxtapose to compare objects', function() {
    expect({ foo: 1, bar: 2 }).toEqual({ foo: 3, bar: 4 });
  });
});

describe('array example', function() {
  it('uses juxtapose to compare arrays', function() {
    expect([1, 2, 3]).toEqual([1, 2]);
  });
});

env.execute();
