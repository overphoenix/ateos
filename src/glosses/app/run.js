import { ateos } from "../..";

const {
  is,
  app: { getSubsystemMeta },
  util
} = ateos;

const INTERNAL = Symbol.for("ateos.app.Application#internal");

const _bootstrapApp = async (app, {
  useArgs,
  version,
  ...restOptions
}) => {
  if (ateos.isNull(ateos.__app__)) {
    ateos.__app__ = app;

    // From Node.js docs: SIGTERM and SIGINT have default handlers on non-Windows platforms that resets
    // the terminal mode before exiting with code 128 + signal number. If one of these signals has a
    // listener installed, its default behavior will be removed (Node.js will no longer exit).
    // So, install noop handlers to block this default behaviour.
    process.on("SIGINT", ateos.noop);
    process.on("SIGTERM", ateos.noop);

    const uncaughtException = (...args) => app._uncaughtException(...args);
    const unhandledRejection = (...args) => app._unhandledRejection(...args);
    const rejectionHandled = (...args) => app._rejectionHandled(...args);
    const beforeExit = () => app.stop();
    const signalExit = (sigName) => app._signalExit(sigName);
    app._setHandlers({
      uncaughtException,
      unhandledRejection,
      rejectionHandled,
      beforeExit,
      signalExit
    });
    process.on("uncaughtException", uncaughtException);
    process.on("unhandledRejection", unhandledRejection);
    process.on("rejectionHandled", rejectionHandled);
    process.on("beforeExit", beforeExit);

    // if (ateos.ateos.isNodejs && process.stdout.isTTY && process.stdin.isTTY) {
    //     // Track cursor if tty mode is enabled
    //     await new Promise((resolve) => ateos.cli.trackCursor(resolve));
    // }

    // app.on("exit:main", async () => {
    //   ateos.cli.destroy();
    // });
  }

  try {
    let code = null;

    if (useArgs) {
      const {
        app: { AppHelper }
      } = ateos;

      const appHelper = new AppHelper(app, { version });
      app.helper = appHelper;

      app._setErrorScope(true);

      const sysMeta = getSubsystemMeta(app.constructor);
      if (sysMeta) {
        if (sysMeta.mainCommand) {
          appHelper.defineMainCommand(sysMeta.mainCommand);
        }

        if (ateos.isArray(sysMeta.commandsGroups)) {
          for (const group of sysMeta.commandsGroups) {
            appHelper.defineCommandsGroup(group);
          }
        }

        if (ateos.isArray(sysMeta.optionsGroups)) {
          for (const group of sysMeta.optionsGroups) {
            appHelper.defineOptionsGroup(group);
          }
        }
      }

      await app.configure(restOptions);

      if (sysMeta) {
        if (ateos.isArray(sysMeta.commands)) {
          for (const command of sysMeta.commands) {
            appHelper.defineCommand(command);
          }
        }

        if (ateos.isArray(sysMeta.options)) {
          for (const option of sysMeta.options) {
            appHelper.defineOption(option);
          }
        }

        if (ateos.isArray(sysMeta.subsystems)) {
          for (const ss of sysMeta.subsystems) {
            // eslint-disable-next-line
                        await appHelper.defineCommandFromSubsystem({
              ...ss,
              lazily: true
            });
          }
        }
      }

      app._setErrorScope(false);

      let command = appHelper.mainCommand;
      let errors = [];
      let rest = [];
      let match = null;
      ({ command, errors, rest, match } = await appHelper.parseArgs());

      if (errors.length) {
        console.log(`${command.getUsageMessage()}\n`);
        for (const error of errors) {
          console.error(error);
          // ateos.log.bright.red.error.noLocate(error);
        }
        await app.stop(1);
      }

      app._setErrorScope(true);
      await app.initialize(restOptions);

      await app.emitParallel("before run", command);
      code = await command.execute(rest, match);
    } else {
      app._setErrorScope(true);
      await app.configure(restOptions);
      await app.initialize(restOptions);
      code = await app.run();
    }

    app._setErrorScope(false);

    if (ateos.isInteger(code)) {
      await app.stop(code);
      return;
    }
  } catch (err) {
    if (app._isAppErrorScope()) {
      return app.fireException(err);
    }
    console.error(err);
    // ateos.log.bright.red.error.noLocate(err);
    return app.stop(1);
  }
};

export default async (App, {
  useArgs = false,
  version,
  ...restOptions
} = {}) => {
  if (ateos.isNull(ateos.__app__) && ateos.isClass(App)) {
    const app = new App();
    if (useArgs) {
      // mark the default main as internal to be able to distinguish internal from user-defined handlers
      app.run[INTERNAL] = true;
    }
    if (!is.application(app)) {
      ateos.log.bright.red.error.noLocate("Invalid application class");
      process.exit(ateos.app.EXIT.INVALID_APP);
      return;
    }

    return _bootstrapApp(app, {
      useArgs,
      version,
      ...restOptions
    });
  }

  // surrogate application, use only own properties
  const _App = ateos.isClass(App) ? App.prototype : App;
  const allProps = util.entries(_App, { enumOnly: false });

  if (!ateos.isNull(ateos.__app__)) {
    await ateos.__app__.uninitialize();
    ateos.__app__.removeProcessHandlers();
    ateos.__app__ = null;
  }

  // redefine argv
  if (ateos.isArray(ateos.__argv__)) {
    process.argv = ateos.__argv__;
    delete ateos.__argv__;
  }

  class XApplication extends ateos.app.Application { }

  const props = [];

  for (const [name, value] of allProps) {
    if (ateos.isFunction(value)) {
      XApplication.prototype[name] = value;
    } else {
      props.push(name);
    }
  }

  for (const s of Object.getOwnPropertySymbols(_App)) {
    XApplication.prototype[s] = App.prototype[s];
  }

  const app = new XApplication();
  for (const prop of props) {
    const descriptor = Object.getOwnPropertyDescriptor(_App, prop);
    Object.defineProperty(app, prop, descriptor);
  }
  if (useArgs) {
    // mark the default main as internal to be able to distinguish internal from user-defined handlers
    app.run[INTERNAL] = true;
  }

  return _bootstrapApp(app, {
    useArgs,
    version,
    ...restOptions
  });
};
