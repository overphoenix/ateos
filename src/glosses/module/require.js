// if (process.env.ATEOS_COVERAGE) {
//     plugins.unshift(
//         "syntax.flow",
//         "syntax.decorators",
//         "syntax.classProperties",
//         "syntax.objectRestSpread",
//         "syntax.functionBind",
//         "syntax.numericSeparator",
//         "syntax.exponentiationOperator",
//         "syntax.exportNamespaceFrom",
//         "syntax.optionalCatchBinding",
//         ateos.js.coverage.plugin
//     );
// }

const mod = new ateos.module.Module(require.main ? require.main.filename : ateos.path.join(process.cwd(), "index.js"), {
  transforms: [
    ateos.module.transform.babel()
  ]
});
const $require = (path) => mod.require(path);
$require.cache = mod.cache;
$require.main = mod;
$require.resolve = (request) => ateos.module.Module._resolveFilename(request, mod);
$require.uncache = (id) => mod.uncache(id);

export default $require;
