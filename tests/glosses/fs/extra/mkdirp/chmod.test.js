const {
    fs: fse,
    path,
    std: { fs, os }
} = ateos;

const o755 = parseInt("755", 8);
const o744 = parseInt("744", 8);
const o777 = parseInt("777", 8);
const o666 = parseInt("666", 8);

describe("mkdirp / chmod", () => {
    let TEST_DIR;
    let TEST_SUBDIR;

    beforeEach((done) => {
        const ps = [];
        for (let i = 0; i < 15; i++) {
            const dir = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
            ps.push(dir);
        }

        TEST_SUBDIR = ps.join(path.sep);

        TEST_DIR = path.join(os.tmpdir(), "fs-extra", "mkdirp-chmod");
        TEST_SUBDIR = path.join(TEST_DIR, TEST_SUBDIR);

        fse.emptyDir(TEST_DIR, done);
    });

    afterEach((done) => fse.remove(TEST_DIR, done));

    it("chmod-pre", (done) => {
        const mode = o744;
        console.log(ateos.sprintf("%b", (~process.umask() >>> 0) & 0xff));
        fse.mkdirp(TEST_SUBDIR, mode, (err) => {
            assert.ifError(err, "should not error");
            fs.stat(TEST_SUBDIR, (err, stat) => {
                assert.ifError(err, "should exist");
                assert.ok(stat && stat.isDirectory(), "should be directory");

                if (os.platform().indexOf("win") === 0) {
                    assert.strictEqual(stat && stat.mode & o777, o666, "windows shit");
                } else {
                    assert.strictEqual(stat && stat.mode & o777, mode, "should be o744");
                }

                done();
            });
        });
    });

    it("chmod", (done) => {
        const mode = o755;
        fse.mkdirp(TEST_SUBDIR, mode, (err) => {
            assert.ifError(err, "should not error");
            fs.stat(TEST_SUBDIR, (err, stat) => {
                assert.ifError(err, "should exist");
                assert.ok(stat && stat.isDirectory(), "should be directory");
                done();
            });
        });
    });
});
