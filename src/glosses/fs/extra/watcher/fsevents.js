/*
** © 2018 by Philipp Dunkel, Ben Noordhuis, Elan Shankar
** Licensed under MIT License.
*/

/* jshint node:true */


if (process.platform !== "darwin") {
  throw new Error(`Module 'fsevents' is not compatible with platform '${process.platform}'`);
}

const Native = ateos.requireAddon(ateos.path.join(__dirname, "native", "fsevents.node"));
const con = Native.constants;

function watch(path, handler) {
  if (!is.string(path)) {
    throw new TypeError(`argument 1 must be a string and not a ${typeof path}`); 
  }
  if (!is.function(handler)) {
    throw new TypeError(`argument 2 must be a function and not a ${typeof handler}`); 
  }

  let instance = Native.start(path, handler);
  if (!instance) {
    throw new Error(`could not watch: ${path}`); 
  }
  return () => {
    const result = instance ? Promise.resolve(instance).then(Native.stop) : null;
    instance = null;
    return result;
  };
}
function getInfo(path, flags) {
  return {
    path, flags,
    event: getEventType(flags),
    type: getFileType(flags),
    changes: getFileChanges(flags)
  };
}

function getFileType(flags) {
  if (con.kFSEventStreamEventFlagItemIsFile & flags) {
    return "file"; 
  }
  if (con.kFSEventStreamEventFlagItemIsDir & flags) {
    return "directory"; 
  }
  if (con.kFSEventStreamEventFlagItemIsSymlink & flags) {
    return "symlink"; 
  }
}
function getEventType(flags) {
  if (con.kFSEventStreamEventFlagItemRemoved & flags) {
    return "deleted"; 
  }
  if (con.kFSEventStreamEventFlagItemRenamed & flags) {
    return "moved"; 
  }
  if (con.kFSEventStreamEventFlagItemCreated & flags) {
    return "created"; 
  }
  if (con.kFSEventStreamEventFlagItemModified & flags) {
    return "modified"; 
  }
  if (con.kFSEventStreamEventFlagRootChanged & flags) {
    return "root-changed"; 
  }

  return "unknown";
}
function getFileChanges(flags) {
  return {
    inode: Boolean(con.kFSEventStreamEventFlagItemInodeMetaMod & flags),
    finder: Boolean(con.kFSEventStreamEventFlagItemFinderInfoMod & flags),
    access: Boolean(con.kFSEventStreamEventFlagItemChangeOwner & flags),
    xattrs: Boolean(con.kFSEventStreamEventFlagItemXattrMod & flags)
  };
}

exports.watch = watch;
exports.getInfo = getInfo;
exports.constants = con;
