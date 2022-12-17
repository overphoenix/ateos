import { NotImplementedException } from "@recalibratedsystems/common-cjs";

const {
  error,
  fs,
  path: aPath,
  realm,
  task,
  util
} = ateos;

const trySuperRealmAt = (cwd) => {
  try {
    // Validation...

    // try to require realm config
    require(aPath.join(cwd, ".ateos", "config.json"));

    // try to require package.json
    require(aPath.join(cwd, "package.json"));

    return new realm.RealmManager({
      cwd
    });
  } catch (err) {
    //
  }
  return null;
};

export default class RealmManager extends task.TaskManager {
  #connected = false;

  #connectiong = false;

  #connectOptions = {};

  #superRealm = null;

  #spinner = null;

  constructor({ cwd = process.cwd() } = {}) {
    super();

    if (!ateos.isString(cwd)) {
      throw new error.NotValidException(`Invalid type of cwd: ${ateos.typeOf(cwd)}`);
    }
    this.cwd = cwd;

    try {
      this.config = realm.Configuration.loadSync({
        cwd
      });
    } catch (err) {
      this.config = new realm.Configuration({
        cwd
      });
    }

    ateos.lazify({
      devConfig: () => {
        let cfg;
        try {
          cfg = realm.DevConfiguration.loadSync({
            cwd
          });
        } catch (err) {
          if (err.code && err.code === "MODULE_NOT_FOUND") {
            cfg = new realm.DevConfiguration({
              cwd
            });
          } else {
            throw err;
          }
        }
        return cfg;
      }
    }, this);

    this.package = require(aPath.join(cwd, "package.json"));

    this.#checkSuperRealm();
  }

  get name() {
    return this.package.name;
  }

  get connected() {
    return this.#connected;
  }

  get superRealm() {
    return this.#superRealm;
  }

  async connect(options = {}) {
    if (this.#connected || this.#connectiong) {
      return;
    }
    this.#connectiong = true;
    this.#connectOptions = options;

    try {
      // Load realm tasks.
      const tasksConfig = this.config.raw.tasks;
      if (ateos.isObject(tasksConfig)) {
        const basePaths = util.arrify(tasksConfig.basePath).map((p) => aPath.join(this.cwd, p));
        const loadPolicy = tasksConfig.loadPolicy || ateos.task.TaskManager.DEFAULT_LOAD_POLICY;

        if (ateos.isObject(tasksConfig) && basePaths.length > 0) {
          const loadTasks = async (basePath, skipLoaded = false) => {
            if (ateos.isObject(tasksConfig.domains)) {
              for (const [domain, path] of Object.entries(tasksConfig.domains)) {
                await this.loadTasksFrom(aPath.join(basePath, path), {
                  transpile: options.transpile,
                  domain,
                  loadPolicy
                });
              }
            }
          };


          for (const tasksBasePath of basePaths) {
            // Load tasks from common base path.
            fs.existsSync(tasksBasePath) && await loadTasks(tasksBasePath);
            if (tasksConfig.default !== false) {
              const ignore = ateos.isObject(tasksConfig.domains)
                ? [...Object.values(tasksConfig.domains)]
                : [];
              await this.loadTasksFrom(tasksBasePath, {
                transpile: options.transpile,
                ignore,
                loadPolicy
              });
            }
          }
        }
      }

      if (this.#checkSuperRealm()) {
        await this.#connectSuperRealm(options);
      }

      this.artifacts = await realm.RealmArtifacts.collect(this);

      this.#connected = true;
    } catch (err) {
      this.#connected = false;
      throw err;
    } finally {
      this.#connectiong = false;
    }
  }

  async observerNotifications(type) {
    if (ateos.isArray(type)) {
      for (const w of type) {
        this.observerNotifications(w);
      }
      return;
    }

    let notifType;
    if (ateos.isObject(type)) {
      notifType = type.name;
    } else {
      notifType = type;
    }
    await this.onNotification(notifType, (sender, name, info) => {
      this._updateProgress(info);
    });
  }

