const {
  is
} = ateos;

export default class XClass extends ateos.realm.code.Base {
  constructor(options) {
    super(options);
    this.superClassName = null;
    if (!ateos.isNull(this.ast)) {
      if (!ateos.isNull(this.ast.id)) {
        this.name = this.ast.id.name;
      }

      if (!ateos.isNull(this.ast.superClass)) {
        const node = this.ast.superClass;
        switch (node.type) {
          case "Identifier": {
            const globalObject = this.xModule.getGlobal(node.name);
            if (!ateos.isUndefined(globalObject)) {
              this.superClassName = globalObject.full;
            }
            break;
          }
          case "MemberExpression": {
            break;
          }
          default:
            throw new ateos.error.UnknownException(`Unknown super class type: ${node.type}`);
        }
      }
    } else {
      this.name = null;
    }
  }

  getType() {
    return "Class";
  }

  references() {
    super.references();
    if (ateos.isString(this.superClassName)) {
      this._addReference(this.superClassName);
    }
    return this._references;
  }
}
