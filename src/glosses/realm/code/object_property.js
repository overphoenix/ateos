export default class XObjectProperty extends ateos.realm.code.Base {
  constructor(options) {
    super(options);
    this.name = this.ast.key.name;
  }

  getType() {
    return "ObjectProperty";
  }
}
