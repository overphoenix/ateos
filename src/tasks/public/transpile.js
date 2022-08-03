@ateos.task.task("transpile")
export default class TranspileTask extends ateos.realm.TransformTask {
    transform(stream, params) {
        const transpileOptions = {
            sourceMap: true,
            plugins: this.plugins(params)
        };
        return stream.sourcemapsInit()
            .transpile(transpileOptions)
            .sourcemapsWrite(".", {
                destPath: params.dst
            });
    }

    plugins() {
        return ateos.module.BABEL_PLUGINS;
    }
}
