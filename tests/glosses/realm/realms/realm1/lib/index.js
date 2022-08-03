const {
    task: { task },
    realm
} = ateos;

@task("task1")
export class Task1 extends realm.BaseTask {
    main() {
        return "ok";
    }
}

@task("task2")
export class Task2 extends realm.BaseTask {
    main() {
        return ateos.package.version;
    }
}
