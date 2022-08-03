const {
    task: { task },
    realm: { BaseTask }
} = ateos;

@task("pubB")
export default class PubTaskB extends BaseTask {
    main() {
        return "pub bbb";
    }
}
