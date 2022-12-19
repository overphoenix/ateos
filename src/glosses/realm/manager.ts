import { NotImplementedException } from "@recalibratedsystems/common-cjs";

const {
  error,
  fs,
  path: aPath,
  realm,
  task: { TaskManager },
  util
} = ateos;

const tryRealmAt = (cwd: string) => {
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
    return null;
  }
};

export default class RealmManager extends TaskManager {
  private connected_ = false;

  private connectiong_ = false;

  private connectOptions_ = {};

  private superRealm_: RealmManager | null = null;

  private spinner_ = null;

  public cwd: string | null = null;
  public package: any;

  constructor({ cwd = process.cwd() } = {}) {
    super();

    if (!ateos.isString(cwd)) {
      throw new error.NotValidException(`Invalid type of cwd: ${ateos.typeOf(cwd)}`);
    }
    this.cwd = cwd;

    ateos.lazify({
      config: () => {
        let cfg;
        try {
          cfg = realm.Configuration.loadSync({
            cwd
          });
        } catch (err: any) {
          if (err.code && err.code === "MODULE_NOT_FOUND") {
            cfg = new realm.Configuration({
              cwd
            });
          } else {
            throw err;
          }
        }
        return cfg;
      },
      devConfig: () => {
        let cfg;
        try {
          cfg = realm.DevConfiguration.loadSync({
            cwd
          });
        } catch (err: any) {
          if (err.code && err.code === "MODULE_NOT_FOUND") {
            cfg = new realm.DevConfiguration({
              cwd
            });
          } else {
            throw err;
          }
        }
        return cfg;
      },
      package: () => require(aPath.join(cwd, "package.json"))
    }, this, require);

    this.checkSuperRealm();
  }

  get name() {
    return this.package.name;
  }

  get connected() {
    return this.connected_;
  }

  get superRealm() {
    return this.superRealm_;
  }

  async connect(options = {}) {
    if (this.connected_ || this.connectiong_) {
      return;
    }
    this.connectiong_ = true;
    this.connectOptions_ = options;

    try {
      // Load realm tasks.
      const tasksConfig = this.config.raw.tasks;
      if (ateos.isObject(tasksConfig)) {
        const basePaths = util.arrify(tasksConfig.basePath).map((p) => aPath.join(this.cwd, p));
        const loadPolicy = tasksConfig.loadPolicy || ateos.task.TaskManager.DEFAULT_LOAD_POLICY;

        if (ateos.isObject(tasksConfig) && basePaths.length > 0) {
          const loadTasks = async (basePath: string, skipLoaded = false) => {
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

      if (this.checkSuperRealm()) {
        await this.#connectSuperRealm(options);
      }

      this.artifacts = await realm.RealmArtifacts.collect(this);

      this.connected_ = true;
    } catch (err) {
      this.connected_ = false;
      throw err;
    } finally {
      this.connectiong_ = false;
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

  stopNotifications(err: any) {
    if (!ateos.isNull(this.spinner_)) {
      if (err) {
        this.spinner_.fail(err.message);
        console.error(err);
      } else {
        this.spinner_.stop();
      }
      this.spinner_ = null;
    }
  }

  _createSpinner(text: any) {
    let options;
    if (ateos.isString(text)) {
      options = {
        text
      };
    } else {
      options = text;
    }
    this.spinner_ = ateos.cli.spinner(options).start();
  }

  _updateProgress(options: { clean?: boolean, text?: string, status?: string, reset?: boolean }) {
    if (ateos.isNull(this.spinner_) || options.reset) {
      if (options.clean && this.spinner_) {
        this.spinner_.stop();
      }
      this._createSpinner(options.text);
    }

    if (ateos.isString(options.status)) {
      this.spinner_[options.status](options.text);
    } else {
      this.spinner_.text = options.text;
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
        if (this.checkSuperRealm() === 1) {
          await this.#connectSuperRealm(this.connectOptions_);
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
    throw new NotImplementedException('`lock() is not implemented');
  }

  async unlock() {
    throw new NotImplementedException('`unlock() is not implemented');
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

  private checkSuperRealm() {
    if (ateos.isNull(this.superRealm)) {
      // Scan for super realm
      const parentPath = aPath.dirname(this.cwd);
      const baseName = aPath.basename(parentPath);

      // Nested realms are always in the 'opt' directory of the parent realm.
      // So, we can check parent/super if detect such directory name
      if (baseName === "opt") {
        this.superRealm_ = tryRealmAt(aPath.dirname(parentPath));
      }
      // check 'superRealm' property in configuration
      if (ateos.isNull(this.superRealm_)) {
        if (ateos.HOME !== this.cwd) {
          // default super-realm is ATEOS
          this.superRealm_ = tryRealmAt(ateos.HOME);
        }
      }
      return ateos.isNull(this.superRealm_) ? 0 : 1;
    }
    return 2;
  }
}
