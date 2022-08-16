
const log = require("ololog");

const {
  is,
  std,
  app,
  util
} = ateos;

const {
  STATE
} = app;

const APPLICATION_FSM_TRANSITIONS = [
  {
    name: "run",
    from: STATE.INITIALIZED,
    to: STATE.RUNNING
  }
];

const ERROR_SCOPE = Symbol.for("ateos.app.Application#errorScope");

export default class Application extends app.Subsystem {
  #exiting = false;

  #handlers = null;

  #exitSignals = null;

  constructor({ name = std.path.basename(process.argv[1], std.path.extname(process.argv[1])) } = {}) {
    super({
      name,
      transitions: APPLICATION_FSM_TRANSITIONS,
      allowedStates: {
        uninitialize: STATE.RUNNING
      }
    });

    this[ERROR_SCOPE] = false;
  }

  exitOnSignal(...names) {
    // if (!ateos.isWindows) {
    for (const sigName of names) {
      if (ateos.isNull(this.#exitSignals)) {
        this.#exitSignals = [];
      }
      if (this.#exitSignals.includes(sigName)) {
        continue;
      }
      this.#exitSignals.push(sigName);
      process.on(sigName, () => this.#handlers.signalExit(sigName));
      if (sigName === "SIGINT" || sigName === "SIGTERM") {
        process.removeListener(sigName, ateos.noop);
      }
    }
    // }
    return this;
  }

  async stop(code = 0) {
    if (this.#exiting) {
      return;
    }
    this.#exiting = true;

    try {
      switch (this.getState()) {
        // initializing?
        case STATE.INITIALIZED:
        case STATE.RUNNING:
          await this.uninitialize();
      }
      this.removeProcessHandlers();
    } catch (err) {
      log.bright.red.error.noLocate(err);
      // console.error(ateos.pretty.error(err));
      code = 1;
    }

    await this.emitParallel("exit", code);

    // Only main application instance can exit process.
    if (this === ateos.__app__) {
      await this.emitParallel("exit:main");
      process.exit(code);
    }
    this.#exiting = false;
  }

  removeProcessHandlers() {
    process.removeListener("uncaughtExectption", this.#handlers.uncaughtException);
    process.removeListener("unhandledRejection", this.#handlers.unhandledRejection);
    process.removeListener("rejectionHandled", this.#handlers.rejectionHandled);
    process.removeListener("beforeExit", this.#handlers.beforeExit);
    if (ateos.isArray(this.#exitSignals)) {
      for (const sigName of this.#exitSignals) {
        process.removeListener(sigName, this.#handlers.signalExit);
      }
    }
  }

  async fireException(err) {
    let errCode;
    if (ateos.isFunction(this.error)) {
      errCode = await this.error(err);
    } else {
      console.erro(err);
      // log.bright.red.error.noLocate(err);
      // console.error(ateos.pretty.error(err));
      errCode = 1;
    }
    if (!ateos.isInteger(errCode)) {
      errCode = 1;
    }
    return this.stop(errCode);
  }

  _uncaughtException(...args) {
    return this.fireException(...args);
  }

  _unhandledRejection(...args) {
    return this.fireException(...args);
  }

  _rejectionHandled(...args) {
    return this.fireException(...args);
  }

  _signalExit(sigName) {
    return this.stop(128 + util.signalNameToCode(sigName));
  }

  // Helper methods used in bootstraping code.

  _setHandlers(handlers) {
    this.#handlers = handlers;
  }

  _setErrorScope(appScope) {
    this[ERROR_SCOPE] = appScope;
  }

  _isAppErrorScope() {
    return this[ERROR_SCOPE];
  }
}
