const {
  is,
  js: { parse, compiler: { generate } },
  realm
} = ateos;

const jsNatives = ["Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"];

export default class XBase {
  constructor({
    xModule = this, // ??
    parent = null,
    code = null,
    ast = null,
    path = null,
    type = "script"
  } = {}) {
    // if (ateos.isNil(xModule) && !realm.code.isModule(this)) {
    //     throw new ateos.error.NotValidException("XModule cannot be null");
    // }
    this.xModule = xModule;
    this.parent = parent;
    this.code = code;
    this.type = type;
    this.ast = ast;
    this.path = path;
    this.scope = [];
    this._references = [];
    this._scopedReferences = [];

    this.init();
  }

  getType() {
    return "Base";
  }

  init() {
    if (ateos.isNull(this.ast) && ateos.isString(this.code)) {
      this.parse();
    } else if (!ateos.isNull(this.ast) && ateos.isNull(this.code)) {
      this.generate();
    }
  }

  addToScope(xObj) {
    this.scope.push(xObj);
  }

  getInmoduleReference(name) {
    for (const xObj of this.xModule.scope) {
      if (ateos.isString(xObj.name) && xObj.name === name) {
        return xObj;
      }
    }
  }

  parse() {
    this.ast = parse(this.code, {
      sourceType: this.type,
      plugins: [
        ["decorators", { decoratorsBeforeExport: false }],
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "numericSeparator",
        "partialApplication"
      ]
    });
  }

  references() {
    if (!ateos.isNull(this.path) && !["VariableDeclarator"].includes(this.ast.type)) {
      // Clear array
      this._references.length = 0;

      // Traverse references
      this.path.traverse({
        Identifier: (path) => {
          const node = path.node;
          const name = node.name;
          if (ateos.isUndefined(name)) {
            return;
          }
          const xObj = this.getInmoduleReference(name);
          if (!ateos.isUndefined(xObj)) {
            this._scopedReferences.push(xObj);
          } else {
            const globalObject = this.xModule.getGlobal(name);
            if (!ateos.isUndefined(globalObject)) {
              this._addReference(globalObject.full);
            }
          }
        },
        MemberExpression: (path) => {
          if (path.node.computed) {
            return;
          }
          const node = path.node;
          const name = this._getMemberExpressionName(node);
          const parts = name.split(".");
          const globalObject = this.xModule.getGlobal(parts[0]);
          if (!ateos.isUndefined(globalObject)) {
            if (parts.length > 1) {
              const fullName = `${globalObject.full}.${parts.slice(1).join(".")}`;
              const { namespace, objectName } = this.xModule.codeLayout.parseName(fullName);
              if (namespace === "") {
                this._addReference(parts[0]);
              } else {
                this._addReference(`${namespace}.${objectName.split(".")[0]}`);
              }
            } else {
              this._addReference(name);
            }
          }
          path.skip();
        }
      });
    }
    return this._references;
  }

