const {
  is,
  net: { checkPort },
  std: { net, os }
} = ateos;

class Locked extends Error {
  constructor(port) {
    super(`${port} is locked`);
  }
}

const lockedPorts = {
  old: new Set(),
  young: new Set()
};

// On this interval, the old locked ports are discarded,
// the young locked ports are moved to old locked ports,
// and a new young set for locked ports are created.
const releaseOldLockedPortsIntervalMs = 1000 * 15;

// Lazily create interval on first use
let interval;

const getLocalHosts = () => {
  const interfaces = os.networkInterfaces();

  // Add undefined value for createServer function to use default host,
  // and default IPv4 host in case createServer defaults to IPv6.
  const results = new Set([undefined, "0.0.0.0"]);

  for (const _interface of Object.values(interfaces)) {
    for (const config of _interface) {
      results.add(config.address);
    }
  }

  return results;
};

const getAvailablePort = async (options, hosts) => {
  if (options.host || options.port === 0) {
    return checkPort(options, true);
  }

  for (const host of hosts) {
    try {
      await checkPort({ port: options.port, host }, true); // eslint-disable-line no-await-in-loop
    } catch (error) {
      if (!["EADDRNOTAVAIL", "EINVAL"].includes(error.code)) {
        throw error;
      }
    }
  }

  return options.port;
};

const portCheckSequence = function* (ports) {
  if (ports) {
    yield* ports;
  }

  yield 0; // Fall back to 0 if anything else failed
};

export const getPort = async function (options) {
  let ports;

  if (options) {
    ports = ateos.isNumber(options.port) ? [options.port] : options.port;
  }

  if (ateos.isUndefined(interval)) {
    interval = setInterval(() => {
      lockedPorts.old = lockedPorts.young;
      lockedPorts.young = new Set();
    }, releaseOldLockedPortsIntervalMs);

    // Does not exist in some environments (Electron, Jest jsdom env, browser, etc).
    if (interval.unref) {
      interval.unref();
    }
  }

  const hosts = getLocalHosts();

  for (const port of portCheckSequence(ports)) {
    try {
      let availablePort = await getAvailablePort({ ...options, port }, hosts); // eslint-disable-line no-await-in-loop
      while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
        if (port !== 0) {
          throw new Locked(port);
        }

        availablePort = await getAvailablePort({ ...options, port }, hosts); // eslint-disable-line no-await-in-loop
      }

      lockedPorts.young.add(availablePort);

      return availablePort;
    } catch (error) {
      if (!["EADDRINUSE", "EACCES"].includes(error.code) && !(error instanceof Locked)) {
        throw error;
      }
    }
  }

  throw new Error("No available ports found");
};

export const portNumbers = function (from, to) {
  if (!ateos.isInteger(from) || !ateos.isInteger(to)) {
    throw new TypeError("`from` and `to` must be integer numbers");
  }

  if (from < 1024 || from > 65_535) {
    throw new RangeError("`from` must be between 1024 and 65535");
  }

  if (to < 1024 || to > 65_536) {
    throw new RangeError("`to` must be between 1024 and 65536");
  }

  if (to < from) {
    throw new RangeError("`to` must be greater than or equal to `from`");
  }

  const generator = function* (from, to) {
    for (let port = from; port <= to; port++) {
      yield port;
    }
  };

  return generator(from, to);
};
