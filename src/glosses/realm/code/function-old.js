const {
  is
} = ateos;

export default class XFunction extends ateos.realm.code.Base {
  constructor(options) {
    super(options);
    if (!is.null(this.ast) && this.ast.id) {
      this.name = this.ast.id.name;
    } else {
      this.name = null;
    }
  }

  getType() {
    return "Function";
  }
}
