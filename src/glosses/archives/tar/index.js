const {
  std: { fs },
  error,
  noop,
  path
} = ateos;

const normalize = !ateos.isWindows ? ateos.identity : (name) => name.replace(/\\/g, "/").replace(/[:?<>|]/g, "_");

const head = (list) => list.length ? list[list.length - 1] : null;

const processGetuid = process.getgid ? process.getuid : () => -1;

const processUmask = process.umask ? process.umask : () => 0;

const strip = (map, level) => (header) => {
  header.name = header.name.split("/").slice(level).join("/");

  const { linkname } = header;
  if (linkname && (header.type === "link" || path.isAbsolute(linkname))) {
    header.linkname = linkname.split("/").slice(level).join("/");
  }

  return map(header);
};

const statAll = (stat, cwd, ignore, entries, sort) => {
  const queue = entries || ["."];
  return (callback) => {
    if (queue.length === 0) {
      return callback();
    }
    const next = queue.shift();
    const nextAbs = path.join(cwd, next);

    stat(nextAbs, (err, stat) => {
      if (err) {
        return callback(err);
      }

      if (!stat.isDirectory()) {
        return callback(null, next, stat);
      }

      fs.readdir(nextAbs, (err, files) => {
        if (err) {
          return callback(err);
        }

        if (sort) {
          files.sort();
        }
        for (let i = 0; i < files.length; i++) {
          if (!ignore(path.join(cwd, next, files[i]))) {
            queue.push(path.join(next, files[i]));
          }
        }

        callback(null, next, stat);
      });
    });
  };
};

export const packStream = (cwd = process.cwd(), opts = {}) => {
  cwd = String(cwd);
  const ignore = opts.ignore || ateos.noop;
  let map = opts.map || ateos.noop;
  const mapStream = opts.mapStream || ateos.identity;
  const statNext = statAll(opts.dereference ? fs.stat : fs.lstat, cwd, ignore, opts.entries, opts.sort);
  const strict = opts.strict !== false;
  const umask = ateos.isNumber(opts.umask) ? ~opts.umask : ~processUmask();
  let dmode = ateos.isNumber(opts.dmode) ? opts.dmode : 0;
  let fmode = ateos.isNumber(opts.fmode) ? opts.fmode : 0;
  const pack = opts.pack || new ateos.archive.tar.RawPackStream();
  const finish = opts.finish || noop;

  if (opts.strip) {
    map = strip(map, opts.strip);
  }

  if (opts.readable) {
    dmode |= 0o555;
    fmode |= 0o444;
  }
  if (opts.writable) {
    dmode |= 0o333;
    fmode |= 0o222;
  }

  const onnextentry = (err) => {
    if (err) {
      return pack.destroy(err);
    }
    statNext(onstat); // eslint-disable-line no-use-before-define
  };

  const onsymlink = (filename, header) => {
    fs.readlink(path.join(cwd, filename), (err, linkname) => {
      if (err) {
        return pack.destroy(err);
      }
      header.linkname = normalize(linkname);
      pack.entry(header, onnextentry);
    });
  };

  const onstat = (err, filename, stat) => {
    if (err) {
      return pack.destroy(err);
    }

    if (!filename) {
      if (opts.finalize !== false) {
        pack.finalize();
      }
      return finish(pack);
    }

    if (stat.isSocket()) {
      return onnextentry(); // tar does not support sockets...
    }

    let header = {
      name: normalize(filename),
      mode: (stat.mode | (stat.isDirectory() ? dmode : fmode)) & umask,
      mtime: stat.mtime,
      size: stat.size,
      type: "file",
      uid: stat.uid,
      gid: stat.gid
    };

    if (stat.isDirectory()) {
      header.size = 0;
      header.type = "directory";
      header = map(header) || header;
      return pack.entry(header, onnextentry);
    }

    if (stat.isSymbolicLink()) {
      header.size = 0;
      header.type = "symlink";
      header = map(header) || header;
      return onsymlink(filename, header);
    }

    // TODO: add fifo etc...

    header = map(header) || header;

    if (!stat.isFile()) {
      if (strict) {
        return pack.destroy(new error.NotSupportedException(`Unsupported type for ${filename}`));
      }
      return onnextentry();
    }

    const entry = pack.entry(header, onnextentry);
    if (!entry) {
      return;
    }

    const rs = mapStream(fs.createReadStream(path.join(cwd, filename)), header);

    rs.on("error", (err) => { // always forward errors on destroy
      entry.destroy(err);
    });

    rs.pipe(entry);
  };

  onnextentry();


  return pack;
};

const mkdirfix = async (name, opts) => {
  const made = await ateos.fs.mkdirp(name);
  if (made && opts.own) {
    await ateos.fs.chownr(made, opts.uid, opts.gid);
  }
};

