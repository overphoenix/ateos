const {
    cli: { style },
    error,
    configuration,
    is,
    fs,
    path,
    realm,
    process: { command }
} = ateos;

const __ = ateos.lazify({
    helper: "./helpers"
}, null, require);

/**
 * Creates realm.
 * 
 * `options`
 * - `name` - name of realm (package name).
 * - `dir` - directory name of realm (`name` by default).
 * - `path` - destination path of realm. Full realm path will be `ateos.std.path.join(path, dir || name)`.
 * 
 * If `options.realm.config` is not defined or equal to `false`, associated config will not be created.
 * If `options.realm.dev` is not defined or equal to `false`, associated config will not be created.
 */
@ateos.task.task("realmCreate")
export default class extends realm.BaseTask {
    async main(options = {}) {
        // keep original options immutable
        options = ateos.lodash.defaults(options, {
            initGit: false,
            // initNpm: false,
            // initJsconfig: false,
            // initEslint: false
        })

        if (!is.string(options.name) || options.name.trim().length === 0) {
            throw new error.InvalidArgumentException("Invalid name of realm");
        }
        options.name = options.name.trim();

        if (!is.string(options.path) || options.path.trim().length === 0) {
            throw new error.InvalidArgumentException("Invalid destination path");
        }
        options.path = path.resolve(options.path.trim());

        const cwd = path.join(options.path, options.dir || options.name);
        if (await fs.pathExists(cwd)) {
            throw new error.ExistsException(`Path '${cwd}' already exists`);
        }

        await fs.mkdirp(cwd); // ensure path exists
        options.cwd = this.cwd = cwd;

        this.manager.notify(this, "progress", {
            message: "initializing"
        });

        await fs.mkdir(path.join(cwd, ".ateos"));

        const pkg = await __.helper.pkg.create(options);

        if (is.plainObject(options.realm)) {
            if (options.realm.config) {
                await __.helper.realm.createConfig({
                    ...options.realm.config,
                    cwd
                });
            }

            if (options.realm.dev) {
                await __.helper.realm.createDevConfig({
                    ...options.realm.dev,
                    cwd
                });
            }
        }

        const newRealm = new realm.RealmManager({ cwd });
        if (options.initDev) {
            await newRealm.config.save(); // create `.ateos/config.json` 
            await newRealm.devConfig.save(); // create `.ateos/dev.json`
            await fs.mkdirp(path.join(cwd, "src")); // create `src` dir
            await __.helper.jsconfig.create(options); // create `jsconfig.json`
            await __.helper.eslintrc.create({ cwd, pkg }); // create `.eslintrc.js`

            await command("corepack enable", {
                cwd
            });
        }

        if (options.initGit) {
            this.manager.notify(this, "progress", {
                message: "initializing git repo"
            });
            await __.helper.git.init(options);
        }

        if (options.initDev) {
            this.manager.notify(this, "progress", {
                message: "installing packages"
            });
            await command("yarn", {
                cwd
            });
        }

        // Copy .gitignore file
        await fs.copy(ateos.path.join(ateos.HOME, ".gitignore"), ateos.path.join(cwd, ".gitignore"));

        this.manager.notify(this, "progress", {
            message: `realm ${style.bold(options.name)} successfully created`,
            status: true
        });

        return newRealm;
    }

    async _runCommand(cmd, cwd) {

    }

    async undo(err) {
        this.manager.notify(this, "progress", {
            message: err.message,
            status: false
        });

        is.string(this.cwd) && await fs.remove(this.cwd);
    }
}
