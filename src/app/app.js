const {
  cli,
  path,
  app
} = ateos;

const {
  AppSubsystem
} = app;

const log = ({ stdout, stderr, inspect, ...options } = {}) => {
  if (ateos.isPlainObject(inspect)) {
    const options = inspect.options || {
      style: "color",
      depth: 8,
      noType: true,
      noArrayProperty: true
    };
    const value = ateos.isArray(inspect.value)
      ? inspect.value.map((rel) => ateos.util.pick(rel, inspect.onlyProps))
      : ateos.util.pick(inspect.value, inspect.onlyProps);

    stdout = ateos.inspect(value, options);
  }
  if (stderr) {
    // cli.updateProgress({
    //     status: false,
    //     clean: true
    // });
    console.error(stderr);
  } else if (stdout) {
    // if (!ateos.isUndefined(options.status) && !ateos.isUndefined(options.clean)) {
    //     cli.updateProgress(options);
    // }
    console.log(stdout);
  } else {
    // cli.updateProgress(options);
  }
};

const command = (name) => path.join(__dirname, "commands", name);

@AppSubsystem({
  commandsGroups: [
    {
      name: "common",
      description: "Common"
    },
    {
      name: "subsystem",
      description: "Extensions"
    }
  ],
  subsystems: [
    {
      name: ["github", "gh"],
      group: "common",
      description: "GitHub tools",
      subsystem: command("github")
    },
    {
      name: "inspect",
      group: "common",
      description: "Runtime inspection",
      subsystem: command("inspect")
    },
    // {
    //     name: "omni",
    //     group: "common",
    //     description: "Omni-application management",
    //     subsystem: command("omni")
    // },
    {
      name: "node",
      group: "common",
      description: "Node.js management",
      subsystem: command("node")
    },
    {
      name: "realm",
      group: "common",
      description: "Realm management",
      subsystem: command("realm")
    },
    {
      name: "specter",
      group: "common",
      description: "DevOps workflows",
      subsystem: command("specter")
    },
  ]
})
export default class ATEOSApp extends app.Application {
  async onConfigure() {
    this.exitOnSignal("SIGINT");

    // await this._addInstalledSubsystems();

    if (!this.replBanner) {
      this.replBanner = `${cli.chalk.bold.hex("ab47bc")("ATEOS")} v${ateos.package.version}, ${cli.chalk.bold.hex("689f63")("Node.JS")} ${process.version}`;
    }

    this.log = log;
  }

  async run(args, opts, { rest } = {}) {
    const repl = ateos.tsn.createRepl();
    const service = ateos.tsn.create({ ...repl.evalAwarePartialHost });
    repl.setService(service);
    repl.start();
  }
}
