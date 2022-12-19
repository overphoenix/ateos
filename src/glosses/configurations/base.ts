
import ateos from "../..";
const {
  lodash: { assign, merge, get, has, set, unset, keys, values, toPairs }
} = ateos;

export default class BaseConfig {
  public raw: any = {};

  get(key: any) {
    this.checkKey_(key);
    return get(this.raw, key);
  }

  has(key: any) {
    this.checkKey_(key);
    return has(this.raw, key);
  }

  set(key: any, value: any) {
    this.checkKey_(key);
    return set(this.raw, key, value);
  }

  delete(key: any) {
    this.checkKey_(key);
    return unset(this.raw, key);
  }

  clear() {
    this.raw = {};
  }

  keys(key: any) {
    return keys(this.getObject_(key));
  }

  values(key: any) {
    return values(this.getObject_(key));
  }

  entries(key: any) {
    return toPairs(this.getObject_(key));
  }

  assign(...args: any[]) {
    if (args.length < 1) {
      return false;
    }

    let key;
    if (ateos.isString(args[0]) || ateos.isArray(args[0])) {
      key = args.shift();
    }
    const obj = this.getObject_(key);
    if (!ateos.isObject(obj)) {
      return this.set(key, assign(...args));
    }

    for (let i = args.length; --i >= 0;) {
      if (ateos.isConfiguration(args[i])) {
        args[i] = args[i].raw;
      }
    }

    return assign(obj, ...args);
  }

  merge(...args: any[]) {
    if (args.length < 1) {
      return false;
    }

    let key;
    if (ateos.isString(args[0]) || ateos.isArray(args[0])) {
      key = args.shift();
    }
    const obj = this.getObject_(key);
    if (!ateos.isObject(obj)) {
      return this.set(key, assign(...args));
    }

    for (let i = args.length; --i >= 0;) {
      if (ateos.isConfiguration(args[i])) {
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

  private getObject_(key: any) {
    let obj;
    if ((ateos.isString(key) && key !== "") || ateos.isArray(key)) {
      obj = this.get(key);
    } else {
      obj = this.raw;
    }
    return obj;
  }

  private checkKey_(key: any) {
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
