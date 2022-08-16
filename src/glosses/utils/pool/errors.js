const { is } = ateos;

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (ateos.isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class TimeoutError extends ExtendableError {}
