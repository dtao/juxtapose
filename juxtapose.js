var stringify = require('json-stable-stringify');

function Comparer(options) {
  this.options = options || {};
}

Comparer.prototype.compare = function compare(left, right) {
  var separator = this.options.separator || ' | ';

  if (typeof left !== 'string') {
    left = stringify(left, { space: 2 });
  }
  if (typeof right !== 'string') {
    right = stringify(right, { space: 2 });
  }

  var leftLines  = left.split('\n'),
      rightLines = right.split('\n'),
      leftWidth  = getLongestLine(leftLines);

  var output = Array(Math.max(leftLines.length, rightLines.length));
  for (var i = 0; i < output.length; ++i) {
    output[i] = pad(leftLines[i] || '', leftWidth) + separator + (rightLines[i] || '');
  }

  return output.join('\n')
};

function juxtapose(left, right) {
  var comparer = new Comparer();

  var result = comparer.compare(left, right);
  for (var i = 2; i < arguments.length; ++i) {
    result = comparer.compare(result, arguments[i]);
  }

  return result;
}

juxtapose.withOptions = function withOptions(options) {
  var comparer = new Comparer(options);

  return function juxtapose(left, right) {
    return comparer.compare(left, right);
  };
};

function getLongestLine(lines) {
  return lines.reduce(function(maxLength, line) {
    return Math.max(maxLength, line.length);
  }, 0);
}

function pad(string, width) {
  var padding = width - string.length;
  return string + space(padding);
}

function space(width) {
  return Array(width + 1).join(' ');
}

module.exports = juxtapose;
