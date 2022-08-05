const relPath = (p) => ateos.std.path.relative(ateos.HOME, p);

describe("Meta tests", () => {
  it("is", async () => {
    const inspector = new ateos.meta.code.Inspector();
    await inspector.attachNamespace("ateos.is");
    const ns = inspector.getNamespace("ateos.is");
    assert.equal(ns.name, "ateos.is");
    assert.lengthOf(ns.modules, 1);
    assert.equal(relPath(ns.modules[0].path), ateos.std.path.normalize("src/glosses/common/is.js"));
    const exports = Object.keys(ns.exports);
    assert.includeMembers(exports, [
      "nil",
      "null",
      "undefined",
      "boolean",
      "string",
      "number",
      "date",
      "buffer",
      "object",
      "plainObject",
      "array",
      "infinite",
      "propertyOwned",
      "odd",
      "even",
      "deepEqual"
    ]);
  });

  it("x", async () => {
    const inspector = new ateos.meta.code.Inspector();
    await inspector.attachNamespace("ateos.x");
    const ns = inspector.getNamespace("ateos.x");
    assert.equal(ns.name, "ateos.x");
    assert.lengthOf(ns.modules, 1);
    assert.equal(relPath(ns.modules[0].path), ateos.std.path.normalize("src/glosses/common/x.js"));
    const exports = Object.keys(ns.exports);
    assert.includeMembers(exports, [
      "idExceptionMap",
      "exceptionIdMap",
      "stdIdMap",
      "stdExceptions",
      "ateosExceptions",
      "create",
      "Exception",
      "Runtime",
      "IncompleteBufferError",
      "NotImplemented",
      "IllegalState",
      "NotValid",
      "Unknown",
      "NotExistsException",
      "Exists",
      "Empty",
      "InvalidAccess",
      "NotSupported",
      "InvalidArgument",
      "InvalidNumberOfArguments",
      "NotFound",
      "Timeout",
      "Incorrect",
      "NotAllowed",
      "LimitExceeded",
      "Encoding"
    ]);
  });

  describe("data", () => {
    it.skip("root namespace", async () => {
      // NEED FIX THIS TEST!!!
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data");
      const ns = inspector.getNamespace("ateos.data");
      assert.sameMembers(Object.keys(ns.exports), ["json", "json5", "bson", "base64", "mpak", "yaml"]);

      try {
        await inspector.attachNamespace("ateos.data.json");
      } catch (err) {
        return;
      }
      assert.fail("Should have thrown");
    });

    it("json", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.json");
      const ns = inspector.getNamespace("ateos.data.json");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"/*, "encodeSafe", "decodeSafe"*/, "encodeStable", "any"]);
    });

    it("json5", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.json5");
      const ns = inspector.getNamespace("ateos.data.json5");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"]);
    });

    it("bson", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.bson");
      const ns = inspector.getNamespace("ateos.data.bson");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"]);
    });

    it("yaml", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.yaml");
      const ns = inspector.getNamespace("ateos.data.yaml");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"]);
    });

    it("mpak", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.mpak");
      const ns = inspector.getNamespace("ateos.data.mpak");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"]);
    });

    it("subnamespace 'base64'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.data.base64");
      const ns = inspector.getNamespace("ateos.data.base64");
      assert.includeMembers(Object.keys(ns.exports), ["encode", "decode"]);
    });
  });

  describe("compressors", () => {
    it("root namespace", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor");
      const ns = inspector.getNamespace("ateos.compressor");
      assert.isTrue(Object.keys(ns.exports).length === 0);
    });

    it("subnamespace 'gz'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.gz");
      const ns = inspector.getNamespace("ateos.compressor.gz");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "compressStream", "decompressStream"]);
    });

    it("subnamespace 'deflate'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.deflate");
      const ns = inspector.getNamespace("ateos.compressor.deflate");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "compressStream", "decompressStream", "rawCompress", "rawCompressSync", "rawCompressStream", "rawDecompress", "rawDecompressSync", "rawDecompressStream"]);
    });

    it("subnamespace 'brotli'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.brotli");
      const ns = inspector.getNamespace("ateos.compressor.brotli");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "compressStream", "decompressStream"]);
    });

    it("subnamespace 'xz'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.xz");
      const ns = inspector.getNamespace("ateos.compressor.xz");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "compressStream", "decompressStream"]);
    });

    it("subnamespace 'lzma'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.lzma");
      const ns = inspector.getNamespace("ateos.compressor.lzma");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "compressStream", "decompressStream"]);
    });

    it("subnamespace 'snappy'", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.compressor.snappy");
      const ns = inspector.getNamespace("ateos.compressor.snappy");
      assert.includeMembers(Object.keys(ns.exports), ["compress", "decompress", "compressSync", "decompressSync", "isValidCompressed", "isValidCompressedSync"]);
    });
  });

  describe("util", () => {
    it("uuid", async () => {
      const inspector = new ateos.meta.code.Inspector();
      await inspector.attachNamespace("ateos.util.uuid");
      const ns = inspector.getNamespace("ateos.util.uuid");
      assert.includeMembers(Object.keys(ns.exports), ["__", "v1", "v4", "v5"]);

      const privateModule = inspector.get("ateos.util.uuid.__");
      assert.isTrue(ateos.meta.code.is.module(privateModule));
      assert.includeMembers(Object.keys(privateModule.exports()), ["rnd16", "seedBytes", "bytesToUuid", "sha1"]);

      assert.isTrue(ateos.meta.code.is.functionLike(inspector.get("ateos.util.uuid.v1")));
      assert.isTrue(ateos.meta.code.is.functionLike(inspector.get("ateos.util.uuid.v4")));
      assert.isTrue(ateos.meta.code.is.functionLike(inspector.get("ateos.util.uuid.v5")));
    });
  });
});
