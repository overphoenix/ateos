ateos.lazify({
  Buffer: () => {
    return (ateos.is.nodejs) 
      ? ateos.std.buffer.Buffer
      : require("./buffer").Buffer;
  },
  SmartBuffer: "./smart_buffer"
}, ateos.asNamespace(exports), require);

