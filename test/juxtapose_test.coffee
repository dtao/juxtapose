require('should')

juxtapose = require('../juxtapose')

describe 'juxtapose', ->
  obj1 = null
  obj2 = null

  beforeEach ->
    obj1 =
      abc: 1
      def: 2
    obj2 =
      abc: 3
      def: 4

  it 'puts two blocks of text side by side', ->
    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "abc": 1, |   "abc": 3,
        "def": 2  |   "def": 4
      }           | }
      '''
    )

  it 'supports a custom separator', ->
    juxtapose(obj1, obj2, '/* vs */').should.eql(
      '''
      {          /* vs */{
        "abc": 1,/* vs */  "abc": 3,
        "def": 2 /* vs */  "def": 4
      }          /* vs */}
      '''
    )

  it 'includes all lines when left side is longer', ->
    obj1.ghi = 10

    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "abc": 1, |   "abc": 3,
        "def": 2, |   "def": 4
        "ghi": 10 | }
      }           | 
      '''
    )

  it 'includes all lines when right side is longer', ->
    obj2.ghi = 10

    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "abc": 1, |   "abc": 3,
        "def": 2  |   "def": 4,
      }           |   "ghi": 10
                  | }
      '''
    )
