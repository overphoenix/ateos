const {
    fs: fse,
    path,
    std: { fs, os }
} = ateos;

describe("fs-extra", () => {
    let TEST_DIR;

    beforeEach((done) => {
        TEST_DIR = path.join(os.tmpdir(), "fs-extra", "create");
        fse.emptyDir(TEST_DIR, done);
    });

    afterEach((done) => fse.remove(TEST_DIR, done));

    describe("+ createFile", () => {
        describe("> when the file and directory does not exist", () => {
            it("should create the file", (done) => {
                const file = path.join(TEST_DIR, `${Math.random()}t-ne`, `${Math.random()}.txt`);
                assert(!fs.existsSync(file));
                fse.createFile(file, (err) => {
                    assert.ifError(err);
                    assert(fs.existsSync(file));
                    done();
                });
            });
        });

        describe("> when the file does exist", () => {
            it("should not modify the file", (done) => {
                const file = path.join(TEST_DIR, `${Math.random()}t-e`, `${Math.random()}.txt`);
                fse.mkdirpSync(path.dirname(file));
                fs.writeFileSync(file, "hello world");
                fse.createFile(file, (err) => {
                    assert.ifError(err);
                    assert.strictEqual(fs.readFileSync(file, "utf8"), "hello world");
                    done();
                });
            });
        });
    });

    describe("+ createFileSync", () => {
        describe("> when the file and directory does not exist", () => {
            it("should create the file", () => {
                const file = path.join(TEST_DIR, `${Math.random()}ts-ne`, `${Math.random()}.txt`);
                assert(!fs.existsSync(file));
                fse.createFileSync(file);
                assert(fs.existsSync(file));
            });
        });

        describe("> when the file does exist", () => {
            it("should not modify the file", () => {
                const file = path.join(TEST_DIR, `${Math.random()}ts-e`, `${Math.random()}.txt`);
                fse.mkdirpSync(path.dirname(file));
                fs.writeFileSync(file, "hello world");
                fse.createFileSync(file);
                assert.strictEqual(fs.readFileSync(file, "utf8"), "hello world");
            });
        });
    });
});
