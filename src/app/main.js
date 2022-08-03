const __ = ateos.lazify({
    repl: "./repl",
    ts: "./typescript"
}, null, require);

const {
    is,
    cli,
    path,
    app
} = ateos;

const {
    AppSubsystem,
    CliMainCommand
} = app;

const log = ({ stdout, stderr, inspect, ...options } = {}) => {
    if (is.plainObject(inspect)) {
        const options = inspect.options || {
            style: "color",
            depth: 8,
            noType: true,
            noArrayProperty: true
        };
        const value = is.array(inspect.value)
            ? inspect.value.map((rel) => ateos.util.pick(rel, inspect.onlyProps))
            : ateos.util.pick(inspect.value, inspect.onlyProps)

        stdout = ateos.inspect(value, options);
    }
    if (stderr) {
        // cli.updateProgress({
        //     status: false,
        //     clean: true
        // });
        console.error(stderr);
    } else if (stdout) {
        // if (!is.undefined(options.status) && !is.undefined(options.clean)) {
        //     cli.updateProgress(options);
        // }
        console.log(stdout);
    } else {
        // cli.updateProgress(options);
    }
};

const command = (name) => path.join(__dirname, "commands", name);

@AppSubsystem({
    commandsGroups: [
        {
            "name": "common",
            "description": "Common"
        },
        {
            "name": "subsystem",
            "description": "Extensions"
        }
    ],
    subsystems: [
        {
            name: ["github", "gh"],
            group: "common",
            description: "GitHub tools",
            subsystem: command("github")
        },
        {
            name: "inspect",
            group: "common",
            description: "Runtime inspection",
            subsystem: command("inspect")
        },
        // {
        //     name: "ipfs",
        //     group: "common",
        //     description: "IPFS cli",
        //     subsystem: command("ipfs")
        // },
        // {
        //     name: "omni",
        //     group: "common",
        //     description: "Omni-application management",
        //     subsystem: command("omni")
        // },
        {
            name: "node",
            group: "common",
            description: "Node.js management",
            subsystem: command("node")
        },
        {
            name: "realm",
            group: "common",
            description: "Realm management",
            subsystem: command("realm")
        },
        {
            name: "rollup",
            group: "common",
            description: "Rollup cli",
            subsystem: command("rollup")
        },
        {
            name: ["shani"],
            group: "common",
            description: "Test runner",
            subsystem: command("shani")
        },
        // {
        //     name: ["system", "sys"],
        //     group: "common",
        //     description: "System information",
        //     subsystem: command("system")
        // }
    ]
})
export default class ATEOSApp extends app.Application {
    async onConfigure() {
        this.exitOnSignal("SIGINT");

        // await this._addInstalledSubsystems();

        if (!this.replBanner) {
            this.replBanner = `${cli.chalk.bold.hex("ab47bc")("ATEOS")} v${ateos.package.version}, ${cli.chalk.bold.hex("689f63")("Node.JS")} ${process.version}`
        }

        this.log = log;
    }