  stopNotifications(err) {
    if (!ateos.isNull(this.#spinner)) {
      if (err) {
        this.#spinner.fail(err.message);
      } else {
        this.#spinner.stop();
      }
      this.#spinner = null;
    }
  }

  _createSpinner(text) {
    let options;
    if (ateos.isString(text)) {
      options = {
        text
      };
    } else {
      options = text;
    }
    this.#spinner = ateos.cli.spinner(options).start();
  }

  _updateProgress({ clean = false, text, status, reset = false } = {}) {
    if (ateos.isNull(this.#spinner) || reset) {
      if (clean && this.#spinner) {
        this.#spinner.stop();
      }
      this._createSpinner(text);
    }

    if (ateos.isString(status)) {
      if (clean) {
        this.#spinner.stop();
      } else {
        this.#spinner[status](text);
      }
      if (status) {
        this.#spinner = null;
      }
    } else {
      this.#spinner.text = text;
    }
  }

  getPath(...args) {
    return aPath.join(this.cwd, ...args);
  }

  async run(name, ...args) {
    let result;
    try {
      result = await super.run(name, ...args);
      return result;
    } catch (err) {
      if (err instanceof error.NotExistsException) {
        if (this.#checkSuperRealm() === 1) {
          await this.#connectSuperRealm(this.#connectOptions);
        }
        if (!ateos.isNull(this.superRealm)) {
          // try again
          return super.run(name, ...args);
        }
      }
      throw err;
    }
  }

  async runSafe(name, ...args) {
    await this.lock();
    const observer = await this.run(name, ...args);
    await observer.finally(() => this.unlock());
    return observer;
  }

  async lock() {
    throw new NotImplementedException();
  }

  async unlock() {
    throw new NotImplementedException();
  }

  async #connectSuperRealm(options) {
    // Use resources from super realm.
    if (!ateos.isNull(this.superRealm)) {
      await this.superRealm.connect(options);

      // add tasks from super realm
      const tasks = this.superRealm.getTasksByDomain(realm.DOMAIN.PUBLIC);
      for (const taskInfo of tasks) {
        if (!this.hasTask(taskInfo.name)) {
          // eslint-disable-next-line no-await-in-loop
          await this.addTask({
            name: taskInfo.name,
            task: taskInfo.Class,
            ...util.pick(taskInfo, ["suspendable", "cancelable", "concurrency", "interval", "singleton", "description", "tag"])
          });
        }
      }
    }
  }

  #checkSuperRealm() {
    if (ateos.isNull(this.superRealm)) {
      // Scan for super realm
      const parentPath = aPath.dirname(this.cwd);
      const baseName = aPath.basename(parentPath);

      // Nested realms are always in the 'opt' directory of the parent realm.
      // So, we can check parent/super if detect such directory name
      if (baseName === "opt") {
        this.#superRealm = trySuperRealmAt(aPath.dirname(parentPath));
      }
      // check 'superRealm' property in configuration
      if (ateos.isNull(this.#superRealm)) {
        if (ateos.isString(this.config.raw.superRealm)) {
          // Here we have two cases
          // 1. relative path: name of the globally installed realm
          // 2. absolute path to realm root
          if (aPath.isAbsolute(this.config.raw.superRealm)) {
            this.#superRealm = trySuperRealmAt(this.config.raw.superRealm);
          } else {
            try {
              const resolvedPath = ateos.require.resolve(this.config.raw.superRealm);
              this.#superRealm = trySuperRealmAt(resolvedPath);
            } catch (err) {
              // nothing to do
            }
          }
        } else if (ateos.HOME !== this.cwd) {
          // default super-realm is ATEOS
          this.#superRealm = trySuperRealmAt(ateos.HOME);
        }
      }
      return ateos.isNull(this.#superRealm) ? 0 : 1;
    }
    return 2;
  }
}
