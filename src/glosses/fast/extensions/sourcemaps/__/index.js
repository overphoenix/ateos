const { lazify } = ateos;

lazify({
  init: "./init",
  write: "./write",
  util: "./util"
}, exports, require);
