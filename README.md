juxtapose
=========

This library does one thing: displays multi-line strings side by side.

This is handy for comparing blocks of text, or for showing two objects. (If you
pass two objects they'll automatically be stringified as JSON.)

```javascript
var juxtapose = require('juxtapose');

var obj1 = { foo: 1, bar: 2 };
var obj2 = { foo: 3, bar: 4 };

console.log(juxtapose(obj1, obj2));
```

Output:

    {           | {
      "foo": 1, |   "foo": 3,
      "bar": 2  |   "bar": 4
    }           | }

You can actually juxtapose as many items as you like:

```javascript
var obj3 = { foo: 5, bar: 6 };

console.log(juxtapose(obj1, obj2, obj3));
```

Output:

    {           | {           | {
      "foo": 1, |   "foo": 3, |   "foo": 5,
      "bar": 2  |   "bar": 4  |   "bar": 6
    }           | }           | }

You can also specify your own custom separator with `juxtapose.withOptions`:

```javascript
var compare = juxtapose.withOptions({ separator: ' * '});

console.log(compare('hello,\nworld!', 'goodbye\ncruel\nworld!'));
```

Output:

    hello, * goodbye,
    world! * cruel
           * world!

