import Any from "../any";

const {
  is
} = ateos;

class Lazy extends Any {
  constructor() {

    super();
    this._type = "lazy";
  }

  _base(value, state, options) {

    const result = { value };
    const lazy = this._flags.lazy;

    if (!lazy) {
      result.errors = this.createError("lazy.base", null, state, options);
      return result;
    }

    const schema = lazy();

    if (!(schema instanceof Any)) {
      result.errors = this.createError("lazy.schema", null, state, options);
      return result;
    }

    return schema._validate(value, state, options);
  }

  set(fn) {
    ateos.assert(is.function(fn), "You must provide a function as first argument");

    const obj = this.clone();
    obj._flags.lazy = fn;
    return obj;
  }

}

export default new Lazy();
