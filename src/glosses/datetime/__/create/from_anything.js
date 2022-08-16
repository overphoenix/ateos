const { is } = ateos;
const __ = ateos.getPrivate(ateos.datetime);

const configFromInput = (config) => {
  const input = config._i;
  if (ateos.isUndefined(input)) {
    config._d = new Date(__.util.hooks.now());
  } else if (ateos.isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (ateos.isString(input)) {
    __.create.configFromString(config);
  } else if (ateos.isArray(input)) {
    config._a = input.slice(0).map((obj) => {
      return parseInt(obj, 10);
    });
    __.create.configFromArray(config);
  } else if (ateos.isObject(input)) {
    __.create.configFromObject(config);
  } else if (ateos.isNumber(input)) {
    // from milliseconds
    config._d = new Date(input);
  } else {
    __.util.hooks.createFromInputFallback(config);
  }
};

export const prepareConfig = (config) => {
  config._locale = config._locale || __.locale.getLocale(config._l);

  const format = config._f;
  let input = config._i;

  if (ateos.isNull(input) || (ateos.isUndefined(format) && input === "")) {
    return __.create.createInvalid({ nullInput: true });
  }

  if (ateos.isString(input)) {
    config._i = input = config._locale.preparse(input);
  }

  if (is.datetime(input)) {
    return new __.datetime.Datetime(__.create.checkOverflow(input));
  } else if (ateos.isDate(input)) {
    config._d = input;
  } else if (ateos.isArray(format)) {
    __.create.configFromStringAndArray(config);
  } else if (format) {
    __.create.configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }

  if (!__.create.isValid(config)) {
    config._d = null;
  }

  return config;
};

const createFromConfig = (config) => {
  const res = new __.datetime.Datetime(__.create.checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    // Adding is smart enough around DST
    res.add(1, "d");
    res._nextDay = undefined;
  }

  return res;
};

export const createLocalOrUTC = (input, format, locale, strict, isUTC) => {
  const c = {};

  if (locale === true || locale === false) {
    strict = locale;
    locale = undefined;
  }

  if ((ateos.isArray(input) && input.length === 0) ||
            (ateos.isPlainObject(input) && ateos.isEmptyObject(input))) {
    input = undefined;
  }

  c._isAnExDateObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale;
  c._i = input;
  c._f = format;
  c._strict = strict;

  return createFromConfig(c);
};
