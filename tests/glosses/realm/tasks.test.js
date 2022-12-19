import { getRealmPathFor, getTmpPath, getRealmName } from "./utils";

const {
    is,
    configuration,
    error,
    fs,
    realm,
    path: aPath
} = ateos;

describe("realm", "common tasks", () => {
    const { ateosRealm } = realm;

    let tmpTestPath;
    let newRealmsPath;

    before(async () => {
        tmpTestPath = await getTmpPath();
        newRealmsPath = aPath.join(tmpTestPath, "new_realms");
        await ateosRealm.connect();
    });

    describe("create realm", () => {
        before(async () => {
            await fs.mkdirp(newRealmsPath);
        });

        after(async () => {
            await fs.remove(tmpTestPath);
        });

        it("create realm without 'name' should be thrown", async () => {
            await assert.throws(async () => {
                await ateosRealm.runAndWait("realmCreate");
            }, error.InvalidArgumentException);
        });

        it("create realm without 'path' should be thrown", async () => {
            await assert.throws(async () => {
                await ateosRealm.runAndWait("realmCreate", {
                    name: "realm1"
                });
            }, error.InvalidArgumentException);
        });

        it("create realm at existing location should have thrown", async () => {
            await assert.throws(async () => {
                await ateosRealm.runAndWait("realmCreate", {
                    name: "no_tasks",
                    path: getRealmPathFor()
                });
            }, error.ExistsException);
        });

        it("create mininal realm", async () => {
            const name = getRealmName();

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), []);
        });

        it("create realm with empty '.ateos/config.json'", async () => {
            const name = getRealmName();

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath,
                realm: {
                    config: true
                }
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), ["config.json"]);
            assert.deepEqual(require(aPath.join(newRealmsPath, name, ".ateos", "config.json")), {});
        });

        it("create realm with '.ateos/config.json'", async () => {
            const name = getRealmName();

            const config = {
                prop1: "some value",
                artifacts: {
                    custom: ["a1", "a2"]
                },
                tasks: {}
            };

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath,
                realm: {
                    config
                }
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), ["config.json"]);
            assert.deepEqual(require(aPath.join(newRealmsPath, name, ".ateos", "config.json")), config);
        });

        it("create mininal realm with empty '.ateos/dev.json'", async () => {
            const name = getRealmName();

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath,
                realm: {
                    dev: true
                }
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), ["dev.json"]);
            assert.deepEqual(require(aPath.join(newRealmsPath, name, ".ateos", "dev.json")), {});
        });

        it("create realm with '.ateos/dev.json'", async () => {
            const name = getRealmName();

            const dev = {
                defaultTask: "copy",
                units: {
                }
            };

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath,
                realm: {
                    dev
                }
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), ["dev.json"]);
            assert.deepEqual(require(aPath.join(newRealmsPath, name, ".ateos", "dev.json")), dev);
        });

        it("create realm with '.ateos/dev.yaml'", async () => {
            const name = getRealmName();

            const dev = {
                defaultTask: "copy",
                units: {
                }
            };

            await ateosRealm.runAndWait("realmCreate", {
                name,
                path: newRealmsPath,
                realm: {
                    dev: {
                        ext: ".yaml",
                        ...dev
                    }
                }
            });

            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name)), [".ateos", "package.json"]);
            assert.sameMembers(fs.readdirSync(aPath.join(newRealmsPath, name, ".ateos")), ["dev.yaml"]);
            assert.deepEqual(ateos.data.yaml.decode(fs.readFileSync(aPath.join(newRealmsPath, name, ".ateos", "dev.yaml"), "utf8")), dev);
        });

        it("create realm", async () => {
            const name = getRealmName();

            const info = {
                name,
                description: "Sample project",
                path: newRealmsPath
            };

            await ateosRealm.runAndWait("realmCreate", info);

            assert.equal(info.cwd, aPath.join(newRealmsPath, info.name));
            assert.isTrue(await fs.exists(info.cwd));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, realm.Configuration.configName)));
            assert.isTrue(await fs.isFile(aPath.join(info.cwd, configuration.NpmConfig.configName)));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".gitignore")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".git")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".eslintrc.js")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, "jsconfig.json")));

            const packageConfig = await configuration.NpmConfig.load({
                cwd: info.cwd
            });

            assert.equal(packageConfig.raw.name, name);
            assert.equal(packageConfig.raw.description, "Sample project");
            assert.equal(aPath.basename(info.cwd), name);
        });

        it("create realm with specified 'dir'", async () => {
            const name = "myproject";
            const dir = getRealmName();

            const info = {
                name,
                dir,
                path: newRealmsPath
            };

            await ateosRealm.runAndWait("realmCreate", info);

            assert.equal(info.cwd, aPath.join(newRealmsPath, info.dir));
            assert.isTrue(await fs.exists(info.cwd));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, realm.Configuration.configName)));
            assert.isTrue(await fs.isFile(aPath.join(info.cwd, configuration.NpmConfig.configName)));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".gitignore")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".git")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".eslintrc.js")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, "jsconfig.json")));

            const packageConfig = await configuration.NpmConfig.load({
                cwd: info.cwd
            });

            assert.equal(packageConfig.raw.name, name);
            assert.equal(aPath.basename(info.cwd), dir);
        });

        it("create realm with git initialization", async () => {
            const name = getRealmName();

            const info = {
                name,
                initGit: true,
                path: newRealmsPath
            };

            await ateosRealm.runAndWait("realmCreate", info);

            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".eslintrc.js")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, "jsconfig.json")));
            assert.isTrue(await fs.isFile(aPath.join(info.cwd, ".gitignore")));
            assert.isTrue(await fs.isDirectory(aPath.join(info.cwd, ".git")));
        });

        it("create realm with 'eslintrc.js' config", async () => {
            const name = getRealmName();

            const info = {
                name,
                initEslint: true,
                path: newRealmsPath
            };

            await ateosRealm.runAndWait("realmCreate", info);

            assert.isTrue(await fs.isFile(aPath.join(info.cwd, ".eslintrc.js")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, "jsconfig.json")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".gitignore")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".git")));
        });

        it("create realm with 'jsconfig.json' config", async () => {
            const name = getRealmName();

            const info = {
                name,
                initJsconfig: true,
                path: newRealmsPath
            };

            await ateosRealm.runAndWait("realmCreate", info);

            assert.isTrue(await fs.isFile(aPath.join(info.cwd, "jsconfig.json")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".eslintrc.js")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".gitignore")));
            assert.isFalse(await fs.exists(aPath.join(info.cwd, ".git")));
        });
    });

    describe("fork realm", () => {
        let tmpPath;

        beforeEach(async () => {
            await fs.mkdirp(newRealmsPath);
        });

        afterEach(async () => {
            await fs.remove(tmpTestPath);
            if (ateos.isString(tmpPath) && await fs.exists(tmpPath)) {
                await fs.remove(tmpPath);
            }
        });

        it("fork without 'name' should be thrown", async () => {
            await assert.throws(async () => ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm
            }), error.NotValidException);
        });

        it("fork without 'basePath' should be thrown", async () => {
            await assert.throws(async () => ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm,
                name: "test"
            }), error.NotValidException);
        });

        it("fork at existing path should be thrown", async () => {
            await assert.throws(async () => ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm,
                name: "realm1",
                path: getRealmPathFor()
            }), error.ExistsException);
        });

        const invalidSrcRealms = [
            12,
            null,
            ateos.realm.Manager
        ];

        for (const srcRealm of invalidSrcRealms) {
            // eslint-disable-next-line no-loop-func
            it(`for when srcRealm=${ateos.typeOf(srcRealm)} should be thrown`, async () => {
                await assert.throws(async () => ateosRealm.runAndWait("realmFork", {
                    srcRealm,
                    name: ".ateos",
                    path: newRealmsPath
                }), error.NotValidException);
            });
        }

        it("fork empty dir should be thrown", async () => {
            await assert.throws(async () => ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("empty_dir"),
                name: "bad",
                path: newRealmsPath
            }), /Cannot find module/);
        });

        it("fork dir without .ateos/config.json should be ok", async () => {
            ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm_no_config"),
                name: "bad",
                path: newRealmsPath
            });
        });

        it("fork empty realm", async () => {
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("no_tasks"),
                name: "1",
                path: newRealmsPath
            });

            const destPath = aPath.join(newRealmsPath, "1");
            assert.equal(destRealm.cwd, destPath);
            assert.sameMembers(await fs.readdir(getRealmPathFor("no_tasks")), await fs.readdir(destRealm.cwd));
        });

        it("fork simple realm", async () => {
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm3"),
                name: "2",
                path: newRealmsPath
            });

            const destPath = aPath.join(newRealmsPath, "2");
            assert.equal(destRealm.cwd, destPath);
            assert.sameMembers(await fs.readdir(getRealmPathFor("realm3")), await fs.readdir(destRealm.cwd));
            assert.sameMembers(await fs.readdir(aPath.join(getRealmPathFor("realm3"), "lib", "tasks")), await fs.readdir(aPath.join(destRealm.cwd, "lib", "tasks")));
        });

        it("fork whole realm when 'tags=[]'", async () => {
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm1"),
                name: "1",
                path: newRealmsPath,
                tags: []
            });

            const destPath = aPath.join(newRealmsPath, "1");
            assert.equal(destRealm.cwd, destPath);
            assert.sameMembers(await fs.readdir(getRealmPathFor("realm1")), await fs.readdir(destRealm.cwd));
        });

        it("fork whole ateos realm", async function () {
            this.timeout(300 * 1000);
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm,
                name: ".ateos",
                path: await fs.tmpName()
            });
            tmpPath = aPath.dirname(destRealm.cwd);

            const srcRootFiles = (await fs.readdir(ateosRealm.cwd));
            const dstRootFiles = (await fs.readdir(destRealm.cwd));
            assert.sameMembers(srcRootFiles, dstRootFiles);
        });

        it("fork only specified tags of ateos realm", async () => {
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm,
                name: ".ateos",
                path: await fs.tmpName(),
                tags: ["share", "info"]
            });
            tmpPath = aPath.dirname(destRealm.cwd);

            const dstRootFiles = (await fs.readdir(destRealm.cwd));
            assert.sameMembers(dstRootFiles, [".ateos", "package.json", "share", "LICENSE", "README.md"]);
        });
    });

    describe("install node modules", () => {
        it("install 'production' modules by default", async () => {
            const path = await fs.tmpName();
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm4"),
                name: "realm4",
                path
            });
            await destRealm.connect();
            await destRealm.runAndWait("installModules");

            const installedModules = (await fs.readdirp(aPath.join(destRealm.cwd, "node_modules"), {
                files: false,
                depth: 1
            })).map((item) => item.name);

            assert.sameMembers(installedModules, ["inherits", "isarray", "safe-buffer"]);
            await fs.remove(path);
        });

        it("install prod and dev modules", async () => {
            const path = await fs.tmpName();
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm4"),
                name: "realm4",
                path
            });
            await destRealm.connect();
            await destRealm.runAndWait("installModules", {
                dev: true
            });

            const installedModules = (await fs.readdirp(aPath.join(destRealm.cwd, "node_modules"), {
                files: false,
                depth: 1
            })).map((item) => item.name);

            assert.includeMembers(installedModules, ["inherits", "isarray", "safe-buffer", "once", "wrappy"]);
            await fs.remove(path);
        });

        it("install specified modules", async () => {
            const path = await fs.tmpName();
            const destRealm = await ateosRealm.runAndWait("realmFork", {
                realm: getRealmPathFor("realm5"),
                name: "realm5",
                path
            });
            await destRealm.connect();
            await destRealm.runAndWait("installModules", {
                modules: {
                    inherits: "~2.0.3",
                    isarray: "~1.0.0"
                }
            });

            const installedModules = (await fs.readdirp(aPath.join(destRealm.cwd, "node_modules"), {
                files: false,
                depth: 1
            })).map((item) => item.name);

            assert.includeMembers(installedModules, ["inherits", "isarray"]);
            await fs.remove(path);
        });
    });

    describe.todo("merge realm", () => {
        let superRealm;
        let tmpPath;
        before(async function () {
            this.timeout(300 * 1000);
            superRealm = await ateosRealm.runAndWait("realmFork", {
                realm: ateosRealm,
                name: "ateos",
                path: await getTmpPath()
            });
            tmpPath = aPath.dirname(superRealm.cwd);
        });

        after(async () => {
            await fs.remove(tmpPath);
        });

        it("merge realm without superRealm should be thrown", async () => {
            await assert.throws(async () => {
                await ateosRealm.runAndWait("realmMerge", {
                    subRealm: getRealmPathFor("realm1")
                });
            }, error.NotValidException);
        });

        it("merge realm without subRealm should be thrown", async () => {
            await assert.throws(async () => {
                await ateosRealm.runAndWait("realmMerge", {
                    superRealm
                });
            }, error.NotValidException);
        });

        it("merge realm with symlink=false", async () => {
            const subRealm = getRealmPathFor("realm1");
            const mergedPath = await ateosRealm.runAndWait("realmMerge", {
                superRealm,
                subRealm
            });

            const origList = (await fs.readdirp(subRealm)).map((entry) => aPath.relative(subRealm, entry.fullPath));
            const mergedList = (await fs.readdirp(mergedPath)).map((entry) => aPath.relative(mergedPath, entry.fullPath));
            assert.sameDeepMembers(origList, mergedList);
            assert.isFalse(mergedList.includes(aPath.join(".ateos", "dev.json")));

            await fs.remove(mergedPath);
        });

        it("merge realm with symlink=true", async () => {
            const subRealm = await getTmpPath();
            const origPath = getRealmPathFor("realm1");
            await fs.copy(origPath, subRealm);
            const mergedPath = await ateosRealm.runAndWait("realmMerge", {
                superRealm,
                subRealm,
                symlink: true
            });

            const st = await fs.lstat(mergedPath);
            assert.isTrue(st.isSymbolicLink());
            const mergedList = (await fs.readdirp(mergedPath)).map((entry) => aPath.relative(subRealm, entry.fullPath));
            assert.isTrue(mergedList.includes(aPath.join(".ateos", "dev.json")));
            const mergedRealm = new realm.RealmManager({
                cwd: mergedPath
            });
            assert.equal(mergedRealm.devConfig.raw.superRealm, superRealm.cwd);
            assert.equal(mergedRealm.devConfig.raw.mergedAs, mergedRealm.name);
            await fs.unlink(mergedPath);
        });
    });
});
