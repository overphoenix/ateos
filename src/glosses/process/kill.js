const {
  process: { getChildPids, getPidByPort, exec, list }
} = ateos;

const parseInput = (input) => {
  if (ateos.isString(input) && input[0] === ":") {
    return getPidByPort(parseInt(input.slice(1), 10));
  }

  return Promise.resolve(input);
};

const {
  checkProc
} = ateos.getPrivate(ateos.process);

export default async (input, { force = false, ignoreCase = false, tree = true, windows } = {}) => {
  const fn = ateos.isWindows ? (input) => {
    const args = [];

    if (ateos.isPlainObject(windows)) {
      if (windows.system && windows.username && windows.password) {
        args.push("/s", windows.system, "/u", windows.username, "/p", windows.password);
      }

      if (windows.filter) {
        args.push("/fi", windows.filter);
      }
    }

    if (force) {
      args.push("/f");
    }

    if (tree) {
      args.push("/t");
    }

    args.push(ateos.isNumeral(input) ? "/pid" : "/im", input);

    return exec("taskkill", args);
  } : (input) => {
    let cmd;
    const args = [input];

    const isNumeral = ateos.isNumeral(input);
    if (ateos.isDarwin) {
      cmd = isNumeral ? "kill" : "pkill";

      if (!isNumeral && ignoreCase) {
        args.unshift("-i");
      }
    } else {
      cmd = isNumeral ? "kill" : "killall";

      if (!isNumeral && ignoreCase) {
        args.unshift("-I");
      }
    }

    if (force) {
      args.unshift("-9");
    }

    if (tree && ateos.isNumeral(input)) {
      return getChildPids(input).then((children) => {
        const pids = children.map((child) => child.pid);
        return exec(cmd, [...pids, ...args]);
      });
    }

    return exec(cmd, args);
  };
  const errors = [];

  input = ateos.util.arrify(input);
  (proc, x) => {
    if (ateos.isString(proc)) {
      return x.name === proc;
    }

    return x.pid === proc;
  };

  const procs = await list();
  const exists = new Map(input.map((x) => [x, procs.some((y) => checkProc(x, y))]));

  await Promise.all(input.map((input) => parseInput(input).then((input) => input !== process.pid && fn(input).catch((err) => {
    if (!exists.get(input)) {
      errors.push(`Killing process ${input} failed: Process doesn't exist`);
      return;
    }

    errors.push(`Killing process ${input} failed: ${err.message.replace(/.*\n/, "").replace(/kill: \d+: /, "").trim()}`);
  }))));

  if (errors.length > 0) {
    throw new ateos.error.AggregateException(errors);
  }
};
