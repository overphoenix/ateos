export default class ObjectProperty extends ateos.realm.code.BaseNode {
  constructor(ast, parent, parentScope) {
    super(ast, parent, parentScope);

    this.key = undefined;
    this.value = undefined;
  }
}
