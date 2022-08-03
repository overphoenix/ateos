export const EMPTY_BUFFER = Buffer.allocUnsafe(0);

const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const toString = objectProto.toString;
const funcToString = Function.prototype.toString;
const objectCtorString = funcToString.call(Object);
const symToStringTag = Symbol.toStringTag;

const PRIVATE_SYMBOL = Symbol();
const NAMESPACE_SYMBOL = Symbol();

export const getTag = (value: any): string => {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value);
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag);
  const tag = value[symToStringTag];
  let unmasked = false;
  try {
    value[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {
    //
  }

  const result = toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
};

// common predicators
export const isWindows = process.platform === "win32";
export const isArray = Array.isArray;
export const isFunction = (value: any): boolean => typeof value === "function";
export const isString = (value: any): boolean => typeof value === "string" || value instanceof String;
export const isNumber = (value: any): boolean => typeof value === "number";
export const isBuffer = (obj: any): boolean => obj != null && ((Boolean(obj.constructor) && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj)) || Boolean(obj._isBuffer));
export const isPlainObject = (value: any): boolean => {
  if (!(value != null && typeof value === "object") || getTag(value) !== "[object Object]") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
};

// Common stuff

export const asNamespace = (obj: any) => {
  obj[NAMESPACE_SYMBOL] = true;
  return obj;
};
asNamespace.SYMBOL = NAMESPACE_SYMBOL;

export const defaultMapper = (mod: any, key: string): any => (mod !== null && typeof mod === "object" && mod.__esModule === true && "default" in mod) ? mod.default : mod;

let lazifyErrorhandler: (a: any) => void = (err: Error) => {
  console.error(err);
  process.exit(1);
};

export const setLazifyErrorHandler = (handler: (a: Error) => void) => {
  lazifyErrorhandler = handler;
};

const requireSafe = (_require: (f: string) => any, value: string) => {
  try {
    return _require(value);
  } catch (err: any) {
    // console.log(require("util").inspect(err));
    if (err.code !== "MODULE_NOT_FOUND") {
      throw err;
    }
    lazifyErrorhandler(err);
  }
}; 

export const lazify = (modules: any, _obj: object | null, _require = require, {
  asNamespace: _asNamespace = false,
  configurable = false,
  enumerable = true,
  writable = true, // allow substitute namespaces by default
  mapper = defaultMapper
} = {}) => {
  const obj = _obj || {};
  Object.keys(modules).forEach((key) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable,
      get() {
        const value = modules[key];

        let modExports;
        const valueType = typeof value;
        if (valueType === "function") {
          modExports = value(key);
        } else if (valueType === "string") {
          modExports = requireSafe(_require, value);
        } else if (Array.isArray(value) && value.length >= 2 && typeof value[0] === "string") {
          modExports = requireSafe(_require, value[0]);

          const keepMapper = value[2] === true;

          if (!keepMapper) {
            const selector = value[1];
            const selectorType = typeof selector;
            if (selectorType !== "function" && selectorType !== "string") {
              throw new TypeError(`Invalid export selector type: ${selectorType}`);
            }
            const prevMapper = mapper;
            mapper = (mod, key: string) => {
              const mappedExports = prevMapper(mod, key);
              mapper = prevMapper; // restore
              return (selectorType === "function")
                ? selector(mappedExports)
                : mappedExports[selector];
            };
          }
        } else {
          throw new TypeError(`Invalid module type of ${key}`);
        }

        try {
          modExports = mapper(modExports, key);
        } catch (err) {
          lazifyErrorhandler(err);
        }

        Object.defineProperty(obj, key, {
          configurable,
          enumerable,
          writable,
          value: modExports
        });

        try {
          return _asNamespace
            ? asNamespace(modExports)
            : modExports;
        } catch (err) {
          return modExports;
        }
      }
    });
  });

  return obj;
};
lazify.mapper = defaultMapper;

export const lazifyp = (modules: Array<any>, obj: any, _require = require, options: any) => {
  if (isPlainObject(obj[PRIVATE_SYMBOL])) {
    return lazify(modules, obj[PRIVATE_SYMBOL], _require, options);
  }

  obj[PRIVATE_SYMBOL] = lazify(modules, null, _require, options);
  return obj[PRIVATE_SYMBOL];
};
lazifyp.SYMBOL = PRIVATE_SYMBOL;

export const definep = (modules: Array<any>, obj: any) => {
  if (isPlainObject(obj[PRIVATE_SYMBOL])) {
    Object.assign(obj[PRIVATE_SYMBOL], modules);
  } else {
    obj[PRIVATE_SYMBOL] = modules;
  }

  return obj;
};

export const getPrivate = (obj: any) => obj[PRIVATE_SYMBOL];

const null_ = Symbol.for("ateos:null");
const undefined_ = Symbol.for("ateos:undefined");

export {
  null_ as null,
  undefined_ as undefined
};

export const noop = () => { };
export const identity = (x: any) => x;
export const truly = () => true;
export const falsely = () => false;
export const o = (...props: Array<any>) => props.length > 0 ? Object.assign({}, ...props) : Object.create(null);


// TODO: add browser support
export const setTimeout = global.setTimeout;
export const clearTimeout = global.clearTimeout;
export const setInterval = global.setInterval;
export const clearInterval = global.clearInterval;
export const setImmediate = global.setImmediate;
export const clearImmediate = global.clearImmediate;


// common utils

export const unique = (array: Array<any>, projection: null | ((a: any) => void) = null) => {
  const tmp = new Set();
  const result = [];
  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    const hash = projection === null ? value : projection(value);
    if (tmp.has(hash)) {
      continue;
    }
    result.push(value);
    tmp.add(hash);
  }
  return result;
};
