const {
    cli,
    fs,
    app: {
        Subsystem,
        subsystem,
        command
    },
    nodejs,
    semver,
    pretty,
    std
} = ateos;
// const { chalk, style, chalkify } = cli;

// const activeStyle = chalkify("bold.underline", chalk);
// const cachedStyle = chalkify("#388E3C", chalk);
// const inactiveStyle = chalkify("white", chalk);
// const bullet = `${ateos.text.unicode.symbol.bullet} `;
// const indent = " ".repeat(bullet.length);

// const IGNORE_FILES = ["LICENSE", "CHANGELOG.md", "README.md"];
const subCommand = (...args) => ateos.path.join(__dirname, "commands", ...args);

@subsystem({
    subsystems: [
        {
            name: "repo",
            description: "Repository management",
            subsystem: subCommand("repository")
        }
    ]
})
class GithubCommand extends Subsystem {
}

export default () => GithubCommand;
