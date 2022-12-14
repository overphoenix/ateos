const {
    fs: fse,
    path,
    std: { fs, os }
} = ateos;

const CWD = process.cwd();

const o755 = parseInt("755", 8);
const o777 = parseInt("777", 8);
const o666 = parseInt("666", 8);

describe("mkdirp / relative", () => {
    let TEST_DIR;
    let file;

    beforeEach((done) => {
        TEST_DIR = path.join(os.tmpdir(), "fs-extra", "mkdirp-relative");
        fse.emptyDir(TEST_DIR, (err) => {
            assert.ifError(err);

            const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
            const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
            const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);

            // relative path
            file = path.join(x, y, z);

            done();
        });
    });

    afterEach((done) => fse.remove(TEST_DIR, done));

    it("should make the directory with relative path", (done) => {
        process.chdir(TEST_DIR);

        fse.mkdirp(file, o755, (err) => {
            assert.ifError(err);
            fse.pathExists(file, (err, ex) => {
                assert.ifError(err);
                assert.ok(ex, "file created");
                fs.stat(file, (err, stat) => {
                    assert.ifError(err);
                    // restore
                    process.chdir(CWD);

                    if (os.platform().indexOf("win") === 0) {
                        assert.strictEqual(stat.mode & o777, o666);
                    } else {
                        assert.strictEqual(stat.mode & o777, o755);
                    }

                    assert.ok(stat.isDirectory(), "target not a directory");
                    done();
                });
            });
        });
    });
});
