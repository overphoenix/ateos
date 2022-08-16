describe("archive", "zip", "pack", () => {
    const { std: { fs }, archive: { zip: { pack, unpack } }, collection: { BufferList } } = ateos;

    it("should pack and unpack", async () => {
        const fileMetadata = {
            mtime: new Date(),
            mode: 0o100664
        };
        const zipfile = new pack.ZipFile();
        zipfile.addFile(__filename, "unicōde.txt");
        zipfile.addFile(__filename, "without-compression.txt", { compress: false });
        zipfile.addReadStream(fs.createReadStream(__filename), "readStream.txt", fileMetadata);
        const expectedContents = fs.readFileSync(__filename);
        zipfile.addBuffer(expectedContents, "with/directories.txt", fileMetadata);
        zipfile.addBuffer(expectedContents, "with\\windows-paths.txt", fileMetadata);
        const finalSize = await zipfile.end();
        expect(finalSize).to.be.equal(-1, "final size is impossible to know before compression");
        const data = await new Promise((resolve, reject) => {
            zipfile.outputStream.pipe(new BufferList((err, data) => {
                err ? reject(err) : resolve(data);
            }));
        });

        const zipFile = await unpack.fromBuffer(data, { lazyEntries: true });
        const buffers = [];
        for (; ;) {
            const entry = await zipFile.readEntry();
            if (ateos.ateos.isNull(entry)) {
                break;
            }
            const readStream = await zipFile.openReadStream(entry);
            const data = await readStream.pipe(ateos.stream.concat.create("buffer"));
            buffers.push(data);
        }
        expect(buffers).to.have.lengthOf(5);
        for (const buf of buffers) {
            expect(buf).to.be.deep.equal(expectedContents);
        }
    });

    describe("the final size prediction with zip64", () => {
        const zip64Combinations = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ];
        for (const zip64Config of zip64Combinations) {
            specify(`[${zip64Config.join(", ")}]`, async () => {
                const options = {
                    compress: false,
                    size: null,
                    forceZip64Format: false
                };
                const zipfile = new pack.ZipFile();
                options.forceZip64Format = Boolean(zip64Config[0]);
                zipfile.addFile(__filename, "asdf.txt", options);
                options.forceZip64Format = Boolean(zip64Config[1]);
                zipfile.addFile(__filename, "fdsa.txt", options);
                options.forceZip64Format = Boolean(zip64Config[2]);
                zipfile.addBuffer(Buffer.from("buffer"), "buffer.txt", options);
                options.forceZip64Format = Boolean(zip64Config[3]);
                options.size = "stream".length;
                zipfile.addReadStream(new BufferList().append("stream"), "stream.txt", options);
                options.size = null;
                const finalSize = await zipfile.end({ forceZip64Format: Boolean(zip64Config[4]) });
                if (finalSize === -1) {
                    throw new Error("finalSize should be known");
                }
                const data = await zipfile.outputStream.pipe(ateos.stream.concat.create("buffer"));
                expect(finalSize).to.be.equal(data.length);
            });
        }
    });

    it("should keep the order", async () => {
        const zipfile = new pack.ZipFile();
        // all options parameters are optional
        zipfile.addFile(__filename, "a.txt");
        zipfile.addBuffer(Buffer.from("buffer"), "b.txt");
        zipfile.addReadStream(new BufferList().append("stream"), "c.txt");
        zipfile.addEmptyDirectory("d/");
        zipfile.addEmptyDirectory("e");
        const finalSize = await zipfile.end();
        expect(finalSize).to.be.equal(-1, "final size should be unknown");
        const data = await zipfile.outputStream.pipe(ateos.stream.concat.create("buffer"));
        const zipFile = await unpack.fromBuffer(data, { lazyEntries: true });
        const expected = ["a.txt", "b.txt", "c.txt", "d/", "e/"];
        const actual = [];
        for (; ;) {
            const entry = await zipFile.readEntry();
            if (ateos.ateos.isNull(entry)) {
                break;
            }
            actual.push(entry.fileName);
        }
        expect(actual).to.be.deep.equal(expected);
    });

    it("should predict the final size with buffers", async () => {
        const zipfile = new pack.ZipFile();
        // all options parameters are optional
        zipfile.addBuffer(Buffer.from("hello"), "hello.txt", { compress: false });
        const finalSize = await zipfile.end();
        expect(finalSize).not.to.be.equal(-1, "final size should be known");
        const data = await zipfile.outputStream.pipe(ateos.stream.concat.create("buffer"));
        expect(data.length).to.be.equal(finalSize, "prediction is wrong");
        const zipFile = await unpack.fromBuffer(data, { lazyEntries: true });
        const actual = [];
        for (; ;) {
            const entry = await zipFile.readEntry();
            if (ateos.ateos.isNull(entry)) {
                break;
            }
            actual.push(entry.fileName);
        }
        expect(actual).to.be.deep.equal(["hello.txt"]);
    });

    describe("comments", () => {
        const weirdChars = "\u0000☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";

        it("case 1", async () => {
            const testCases = [
                ["Hello World", "Hello World"],
                [Buffer.from("Hello"), "Hello"],
                [weirdChars, weirdChars]
            ];
            for (let i = 0; i < testCases.length; i++) {
                const testCase = testCases[i];
                const zipfile = new pack.ZipFile();
                // eslint-disable-next-line no-await-in-loop
                const finalSize = await zipfile.end({
                    comment: testCase[0]
                });
                expect(finalSize).not.to.be.equal(-1, "final size should be known");
                // eslint-disable-next-line no-await-in-loop
                const data = await zipfile.outputStream.pipe(new BufferList());
                expect(data.length).to.be.equal(finalSize, "prediction is wrong");
                // eslint-disable-next-line no-await-in-loop
                const zipFile = await unpack.fromBuffer(data);
                expect(zipFile.comment).to.be.equal(testCase[1], "comment is wrong");
            }
        });

        it("case 2", async () => {
            const zipfile = new pack.ZipFile();
            try {
                await zipfile.end({
                    comment: Buffer.from("01234567890123456789" + "\x50\x4b\x05\x06" + "01234567890123456789")
                });
            } catch (e) {
                assert.isTrue(e.toString().includes("comment contains end of central directory record signature"));
                return;
            }
            assert.fail("expected error for including eocdr signature in comment");
        });

        it("case 3", async (done) => {
            const testCases = [
                ["Hello World!", "Hello World!"],
                [Buffer.from("Hello!"), "Hello!"],
                [weirdChars, weirdChars]
            ];

            for (let i = 0; i < testCases.length; i++) {
                const testCase = testCases[i];
                const zipfile = new pack.ZipFile();
                // all options parameters are optional
                zipfile.addBuffer(Buffer.from("hello"), "hello.txt", { compress: false, fileComment: testCase[0] });
                // eslint-disable-next-line no-await-in-loop
                const finalSize = await zipfile.end();
                expect(finalSize).not.to.be.equal(-1, "final size should be known");
                // eslint-disable-next-line no-await-in-loop
                const data = await zipfile.outputStream.pipe(new BufferList());
                expect(data.length).to.be.equal(finalSize, "prediction is wrong");
                // eslint-disable-next-line no-await-in-loop
                const zipFile = await unpack.fromBuffer(data);
                zipFile.on("entry", (entry) => {
                    assert.equal(entry.fileComment, testCase[1], "fileComment is wrong");
                });
                zipFile.on("end", () => {
                    if (i === (testCases.length - 1)) {
                        done();
                    }
                });
            }
        });
    });
});
