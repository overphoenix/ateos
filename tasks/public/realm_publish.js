import { AxiosError } from "axios";
import { readTaskConfig } from "../helpers";

const {
  cli,
  error,
  is,
  fs,
  http: { axios },
  gitea,
  github,
  lodash: _
} = ateos;

const PUBLISH_CONFIG_FILE = "publish.task";
const TARGETS = ["gitea", "github"];

@ateos.task.task("realmPublish")
export default class extends ateos.realm.BaseTask {
  async main({ realm, tag, auth } = {}) {
    this.manager.notify(this, "progress", {
      text: "[publish] checking"
    });

    if (is.string(realm)) {
      realm = new ateos.realm.RealmManager({ cwd: realm });
    }

    if (!realm || !is.realm(realm)) {
      throw new error.NotValidException(`Invalid type of srcRealm: ${ateos.typeOf(realm)}`);
    }

    this.manager.notify(this, "progress", {
      text: "[publish] connecting to realm"
    });

    // Connect to source realm
    await realm.connect({
      transpile: true
    });

    const tmpPath = await fs.tmpName();

    const options = readTaskConfig(PUBLISH_CONFIG_FILE);

    const targets = _.intersection(TARGETS, Object.keys(options.targets));

    if (targets.length === 0) {
      this.manager.notify(this, "progress", {
        text: "[publish] no targets",
        status: "warn"
      });
      return;
    }

    this.manager.notify(this, "progress", {
      text: `[publish] targets: ${cli.theme.primary(targets.join(", "))}`,
      status: "info"
    });

    const path = await this.manager.runAndWait("realmPack", {
      realm,
      path: tmpPath,
      tags: options.tags
    });

    const filename = ateos.path.basename(path);
    this.manager.notify(this, "progress", {
      text: `[publish] uploading ${cli.theme.accent(filename)}`
    });

    let successTargets = [];
    for (const target of targets) {
      try {
        const targetOptions = options.targets[target];
        switch (target) {
          case "gitea":
            await this._uploadToGitea(realm, path, {
              ...targetOptions,
              tag_name: tag
                ? tag
                : targetOptions.tag_name,
              auth: auth
                ? auth
                : targetOptions.auth
            });
            break;
          case "github":
            await this._uploadToGithub(realm, path, targetOptions[target]);
            break;
        }
        successTargets.push(target);
      } catch (err) {
        console.log(err);
        this.manager.notify(this, "progress", {
          text: `[publish] target ${cli.theme.primary(target)}: ${err}`,
          status: "fail"
        });
      }
    }

    this.manager.notify(this, "progress", {
      text: "[publish] removing temporary files"
    });

    await fs.remove(tmpPath);

    this.manager.notify(this, "progress", {
      text: `[publish] realm ${cli.theme.primary(realm.name)} successfully published to ${cli.theme.primary(successTargets.join(", "))}`,
      status: "succeed"
    });
  }

  async _uploadToGitea(realm, path, { url, owner, repo, auth, tag_name, ...rest } = {}) {
    if (!auth) {
      throw Error("Bad API key");
    }

    gitea.serviceOptions.axios = axios.create({
      baseURL: url,
      timeout: 300000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: { 'Authorization': `token ${auth}` }
    });
    const repos = new gitea.RepositoryService();

    const tag = tag_name
      ? tag_name
      : ateos.util.nanoid.nanoid(8);

    this.manager.notify(this, "progress", {
      text: `[publish] creating release with tag ${tag}`
    });

    let releaseInfo; 
    try {
      releaseInfo = await repos.repoCreateRelease({
        owner,
        repo,
        body: {
          ...rest,
          tag_name: tag
        }
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response.status === 409) {
          releaseInfo = await repos.repoGetReleaseByTag({
            owner,
            repo,
            tag
          });
        }
      }
    }

    // const attachments = await repos.repoListReleaseAttachments({
    //     owner,
    //     repo,
    //     id: releaseInfo.id
    // });
    // const filenames = attachments.map((o) => o.name);
    // console.log(filenames);

    const stats = fs.statSync(path);
    const fileSizeInBytes = stats.size;

    this.manager.notify(this, "progress", {
      text: `[publish] uploading release ${ateos.path.basename(path)} (${fileSizeInBytes} bytes)`
    });

    const fileStream = ateos.std.fs.createReadStream(path);
    const result = await repos.repoCreateReleaseAttachment({
      owner,
      repo,
      id: releaseInfo.id,
      name: ateos.path.basename(path),
      attachment: fileStream
    });

    this.manager.notify(this, "progress", {
      text: `[publish] file available at ${result.browser_download_url}`,
      status: "info"
    });

  }

  async _uploadToGithub(realm, path, options) {
    throw Error("Unsupported");
    // if (publishInfo.type === "github") {
    //   const relManager = new github.GitHubReleaseManager({
    //     owner: publishInfo.owner,
    //     repo: publishInfo.repo,
    //     auth,
    //     apiBase: publishInfo.apiBase || github.apiBase
    //   });

    //         /*const result = */await relManager.uploadAsset({
    //     tag,
    //     path
    //   });
    // }
  }
}
