const {
    is,
    fs: fse,
    path,
    std: { fs, os }
} = ateos;

// const proxyquire = require("proxyquire");
let gracefulFsStub;
let utimes;

describe("utimes", () => {
    let TEST_DIR;

    beforeEach((done) => {
        TEST_DIR = path.join(os.tmpdir(), "fs-extra", "utimes");
        fse.emptyDir(TEST_DIR, done);
        // reset stubs
        gracefulFsStub = {};
        utimes = fse.util; //proxyquire(srcPath("util/utimes"), { "graceful-fs": gracefulFsStub });
    });

    describe("hasMillisResSync()", () => {
        it("should return a boolean indicating whether it has support", () => {
            const res = utimes.hasMillisResSync();
            assert.strictEqual(typeof res, "boolean");

            // HFS => false
            if (process.platform === "darwin") {
                assert.strictEqual(res, false);
            }

            // does anyone use FAT anymore?
            // if (process.platform === 'win32') assert.strictEqual(res, true)
            // fails on appveyor... could appveyor be using FAT?

            // this would fail if ext2/ext3
            if (process.platform === "linux") {
                assert.strictEqual(res, true);
            }
        });
    });

    describe("timeRemoveMills()", () => {
        it("should remove millisecond precision from a timestamp", () => {
            const ts = 1334990868773;
            const ets = 1334990868000;
            assert.strictEqual(utimes.timeRemoveMillis(ts), ets);
            assert.strictEqual(utimes.timeRemoveMillis(new Date(ts)).getTime(), ets);
        });
    });

    describe("utimesMillis()", () => {
        // see discussion https://github.com/jprichardson/node-fs-extra/pull/141
        it("should set the utimes w/ millisecond precision", (done) => {
            const tmpFile = path.join(TEST_DIR, "someFile");
            fs.writeFileSync(tmpFile, "hello");

            let stats = fs.lstatSync(tmpFile);

            // Apr 21st, 2012
            const awhileAgo = new Date(1334990868773);
            const awhileAgoNoMillis = new Date(1334990868000);

            assert.notDeepEqual(stats.mtime, awhileAgo);
            assert.notDeepEqual(stats.atime, awhileAgo);

            utimes.utimesMillis(tmpFile, awhileAgo, awhileAgo, (err) => {
                assert.ifError(err);
                stats = fs.statSync(tmpFile);
                if (utimes.hasMillisResSync()) {
                    assert.deepStrictEqual(stats.mtime, awhileAgo);
                    assert.deepStrictEqual(stats.atime, awhileAgo);
                } else {
                    assert.deepStrictEqual(stats.mtime, awhileAgoNoMillis);
                    assert.deepStrictEqual(stats.atime, awhileAgoNoMillis);
                }
                done();
            });
        });

        it.todo("should close open file desciptors after encountering an error", (done) => {
            const fakeFd = Math.random();

            gracefulFsStub.open = (pathIgnored, flagsIgnored, modeIgnored, callback) => {
                if (ateos.isFunction(modeIgnored)) {
                    callback = modeIgnored;
                }
                process.nextTick(() => callback(null, fakeFd));
            };

            let closeCalled = false;
            gracefulFsStub.close = (fd, callback) => {
                assert.strictEqual(fd, fakeFd);
                closeCalled = true;
                if (callback) {
                    process.nextTick(callback);
                }
            };

            let testError;
            gracefulFsStub.futimes = (fd, atimeIgnored, mtimeIgnored, callback) => {
                process.nextTick(() => {
                    testError = new Error("A test error");
                    callback(testError);
                });
            };

            utimes.utimesMillis("ignored", "ignored", "ignored", (err) => {
                assert.strictEqual(err, testError);
                assert(closeCalled);
                done();
            });
        });
    });
});
