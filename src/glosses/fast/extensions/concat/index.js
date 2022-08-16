export default function plugin() {
  const { is, std: { path }, error, fast: { File } } = ateos;

  const { Concat } = ateos.getPrivate(ateos.fast);

  return function concat(file, options = {}) {

    if (!file) {
      throw new error.InvalidArgumentException("Missing file option");
    }
    // to preserve existing |undefined| behaviour and to introduce |newLine: ""| for binaries
    if (!ateos.isString(options.newLine)) {
      options.newLine = "\n";
    }

    let isUsingSourceMaps = false;
    let latestFile;
    let latestMod;
    let fileName;
    let data;

    if (ateos.isString(file)) {
      fileName = file;
    } else if (ateos.isString(file.path)) {
      fileName = path.basename(file.path);
    } else {
      throw new error.InvalidArgumentException("Missing path in file options");
    }

    return this.throughAsync(async (file) => {
      if (file.isNull()) {
        return;
      }
      if (file.isStream()) {
        throw new error.NotSupportedException("Streaming is not supported");
      }

      // enable sourcemap support for concat
      // if a sourcemap initialized file comes in
      if (file.sourceMap && isUsingSourceMaps === false) {
        isUsingSourceMaps = true;
      }
      // set latest file if not already set,
      // or if the current file was modified more recently.
      if (!latestMod || file.stat && file.stat.mtime > latestMod) {
        latestFile = file;
        latestMod = file.stat && file.stat.mtime;
      }

      // construct concat instance
      if (!data) {
        data = new Concat(isUsingSourceMaps, fileName, options.newLine);
      }

      // add file to concat instance
      await data.add(file.relative, file.contents, file.sourceMap);
    }, function () {
      // no files passed in, no file goes out
      if (!latestFile || !data) {
        return;
      }
      let joinedFile;
      // if file options was a file path
      // clone everything from the latest file
      if (ateos.isString(file)) {
        joinedFile = latestFile.clone({ contents: false });
        joinedFile.path = path.join(latestFile.base, file);
      } else {
        joinedFile = new File(file);
      }
      joinedFile.contents = data.content;

      if (data.sourceMapping) {
        joinedFile.sourceMap = JSON.parse(data.sourceMap);
      }

      this.push(joinedFile);
    });
  };
}
