const {
    fs: fse
} = ateos;

const fs = require("fs");
const os = require("os");
const path = require("path");
const assert = require("assert");
const { copySync } = fse;

describe("copy-sync / broken symlink", () => {
    const TEST_DIR = path.join(os.tmpdir(), "fs-extra", "copy-sync-broken-symlinks");
    const src = path.join(TEST_DIR, "src");
    const out = path.join(TEST_DIR, "out");

    beforeEach((done) => {
        fse.emptyDir(TEST_DIR, (err) => {
            assert.ifError(err);
            createFixtures(src, done);
        });
    });

    afterEach((done) => fse.remove(TEST_DIR, done));

    it("should error if symlink is broken", () => {
        assert.throws(() => copySync(src, out));
    });

    it("should throw an error when dereference=true", () => {
        assert.throws(() => copySync(src, out, { dereference: true }), (err) => err.code === "ENOENT");
    });
});

function createFixtures(srcDir, callback) {
    fs.mkdir(srcDir, (err) => {
        let brokenFile;
        let brokenFileLink;

        if (err) {
            return callback(err);
        }

        try {
            brokenFile = path.join(srcDir, "does-not-exist");
            brokenFileLink = path.join(srcDir, "broken-symlink");
            fs.writeFileSync(brokenFile, "does not matter");
            fs.symlinkSync(brokenFile, brokenFileLink, "file");
        } catch (err) {
            callback(err);
        }

        // break the symlink now
        fse.remove(brokenFile, callback);
    });
}
