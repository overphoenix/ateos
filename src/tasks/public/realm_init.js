const {
  is,
  fs,
  path,
  realm,
} = ateos;

const __ = ateos.lazify({
  helper: "./realm_create/helpers"
}, null, require);

/**
* Initialize realm.
*/
@ateos.task.task("realmInit")
export default class extends realm.BaseTask {
  async main(options = {}) {
    // keep original options immutable
    options = ateos.lodash.defaults(options, {})

    const cwd = this.cwd = process.cwd();
    
    await fs.mkdir(path.join(cwd, ".ateos"));

    await __.helper.realm.createConfig({
      artifacts: {
      },
      tasks: {
        basePath: [
          "lib/ateos_tasks",
          "src/ateos_tasks"
        ],
        loadPolicy: "ignore",
        default: false,
        domains: {
          public: "public",
          private: "private"
        }
      },
      cwd
    });

    await __.helper.realm.createDevConfig({
      tasks: {
      },
      defaultTask: "copy",
      units: {
        tasks: {
          description: "ATEOS tasks",
          units: {
            src: {
              description: "Tasks codebase",
              src: "src/ateos_tasks/**/*.js",
              dst: "lib/ateos_tasks",
              task: "transpile"
            },
            assets: {
              description: "Assets",
              src: [
                "src/ateos_tasks/**/*",
                "!src/ateos_tasks/**/*.js"
              ],
              dst: "lib/ateos_tasks"
            }
          }
        }
      },
      cwd
    });

    const newRealm = new realm.RealmManager({ cwd });

    return newRealm;
  }

  async undo(err) {
    is.string(this.cwd) && await fs.remove(path.join(this.cwd, ".ateos"));
  }
}
