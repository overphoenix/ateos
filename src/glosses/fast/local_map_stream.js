const {
  is,
  std,
  util
} = ateos;

const {
  helper
} = ateos.getPrivate(ateos.fast);

export class FastLocalMapStream extends ateos.fast.LocalStream {
  constructor(source, mappings, options) {
    super(source, options);
    this._mappings = mappings;
    this._matchers = mappings.map((x) => (y) => util.matchPath(x.from, y, { dot: options.dot }));
  }

  dest(options) {
    const cwd = options.cwd || this._cwd;
    return super.dest((file) => {
      let match = null;
      const sourcePath = file.history[0];
      for (let i = 0; i < this._matchers.length; ++i) {
        if (this._matchers[i](sourcePath)) {
          if (!ateos.isNull(match)) {
            throw new ateos.error.Exception(`Ambiguity. This file "${sourcePath}" has more than one possible source: "${this._mappings[match].from}" or "${this._mappings[i].from}"`);
          }
          match = i;
        }
      }
      if (ateos.isNull(match)) {
        throw new ateos.error.Exception(`Invalid file: "${sourcePath}". There is no matching source`);
      }

      return std.path.resolve(cwd, this._mappings[match].to);
    }, options);
  }
}

export const map = (mappings, {
  cwd = process.cwd(),
  base = null,
  read = true,
  buffer = true,
  stream = false,
  dot = true
} = {}) => {
  mappings = util.arrify(mappings).map(({ from, to }) => {
    return { from: helper.resolveGlob(from, cwd), to };
  });
  const source = helper.globSource(mappings.map((x) => x.from), { cwd, base, dot });
  const fast = new FastLocalMapStream(source, mappings, { read, buffer, stream, cwd, dot });
  fast.once("end", () => source.end({ force: true }));
  return fast;
};

export const watchMap = (mappings, {
  cwd = process.cwd(),
  base = null,
  read = true,
  buffer = true,
  stream = false,
  dot = true,
  resume = true,
  ...watcherOptions
} = {}) => {
  mappings = util.arrify(mappings).map(({ from, to }) => {
    return { from: helper.resolveGlob(from, cwd), to };
  });
  const source = ateos.fast.watchSource(mappings.map((x) => x.from), { cwd, base, dot, ...watcherOptions });
  const fast = new FastLocalMapStream(source, mappings, { read, buffer, stream, cwd, dot });
  fast.once("end", () => source.end({ force: true }));
  if (resume) {
    process.nextTick(() => fast.resume());
  }
  return fast;
};
