import { createManagerFor } from "./utils";

const {
    is,
    error,
    realm
} = ateos;

describe("realm", () => {
    const { rootRealm } = realm;
    let realmManager;

    const CORE_TASKS = [
        "realmCreate",
        "realmFork",
        "realmMerge",
        "realmInfo",
        "realmMount",

        "clean",
        "build",
        "copy",
        "cmake",
        "transpile",
        "transpileExe",
        "ateosTranspile",
        "ateosTranspileExe",
        "watch",
        "increaseVersion"
    ];

    // const randomName = (prefix = "test") => `${prefix}${text.random(4)}_${text.random(5)}_${text.random(6)}`;


    // before(async () => {
    //     await realm.init(".ateos_test");
    //     await realm.clean();
    //     realmManager = await realm.getManager();
    //     ateos.cli.kit.setSilent(true);
    // });

    after(async () => {
        // await fs.rm(realmPath);
        //     await ateos.omnitron.dispatcher.stopOmnitron();
    });

    it("'ateos.realm' namespace", () => {
        assert.isTrue(ateos.isNamespace(ateos.realm));
        assert.isTrue(ateos.isClass(ateos.realm.RealmManager));
        assert.isTrue(ateos.isClass(ateos.task.AdvancedTask));
        assert.isTrue(ateos.isClass(ateos.realm.TransformTask));
        assert.isTrue(ateos.isClass(ateos.realm.Configuration));
        assert.isTrue(ateos.isClass(ateos.realm.DevConfiguration));
        assert.isTrue(is.realm(ateos.realm.rootRealm));
    });

    describe("root realm", () => {
        it("before connect", () => {
            assert.instanceOf(rootRealm, ateos.realm.RealmManager);
            assert.deepEqual(rootRealm.package, ateos.package);
            assert.isObject(rootRealm.config);
        });

        it("after connect", async () => {
            assert.lengthOf(rootRealm.getTaskNames(), 0);

            await rootRealm.connect();

            assert.strictEqual(rootRealm.connected, true);
            assert.sameMembers(rootRealm.getTaskNames(), CORE_TASKS);
        });

        it("connect to realm repeatedly shouldn't be thrown", async () => {
            let i;
            for (i = 0; i < 10; i++) {
                // eslint-disable-next-line no-await-in-loop
                await rootRealm.connect();
            }
            assert.equal(i, 10);
        });
    });

    describe("tasks configuration", () => {
        it("realm without tasks", async () => {
            const mgr = await createManagerFor({ name: "no_tasks" });
            
            assert.equal(mgr.getTaskNames().length, rootRealm.getTaskNames("pub").length);
        });

        it("realm with default tasks configuration", async () => {
            const mgr = await createManagerFor({ name: "realm1" });

            assert.sameMembers(mgr.getTaskNames(), ["task1", "task2", ...rootRealm.getTaskNames("pub")]);
        });

        it("realm with configuration tasks with pub tag", async () => {
            const mgr = await createManagerFor({ name: "realm2" });

            assert.sameMembers(mgr.getTaskNames("pub"), ["task1", "task2", ...rootRealm.getTaskNames("pub")]);
        });

        it("realm with configuration tasks with dev tag", async () => {
            const mgr = await createManagerFor({ name: "realm2" });

            assert.sameMembers(mgr.getTaskNames("dev"), []);
        });
    });

    describe("nested realms", () => {
        it("super realm should be instantiated before connect", async () => {
            const n1 = await createManagerFor({
                name: ["simple_nested_realm", "opt", "nested"],
                connect: false
            });
            assert.isTrue(is.realm(n1.superRealm));
        });

        it("after connect super realm should be connected as well", async () => {
            const n1 = await createManagerFor({
                name: ["simple_nested_realm", "opt", "nested"],
                connect: false
            });
            await n1.connect();
            const superRealm = n1.superRealm;

            assert.strictEqual(n1.connected, true);
            assert.strictEqual(superRealm.connected, true);
        });

        it("allow only pub tasks of super realm", async () => {
            const nr = await createManagerFor({
                name: ["nested_realm_with_tasks", "opt", "nested"],
                connect: false
            });

            assert.isTrue(is.realm(nr.superRealm));
            await nr.connect({
                transpile: true
            });

            assert.sameMembers(nr.getTaskNames(), ["nestedA", "nestedB", "pubA", "pubB", "dummy", ...rootRealm.getTaskNames("pub")]);
        });

        it("run task of super realm", async () => {
            const nr = await createManagerFor({
                name: ["nested_realm_with_tasks", "opt", "nested"],
                connect: false
            });

            assert.isTrue(is.realm(nr.superRealm));
            await nr.connect();

            assert.equal(await nr.runAndWait("pubA"), "pub aaa");
        });

        it("task with the same name as in the super sphere should be executed according to nesting", async () => {
            const nr = await createManagerFor({
                name: ["nested_realm_with_tasks", "opt", "nested"],
                connect: false
            });

            assert.isTrue(is.realm(nr.superRealm));
            await nr.connect();

            assert.equal(await nr.runAndWait("dummy"), "nested dummy");
        });
    });

    describe("artifacts", () => {
        it("get 'dir' artifacts", async () => {
            const mgr = await createManagerFor({ name: "realm1" });
            assert.sameMembers(mgr.artifacts.get("dir").map((v) => v.path), [".ateos", "lib"]);
        });

        it("get 'file' artifacts", async () => {
            const mgr = await createManagerFor({ name: "realm1" });
            assert.sameMembers(mgr.artifacts.get("file").map((v) => v.path), ["package.json", "README.md", "somefile"]);
        });

        it("get 'common' artifacts", async () => {
            const mgr = await createManagerFor({ name: "realm1" });
            assert.sameMembers(mgr.artifacts.get("common").map((v) => v.path), [".ateos", "lib", "package.json", "README.md"]);
        });

        it("get 'custom' artifacts", async () => {
            const mgr = await createManagerFor({ name: "realm1" });
            assert.sameMembers(mgr.artifacts.get("custom").map((v) => v.path), ["somefile"]);
        });

        it("simple sub artifacts", async () => {
            const mgr = await createManagerFor({ name: "nested_realm_with_tasks" });
            assert.sameMembers(mgr.artifacts.get("some").map((v) => v.path), ["somefile"]);
            assert.sameMembers(mgr.artifacts.get("opt.nested.lib").map((v) => v.path), ["opt/nested/lib"]);
            assert.sameMembers(mgr.artifacts.get("lib.tasks").map((v) => v.path), ["lib/tasks"]);
        });
    });



    // describe.skip("type handlers", () => {
    //     it("", async () => {

    //     });
    // });

    // describe.skip("install/uninstall packages", () => {
    //     it("invalid install argument", async () => {
    //         const err = await assert.throws(async () => {
    //             const observer = await realmManager.install(std.path.join(__dirname));
    //             return observer.result;
    //         });
    //         assert.instanceOf(err, error.InvalidArgumentException);
    //     });

    //     //     describe("cli commands", () => {
    //     //         for (const name of ["simple", "good", "es6", "complex"]) {
    //     //             for (const symlink of [false, true]) {
    //     //                 // eslint-disable-next-line
    //     //                 it(`install/uninstall cli command with${symlink ? " with symlink" : ""} (${name})`, async () => {
    //     //                     const cliCommandPath = std.path.join(__dirname, "packages", `cli_command_${name}`);
    //     //                     const installOptions = {
    //     //                         name: cliCommandPath,
    //     //                         symlink
    //     //                     };
    //     //                     if (name === "es6") {
    //     //                         installOptions.build = true;
    //     //                     }

    //     //                     let observer = await realmManager.install(installOptions);
    //     //                     await observer.result;

    //     //                     const config = await realm.Configuration.load({
    //     //                         cwd: cliCommandPath
    //     //                     });

    //     //                     const packageName = name === "complex" ? config.raw.name : `${config.raw.type}.${config.raw.name}`;
    //     //                     const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, packageName);

    //     //                     const dir = new fs.Directory(packagePath);
    //     //                     assert.isTrue(await dir.exists());
    //     //                     if (symlink) {
    //     //                         assert.isTrue(await dir.isSymbolicLink());
    //     //                     }

    //     //                     if (name === "complex") {
    //     //                         let result = await exec("node", [ateosCliPath, "sub1"]);
    //     //                         assert.equal(result.stdout, "well done 1");

    //     //                         result = await exec("node", [ateosCliPath, "sub2"]);
    //     //                         assert.equal(result.stdout, "well done 2");
    //     //                     } else {
    //     //                         const result = await exec("node", [ateosCliPath, name]);
    //     //                         assert.equal(result.stdout, "well done");
    //     //                     }

    //     //                     observer = await realmManager.uninstall({
    //     //                         name: packageName
    //     //                     });
    //     //                     await observer.result;

    //     //                     assert.isFalse(await dir.exists());

    //     //                     if (name === "es6") {
    //     //                         await fs.rm(std.path.join(cliCommandPath, "lib"));
    //     //                     }

    //     //                     await cliConfig.load();
    //     //                     if (name === "complex") {
    //     //                         assert.isFalse(cliConfig.hasCommand("sub1"));
    //     //                         assert.isFalse(cliConfig.hasCommand("sub2"));
    //     //                     } else {
    //     //                         assert.isFalse(cliConfig.hasCommand(config.raw.name));
    //     //                     }
    //     //                 });
    //     //             }
    //     //         }

    //     //         for (const name of ["invalid_type", "no_name", "no_script", "bad_script1", "bad_script2", "bad_script3", "invalid_complex"]) {
    //     //             for (const symlink of [false]) {
    //     //                 // eslint-disable-next-line
    //     //                 it(`should rollback installation of invalid cli command${symlink ? " with symlink " : " "}(${name})`, async () => {
    //     //                     const cliCommandPath = std.path.join(__dirname, "packages", `cli_command_${name}`);

    //     //                     const config = await realm.Configuration.load({
    //     //                         cwd: cliCommandPath
    //     //                     });

    //     //                     await cliConfig.load();
    //     //                     if (name === "invalid_complex") {
    //     //                         assert.isFalse(cliConfig.hasCommand("sub1"));
    //     //                         assert.isFalse(cliConfig.hasCommand("sub2"));
    //     //                     } else {
    //     //                         assert.isFalse(cliConfig.hasCommand(config.raw.name));
    //     //                     }

    //     //                     const packageName = name === "invalid_complex" ? config.raw.name : `${config.raw.type}.${config.raw.name}`;
    //     //                     const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, packageName);

    //     //                     const dir = new fs.Directory(packagePath);
    //     //                     assert.isFalse(await dir.exists());

    //     //                     const installOptions = {
    //     //                         name: cliCommandPath,
    //     //                         symlink
    //     //                     };

    //     //                     const err = await assert.throws(async () => {
    //     //                         const observer = await realmManager.install(installOptions);
    //     //                         return observer.result;
    //     //                     });
    //     //                     assert.instanceOf(err, Error);

    //     //                     assert.isFalse(await dir.exists());

    //     //                     await cliConfig.load();
    //     //                     if (name === "invalid_complex") {
    //     //                         assert.isFalse(cliConfig.hasCommand("sub1"));
    //     //                         assert.isFalse(cliConfig.hasCommand("sub2"));
    //     //                     } else {
    //     //                         assert.isFalse(cliConfig.hasCommand(config.raw.name));
    //     //                     }
    //     //                 });
    //     //             }
    //     //         }
    //     //     });

    //     //     describe.todo("omnitron services", () => {
    //     //         it("install/uninstall with inactive omnitron", async () => {
    //     //             const omnitronServicePath = std.path.join(__dirname, "packages", "omnitron_service_good");

    //     //             const config = await realm.Configuration.load({
    //     //                 cwd: omnitronServicePath
    //     //             });

    //     //             const packageName = `${config.raw.type}.${config.raw.name}`;
    //     //             const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, packageName);

    //     //             const dir = new fs.Directory(packagePath);
    //     //             assert.isFalse(await dir.exists());

    //     //             const installOptions = {
    //     //                 name: omnitronServicePath
    //     //             };

    //     //             let observer = await realmManager.install(installOptions);
    //     //             await observer.result;

    //     //             assert.isTrue(await dir.exists());

    //     //             observer = await realmManager.uninstall({
    //     //                 name: packageName
    //     //             });
    //     //             await observer.result;

    //     //             assert.isFalse(await dir.exists());
    //     //         });

    //     //         it("install/uninstall with active omnitron", async () => {
    //     //             await ateos.omnitron.dispatcher.startOmnitron();
    //     //             await ateos.omnitron.dispatcher.connectLocal();
    //     //             assert.isTrue(await ateos.omnitron.dispatcher.ping());

    //     //             const omnitronServicePath = std.path.join(__dirname, "packages", "omnitron_service_good");

    //     //             const config = await realm.Configuration.load({
    //     //                 cwd: omnitronServicePath
    //     //             });

    //     //             const packageName = `${config.raw.type}.${config.raw.name}`;
    //     //             const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, packageName);

    //     //             const dir = new fs.Directory(packagePath);
    //     //             assert.isFalse(await dir.exists());

    //     //             const installOptions = {
    //     //                 name: omnitronServicePath
    //     //             };

    //     //             let observer = await realmManager.install(installOptions);
    //     //             await observer.result;

    //     //             assert.isTrue(await dir.exists());

    //     //             observer = await realmManager.uninstall({
    //     //                 name: packageName
    //     //             });
    //     //             await observer.result;

    //     //             assert.isFalse(await dir.exists());

    //     //             await ateos.omnitron.dispatcher.stopOmnitron();
    //     //         });

    //     //         it("should not install service in case of omnitron's system db is busy", async () => {
    //     //             const systemDb = new ateos.omnitron.DB();
    //     //             await systemDb.open();

    //     //             const omnitronServicePath = std.path.join(__dirname, "packages", "omnitron_service_good");

    //     //             const config = await realm.Configuration.load({
    //     //                 cwd: omnitronServicePath
    //     //             });

    //     //             const packageName = `${config.raw.type}.${config.raw.name}`;
    //     //             const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, packageName);

    //     //             const dir = new fs.Directory(packagePath);
    //     //             assert.isFalse(await dir.exists());

    //     //             const installOptions = {
    //     //                 name: omnitronServicePath
    //     //             };

    //     //             const err = await assert.throws(async () => {
    //     //                 const observer = await realmManager.install(installOptions);
    //     //                 return observer.result;
    //     //             });
    //     //             assert.instanceOf(err, Error);

    //     //             assert.isFalse(await dir.exists());

    //     //             await systemDb.close();
    //     //         });
    //     //     });

    //     //     describe("uninstall broken packages", () => {
    //     //         afterEach(async () => {
    //     //             await fs.rm(FIXTURES_PATH);
    //     //         });

    //     //         it.todo("uninstall non-existing package", async () => {

    //     //         });

    //     //         // This is incomplete test
    //     //         it("cli.command (broken symlinks)", async () => {
    //     //             const name = randomName("project");
    //     //             const cwd = fixture(name);

    //     //             await fs.mkdirp(cwd);

    //     //             await fs.copyTo(std.path.join(PACKAGES_PATH, "cli_command_simple", "*"), cwd);

    //     //             const installOptions = {
    //     //                 name: cwd,
    //     //                 symlink: true
    //     //             };

    //     //             let observer = await realmManager.install(installOptions);
    //     //             await observer.result;

    //     //             observer = await realmManager.list();
    //     //             const list = await observer.result;
    //     //             assert.lengthOf(list, 1);
    //     //             assert.equal(list[0].name, "cli.command.simple");

    //     //             await cliConfig.load();
    //     //             assert.lengthOf(cliConfig.raw.commands, 1);

    //     //             const packagePath = std.path.join(realmManager.config.PACKAGES_PATH, "cli.command.simple");

    //     //             assert.isTrue(await fs.exists(packagePath));

    //     //             await fs.rm(cwd);

    //     //             const lstat = await fs.lstat(packagePath);
    //     //             assert.isTrue(lstat.isSymbolicLink());

    //     //             observer = await realmManager.uninstall({
    //     //                 name: list[0].name
    //     //             });
    //     //             await observer.result;

    //     //             await assert.throws(async () => fs.lstat(packagePath));
    //     //         });

    //     //         it.todo("cli.command (present in config but not installed)", async () => {

    //     //         });
    //     //     });
    // });
});
