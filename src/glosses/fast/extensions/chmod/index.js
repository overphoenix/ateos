export default function () {
  const { is, error, fs, util } = ateos;

  const defaultMode = 0o777 & (~process.umask());

  const normalize = (mode) => {
    if (ateos.isNil(mode)) {
      return mode;
    }
    let called = false;
    const newMode = {
      owner: {},
      group: {},
      others: {}
    };

    for (const key of ["read", "write", "execute"]) {
      if (ateos.isBoolean(mode[key])) {
        newMode.owner[key] = mode[key];
        newMode.group[key] = mode[key];
        newMode.others[key] = mode[key];
        called = true;
      }
    }

    return called ? newMode : mode;
  };

  const assign = (a, b) => {
    for (const key of util.keys(b)) {
      if (ateos.isObject(b[key])) {
        assign(a[key], b[key]);
      } else if (key in a) {
        a[key] = b[key];
      }
    }
  };

  return function chmod(mode, dirMode) {
    if (!ateos.isNil(mode) && !ateos.isNumber(mode) && !ateos.isObject(mode)) {
      throw new error.InvalidArgumentException("Expected mode to be null/undefined/number/Object");
    }

    if (dirMode === true) {
      dirMode = mode;
    }
    if (!ateos.isNil(dirMode) && !ateos.isNumber(dirMode) && !ateos.isObject(dirMode)) {
      throw new TypeError("Expected dirMode to be null/undefined/true/number/Object");
    }

    const nMode = normalize(mode);
    const nDirMode = normalize(dirMode);

    return this.throughSync(function (file) {
      let [curMode, ncurMode] = [mode, nMode];
      if (file.isNull() && file.stat && file.stat.isDirectory()) {
        [curMode, ncurMode] = [dirMode, nDirMode];
      }

      if (ateos.isNil(curMode)) {
        this.push(file);
        return;
      }

      file.stat = file.stat || {};
      file.stat.mode = file.stat.mode || defaultMode;

      if (ateos.isObject(curMode)) {
        const statMode = new fs.Mode(file.stat);
        assign(statMode, ncurMode);
        file.stat.mode = statMode.stat.mode;
      } else {
        file.stat.mode = curMode;
      }
      this.push(file);
    });
  };
}
