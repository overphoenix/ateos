const {
  fs,
  path,
  realm
} = ateos;

const __ = ateos.lazify({
  helper: "./realm_create/helpers"
}, null, require);

/**
* Initialize realm.
*/
@ateos.task.Task("realmInit")
export default class extends ateos.task.AdvancedTask {
  async main(options = {}) {
    // keep original options immutable
    options = ateos.lodash.defaults(options, {});

    const cwd = this.cwd = process.cwd();

    await fs.mkdir(path.join(cwd, ".ateos"));

    await __.helper.realm.createConfig({
      artifacts: {
      },
      tasks: {
        basePath: [
          "ateos_tasks"
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
        src: {
          units: {
            jssrc: {
              description: "JavaScript codebase",
              src: "src/**/*.js",
              dst: "lib",
              task: "transpile"
            },
            tssrc: {
              description: "TypeScript codebase",
              src: [
                "src/**/*.ts",
                "!src/**/*.d.ts"
              ],
              dst: "lib",
              task: "tsc"
            },
            assets: {
              description: "Assets",
              task: "copy",
              src: [
                "src/**/*",
                "!src/**/*.js",
                "!src/**/*.ts",
                "!src/**/*.d.ts"
              ],
              dst: "lib"
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
    ateos.isString(this.cwd) && await fs.remove(path.join(this.cwd, ".ateos"));
  }
}
