const __ = ateos.lazify({
  AbstractBackend: ["abstract-leveldown", "AbstractLevelDOWN"],
  AbstractChainedBatch: ["abstract-leveldown", "AbstractChainedBatch"],
  AbstractIterator: ["abstract-leveldown", "AbstractIterator"],
  LevelUP: "levelup",
  backend: () => ateos.lazify({
    EncodingBackend: "encoding-down",
    DeferredBackend: "deferred-leveldown",
    MemoryBackend: "memdown",
    LevelDBBackend: "leveldown"
  }),
  packager: "./packager",
  LevelDB: () => __.packager(__.backend.LevelDBBackend),
  MemoryDB: () => __.packager(__.backend.MemoryBackend)
}, ateos.asNamespace(exports), require);
