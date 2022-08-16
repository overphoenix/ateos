const {
  error,
  is,
  fs,
  js: { parse },
  realm: { code },
  util,
  std: { path }
} = ateos;
const { Module, DEFAULT_PARSER_PLUGINS } = code;

/**
 * Code sandbox.
 * 
 * `input` should be string or array of entries where first entry interpreted as main entry file.
 * As a rule, other files should be specified if they are somehow implicitly imported into the module.
 * 
 */
export default class Sandbox {
  entries;

  #ateosModuleName;

  #ateosPath;

  #ateosLibPath;

  #ateosSrcPath;

  #parserPlugins;

  #modulesCache = new Map();

  constructor({ cwd = process.cwd(), ateosModuleName = "ateos", ateosPath = ateos.realm.rootRealm.cwd, input, parserPlugins = DEFAULT_PARSER_PLUGINS } = {}) {
    this.#ateosPath = ateosPath;
    this.#ateosLibPath = path.join(ateosPath, "lib");
    this.#ateosSrcPath = path.join(ateosPath, "src");
    this.#ateosModuleName = ateosModuleName;
    this.#parserPlugins = parserPlugins;

    this.cwd = cwd;
    const entries = util.arrify(input);
    if (entries.length === 0 || entries.filter((file) => ateos.isString(file) && file.length).length === 0) {
      throw new error.NotValidException("Invalid input");
    }

    this.entries = entries.map((e) => path.join(cwd, e));

    this.globalScope = new code.GlobalScope();
  }

  get ateosPath() {
    return this.#ateosPath;
  }

  async run() {
    for (const file of this.entries) {
      // eslint-disable-next-line no-await-in-loop
      await this.loadAndCacheModule(file);
    }
  }

  loadFile(filePath) {
    return fs.readFile(filePath, { check: true, encoding: "utf8" });
  }

  parse(content, { sourceType = "module", plugins = this.#parserPlugins } = {}) {
    return parse(content, {
      sourceType,
      plugins
    });
  }

  async loadAndCacheModule(modPath) {
    const realPath = ateos.module.resolve(modPath);
    let mod = this.#modulesCache.get(realPath);
    if (ateos.isUndefined(mod)) {
      mod = new Module({
        sandbox: this,
        file: realPath
      });
            
      await mod.load();

      this.#modulesCache.set(realPath, mod);
    }

    return mod;
  }

  isSpecialModule(basePath, name) {
    if (name.startsWith(".")) {
      const relPath = path.resolve(basePath, name);
      if (relPath === this.ateosPath) {
        return true;
      }
    }
    return name === this.#ateosModuleName || name in ateos.module.resolve.core;
  }

  fixPath(modPath) {
    if (modPath.startsWith(this.#ateosLibPath)) {
      return path.join(this.#ateosSrcPath, modPath.substr(this.#ateosLibPath.length));
    }   
    return modPath;
  }
}