export const unpackStream = (cwd = process.cwd(), opts = {}) => {
  cwd = String(cwd);
  const ignore = opts.ignore || ateos.noop;
  let map = opts.map || ateos.noop;
  const mapStream = opts.mapStream || ateos.identity;
  const own = opts.chown !== false && !ateos.ateos.isWindows && processGetuid() === 0;
  const unpack = opts.unpack || new ateos.archive.tar.RawUnpackStream();
  const stack = [];
  const now = new Date();
  const umask = ateos.isNumber(opts.umask) ? ~opts.umask : ~processUmask();
  let dmode = ateos.isNumber(opts.dmode) ? opts.dmode : 0;
  let fmode = ateos.isNumber(opts.fmode) ? opts.fmode : 0;
  const strict = opts.strict !== false;

  if (opts.strip) {
    map = strip(map, opts.strip);
  }

  if (opts.readable) {
    dmode |= 0o555;
    fmode |= 0o444;
  }
  if (opts.writable) {
    dmode |= 0o333;
    fmode |= 0o222;
  }

  const utimesParent = (name, cb) => { // we just set the mtime on the parent dir again everytime we write an entry
    let top;
    while ((top = head(stack)) && name.slice(0, top[0].length) !== top[0]) {
      stack.pop();
    }
    if (!top) {
      return cb();
    }
    fs.utimes(top[0], now, top[1], cb);
  };

  const utimes = (name, header, cb) => {
    if (opts.utimes === false) {
      return cb();
    }

    if (header.type === "directory") {
      return fs.utimes(name, now, header.mtime, cb);
    }
    if (header.type === "symlink") {
      return utimesParent(name, cb); // TODO: how to set mtime on link?
    }

    fs.utimes(name, now, header.mtime, (err) => {
      if (err) {
        return cb(err);
      }
      utimesParent(name, cb);
    });
  };

  const chperm = (name, header, cb) => {
    const link = header.type === "symlink";
    const chmod = link ? fs.lchmod : fs.chmod;
    const chown = link ? fs.lchown : fs.chown;

    if (!chmod) {
      return cb();
    }

    const mode = (header.mode | (header.type === "directory" ? dmode : fmode)) & umask;
    chmod(name, mode, (err) => {
      if (err) {
        return cb(err);
      }
      if (!own) {
        return cb();
      }
      if (!chown) {
        return cb();
      }
      chown(name, header.uid, header.gid, cb);
    });
  };

  unpack.on("entry", (header, stream, next) => {
    header = map(header) || header;
    header.name = normalize(header.name);
    const name = path.join(cwd, path.join("/", header.name));

    if (ignore(name, header)) {
      stream.resume();
      return next();
    }

    const stat = (err) => {
      if (err) {
        return next(err);
      }
      utimes(name, header, (err) => {
        if (err) {
          return next(err);
        }
        if (ateos.isWindows) {
          return next();
        }
        chperm(name, header, next);
      });
    };

    const onsymlink = () => {
      if (ateos.isWindows) {
        return next(); // skip symlinks on win for now before it can be tested
      }
      fs.unlink(name, () => {
        fs.symlink(header.linkname, name, stat);
      });
    };

    const onfile = () => {
      const ws = fs.createWriteStream(name);
      const rs = mapStream(stream, header);

      ws.on("error", (err) => { // always forward errors on destroy
        rs.destroy(err);
      });

      rs.pipe(ws)
        .once("close", stat)
        .once("error", (err) => {
          ws.removeListener("close", stat);
          next(err);
        });
    };

    const onlink = () => {
      if (ateos.isWindows) {
        return next(); // skip links on win for now before it can be tested
      }
      fs.unlink(name, () => {
        const srcpath = path.join(cwd, path.join("/", header.linkname));
        fs.link(srcpath, name, (err) => {
          if (err && err.code === "EPERM" && opts.hardlinkAsFilesFallback) {
            stream = fs.createReadStream(srcpath);
            return onfile();
          }

          stat(err);
        });
      });
    };

    if (header.type === "directory") {
      stack.push([name, header.mtime]);
      return ateos.fs.mkdirp(name).then(() => stat(), stat);
    }

    mkdirfix(path.dirname(name), { own, uid: header.uid, gid: header.gid }).then(() => {
      switch (header.type) {
        case "file": return onfile();
        case "link": return onlink();
        case "symlink": return onsymlink();
      }

      if (strict) {
        return next(new error.NotSupportedException(`Unsupported type for ${name} (${header.type})`));
      }

      stream.resume();
      next();
    }, (err) => {
      return next(err);
    });
  });

  if (opts.finish) {
    unpack.on("finish", opts.finish);
  }

  return unpack;
};

ateos.lazify({
  RawPackStream: ["tar-stream", "pack"],
  RawUnpackStream: ["tar-stream", "extract"]
}, exports, require);
