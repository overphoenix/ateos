const {
  error,
  is,
  fs,
  path: aPath
} = ateos;

const compileModule = (path, content, transpile) => {
  const m = new ateos.module.Module(path, {
    transforms: transpile ? [ateos.module.transform.babel()] : []
  });
  m._compile(content.toString(), path);
  const conf = m.exports;
  return (conf.__esModule)
    ? conf.default
    : conf;
};

export default class GenericConfig extends ateos.configuration.BaseConfig {
  static serializer = ateos.lazify({
    ".js": () => ({
      encode: null,
      decode: (buf, { path, transpile = false } = {}) => compileModule(path, buf, transpile),
      ext: ".js"
    }),
    ".mjs": () => ({
      encode: null,
      decode: (buf, { path } = {}) => compileModule(path, buf, true),
      ext: ".mjs"
    }),
    ".json": () => ({
      encode: ateos.data.json.encode,
      decode: ateos.data.json.decode,
      ext: ".json"
    }),
    ".bson": () => ({
      encode: ateos.data.bson.encode,
      decode: ateos.data.bson.decode,
      ext: ".bson"
    }),
    ".json5": () => ({
      encode: ateos.data.json5.encode,
      decode: ateos.data.json5.decode,
      ext: ".json5"
    }),
    ".mpak": () => ({
      encode: ateos.data.mpak.encode,
      decode: ateos.data.mpak.decode,
      ext: ".mpak"
    }),
    ".yaml": () => ({
      encode: ateos.data.yaml.encode,
      decode: ateos.data.yaml.decode,
      ext: ".yaml"
    })
  }, {});

  static extensions = Object.keys(GenericConfig.serializer);

  constructor({ cwd = process.cwd() } = {}) {
    super();
    this.cwd = aPath.resolve(cwd);
  }

  registerExtension(ext, decode, encode) {
    if (!is.function(encode)) {
      throw new error.InvalidArgumentException(`Invalid encode function for '${ext}'`);
    }

    if (!is.function(decode)) {
      throw new error.InvalidArgumentException(`Invalid decode function for '${ext}'`);
    }
    GenericConfig.serializer[ext] = {
      decode,
      encode
    };
  }

  getSupportedExtensions() {
    return Object.keys(GenericConfig.serializer);
  }

  async load(confPath, options) {
    const info = this._checkPath(confPath, true);
    this.raw = info.serializer.decode(await fs.readFile(info.path), {
      ...options,
      path: info.path
    });
  }

  loadSync(confPath, options) {
    const info = this._checkPath(confPath, true);
    this.raw = info.serializer.decode(fs.readFileSync(info.path), {
      ...options,
      path: info.path
    });
  }

  async save(confPath, { ext, ...options } = {}) {
    const info = this._checkPath(confPath, false, ext);
    if (!is.function(info.serializer.encode)) {
      throw new error.NotSupportedException(`Unsupported operation for '${info.serializer.ext}'`);
    }
    await fs.mkdirp(aPath.dirname(info.path));
    await fs.writeFile(info.path, await info.serializer.encode(this.raw, options));
  }

  _checkPath(confPath, checkExists, ext) {
    let path = (aPath.isAbsolute(confPath))
      ? confPath
      : aPath.resolve(this.cwd, confPath);

    let origExt = aPath.extname(path);
    let serializer = null;

    if (checkExists && (!(origExt in GenericConfig.extensions) || origExt.length === 0)) {
      path = ateos.module.resolve(path, {
        basedir: aPath.dirname(path),
        extensions: GenericConfig.extensions
      });
      origExt = aPath.extname(path);
    }

    if (ext && ext !== origExt) {
      const basename = aPath.basename(path, origExt);
      path = `${aPath.join(aPath.dirname(path), basename)}${ext}`;
    } else {
      ext = origExt;
    }

    serializer = GenericConfig.serializer[ext];
    if (!serializer) {
      throw new error.NotSupportedException(`Unsupported configuration format: ${ext}`);
    }

    let st;
    if (checkExists) {
      st = fs.statSync(path);
    }

    return {
      path,
      ext,
      serializer,
      st
    };
  }
}
