require('should');

describe('object example', function() {
  it('uses juxtapose to compare objects', function() {
    ({ foo: 1, bar: 2 }).should.eql({ foo: 3, bar: 4 });
  });
});

describe('array example', function() {
  it('uses juxtapose to compare arrays', function() {
    [1, 2, 3].should.eql([1, 2]);
  });
});
