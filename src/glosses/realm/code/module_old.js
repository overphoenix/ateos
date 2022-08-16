const {
  error,
  is,
  fs,
  js: { compiler: { traverse } },
  realm,
  std: { assert, path }
} = ateos;

/**
 * The task is to collect all usages of ateos from a file
 *
 * The strategy for bindings is to rename all of them and encapsulate into the name which ateos object each of them represents
 * For direct ateos usages (ateos.ateos.isNumber(1)) we can just take member expressions
 */
class AteosDependencyCollector {
  constructor(dependencies = new Map()) {
    this.dependencies = dependencies;
  }

  /**
     * Generates a variable name to ateos path
     *
     * Private objects are encoded with # prefix
     * ateos.database.#redis.commands means ateos.getPrivate(ateos.database.redis).commands
     */
  ateosPathToId(p, scope, isPrivate) {
    // TODO: collisions???
    if (isPrivate) {
      // preprend # to the last part, which means that we use the private part of p
      const i = p.lastIndexOf(".");
      if (i === -1) {
        p = `#${p}`;
      } else {
        p = `${p.slice(0, i + 1)}#${p.slice(i + 1)}`;
      }
    }
    const id = `$ATEOS$${ateos.data.base58.encode(Buffer.from(p))}$`;
    const node = scope.generateUidIdentifier(id);
    return node.name;
  }

  /**
     * Decodes a variable name from the above function to an ateos path
     */
  decodeAteosPath(name) {
    let i = 0;
    while (name[i] === "_") { // prefixed _
      ++i;
    }
    if (name.slice(i, i + 7) !== "$ATEOS$") {
      return null;
    }
    const j = name.lastIndexOf("$");
    const encoded = name.slice(i + 7, j);
    return ateos.data.base58.decode(encoded).toString();
  }

  /**
     * Constructs a string from MemberExpression, also handles encoded ateos vars
     */
  compactMemberExpression(node) {
    if (node.object.type === "Identifier") {
      if (node.property.type === "PrivateName") {
        return null;
      }
      const name = this.decodeAteosPath(node.object.name) || node.object.name;
      if (node.computed) {
        return {
          value: name,
          hasComputedValue: true
        };
      }
      assert.equal(node.property.type, "Identifier");
      return {
        value: `${name}.${node.property.name}`,
        hasComputedValue: false
      };
    }

    if (node.object.type !== "MemberExpression") {
      return null;
    }

    const nested = this.compactMemberExpression(node.object);

    if (ateos.isNull(nested)) {
      return null;
    }

    if (nested.hasComputedValue || node.computed) {
      return {
        value: nested.value,
        hasComputedValue: true
      };
    }

    assert.equal(node.property.type, "Identifier");

    return {
      value: `${nested.value}.${node.property.name}`,
      hasComputedValue: false
    };
  }

  /**
     * Convers a node to ateos path
     * Works with identifiers and member expressions, handles encoded ateos vars
     */
  nodeToAteosPath(node) {
    switch (node.type) {
      case "Identifier": {
        const { name } = node;

        if (name === "ateos") {
          return {
            value: "ateos",
            hasComputedValue: false
          };
        }

        // handle mapped ateos identifier
        const v = this.decodeAteosPath(name);

        if (ateos.isNull(v)) {
          return null;
        }

        return {
          value: v,
          hasComputedValue: false
        };
      }
      case "MemberExpression": {
        const v = this.compactMemberExpression(node);
        if (ateos.isNull(v)) {
          return null;
        }
        if (v.value.startsWith("ateos")) {
          return {
            value: v.value,
            hasComputedValue: v.hasComputedValue
          };
        }
        return null;
      }
      default:
        return null;
    }
  }

  collectValuesFromObjectPattern(node, prefix, vals = []) {
    for (const prop of node.properties) {
      const { value, key } = prop;

      if (prop.computed) {
        throw new error.IllegalStateException("Expected object pattern not to have computed values");
      }

      if (key.type !== "Identifier") {
        throw new error.IllegalStateException(`Expected object pattern key type to be Identifier but got: ${key.type}`);
      }

      const p = `${prefix}.${key.name}`;

      switch (value.type) {
        case "Identifier": {
          /**
                     * const { is } = ateos;
                     * const { is: is2 } = ateos.smth;
                     */
          vals.push({
            path: p,
            binding: value.name
          });
          break;
        }
        case "ObjectPattern": {
          /**
                     * const { a: { b } } = ateos;
                     */
          this.collectValuesFromObjectPattern(value, p, vals);
        }
                // TODO: ArrayPattern ???
      }
    }
    return vals;
  }

