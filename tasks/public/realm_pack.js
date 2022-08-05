import { readTaskConfig } from "../helpers";

const {
  cli,
  error,
  is,
  fast,
  fs,
  path: aPath,
  nodejs,
  realm: { BaseTask, RealmManager }
} = ateos;

const PACK_CONFIG_FILE = "pack.task"

@ateos.task.task("realmPack")
export default class extends BaseTask {
  async main({ realm, path, name, tags, filter, type = nodejs.DEFAULT_EXT } = {}) {
    this.manager.notify(this, "progress", {
      text: "[pack] checking"
    });

    if (is.string(realm)) {
      realm = new RealmManager({ cwd: realm });
    }

    if (!realm || !is.realm(realm)) {
      throw new error.NotValidException(`Invalid type of srcRealm: ${ateos.typeOf(realm)}`);
    }

    const configOptions = readTaskConfig(PACK_CONFIG_FILE);
    const options = {
      name: name
        ? name
        : configOptions.name,
      type: type
        ? type
        : configOptions.type,
      path: path
        ? path
        : configOptions.path,
      tags: tags
        ? tags
        : configOptions.tags,
      filter: filter
        ? filter
        : configOptions.filter
    }

    if (!is.string(options.path) || options.path.length === 0) {
      throw new error.NotValidException(`Invalid destPath: ${ateos.inspect(options.path)}`);
    }

    if (!is.string(options.name) || options.name.length === 0) {
      options.name = `${realm.name}-v${realm.package.version}-node-v${process.version.split(".")[0].slice(1)}.x-${nodejs.getCurrentPlatform()}-${nodejs.getCurrentArch()}`;
    }

    this.manager.notify(this, "progress", {
      text: "[pack] connecting to realm"
    });

    // Connect to source realm
    await realm.connect({
      transpile: true
    });

    const filename = `${options.name}${options.type}`;
    const fullPath = aPath.join(options.path, filename);

    this.manager.notify(this, "progress", {
      text: `[pack] packing realm ${cli.theme.primary(realm.name)} to ${cli.theme.accent(fullPath)}`
    });

    const artifacts = new Set;
    if (is.array(options.tags) && options.tags.length > 0) {
      options.tags = new Set(options.tags);
    } else if (is.string(options.tags) && options.tags.length > 0) {
      options.tags = new Set(options.tags.split(","));
    } else if (!options.tags || options.tags.length === 0) {
      options.tags = new Set();
      const files = await fs.readdir(realm.cwd);
      files.forEach((file) => artifacts.add(file));
    }

    for (const attr of options.tags.values()) {
      const files = realm.artifacts.get(attr).map((info) => info.path);
      files.forEach((file) => artifacts.add(file));
    }

    // artifacts required for a realm
    artifacts.add(".ateos");

    const from = [];
    for (const dir of artifacts.values()) {
      const fromPath = aPath.join(realm.cwd, dir);
      if (await fs.isDirectory(fromPath)) {
        from.push(aPath.join(dir, "**", "*"));
      } else {
        from.push(dir);
      }
    }
    
    await fast.src([
      ...from,
      ...options.filter,
    ], {
      cwd: realm.cwd,
      base: realm.cwd
    })
      .archive(options.type, filename)
      .dest(options.path);

    this.manager.notify(this, "progress", {
      text: `[pack] realm ${cli.theme.primary(realm.name)} successfully packed to ${cli.theme.accent(fullPath)}`,
      status: "succeed"
    });

    return fullPath;
  }
}
