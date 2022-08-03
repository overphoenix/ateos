export default class ModuleVariable extends ateos.realm.code.Variable {
  constructor(rawValue) {
    super({
      name: "module",
      rawValue
    });
  }
}
