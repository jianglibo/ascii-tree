/**
 * @namespace Char
 */
module.exports = Char;

function Char() {}

function numbers() {
  var n = [];
  for (var i = 48; i < 58; i++) {
    n.push(i);
  }
  return n;
}

function whitespace() {
  return [0x20, 0x0A, 0x0D, 0x09];
}

function lowAlphas() {
  var a = [];
  for (var i = 97; i < 123; i++) {
    a.push(i);
  }
  return a;
}

function upAlphas() {
  var a = [];
  for (var i = 65; i < 91; i++) {
    a.push(i);
  }
  return a;
}


/**
 * @function isAlphaNumeric
 * @memberof Char
 * @static
 * @param {string|Number} c - char or chatCode.
 * @return {Boolean}
 */
Char.isAlphaNumeric = function(c) {
  var code;
  if (c) {
    if ((typeof c) === 'string') {
      code = c.charCodeAt(0);
    } else if ((typeof c) === 'number') {
      code = c;
    } else {
      return false;
    }
  } else {
    return false;
  }
  return Char.alphanumerics.indexOf(code) !== -1;
};

Char.isWhiteSpace = function(code) {
  return Char.whitespaces.indexOf(code) !== -1;
};

Char.whitespaces = whitespace();

Char.alphanumerics = (function() {
  return numbers().concat(lowAlphas(), upAlphas());
})();

Char.numerics = (function() {
  return numbers();
})();

Char.alphas = (function() {
  return lowAlphas().concat(upAlphas());
})();

Char.lowAlphas = (function() {
  return lowAlphas();
})();

Char.upAlphas = (function() {
  return upAlphas();
})();
