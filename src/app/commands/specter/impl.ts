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
    // {
    //   name: "clean",
    //   group: "generic",
    //   description: "Clean realm build files",
    //   subsystem: subCommand("clean")
    // },
    // {
    //   name: ["create", "new"],
    //   group: "generic",
    //   description: "Create new realm",
    //   subsystem: subCommand("create")
    // },
    // {
    //   name: "init",
    //   group: "generic",
    //   description: "Init realm",
    //   subsystem: subCommand("init")
    // },
    // {
    //   name: "dev",
    //   group: "generic",
    //   description: "Start realm development cycle",
    //   subsystem: subCommand("dev")
    // },
    // {
    //   name: "fork",
    //   group: "generic",
    //   description: "Fork realm",
    //   subsystem: subCommand("fork")
    // },
    // {
    //   name: "info",
    //   group: "generic",
    //   description: "Show realm information",
    //   subsystem: subCommand("info")
    // },
    // {
    //   name: "pack",
    //   group: "generic",
    //   description: "Pack realm into the archive",
    //   subsystem: subCommand("pack")
    // },
    // {
    //   name: "publish",
    //   group: "generic",
    //   description: "Publish realm release",
    //   subsystem: subCommand("publish")
    // }
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

  async connectRealm(opt: { cwd: string; }) {
    let manager;
    if (ateos.isString(opt.cwd)) {
      manager = new realm.RealmManager(opt);
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
