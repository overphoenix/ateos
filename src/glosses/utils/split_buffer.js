const {
  is
} = ateos;

const bufferIndexOf = function (buffer, search, offset, encoding) {
  if (!ateos.isBuffer(buffer)) {
    throw new ateos.error.InvalidArgumentException("'buffer' is not a Buffer");
  }

  // allow optional offset when providing an encoding
  if (ateos.isUndefined(encoding) && ateos.isString(offset)) {
    encoding = offset;
    offset = undefined;
  }

  if (ateos.isString(search)) {
    search = Buffer.from(search, encoding || "utf8");
  } else if (ateos.isNumber(search) && !isNaN(search)) {
    search = Buffer.from([search]);
  } else if (!ateos.isBuffer(search)) {
    throw new ateos.error.InvalidArgumentException("'search' is not a bufferable object");
  }

  if (search.length === 0) {
    return -1;
  }

  if (ateos.isUndefined(offset) || (ateos.isNumber(offset) && isNaN(offset))) {
    offset = 0;
  } else if (!ateos.isNumber(offset)) {
    throw new ateos.error.InvalidArgumentException("'offset' is not a number");
  }

  if (offset < 0) {
    offset = buffer.length + offset;
  }

  if (offset < 0) {
    offset = 0;
  }

  let m = 0;
  let s = -1;

  for (let i = offset; i < buffer.length; ++i) {
    if (buffer[i] !== search[m]) {
      s = -1;
      // <-- go back
      // match abc to aabc
      // 'aabc'
      // 'aab'
      //    ^ no match
      // a'abc'
      //   ^ set index here now and look at these again.
      //   'abc' yay!
      i -= m - 1;
      m = 0;
    }

    if (buffer[i] === search[m]) {
      if (s === -1) {
        s = i;
      }
      ++m;
      if (m === search.length) {
        break;
      }
    }
  }

  if (s > -1 && buffer.length - s < search.length) {
    return -1;
  }
  return s;
};

export default function (buf, splitBuf, includeDelim) {
  let search = -1;
  const lines = [];
  const move = includeDelim ? splitBuf.length : 0;

  if (ateos.isString(buf)) {
    buf = Buffer.from(buf);
  }

  while ((search = bufferIndexOf(buf, splitBuf)) > -1) {
    lines.push(buf.slice(0, search + move));
    buf = buf.slice(search + splitBuf.length, buf.length);
  }

  lines.push(buf);

  return lines;
}
