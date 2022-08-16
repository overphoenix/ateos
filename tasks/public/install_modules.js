const {
} = ateos;

const MANAGERS = [
  {
    name: "yarn",
    single: {
      args: ["add"],
      dev: "-D"
    }
  },
  {
    name: "npm",
    single: {
      args: ["install"],
      dev: "--save-dev"
    }
  }
];

@ateos.task.Task("installModules")
export default class extends ateos.task.AdvancedTask {
  async main({ cwd, dev = false, modules } = {}) {
    let app;
    for (const appInfo of MANAGERS) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await ateos.fs.which(appInfo.name);
        app = appInfo;
        break;
      } catch (err) {
        // try next
      }
    }

    if (!app) {
      throw new ateos.error.NotFoundException(`No package manager found. Inslall one of: ${MANAGERS.join(", ")}`);
    }

    if (!cwd) {
      cwd = this.manager.cwd;
    }

    if (ateos.isPlainObject(modules)) {
      for (const [name, version] of Object.entries(modules)) {
        const args = [...app.single.args];
        if (dev) {
          args.push(app.single.dev);
        }
        args.push(`${name}@${version}`);
        await ateos.process.exec(app.name, args, {
          cwd
        });
      }
    } else {
      const args = ["install"];
      if (!dev) {
        args.push("--production");
      }

      await ateos.process.exec(app.name, args, {
        cwd
      });
    }
  }
}
