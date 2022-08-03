const {
  realm: { code }
} = ateos;

export default class ModuleScope extends code.Scope {
  constructor(module) {
    super(/*module.ast.program.body*/);
    this.module = module;
  }
}
