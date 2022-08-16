const {
  realm: { BaseTask },
  rollup
} = ateos;

@ateos.task.Task("rollup")
export default class extends BaseTask {
  async main({ src, options } = {}) {
    await rollup.run({
      silent: true,
      ...options,
      cwd: this.manager.cwd
    });
  }
}
