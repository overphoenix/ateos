const {
  database: { level: { LevelUP, backend: { EncodingBackend } } }
} = ateos;

class CustomEncodingBackend extends EncodingBackend {
  constructor(db, opts) {
    super(db, opts);

    if (opts.valueEncoding.type === "mpak") {
      // Allow `null` and `undefined` values.
      this._checkValue = function (value) {
      };
    }
  }
}

export default (DB) => {
  // eslint-disable-next-line func-style
  function Level(location, options, callback) {
    if (ateos.isFunction(options)) {
      callback = options;
    }
    if (typeof options !== "object" || ateos.isNull(options)) {
      options = {};
    }

    return new LevelUP(new CustomEncodingBackend(new DB(location), options), options, callback);
  }

  ["destroy", "repair"].forEach((m) => {
    if (ateos.isFunction(DB[m])) {
      Level[m] = function (...args) {
        DB[m].apply(DB, args);
      };
    }
  });

  Level.errors = LevelUP.errors;

  return Level;
};
