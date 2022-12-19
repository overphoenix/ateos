export const ip4 = (ip, options) => ateos.regex.ip4(options).test(ip);
export const ip6 = (ip, options) => ateos.regex.ip6(options).test(ip);
export const ip = (ip, options) => ateos.regex.ip(options).test(ip);

export const knownError = (err) => {
  if (!(err instanceof Error)) {
    return false;
  }
  const name = err.constructor.name;

  for (const Exc of ateos.error.ateosExceptions) {
    if (name === Exc.name) {
      return true;
    }
  }

  for (const Exc of ateos.error.stdExceptions) {
    if (name === Exc.name) {
      return true;
    }
  }

  return false;
};

ateos.lazify({
  glob: "is-glob",
  extGlob: "./ext_glob",
  fqdn: "./fqdn",
  url: "./url",
  email: "./email",
  safeRegexp: "./safe_regexp",
  deepEqual: "./deep_equal",
  // All of these predicates should be replced in-place during transpiling
  subsystem: () => (obj) => obj instanceof ateos.app.Subsystem,
  application: () => (obj) => obj instanceof ateos.app.Application,
  coreStream: () => (obj) => obj instanceof ateos.stream.core.Stream,
  datetime: () => (obj) => obj instanceof ateos.datetime.Datetime,

  realm: () => (obj) => obj instanceof ateos.realm.RealmManager,

  // fast
  fastStream: () => (obj) => obj instanceof ateos.fast.Stream,
  fastLocalStream: () => (obj) => obj instanceof ateos.fast.LocalStream,
  fastLocalMapStream: () => (obj) => obj instanceof ateos.fast.LocalMapStream,

  vaultValuable: () => (obj) => obj instanceof ateos.vault.Valuable,
}, exports, require);
