const { is, shani: { util: { __ } } } = ateos;

const restorable = Symbol.for("shani:restorable");

const isRestorable = (obj) => ateos.isFunction(obj) && ateos.isFunction(obj.restore) && obj.restore[restorable];

export default function restore(object) {
  if (!ateos.isNull(object) && ateos.isPlainObject(object)) {
    __.util.walk(object, (prop) => {
      if (isRestorable(object[prop])) {
        object[prop].restore();
      }
    });
  } else if (isRestorable(object)) {
    object.restore();
  }
}
