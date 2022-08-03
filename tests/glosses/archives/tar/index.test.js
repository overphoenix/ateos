const {
    is: { windows },
    noop,
    archive: { tar },
    std
} = ateos;

describe("archive", "tar", () => {
    const mtime = function (st) {
        return Math.floor(st.mtime.getTime() / 1000);
    };

    const fixtures = new ateos.fs.Directory(__dirname, "fixtures");
    const copy = fixtures.getDirectory("copy");

    beforeEach(async () => {
        await copy.unlink();
    });

    after(async () => {
        await copy.unlink();
    });

    it("copy a -> copy/a", async () => {
        const a = fixtures.getDirectory("a");
        const b = fixtures.getDirectory("copy", "a");

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path())).on("finish", resolve);
        });

        const files = await b.files();
        expect(files).to.have.lengthOf(1);
        expect(files[0].filename()).to.be.equal("hello.txt");

        const fileA = a.getFile("hello.txt");
        const fileB = b.getFile("hello.txt");

        const aStat = await fileA.stat();
        const bStat = await fileB.stat();

        expect(aStat.mode).to.be.equal(bStat.mode);
        expect(mtime(aStat)).to.be.equal(mtime(bStat));
        expect(await fileA.contents()).to.be.equal(await fileB.contents());
    });

    it("copy b -> copy/b", async () => {
        const a = fixtures.getDirectory("b");
        const b = fixtures.getDirectory("copy", "b");

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path())).on("finish", resolve);
        });

        const files = await b.files();
        expect(files).to.have.lengthOf(1);
        expect(files[0].filename()).to.be.equal("a");

        const dirA = a.getDirectory("a");
        const dirB = b.getDirectory("a");

        const adStat = await dirA.stat();
        const bdStat = await dirB.stat();

        expect(adStat.mode).to.be.equal(bdStat.mode);
        expect(mtime(adStat)).to.be.equal(mtime(bdStat));
        expect(bdStat.isDirectory()).to.be.true();

        const fileA = dirA.getFile("test.txt");
        const fileB = dirB.getFile("test.txt");

        const aStat = await fileA.stat();
        const bStat = await fileB.stat();

        expect(aStat.mode).to.be.equal(bStat.mode);
        expect(mtime(aStat)).to.be.equal(mtime(bStat));
        expect(await fileA.contents()).to.be.equal(await fileB.contents());
    });

    it("symlink", async function () {
        if (windows) { // no symlink support on win32 currently. TODO: test if this can be enabled somehow
            this.skip();
            return;
        }

        const a = fixtures.getDirectory("c");
        const b = fixtures.getDirectory("copy", "c");

        const hello = fixtures.getFile("a", "hello.txt");
        const link = fixtures.getFile("c", "link");
        await link.unlink().catch(noop);
        await hello.symbolicLink(link);

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path())).on("finish", resolve);
        });

        const files = (await b.files()).map((x) => x.filename()).sort();

        expect(files).to.have.lengthOf(2);
        expect(files).to.be.deep.equal([".gitignore", "link"]);

        const linkA = a.getSymbolicLinkFile("link");
        const linkB = b.getSymbolicLinkFile("link");

        const lstatA = await linkA.lstat();
        const lstatB = await linkB.lstat();

        expect(mtime(lstatA)).to.be.equal(mtime(lstatB));
        expect(await linkA.contents()).to.be.equal(await linkB.contents());
    });

    it("follow symlinks", async function () {
        if (windows) { // no symlink support on win32 currently. TODO: test if this can be enabled somehow
            this.skip();
            return;
        }

        const a = fixtures.getDirectory("c");
        const b = fixtures.getDirectory("copy", "c-dereference");

        const hello = fixtures.getFile("a", "hello.txt");
        const link = fixtures.getFile("c", "link");
        await link.unlink().catch(noop);
        await hello.symbolicLink(link);

        await new Promise((resolve) => {
            tar.packStream(a.path(), { dereference: true }).pipe(tar.unpackStream(b.path())).on("finish", resolve);
        });

        const files = (await b.files()).map((x) => x.filename()).sort();

        expect(files).to.have.lengthOf(2);
        expect(files).to.be.deep.equal([".gitignore", "link"]);

        const file1 = fixtures.getFile("a", "hello.txt");
        const file2 = b.getFile("link");

        const stat1 = await file1.lstat();
        const stat2 = await file2.lstat();
        expect(stat2.isSymbolicLink()).to.be.false();
        expect(mtime(stat1)).to.be.equal(mtime(stat2));
        expect(await file1.contents()).to.be.equal(await file2.contents());
    });

    it("strip", async () => {
        const a = fixtures.getDirectory("b");
        const b = fixtures.getDirectory("copy", "b-strip");

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path(), { strip: 1 })).on("finish", resolve);
        });

        const files = await b.files();

        expect(files).to.have.lengthOf(1);
        expect(files[0].relativePath(b)).to.be.equal("test.txt");
    });

    it("strip + map", async () => {
        const a = fixtures.getDirectory("b");
        const b = fixtures.getDirectory("copy", "b-strip");

        const uppercase = (header) => {
            header.name = header.name.toUpperCase();
            return header;
        };

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path(), { map: uppercase, strip: 1 })).on("finish", resolve);
        });

        const files = await b.files();

        expect(files).to.have.lengthOf(1);
        expect(files[0].relativePath(b)).to.be.equal("TEST.TXT");
    });

    it("map + dir + permissions", async () => {
        const a = fixtures.getDirectory("b");
        const b = fixtures.getDirectory("copy", "b-perms");

        const aWithMode = function (header) {
            if (header.name === "a") {
                header.mode = parseInt(700, 8);
            }
            return header;
        };

        await new Promise((resolve) => {
            tar.packStream(a.path()).pipe(tar.unpackStream(b.path(), { map: aWithMode })).on("finish", resolve);
        });

        const files = await b.files();

        expect(files).to.have.lengthOf(1);
        const stat = await files[0].stat();
        if (!windows) {
            expect(stat.mode & 0o777).to.be.equal(0o700);
        }
    });

    it("specific entries", async () => {
        const a = fixtures.getDirectory("d");
        const b = fixtures.getDirectory("copy", "d-entries");

        const entries = ["file1", "sub-files/file3", "sub-dir"];

        await new Promise((resolve) => {
            tar.packStream(a.path(), { entries }).pipe(tar.unpackStream(b.path())).on("finish", resolve);
        });

        const files = await b.files();
        expect(files).to.have.lengthOf(3);
        expect(files.map((x) => x.relativePath(b)).sort()).to.be.deep.equal([
            "file1", "sub-dir", "sub-files"
        ]);

        const subFiles = await b.getDirectory("sub-files").files();
        expect(subFiles).to.have.lengthOf(1);
        expect(subFiles[0].filename()).to.be.equal("file3");

        const subDir = await b.getDirectory("sub-dir").files();
        expect(subDir).to.have.lengthOf(1);
        expect(subDir[0].filename()).to.be.equal("file5");
    });

    it("check type while mapping header on packing", (done) => {
        const a = fixtures.getDirectory("e");
        let i = 0;

        const checkHeaderType = function (header) {
            if (header.name.indexOf(".") === -1) {
                if (windows && header.name === "symlink") {
                    // ok ?
                    expect(header.type).to.be.equal("file");
                } else {
                    expect(header.type).to.be.equal(header.name);
                }
                if (++i === 3) {
                    done();
                }
            }
        };

        tar.packStream(a.path(), { map: checkHeaderType });
    });

    it("finish callbacks", (done) => {
        const a = fixtures.getDirectory("a");
        const b = fixtures.getDirectory("copy", "a");

        let packEntries = 0;
        let extractEntries = 0;

        const countPackEntry = function (header) {
            packEntries++;
        };
        const countExtractEntry = function (header) {
            extractEntries++;
        };

        let pack;

        const onPackFinish = function (passedPack) {
            assert.equal(packEntries, 2, "All entries have been packed"); // 2 entries - the file and base directory
            assert.equal(passedPack, pack, "The finish hook passes the pack");
        };

        const onExtractFinish = function () {
            assert.equal(extractEntries, 2);
        };

        pack = tar.packStream(a.path(), { map: countPackEntry, finish: onPackFinish });

        pack.pipe(tar.unpackStream(b.path(), { map: countExtractEntry, finish: onExtractFinish })).on("finish", () => {
            done();
        });
    });

    it("not finalizing the pack", async () => {
        const a = fixtures.getDirectory("a");
        const b = fixtures.getDirectory("b");

        const out = fixtures.getDirectory("copy", "merged-packs");

        const prefixer = function (prefix) {
            return function (header) {
                header.name = std.path.join(prefix, header.name);
                return header;
            };
        };

        await new Promise((resolve) => {
            tar.packStream(a.path(), {
                map: prefixer("a-files"),
                finalize: false,
                finish: (pack) => {
                    tar.packStream(b.path(), { pack, map: prefixer("b-files") })
                        .pipe(tar.unpackStream(out.path()))
                        .on("finish", resolve);
                }
            });
        });

        const containers = await out.files();
        assert.deepEqual(containers.map((x) => x.filename()), ["a-files", "b-files"]);
        const aFiles = await out.getDirectory("a-files").files();
        assert.deepEqual(aFiles.map((x) => x.filename()), ["hello.txt"]);
    });

    it("no abs hardlink targets", async (done) => {
        const out = fixtures.getDirectory("invalid");
        const outside = fixtures.getFile("outside");

        await out.create();
        await out.clean();

        const s = new tar.RawPackStream();

        await outside.write("something");

        s.entry({
            type: "link",
            name: "link",
            linkname: outside.path()
        });

        s.entry({
            name: "link"
        }, "overwrite");

        s.finalize();

        await s.pipe(tar.unpackStream(out.path())).on("error", (err) => {
            assert.ok(err, "had error");
            outside.contents("utf8").then(async (str) => {
                assert.equal(str, "something");
                await out.unlink();
                await outside.unlink();
                done();
            });
        });
    });
});
