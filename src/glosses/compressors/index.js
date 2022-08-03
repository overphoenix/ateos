ateos.lazify({
  gz: "./gzip",
  deflate: "./deflate",
  brotli: "./brotli",
  lzma: "./lzma",
  xz: "./xz",
  snappy: "snappy"
}, ateos.asNamespace(exports), require);
