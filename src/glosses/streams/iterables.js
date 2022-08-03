const core = {
  ...require("streaming-iterables")
};

ateos.lazify({
  lengthPrefixed: "it-length-prefixed",
  pipe: "it-pipe",
  pushable: "it-pushable"
}, core, require);

export default ateos.asNamespace(core);
