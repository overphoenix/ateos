const {
  is,
  process: { list }
} = ateos;

const { 
  checkProc
} = ateos.getPrivate(ateos.process);

export default (proc) => {
  try {
    if (ateos.isNumber(proc)) {
      return process.kill(proc, 0);
    }

    return list().then((list) => list.some((x) => checkProc(proc, x)));
  } catch (e) {
    return e.code === "EPERM";
  }
};