  /**
     * Adds a new dependency to the map
     */
  mergeDep(p) {
    if (!this.dependencies.has(p.value)) {
      this.dependencies.set(p.value, {
        hasComputedValue: p.hasComputedValue
      });
    } else if (p.hasComputedValue) {
      this.dependencies.get(p.value).hasComputedValue = true;
    }
  }

  handle(ast) {
    // have to clone the ast beacuse we are going to modify it..
    ast = ateos.util.clone(ast, { nonPlainObjects: true });
    // rename all ateos bindings to track them easely
    ateos.js.compiler.traverse(ast, {
      VariableDeclarator: (path) => {
        const { node } = path;

        if (ateos.isNull(node.init)) {
          return;
        }

        const p = this.nodeToAteosPath(node.init);

        if (ateos.isNull(p)) {
          return;
        }

        if (p.hasComputedValue) {
          // throw new error.IllegalStateException("Expected ateos vars not to have computed properties");
        }

        switch (node.id.type) {
          case "Identifier": {
            /**
                         * 1. Simple case like
                         *
                         * const is = ateos.is;
                         */
            path.scope.rename(node.id.name, this.ateosPathToId(p.value, path.scope));
            break;
          }
          case "ObjectPattern": {
            /**
                         * 2. More complex case
                         *
                         * const { is } = ateos;
                         * const { http } = ateos.net;
                         * const { net: { http, ws: _ws } } = ateos;
                         */
            const vals = this.collectValuesFromObjectPattern(node.id, p.value);
            for (const val of vals) {
              path.scope.rename(val.binding, this.ateosPathToId(val.path, path.scope));
            }
          }
        }
        path.skip();
      }
    });

    // handle private bindings
    // after all renamings
    ateos.js.compiler.traverse(ast, {
      VariableDeclarator: (path) => {
        const { node } = path;

        if (ateos.isNull(node.init)) {
          return;
        }

        // ateos.getPrivate call
        if (node.init.type !== "CallExpression") {
          return;
        }
        const p = this.nodeToAteosPath(node.init.callee);
        if (ateos.isNull(p)) {
          return;
        }
        switch (p.value) {
          case "ateos.getPrivate": {
            const target = this.nodeToAteosPath(node.init.arguments[0]);
            if (ateos.isNull(target)) {
              return; // wtf?
            }
            path.scope.rename(node.id.name, this.ateosPathToId(target.value, path.scope, true));
            break;
          }
        }
      }
    });

    // then collect identifiers with member expressions

    const collect = (path) => {
      const { node } = path;
      const p = this.nodeToAteosPath(node);
      path.skip();
      if (ateos.isNull(p)) {
        return;
      }

      // TODO: bad things happen when some namespace is returned from a function
      // const f = () => ateos.is;
      // here we lose tracking
      // we have to avoid such things in the source code
      this.mergeDep(p);
    };

    ateos.js.compiler.traverse(ast, {
      Identifier: collect,
      MemberExpression: collect
    });
  }
}

export default class XModule extends realm.code.Base {
  constructor({
    realm: r = ateos.realm.rootRealm,
    nsName = "global",
    code = null,
    filePath = "index.js"
  } = {}) {
    super({ code, type: "module" });
    this.realm = r;
    this.codeLayout = new realm.code.CodeLayout(r);
    this.nsName = nsName;
    this.xModule = this;
    this.filePath = path.resolve(r.cwd, filePath);
    this._exports = {};
    this.globals = [
      {
        name: "global",
        full: "global",
        isNamespace: true
      },
      {
        name: "ateos",
        full: "ateos",
        isNamespace: true
      }
    ];
    this.lazies = new Map();
  }

  getType() {
    return "Module";
  }

