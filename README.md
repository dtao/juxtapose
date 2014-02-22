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

// Output:
// {           | {
//   "foo": 1, |   "foo": 3,
//   "bar": 2  |   "bar": 4
// }           | }
```
