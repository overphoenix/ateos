const {
    realm: { BaseTask },
    rollup
} = ateos;

@ateos.task.task("rollup")
export default class extends BaseTask {
    async main({ src, options } = {}) {
        await rollup.run({
            silent: true,
            ...options,
            cwd: this.manager.cwd
		});
    }
}
