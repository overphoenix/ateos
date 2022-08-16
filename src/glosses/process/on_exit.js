const {
  is
} = ateos;

// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
let signals = [
  "SIGABRT",
  "SIGALRM",
  "SIGHUP",
  "SIGINT",
  "SIGTERM"
];

if (process.platform !== "win32") {
  signals.push(
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}

if (process.platform === "linux") {
  signals.push(
    "SIGIO",
    "SIGPOLL",
    "SIGPWR",
    "SIGSTKFLT",
    "SIGUNUSED"
  );
}


let EE = require("events");
/* istanbul ignore if */
if (!ateos.isFunction(EE)) {
  EE = EE.EventEmitter;
}

let emitter;
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__;
} else {
  emitter = process.__signal_exit_emitter__ = new EE();
  emitter.count = 0;
  emitter.emitted = {};
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity);
  emitter.infinite = true;
}

const originalProcessReallyExit = process.reallyExit;

const originalProcessEmit = process.emit;

let loaded = false;

const sigListeners = {};

const unload = function () {
  if (!loaded) {
    return;
  }
  loaded = false;

  signals.forEach((sig) => {
    try {
      process.removeListener(sig, sigListeners[sig]);
    } catch (er) {
      //
    }
  });
  process.emit = originalProcessEmit;
  process.reallyExit = originalProcessReallyExit;
  emitter.count -= 1;
};

const emit = function (event, code, signal) {
  if (emitter.emitted[event]) {
    return;
  }
  emitter.emitted[event] = true;
  emitter.emit(event, code, signal);
};

// { <signal>: <listener fn>, ... }
signals.forEach((sig) => {
  sigListeners[sig] = function listener() {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    const listeners = process.listeners(sig);
    if (listeners.length === emitter.count) {
      unload();
      emit("exit", null, sig);
      /**
             * istanbul ignore next
             */
      emit("afterexit", null, sig);
      /**
             * istanbul ignore next
             */
      process.kill(process.pid, sig);
    }
  };
});

const processReallyExit = function (code) {
  process.exitCode = code || 0;
  emit("exit", process.exitCode, null);
  /**
     * istanbul ignore next
     */
  emit("afterexit", process.exitCode, null);
  /**
     * istanbul ignore next
     */
  originalProcessReallyExit.call(process, process.exitCode);
};

const processEmit = function (ev, arg) {
  if (ev === "exit") {
    if (!ateos.isUndefined(arg)) {
      process.exitCode = arg;
    }
    const ret = originalProcessEmit.apply(this, arguments);
    emit("exit", process.exitCode, null);
    /**
         * istanbul ignore next
         */
    emit("afterexit", process.exitCode, null);
    return ret;
  }
  return originalProcessEmit.apply(this, arguments);
};

const load = function () {
  if (loaded) {
    return;
  }
  loaded = true;

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1;

  signals = signals.filter((sig) => {
    try {
      process.on(sig, sigListeners[sig]);
      return true;
    } catch (er) {
      return false;
    }
  });

  process.emit = processEmit;
  process.reallyExit = processReallyExit;
};

const onExit = function (cb, opts) {
  if (!ateos.isFunction(cb)) {
    throw new ateos.error.InvalidArgumentException("A callback must be provided for exit handler");
  }

  if (loaded === false) {
    load();
  }

  let ev = "exit";
  if (opts && opts.alwaysLast) {
    ev = "afterexit";
  }

  const remove = function () {
    emitter.removeListener(ev, cb);
    if (emitter.listeners("exit").length === 0 &&
            emitter.listeners("afterexit").length === 0) {
      unload();
    }
  };
  emitter.on(ev, cb);

  return remove;
};
onExit.signals = () => signals;
onExit.load = load;
onExit.unload = unload;

export default onExit;
