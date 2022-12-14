const {
    fs: fse,
    path,
    std:{ os }
} = ateos;

describe("mkdirp / return value", () => {
    let TEST_DIR;

    beforeEach((done) => {
        TEST_DIR = path.join(os.tmpdir(), "fs-extra", "mkdirp-return");
        fse.emptyDir(TEST_DIR, done);
    });

    afterEach((done) => fse.remove(TEST_DIR, done));

    it("should", (done) => {
        const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
        const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
        const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);

        const dir = TEST_DIR + path.sep;
        const file = dir + [x, y, z].join(path.sep);

        // should return the first dir created.
        // By this point, it would be profoundly surprising if /tmp didn't
        // already exist, since every other test makes things in there.
        fse.mkdirp(file, (err, made) => {
            assert.ifError(err);
            assert.strictEqual(made, dir + x);
            fse.mkdirp(file, (err, made) => {
                assert.ifError(err);
                assert.strictEqual(made, null);
                done();
            });
        });
    });
});
