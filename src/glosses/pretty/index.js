ateos.lazify({
  // error: "./error",
  error: () => (err) => console.error(err.stack),
  json: "./json",
  size: "./size",
  table: "./table",
  ms: "./ms",
  time: "./time",
  timeZone: "./time_zone"
}, exports, require);
