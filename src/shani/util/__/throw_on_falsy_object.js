const {
  is,
  error,
  shani: { util: { __ } }
} = ateos;

export default function throwOnFalsyObject(object, property) {
  if (property && !object) {
    const type = ateos.isNull(object) ? "null" : "undefined";
    throw new error.IllegalStateException(`Trying to stub property '${__.util.valueToString(property)}' of ${type}`);
  }
}
