const {
  app,
  realm
} = ateos;

const {
  AppSubsystem,
  Subsystem
} = app;

const subCommand = (name: string) => ateos.path.join(__dirname, "commands", name);

@AppSubsystem({
  commandsGroups: [
    {
      name: "generic",
      description: "Common commands"
    },
    {
      name: "public",
      description: "public tasks"
    }
  ],
  subsystems: [
    {
      name: "info",
      group: "generic",
      description: "Get `specter` information",
      subsystem: subCommand("info")
    },
    {
      name: "software",
      group: "generic",
      description: "Install the required software",
      subsystem: subCommand("software")
    },
    {
      name: "check",
      group: "generic",
      description: "Check ssh connection",
      subsystem: subCommand("check")
    },
    {
      name: "run",
      group: "generic",
      description: "Run specification scoped task",
      subsystem: subCommand("run")
    },
  ]
})
class RealmCommand extends Subsystem {
  resolvePath(args: any, opts: any) {
    let path = args.has("path") ? args.get("path") : null;
    if (ateos.isString(path) && opts.has("re")) {
      path = new RegExp(path);
    }
    return path;
  }

  async connectRealm(opts: { cwd: string; }) {
    let manager;
    if (ateos.isString(opts.cwd)) {
      manager = new realm.RealmManager(opts);
    } else {
      manager = realm.ateosRealm;
    }
    await manager.connect({
      transpile: true
    });
    return manager;
  }
}

export default () => RealmCommand;
