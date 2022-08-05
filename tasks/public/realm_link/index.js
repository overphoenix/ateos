const {
    cli,
    error,
    is,
    fs,
    github
} = ateos;

@ateos.task.task("realmLink")
export default class extends ateos.realm.BaseTask {
    async main({ realm, delete: del = false, binName, libName, noBin = true, noLib = true } = {}) {
        this.manager.notify(this, "progress", {
            message: "checking"
        });

        if (is.string(realm)) {
            realm = new ateos.realm.RealmManager({ cwd: realm });
        }

        if (!realm || !is.realm(realm)) {
            throw new error.NotValidException(`Invalid type of srcRealm: ${ateos.typeOf(realm)}`);
        }

        this.manager.notify(this, "progress", {
            message: "connecting to realm"
        });

        await realm.connect({
            transpile: true
        });

        this.manager.notify(this, "progress", {
            message: (del ? "unlinking" : "linking") + " realm"
        });

        let prefixPath;
        try {
            const { stdout } = await ateos.process.command("npm bin -g");
            prefixPath = stdout;
        } catch (err) {
            prefixPath = (is.windows)
                ? ateos.path.join(ateos.env.home(), "AppData", "Roaming", "npm")
                : "/usr/local/bin";
            ateos.error(err);
        }

        const packageConf = realm.package;
        if (!noBin && packageConf.bin) {
            const bins = [];
            if (is.string(packageConf.bin)) {
                bins.push([binName ? binName : packageConf.name, packageConf.bin]);
            } else {
                for (const key in packageConf.bin) {
                    let name = key;
                    if (key === packageConf.name) {
                        name = binName ? binName : key;
                    }
                    bins.push([name, packageConf.bin[key]]);
                }
            }

            for (const [linkName, realmRelPath] of bins) {
                let sourcePath = realm.getPath(realmRelPath);
                if (!(await fs.pathExists(sourcePath))) {
                    throw new error.NotExistsException(`Path ${fullPath} not exists`);
                }
                let destPath = ateos.path.join(prefixPath, linkName);
        
                await fs.mkdirp(ateos.path.dirname(destPath)); // sure dir exists
                const scripts = [["sh.atl", "*", false, false], ["ps1.atl", "win32", "ps1", false], ["cmd.atl", "win32", "cmd", true]]
        
                // create scripts...
                for (const [tmplName, platform, ext, needNormalize] of scripts) {
                    if (process.platform === platform || platform === "*") {
                        const scriptContent = ateos.templating(ateos.path.join(__dirname, tmplName), {
                            name: linkName,
                            realmRelPath: needNormalize ? ateos.std.path.normalize(realmRelPath) : realmRelPath
                        });
        
                        const scriptPath = destPath + (ext ? `.${ext}` : "");
                        await fs.writeFile(scriptPath, scriptContent, { encoding: "utf8" });
                    }
                }
        
                // link root realm path
                const realmPath = realm.getPath();
                const linkPath = ateos.path.join(prefixPath, "node_modules", linkName)
                if (!(await fs.pathExists(linkPath))) {
                    await fs.symlink(realmPath, linkPath, "junction");
                }        
            }
        }

        if (!noLib && is.string(packageConf.main)) {
            const realmPath = realm.getPath();
            const linkPath = ateos.path.join(ateos.env.home(), ".node_libraries", libName ? libName : packageConf.name)
            await fs.mkdirp(ateos.path.dirname(linkPath)); // sure dir exists
            if (!(await fs.pathExists(linkPath))) {
                await fs.symlink(realmPath, linkPath, "junction");
            }
        }

        this.manager.notify(this, "progress", {
            message: `realm successfully ${del ? "unlinked" : "linked"}`,
            status: true
        });
    }
}
