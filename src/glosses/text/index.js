const {
  is,
  text
} = ateos;

export const regexp = {
  array2alternatives: (array) => {
    const sorted = array.slice();

    // Sort descending by string length
    sorted.sort((a, b) => (b.length - a.length));

    // Then escape what should be
    for (let i = 0; i < sorted.length; ++i) {
      sorted[i] = text.escape.regExpPattern(sorted[i]);
    }

    return sorted.join("|");
  }
};

export const escapeStringRegexp = (str) => {
  if (!is.string(str)) {
    throw new TypeError("Expected a string");
  }

  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
};

// Transform camel case to alphanum separated by minus
export const camelCaseToDashed = (str) => {
  if (!str || !is.string(str)) {
    return "";
  }
  return str.replace(/^([A-Z])|([A-Z])/g, (match, firstLetter, letter) => {
    if (firstLetter) {
      return firstLetter.toLowerCase();
    }
    return `-${letter.toLowerCase()}`;
  });
};

export const endLineRegExp = /\r\n|\r|\n/;

// Returns array of separated lines with line endings
export const splitLines = (str) => {
  const lines = [];
  let match;
  let line;
  while ((match = endLineRegExp.exec(str))) {
    line = str.slice(0, match.index) + match[0];
    str = str.slice(line.length);
    lines.push(line);
  }
  lines.push(str);
  return lines;
};

export const regExpIndexOf = (str, regex, index) => {
  index = index || 0;
  const offset = str.slice(index).search(regex);
  return (offset >= 0) ? (index + offset) : offset;
};

export const regExpLastIndexOf = (str, regex, index) => {
  if (index === 0 || index) {
    str = str.slice(0, Math.max(0, index));
  }
  let i;
  let offset = -1;
  while ((i = str.search(regex)) !== -1) {
    offset += i + 1;
    str = str.slice(i + 1);
  }
  return offset;
};

export const stripAnsi = (str) => (is.string(str) ? str.replace(ateos.regex.ansi(), "") : str);
const testAnsiRE = new RegExp(ateos.regex.ansi().source);
export const hasAnsi = (str) => testAnsiRE.test(str);

/**
 * Return a random alphanumerical string of length len
 * There is a very small probability (less than 1/1,000,000) for the length to be less than len
 * (il the base64 conversion yields too many pluses and slashes) but
 * that"s not an issue here
 * The probability of a collision is extremely small (need 3*10^12 documents to have one chance in a million of a collision)
 * See http://en.wikipedia.org/wiki/Birthday_problem
 */
export const random = (len) => ateos.std.crypto.randomBytes(Math.ceil(Math.max(8, len * 2))).toString("base64").replace(/[+/]/g, "").slice(0, len);

export const detectNewline = (str) => {
  const newlines = (str.match(/(?:\r?\n)/g) || []);

  if (newlines.length === 0) {
    return null;
  }

  const crlf = newlines.filter((el) => el === "\r\n").length;

  const lf = newlines.length - crlf;

  return crlf > lf ? "\r\n" : "\n";
};

/**
 * Returns the Levenshtein distance between two strings
 *
 * @param {string} strA
 * @param {string} strB
 * @param {number[][]} [memo]
 * @return {number} distance between strA and strB
 * @api private
 */
export const stringDistance = (strA, strB, memo) => {
  if (!memo) {
    // `memo` is a two-dimensional array containing a cache of distances
    // memo[i][j] is the distance between strA.slice(0, i) and
    // strB.slice(0, j).
    memo = [];
    for (let i = 0; i <= strA.length; i++) {
      memo[i] = [];
    }
  }

  if (!memo[strA.length] || !memo[strA.length][strB.length]) {
    if (strA.length === 0 || strB.length === 0) {
      memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
    } else {
      const sliceA = strA.slice(0, -1);
      const sliceB = strB.slice(0, -1);
      memo[strA.length][strB.length] = Math.min(
        stringDistance(sliceA, strB, memo) + 1,
        stringDistance(strA, sliceB, memo) + 1,
        stringDistance(sliceA, sliceB, memo) +
                (strA.slice(-1) === strB.slice(-1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
};

/**
 * Return the Levenshtein distance between two strings, but no more than cap.
 *
 * @param {string} strA
 * @param {string} strB
 * @param {number} number
 * @return {number} min(string distance between strA and strB, cap)
 * @api private
 */
export const stringDistanceCapped = (strA, strB, cap) => {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }

  const memo = [];
  // `memo` is a two-dimensional array containing distances.
  // memo[i][j] is the distance between strA.slice(0, i) and
  // strB.slice(0, j).
  for (let i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (let j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }

  for (let i = 1; i <= strA.length; i++) {
    const ch = strA.charCodeAt(i - 1);
    for (let j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] +
                (ch === strB.charCodeAt(j - 1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
};

export const capitalize = (str) => (str === "") ? str : `${str[0].toUpperCase()}${str.slice(1)}`;
export const capitalizeWords = (str) => str.replace(/(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g, (word) => word.toUpperCase());

export const indent = (string, spaces) => {
  const ind = " ".repeat(spaces);
  const { length } = string;
  let result = "";

  for (let position = 0; position < length;) {
    const next = string.indexOf("\n", position);
    let line;
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== "\n") {
      result += ind;
    }

    result += line;
  }

  return result;
};

export const stripLastNewline = (x) => {
  const lf = is.string(x) ? "\n" : "\n".charCodeAt();
  const cr = is.string(x) ? "\r" : "\r".charCodeAt();

  if (x[x.length - 1] === lf) {
    x = x.slice(0, x.length - 1);
  }

  if (x[x.length - 1] === cr) {
    x = x.slice(0, x.length - 1);
  }

  return x;
};

export const stripBom = (content) => {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (is.buffer(content)) {
    content = content.toString("utf8");
  }
  content = content.replace(/^\uFEFF/, "");
  return content;
};

export const toUTF8Array = (str) => {
  let char;
  let i = 0;
  const utf8 = [];
  const len = str.length;

  while (i < len) {
    char = str.charCodeAt(i++);
    if (char < 0x80) {
      utf8.push(char);
    } else if (char < 0x800) {
      utf8.push(
        0xc0 | (char >> 6),
        0x80 | (char & 0x3f)
      );
    } else if (char < 0xd800 || char >= 0xe000) {
      utf8.push(
        0xe0 | (char >> 12),
        0x80 | ((char >> 6) & 0x3f),
        0x80 | (char & 0x3f)
      );
    } else { // surrogate pair
      i++;
      char = 0x10000 + (((char & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (char >> 18),
        0x80 | ((char >> 12) & 0x3f),
        0x80 | ((char >> 6) & 0x3f),
        0x80 | (char & 0x3f)
      );
    }
  }

  return utf8;
};

ateos.lazify({
  escape: "./escape",
  unicode: "./unicode",
  spinner: "./spinners",
  table: "./table",
  Fuzzy: "./fuzzy",
  charcode: "./charcodes",
  locateCharacter: "locate-character",
  longestCommonPrefix: "./longest_common_prefix",
  sliceAnsi: "./slice_ansi",
  wrapAnsi: "./wrap_ansi",
  truncate: "./truncate",
  toCamelCase: "./to_camel_case",
  sprintf: "./sprintf",
  MagicString: "magic-string",
  width: "./width"
}, ateos.asNamespace(exports), require);
