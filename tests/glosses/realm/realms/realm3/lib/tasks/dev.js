const {
    realm
} = ateos;

@ateos.task.task("task2")
export default class Task2 extends realm.BaseTask {
    main() {
        return ateos.package.version;
    }
}