  async load() {
    try {
      this.code = await fs.readFile(this.filePath, { check: true, encoding: "utf8" });
    } catch (err) {
      throw new error.IllegalStateException(`Could not load the module: ${err.message}`);
    }
    this.init();

    const lazies = [];
    const imports = [];
    const basePath = path.dirname(this.filePath);


    traverse(this.ast, {
      ImportDeclaration(path) {
        const { node } = path;
        imports.push({
          path: ateos.path.join(basePath, node.source.value),
          names: node.specifiers.map((x) => {
            if (x.type === "ImportDefaultSpecifier") {
              return {
                local: x.local.name,
                isDefault: true
              };
            }
            if (x.type === "ImportNamespaceSpecifier") {
              return {
                local: x.local.name,
                isNamespace: true
              };
            }
            return {
              imported: x.imported.name,
              local: x.local.name
            };
          })
        });
      }
    });

    for (const { names, path } of imports) {
      const filePath = await fs.lookup(path);
      const importedModule = new realm.code.Module({ realm: this.realm, nsName: this.nsName, filePath });
      await importedModule.load();

      const exports = importedModule.exports();
      for (const name of names) {
        if (name.isNamespace) {
          continue;
        }
        const obj = name.isDefault ? exports.default : exports[name.imported];
        // here we have to clone obj or decorate it somehow
        // TODO: better impl
        this.addToScope(new Proxy(obj, {
          get(target, key) {
            if (key === "name") {
              return name.exported;
            }
            return target[key];
          }
        }));
        // this._addGlobal(name, null, node.kind, false);
      }
    }

    traverse(this.ast, {
      enter: (path) => {
        const nodeType = path.node.type;
        if (nodeType === "Program") {
          return;
        } else if (
          (
            nodeType === "ExpressionStatement"
                        && this._isLazifier(path.node.expression))
                    || (
                      nodeType === "VariableDeclaration"
                        && this._isLazifier(path.node.declarations[0].init)
                    )
        ) {
          // Process ateos lazyfier
          const callExpr = nodeType === "ExpressionStatement"
            ? path.node.expression
            : path.node.declarations[0].init;

          let targetInfo = realm.code.nodeInfo(callExpr.arguments[1]);

          if (targetInfo === "CallExpression") {
            // ateos.lazify({}, ateos.asNamespace(exports), require);
            const {
              callee: target,
              arguments: args
            } = callExpr.arguments[1];
            if (
              target.type === "MemberExpression"
                            && target.object.type === "Identifier"
                            && target.property.type === "Identifier"
                            && args.length === 1
                            && args[0].type === "Identifier"
                            && target.object.name === "ateos"
                            && target.property.name === "asNamespace"
                            && args[0].name === "exports"
            ) {
              // TODO: it can be done better
              targetInfo = "Identifier:exports"; // just reassign
            }
          }
          if (
            realm.code.nodeInfo(callExpr.arguments[0]) === "ObjectExpression"
                        && targetInfo.startsWith("Identifier:")
                        && realm.code.nodeInfo(callExpr.arguments[2]) === "Identifier:require"
          ) {

            const props = callExpr.arguments[0].properties;

            if (targetInfo === "Identifier:exports") {
              for (const prop of props) {
                const name = prop.key.name;
                const fullName = `${this.nsName}.${name}`;
                const { namespace, objectName } = this.codeLayout.parseName(fullName);
                if (namespace === this.nsName) {
                  if (prop.value.type === "StringLiteral") {
                    lazies.push({ name: objectName, path: ateos.path.join(basePath, prop.value.value) });
                  } else if (prop.value.type === "ArrowFunctionExpression") {
                    const lazyPath = this.getPathFor(path, prop.value);
                    this.lazies.set(objectName, new realm.code.LazyFunction({
                      parent: this,
                      ast: prop.value,
                      path: lazyPath,
                      xModule: this
                    }));
                  }
                }
              }
            } else {
              const xObj = this.lookupInGlobalScope(targetInfo.split(":")[1]);
              if (realm.code.isObject(xObj)) {
                for (const prop of props) {
                  const name = prop.key.name;
                  if (prop.value.type === "StringLiteral") {
                    throw new ateos.error.NotImplementedException("Not implemented yet");
                    // lazies.push({ name: objectName, path: path.join(basePath, prop.value.value) });
                  } else if (prop.value.type === "ArrowFunctionExpression") {
                    const lazyPath = this.getPathFor(path, prop.value);
                    xObj.value.set(name, new realm.code.LazyFunction({ parent: this, ast: prop.value, path: lazyPath, xModule: this }));
                  }
                }
              }
              // TODO
              // throw new ateos.error.NotValidException(`Not valid attempt to lazify non-object: ${xObj.ast.type}`);
            }
            path.skip();
            return;
          }
        }

        let isDefault = undefined;
        let xObj = null;
        let shouldSkip = false;
        const expandDeclaration = (realPath) => {
          const node = realPath.node;

          if (["ExportDefaultDeclaration", "ExportNamedDeclaration"].includes(node.type)) {
            isDefault = (node.type === "ExportDefaultDeclaration");

            if (ateos.isArray(node.specifiers) && node.specifiers.length > 0) {
              shouldSkip = true;
              for (const specifier of node.specifiers) {
                xObj = this.lookupInGlobalScope(specifier.local.name);
                if (ateos.isNull(xObj)) {
                  throw new ateos.error.NotFoundException(`Variable '${specifier.local.name}' not found in global scope`);
                }
                if (specifier.local.name !== specifier.exported.name) {
                  switch (specifier.exported.name) {
                    // we cannot use reserved words as a variable name
                    // we use "export { null_ as null }" for example
                    case "null":
                    case "undefined":
                    case "function":
                    case "class":
                    case "finally":
                      break;
                    default:
                      throw new ateos.error.NotValidException(`Local name of export-specifier should be same as exported name: "${specifier.local.name}" != ${specifier.exported.name}`);
                  }
                }
                // It should always be VariableDeclarator (ClassDeclarations???)
                // assert.equal(xObj.ast.type, "VariableDeclarator");
                this._addExport(xObj.value, false, xObj.ast, specifier.exported.name);
              }
            } else {
              let subPath;
              realPath.traverse({
                enter(p) {
                  subPath = p;
                  p.stop();
                }
              });
              return expandDeclaration(subPath);
            }
          } else if (node.type === "VariableDeclaration") {
            if (node.declarations.length > 1) {
              throw new SyntaxError("Detected unsupported declaration of multiple variables.");
            }
            const declrNode = node.declarations[0];
            if (!ateos.isNull(declrNode.init) && declrNode.init.type === "CallExpression" && declrNode.init.callee.type === "MemberExpression") {
              const exprName = this._getMemberExpressionName(declrNode.init.callee);
              if (exprName === "ateos.requireAddon") {
                shouldSkip = true;
                if (declrNode.id.type === "Identifier") {
                  const name = declrNode.id.name;
                  this.addToScope(new realm.code.Native({ name, parent: this, ast: null, path: null, xModule: this }));
                  this._addGlobal(name, null, node.kind, false);
                } else if (declrNode.id.type === "ObjectPattern") {
                  const natives = this._traverseObjectPattern(declrNode.id, node.kind);
                  for (const name of natives) {
                    this.addToScope(new realm.code.Native({ name, parent: this, ast: null, path: null, xModule: this }));
                    this._addGlobal(name, null, node.kind, false);
                  }
                }
                return realPath;
              }
            }

            this._traverseVariableDeclarator(declrNode, node.kind);

            if (!ateos.isNull(declrNode.init) && declrNode.init.type === "Identifier") {
              shouldSkip = true;
            } else {
              realPath.traverse({
                enter(subPath) {
                  realPath = subPath;
                  subPath.stop();
                }
              });
            }
          }

          return realPath;
        };

        const realPath = expandDeclaration(path);

        if (!shouldSkip) {
          const node = realPath.node;

          if (ateos.isNull(xObj)) {
            const xObjData = {
              ast: node,
              path: realPath,
              xModule: this
            };
            if (nodeType === "VariableDeclaration") {
              xObjData.kind = path.node.kind;
            }
            xObj = this.createXObject(xObjData);
            // Add to scope only declarations.
            if (
              node.type.endsWith("Declarator")
                            || ["VariableDeclaration", "ClassDeclaration", "FunctionDeclaration"].includes(node.type)
            ) {
              this.addToScope(xObj);
            }
          }
          if (!ateos.isUndefined(isDefault)) {
            // export default ateos.asNamespace(identifier);
            // TODO
            this._addExport(xObj, isDefault, node);
          }
        } else if (nodeType === "ExportNamedDeclaration") {
          const node = realPath.node;

          if (ateos.isNull(xObj)) {
            const xObjData = {
              ast: node,
              path: realPath,
              xModule: this
            };
            if (node.type === "VariableDeclaration") {
              xObjData.kind = node.kind;
            }
            xObj = this.createXObject(xObjData);
            // Add to scope only declarations.
            if (
              node.type.endsWith("Declarator")
                            || ["VariableDeclaration", "ClassDeclaration", "FunctionDeclaration"].includes(node.type)
            ) {
              this.addToScope(xObj);
            }
          }
          if (!ateos.isUndefined(isDefault)) {
            // export default ateos.asNamespace(identifier);
            // TODO
            this._addExport(xObj, isDefault, node);
          }
        }

        path.skip();
      }
    });

    if (lazies.length > 0) {
      for (const { name, path } of lazies) {
        const filePath = await fs.lookup(path);
        const lazyModule = new realm.code.Module({ realm: this.realm, nsName: this.nsName, filePath });
        await lazyModule.load();
        this.lazies.set(name, lazyModule);
      }
    }
  }

