const {
  is
} = ateos;

let checkStat;

if (ateos.isWindows) {
  const checkPathExt = (path, options) => {
    let pathext = !ateos.isUndefined(options.pathExt) ? options.pathExt : process.env.PATHEXT;

    if (!pathext) {
      return true;
    }

    pathext = pathext.split(";");
    if (pathext.includes("")) {
      return true;
    }
    for (let i = 0; i < pathext.length; i++) {
      const p = pathext[i].toLowerCase();
      if (p && path.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  };

  checkStat = (stat, path, options) => (!stat.isSymbolicLink() && !stat.isFile())
    ? false
    : checkPathExt(path, options);
} else {
  const checkMode = (stat, options) => {
    const mod = stat.mode;
    const uid = stat.uid;
    const gid = stat.gid;

    const myUid = !ateos.isUndefined(options.uid) ? options.uid : process.getuid && process.getuid();
    const myGid = !ateos.isUndefined(options.gid) ? options.gid : process.getgid && process.getgid();

    const u = parseInt("100", 8);
    const g = parseInt("010", 8);
    const o = parseInt("001", 8);
    const ug = u | g;

    return Boolean((mod & o) || (mod & g) && gid === myGid || (mod & u) && uid === myUid || (mod & ug) && myUid === 0);
  };

  checkStat = (stat, path, options) => stat.isFile() && checkMode(stat, options);
}

export default checkStat;
