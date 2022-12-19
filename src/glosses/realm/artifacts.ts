import RealmManager from "./manager";
const {
  fs,
  path: { join },
  util
} = ateos;

const COMMON_FILENAMES = [
  "bin",
  "run",
  "etc",
  "opt",
  "var",
  "share",
  "lib",
  "src",
  [".ateos", "special"],
  "tests",
  "tmp",
  ["node_modules", "modules"],
  ["realm.lock", "lockfile"],
  ["package.json", "package"],
  "LICENSE",
  ["README.md", "readme"]
].map((v) => ateos.isString(v) ? [v, v] : v);

export default class RealmArtifacts {
  private manager_: RealmManager;

  private artifacts_: any[] = [];

  constructor(manager: RealmManager, artifacts: any[]) {
    this.manager_ = manager;
    this.artifacts_ = artifacts;
  }

  get(attr) {
    const artifacts = [];
    const attrs = util.arrify(attr);

    for (const info of this.artifacts_) {
      if (attrs.reduce((sum, item) => sum + (info.attrs.has(item) ? 1 : 0), 0) === attrs.length) {
        artifacts.push(info);
      }
    }

    return artifacts;
  }

  hasArtifact(path) {
    return !ateos.isUndefined(this.artifacts_.find((a) => a.path === path));
  }

  getArtifact(path) {
    return this.artifacts_.find((a) => a.path === path);
  }


  static async collect(manager: RealmManager): Promise<RealmArtifacts> {
    const rootFiles = await fs.readdir(manager.cwd);
    const cfgArtifacts = manager.config.get("artifacts") || {};
    const artifacts = [];

    for (const path of rootFiles) {
      const fullPath = join(manager.cwd, path);
      const artifact = {
        path,
        attrs: new Set([(await fs.isDirectory(fullPath))
          ? "dir"
          : "file"])
      };

      const item = COMMON_FILENAMES.find((v) => v[0] === path);
      if (item) {
        artifact.attrs.add("common");
      }

      artifacts.push(artifact);
    }

    for (const [tag, paths] of Object.entries(cfgArtifacts)) {
      for (const path of paths) {
        const fullPath = join(manager.cwd, path);

        let artifact = artifacts.find((a) => a.path === path);
        if (ateos.isUndefined(artifact)) {
          artifact = {
            path,
            attrs: new Set()
          };
          // console.log(fullPath);
          if (await fs.pathExists(fullPath)) {
            artifact.attrs.add(await fs.isDirectory(fullPath)
              ? "dir"
              : "file");
          }
          artifacts.push(artifact);
        }

        artifact.attrs.add(tag);
      }
    }

    return new RealmArtifacts(manager, artifacts);
  }
}
