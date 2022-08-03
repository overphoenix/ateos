process.env.IPFS_PATH = ateos.getPath("var", "ipfs");

const __ = ateos.lazify({
  cli: () => ateos.lazify({
    Daemon: "ipfs/src/cli/daemon",
    util: "ipfs/src/cli/utils"
  }, null, require),
  core: "ipfs/src/core",
  IPFS: "ipfs/src/core",
  create: () => __.IPFS.create,
  createNode: () => __.IPFS.createNode,
  isIPFS: () => __.IPFS.isIPFS,
  VERSION: () => require("ipfs/package.json").version
}, ateos.asNamespace(exports), require);
