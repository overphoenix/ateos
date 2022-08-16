export default class XNative extends ateos.realm.code.Base {
  constructor(options) {
    super(options);
    if (ateos.ateos.isString(options.name)) {
      this.name = options.name;
    }
  }

  getType() {
    return "Native";
  }
}
