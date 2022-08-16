const { is } = ateos;

const NEWLINER_SYMBOL = Symbol();
const NEWLINE = "\n".charCodeAt(0);
const counters = new Map();

const processByte = (stream, byte) => {
  if (!ateos.isNumber(byte)) {
    throw new ateos.error.NotValidException("Invalid byte data for stream");
  }

  if (byte === NEWLINE) {
    stream.emit("newline");
    return true;
  }
};

export const install = (stream) => {
  if (stream[NEWLINER_SYMBOL] === true) {
    return;
  }

  const write = stream.write;
  let prototypedWrite = true;
  if (ateos.isPropertyOwned(stream, "write")) {
    prototypedWrite = false;
  }
  counters.set(stream, {
    prototypedWrite,
    write
  });

  Object.defineProperty(stream, "write", {
    configurable: true,
    value: (chunk, encoding, callback) => {
      let counter = 0;

      if (stream.listeners("newline").length > 0 || stream.listeners("newlines:before").length > 0 || stream.listeners("newlines:after").length > 0) {
        let i = 0;
        const l = chunk.length;

        if (ateos.isString(chunk)) {
          for (; i < l; i++) {
            if (processByte(stream, chunk.charCodeAt(i))) {
              counter++;
            }
          }
        } else {
          for (; i < l; i++) {
            if (processByte(stream, chunk[i])) {
              counter++;
            }
          }
        }
      }

      if (counter) {
        stream.emit("newlines:before", counter);
      }

      const result = write.call(stream, chunk, encoding, callback);

      if (counter) {
        stream.emit("newlines:after", counter);
      }

      return result;
    }
  });

  stream[NEWLINER_SYMBOL] = true;
};

export const uninstall = (stream) => {
  if (stream[NEWLINER_SYMBOL] === true) {
    const streamData = counters.get(stream);
    if (ateos.isUndefined(streamData)) {
      throw new ateos.error.NotFoundException("New line counter is not found for stream");
    }

    if (streamData.prototypedWrite) {
      delete stream.write;
    } else {
      Object.defineProperty(stream, "write", {
        configurable: true,
        value: streamData.write
      });
    }
    counters.delete(stream);
    stream[NEWLINER_SYMBOL] = undefined;
  }
};
