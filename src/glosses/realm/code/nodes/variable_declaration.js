export default class VariableDeclaration extends ateos.realm.code.BaseNode {
  constructor(ast, parent, parentScope) {
    super(ast, parent, parentScope);

    this.declarations = [];
  }
}
