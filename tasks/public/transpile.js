@ateos.task.Task("transpile")
export default class TranspileTask extends ateos.realm.TransformTask {
  transform(stream, params) {
    const transpileOptions = {
      cwd: ateos.path.join(this.manager.cwd, ateos.glob.parent(ateos.ateos.isArray(params.src) ? params.src[0] : params.src)),
      sourceMap: true,
      compilerOptions: {
        target: "es2021",
        lib: ["es2021"],
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        declaration: true,
        removeComments: true,
        incremental: true,
        moduleResolution: "node",
        module: "commonjs",
        noEmitOnError: true,
        // noUnusedLocals: true,
        // noUnusedParameters: true,
        // strictPropertyInitialization: true,
        // strictFunctionTypes: true,
        strict: true,
        newLine: "LF",
        noImplicitReturns: true,
        allowJs: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        ...params.compilerOptions
      },
      ...ateos.util.omit(params, ["id", "src", "dst", "task", "realm", "cwd", "compilerOptions"])
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
