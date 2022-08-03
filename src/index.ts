// Be here until it appears in the official implementation
require("reflect-metadata");

const common = require("./common");

const ateos: {
  __app__: any
  assertion: any
  asNamespace: (obf: any) => any
  fs: any
  path: any,
  getPath: (n: string, ...args: Array<string>) => string
  HOME: string
  std: {

  }
} = Object.create({
  __app__: null, // root application instance
  common: common.asNamespace(common),
  // expose some useful commons
  null: common.null,
  undefined: common.undefined,
  noop: common.noop,
  identity: common.identity,
  truly: common.truly,
  falsely: common.falsely,
  o: common.o,
  lazify: common.lazify,
  lazifyp: common.lazifyp,
  definep: common.definep,
  getPrivate: common.getPrivate,
  asNamespace: common.asNamespace,
  setTimeout: common.setTimeout,
  clearTimeout: common.clearTimeout,
  setInterval: common.setInterval,
  clearInterval: common.clearInterval,
  setImmediate: common.setImmediate,
  clearImmediate: common.clearImmediate,
  EMPTY_BUFFER: common.EMPTY_BUFFER
});

// Mark some globals as namespaces
[
  ateos,
  global,
  global.process,
  global.console
].forEach((mod) => {
  ateos.asNamespace(mod);
});

Object.defineProperty(global, "ateos", {
  enumerable: true,
  value: ateos
});

Object.defineProperty(ateos, "ateos", {
  enumerable: true,
  value: ateos
});

common.lazify({
  package: "../package.json",
  log: "ololog",

  HOME: () => process.env.ATEOS_HOME,
  LOGO: () => ateos.fs.readFileSync(ateos.getPath("share", "media", "ateos.txt"), { encoding: "utf8" }),

  getPath: () => (p: string, ...args: Array<string>) => ateos.path.join((p && p.startsWith("/")) ? p : ateos.path.join(ateos.HOME, p), ...args),

  assert: () => ateos.assertion.assert,

  // Namespaces

  // NodeJS
  std: () => ateos.asNamespace(common.lazify({
    assert: "assert",
    asyncHooks: "async_hooks",
    buffer: "buffer",
    childProcess: "child_process",
    cluster: "cluster",
    console: "console",
    crypto: "crypto",
    dgram: "dgram",
    dns: "dns",
    domain: "domain",
    events: "events",
    fs: "fs",
    http: "http",
    http2: "http2",
    https: "https",
    inspector: "inspector",
    module: "module",
    net: "net",
    os: "os",
    path: "path",
    perfHooks: "perf_hooks",
    process: "process",
    punycode: "punycode",
    querystring: "querystring",
    readline: "readline",
    repl: "repl",
    stream: "stream",
    stringDecoder: "string_decoder",
    timers: "timers",
    tls: "tls",
    tty: "tty",
    url: "url",
    util: "util",
    v8: "v8",
    vm: "vm",
    workerThreads: "worker_threads",
    zlib: "zlib"
  }, null, require, { asNamespace: true })),

  // glosses
  app: "./glosses/app",
  archive: "./glosses/archives",
  assertion: "./glosses/assertion",
  buffer: "./glosses/buffer",
  cli: "./glosses/cli",
  collection: "./glosses/collections",
  compressor: "./glosses/compressors",
  configuration: "./glosses/configurations",
  crypto: "./glosses/crypto",
  data: "./glosses/data",
  database: "./glosses/databases",
  datastore: "./glosses/datastores",
  datetime: "./glosses/datetime",
  diff: "./glosses/diff",
  error: "./glosses/errors",
  event: "./glosses/events",
  fast: "./glosses/fast",
  fs: "./glosses/fs",
  fsm: "./glosses/fsm",
  git: "isomorphic-git",
  gitea: "./glosses/gitea",
  github: "./glosses/github",
  glob: "./glosses/glob",
  globals: "./glosses/globals",
  http: "./glosses/http",
  inspect: "./glosses/inspect",
  ipfs: "./glosses/ipfs",
  is: "./glosses/is",
  js: "./glosses/js",
  lockfile: "./glosses/lockfile",
  logger: "./glosses/logger",
  math: "./glosses/math",
  model: "./glosses/models",
  module: "./glosses/module",
  multiformat: "./glosses/multiformats",
  net: "./glosses/net",
  netron: "./glosses/netron",
  nodejs: "./glosses/nodejs",
  notifier: "./glosses/notifier",
  omnitron: "./glosses/omnitron",
  p2p: "./glosses/p2p",
  path: "./glosses/path",
  pretty: "./glosses/pretty",
  process: "./glosses/process",
  promise: "./glosses/promise",
  punycode: () => ateos.asNamespace(require("punycode/")),
  puppeteer: () => ateos.asNamespace(require("puppeteer-core")),
  realm: "./glosses/realm",
  regex: "./glosses/regex",
  rollup: "./glosses/rollup",
  semver: "semver",
  shell: "./glosses/shell",
  sourcemap: "./glosses/sourcemap",
  stream: "./glosses/streams",
  system: "./glosses/system",
  task: "./glosses/tasks",
  templating: "./glosses/templating",
  text: "./glosses/text",
  typeOf: "./glosses/typeof",
  typescript: "./glosses/typescript",
  uri: "./glosses/uri",
  util: "./glosses/utils",
  validation: "./glosses/validation",
  vault: "./glosses/vault",
  web: "./glosses/web"
}, ateos);

// mappings
common.lazify({
  require: "./glosses/module/require",
  requireAddon: "./glosses/module/require_addon",
  sprintf: "./glosses/text/sprintf"
}, ateos);

// lazify non-extendable objects in std
common.lazify({
  constants: "constants"
}, ateos.std);

// lazify third-party libraries
common.lazify({
  async: () => ateos.asNamespace(require("async")),
  lodash: () => ateos.asNamespace(require("lodash"))
}, ateos, require, {
  asNamespace: true
});

common.setLazifyErrorHandler((err: any) => {
  //eslint-disable-next-line
    if (ateos.__app__ !== null) {
    ateos.__app__.fireException(err);
    return;
  }
  console.error(err);
});

// Set environment variables
process.env.ATEOS_HOME = ateos.path.join(__dirname, "..");


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ateos = ateos;
exports.default = ateos;
