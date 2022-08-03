const {
    is,
    fs,
    project,
    std,
    text,
    error,
    util
} = ateos;

const {
    Manager
} = project;

const FIXTURES_PATH = std.path.join(__dirname, "fixtures");
const fixture = (...args) => std.path.join(FIXTURES_PATH, ...args);
const projectPath = (...args) => std.path.join(__dirname, "projects", ...args);

const DEFAULT_TASKS = [];

for (const name of Object.keys(project.task)) {
    DEFAULT_TASKS.push(ateos.text.toCamelCase(name));
}

describe("project", function () {
    this.timeout(90000);

    const createManagerFor = async (name, shouldLoad = true) => {
        const manager = new Manager({
            cwd: projectPath(name)
        });
        shouldLoad && await manager.load();
        return manager;
    };

    describe.skip("generator", () => {
        const paths = [];

        const getPathFor = (...args) => {
            const path = fixture(...args);
            paths.push(path);
            return path;
        };

        before(async () => {
            await fs.mkdirp(fixture());
        });

        after(async function () {
            this.timeout(30000);
            // await fs.rm(fixture());
        });

        const randomName = (prefix = "test") => `${prefix}${text.random(4)}_${text.random(5)}_${text.random(6)}`;

        afterEach(async function () {
            this.timeout(30000);
            for (const path of paths) {
                await fs.rm(path); // eslint-disable-line
            }
        });

        const fileTypes = [
            {
                name: "application",
                check: (moduleExport) => {

                }
            },
            {
                name: "cli.application",
                check: (moduleExport) => {

                }
            },
            {
                name: "cli.command",
                check: (moduleExport) => {
                    const Class = moduleExport.default;
                    const instance = new Class();
                    assert.isTrue(is.subsystem(instance));
                }
            },
            {
                name: "omnitron.service",
                check: (moduleExport) => {
                    const Class = moduleExport.default;
                    const instance = new Class({
                        config: {
                            name: "test"
                        }
                    });
                    assert.isTrue(is.subsystem(instance));
                    assert.isTrue(is.omnitronService(instance));
                }
            }
        ];

        for (const type of fileTypes) {
            describe(`generate '${type.name}'`, () => {
                it("named", async () => {
                    const name = randomName();
                    const filePath = getPathFor(`${name}.js`);

                    const manager = new Manager({
                        cwd: FIXTURES_PATH
                    });
                    await manager.createFile({
                        type: type.name,
                        name,
                        cwd: FIXTURES_PATH
                    });

                    assert.isTrue(await fs.exists(filePath));
                    if (!["application", "cli.application"].includes(type.name)) {
                        const moduleExport = ateos.require(filePath);
                        assert.isTrue(is.class(moduleExport.default));
                        assert.equal(moduleExport.default.name, text.capitalize(text.toCamelCase(name)));
                        await type.check(moduleExport);
                    }
                });

                it("unnamed", async () => {
                    const name = "index";
                    const projectPath = getPathFor(randomName());
                    const filePath = std.path.join(projectPath, `${name}.js`);

                    const manager = new Manager({
                        cwd: projectPath
                    });
                    if (["application", "cli.application"].includes(type.name)) {
                        const err = await assert.throws(async () => manager.createFile({
                            type: type.name,
                            cwd: projectPath
                        }));
                        assert.instanceOf(err, ateos.error.NotValidException);
                    } else {
                        await manager.createFile({
                            type: type.name,
                            cwd: projectPath
                        });

                        assert.isTrue(await fs.exists(filePath));
                        const moduleExport = ateos.require(filePath);
                        assert.isTrue(is.class(moduleExport.default));
                        assert.isTrue(moduleExport.default.name.startsWith("_class") || moduleExport.default.name.startsWith("_default"));
                        await type.check(moduleExport);
                    }
                });

                it("should have thrown is file already exists", async () => {
                    const name = randomName();
                    const filePath = getPathFor(`${name}.js`);

                    await fs.writeFile(filePath, "888");

                    const manager = new Manager({
                        cwd: FIXTURES_PATH
                    });
                    const err = await assert.throws(async () => manager.createFile({
                        type: type.name,
                        name,
                        cwd: FIXTURES_PATH
                    }));
                    assert.instanceOf(err, ateos.error.ExistsException);
                });

                it("should not throw is file exists and flag 'rewriteFile=true'", async () => {
                    const name = randomName();
                    const filePath = getPathFor(`${name}.js`);

                    await fs.writeFile(filePath, "888");

                    const manager = new Manager({
                        cwd: FIXTURES_PATH
                    });
                    await manager.createFile({
                        type: type.name,
                        name,
                        cwd: FIXTURES_PATH,
                        rewriteFile: true
                    });

                    assert.isTrue(await fs.exists(filePath));
                    if (!["application", "cli.application"].includes(type.name)) {
                        const moduleExport = ateos.require(filePath);
                        assert.isTrue(is.class(moduleExport.default));
                        assert.equal(moduleExport.default.name, text.capitalize(text.toCamelCase(name)));
                        await type.check(moduleExport);
                    }
                });
            });
        }

        describe("project generating", () => {
            const defaultProjects = [
                {
                    skipNpm: false,
                    skipJsconfig: true,
                    skipGit: true,
                    skipEslint: true,
                    files: ["ateos.json"]
                },
                {
                    skipNpm: false,
                    skipJsconfig: true,
                    skipGit: false,
                    skipEslint: true,
                    files: ["ateos.json", ".git", ".gitignore"]
                },
                {
                    skipNpm: false,
                    skipJsconfig: true,
                    skipGit: false,
                    skipEslint: false,
                    files: ["ateos.json", ".git", ".gitignore", ".eslintrc.js", "package.json", "package-lock.json", "node_modules"]
                },
                {
                    skipNpm: false,
                    skipJsconfig: false,
                    skipGit: false,
                    skipEslint: false,
                    files: ["ateos.json", ".git", ".gitignore", ".eslintrc.js", "package.json", "package-lock.json", "node_modules", "jsconfig.json"]
                },
                {
                    skipNpm: true,
                    skipJsconfig: false,
                    skipGit: false,
                    skipEslint: false,
                    files: ["ateos.json", ".git", ".gitignore", ".eslintrc.js", "package.json", "jsconfig.json"]
                }
            ];

            for (const { skipGit, skipJsconfig, skipEslint, skipNpm, files } of defaultProjects) {
                it(`default project (skipGit=${skipGit}, skipJsconfig=${skipJsconfig}, skipEslint=${skipEslint})`, async function () {
                    this.timeout(120000);
                    const name = randomName("project");
                    const cwd = getPathFor(name);
                    await fs.mkdir(cwd);

                    const manager = new Manager({ cwd });
                    const projectConfig = {
                        name,
                        description: "project description",
                        version: "1.1.1",
                        author: "Ateos Core Team",
                        skipJsconfig,
                        skipEslint,
                        skipGit,
                        skipNpm
                    };
                    await manager.createProject(projectConfig);

                    const ateosConfig = await ateos.configuration.Ateos.load({
                        cwd
                    });
                    assert.deepEqual(util.pick(ateosConfig.raw, ["name", "description", "version", "author"]), util.pick(projectConfig, ["name", "description", "version", "author"]));
                    assert.sameMembers(await fs.readdir(cwd), files);
                    if (!skipGit) {
                        assert.isTrue(await fs.isDirectory(std.path.join(cwd, ".git")));
                    }

                    if (await fs.exists(std.path.join(cwd, ateos.configuration.Npm.name))) {
                        const npmConfig = await ateos.configuration.Npm.load({
                            cwd
                        });
                        assert.deepEqual(util.pick(npmConfig.raw, ["name", "description", "version", "author"]), util.pick(projectConfig, ["name", "description", "version", "author"]));
                    }

                    // if (!skipEslint) {
                    //     assert.isTrue(is.configuration(context.config.eslint));
                    // }

                    if (!skipJsconfig) {
                        const jsconfig = await ateos.configuration.Jsconfig.load({
                            cwd
                        });
                        assert.isFalse(is.propertyOwned(jsconfig.raw, "include"));
                    }
                });
            }

            for (const type of ["application", "cli.application", "cli.command", "omnitron.service"]) {
                it(`${type} project`, async () => {
                    const name = `project_${text.random(8)}`;
                    const cwd = getPathFor(name);
                    await fs.mkdir(cwd);

                    const manager = new Manager({ cwd });
                    const projectConfig = {
                        name,
                        description: "project description",
                        version: "3.0.0",
                        author: "Ateos Core Team",
                        type
                    };
                    await manager.createProject(projectConfig);

                    const ateosConfig = await ateos.configuration.Ateos.load({
                        cwd
                    });
                    if (["cli.command", "omnitron.service"].includes(type)) {
                        assert.deepEqual(util.pick(ateosConfig.raw, ["name", "description", "version", "author", "type", "main"]), {
                            ...projectConfig,
                            main: "lib"
                        });
                    } else {
                        assert.deepEqual(util.pick(ateosConfig.raw, ["name", "description", "version", "author", "type", "bin", "main"]), {
                            ...projectConfig,
                            main: "lib",
                            bin: "bin/app.js"
                        });
                    }

                    assert.sameMembers(await fs.readdir(cwd), ["ateos.json", ".git", ".gitignore", ".eslintrc.js", "package.json", "package-lock.json", "node_modules", "jsconfig.json", "src"]);
                    assert.isTrue(await fs.isDirectory(std.path.join(cwd, ".git")));
                    assert.isTrue(await fs.isDirectory(std.path.join(cwd, "node_modules")));
                    assert.isTrue(await fs.isDirectory(std.path.join(cwd, "src")));
                    if (["cli.command", "omnitron.service"].includes(type)) {
                        assert.isTrue(await fs.exists(std.path.join(cwd, "src", "index.js")));
                    } else {
                        assert.isTrue(await fs.exists(std.path.join(cwd, "src", "app.js")));
                    }

                    const npmConfig = await ateos.configuration.Npm.load({
                        cwd
                    });
                    assert.deepEqual(util.pick(npmConfig.raw, ["name", "description", "version", "author"]), util.pick(projectConfig, ["name", "description", "version", "author"]));

                    // assert.isTrue(is.configuration(context.config.eslint));

                    const jsconfig = await ateos.configuration.Jsconfig.load({
                        cwd
                    });
                    assert.isTrue(is.array(jsconfig.raw.include));
                });
            }

            describe("sub projects", () => {
                it("create one subproject", async () => {
                    const name = `project_${text.random(8)}`;
                    const cwd = getPathFor(name);
                    await fs.mkdir(cwd);

                    const manager = new Manager({ cwd });
                    const projectConfig = {
                        name,
                        description: "project description",
                        version: "3.0.0",
                        author: "Ateos Core Team"
                    };
                    const context = await manager.createProject(projectConfig);

                    const ateosConfig = await ateos.configuration.Ateos.load({
                        cwd
                    });

                    assert.lengthOf(ateosConfig.getSubConfigs(), 0);

                    const subContext = await manager.createSubProject({
                        name: "jit",
                        dirName: "service",
                        type: "omnitron.service"
                    });

                    await ateosConfig.load();
                    assert.lengthOf(ateosConfig.getSubConfigs(), 1);

                    const subCwd = std.path.join(cwd, "service");
                    assert.sameMembers(await fs.readdir(subCwd), [
                        "ateos.json",
                        "src",
                        ".eslintrc.js",
                        "node_modules",
                        "package-lock.json",
                        "package.json"
                    ]);
                    assert.isTrue(await fs.isDirectory(std.path.join(subCwd, "src")));
                    assert.isTrue(await fs.exists(std.path.join(subCwd, "src", "index.js")));

                    assert.equal(manager.config.raw.struct.service, "service");

                    const relativeDir = std.path.relative(context.cwd, std.path.join(subContext.cwd, "src"));
                    const jsconfig = await ateos.configuration.Jsconfig.load({
                        cwd
                    });
                    assert.isTrue(jsconfig.raw.include.includes(relativeDir));
                });
            });

        });
    });
});
