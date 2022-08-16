import { checkPath, processOptions } from "./utils";

const {
  is,
  std: { path }
} = ateos;

export default (fs) => {
  const mkdirp = (input, options, callback) => {
    checkPath(input);
    if (ateos.isFunction(options)) {
      callback = options;
      options = null;
    }
    options = processOptions(options);
        
    const pth = path.resolve(input);

    return fs.mkdir(pth, {
      mode: options.mode,
      recursive: true
    }, callback);
  };

  return mkdirp;
};
