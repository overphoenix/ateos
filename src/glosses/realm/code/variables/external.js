export default class ExternalVariable extends ateos.realm.code.Variable {
  constructor(name, module) {
    super({
      name
    });
    this.module = module;
  }
}
