module.exports = {
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-partial-application",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-numeric-separator"
  ],
};
