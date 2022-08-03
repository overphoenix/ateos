const {
    task: { task },
    realm: { BaseTask }
} = ateos;

@task("dummy")
export default class DummyTask extends BaseTask {
    main() {
        return "root dummy";
    }
}
