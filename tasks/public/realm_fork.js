const {
    cli,
    error,
    is,
    fs,
    path: aPath,
    realm: { BaseTask, RealmManager }
} = ateos;

const IGNORED_ARTIFACTS = [
    ".git",
    ".gitattributes",
    ".gitignore",
    ".npmignore",
    ".vscode",
    ".eslintignore",
    ".eslintrc.js",
    "jsconfig.json",
    "node_modules",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock"
];

@ateos.task.task("realmFork")
export default class extends BaseTask {
    async main({ realm, path, name, tags, filter, skipNpm } = {}) {
        this.manager.notify(this, "progress", {
            message: "checking"
        });

        if (is.string(realm)) {
            realm = new RealmManager({ cwd: realm });
        }

        if (!realm || !is.realm(realm)) {
            throw new error.NotValidException(`Invalid type of srcRealm: ${ateos.typeOf(realm)}`);
        }

        if (!is.string(path) || path.length === 0) {
            throw new error.NotValidException(`Invalid destPath: ${ateos.inspect(path)}`);
        }

        if (!is.string(name) || name.length === 0) {
            // name = realm.name;
            throw new error.NotValidException(`Invalid name: ${ateos.inspect(name)}`);
        }

        this.manager.notify(this, "progress", {
            message: "connecting to source realm"
        });

        // Connect to source realm
        await realm.connect({
            transpile: true
        });

        this.manager.notify(this, "progress", {
            message: "preparing to copy common realm files"
        });

        const destCwd = aPath.resolve(path, name);
        if (await fs.pathExists(destCwd)) {
            throw new error.ExistsException(`Path '${destCwd}' already exists`);
        }

        this.destCwd = destCwd;
        await fs.mkdirp(this.destCwd);

        const artifacts = new Set;
        if (is.array(tags) && tags.length > 0) {
            tags = new Set(tags);
        } else if (is.string(tags) && tags.length > 0) {
            tags = new Set(tags.split(","));
        } else if (!tags || tags.length === 0) {
            tags = new Set();
            const files = (await fs.readdir(realm.cwd)).filter((file) => !IGNORED_ARTIFACTS.includes(file));
            files.forEach((file) => artifacts.add(file));
        }

        for (const attr of tags.values()) {
            const files = realm.artifacts.get(attr).map((info) => info.path);
            files.forEach((file) => artifacts.add(file));
        }

        // artifacts required for a realm
        artifacts.add(".ateos");
        artifacts.add("package.json");        
        
        for (const dir of artifacts.values()) {
            this.manager.notify(this, "progress", {
                message: `copying ${cli.theme.accent(dir)}`
            });

            const fromPath = aPath.join(realm.cwd, dir);
            const toPath = aPath.join(this.destCwd, dir);

            if (await fs.isDirectory(fromPath)) {
                await fs.copyEx(fromPath, toPath, {
                    base: realm.cwd,
                    results: false,
                    dot: true,
                    junk: true,
                    filter
                });
            } else {
                await fs.copyFile(fromPath, toPath, fs.constants.COPYFILE_EXCL);
            }
        }

        this.destRealm = new RealmManager({
            cwd: this.destCwd
        });

        if (!skipNpm) {
            this.manager.notify(this, "progress", {
                message: `installing ${cli.theme.accent("npm")} packages`
            });
            await this.manager.runAndWait("installModules", {
                cwd: this.destCwd
            });
        }

        this.manager.notify(this, "progress", {
            message: `realm ${cli.theme.primary(realm.name)} successfully forked into ${cli.theme.accent(this.destCwd)}`,
            status: true
        });

        return this.destRealm;
    }

    async undo(err) {
        this.manager.notify(this, "progress", {
            message: err.message,
            status: false
        });

        is.string(this.destCwd) && await fs.remove(this.destCwd);
    }
}
