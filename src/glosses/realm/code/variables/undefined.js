export default class UndefinedVariable extends ateos.realm.code.Variable {
  constructor() {
    super({
      name: "undefined",
      rawValue: undefined
    });
  }
}
