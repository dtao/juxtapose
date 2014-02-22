require('should')

juxtapose = require('../juxtapose')

describe 'juxtapose', ->
  obj1 = null
  obj2 = null

  beforeEach ->
    obj1 =
      foo: 1
      bar: 2
    obj2 =
      foo: 3
      bar: 4

  it 'puts two blocks of text side by side', ->
    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "foo": 1, |   "foo": 3,
        "bar": 2  |   "bar": 4
      }           | }
      '''
    )

  it 'supports a custom separator', ->
    juxtapose(obj1, obj2, '/* vs */').should.eql(
      '''
      {          /* vs */{
        "foo": 1,/* vs */  "foo": 3,
        "bar": 2 /* vs */  "bar": 4
      }          /* vs */}
      '''
    )

  it 'includes all lines when left side is longer', ->
    obj1.baz = 10

    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "foo": 1, |   "foo": 3,
        "bar": 2, |   "bar": 4
        "baz": 10 | }
      }           | 
      '''
    )
