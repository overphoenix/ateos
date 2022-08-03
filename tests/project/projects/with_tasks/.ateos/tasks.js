const {
    project
} = ateos;

class Task1 extends project.BaseTask {
    main() {
        return "ok";
    }
}

class Task2 extends project.BaseTask {
    main() {
        return ateos.package.version;
    }
}

ateos.lazify({
    task1: () => Task1,
    task2: () => Task2
}, exports);
