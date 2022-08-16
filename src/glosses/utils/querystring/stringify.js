const {
  is,
  util: {
    querystring: {
      formats,
      escape
    }
  }
} = ateos;

const arrayPrefixGenerators = {
  brackets: (prefix) => `${prefix}[]`,
  indices: (prefix, key) => `${prefix}[${key}]`,
  repeat: (prefix) => prefix
};

const toISO = Date.prototype.toISOString;

const defaults = {
  delimiter: "&",
  encode: true,
  encoder: escape,
  encodeValuesOnly: false,
  serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};

const _stringify = ( // eslint-disable-line func-name-matching
  object,
  prefix,
  generateArrayPrefix,
  strictNullHandling,
  skipNulls,
  encoder,
  filter,
  sort,
  allowDots,
  serializeDate,
  formatter,
  encodeValuesOnly
) => {
  let obj = object;
  if (ateos.isFunction(filter)) {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (ateos.isNull(obj)) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
    }

    obj = "";
  }

  if (ateos.isString(obj) || ateos.isNumber(obj) || ateos.isBoolean(obj) || ateos.isBuffer(obj)) {
    if (encoder) {
      const keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
      return [`${formatter(keyValue)}=${formatter(encoder(obj, defaults.encoder))}`];
    }
    return [`${formatter(prefix)}=${formatter(String(obj))}`];
  }

  let values = [];

  if (ateos.isUndefined(obj)) {
    return values;
  }

  let objKeys;
  if (ateos.isArray(filter)) {
    objKeys = filter;
  } else {
    const keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (let i = 0; i < objKeys.length; ++i) {
    const key = objKeys[i];

    if (skipNulls && ateos.isNull(obj[key])) {
      continue;
    }

    if (ateos.isArray(obj)) {
      values = values.concat(_stringify(
        obj[key],
        generateArrayPrefix(prefix, key),
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        formatter,
        encodeValuesOnly
      ));
    } else {
      values = values.concat(_stringify(
        obj[key],
        prefix + (allowDots ? `.${key}` : `[${key}]`),
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        formatter,
        encodeValuesOnly
      ));
    }
  }

  return values;
};

export default function stringify(object, opts) {
  let obj = object;
  const options = opts ? { ...opts } : {};

  if (!ateos.isNull(options.encoder) && !ateos.isUndefined(options.encoder) && !ateos.isFunction(options.encoder)) {
    throw new TypeError("Encoder has to be a function.");
  }

  const delimiter = ateos.isUndefined(options.delimiter) ? defaults.delimiter : options.delimiter;
  const strictNullHandling = ateos.isBoolean(options.strictNullHandling) ? options.strictNullHandling : defaults.strictNullHandling;
  const skipNulls = ateos.isBoolean(options.skipNulls) ? options.skipNulls : defaults.skipNulls;
  const encode = ateos.isBoolean(options.encode) ? options.encode : defaults.encode;
  const encoder = ateos.isFunction(options.encoder) ? options.encoder : defaults.encoder;
  const sort = ateos.isFunction(options.sort) ? options.sort : null;
  const allowDots = ateos.isUndefined(options.allowDots) ? false : options.allowDots;
  const serializeDate = ateos.isFunction(options.serializeDate) ? options.serializeDate : defaults.serializeDate;
  const encodeValuesOnly = ateos.isBoolean(options.encodeValuesOnly) ? options.encodeValuesOnly : defaults.encodeValuesOnly;
  if (ateos.isUndefined(options.format)) {
    options.format = formats.default;
  } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
    throw new TypeError("Unknown format option provided.");
  }
  const formatter = formats.formatters[options.format];
  let objKeys;
  let filter;

  if (ateos.isFunction(options.filter)) {
    filter = options.filter;
    obj = filter("", obj);
  } else if (ateos.isArray(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  let keys = [];

  if (!ateos.isObject(obj)) {
    return "";
  }

  let arrayFormat;
  if (options.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = options.arrayFormat;
  } else if ("indices" in options) {
    arrayFormat = options.indices ? "indices" : "repeat";
  } else {
    arrayFormat = "indices";
  }

  const generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (sort) {
    objKeys.sort(sort);
  }

  for (let i = 0; i < objKeys.length; ++i) {
    const key = objKeys[i];

    if (skipNulls && ateos.isNull(obj[key])) {
      continue;
    }

    keys = keys.concat(_stringify(
      obj[key],
      key,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encode ? encoder : null,
      filter,
      sort,
      allowDots,
      serializeDate,
      formatter,
      encodeValuesOnly
    ));
  }

  const joined = keys.join(delimiter);
  const prefix = options.addQueryPrefix === true ? "?" : "";

  return joined.length > 0 ? prefix + joined : "";
}