  createXObject({ ast, path = null, kind, xModule = null } = {}) {
    let xObj = null;
    const parent = this;
    switch (ast.type) {
      case "ExportDefaultDeclaration":
      case "ExportNamedDeclaration":
        xObj = new realm.code.Export({ parent, ast, path, xModule });
        break;
      case "VariableDeclaration": {
        if (ast.declarations.length > 1) {
          throw new SyntaxError("Detected unsupported declaration of multiple variables.");
        }
        let xObj = null;
        path.traverse({
          enter: (subPath) => {
            xObj = this.createXObject({ ast: subPath.node, path: subPath, kind: ast.kind, xModule });
            subPath.stop();
          }
        });
        return xObj;
      }
      case "VariableDeclarator": {
        xObj = new realm.code.Variable({ parent, ast, path, xModule });
        xObj.kind = kind;
        break;
      }
      case "MemberExpression":
      case "NewExpression":
      case "ArrayExpression":
      case "BinaryExpression":
      case "ConditionalExpression":
      case "CallExpression":
      case "LogicalExpression":
      case "UnaryExpression":
      case "UpdateExpression": xObj = new realm.code.Expression({ parent, ast, path, xModule }); break;
      case "StringLiteral":
      case "NumericLiteral":
      case "RegExpLiteral":
      case "TemplateLiteral":
      case "NullLiteral":
      case "BooleanLiteral": xObj = new realm.code.Constant({ parent, ast, path, xModule }); break;
      case "ExpressionStatement":
      case "BlockStatement":
      case "EmptyStatement":
      case "DebuggerStatement":
      case "WithStatement":
      case "ReturnStatement":
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
      case "IfStatement":
      case "SwitchStatement":
      case "SwitchCase":
      case "ThrowStatement":
      case "TryStatement":
      case "CatchClause":
      case "WhileStatement":
      case "DoWhileStatement":
      case "ForStatement":
      case "ForInStatement":
      case "ForOfStatement":
      case "ForAwaitStatement": xObj = new realm.code.Statement({ parent, ast, path, xModule }); break;
      case "ClassDeclaration": xObj = new realm.code.Class({ parent, ast, path, xModule }); break;
      case "FunctionDeclaration": xObj = new realm.code.Function({ parent, ast, path, xModule }); break;
      case "FunctionExpression": xObj = new realm.code.Function({ parent, ast, path, xModule }); break;
      case "ArrowFunctionExpression": xObj = new realm.code.ArrowFunction({ parent, ast, path, xModule }); break;
      case "ObjectExpression": xObj = new realm.code.Object({ parent, ast, path, xModule }); break;
      case "ObjectProperty": xObj = new realm.code.ObjectProperty({ parent, ast, path, xModule }); break;
      case "ObjectMethod": xObj = new realm.code.ObjectMethod({ parent, ast, path, xModule }); break;
      case "Identifier": {
        if (ast.name === "ateos") {
          xObj = new realm.code.Ateos({ ast, path, xModule });
        } else {
          xObj = this.lookupInGlobalScope(ast.name);
          if (ateos.isNull(xObj)) {
            xObj = this._tryJsNative({ ast, path, xModule });
            if (ateos.isNull(xObj)) {
              throw new ateos.error.NotFoundException(`Variable '${ast.name}' not found in global scope`);
            }
          } else {
            xObj = xObj.value;
          }
        }
        break;
      }
      case "ImportDeclaration": xObj = new realm.code.ImportDeclaration({ parent, ast, path, xModule }); break;
      default:
        throw new ateos.error.UnknownException(`Unknown type: ${ast.type}`);
    }
    return xObj;
  }

  generate() {
    const generated = generate(this.ast, {
      comments: false,
      quotes: "double"
    });
    this.code = generated.code;
  }

  lookupInGlobalScope(name) {
    for (const xObj of this.xModule.scope) {
      const node = xObj.ast;
      if (!ateos.isNull(node)) {
        switch (node.type) {
          case "VariableDeclarator": {
            if (xObj.name === name) {
              return xObj;
            }
            break;
          }
          case "ClassDeclaration": {
            if (node.id.name === name) {
              return xObj;
            }
            break;
          }
        }
      } else if (realm.code.isNative(xObj)) {
        if (xObj.name === name) {
          return xObj;
        }
      }
    }
    return null;
  }

  getPathFor(path, node) {
    let foundPath = null;
    let isDone = false;

    path.traverse({
      enter: (subPath) => {
        if (isDone) {
          return;
        }
        if (subPath.node === node) {
          foundPath = subPath;
          isDone = true;
        }
      }
    });

    return foundPath;
  }

  _getMemberExpressionName(node) {
    let prefix;
    const type = node.object.type;
    if (type === "MemberExpression") {
      prefix = this._getMemberExpressionName(node.object);
    } else if (type === "Identifier") {
      return `${node.object.name}.${node.property.name}`;
    }

    if (ateos.isUndefined(prefix)) {
      return node.property.name;
    }
    return `${prefix}.${node.property.name}`;

  }

  _tryJsNative({ ast, path, xModule }) {
    if (jsNatives.includes(ast.name)) {
      return new realm.code.JsNative({ ast, path, xModule });
    }
    return null;
  }

  _addReference(name) {
    const { objectName } = this.xModule.codeLayout.parseName(name);
    if (objectName.length > 0 && !this._references.includes(name)) {
      this._references.push(name);
    }
  }
}
