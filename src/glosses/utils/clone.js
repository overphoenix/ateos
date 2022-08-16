const {
  is,
  util
} = ateos;

class Cloner {
  clone(obj, {
    deep = true,
    nonPlainObjects = false,
    enumOnly = true
  } = {}) {
    if (!ateos.isObject(obj)) {
      return obj;
    }
    if (ateos.isArray(obj)) {
      if (deep) {
        return obj.map((x) => this.clone(x, { deep, nonPlainObjects, enumOnly }));
      }
      return obj.slice(0);
    }
    if (ateos.isFunction(obj)) {
      return obj;
    }
    if (ateos.isRegexp(obj)) {
      return new RegExp(obj.source, obj.flags);
    }
    if (ateos.isBuffer(obj)) {
      return Buffer.from(obj);
    }
    if (ateos.isDate(obj)) {
      return new Date(obj.getTime());
    }
    if (!nonPlainObjects && !ateos.isPlainObject(obj)) {
      return obj;
    }
    const res = {};
    for (const key of util.keys(obj, { enumOnly })) {
      res[key] = deep ? this.clone(obj[key], { deep, nonPlainObjects, enumOnly }) : obj[key];
    }
    return res;
  }

  binding() {
    return this.clone.bind(this);
  }
}

const clone = new Cloner().binding();
clone.Cloner = Cloner;

export default clone;
