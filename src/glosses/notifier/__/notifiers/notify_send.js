const notifier = "notify-send";
let hasNotifier = void 0;

const {
  is,
  error,
  notifier: { __ },
  std: { os }
} = ateos;

const allowedArguments = ["urgency", "expire-time", "icon", "category", "hint"];

const doNotification = (options) => {
  options = __.util.mapToNotifySend(options);
  options.title = options.title || "Node Notification";

  const initial = [options.title, options.message];
  delete options.title;
  delete options.message;

  const argsList = __.util.constructArgumentList(options, {
    initial,
    keyExtra: "-",
    allowedArguments
  });

  return __.util.command(notifier, argsList);
};


export default class NotifySend extends ateos.EventEmitter {
  constructor(options) {
    super();
    this.options = ateos.util.clone(options);
  }

  async notify(options) {
    options = ateos.util.clone(options || {});

    if (is.string(options)) {
      options = { title: "", message: options };
    }

    if (!options.message) {
      throw new error.InvalidArgumentException("Message is required");
    }

    if (os.type() !== "Linux" && !os.type().match(/BSD$/)) {
      throw new error.NotSupportedException("Only supported on Linux and *BSD systems");
    }

    if (hasNotifier === false) {
      throw new error.NotSupportedException("notify-send must be installed on the system");
    }

    if (hasNotifier || Boolean(this.options.suppressOsdCheck)) {
      return doNotification(options);
    }
    try {
      hasNotifier = Boolean(ateos.fs.whichSync(notifier));
      return doNotification(options);
    } catch (err) {
      hasNotifier = false;
      throw err;
    }
  }
}
