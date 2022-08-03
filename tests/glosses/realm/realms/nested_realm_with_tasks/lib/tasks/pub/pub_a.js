const {
    task: { task },
    realm: { BaseTask }
} = ateos;

@task("pubA")
export default class PubTaskA extends BaseTask {
    main() {
        return "pub aaa";
    }
}
