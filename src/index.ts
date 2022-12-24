declare global {
  var ateos: Ateos;
}

require('ts-node').register({
  "ts-node": {
    swc: true
  },
  sourceMap: true,
  compilerOptions: {
    target: "es2021",
    lib: ["es2021"],
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    declaration: true,
    removeComments: true,
    incremental: true,
    moduleResolution: "node",
    module: "commonjs",
    noEmitOnError: false,
    // noUnusedLocals: true,
    // noUnusedParameters: true,
    // strictPropertyInitialization: true,
    // strictFunctionTypes: true,
    strict: true,
    newLine: "LF",
    noImplicitReturns: true,
    allowJs: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    skipLibCheck: true,
    resolveJsonModule: true,
  }
});

import "reflect-metadata";
import * as common from "@recalibratedsystems/common-cjs";
import { asNamespace, error, definep, getPrivate, lazify, lazifyp, setLazifyErrorHandler, typeOf } from "@recalibratedsystems/common-cjs";
import * as task from "@recalibratedsystems/tasks";
import { IRealm } from "./glosses/realm";
import _ from "lodash";
import { IConfiguration } from "./glosses/configurations";
import { IApp } from "./glosses/app";
import * as ssh from "./glosses/ssh";

export interface Ateos {
  __app__: any;
  asNamespace: (obf: any) => any;
  fs: any;
  path: any;
  getPath: (n: string, ...args: string[]) => string;
  HOME: string;
  std: {
    assert: any,
    asyncHooks: any,
    buffer: any,
    childProcess: any,
    cluster: any,
    console: any,
    crypto: any,
    dgram: any,
    dns: any,
    domain: any,
    events: any,
    fs: any,
    http: any,
    http2: any,
    https: any,
    inspector: any,
    module: any,
    net: any,
    os: any,
    path: any,
    perfHooks: any,
    process: any,
    querystring: any,
    readline: any,
    repl: any,
    stream: any,
    stringDecoder: any,
    timers: any,
    tls: any,
    tty: any,
    url: any,
    util: any,
    v8: any,
    vm: any,
    workerThreads: any,
    zlib: any
  };
  app: IApp;
  configuration: IConfiguration;
  error: typeof error;
  lazify: typeof lazify;
  lodash: typeof _;
  realm: IRealm;
  task: typeof task;
  ssh: typeof ssh;
  typeOf: typeof typeOf;
  isArray: typeof common.isArray,
  isConfiguration: (obj: any) => boolean,
  isFunction: typeof common.isFunction,
  isString: typeof common.isString,
  isNull: typeof common.isNull,
  isObject: typeof common.isObject,
  isUndefined: typeof common.isUndefined,
  [key: string]: unknown;
}

export const ateos: Ateos = Object.create({
  __app__: null, // root application instance
  common: asNamespace(common),
  // expose some useful commons
  null: common.null,
  undefined: common.undefined,
  noop: common.noop,
  identity: common.identity,
  truly: common.truly,
  falsely: common.falsely,
  o: common.o,
  lazify,
  lazifyp,
  definep,
  getPrivate,
  asNamespace: asNamespace,
  EMPTY_BUFFER: common.EMPTY_BUFFER
}) as Ateos;

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

