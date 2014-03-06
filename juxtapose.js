var stringify = require('json-stable-stringify');

/**
 * @typedef {{
 *   separator: string=
 * }}
 */
var Options;

/**
 * Class responsible for doing the actual comparison. The main reason to use a
 * class for this is to have a place to store config options. Otherwise they'd
 * have to be passed to the juxtapose method, which doesn't work very well when
 * the method should also accept an arbitrary number of arguments.
 *
 * @constructor
 * @param {Options=} opt_options
 */
function Comparer(opt_options) {
  this.options = opt_options || {};
}

/**
 * Compares two values (typically either strings or objects) and puts them side
 * by side.
 *
 * @param {*} left
 * @param {*} right
 * @return {string}
 */
Comparer.prototype.compare = function compare(left, right) {
  var separator = splitSeparator(this.options.separator);

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
    output[i] = pad(leftLines[i] || '', leftWidth) +
      separator[i % separator.length] +
      (rightLines[i] || '');
  }

  return output.join('\n');
};

/**
 * Compares two or more values using {@link Comparer#compare}.
 *
 * @param {*} left
 * @param {*} right
 * @return {string}
 */
function juxtapose(left, right) {
  var comparer = new Comparer();

  var result = comparer.compare(left, right);
  for (var i = 2; i < arguments.length; ++i) {
    result = comparer.compare(result, arguments[i]);
  }

  return result;
}

/**
 * Produces a 'juxtapose' function based on a {@link Comparer} constructed with
 * the specified options.
 *
 * @param {Options} options
 * @return {function(*...):string}
 */
juxtapose.withOptions = function withOptions(options) {
  var comparer = new Comparer(options);

  return function juxtapose(left, right) {
    return comparer.compare(left, right);
  };
};

/**
 * Splits a separator into multiple, equal-width lines.
 *
 * @param {string} separator
 * @return {Array.<string>}
 */
function splitSeparator(separator) {
  separator || (separator = ' | ');

  separator = separator.split('\n');
  var width = getLongestLine(separator);

  separator = separator.map(function(line) {
    return pad(line, width);
  });

  return separator;
}

/**
 * Returns the length of the longest string in an array of strings.
 *
 * @private
 * @param {Array.<string>} lines
 * @return {number}
 *
 * @example
 * getLongestLine(['apple', 'banana']);
 * // => 'banana'.length
 *
 * @example
 * getLongestLine(['\x1B[32mapple\x1B[39m', 'banana']);
 * // => 'banana'.length
 */
function getLongestLine(lines) {
  return lines.reduce(function(maxLength, line) {
    return Math.max(maxLength, visibleLength(line));
  }, 0);
}

/**
 * Returns the visible length (excluding escape sequences) of a string.
 *
 * @private
 * @param {string} string
 * @return {number}
 *
 * @example
 * visibleLength('\x1B[32mfoo\x1B[39m'); // => 3
 */
function visibleLength(string) {
  return string.replace(/\x1B\[[\d;]+m/g, '').length;
}

/**
 * Pads a string to a desired width by appending whitespace.
 *
 * @private
 * @param {string} string
 * @param {number} width
 * @return {string}
 *
 * @example
 * pad('foo', 5); // => 'foo  '
 */
function pad(string, width) {
  var padding = width - visibleLength(string);
  return string + space(padding);
}

/**
 * Produces the desired amount of whitespace.
 *
 * @private
 * @param {number} width
 * @return {string}
 *
 * @example
 * space(3); // => '   '
 */
function space(width) {
  return Array(width + 1).join(' ');
}

juxtapose.VERSION = '0.1.1';

module.exports = juxtapose;
