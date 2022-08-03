const {
  is,
  error,
  path
} = ateos;

export default function plugin() {
  return function rename(handler) {
    return this.throughSync(function (file) {
      const obj = {
        dirname: path.dirname(file.relative),
        basename: file.stem,
        extname: file.extname
      };
      let p;
      if (is.string(handler) && handler) {
        p = handler;
      } else if (is.function(handler)) {
        handler(obj);
        p = path.join(obj.dirname, obj.basename + obj.extname);
      } else if (is.object(handler)) {
        const dirname = "dirname" in handler ? handler.dirname : obj.dirname;
        const prefix = handler.prefix || "";
        const suffix = handler.suffix || "";
        const basename = "basename" in handler ? handler.basename : obj.basename;
        const extname = "extname" in handler ? handler.extname : obj.extname;
        p = path.join(dirname, prefix + basename + suffix + extname);
      } else {
        throw new error.InvalidArgumentException();
      }
      file.path = path.join(file.base, p);

      if (file.sourceMap) {
        file.sourceMap.file = file.relative;
      }

      this.push(file);
    });
  };
}
