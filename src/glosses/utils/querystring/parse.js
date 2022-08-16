const {
  is,
  util
} = ateos;

const {
  querystring: { unescape }
} = util;

const has = Object.prototype.hasOwnProperty;

const defaults = {
  allowDots: false,
  allowPrototypes: false,
  arrayLimit: 20,
  decoder: unescape,
  delimiter: "&",
  depth: 5,
  parameterLimit: 1000,
  plainObjects: false,
  strictNullHandling: false
};

const parseValues = (str, options) => {
  const obj = {};
  const cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  const limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  const parts = cleanStr.split(options.delimiter, limit);

  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];

    const bracketEqualsPos = part.indexOf("]=");
    const pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;

    let key;
    let val;
    if (pos === -1) {
      key = options.decoder(part, defaults.decoder);
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder);
      val = options.decoder(part.slice(pos + 1), defaults.decoder);
    }
    if (has.call(obj, key)) {
      obj[key] = [].concat(obj[key]).concat(val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
};

const parseObject = function (chain, val, options) {
  let leaf = val;

  for (let i = chain.length - 1; i >= 0; --i) {
    let obj;
    const root = chain[i];

    if (root === "[]") {
      obj = [];
      obj = obj.concat(leaf);
    } else {
      obj = options.plainObjects ? Object.create(null) : {};
      const cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      const index = parseInt(cleanRoot, 10);
      if (
        !ateos.isNan(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
      ) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }

    leaf = obj;
  }

  return leaf;
};

const parseKeys = (givenKey, val, options) => {
  if (!givenKey) {
    return;
  }

  // Transform dot notation to bracket notation
  const key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;

  // The regex chunks

  const brackets = /(\[[^[\]]*])/;
  const child = /(\[[^[\]]*])/g;

  // Get the parent

  let segment = brackets.exec(key);
  const parent = segment ? key.slice(0, segment.index) : key;

  // Stash the parent if it exists

  const keys = [];
  if (parent) {
    // If we aren't using plain objects, optionally prefix keys
    // that would overwrite object prototype properties
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(parent);
  }

  // Loop through children appending to the array until we hit depth

  let i = 0;
  while (!ateos.isNull(segment = child.exec(key)) && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(segment[1]);
  }

  // If there's a remainder, just add whatever is left

  if (segment) {
    keys.push(`[${key.slice(segment.index)}]`);
  }

  return parseObject(keys, val, options);
};

const compactQueue = function compactQueue(queue) {
  let obj;

  while (queue.length) {
    const item = queue.pop();
    obj = item.obj[item.prop];

    if (ateos.isArray(obj)) {
      const compacted = [];

      for (let j = 0; j < obj.length; ++j) {
        if (!ateos.isUndefined(obj[j])) {
          compacted.push(obj[j]);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }

  return obj;
};

const compact = function compact(value) {
  const queue = [{ obj: { o: value }, prop: "o" }];
  const refs = [];

  for (let i = 0; i < queue.length; ++i) {
    const item = queue[i];
    const obj = item.obj[item.prop];

    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; ++j) {
      const key = keys[j];
      const val = obj[key];
      if (ateos.isObject(val) && !refs.includes(val)) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }

  return compactQueue(queue);
};

export default function parse(str, opts) {
  const options = opts ? { ...opts } : {};

  if (!ateos.isNull(options.decoder) && !ateos.isUndefined(options.decoder) && !ateos.isFunction(options.decoder)) {
    throw new TypeError("Decoder has to be a function.");
  }

  options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
  options.delimiter = ateos.isString(options.delimiter) || ateos.isRegexp(options.delimiter) ? options.delimiter : defaults.delimiter;
  options.depth = ateos.isNumber(options.depth) ? options.depth : defaults.depth;
  options.arrayLimit = ateos.isNumber(options.arrayLimit) ? options.arrayLimit : defaults.arrayLimit;
  options.parseArrays = options.parseArrays !== false;
  options.decoder = ateos.isFunction(options.decoder) ? options.decoder : defaults.decoder;
  options.allowDots = ateos.isBoolean(options.allowDots) ? options.allowDots : defaults.allowDots;
  options.plainObjects = ateos.isBoolean(options.plainObjects) ? options.plainObjects : defaults.plainObjects;
  options.allowPrototypes = ateos.isBoolean(options.allowPrototypes) ? options.allowPrototypes : defaults.allowPrototypes;
  options.parameterLimit = ateos.isNumber(options.parameterLimit) ? options.parameterLimit : defaults.parameterLimit;
  options.strictNullHandling = ateos.isBoolean(options.strictNullHandling) ? options.strictNullHandling : defaults.strictNullHandling;

  if (str === "" || ateos.isNull(str) || ateos.isUndefined(str)) {
    return options.plainObjects ? Object.create(null) : {};
  }

  const tempObj = ateos.isString(str) ? parseValues(str, options) : str;
  let obj = options.plainObjects ? Object.create(null) : {};

  // Iterate over the keys and setup the new object

  const keys = Object.keys(tempObj);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const newObj = parseKeys(key, tempObj[key], options);
    obj = util.merge(obj, newObj, options);
  }

  return compact(obj);
}
