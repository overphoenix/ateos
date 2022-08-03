const {
  app: {
    Subsystem,
    CliMainCommand
  },
  cli,
  path,
  std: { childProcess }
} = ateos;

export default () => class ShaniCommand extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "tests",
        holder: "test",
        help: "Path to test file",
        nargs: "*"
      }
    ],
    optionsGroups: [
      {
        name: "output",
        description: "Output"
      },
      {
        name: "flow",
        description: "Execution flow controls"
      },
      {
        name: "config",
        description: "Configuring"
      },
      {
        name: "coverage",
        description: "Coverage"
      }
    ],
    options: [
      {
        name: "--first",
        help: "exit if some test fails",
        group: "flow"
      },
      {
        name: "--timeout",
        help: "Default timeout for all tests",
        nargs: 1,
        type: Number,
        default: 5000,
        group: "flow"
      },
      {
        name: "--skip",
        help: "Tests to skip",
        nargs: 1,
        default: "",
        group: "flow"
      },
      {
        name: "--call-gc",
        help: "call gc after file processing",
        group: "flow"
      },
      {
        name: "--inspect",
        help: "Run node inspector at the given port and set a breakpoint on the first line",
        nargs: "?",
        default: 9229,
        group: "flow",
        holder: "PORT"
      },
      {
        name: "--force",
        help: "ignore skip flag",
        group: "flow"
      },
      {
        name: "--only-slow",
        help: "Run only slow tests",
        group: "flow"
      },
      {
        name: "--skip-slow",
        help: "Skip slow tests",
        group: "flow"
      },
      {
        name: "--per-process",
        help: "run each test in a separate process",
        group: "flow"
      },
      {
        name: "--dry-run",
        help: "Do not execute any tests and hooks",
        group: "flow"
      },

      {
        name: "--config",
        help: "Path to configuration file",
        nargs: 1,
        default: "shanifile.js",
        group: "config"
      },
      {
        name: "--path",
        help: "Tests path",
        nargs: 1, default: "tests/**/*.js",
        group: "config"
      },
      {
        name: "--no-config",
        help: "Do not use configuration file",
        group: "config"
      },
      {
        name: "--dont-use-map",
        help: "dont use a custom test name mapping",
        group: "config"
      },

      {
        name: "--all-timings",
        help: "show all the timings",
        group: "output"
      },
      {
        name: "--timers",
        help: "show timers",
        group: "output"
      },
      {
        name: "--show-hooks",
        help: "show hook executing info",
        group: "output"
      },
      {
        name: "--dont-keep-hooks",
        help: "Dont keep hook info on the screen",
        group: "output"
      },
      {
        name: "--show-handles",
        help: "show handles holding the event loop",
        group: "output"
      },
      {
        name: "--no-ticks",
        help: "Don't show the test/hook/timers ticks.\nForced to be true if there is no TTY",
        group: "output"
      },
      {
        name: "--simple",
        help: "Use simple console reporter",
        group: "output"
      },
      {
        name: ["--minimal", "-m"],
        help: "Use minimal console reporter",
        group: "output"
      },
      {
        name: "--stats",
        help: "Show only final stats, no tests",
        group: "output"
      },

      {
        name: "--print-cover-stats", nargs: "?", holder: "FILTER", help: "Print cover stats if exists",
        group: "coverage"
      },
      {
        name: "--start-cover-server",
        nargs: "?",
        holder: "PORT",
        default: 9111,
        type: Number,
        help: "Start http server to analyse coverage if exists",
        group: "coverage"
      }
    ]
  })
  async main(args, opts) {
    const configPath = path.resolve(opts.get("config"));
    const useConfig = !opts.get("noConfig");

    const configOptions = {};

    for (const name of [
      "path", "first", "timeout",
      "showHandles", "dontUseMap", "allTimings",
      "skip", "timers", "showHooks",
      "dontKeepHooks", "noTicks", "simple",
      "minimal", "callGc", "skipSlow", "onlySlow",
      "perProcess", "dryRun", "stats"
    ]) {
      if (opts.has(name)) {
        configOptions[name] = opts.get(name);
      }
    }

    if (opts.get("force")) {
      configOptions.skip = "";
    }
    const inclusive = args.get("tests");
    const execArgv = ["--expose-gc"];
    if (opts.has("inspect")) {
      execArgv.push(`--inspect=${opts.get("inspect")}`, "--inspect-brk");
    }

    const proc = childProcess.fork(ateos.getPath("lib", "shani", "runner.js"), [ateos.HOME], {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
      execArgv
    });

    await new Promise((resolve) => proc.once("message", resolve));

    proc.send({
      useConfig,
      configPath,
      configOptions,
      inclusive,
      // startCoverServer: opts.has("start-cover-server") && opts.get("start-cover-server"),
      // printCoverStats: opts.has("print-cover-stats") && opts.get("print-cover-stats"),
      root: process.cwd()
    });

    if (process.stdin.isTTY && process.stdout.isTTY) {
      ateos.std.readline.emitKeypressEvents(process.stdin);
      process.stdin.setRawMode(true);
      process.stdin.on('keypress', async (chunk, key) => {
        if (key.ctlr) {
          switch (key.full) {
            case "q": {
              // stop testing
              proc.send("stop");
              break;
            }
            case "c": {
              // immediate exit
              await ateos.process.kill(proc.pid, { force: true, tree: true });
              break;
            }
          }
        }
      });
    }

    const [code, signal] = await new Promise((resolve) => proc.once("exit", (code, signal) => {
      resolve([code, signal]);
    }));

    if (code !== 0) {
      if (signal) {
        console.info(`Died due to ${signal}`);
      }
      return code;
    }

    return 0;
  }
}
