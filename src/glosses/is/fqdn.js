const { is } = ateos;

export default function isFQDN(str, options) {
  if (!ateos.isString(str)) {
    return false;
  }
  options = {
    requireTld: true,
    allowUnderscores: false,
    allowTrailingDot: false,
    ...options
  };

  /* Remove the optional trailing dot before checking validity */
  if (options.allowTrailingDot && str[str.length - 1] === ".") {
    str = str.substring(0, str.length - 1);
  }
  const parts = str.split(".");
  if (options.requireTld) {
    const tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allowUnderscores) {
      part = part.replace(/_/g, "");
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === "-" || part[part.length - 1] === "-") {
      return false;
    }
  }
  return true;
}