    @CliMainCommand({
        blindMode: true,
        arguments: [
            {
                name: "path",
                type: String,
                default: null,
                help: "Path to script"
            }
        ],
        options: [
            {
                name: ["--eval", "-e"],
                type: String,
                default: null,
                help: "Evaluate code",
                holder: "CODE"
            },
            {
                name: ["--print", "-p"],
                help: "Print result of '--eval'"
            },
            // {
            //     name: ["--require", "-r"],
            //     // nargs: "*",
            //     type: String,
            //     help: "Require a node module before execution",
            //     holder: "path"
            // },
            {
                name: ["--ts", "-T"],
                description: "Force using TypeScript compiler for (only used by '--eval' and REPL)"
            },
            {
                name: "--ts-type-check",
                help: "Enable type checking (slow)"
            },
            {
                name: "--ts-files",
                help: "Load files from 'tsconfig.json' on startup"
            },
            {
                name: ["--ts-config", "-C"],
                type: String,
                help: "Path to TypeScript JSON project file",
                holder: "path"
            },
            {
                name: ["--ts-ignore-diagnostics", "-D"],
                nargs: "+",
                type: String,
                help: "Ignore TypeScript warnings by diagnostic code",
                holder: "code"
            },
            {
                name: ["--ignore", "-I"],
                type: String,
                help: "Override the path patterns to skip compilation",
                holder: "pattern"
            }
        ]
    })
    async run(args, opts, { rest } = {}) {
        const cwd = path.normalize(process.cwd());
        const code = opts.get("eval");

        if (code) {
            await this._evalCode({
                cwd,
                code,
                ...opts.getAll()
            });
        } else {
            if (args.get("path")) {
                if (opts.get("ts")) {
                    __.ts.register({
                        cwd,
                        ...opts.getAll()
                    });
                }
                // make the filename absolute
                const filePath = path.resolve(cwd, args.get("path"));

                // add back on node and concat the sliced args
                process.argv = [process.execPath, filePath, ...rest];
                ateos.require(filePath);
            } else {
                // Piping of execution _only_ occurs when no other script is specified.
                if (process.stdin.isTTY) {
                    __.repl.start({
                        banner: this.replBanner,
                        ...opts.getAll(),
                        // force type checking
                        tsTypeCheck: true,
                        cwd,
                        __
                    });
                } else {
                    let code = "";
                    process.stdin.on("data", (chunk) => code += chunk);
                    process.stdin.on("end", () => this._evalCode({
                        cwd,
                        code,
                        ...opts.getAll()
                    }));
                }
            }
        }
    }

    async _evalCode({ cwd, code, print, ts: isTypeScript, ...options }) {
        if (isTypeScript) {
            const ts = __.ts.register({
                cwd,
                evalCode: true,
                ...options
            });
            ts.evalCode(code, print);
        } else {
            const filename = global.__filename = "[eval].js";
            global.__dirname = cwd;

            const module = new ateos.module.Module(filename, {
                transforms: [
                    ateos.module.transform.babel()
                ]
            });
            module.filename = filename;
            module.paths = ateos.std.module.Module._nodeModulePaths(global.__dirname);
            global.exports = module.exports;
            global.module = module;
            const $require = (path) => module.require(path);
            $require.cache = module.cache;
            $require.main = module;
            $require.resolve = (request) => ateos.module.Module._resolveFilename(request, module);
            $require.uncache = (id) => module.uncache(id);
            global.require = $require;

            code = code.trim();

            let result = ateos.js.babel.transform(code.trim(), {
                plugins: ateos.module.BABEL_PLUGINS,
                parserOpts: {
                    allowAwaitOutsideFunction: true
                },
                filename
            });

            let fn = new ateos.js.AsyncFunction(result.code);

            if (print) {
                // TODO: not a perfect solution
                result = ateos.js.babel.transform(fn.toString(), {
                    ast: true,
                    code: false,
                    plugins: ["transform.implicitReturn"],
                    filename: "index.js"
                });
                // print function block statement
                result = ateos.js.compiler.generate(result.ast.program.body[0].body);

                // `.slice(2, -2)`: cut block braces
                fn = new ateos.js.AsyncFunction(result.code.slice(2, -2));
                result = await fn();
                console.log(is.string(result)
                    ? result
                    : ateos.std.util.inspect(result));
            } else {
                await fn();
            }
        }
    }

    // async _addInstalledSubsystems() {
    //     const commands = this.config.getCommands();
    //     for (const ss of commands) {
    //         // eslint-disable-next-line
    //         await this.helper.defineCommandFromSubsystem({
    //             ...ateos.util.omit(ss, "name"),
    //             name: [ss.name, ...ateos.util.arrify(ss.aliases)],
    //             lazily: true
    //         });
    //     }
    // }
}
