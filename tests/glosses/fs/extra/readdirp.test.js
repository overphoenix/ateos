describe("fs", "readdirp", () => {
    const { fs } = ateos;

    const totalDirs = 6;
    const totalFiles = 12;
    const ext1Files = 4;
    const ext3Files = 2;
    const fixtures = ateos.path.join(__dirname, "fixtures");
    const root = ateos.path.join(fixtures, "readdir");
    const getPath = (...p) => ateos.path.join(root, ...p);

    before(async () => {
        await fs.remove(ateos.path.join(root));
        try {
            ateos.std.fs.mkdirSync(fixtures);
        } catch (err) {
            //
        }
        ateos.std.fs.mkdirSync(getPath());
        ateos.std.fs.writeFileSync(getPath("root_file1.ext1"), "");
        ateos.std.fs.writeFileSync(getPath("root_file2.ext2"), "");
        ateos.std.fs.writeFileSync(getPath("root_file3.ext3"), "");

        ateos.std.fs.mkdirSync(getPath("root_dir1"));
        ateos.std.fs.writeFileSync(getPath("root_dir1", "root_dir1_file1.ext1"), "");
        ateos.std.fs.writeFileSync(getPath("root_dir1", "root_dir1_file2.ext2"), "");
        ateos.std.fs.writeFileSync(getPath("root_dir1", "root_dir1_file3.ext3"), "");
        ateos.std.fs.mkdirSync(getPath("root_dir1", "root_dir1_subdir1"));
        ateos.std.fs.writeFileSync(getPath("root_dir1", "root_dir1_subdir1", "root1_dir1_subdir1_file1.ext1"), "");
        ateos.std.fs.mkdirSync(getPath("root_dir1", "root_dir1_subdir2"));
        ateos.std.fs.writeFileSync(getPath("root_dir1", "root_dir1_subdir2", ".ignore"), "");

        ateos.std.fs.mkdirSync(getPath("root_dir2"));
        ateos.std.fs.writeFileSync(getPath("root_dir2", "root_dir2_file1.ext1"), "");
        ateos.std.fs.writeFileSync(getPath("root_dir2", "root_dir2_file2.ext2"), "");
        ateos.std.fs.mkdirSync(getPath("root_dir2", "root_dir2_subdir1"));
        ateos.std.fs.writeFileSync(getPath("root_dir2", "root_dir2_subdir1", ".ignore"), "");
        ateos.std.fs.mkdirSync(getPath("root_dir2", "root_dir2_subdir2"));
        ateos.std.fs.writeFileSync(getPath("root_dir2", "root_dir2_subdir2", ".ignore"), "");
    });

    after(async () => {
        await fs.remove(ateos.path.join(root));
    });

    it("reading root without filter", async () => {
        const result = await fs.readdirp(root);
        expect(result).to.have.lengthOf(totalFiles + totalDirs);
    });

    it("normal ['*.ext1', '*.ext3']", async () => {
        const result = await fs.readdirp(root, {
            fileFilter: ["*.ext1", "*.ext3"],
            directories: false
        });
        expect(result).to.have.lengthOf(ext1Files + ext3Files);
    });

    it("files only", async () => {
        const result = await fs.readdirp(root, {
            files: true,
            directories: false
        });
        expect(result).to.have.lengthOf(totalFiles);
    });

    it("directories only", async () => {
        const result = await fs.readdirp(root, {
            files: false
        });
        expect(result).to.have.lengthOf(totalDirs);
    });

    it("both - directories + files", async () => {
        const result = await fs.readdirp(root, {
            entryType: "both"
        });
        expect(result).to.have.lengthOf(totalFiles + totalDirs);
    });

    it("directory filter with directories only", async () => {
        const result = await fs.readdirp(root, {
            files: false,
            directoryFilter: ["root_dir1", "*dir1_subdir1"]
        });
        expect(result).to.have.lengthOf(2);
    });

    it("directory and file filters with both entries", async () => {
        const result = await fs.readdirp(root, {
            directoryFilter: ["root_dir1", "*dir1_subdir1"],
            fileFilter: ["!*.ext1"]
        });
        expect(result).to.have.lengthOf(6);
    });

    it("negated: ['!*.ext1', '!*.ext3']", async () => {
        const result = await fs.readdirp(root, {
            fileFilter: ["!*.ext1", "!*.ext3"],
            directories: false
        });
        expect(result).to.have.lengthOf(totalFiles - ext1Files - ext3Files);
    });

    it("reading root without filter using lstat", async () => {
        const result = await fs.readdirp(root, {
            lstat: true
        });
        expect(result).to.have.lengthOf(totalFiles + totalDirs);
    });

    it("reading root with symlinks using lstat", async function () {
        if (ateos.ateos.isWindows) {
            this.skip();
            return;
        }
        ateos.std.fs.symlinkSync(ateos.path.join(root, "root_dir1"), ateos.path.join(root, "dirlink"));
        ateos.std.fs.symlinkSync(ateos.path.join(root, "root_file1.ext1"), ateos.path.join(root, "link.ext1"));
        const result = await fs.readdirp(root, {
            lstat: true
        });
        try {
            expect(result).to.have.lengthOf(totalDirs + totalFiles + 2);
        } finally {
            ateos.std.fs.unlinkSync(ateos.path.join(root, "dirlink"));
            ateos.std.fs.unlinkSync(ateos.path.join(root, "link.ext1"));
        }
    });
});