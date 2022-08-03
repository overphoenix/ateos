import TranspileExeTask from "../public/transpile_exe";
import { importAteosReplacer } from "../helpers";

const {
    std
} = ateos;

@ateos.task.task("ateosTranspileExe")
export default class AteosTranspileExeTask extends TranspileExeTask {
    plugins(params) {
        const plugins = super.plugins(params);
        return plugins.concat([
            importAteosReplacer(({ filename }) => std.path.relative(std.path.join(__dirname, "..", "bin"), std.path.join(__dirname, "..", "lib")))
        ]);
    }
};
