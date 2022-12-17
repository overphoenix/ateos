const {
  app,
  realm
} = ateos;

const {
  AppSubsystem
} = app;

const subCommand = (name) => ateos.path.join(__dirname, "commands", name);

@AppSubsystem({
  commandsGroups: [
    {
      name: "own",
      description: "ATEOS specific"
    },
    {
      name: "generic",
      description: "Generic commands"
    }
  ],
  subsystems: [
    {
      name: "build",
      group: "generic",
      description: "Build realm sources",
      subsystem: subCommand("build")
    },
    {
      name: "clean",
      group: "generic",
      description: "Clean realm build files",
      subsystem: subCommand("clean")
    },
    {
      name: ["create", "new"],
      group: "generic",
      description: "Create new realm",
      subsystem: subCommand("create")
    },
    {
      name: "init",
      group: "generic",
      description: "Init realm",
      subsystem: subCommand("init")
    },
    {
      name: "dev",
      group: "generic",
      description: "Start realm development cycle",
      subsystem: subCommand("dev")
    },
    {
      name: "fork",
      group: "generic",
      description: "Fork realm",
      subsystem: subCommand("fork")
    },
    {
      name: "info",
      group: "generic",
      description: "Show realm information",
      subsystem: subCommand("info")
    },
    {
      name: "pack",
      group: "generic",
      description: "Pack realm into the archive",
      subsystem: subCommand("pack")
    },
    {
      name: "publish",
      group: "generic",
      description: "Publish realm release",
      subsystem: subCommand("publish")
    }
  ]
})
class RealmCommand extends app.Subsystem {
  resolvePath(args, opts) {
    let path = args.has("path") ? args.get("path") : null;
    if (ateos.isString(path) && opts.has("re")) {
      path = new RegExp(path);
    }
    return path;
  }

  async connectRealm({ cwd } = {}) {
    let manager;
    if (ateos.isString(cwd)) {
      manager = new realm.RealmManager({ cwd });
    } else {
      manager = realm.rootRealm;
    }
    await manager.connect({
      transpile: true
    });
    return manager;
  }
};

export default () => RealmCommand