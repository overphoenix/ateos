const {
  app: { Subsystem, CliMainCommand },
  cli,
  fs,
  process: { command },
  std
} = ateos;


const getGitUser = async () => {
  try {
    const { stdout } = (await command("git config --global --get user.name"));
    return stdout && JSON.stringify(stdout.trim()).slice(1, -1);
  } catch (err) {
    return "";
  }
};

const getGitEmail = async () => {
  try {
    const { stdout } = (await command("git config --global --get user.email"));
    return stdout && stdout.trim();
  } catch (err) {
    return "";
  }
};

export default class extends Subsystem {
  @CliMainCommand({
    arguments: [
      {
        name: "name",
        type: String,
        required: false,
        help: "Realm name"
      }
    ],
    options: [
      {
        name: ["--path", "-P"],
        type: String,
        default: process.cwd(),
        help: "Realm base path"
      },
      {
        name: ["--dir", "-D"],
        type: String,
        help: "Realm directory name"
      },
      {
        name: "--descr",
        type: String,
        default: "",
        help: "Realm description"
      },
      {
        name: ["--version", "-V"],
        type: String,
        default: "0.0.0",
        help: "Initial version"
      },
      {
        name: ["--author", "-A"],
        type: String,
        default: "",
        help: "Author name"
      },
      {
        name: "--init-git",
        help: "Initialize git repository"
      },
      {
        name: "--init-dev",
        help: "Initialize realm's dev artifacts"
      },
      {
        name: "--git-name",
        type: String,
        help: "Git user name"
      },
      {
        name: "--git-email",
        type: String,
        help: "Git user email"
      }
    ]
  })
  async main(args, opts) {
    let info;
    if (args.has("name")) {
      info = {
        name: args.get("name"),
        ...opts.getAll()
      };
      info.dir = info.dir || info.name;
      info.author = info.author || `${await getGitUser()} <${await getGitEmail()}>`;
    } else {
      const {
        prompt
      } = cli.prompts;

      info = await prompt([
        {
          type: "snippet",
          name: "config",
          message: "Common package.json fields",
          required: true,
          fields: [
            {
              name: "author",
              message: "Author name"
            },
            {
              name: "email",
              valiate: ateos.is.email
            },
            {
              name: "version",
              validate(value, state, item) {
                if (item && item.name === "version" && !ateos.semver.valid(value)) {
                  return this.styles.danger("version should be a valid semver value");
                }
                return true;
              }
            }
          ],
          template: `{
  "name": "\${name}",
  "description": "\${description}",
  "version": "\${version:0.0.0}",
  "author": "\${author:${await getGitUser()}} <\${email:${await getGitEmail()}}>",
  "license": "\${license:${ateos.package.license}}"
}`
        },
        {
          name: "options",
          type: "multiselect",
          message: "Options",
          search: true,
          asObject: true,
          choices: [
            {
              name: "Initialize git repository",
              value: "initGit"
            },
            {
              name: "Initialize realm's dev artifacts",
              value: "initDev"
            }
          ],
          result(names) {
            return names.map((name) => this.find(name).value);
          }
        },
        {
          type: "input",
          name: "path",
          message: "Realm base path",
          default: process.cwd()
        },
        {
          type: "input",
          name: "dir",
          message: "Directory name",
          initial: ({ state }) => state.answers.config.values.name,
          async validate(value) {
            const fullPath = std.path.join(process.cwd(), value);

            if (await fs.exists(fullPath)) {
              const files = await fs.readdir(fullPath);
              if (files.length > 0) {
                return `Path '${fullPath}' exists and is not empty`;
              }
            }

            return true;
          }
        },
        {
          type: "input",
          name: "gitName",
          message: "Git user name",
          async initial() {
            return await getGitUser();
          },
          skip() {
            return !this.state.answers.options.includes("initGit");
          }
        },
        {
          type: "input",
          name: "gitEmail",
          message: "Git user email",
          valiate: ateos.is.email,
          async initial() {
            return await getGitEmail();
          },
          skip() {
            return !this.state.answers.options.includes("initGit");
          }
        }
      ]);

      Object.assign(info, JSON.parse(info.config.result));
      delete info.config;
      for (const opt of info.options) {
        info[opt] = true;
      }
      delete info.options;
    }

    try {
      const ateosRealm = await this.parent.connectRealm();
      await ateosRealm.runAndWait("realmCreate", info);

      return 0;
    } catch (err) {
      console.log(err);
      // ateos.log.bright.red.error.noLocate(err);
      return 1;
    }
  }
}
