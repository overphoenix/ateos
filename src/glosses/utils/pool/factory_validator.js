const { is } = ateos;

export default function (factory) {
  if (!ateos.isFunction(factory.create)) {
    throw new TypeError("factory.create must be a function");
  }

  if (!ateos.isFunction(factory.destroy)) {
    throw new TypeError("factory.destroy must be a function");
  }

  if (
    !ateos.isUndefined(factory.validate) &&
        !ateos.isFunction(factory.validate)
  ) {
    throw new TypeError("factory.validate must be a function");
  }
}
