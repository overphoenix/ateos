const {
  path,
  fs
} = ateos;

export default {
  options: {
    tests: "tests/{app,glosses}/**/*.test.js",
    first: false,
    timeout: 30000,
    showHandles: false,
    dontUseConfig: false,
    dontUseMap: false,
    itself: false,
    allTimings: false,
    timers: false,
    showHooks: false,
    keepHooks: false,
    simple: false,
    minimal: false,
    callGc: true
  },
  transpiler: {
    plugins: ateos.module.BABEL_PLUGINS,
    compact: false
  },
  mapping: async (p) => {
    if (await fs.pathExists(p)) {
      return p;
    }

    const parts = p.split(".");
    const prefix = path.resolve(__dirname, "tests", ...parts);

    if (await fs.pathExists(`${prefix}.test.js`)) {
      return `${prefix}.test.js`;
    }

    if (await fs.pathExists(prefix)) {
      return path.join(prefix, "**", "*.test.js");
    }

    return [
      path.join(`${prefix}*.test.js`),
      path.join(`${prefix}*`, "**", "*.test.js")
    ];
  }
};
