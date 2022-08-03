exports = module.exports = ateos.asNamespace(require("acorn"));

ateos.lazify({
  isReference: "is-reference",
  plugin: () => ateos.lazify({
    dynamicImport: "acorn-dynamic-import",
    jsx: "acorn-jsx"
  })
}, exports);
