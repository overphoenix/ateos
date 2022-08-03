const {
    is,
    promise,
    task: { Task, IsomorphicTask, TaskManager },
    error
} = ateos;

describe("task", () => {
    let manager;

    class SCTask extends Task {
        constructor() {
            super();
            this._runDefer = null;
            this._suspendDefer = null;
            this._cancelDefer = null;
            this.reallySuspended = false;
            this.reallyResumed = false;
        }

        async _run(maxTimeout = 1000) {
            this._maxTicks = maxTimeout / 10;
            this.data = 0;
            this._runDefer = promise.defer();
            this.main();
            return this._runDefer.promise;
        }

        async main() {
            this.reallySuspended = false;
            for (; ;) {
                await promise.delay(10); // eslint-disable-line
                this.data++;
                if (this.data >= this._maxTicks) {
                    this._runDefer.resolve(this.data);
                    return;
                }

                if (!is.null(this._suspendDefer)) {
                    this._suspendDefer.resolve();
                    this.reallyResumed = false;
                    this.reallySuspended = true;
                    return;
                }
                if (!is.null(this._cancelDefer)) {
                    this._runDefer.resolve(this.data);
                    await ateos.promise.delay(300); // eslint-disable-line
                    this._cancelDefer.resolve();
                    return;
                }
            }
        }

        suspend(defer) {
            this._suspendDefer = defer;
        }

        async resume(defer) {
            ateos.promise.delay(200).then(() => {
                this._suspendDefer = null;
                this.main();
                this.reallyResumed = true;
                defer.resolve();
            });
        }

        cancel(defer) {
            this._cancelDefer = defer;
        }
    }

    class SimpleTask extends Task {
        constructor() {
            super();
            this.value = 0;
        }

        async main(value, timeout) {
            this.value++;
            if (is.number(timeout)) {
                await ateos.promise.delay(timeout);
            }
            return value;
        }
    }

    beforeEach(() => {
        manager = new TaskManager();
    });

    it("task prototype", () => {
        const t = new Task();

        assert.isTrue(is.task(t));
        assert.isNull(t.manager);
        assert.isNull(t.observer);
        assert.throws(() => t.manager = undefined, error.ImmutableException);
        assert.throws(() => t.observer = undefined, error.ImmutableException);

        assert.isFunction(t._run);
        assert.isFunction(t.main);
        assert.throws(() => t.main(), error.NotImplementedException);

        assert.isFunction(t.suspend);
        assert.isFunction(t.resume);
        assert.isFunction(t.cancel);
    });

    it("construct manager", () => {
        assert.isTrue(is.taskManager(manager));
        assert.lengthOf(manager.getTaskNames(), 0);
    });

    it("ateos.is.task() should be defined", () => {
        class MyTask extends Task {
        }

        assert.isTrue(ateos.is.task(new MyTask()));
    });

    it("should add only valid task", async () => {
        const InvalidTask1 = null;
        const InvalidTask2 = {};
        class InvalidTask3 {
            main() {
                return "invalid";
            }
        }

        class ValidTask extends Task {
            main() {
                return "ok";
            }
        }

        const invalidTasks = [
            InvalidTask1,
            InvalidTask2,
            InvalidTask3
        ];

        for (const InvalidTask of invalidTasks) {
            const err = await assert.throws(async () => manager.addTask({
                name: "task",
                task: InvalidTask
            })); // eslint-disable-line
            assert.instanceOf(err, error.NotValidException);
        }

        await manager.addTask({
            name: "task",
            task: ValidTask
        });
        assert.sameMembers(manager.getTaskNames(), ["task"]);
    });

    it("task's immutable properties", async () => {
        const props = [
            {
                name: "manager",
                expected: manager,
                createNew: () => new TaskManager()
            },
            {
                name: "observer",
                expected: null,
                createNew: () => ({})
            }
        ];

        class TaskA extends Task {
            main() {
            }
        }

        await manager.addTask({
            name: "task",
            task: TaskA
        });
        const taskA = await manager.getTaskInstance("task");

        for (const prop of props) {
            assert.strictEqual(taskA[prop.name], prop.expected);
            assert.throws(() => taskA[prop.name] = prop.createNew(), error.ImmutableException);
        }
    });

    it("run task", async () => {
        await manager.addTask({
            name: "a",
            task: SimpleTask
        });
        const observer = await manager.run("a", ateos.package.version);
        assert.isTrue(ateos.is.taskObserver(observer));
        assert.isTrue(observer.completed);
        assert.equal(await observer.result, ateos.package.version);
        assert.isTrue(observer.completed);
    });

    it("regular task is stateless", async () => {
        await manager.addTask({
            name: "a",
            task: SimpleTask
        });
        const observer1 = await manager.run("a", ateos.package.version);
        const observer2 = await manager.run("a", ateos.package.version);
        await Promise.all([observer1.result, observer2.result]);
        assert.strictEqual(observer1.task.value, 1);
        assert.strictEqual(observer1.task.value, observer1.task.value);
    });

    it("observer should contain common task information", async () => {
        class TaskA extends Task {
            main() {
                return promise.delay(10);
            }
        }

        await manager.addTask({
            name: "a",
            task: TaskA
        });
        const observer = await manager.run("a", ateos.package.version);
        assert.equal(observer.taskName, "a");
        assert.equal(observer.suspendable, false);
        assert.equal(observer.cancelable, false);
        assert.isTrue(observer.running);
        assert.isFalse(observer.cancelled);
        assert.isFalse(observer.completed);
        assert.isFalse(observer.failed);
        assert.isFalse(observer.finished);
        assert.isFalse(observer.suspended);
        assert.isTrue(is.promise(observer.result));

        await observer.result;
        assert.isFalse(observer.running);
        assert.isTrue(observer.completed);
        assert.isTrue(observer.finished);
    });

    it("observer should contain correct error info for sync task", async () => {
        class TaskA extends Task {
            main() {
                throw new error.RuntimeException("sad");
            }
        }

        await manager.addTask({
            name: "a",
            task: TaskA
        });
        const observer = await manager.run("a", ateos.package.version);
        const err = await assert.throws(async () => observer.result);
        assert.isTrue(observer.failed);
        assert.instanceOf(observer.error, error.RuntimeException);
        assert.instanceOf(err, error.RuntimeException);
    });

    it("observer should contain correct error info for async task", async () => {
        class TaskA extends Task {
            async main() {
                await promise.delay(10);
                throw new error.RuntimeException("sad");
            }
        }

        await manager.addTask({
            name: "a",
            task: TaskA
        });
        const observer = await manager.run("a", ateos.package.version);
        const err = await assert.throws(async () => observer.result);
        assert.isTrue(observer.failed);
        assert.instanceOf(observer.error, error.RuntimeException);
        assert.instanceOf(err, error.RuntimeException);
    });

    it("run async task", async () => {
        class TaskA extends Task {
            async main(version) {
                await promise.delay(10);
                return `ateos ${version}`;
            }
        }

        await manager.addTask({
            name: "a",
            task: TaskA
        });
        const observer = await manager.run("a", ateos.package.version);
        assert.isTrue(observer.running);
        assert.equal(await observer.result, `ateos ${ateos.package.version}`);
        assert.isTrue(observer.completed);
    });

    it("delete nonexisting task", async () => {
        const err = await assert.throws(async () => manager.deleteTask("unknown"));
        assert.instanceOf(err, error.NotExistsException);
    });

    it("delete existing task", async () => {
        class TaskA extends Task {
            main() {
                return 0;
            }
        }

        await manager.addTask({
            name: "a",
            task: TaskA
        });
        assert.sameMembers(manager.getTaskNames(), ["a"]);
        await manager.deleteTask("a");
        assert.lengthOf(manager.getTaskNames(), 0);
    });

    it("delete all tasks", async () => {
        class TasksA extends Task {
            main() { }
        }

        class TasksB extends Task {
            main() { }
        }

        class TasksC extends Task {
            main() { }
        }

        class TasksD extends Task {
            main() { }
        }

        await manager.addTask({ name: "a", task: TasksA });
        await manager.addTask({ name: "b", task: TasksB });
        await manager.addTask({ name: "c", task: TasksC });
        await manager.addTask({ name: "d", task: TasksD });

        assert.sameMembers(manager.getTaskNames(), ["a", "b", "c", "d"]);

        await manager.deleteTask("b");

        assert.sameMembers(manager.getTaskNames(), ["a", "c", "d"]);

        await manager.deleteAllTasks();

        assert.lengthOf(manager.getTaskNames(), 0);
    });

    it("run task once", async () => {
        const observer = await manager.runOnce(SimpleTask, ateos.package.version);
        assert.lengthOf(manager.getTaskNames(), 0);
        assert.isTrue(observer.completed);
        assert.equal(await observer.result, ateos.package.version);
        assert.isTrue(observer.completed);
    });

    it("run async task once", async () => {
        class TaskA extends Task {
            async main(version) {
                await promise.delay(10);
                return `ateos ${version}`;
            }
        }

        const observer = await manager.runOnce(TaskA, ateos.package.version);
        assert.lengthOf(manager.getTaskNames(), 0);
        assert.isTrue(observer.running);
        assert.equal(await observer.result, `ateos ${ateos.package.version}`);
        assert.isTrue(observer.completed);
    });

    it("run deleted but still running task should have thrown", async () => {
        class TaskA extends Task {
            async main(version) {
                await promise.delay(100);
                return `ateos ${version}`;
            }
        }

        await manager.addTask({ name: "a", task: TaskA });
        const observer = await manager.run("a", ateos.package.version);
        await manager.deleteTask("a");
        await assert.throws(async () => manager.run("a", ateos.package.version), error.NotExistsException);

        assert.lengthOf(manager.getTaskNames(), 0);
        assert.isTrue(observer.running);
        assert.equal(await observer.result, `ateos ${ateos.package.version}`);
        assert.isTrue(observer.completed);
    });

    describe("tags", () => {
        class TaskA extends Task {
            main() { }
        }

        class TaskB extends Task {
            main() { }
        }

        class TaskC extends Task {
            main() { }
        }

        class TaskD extends Task {
            main() { }
        }

        it("add tasks with tag", async () => {
            await manager.addTask({ name: "a", task: TaskA });
            await manager.addTask({
                name: "b",
                task: TaskB,
                tag: "group1"
            });

            await manager.addTask({
                name: "c",
                task: TaskC,
                tag: "group2"
            });
            await manager.addTask({
                name: "d",
                task: TaskD,
                tag: "group2"
            });

            assert.sameMembers(manager.getTaskNames(), ["a", "b", "c", "d"]);

            assert.sameMembers(manager.getTasksByTag("group1").map((taskInfo) => taskInfo.name), ["b"]);
            assert.sameMembers(manager.getTasksByTag("group2").map((taskInfo) => taskInfo.name), ["c", "d"]);
        });

        it("delete tasks by tag", async () => {
            await manager.addTask({ name: "a", task: TaskA });
            await manager.addTask({
                name: "b",
                task: TaskB,
                tag: "group1"
            });

            await manager.addTask({
                name: "c",
                task: TaskC,
                tag: "group2"
            });
            await manager.addTask({
                name: "d",
                task: TaskD,
                tag: "group2"
            });

            assert.sameMembers(manager.getTaskNames(), ["a", "b", "c", "d"]);

            await manager.deleteTasksByTag("group2");

            assert.sameMembers(manager.getTaskNames(), ["a", "b"]);
            assert.lengthOf(manager.getTasksByTag("group2"), 0);
        });
    });

    describe("isomorphic tasks", () => {
        class BadTask extends IsomorphicTask {
        }

        class IsomorphicA extends IsomorphicTask {
            main(data) {
                return ateos.typeOf(data);
            }
        }

        it("should throw if #main() is not implemented", async () => {
            await manager.addTask({ name: "bad", task: BadTask });

            await assert.throws(async () => manager.runAndWait("bad", {}), error.NotImplementedException);
        });

        it("throw in #main()", async () => {
            class A extends IsomorphicTask {
                main() {
                    throw new Error("bad bad bad");
                }
            }

            await manager.addTask({ name: "a", task: A });
            await assert.throws(async () => manager.runAndWait("a"), Error, /bad bad bad/);
        });

        it("should throw if pass more then one argument", async () => {
            await manager.addTask({ name: "a", task: IsomorphicA });

            await assert.throws(async () => manager.runAndWait("a", { a: 1 }, { b: 2 }), error.InvalidNumberOfArgumentsException);
        });

        describe("should throw if non-object argument is passed", () => {
            const vars = [
                12,
                "abc",
                String("abc"),
                new Date(),
                /^word/,
                ["a", "b"],
                Task,
                new Map(),
                new Set(),
                new Int16Array(),
                new Error()
            ];

            for (const v of vars) {
                // eslint-disable-next-line no-loop-func
                it(ateos.typeOf(v), async () => {
                    await manager.addTask({ name: "a", task: IsomorphicA });

                    await assert.throws(async () => manager.runAndWait("a", v), error.InvalidArgumentException);
                });
            }
        });

        describe("allowed arguments", () => {
            const allowed = {
                ateos: [ateos],
                global: [global],
                "Object.create(null)": [Object.create(null)],
                "{}": [{}],
                "new Task()": [new Task()],
                null: [null],
                undefined: [undefined]
            };

            for (const [key, val] of Object.entries(allowed)) {
                // eslint-disable-next-line no-loop-func
                it(key, async () => {
                    await manager.addTask({ name: "a", task: IsomorphicA });

                    assert.equal(await manager.runAndWait("a", ...val), ateos.typeOf(val[0]));
                });
            }
        });
    });

    describe("singleton tasks", () => {
        it("correct value of 'manager' property in task", async () => {
            await manager.addTask({
                name: "a",
                task: SimpleTask,
                singleton: true
            });

            const observer = await manager.run("a");
            await observer.result;
            assert.isNotNull(observer.task.manager);
        });

        it("singleton task is stateful", async () => {
            await manager.addTask({
                name: "a",
                task: SimpleTask,
                singleton: true
            });
            const observer1 = await manager.run("a", ateos.package.version);
            const observer2 = await manager.run("a", ateos.package.version);
            await Promise.all([observer1.result, observer2.result]);
            assert.strictEqual(observer1.task.value, 2);
            assert.deepEqual(observer1.task, observer1.task);
        });

        it("deletion of singleton task should be performed immediately", async () => {
            await manager.addTask({
                name: "a",
                task: SimpleTask,
                singleton: true
            });
            const observer = await manager.run("a", ateos.package.version, 100);
            assert.lengthOf(manager.getTaskNames(), 1);
            manager.deleteTask("a");
            assert.lengthOf(manager.getTaskNames(), 0);
            await observer.result;
        });

        it("singleton task cannot be suspendable", async () => {
            await assert.throws(async () => manager.addTask({
                name: "a",
                task: SimpleTask,
                singleton: true,
                suspendable: true
            }), error.NotAllowedException, / suspendable/);
        });

        it("singleton task cannot be cancelable", async () => {
            await assert.throws(async () => manager.addTask({
                name: "a",
                task: SimpleTask,
                singleton: true,
                cancelable: true
            }), error.NotAllowedException, / cancelable/);
        });
    });

    describe("concurrency", () => {
        let counter;
        let inc;

        class TaskA extends Task {
            async main(maxVal, timeout, check) {
                counter++;
                inc++;
                if (maxVal) {
                    assert.isAtMost(inc, maxVal);
                }
                if (check) {
                    assert.equal(counter, inc);
                }
                await promise.delay(timeout);
                inc--;
                return inc;
            }
        }

        class SingletonTask extends Task {
            constructor() {
                super();
                this.inc = 0;
            }

            async main(maxVal, timeout) {
                this.inc++;
                if (maxVal) {
                    assert.isAtMost(this.inc, maxVal);
                }
                await promise.delay(timeout);
                this.inc--;
                return this.inc;
            }
        }

        beforeEach(() => {
            inc = 0;
            counter = 0;
        });

        it("run 10 task instances without cuncurrency", async () => {
            await manager.addTask({ name: "a", task: TaskA });

            const promises = [];
            for (let i = 0; i < 10; i++) {
                const observer = await manager.run("a", 0, 30, true); // eslint-disable-line
                promises.push(observer.result);
            }

            await Promise.all(promises);
        });

        it("concurrency should involve tasks but not creation of observers", async () => {
            await manager.addTask({
                name: "a",
                task: TaskA,
                concurrency: 10
            });

            const observers = [];
            const results = [];
            for (let i = 0; i < 10; i++) {
                const observer = await manager.run("a", 0, 30, true); // eslint-disable-line
                observers.push(observer);
                results.push(observer.result);
            }

            assert.isAtLeast(counter, 10);
            await Promise.all(results);
            assert.strictEqual(counter, 10);
        });

        it("run maximum 3 task instances at a time", async () => {
            await manager.addTask({
                name: "a",
                task: TaskA,
                concurrency: 3
            });

            const promises = [];
            for (let i = 0; i < 100; i++) {
                const observer = await manager.run("a", 3, 50, false); // eslint-disable-line
                promises.push(observer.result);
            }

            await Promise.all(promises);
        });

        it("run singleton task in parallel", async () => {
            await manager.addTask({
                name: "a",
                task: SingletonTask,
                concurrency: 3,
                singleton: true
            });

            const promises = [];
            for (let i = 0; i < 100; i++) {
                const observer = await manager.run("a", 3, 50); // eslint-disable-line
                promises.push(observer.result);
            }

            await Promise.all(promises);
        });
    });

    describe("suspend/resume/cancel", () => {
        it("suspend/resume non suspendable task", async () => {
            await manager.addTask({ name: "a", task: SCTask });
            const observer = await manager.run("a");
            await promise.delay(200);
            await observer.suspend();
            assert.isFalse(observer.suspended);
            assert.equal(await observer.result, 100);
        });

        it("cancel non cancelable task", async () => {
            await manager.addTask({ name: "a", task: SCTask });
            const observer = await manager.run("a");
            await promise.delay(200);
            const err = await assert.throws(async () => observer.cancel());
            assert.instanceOf(err, error.NotAllowedException);
            assert.equal(await observer.result, 100);
            assert.isTrue(observer.completed);
            assert.isFalse(observer.cancelled);
        });

        it("suspend/resume suspendable task", async () => {
            await manager.addTask({
                name: "a",
                task: SCTask,
                suspendable: true
            });
            const observer = await manager.run("a");
            await promise.delay(200);
            await observer.suspend();
            assert.isTrue(observer.task.reallySuspended);
            assert.isTrue(observer.suspended);
            await promise.delay(100);
            await observer.resume();
            assert.isTrue(observer.task.reallyResumed);
            assert.isTrue(observer.running);
            assert.equal(await observer.result, 100);
        });

        it("cancel cancelable task", async () => {
            await manager.addTask({
                name: "a",
                task: SCTask,
                cancelable: true
            });
            const observer = await manager.run("a");
            await promise.delay(200);
            await observer.cancel();
            assert.isTrue(observer.cancelled);
            assert.notEqual(await observer.result, 100);
            assert.isFalse(observer.completed);
        });
    });

    describe("flows", () => {
        const {
            SeriesFlowTask,
            ParallelFlowTask,
            TryFlowTask,
            WaterfallFlowTask,
            RaceFlowTask
        } = ateos.task;

        class TaskA extends Task {
            async main() {
                await promise.delay(10);
                return 1;
            }
        }

        class TaskBadA extends Task {
            async main() {
                await promise.delay(10);
                throw new error.Exception("some error");
            }
        }

        class TaskB extends Task {
            async main(suffix) {
                await promise.delay(10);
                return `suffix-${suffix}`;
            }
        }

        class TaskC extends Task {
            main(suffix) {
                return suffix;
            }
        }

        it("should throw if pass more them one argument", async () => {
            await manager.addTask({ name: "a", task: TaskA });
            await manager.addTask({ name: "b", task: TaskB });
            await manager.addTask({ name: "series", task: SeriesFlowTask });

            await assert.throws(async () => manager.runAndWait("series", {
                args: "ateos",
                tasks: ["a", "b"]
            }, {}), error.InvalidNumberOfArgumentsException);
        });

        it("should throw if pass non object argument", async () => {
            await manager.addTask({ name: "a", task: TaskA });
            await manager.addTask({ name: "b", task: TaskB });
            await manager.addTask({ name: "series", task: SeriesFlowTask });

            await assert.throws(async () => manager.runAndWait("series", ["a", "b"]), error.InvalidArgumentException);
        });

        describe("series", () => {
            it("managed tasks", async () => {
                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "series", task: SeriesFlowTask });

                const observer = await manager.run("series", {
                    args: "ateos",
                    tasks: ["a", "b"]
                });
                assert.deepEqual(await observer.result, [1, "suffix-ateos"]);
            });

            it("managed+unmanaged tasks", async () => {
                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "series", task: SeriesFlowTask });

                const observer = await manager.run("series", {
                    args: "ateos",
                    tasks: ["a", "b", TaskC]
                });
                assert.deepEqual(await observer.result, [1, "suffix-ateos", "ateos"]);
            });

            it("run tasks with separate args", async () => {
                class SomeTask extends Task {
                    main(val) {
                        return val;
                    }
                }

                await manager.addTask({ name: "a", task: SomeTask });
                await manager.addTask({ name: "b", task: SomeTask });
                await manager.addTask({ name: "series", task: SeriesFlowTask });

                const observer = await manager.run("series", {
                    tasks: [
                        { task: "a", args: "ateos" },
                        { task: "b", args: 888 }
                    ]
                });
                assert.deepEqual(await observer.result, ["ateos", 888]);
            });

            it("should stop follow-up tasks is one of the task has thrown", async () => {
                const results = [];
                class TaskA extends Task {
                    main() {
                        results.push(666);
                    }
                }

                class TaskB extends Task {
                    main() {
                        throw new error.RuntimeException("Task error");
                    }
                }

                class TaskC extends Task {
                    main() {
                        results.push(777);
                    }
                }

                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "c", task: TaskC });
                await manager.addTask({ name: "series", task: SeriesFlowTask });

                const observer = await manager.run("series", {
                    tasks: ["a", "b", "c"]
                });
                await assert.throws(async () => observer.result, error.RuntimeException);

                assert.lengthOf(results, 1);
                assert.equal(results[0], 666);
            });

            it("cancel flow with all cancelable tasks", async () => {
                class SCTaskA extends SCTask {
                }

                class SCTaskB extends SCTask {
                }

                await manager.addTask({
                    name: "a",
                    task: SCTaskA,
                    cancelable: true
                });
                await manager.addTask({
                    name: "b",
                    task: SCTaskB,
                    cancelable: true
                });
                await manager.addTask({
                    name: "series",
                    task: SeriesFlowTask,
                    cancelable: true
                });

                const observer = await manager.run("series", {
                    tasks: ["a", "b"]
                });
                await ateos.promise.delay(100);
                assert.isTrue(observer.cancelable);

                await observer.cancel();

                const result = await observer.result;
                assert.lengthOf(result, 1);
                assert.isNumber(result[0]);

                await observer.result;
            });

            it("cancel flow with first non-cancelable task should cancel flow", async () => {
                class TaskA extends Task {
                    async main() {
                        await ateos.promise.delay(1000);
                        return 888;
                    }
                }

                class SCTaskB extends SCTask {
                }

                await manager.addTask({
                    name: "a",
                    task: TaskA
                });
                await manager.addTask({
                    name: "b",
                    task: SCTaskB,
                    cancelable: true
                });
                await manager.addTask({
                    name: "series",
                    task: SeriesFlowTask,
                    cancelable: true
                });

                const observer = await manager.run("series", {
                    tasks: ["a", "b"]
                });
                await ateos.promise.delay(300);
                assert.isTrue(observer.cancelable);

                await ateos.promise.delay(800);

                await observer.cancel();

                const result = await observer.result;
                assert.lengthOf(result, 2);
                assert.equal(result[0], 888);
                assert.isNumber(result[1]);

                await observer.result;
            });
        });

        describe("parallel", () => {
            it("managed tasks", async () => {
                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "parallel", task: ParallelFlowTask });

                const observer = await manager.run("parallel", {
                    args: "ateos",
                    tasks: ["a", "b"]
                });
                assert.deepEqual(await observer.result, {
                    a: 1,
                    b: "suffix-ateos"
                });
            });

            it("managed+unmanaged tasks", async () => {
                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "parallel", task: ParallelFlowTask });

                const observer = await manager.run("parallel", {
                    args: "ateos",
                    tasks: ["a", "b", TaskC]
                });
                assert.deepEqual(await observer.result, {
                    a: 1,
                    b: "suffix-ateos",
                    TaskC: "ateos"
                });
            });

            it("run tasks with separate args", async () => {
                class SomeTask extends Task {
                    main(val) {
                        return val;
                    }
                }

                await manager.addTask({ name: "a", task: SomeTask });
                await manager.addTask({ name: "b", task: SomeTask });
                await manager.addTask({ name: "parallel", task: ParallelFlowTask });

                const observer = await manager.run("parallel", {
                    tasks: [
                        { task: "a", args: "ateos" },
                        { task: "b", args: 888 }
                    ]
                });
                assert.deepEqual(await observer.result, {
                    a: "ateos",
                    b: 888
                });
            });

            it("should not stop follow-up tasks is one of the task has thrown", async () => {
                const results = [];
                class TaskA extends Task {
                    main() {
                        results.push(666);
                    }
                }

                class TaskB extends Task {
                    main() {
                        throw new error.RuntimeException("Task error");
                    }
                }

                class TaskC extends Task {
                    main() {
                        results.push(777);
                    }
                }

                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "c", task: TaskC });
                await manager.addTask({ name: "parallel", task: ParallelFlowTask });

                const observer = await manager.run("parallel", {
                    tasks: ["a", "b", "c"]
                });
                const err = await assert.throws(async () => observer.result);
                assert.instanceOf(err, error.RuntimeException);

                await ateos.promise.delay(300);

                assert.sameMembers(results, [666, 777]);
            });

            it("cancel flow with all cancelable tasks", async () => {
                class SCTaskA extends SCTask {
                }

                class SCTaskB extends SCTask {
                }

                await manager.addTask({
                    name: "a",
                    task: SCTaskA,
                    cancelable: true
                });
                await manager.addTask({
                    name: "b",
                    task: SCTaskB,
                    cancelable: true
                });
                await manager.addTask({
                    name: "parallel",
                    task: ParallelFlowTask,
                    cancelable: true
                });

                const observer = await manager.run("parallel", {
                    tasks: ["a", "b"]
                });
                await ateos.promise.delay(100);
                assert.isTrue(observer.cancelable);

                await observer.cancel();

                const result = await observer.result;
                assert.isNumber(result.a);
                assert.isNumber(result.b);

                await observer.result;
            });

            it("cancel flow with one non-cancelable and one cancelable", async () => {
                class TaskA extends Task {
                    async main() {
                        await ateos.promise.delay(1000);
                        return 888;
                    }
                }

                class SCTaskB extends SCTask {
                }

                await manager.addTask({ name: "a", task: TaskA });
                await manager.addTask({
                    name: "b",
                    task: SCTaskB,
                    cancelable: true
                });
                await manager.addTask({
                    name: "parallel",
                    task: ParallelFlowTask,
                    cancelable: true
                });

                const observer = await manager.run("parallel", {
                    tasks: ["a", "b"]
                });

                await ateos.promise.delay(300);
                assert.isTrue(observer.cancelable);

                await ateos.promise.delay(1000);

                await observer.cancel();

                const result = await observer.result;
                assert.deepEqual(result, {
                    a: 888,
                    b: 100
                });

                await observer.result;
            });

            it.todo("correct process of case when one of non-cancelable task throws", async () => {

            });
        });

        describe("try", () => {
            it("managed tasks", async () => {
                await manager.addTask({ name: "badA", task: TaskBadA });
                await manager.addTask({ name: "b", task: TaskB });
                await manager.addTask({ name: "try", task: TryFlowTask });

                const observer = await manager.run("try", {
                    args: "ateos",
                    tasks: ["badA", "b"]
                });
                assert.equal(await observer.result, "suffix-ateos");
            });

            it("managed+unmanaged tasks", async () => {
                await manager.addTask({ name: "badA", task: TaskBadA });
                await manager.addTask({ name: "try", task: TryFlowTask });

                const observer = await manager.run("try", {
                    args: "ateos",
                    tasks: ["badA", TaskC]
                });
                assert.equal(await observer.result, "ateos");
            });

            it("should throw if all tasks have failed", async () => {
                await manager.addTask({ name: "a", task: TaskBadA });
                await manager.addTask({ name: "b", task: TaskBadA });
                await manager.addTask({ name: "c", task: TaskBadA });
                await manager.addTask({ name: "try", task: TryFlowTask });

                const observer = await manager.run("try", {
                    args: "ateos",
                    tasks: ["a", "b", "c"]
                });
                const err = await assert.throws(async () => observer.result);
                assert.instanceOf(err, error.AggregateException);
            });

            // TODO: add more tests for canceling and other cases
        });

        describe("waterfall", () => {
            class TaskD extends Task {
                async main(num) {
                    return [num, 7];
                }
            }

            class TaskE extends Task {
                async main(num1, num2) {
                    await promise.delay(10);
                    return num1 * num2;
                }
            }

            it("managed tasks", async () => {
                await manager.addTask({ name: "d", task: TaskD });
                await manager.addTask({ name: "e", task: TaskE });
                await manager.addTask({ name: "waterfall", task: WaterfallFlowTask });

                const observer = await manager.run("waterfall", {
                    args: 3,
                    tasks: ["d", "e"]
                });
                assert.equal(await observer.result, 21);
            });

            it("managed+unmanaged tasks", async () => {
                class TaskF extends Task {
                    async main(sum) {
                        await promise.delay(10);
                        return `sum = ${sum}`;
                    }
                }
                await manager.addTask({ name: "d", task: TaskD });
                await manager.addTask({ name: "e", task: TaskE });
                await manager.addTask({ name: "waterfall", task: WaterfallFlowTask });

                const observer = await manager.run("waterfall", {
                    args: 3,
                    tasks: ["d", "e", TaskF]
                });
                const result = await observer.result;
                assert.isTrue(is.string(result));
                assert.equal(result, "sum = 21");
            });
        });

        describe("race", () => {
            class TaskD extends Task {
                async main() {
                    await promise.delay(500);
                    return 3;
                }
            }

            class TaskE extends Task {
                async main() {
                    await promise.delay(300);
                    return 5;
                }
            }

            it("managed tasks", async () => {
                await manager.addTask({ name: "d", task: TaskD });
                await manager.addTask({ name: "e", task: TaskE });
                await manager.addTask({ name: "race", task: RaceFlowTask });

                const observer = await manager.run("race", {
                    tasks: ["d", "e"]
                });
                assert.equal(await observer.result, 5);
            });

            it("managed+unmanaged tasks", async () => {
                class TaskF extends Task {
                    async main() {
                        await promise.delay(100);
                        return 7;
                    }
                }
                await manager.addTask({ name: "d", task: TaskD });
                await manager.addTask({ name: "e", task: TaskE });
                await manager.addTask({ name: "race", task: RaceFlowTask });

                const observer = await manager.run("race", {
                    args: 3,
                    tasks: ["d", "e", TaskF]
                });
                assert.equal(await observer.result, 7);
            });
        });
    });

    it("runSeries() with functions", async () => {
        const { runSeries } = ateos.task;

        const task1 = async () => {
            await ateos.promise.delay(100);
            return 777;
        };

        const task2 = () => {
            return 888;
        };

        const observer = await runSeries(manager, [
            task1,
            task2
        ]);

        assert.deepEqual(await observer.result, [777, 888]);
    });

    it("runParallel() with functions", async () => {
        const { runParallel } = ateos.task;

        const task1 = async () => {
            await ateos.promise.delay(100);
            return 777;
        };

        const task2 = () => {
            return 888;
        };

        const observer = await runParallel(manager, [
            task1,
            task2
        ]);

        const result = await observer.result;
        assert.lengthOf(Object.keys(result), 2);
        assert.sameMembers(Object.values(result), [777, 888]);
    });

    describe("TaskObserver#finally", () => {
        it("finally function should be executed atomically (async)", async () => {
            let val;
            class TaskA extends Task {
                async main() {
                    await promise.delay(100);
                    val = 1;
                }
            }

            await manager.addTask({ name: "a", task: TaskA });
            const observer = await manager.run("a");

            observer.finally(async () => {
                await ateos.promise.delay(100);
                val = 2;
            });
            await observer.result;
            assert.equal(val, 2);
        });

        it("finally function should be executed atomically (async)", async () => {
            let val = 0;
            class TaskA extends Task {
                main() {
                    val = 1;
                }
            }

            await manager.addTask({ name: "a", task: TaskA });
            const observer = await manager.run("a");
            observer.finally(() => {
                val = 2;
            });
            await observer.result;
            assert.equal(val, 2);
        });
    });

    describe("undo", () => {
        it("task's undo method should be executed atomically (async)", async () => {
            const data = [];

            class TaskA extends Task {
                async main() {
                    data.push(1);
                    await promise.delay(100);
                    data.push(2);
                    throw new error.RuntimeException("task error");
                }

                async undo() {
                    await ateos.promise.delay(1000);
                    data.length = 0;
                }
            }

            await manager.addTask({ name: "a", task: TaskA });
            try {
                const observer = await manager.run("a");
                await observer.result;
            } catch (err) {
                assert.lengthOf(data, 0);
            }
        });

        it("task's undo method should be executed atomically (sync)", async () => {
            const data = [];

            class TaskA extends Task {
                main() {
                    data.push(1);
                    data.push(2);
                    throw new error.RuntimeException("task error");
                }

                async undo() {
                    await ateos.promise.delay(1000);
                    data.length = 0;
                }
            }

            await manager.addTask({ name: "a", task: TaskA });
            try {
                const observer = await manager.run("a");
                await observer.result;
            } catch (err) {
                assert.lengthOf(data, 0);
            }
        });
    });

    describe("task notifications", () => {
        class Task1 extends Task {
            async main() {
                this.manager.notify(this, "progress", {
                    value: 0.1,
                    message: "step1"
                });

                await promise.delay(1);

                this.manager.notify(this, "progress", {
                    value: 0.5,
                    message: "step2"
                });

                await promise.delay(1);

                this.manager.notify(this, "progress", {
                    value: 1.0,
                    message: "step3"
                });
            }
        }

        class Task2 extends Task {
            async main() {
                this.manager.notify(this, "p", {
                    value: 0.2,
                    message: "bam1"
                });

                await promise.delay(1);

                this.manager.notify(this, "pro", {
                    value: 0.6,
                    message: "bam2"
                });

                await promise.delay(1);

                this.manager.notify(this, "progre", {
                    value: 0.8,
                    message: "bam3"
                });
            }
        }

        it("add same observer second time shoud have thrown", async () => {
            const observer = () => { };
            manager.onNotification("progress", observer);
            assert.throws(() => manager.onNotification("progress", observer), error.ExistsException);
        });

        it("add same observer for any notification second time shoud have thrown", async () => {
            const observer = () => { };
            manager.onNotification(null, observer);
            assert.throws(() => manager.onNotification(null, observer), error.ExistsException);
        });

        it("observe all notifications", async () => {
            await manager.addTask({ name: "1", task: Task1 });

            let i = 1;
            const values = [0.1, 0.5, 1.0];

            manager.onNotification("progress", (task, name, data) => {
                assert.isTrue(is.task(task));
                assert.strictEqual(name, "progress");
                assert.strictEqual(values[i - 1], data.value);
                assert.strictEqual(`step${i++}`, data.message);
            });

            await manager.runAndWait("1");

            assert.strictEqual(i, 4);
        });

        it("observe notifications from specific task", async () => {
            await manager.addTask({ name: "1", task: Task1 });
            await manager.addTask({ name: "2", task: Task2 });

            let i = 1;
            const values = [0.1, 0.5, 1.0];

            manager.onNotification({
                name: "progress",
                task: "1"
            }, (task, name, data) => {
                assert.isTrue(is.task(task));
                assert.strictEqual(name, "progress");
                assert.strictEqual(values[i - 1], data.value);
                assert.strictEqual(`step${i++}`, data.message);
            });

            await Promise.all([
                manager.runAndWait("1"),
                manager.runAndWait("2")
            ]);

            // await promise.delay(300);
            assert.strictEqual(i, 4);
        });

        it("observe all notifications", async () => {
            await manager.addTask({ name: "1", task: Task1 });
            await manager.addTask({ name: "2", task: Task2 });

            let i = 0;
            const values = [0.1, 0.5, 1.0, 0.2, 0.6, 0.8];
            const messages = ["step1", "step2", "step3", "bam1", "bam2", "bam3"];

            manager.onNotification(null, (task, name, data) => {
                assert.isTrue(is.task(task));
                assert.isTrue(values.includes(data.value));
                assert.isTrue(messages.includes(data.message));
                i++;
            });

            await Promise.all([
                (await manager.run("1")).result,
                (await manager.run("2")).result
            ]);

            assert.strictEqual(i, 6);
        });

        it("observe notification accepts by function selector", async () => {
            await manager.addTask({ name: "1", task: Task1 });
            await manager.addTask({ name: "2", task: Task2 });

            let i = 0;
            const values = [0.2, 0.6, 0.8];
            const messages = ["bam1", "bam2", "bam3"];

            manager.onNotification((task) => task.observer.taskName === "2", (task, name, data) => {
                assert.isTrue(is.task(task));
                assert.isTrue(task.observer.taskName === "2");
                assert.isTrue(values.includes(data.value));
                assert.isTrue(messages.includes(data.message));
                i++;
            });

            await Promise.all([
                (await manager.run("1")).result,
                (await manager.run("2")).result
            ]);

            assert.strictEqual(i, 3);
        });
    });

    describe("tasks decorators", () => {
        const { task } = ateos.task;

        @task({
            name: "1"
        })
        class Task1 extends Task {
            main() {
                return 8;
            }
        }

        @task("2")
        class Task2 extends Task {
            main() {
                return 8;
            }
        }

        @task({
            suspendable: true,
            cancelable: true,
            concurrency: 12,
            interval: 10,
            singleton: true,
            description: "regular",
            tag: "common"
        })
        class Task3 extends Task {
            main() {
                return 8;
            }
        }

        it("use name from task meta (object)", async () => {
            await manager.addTask({ task: Task1 });

            assert.isTrue(manager.hasTask("1"));
            assert.equal(await manager.runAndWait("1"), 8);
        });

        it("use name from task meta (string)", async () => {
            await manager.addTask({ task: Task2 });

            assert.isTrue(manager.hasTask("2"));
            assert.equal(await manager.runAndWait("2"), 8);
        });

        it("should get task parameters from meta", async () => {
            await manager.addTask({ name: "3", task: Task3 });

            assert.isTrue(manager.hasTask("3"));
            const actual = ateos.util.omit(manager.getTask("3"), "throttle");
            assert.deepEqual(actual, {
                name: "3",
                Class: Task3,
                suspendable: true,
                cancelable: true,
                concurrency: 12,
                interval: 10,
                singleton: true,
                description: "regular",
                tag: "common"
            });
        });

        it("argument options take precedence over meta options", async () => {
            await manager.addTask({
                suspendable: false,
                concurrency: 100,
                name: "3",
                description: "non-regular",
                task: Task3
            });
            const ti = manager.getTask("3");
            assert.equal(ti.suspendable, false);
            assert.equal(ti.concurrency, 100);
            assert.equal(ti.description, "non-regular");
        });
    });

    describe("loadTasksFrom()", () => {
        it("single location", async () => {
            await manager.loadTasksFrom(ateos.path.join(__dirname, "fixtures"), { transpile: true });

            assert.isTrue(manager.hasTask("1"));
            assert.isTrue(manager.hasTask("2"));
            assert.isTrue(manager.hasTask("3"));
        });

        it("multiple location", async () => {
            const basePath = ateos.path.join(__dirname, "fixtures");
            await manager.loadTasksFrom([
                basePath,
                ateos.path.join(basePath, "other")
            ], { transpile: true });

            assert.isTrue(manager.hasTask("1"));
            assert.isTrue(manager.hasTask("2"));
            assert.isTrue(manager.hasTask("3"));
            assert.isTrue(manager.hasTask("4"));
            assert.isTrue(manager.hasTask("5"));
            assert.isTrue(manager.hasTask("6"));
        });
    });

    // // describe.only("contexts", () => {
    // //     const {
    // //         task: { Manager }
    // //     } = ateos;

    // //     it("manager api", () => {
    // //         const manager = new Manager();


    // //         assert.isFunction(manager.getIsolate);
    // //         assert.isFunction(manager.getContextBook);
    // //     });

    // //     it("create std context with defaults", async () => {
    // //         const manager = new Manager();
    // //         const stdContext = await manager.getContextBook().createContext("main");
    // //         assert.isObject(stdContext);

    // //         class MyTask extends Task {
    // //             run(a, b) {
    // //                 global.a = a;
    // //                 global.b = b;
    // //                 global.c = a + b;
    // //                 return global.c;
    // //             }
    // //         }

    // //         manager.addTask("my", MyTask);
    // //         const observer = await manager.runInContext(stdContext, "my", 1, 2);
    // //         const result = await observer.result;
    // //         console.log(result);
    // //     });

    // // });

});
