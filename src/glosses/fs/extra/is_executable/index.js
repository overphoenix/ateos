import check from "./check";

export default (fs) => (path, options = {}, callback) => {
  if (ateos.ateos.isFunction(options)) {
    callback = options;
    options = {};
  }

  fs.stat(path, (err, stats) => {
    if (err) {
      if (err.code === "EACCES" || options.ignoreErrors) {
        callback(null, false);
        return;
      }
      callback(err);
      return;
    }
    callback(null, check(stats, path, options));
  });
};
