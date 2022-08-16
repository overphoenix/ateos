const { data: { yaml }, is } = ateos;

const isHexCode = (c) => {
  return (c/* 0 */ >= 0x30 && c <= 0x39/* 9 */) ||
        (c/* A */ >= 0x41 && c <= 0x46/* F */) ||
        (c/* a */ >= 0x61 && c <= 0x66/* f */);
};

const isOctCode = (c) => c/* 0 */ >= 0x30 && c <= 0x37/* 7 */;

const isDecCode = (c) => c/* 0 */ >= 0x30 && c <= 0x39/* 9 */;

const resolveYamlInteger = (data) => {
  if (ateos.isNull(data)) {
    return false;
  }

  const max = data.length;
  let index = 0;
  let hasDigits = false;
  let ch;

  if (!max) {
    return false;
  }

  ch = data[index];

  // sign
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }

  if (ch === "0") {
    // 0
    if (index + 1 === max) {
      return true;
    }
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === "b") {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") {
          continue;
        }
        if (ch !== "0" && ch !== "1") {
          return false;
        }
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }


    if (ch === "x") {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") {
          continue;
        }
        if (!isHexCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }

    // base 8
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_") {
        continue;
      }
      if (!isOctCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    return hasDigits && ch !== "_";
  }

  // base 10 (except 0) or base 60

  // value should not start with `_`;
  if (ch === "_") {
    return false;
  }

  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") {
      continue;
    }
    if (ch === ":") {
      break;
    }
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === "_") {
    return false;
  }

  // if !base60 - done;
  if (ch !== ":") {
    return true;
  }

  // base60 almost not used, no needs to optimize
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
};

const constructYamlInteger = (value) => {

  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }

  let ch = value[0];

  let sign = 1;
  if (ch === "-" || ch === "+") {
    if (ch === "-") {
      sign = -1;
    }
    value = value.slice(1);
    ch = value[0];
  }

  if (value === "0") {
    return 0;
  }

  if (ch === "0") {
    if (value[1] === "b") {
      return sign * parseInt(value.slice(2), 2);
    }
    if (value[1] === "x") {
      return sign * parseInt(value, 16);
    }
    return sign * parseInt(value, 8);
  }

  if (value.includes(":")) {
    const digits = [];

    for (const v of value.split(":")) {
      digits.unshift(parseInt(v, 10));
    }

    let res = 0;
    let base = 1;

    for (const d of digits) {
      res += d * base;
      base *= 60;
    }

    return sign * res;

  }

  return sign * parseInt(value, 10);
};

export default new yaml.type.Type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: (object) => ateos.isInteger(object) && !is.negativeZero(object),
  represent: {
    binary: (obj) => obj >= 0 ? `0b${obj.toString(2)}` : `-0b${obj.toString(2).slice(1)}`,
    octal: (obj) => obj >= 0 ? `0${obj.toString(8)}` : `-0${obj.toString(8).slice(1)}`,
    decimal: (obj) => obj.toString(10),
    hexadecimal: (obj) => obj >= 0 ? `0x${obj.toString(16).toUpperCase()}` : `-0x${obj.toString(16).toUpperCase().slice(1)}`
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
