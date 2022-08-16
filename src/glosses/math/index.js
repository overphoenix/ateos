const {
  is
} = ateos;

ateos.lazify({
  BigInteger: "./big_integer",
  BitSet: "./bitset",
  Decimal: "./decimal",
  Long: "long",
  simd: "./simd",
  matrix: "./matrix"
}, exports, require);

export const random = (min = 0, max = 0xFFFFFFFF) => {
  min >>>= 0;
  max >>>= 0;
  const b = ateos.std.crypto.randomBytes(4);
  const val = (b[0] | b[1] << 8 | b[2] << 16 | b[3] << 24) >>> 0;
  return min + (val % (max - min));
};

export const max = (array, func = ateos.identity) => {
  if (!array.length) {
    return undefined;
  }
  let maxScore = null;
  let maxElem = undefined;
  for (let i = 0; i < array.length; ++i) {
    const elem = array[i];
    if (ateos.isNull(maxScore)) {
      maxScore = func(elem);
      maxElem = elem;
      continue;
    }
    const score = func(elem);
    if (score > maxScore) {
      maxScore = score;
      maxElem = elem;
    }
  }
  return maxElem;
};

export const min = (array, func = ateos.identity) => {
  if (!array.length) {
    return undefined;
  }
  let minScore = null;
  let minElem = undefined;
  for (let i = 0; i < array.length; ++i) {
    const elem = array[i];
    if (ateos.isNull(minScore)) {
      minScore = func(elem);
      minElem = elem;
      continue;
    }
    const score = func(elem);
    if (score < minScore) {
      minScore = score;
      minElem = elem;
    }
  }
  return minElem;
};
