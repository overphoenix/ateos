const {
  fs,
  project,
  std
} = ateos;

export default class ApplicationProjectTask extends project.BaseTask {
  async main(info, context) {
    await this.runTask("defaultProject", {
      ...info,
      skipGit: true
    }, context);
    // Fix 'skipGit' flag
    context.flag.skipGit = info.skipGit;

    this.manager.notify(this, "progress", {
      message: "initializing application project"
    });

    const srcPath = std.path.join(info.cwd, "src");

    await fs.mkdirp(srcPath);

    await this.runTask("application", {
      name: info.name,
      fileName: "app.js",
      cwd: srcPath
    }, context);

    // Update ateos config
    await this.runTask("ateosConfig", {
      cwd: info.cwd,
      struct: {
        app: {
          task: "transpileExe",
          src: "src/app.js",
          dst: "bin"
        },
        lib: {
          task: "transpile",
          src: [
            "src/**/*",
            "!src/app.js"
          ],
          dst: "lib"
        }
      },
      bin: "bin/app.js",
      main: "lib"
    }, context);

    if (!info.skipJsconfig) {
      await this.runTask("jsconfig", {
        cwd: info.cwd,
        include: ["src"]
      }, context);
    }

    if (!info.skipGit) {
      await this.runTask("git", {}, context);
    }
  }
}
