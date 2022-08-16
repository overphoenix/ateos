const {
  rollup
} = ateos;

@ateos.task.Task("rollup")
export default class extends ateos.task.AdvancedTask {
  async main({ src, options } = {}) {
    await rollup.run({
      silent: true,
      ...options,
      cwd: this.manager.cwd
    });
  }
}
