import { IllegalStateException, NotExistsException, NotImplementedException, NotValidException } from "@recalibratedsystems/common-cjs";
import { TaskManager, TaskObserver } from "@recalibratedsystems/tasks";
import { DOMAIN } from ".";
import RealmArtifacts from "./artifacts";

const {
  fs,
  path,
  realm,
} = ateos;

const DOMAINS = [DOMAIN.PUBLIC, DOMAIN.PRIVATE, DOMAIN.DEV];

const tryRealmAt = (cwd: string) => {
  try {
    // TODO: Validation...

    // try to require realm config
    require(path.join(cwd, ".ateos", "config.json"));

    // try to require package.json
    require(path.join(cwd, "package.json"));

    return new RealmManager({
      cwd
    });
  } catch (err) {
    return null;
  }
};

export default class RealmManager extends TaskManager {
  private _connected = false;

  private _connecting = false;

  private _connectOptions = {};

  private _superRealm: RealmManager | null = null;

  private _spinner: any = null;

  public cwd: string;
  public package: any;

  constructor({ cwd = process.cwd() } = {}) {
    super();

    if (!ateos.isString(cwd)) {
      throw new NotValidException(`Invalid type of cwd: ${ateos.typeOf(cwd)}`);
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
      package: () => require(path.join(cwd, "package.json"))
    }, this, require);

    this._checkSuperRealm();
  }

  get name() {
    return this.package.name;
  }

  get connected() {
    return this._connected;
  }

  get superRealm() {
    return this._superRealm;
  }

  async connect(options?: any) {
    if (this._connected || this._connecting) {
      return;
    }
    this._connecting = true;
    this._connectOptions = options;

    try {
      // Load realm tasks.
      const tasksConfig = this.config.raw.tasks || {
        dir: "tasks"
      };
      if (ateos.isObject(tasksConfig)) {
        const tasksPath = path.join(this.cwd, tasksConfig.dir || "tasks");
        for (const domain of DOMAINS) {
          const tasksDomainPath = path.join(tasksPath, domain);
          if (fs.existsSync(tasksDomainPath)) {
            await this.loadTasksFrom(tasksDomainPath, {
              transpile: options?.transpile,
              domain,
              loadPolicy: tasksConfig.loadPolicy || ateos.task.TaskManager.DEFAULT_LOAD_POLICY
            });
          }
        }
      }

      if (this._checkSuperRealm()) {
        await this._connectSuperRealm();
      }

      this.artifacts = await RealmArtifacts.collect(this);

      this._connected = true;
    } catch (err) {
      this._connected = false;
      throw err;
    } finally {
      this._connecting = false;
    }
  }

  async observeNotifications(type: string | Array<string>) {
    if (ateos.isArray(type)) {
      for (const w of type) {
        this.observeNotifications(w);
      }
      return;
    }

    await this.onNotification(type, (sender: any, name: string, info: any) => {
      this._updateProgress(info);
    });
  }

  stopNotifications(err: any) {
    if (!ateos.isNull(this._spinner)) {
      if (err) {
        this._spinner.stop();
        console.error(err);
      } else {
        this._spinner.stop();
      }
      this._spinner = null;
    }
  }

  private _createSpinner(text: any) {
    let options;
    if (ateos.isString(text)) {
      options = {
        text
      };
    } else {
      options = text;
    }
    this._spinner = ateos.cli.spinner(options).start();
  }

  private _updateProgress(options: { clean?: boolean, text?: string, status?: string, reset?: boolean }) {
    if (ateos.isNull(this._spinner) || options.reset) {
      if (options.clean && this._spinner) {
        this._spinner.stop();
      }
      this._createSpinner(options.text);
    }

    if (ateos.isString(options.status)) {
      this._spinner[options.status](options.text);
    } else {
      this._spinner.text = options.text;
    }
  }

  getPath(...args: string[]) {
    return path.join(this.cwd, ...args);
  }

  async run(name: string, ...args: any[]) {
    if (!this._connected) {
      throw new IllegalStateException(`Cannot run task '${name}' while manager is not connected to realm`);
    }
    
    try {
      return await super.run(name, ...args);
    } catch (err) {
      if (err instanceof NotExistsException && err.message.startsWith(`Task '${name}' not exists`)) {
        if (!ateos.isNull(this._superRealm)) {
          // try run task from super realm
          return super.run(name, ...args);
        }
      }
      throw err;
    }
  }

  async runWithLock(name: string, ...args: any[]): Promise<TaskObserver> {
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

  private async _connectSuperRealm() {
    // Use resources from super realm.
    if (!ateos.isNull(this._superRealm)) {
      await this._superRealm.connect(this._connectOptions);

      // add tasks from super realm
      const tasks = this._superRealm.getTasksByDomain(realm.DOMAIN.PUBLIC);
      for (const taskInfo of tasks) {
        if (!this.hasTask(taskInfo.name)) {
          await this.addTask({
            name: taskInfo.name,
            task: taskInfo.Class,
            ...ateos.util.pick(taskInfo, ["suspendable", "cancelable", "concurrency", "interval", "singleton", "description", "tag"])
          });
        }
      }
    }
  }

  private _checkSuperRealm() {
    if (ateos.isNull(this._superRealm)) {
      // Scan for super realm
      const parentPath = path.dirname(this.cwd);
      const baseName = path.basename(parentPath);

      // Nested realms are always in the 'opt' directory of the parent realm.
      // So, we can check parent/super if detect such directory name
      if (baseName === "opt") {
        this._superRealm = tryRealmAt(path.dirname(parentPath));
      }
      // check 'superRealm' property in configuration
      if (ateos.isNull(this._superRealm)) {
        if (ateos.HOME !== this.cwd) {
          // default super-realm is Ateos
          this._superRealm = tryRealmAt(ateos.HOME);
        }
      }
      return ateos.isNull(this._superRealm) ? 0 : 1;
    }
    return 2;
  }
}
