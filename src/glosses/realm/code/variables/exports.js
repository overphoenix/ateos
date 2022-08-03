export default class ExportsVariable extends ateos.realm.code.Variable {
  constructor(rawValue) {
    super({
      name: "exports",
      rawValue
    });
  }
}
