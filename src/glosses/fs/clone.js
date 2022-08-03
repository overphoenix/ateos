export default (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let copy;
  if (obj instanceof Object) {
    copy = { __proto__: Object.getPrototypeOf(obj) };
  } else {
    copy = Object.create(null);
  }

  Object.getOwnPropertyNames(obj).forEach((key) => {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });

  return copy;
};
