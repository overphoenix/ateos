/**
 * Base-N/Base-X encoding/decoding functions.
 *
 * Original implementation from base-x:
 * https://github.com/cryptocoinjs/base-x
 *
 * Which is MIT licensed:
 *
 * The MIT License (MIT)
 *
 * Copyright base-x contributors (c) 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const {
  is
} = ateos;

// baseN alphabet indexes
const _reverseAlphabets = {};

/**
 * BaseN-encodes a Uint8Array using the given alphabet.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the baseN-encoded output string.
 */
export const encode = function (input, alphabet, maxline) {
  if (!ateos.isString(alphabet)) {
    throw new TypeError('"alphabet" must be a string.');
  }
  if (!ateos.isUndefined(maxline) && !ateos.isNumber(maxline)) {
    throw new TypeError('"maxline" must be a number.');
  }

  let output = "";

  if (!(input instanceof Uint8Array)) {
    // assume forge byte buffer
    output = _encodeWithByteBuffer(input, alphabet);
  } else {
    let i = 0;
    const base = alphabet.length;
    const first = alphabet.charAt(0);
    const digits = [0];
    for (i = 0; i < input.length; ++i) {
      for (var j = 0, carry = input[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % base;
        carry = (carry / base) | 0;
      }

      while (carry > 0) {
        digits.push(carry % base);
        carry = (carry / base) | 0;
      }
    }

    // deal with leading zeros
    for (i = 0; input[i] === 0 && i < input.length - 1; ++i) {
      output += first;
    }
    // convert digits to a string
    for (i = digits.length - 1; i >= 0; --i) {
      output += alphabet[digits[i]];
    }
  }

  if (maxline) {
    const regex = new RegExp(`.{1,${maxline}}`, "g");
    output = output.match(regex).join("\r\n");
  }

  return output;
};

/**
 * Decodes a baseN-encoded (using the given alphabet) string to a
 * Uint8Array.
 *
 * @param input the baseN-encoded input string.
 *
 * @return the Uint8Array.
 */
export const decode = function (input, alphabet) {
  if (!ateos.isString(input)) {
    throw new TypeError('"input" must be a string.');
  }
  if (!ateos.isString(alphabet)) {
    throw new TypeError('"alphabet" must be a string.');
  }

  let table = _reverseAlphabets[alphabet];
  if (!table) {
    // compute reverse alphabet
    table = _reverseAlphabets[alphabet] = [];
    for (let i = 0; i < alphabet.length; ++i) {
      table[alphabet.charCodeAt(i)] = i;
    }
  }

  // remove whitespace characters
  input = input.replace(/\s/g, "");

  const base = alphabet.length;
  const first = alphabet.charAt(0);
  const bytes = [0];
  for (let i = 0; i < input.length; i++) {
    const value = table[input.charCodeAt(i)];
    if (ateos.isUndefined(value)) {
      return;
    }

    for (var j = 0, carry = value; j < bytes.length; ++j) {
      carry += bytes[j] * base;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }

    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  // deal with leading zeros
  for (let k = 0; input[k] === first && k < input.length - 1; ++k) {
    bytes.push(0);
  }

  if (!ateos.isUndefined(Buffer)) {
    return Buffer.from(bytes.reverse());
  }

  return new Uint8Array(bytes.reverse());
};

function _encodeWithByteBuffer(input, alphabet) {
  let i = 0;
  const base = alphabet.length;
  const first = alphabet.charAt(0);
  const digits = [0];
  for (i = 0; i < input.length(); ++i) {
    for (var j = 0, carry = input.at(i); j < digits.length; ++j) {
      carry += digits[j] << 8;
      digits[j] = carry % base;
      carry = (carry / base) | 0;
    }

    while (carry > 0) {
      digits.push(carry % base);
      carry = (carry / base) | 0;
    }
  }

  let output = "";

  // deal with leading zeros
  for (i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
    output += first;
  }
  // convert digits to a string
  for (i = digits.length - 1; i >= 0; --i) {
    output += alphabet[digits[i]];
  }

  return output;
}
