require('should')

juxtapose = require('../juxtapose')

describe 'juxtapose', ->
  it 'puts two blocks of text side by side', ->
    obj1 =
      foo: 1
      bar: 2
    obj2 =
      foo: 3
      bar: 4

    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "foo": 1, |   "foo": 3,
        "bar": 2  |   "bar": 4
      }           | }
      '''
    )