  exports() {
    const result = {};

    for (const [name, val] of Object.entries(this._exports)) {
      if (realm.code.isVariable(val)) {
        result[name] = val.value;
      } else if (realm.code.isClass(val) || realm.code.isFunctionLike(val)) {
        result[name] = val;
      }
    }
    for (const [name, lazy] of this.lazies.entries()) {
      if (realm.code.isModule(lazy)) {
        if (ateos.isUndefined(lazy.exports().default)) { // special case
          result[name] = lazy;
        } else {
          const modExports = XModule.lazyExports(lazy);
          const keys = Object.keys(modExports);
          if (keys.length === 1 && keys[0] === "undefined") { // case when modules exports anonymous function
            result[name] = modExports.undefined;
          } else {
            Object.assign(result, modExports);
          }
        }
      } else if (realm.code.isLazyFunction(lazy)) {
        result[name] = lazy;
      }
    }
    return result;
  }

  numberOfExports() {
    return Object.keys(this.exports()).length;
  }

  /**
     * Populates the collector with self ast
     */
  _getSelfAteosDependencies(collector) {
    collector.handle(this.ast);
  }

  /**
     * Returns a map of ateos dependencies related only to this file
     */
  getSelfAteosDependencies() {
    // TODO: do not return self in deps??
    const collector = new AteosDependencyCollector();
    this._getSelfAteosDependencies(collector);
    return collector.dependencies;
  }

