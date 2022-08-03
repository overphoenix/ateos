import Any from "../any";
import { flatten } from "../../utils";
const Cast = require("../../cast");
import { isRef, push as pushRef } from "../../ref";

const {
  assert
} = ateos;

const internals = {};


internals.Alternatives = class extends Any {

  constructor() {

    super();
    this._type = "alternatives";
    this._invalids.remove(null);
    this._inner.matches = [];
  }

  _init(...args) {
    return args.length ? this.try(...args) : this;
  }

  _base(value, state, options) {

    let errors = [];
    const il = this._inner.matches.length;
    const baseType = this._baseType;

    for (let i = 0; i < il; ++i) {
      const item = this._inner.matches[i];
      if (!item.schema) {
        const schema = item.peek || item.is;
        const input = item.is ? item.ref(state.reference || state.parent, options) : value;
        const failed = schema._validate(input, null, options, state.parent).errors;

        if (failed) {
          if (item.otherwise) {
            return item.otherwise._validate(value, state, options);
          }
        } else if (item.then) {
          return item.then._validate(value, state, options);
        }

        if (i === (il - 1) && baseType) {
          return baseType._validate(value, state, options);
        }

        continue;
      }

      const result = item.schema._validate(value, state, options);
      if (!result.errors) { // Found a valid match
        return result;
      }

      errors = errors.concat(result.errors);
    }

    if (errors.length) {
      return { errors: this.createError("alternatives.child", { reason: errors }, state, options) };
    }

    return { errors: this.createError("alternatives.base", null, state, options) };
  }

  try(...schemas) {

    schemas = flatten(schemas);
    assert(schemas.length, "Cannot add other alternatives without at least one schema");

    const obj = this.clone();

    for (let i = 0; i < schemas.length; ++i) {
      const cast = Cast.schema(this._currentModel, schemas[i]);
      if (cast._refs.length) {
        obj._refs = obj._refs.concat(cast._refs);
      }
      obj._inner.matches.push({ schema: cast });
    }

    return obj;
  }

  when(condition, options) {

    let schemaCondition = false;
    assert(isRef(condition) || is.string(condition) || (schemaCondition = condition instanceof Any), `Invalid condition: ${condition}`);
    assert(options, "Missing options");
    assert(typeof options === "object", "Invalid options");
    if (schemaCondition) {
      assert(!options.hasOwnProperty("is"), '"is" can not be used with a schema condition');
    } else {
      assert(options.hasOwnProperty("is"), 'Missing "is" directive');
    }
    assert(!is.undefined(options.then) || !is.undefined(options.otherwise), 'options must have at least one of "then" or "otherwise"');

    const obj = this.clone();
    let is;
    if (!schemaCondition) {
      is = Cast.schema(this._currentModel, options.is);

      if (options.is === null || !(isRef(options.is) || options.is instanceof Any)) {

        // Only apply required if this wasn't already a schema or a ref, we'll suppose people know what they're doing
        is = is.required();
      }
    }

    const item = {
      ref: schemaCondition ? null : Cast.ref(condition),
      peek: schemaCondition ? condition : null,
      is,
      then: !is.undefined(options.then) ? Cast.schema(this._currentModel, options.then) : undefined,
      otherwise: !is.undefined(options.otherwise) ? Cast.schema(this._currentModel, options.otherwise) : undefined
    };

    if (obj._baseType) {

      item.then = item.then && obj._baseType.concat(item.then);
      item.otherwise = item.otherwise && obj._baseType.concat(item.otherwise);
    }

    if (!schemaCondition) {
      pushRef(obj._refs, item.ref);
      obj._refs = obj._refs.concat(item.is._refs);
    }

    if (item.then && item.then._refs) {
      obj._refs = obj._refs.concat(item.then._refs);
    }

    if (item.otherwise && item.otherwise._refs) {
      obj._refs = obj._refs.concat(item.otherwise._refs);
    }

    obj._inner.matches.push(item);

    return obj;
  }

  describe() {

    const description = Any.prototype.describe.call(this);
    const alternatives = [];
    for (let i = 0; i < this._inner.matches.length; ++i) {
      const item = this._inner.matches[i];
      if (item.schema) {

        // try()

        alternatives.push(item.schema.describe());
      } else {

        // when()

        const when = item.is ? {
          ref: item.ref.toString(),
          is: item.is.describe()
        } : {
          peek: item.peek.describe()
        };

        if (item.then) {
          when.then = item.then.describe();
        }

        if (item.otherwise) {
          when.otherwise = item.otherwise.describe();
        }

        alternatives.push(when);
      }
    }

    description.alternatives = alternatives;
    return description;
  }

};

module.exports = new internals.Alternatives();
