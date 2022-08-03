export default class ObjectPattern extends ateos.realm.code.BaseNode {
  constructor(ast, parent, parentScope) {
    super(ast, parent, parentScope);

    this.properties = [];
  }

  addProperty(prop) {
    this.properties.push(prop);
  }
}
