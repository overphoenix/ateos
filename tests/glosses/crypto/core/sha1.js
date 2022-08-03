const {
    crypto: { sha1: SHA1, util: UTIL }
} = ateos;

describe("sha1", () => {
    it("should have correct digest length", () => {
        const md = SHA1.create();
        assert.equal(md.digestLength, 20);
    });

    it("should digest the empty string", () => {
        const md = SHA1.create();
        assert.equal(
            md.digest().toHex(), "da39a3ee5e6b4b0d3255bfef95601890afd80709");
    });

    it('should digest "abc"', () => {
        const md = SHA1.create();
        md.update("abc");
        assert.equal(
            md.digest().toHex(), "a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', () => {
        const md = SHA1.create();
        md.update("The quick brown fox jumps over the lazy dog");
        assert.equal(
            md.digest().toHex(), "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");
    });

    it('should digest "c\'\u00e8"', () => {
        const md = SHA1.create();
        md.update("c'\u00e8", "utf8");
        assert.equal(
            md.digest().toHex(), "98c9a3f804daa73b68a5660d032499a447350c0d");
    });

    it('should digest "THIS IS A MESSAGE"', () => {
        const md = SHA1.create();
        md.start();
        md.update("THIS IS ");
        md.update("A MESSAGE");
        // do twice to check continuing digest
        assert.equal(
            md.digest().toHex(), "5f24f4d6499fd2d44df6c6e94be8b14a796c071d");
        assert.equal(
            md.digest().toHex(), "5f24f4d6499fd2d44df6c6e94be8b14a796c071d");
    });

    it("should digest a long message", () => {
        // Note: might be too slow on old browsers
        const md = SHA1.create();
        md.update(UTIL.fillString("a", 1000000));
        assert.equal(
            md.digest().toHex(), "34aa973cd4c4daa4f61eeb2bdbad27316534016f");
    });

    it("should digest multiple long messages", () => {
        // Note: might be too slow on old browsers
        // done multiple times to check hot loop optimizations
        for (let loop = 0; loop < 3; ++loop) {
            const md = SHA1.create();
            for (let i = 0; i < 10000; ++i) {
                md.update("abc");
            }
            assert.equal(
                md.digest().toHex(), "a838edb5dec47b84b4bfb0a528ea958a5d9d2350");
        }
    });
});
