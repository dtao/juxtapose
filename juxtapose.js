function juxtapose(left, right, separator) {
  if (typeof left !== 'string') {
    left = JSON.stringify(left, null, 2);
  }
  if (typeof right !== 'string') {
    right = JSON.stringify(right, null, 2);
  }

  var leftLines  = left.split('\n'),
      rightLines = right.split('\n'),
      leftWidth  = getLongestLine(leftLines);

  var output = Array(Math.max(leftLines.length, rightLines.length));
  for (var i = 0; i < output.length; ++i) {
    output[i] = pad(leftLines[i] || '', leftWidth) + separator + rightLines[i] || '';
  }

  return output.join('\n')
}

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
