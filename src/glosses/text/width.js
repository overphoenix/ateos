const {
  is,
  regex,
  text: { stripAnsi, unicode: { isFullWidthCodePoint } }
} = ateos;

export default (str) => {
  if (!ateos.isString(str) || str.length === 0) {
    return 0;
  }

  str = stripAnsi(str);
  if (str.length === 0) {
    return 0;
  }

  str = str.replace(regex.emoji(), "  ");

  let width = 0;

  for (let index = 0; index < str.length; index++) {
    const codePoint = str.codePointAt(index);

    // Ignore control characters
    if (codePoint <= 0x1F || (codePoint >= 0x7F && codePoint <= 0x9F)) {
      continue;
    }

    // Ignore combining characters
    if (codePoint >= 0x300 && codePoint <= 0x36F) {
      continue;
    }

    // Surrogates
    if (codePoint > 0xFFFF) {
      index++;
    }

    width += isFullWidthCodePoint(codePoint) ? 2 : 1;
  }

  return width;
};
