const {
  is,
  std: { stream: { Writable } }
} = ateos;

const isArrayish = (arr) => /Array\]$/.test(Object.prototype.toString.call(arr));
const isBufferish = (p) => ateos.isString(p) || isArrayish(p) || (p && ateos.isFunction(p.subarray));

const stringConcat = function (parts) {
  let strings = [];

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (ateos.isString(p)) {
      strings.push(p);
    } else if (ateos.isBuffer(p)) {
      strings.push(p);
    } else if (isBufferish(p)) {
      strings.push(Buffer.from(p));
    } else {
      strings.push(Buffer.from(String(p)));
    }
  }
  if (ateos.isBuffer(parts[0])) {
    strings = Buffer.concat(strings);
    strings = strings.toString("utf8");
  } else {
    strings = strings.join("");
  }
  return strings;
};

const bufferConcat = function (parts) {
  const bufs = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (ateos.isBuffer(p)) {
      bufs.push(p);
    } else if (isBufferish(p)) {
      bufs.push(Buffer.from(p));
    } else {
      bufs.push(Buffer.from(String(p)));
    }
  }
  return Buffer.concat(bufs);
};

const arrayConcat = function (parts) {
  const res = [];
  for (let i = 0; i < parts.length; i++) {
    res.push.apply(res, parts[i]);
  }
  return res;
};

const u8Concat = function (parts) {
  let len = 0;
  for (let i = 0; i < parts.length; i++) {
    if (ateos.isString(parts[i])) {
      parts[i] = Buffer.from(parts[i]);
    }
    len += parts[i].length;
  }
  const u8 = new Uint8Array(len);
  for (let i = 0, offset = 0; i < parts.length; i++) {
    const part = parts[i];
    for (let j = 0; j < part.length; j++) {
      u8[offset++] = part[j];
    }
  }
  return u8;
};

export class Stream extends Writable {
  constructor(opts, cb) {
    if (ateos.isFunction(opts)) {
      cb = opts;
      opts = {};
    } else if (ateos.isString(opts)) {
      opts = {
        encoding: opts
      };
    } else if (!opts) {
      opts = {};
    }

    let encoding = opts.encoding;
    let shouldInferEncoding = false;

    if (!encoding) {
      shouldInferEncoding = true;
    } else {
      encoding = String(encoding).toLowerCase();
      if (encoding === "u8" || encoding === "uint8") {
        encoding = "uint8array";
      }
    }

    super({ objectMode: true });

    this.encoding = encoding;
    this.shouldInferEncoding = shouldInferEncoding;

    if (cb) {
      this.on("finish", function () {
        cb(this.getBody());
      });
    } else {
      this.promise = new Promise((resolve, reject) => {
        this
          .once("finish", () => resolve(this.getBody()))
          .once("error", (err) => reject(err));
      });
    }
    this.body = [];
  }

  _write(chunk, enc, next) {
    this.body.push(chunk);
    next();
  }

  inferEncoding(buff) {
    const firstBuffer = ateos.isUndefined(buff) ? this.body[0] : buff;
    if (ateos.isBuffer(firstBuffer)) {
      return "buffer";
    }
    if (!ateos.isUndefined(Uint8Array) && firstBuffer instanceof Uint8Array) {
      return "uint8array";
    }
    if (ateos.isArray(firstBuffer)) {
      return "array";
    }
    if (ateos.isString(firstBuffer)) {
      return "string";
    }
    if (Object.prototype.toString.call(firstBuffer) === "[object Object]") {
      return "object";
    }
    return "buffer";
  }

  getBody() {
    if (!this.encoding && this.body.length === 0) {
      return [];
    }
    if (this.shouldInferEncoding) {
      this.encoding = this.inferEncoding();
    }
    if (this.encoding === "array") {
      return arrayConcat(this.body);
    }
    if (this.encoding === "string") {
      return stringConcat(this.body);
    }
    if (this.encoding === "buffer") {
      return bufferConcat(this.body);
    }
    if (this.encoding === "uint8array") {
      return u8Concat(this.body);
    }
    return this.body;
  }

  then(resolve, reject) {
    return this.promise.then(resolve, reject);
  }

  catch(reject) {
    return this.promise.catch(reject);
  }
}

export const create = (opts, cb) => new Stream(opts, cb);
