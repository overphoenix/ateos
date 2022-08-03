export default function plugin() {
  const {
    is,
    path: aPath,
    fs,
    error
  } = ateos;

  return function pack(type, packerOptions = {}) {
    if (!(type.slice(1) in ateos.archive)) {
      throw new error.InvalidArgumentException(`Unknown archive type: ${type}`);
    }
    if (is.string(packerOptions)) {
      packerOptions = { filename: packerOptions };
    }
    const {
      filename,
      mode = 0o644
    } = packerOptions;

    if (!is.string(filename)) {
      throw new error.InvalidArgumentException("Invalid filename argument");
    }

    switch (type) {
      case ".tar": {
        const archive = ateos.archive.tar;
        const stream = new archive.RawPackStream();
        let resultFile = null;
        return this.through(async (file) => {
          if (file.isNull() && !file.isSymbolic() && !file.isDirectory()) {
            // ok? add an empty file?
            return;
          }

          if (!resultFile) {
            resultFile = file.clone({ contents: false });
          }

          const header = {
            name: file.relative,
            mode: file.stat && file.stat.mode,
            mtime: file.stat && file.stat.mtime,
            type: !file.isNull()
              ? "file"
              : file.isDirectory()
                ? "directory"
                : "symlink"
          };
          if (file.isSymbolic()) {
            header.linkname = file.symlink;
            stream.entry(header);
            return;
          }
          if (file.isDirectory()) {
            stream.entry(header);
            return;
          }
          if (file.isBuffer()) {
            stream.entry(header, file.contents);
          } else {
            // stream
            // ..
            let data = await file.contents.pipe(ateos.stream.concat.create());
            if (data.length === 0) {
              // nothing was written, empty file
              data = Buffer.alloc(0);
            }
            stream.entry(header, data);
          }
        }, function flush() {
          stream.finalize();
          resultFile.path = aPath.resolve(resultFile.base, filename);
          if (resultFile.stat) {
            resultFile.stat.mode = mode | fs.constants.S_IFREG;
          }
          resultFile.contents = stream;
          this.push(resultFile);
        });
      }
      case ".zip": {
        const zipfile = new ateos.archive.zip.pack.ZipFile();
        const {
          compress = true
        } = packerOptions;
        let resultFile = null;
        return this.through(async (file) => {
          if (file.isNull() && !file.isSymbolic() && !file.isDirectory()) {
            // ok? add an empty file?
            return;
          }
          if (!resultFile) {
            resultFile = file.clone({ contents: false });
          }
          const opts = {
            mtime: file.stat ? file.stat.mtime : new Date(),
            mode: file.stat && file.stat.mode
          };
          if (file.isDirectory()) {
            zipfile.addEmptyDirectory(file.relative, opts);
          } else {
            opts.compress = compress;
            if (file.isBuffer()) {
              opts.compress = compress;
              zipfile.addBuffer(file.contents, file.relative, opts);
            } else if (file.isStream()) {
              zipfile.addReadStream(file.contents, file.relative, opts);
            } else if (file.isSymbolic()) {
              throw new error.NotSupportedException(`zip packer does not support symlinks: ${file.path}`);
            }
          }
        }, async function flush() {
          await zipfile.end();
          resultFile.path = aPath.resolve(resultFile.base, filename);
          if (resultFile.stat) {
            resultFile.stat.mode = mode | fs.constants.S_IFREG;
          }
          resultFile.contents = zipfile.outputStream;
          this.push(resultFile);
        });
      }
      default: {
        throw new error.NotImplementedException(`support for ${type} archives is not implemented`);
      }
    }
  };
}