  /**
     * Populates the collector with self and lazy/imported/required ast
     */
  _getAteosDependencies(collector) {
    this._getSelfAteosDependencies(collector);
    for (const v of this.lazies.values()) {
      if (v.getType() !== "Module") {
        continue;
      }
      v._getAteosDependencies(collector);
    }
  }

  /**
     * Returna a map of ateos dependencies related to this file and all the lazy loaded/required/imported modules
     */
  getAteosDependencies() {
    // TODO: do not return self in deps??
    const collector = new AteosDependencyCollector();
    this._getAteosDependencies(collector);
    return collector.dependencies;
  }

  lookupInExportsByDeclaration(name) {
    for (const [key, value] of Object.entries(this._exports)) {
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  getGlobal(name) {
    return this.globals.find((g) => (g.name === name));
  }

  _isLazifier(expr) {
    if (expr.type !== "CallExpression") {
      return false;
    }
    // Special case - ateos lazyfing mechanism
    switch (expr.callee.type) {
      case "Identifier": {
        const g = this.getGlobal(expr.callee.name);
        return !ateos.isUndefined(g) && g.full === "ateos.lazify";
      }
      case "MemberExpression": {
        return this._getMemberExpressionName(expr.callee) === "ateos.lazify";
      }
    }
    return false;
  }

  _traverseVariableDeclarator(node, kind) {
    let prefix = "";
    if (ateos.isNull(node.init)) {
      return this._addGlobal(node.id.name, null, kind, false);
    }
    const initType = node.init.type;
    switch (initType) {
      case "Identifier": prefix = node.init.name; break;
      case "MemberExpression": prefix = this._getMemberExpressionName(node.init); break;
      default: {
        if (node.id.type === "Identifier") {
          return this._addGlobal(node.id.name, null, kind, false);
        }
      }
    }

    if (prefix.length > 0) {
      prefix = `${prefix}.`;
    }

    if (node.id.type === "ObjectPattern") {
      const exprs = this._traverseObjectPattern(node.id, kind);
      for (const expr of exprs) {
        const name = `${prefix}${expr}`;
        const { namespace, objectName } = this.codeLayout.parseName(name);
        if (objectName === "") {
          const parts = namespace.split(".");
          this._addGlobal(parts[parts.length - 1], parts.slice(0, -1).join("."), kind, true);
        } else {
          if (namespace.length === 0 && objectName.indexOf(".") >= 0) {
            const parts = objectName.split(".");
            this._addGlobal(parts[parts.length - 1], parts.slice(0, -1).join("."), kind, false);
          } else {
            this._addReference(name);
            this._addGlobal(objectName, namespace, kind, false);
          }
        }
      }
    }
  }

  _traverseObjectProperty(node, kind) {
    const key = node.key;
    const value = node.value;
    if (key.type === value.type) {
      if (key.start === value.start && key.end === value.end) {
        return [value.name];
      }
      this._addGlobal(value.name, null, kind, false);
      return [key.name];
    } else if (value.type === "ObjectPattern") {
      const result = [];
      const prefix = `${key.name}.`;
      const exprs = this._traverseObjectPattern(value);
      for (const expr of exprs) {
        result.push(`${prefix}${expr}`);
      }
      return result;
    }
  }

  _traverseObjectPattern(node, kind) {
    const result = [];
    for (const prop of node.properties) {
      if (prop.type === "ObjectProperty") {
        const exprs = this._traverseObjectProperty(prop, kind);
        for (const expr of exprs) {
          result.push(expr);
        }
      }
    }
    return result;
  }

  _addGlobal(name, prefix, kind, isNamespace) {
    if (name.length > 0 && !this.globals.map((x) => x.name).includes(name)) {
      const full = ateos.isNull(prefix) ? name : `${prefix}.${name}`;
      this.globals.push({
        name,
        full,
        kind,
        isNamespace
      });
    }
  }

  _addExport(xObj, isDefault, node, exportedName) {
    node = node || xObj.ast;
    let name;
    if (!isDefault) {
      switch (node.type) {
        case "ClassDeclaration": {
          if (ateos.isNull(node.id)) {
            throw new ateos.error.NotValidException("Anonymous class");
          }
          name = node.id.name;
          break;
        }
        case "FunctionDeclaration":
        case "VariableDeclaration":
        case "VariableDeclarator": {
          name = xObj.name;
          break;
        }
        case "Identifier": {
          name = node.name;
          break;
        }
        default:
          throw new ateos.error.NotSupportedException(`Unsupported export type: ${node.type}`);
      }
      if (exportedName) {
        // export { a as null }
        name = exportedName;
      }
    } else {
      name = "default";
    }

    this._exports[name] = xObj;
  }

  static lazyExports(xModule) {
    const rawExports = xModule.exports();
    const result = {};
    // console.log(Object.values(rawExports).map(x => x.ast));
    if (realm.code.isObject(rawExports.default)) {
      for (const [key, val] of rawExports.default.entries()) {
        result[key] = val;
      }
    } else if (realm.code.isFunctionLike(rawExports.default)) {
      // console.log(rawExports.default.name);
      result[rawExports.default.name] = rawExports.default;
    } else if (ateos.isUndefined(rawExports.default)) {
      return rawExports;
    } else {
      throw new ateos.error.NotSupportedException(`Unsupported type '${rawExports.default.ast.type}' of exports: ${xModule.filePath}`);
    }
    return result;
  }
}