lazify({
  package: "../package.json",
  log: "ololog",

  HOME: () => process.env.ATEOS_HOME,
  LOGO: () => ateos.fs.readFileSync(ateos.getPath("share", "media", "ateos.txt"), { encoding: "utf8" }),

  getPath: () => (p: string, ...args: string[]) => ateos.path.join((p && p.startsWith("/")) ? p : ateos.path.join(ateos.HOME, p), ...args),

  EventEmitter: "eventemitter3",
  AsyncEventEmitter: () => common.AsyncEventEmitter,
  SmartBuffer: "@recalibratedsystems/smartbuffer",
  typeOf: () => common.typeOf,

  // Predicates
  isLinux: () => process.platform === "linux",
  isDarwin: () => process.platform === "darwin",
  isFreebsd: () => process.platform === "freebsd",
  isOpenbsd: () => process.platform === "openbsd",
  isWindows: () => common.isWindows,
  isNodejs: () => common.isNodejs,
  isArray: () => common.isArray,
  isFunction: () => common.isFunction,
  isAsyncFunction: () => common.isAsyncFunction,
  isGeneratorFunction: () => common.isGeneratorFunction,
  isString: () => common.isString,
  isNumber: () => common.isNumber,
  isInteger: () => common.isInteger,
  isBuffer: () => common.isBuffer,
  isSmartBuffer: ["@recalibratedsystems/smartbuffer", "isSmartBuffer"],
  isClass: () => common.isClass,
  isBoolean: () => common.isBoolean,
  isUndefined: () => common.isUndefined,
  isPropertyDefined: () => common.isPropertyDefined,
  isPropertyOwned: () => common.isPropertyOwned,
  isObject: () => common.isObject,
  isPlainObject: () => common.isPlainObject,
  isNull: () => common.isNull,
  isNil: () => common.isNil,
  isRegexp: () => common.isRegexp,
  isDate: () => common.isDate,
  isNamespace: () => common.isNamespace,
  isPromise: () => common.isPromise,
  isExist: () => common.isExist,
  isFinite: () => common.isFinite,
  isNan: () => common.isNan,
  isStream: () => common.isStream,
  isWritableStream: () => common.isWritableStream,
  isSet: () => common.isSet,
  isMap: () => common.isMap,
  isIdentifier: () => common.isIdentifier,
  isIterable: () => common.isIterable,
  isProperty: () => common.isProperty,
  isSymbol: () => common.isSymbol,
  isPrimitive: () => common.isPrimitive,
  isDigits: () => common.isDigits,
  isError: () => common.isError,
  isEmptyObject: () => common.isEmptyObject,
  isEqualArrays: () => common.isEqualArrays,
  isBinaryPath: () => common.isBinaryPath,
  isConfiguration: () => (obj: any) => obj instanceof ateos.configuration.BaseConfig,
}, ateos, require);

// Namespaces
lazify({
  // NodeJS modules
  std: () => lazify({
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
  }, null, require, { asNamespace: false }),

  // glosses
  app: "./glosses/app",
  archive: "./glosses/archives",
  cli: "./glosses/cli",
  collection: "./glosses/collections",
  compressor: "./glosses/compressors",
  configuration: "./glosses/configurations",
  data: "./glosses/data",
  database: "./glosses/databases",
  datastore: "./glosses/datastores",
  datetime: "./glosses/datetime",
  env: "./glosses/env",
  error: ["@recalibratedsystems/common-cjs", "error"],
  fast: "./glosses/fast",
  fs: "./glosses/fs",
  git: "isomorphic-git",
  gitea: "./glosses/gitea",
  github: "./glosses/github",
  glob: "./glosses/glob",
  globals: "./glosses/globals",
  http: "./glosses/http",
  inspect: "./glosses/inspect",
  is: "./glosses/is",
  js: "./glosses/js",
  math: "./glosses/math",
  module: "./glosses/module",
  net: "./glosses/net",
  nodejs: "./glosses/nodejs",
  notifier: "./glosses/notifier",
  omnitron: "./glosses/omnitron",
  pretty: "./glosses/pretty",
  process: "./glosses/process",
  promise: ["@recalibratedsystems/common-cjs", "promise"],
  realm: "./glosses/realm",
  regex: "./glosses/regex",
  ssh: "./glosses/ssh",
  sourcemap: "./glosses/sourcemap",
  stream: "./glosses/streams",
  system: "./glosses/system",
  task: "@recalibratedsystems/tasks",
  templating: "./glosses/templating",
  text: "./glosses/text",
  util: "./glosses/utils",
  vault: "./glosses/vault",

  // lazify third-party libraries
  async: "async",
  lodash: "lodash",
  tsn: "ts-node",
  tslib: "tslib",
  typescript: "typescript",
  minimist: "minimist",
  path: "upath",
  punycode: "punycode/",
  uri: "urijs",
  semver: "semver",
  systeminformation: "systeminformation"
}, ateos, require, { asNamespace: false });

// mappings
lazify({
  require: "./glosses/module/require",
  requireAddon: "./glosses/module/require_addon",
  sprintf: "./glosses/text/sprintf"
}, ateos, require);

// lazify non-extendable objects in std
lazify({
  constants: "constants"
}, ateos.std, require);

setLazifyErrorHandler((err: any) => {
  //eslint-disable-next-line
  if (ateos.__app__ !== null) {
    ateos.__app__.fireException(err);
    return;
  }
  console.error(err);
});

// Set environment variables
process.env.ATEOS_HOME = ateos.path.join(__dirname, "..");

export default ateos;
