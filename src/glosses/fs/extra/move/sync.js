export default (fs) => {
  const {
    path
  } = ateos;
    
  const moveFileSyncAcrossDevice = (src, dest, overwrite) => {
    const BUF_LENGTH = 64 * 1024;
    const _buff = Buffer.allocUnsafe(BUF_LENGTH);
    
    const flags = overwrite ? "w" : "wx";
    
    const fdr = fs.openSync(src, "r");
    const stat = fs.fstatSync(fdr);
    const fdw = fs.openSync(dest, flags, stat.mode);
    let pos = 0;
    
    while (pos < stat.size) {
      const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
      fs.writeSync(fdw, _buff, 0, bytesRead);
      pos += bytesRead;
    }
    
    fs.closeSync(fdr);
    fs.closeSync(fdw);
    return fs.unlinkSync(src);
  };
    
  const moveDirSyncAcrossDevice = (src, dest, overwrite) => {
    const options = {
      overwrite: false
    };
    
    const tryCopySync = () => {
      fs.copySync(src, dest, options);
      return fs.removeSync(src);
    };
    
    if (overwrite) {
      fs.removeSync(dest);
      tryCopySync();
    } else {
      tryCopySync();
    }
  };
    
  const moveSyncAcrossDevice = (src, dest, overwrite) => {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
      return moveDirSyncAcrossDevice(src, dest, overwrite);
    }
    return moveFileSyncAcrossDevice(src, dest, overwrite);
  };
    
  // return true if dest is a subdir of src, otherwise false.
  // extract dest base dir and check if that is the same as src basename
  const isSrcSubdir = (src, dest) => {
    try {
      return fs.statSync(src).isDirectory() &&
                src !== dest &&
                dest.indexOf(src) > -1 &&
                dest.split(path.dirname(src) + path.sep)[1].split(path.sep)[0] === path.basename(src);
    } catch (e) {
      return false;
    }
  };
    
  const moveSync = (src, dest, options) => {
    options = options || {};
    const overwrite = options.overwrite || options.clobber || false;
    
    src = path.resolve(src);
    dest = path.resolve(dest);
    
    if (src === dest) {
      return fs.accessSync(src);
    }
    
    if (isSrcSubdir(src, dest)) {
      throw new Error(`Cannot move '${src}' into itself '${dest}'.`);
    }
    
    fs.mkdirpSync(path.dirname(dest));
    
    const tryRenameSync = () => {
      if (overwrite) {
        try {
          return fs.renameSync(src, dest);
        } catch (err) {
          if (err.code === "ENOTEMPTY" || err.code === "EEXIST" || err.code === "EPERM") {
            fs.removeSync(dest);
            options.overwrite = false; // just overwriteed it, no need to do it again
            return moveSync(src, dest, options);
          }
    
          if (err.code !== "EXDEV") {
            throw err;
          }
          return moveSyncAcrossDevice(src, dest, overwrite);
        }
      } else {
        try {
          fs.linkSync(src, dest);
          return fs.unlinkSync(src);
        } catch (err) {
          if (err.code === "EXDEV" || err.code === "EISDIR" || err.code === "EPERM" || err.code === "ENOTSUP") {
            return moveSyncAcrossDevice(src, dest, overwrite);
          }
          throw err;
        }
      }
    };
    
    tryRenameSync();
  };
    
  return moveSync;    
};
