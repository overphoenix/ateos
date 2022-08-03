const {
  lazify
} = ateos;

exports = module.exports = ateos.asNamespace(require("rollup"));

lazify({
  pluginutils: "@rollup/pluginutils",
  plugin: () => lazify({
    babel: "@rollup/plugin-babel",
    cleanup: "rollup-plugin-cleanup",
    string: ["rollup-plugin-string", "string"],
    commonjs: "@rollup/plugin-commonjs",
    json: "@rollup/plugin-json",
    replace: "@rollup/plugin-replace",
    resolve: "@rollup/plugin-node-resolve",
    typescript: "@rollup/plugin-typescript"
    // postcss: "./postcss",
  }),
  run: "./run"
}, exports, require);
