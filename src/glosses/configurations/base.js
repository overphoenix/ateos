const {
  is,
  lodash: { assign, merge, get, has, set, unset, keys, values, toPairs }
} = ateos;

export default class BaseConfig {
  constructor() {
    this.raw = {};
  }

  get(key) {
    this.#checkKey(key);
    return get(this.raw, key);
  }

  has(key) {
    this.#checkKey(key);
    return has(this.raw, key);
  }

  set(key, value) {
    this.#checkKey(key);
    return set(this.raw, key, value);
  }

  delete(key) {
    this.#checkKey(key);
    return unset(this.raw, key);
  }

  clear() {
    this.raw = {};
  }

  keys(key) {
    return keys(this.#getObject(key));
  }

  values(key) {
    return values(this.#getObject(key));
  }

  entries(key) {
    return toPairs(this.#getObject(key));
  }

  assign(...args) {
    if (args.length < 1) {
      return false;
    }

    let key;
    if (ateos.isString(args[0]) || ateos.isArray(args[0])) {
      key = args.shift();
    }
    const obj = this.#getObject(key);
    if (!ateos.isObject(obj)) {
      return this.set(key, assign(...args));
    }

    for (let i = args.length; --i >= 0;) {
      if (is.configuration(args[i])) {
        args[i] = args[i].raw;
      }
    }

    return assign(obj, ...args);
  }

  merge(...args) {
    if (args.length < 1) {
      return false;
    }

    let key;
    if (ateos.isString(args[0]) || ateos.isArray(args[0])) {
      key = args.shift();
    }
    const obj = this.#getObject(key);
    if (!ateos.isObject(obj)) {
      return this.set(key, assign(...args));
    }

    for (let i = args.length; --i >= 0;) {
      if (is.configuration(args[i])) {
        args[i] = args[i].raw;
      }
    }

    return merge(obj, ...args);
  }

  load(/*confPath*/) {
    throw new ateos.error.NotImplementedException("Method load() is not implemented");
  }

  save(/*confPath*/) {
    throw new ateos.error.NotImplementedException("Method save() is not implemented");
  }

  #getObject(key) {
    let obj;
    if ((ateos.isString(key) && key !== "") || ateos.isArray(key)) {
      obj = this.get(key);
    } else {
      obj = this.raw;
    }
    return obj;
  }

  #checkKey(key) {
    let parts;
    const type = ateos.typeOf(key);
    switch (type) {
      case "string":
        parts = key.split(".");
        break;
      case "Array":
        parts = key;
        break;
      default:
        throw new ateos.error.InvalidArgumentException(`Invalid type of key: ${ateos.typeOf(key)}`);
    }

    parts = parts.filter(ateos.identity);
    if (parts.length === 0) {
      throw new ateos.error.InvalidArgumentException("Invalid type of key");
    }
        
    return parts;
  }
}
