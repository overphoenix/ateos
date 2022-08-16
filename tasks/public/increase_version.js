const {
  fs,
  std,
  realm: { BaseTask }
} = ateos;

const VERSION_PARTS = ["major", "minor", "patch", "premajor", "preminor", "prepatch", "prerelease"];

@ateos.task.Task("increaseVersion")
export default class extends BaseTask {
  async main({ part = "minor", preid = undefined, loose = false } = {}) {
    const config = this.manager.config;
    const prevVersion = config.raw.version;
    const cwd = this.manager.cwd;
    if (!VERSION_PARTS.includes(part)) {
      throw new ateos.error.NotValidException(`Not valid version part: ${part}`);
    }

    if (!ateos.isString(config.raw.version)) {
      config.raw.version = "0.0.0";
    }

    const version = config.raw.version;

    if (!ateos.semver.valid(version, loose)) {
      throw new ateos.error.NotValidException(`Version is not valid: ${version}`);
    }

    config.raw.version = ateos.semver.inc(ateos.semver.clean(version, loose), part, loose, preid);

    await config.save();

    const updateConfig = async (name) => {
      if (await fs.exists(std.path.join(cwd, name))) {
        const cfg = await ateos.configuration.load(name, null, {
          cwd
        });
        cfg.raw.version = config.raw.version;
        await cfg.save(name, null, {
          space: "  ",
          newline: true
        });
      }
    };

    await updateConfig("package.json");
    await updateConfig("package-lock.json");

    // this.log(chalk`{green Previous:} {bold ${prevVersion}}\n{green Current:} {bold ${config.raw.version}}`);
  }
}
