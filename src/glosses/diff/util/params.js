
export const generateOptions = (options, defaults) => {
  if (ateos.ateos.isFunction(options)) {
    defaults.callback = options;
  } else if (options) {
    for (const name in options) {
      /* istanbul ignore else */
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }
  return defaults;
};
