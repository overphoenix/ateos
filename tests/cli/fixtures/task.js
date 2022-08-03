const {
    task
} = ateos;

export default class extends task.Task {
    async run() {
        await ateos.promise.delay(10);
        console.log(`ateos v${ateos.package.version}`);
    }
}
