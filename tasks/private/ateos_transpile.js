import TranspileTask from "../public/transpile";
import { importAteosReplacer } from "../helpers";

const {
  std
} = ateos;

@ateos.task.Task("ateosTranspile")
export default class AteosTranspileTask extends TranspileTask {
  plugins(params) {
    const plugins = super.plugins(params);
    return plugins.concat([
      importAteosReplacer(({ filename }) => std.path.relative(std.path.dirname(filename), std.path.join(__dirname, "..", "lib")))
    ]);
  }
};
