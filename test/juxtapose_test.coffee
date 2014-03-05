require('should')

juxtapose = require('../juxtapose')

describe 'juxtapose', ->
  txt1 = null
  txt2 = null
  obj1 = null
  obj2 = null

  beforeEach ->
    txt1 =
      '''
      hello,
      world!
      '''

    txt2 =
      '''
      goodbye,
      world!
      '''

    obj1 =
      abc: 1
      def: 2

    obj2 =
      abc: 3
      def: 4

  it 'puts two blocks of text side by side', ->
    juxtapose(txt1, txt2).should.eql(
      '''
      hello, | goodbye,
      world! | world!
      '''
    )

  it 'can compare two objects', ->
    juxtapose(obj1, obj2).should.eql(
      '''
      {           | {
        "abc": 1, |   "abc": 3,
        "def": 2  |   "def": 4
      }           | }
      '''
    )

  it 'supports a custom separator', ->
    compare = juxtapose.withOptions({ separator: ' * <---> * ' })
    compare(obj1, obj2).should.eql(
      '''
      {           * <---> * {
        "abc": 1, * <---> *   "abc": 3,
        "def": 2  * <---> *   "def": 4
      }           * <---> * }
      '''
    )

  it 'allows the custom separator to be multiple lines', ->
    compare = juxtapose.withOptions({ separator: ' + \n - ' })
    compare(obj1, obj2).should.eql(
      '''
      {           + {
        "abc": 1, -   "abc": 3,
        "def": 2  +   "def": 4
      }           - }
      '''
    )

  # This isn't really a unit test, just a demonstration of how this is easy.
  it 'allows a non-repeated separator by inserting a string as an argument', ->
    juxtapose(obj1, 'vs.', obj2).should.eql(
      '''
      {           | vs. | {
        "abc": 1, |     |   "abc": 3,
        "def": 2  |     |   "def": 4
      }           |     | }
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

  it 'works for three blocks of text', ->
    obj3 =
      abc: 5
      def: 6

    juxtapose(obj1, obj2, obj3).should.eql(
      '''
      {           | {           | {
        "abc": 1, |   "abc": 3, |   "abc": 5,
        "def": 2  |   "def": 4  |   "def": 6
      }           | }           | }
      '''
    )
