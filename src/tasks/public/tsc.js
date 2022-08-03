@ateos.task.task("tsc")
export default class TSCompileTask extends ateos.realm.TransformTask {
    transform(stream, params) {
        const transpileOptions = {
            cwd: ateos.path.join(this.manager.cwd, ateos.glob.parent(ateos.is.array(params.src) ? params.src[0] : params.src)),
            sourceMap: true,
            compilerOptions: {
                target: "es2017",
                lib: ["es5", "es6", "es2017","dom"],
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                declaration: true,
                removeComments: true,
                moduleResolution: "node",
                module: "commonjs",
                ...params.compilerOptions
            },
            ...ateos.util.omit(params, ["id", "original", "description", "src", "dst", "task", "realm", "cwd", "compilerOptions"])
        };
        return stream
            .sourcemapsInit()
            .tscompile(transpileOptions)
            .sourcemapsWrite(".", {
                addComment: false,
                destPath: params.dst
            });
    }
}
