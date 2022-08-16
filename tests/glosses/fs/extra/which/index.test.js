const {
    is,
    fs: { remove, mkdir, which, whichSync }
} = ateos;

const fixture = ateos.path.join(__dirname, "which_fixture");
const isWindows = ateos.isWindows || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
const skip = isWindows ? "not relevant on windows" : false;

describe("fs", "which", () => {
    before(async () => {
        await remove(fixture);
        await mkdir(fixture);
        ateos.std.fs.writeFileSync(`${fixture}/foo.sh`, "echo foo\n");
    });

    after(async () => {
        await remove(fixture);
    });

    it("does not find missed", async () => {
        let err = await assert.throws(async () => which(`${fixture}/foobar.sh`));
        assert.instanceOf(err, Error);
        assert.equal(err.code, "ENOENT");

        err = assert.throws(() => whichSync(`${fixture}/foobar.sh`));
        assert.equal(err.code, "ENOENT");

        assert.equal(whichSync(`${fixture}/foobar.sh`, { nothrow: true }), null);
    });

    if (!skip) {
        describe("does not find non-executable", () => {
            it("absolute", async () => {
                let err = await assert.throws(async () => which(`${fixture}/foo.sh`));
                assert.instanceOf(err, Error);
                assert.equal(err.code, "ENOENT");

                err = assert.throws(() => whichSync(`${fixture}/foo.sh`));
                assert.equal(err.code, "ENOENT");
            });

            it("with path", async () => {
                let err = await assert.throws(async () => which("foo.sh", { path: fixture }));
                assert.instanceOf(err, Error);
                assert.equal(err.code, "ENOENT");

                err = assert.throws(() => whichSync("foo.sh", { path: fixture }));
                assert.equal(err.code, "ENOENT");
            });
        });
    }

    describe("find when executable", () => {
        let opt;
        let expect;
        let PATH;

        before(() => {
            ateos.std.fs.chmodSync(`${fixture}/foo.sh`, "0755");

            opt = { pathExt: ".sh" };
            expect = ateos.std.path.resolve(fixture, "foo.sh").toLowerCase();
            PATH = process.env.PATH;
        });

        const runTest = async (exec) => {
            let found = whichSync(exec, opt).toLowerCase();
            assert.equal(found, expect);

            found = await which(exec, opt);
            assert.equal(found.toLowerCase(), expect);
            process.env.PATH = PATH;
        };

        it("absolute", async () => {
            await runTest(`${fixture}/foo.sh`);
        });

        it("with process.env.PATH", async () => {
            process.env.PATH = fixture;
            await runTest("foo.sh");
        });

        if (isWindows) {
            describe("with pathExt", () => {
                const pe = process.env.PATHEXT;

                before(() => {
                    process.env.PATHEXT = ".SH";
                    process.env.PATH = fixture;
                });

                after(() => {
                    process.env.PATHEXT = pe;
                });

                it("foo.sh", async () => {
                    process.env.PATH = fixture;
                    await runTest("foo.sh");
                });

                it("foo", async () => {
                    process.env.PATH = fixture;
                    await runTest("foo");
                });
            });
        }

        it("with path opt", async () => {
            opt.path = fixture;
            await runTest("foo.sh");
        });

        describe("relative path", () => {
            const opt = { pathExt: ".sh" };
            let expect;
            let rel;


            before(() => {
                rel = ateos.std.path.relative(process.cwd(), fixture);
                expect = ateos.path.join(ateos.std.path.relative(process.cwd(), fixture), "foo.sh");
            });

            it("no ./", async () => {
                let actual = whichSync(ateos.path.join(rel, "foo.sh"), opt);
                assert.equal(actual, expect);
                actual = await which(ateos.path.join(rel, "foo.sh"), opt);
                assert.equal(actual, expect);
            });

            it("with ./", async () => {
                expect = `./${expect}`;
                let actual = whichSync(`./${expect}`, opt);
                assert.equal(actual, expect);
                actual = await which(`./${expect}`, opt);
                assert.equal(actual, expect);
            });

            it("with ../", async () => {
                const dir = ateos.std.path.basename(process.cwd());
                expect = ateos.path.join("..", dir, expect);
                let actual = whichSync(expect, opt);
                assert.equal(actual, expect);
                actual = await which(expect, opt);
                assert.equal(actual, expect);
            });
        });
    });
});
