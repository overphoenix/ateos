export default (fs) => {
  const {
    is,
    path,
    std: { os }
  } = ateos;

  // HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
  const hasMillisResSync = () => {
    let tmpfile = path.join(`millis-test-sync${Date.now().toString()}${Math.random().toString().slice(2)}`);
    tmpfile = path.join(os.tmpdir(), tmpfile);

    // 550 millis past UNIX epoch
    const d = new Date(1435410243862);
    fs.writeFileSync(tmpfile, "https://github.com/jprichardson/node-ateos.fs/pull/141");
    const fd = fs.openSync(tmpfile, "r+");
    fs.futimesSync(fd, d, d);
    fs.closeSync(fd);
    return fs.statSync(tmpfile).mtime > 1435410243000;
  };

  const hasMillisRes = (callback) => {
    let tmpfile = path.join(`millis-test${Date.now().toString()}${Math.random().toString().slice(2)}`);
    tmpfile = path.join(os.tmpdir(), tmpfile);

    // 550 millis past UNIX epoch
    const d = new Date(1435410243862);
    fs.writeFile(tmpfile, "https://github.com/jprichardson/node-ateos.fs/pull/141", (err) => {
      if (err) {
        return callback(err);
      }
      fs.open(tmpfile, "r+", (err, fd) => {
        if (err) {
          return callback(err);
        }
        fs.futimes(fd, d, d, (err) => {
          if (err) {
            return callback(err);
          }
          fs.close(fd, (err) => {
            if (err) {
              return callback(err);
            }
            fs.stat(tmpfile, (err, stats) => {
              if (err) {
                return callback(err);
              }
              callback(null, stats.mtime > 1435410243000);
            });
          });
        });
      });
    });
  };

  const timeRemoveMillis = (timestamp) => {
    if (ateos.isNumber(timestamp)) {
      return Math.floor(timestamp / 1000) * 1000;
    } else if (timestamp instanceof Date) {
      return new Date(Math.floor(timestamp.getTime() / 1000) * 1000);
    }
    throw new Error("ateos.fs: timeRemoveMillis() unknown parameter type");

  };

  const utimesMillis = (path, atime, mtime, callback) => {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    fs.open(path, "r+", (err, fd) => {
      if (err) {
        return callback(err);
      }
      fs.futimes(fd, atime, mtime, (futimesErr) => {
        fs.close(fd, (closeErr) => {
          if (callback) {
            callback(futimesErr || closeErr);
          }
        });
      });
    });
  };

  const utimesMillisSync = (path, atime, mtime) => {
    const fd = fs.openSync(path, "r+");
    fs.futimesSync(fd, atime, mtime);
    return fs.closeSync(fd);
  };

  return {
    hasMillisResSync,
    hasMillisRes,
    timeRemoveMillis,
    utimesMillis,
    utimesMillisSync
  };
};
