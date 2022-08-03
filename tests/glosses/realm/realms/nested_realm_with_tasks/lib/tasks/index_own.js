const {
    task: { task },
    realm: { BaseTask }
} = ateos;

@task("ownA")
export class OwnTaskA extends BaseTask {
    main() {
        return "own aaa";
    }
}

@task("ownB")
export class OwnTaskB extends BaseTask {
    main() {
        return "own bbb";
    }
}
