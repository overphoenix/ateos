const { regex } = ateos;

describe("regex", () => {
    it("posix filename", () => {
        const valids = [
            "index.js",
            "filename",
            "file_name",
            "file-name",
            "file name"
        ];

        const invalids = [
            "C:\\foo\\bar\\",
            "foo\\file",
            "index.js\\",
            "/foo/bar",
            ":foobar",
            "foo/bar:"
        ];

        for (let i = 0; i < invalids.length; i++) {
            assert.isTrue(regex.filename().test(valids[i]));
        }

        for (let i = 0; i < invalids.length; i++) {
            assert.isFalse(regex.filename().test(invalids[i]));
        }
    });

    describe("shebang", () => {
        it("with", () => {
            assert.isTrue(regex.shebang().test('#!/usr/bin/env node\nconsole.log("unicorns");'));
            assert.equal(regex.shebang().exec("#!/usr/bin/env node")[1], "/usr/bin/env node");
        });

        it("without", () => {
            assert.equal(regex.shebang().exec("abc"), null);
        });
    });

    it("nodeModules", () => {
        const { nodeModules } = regex;
        assert.isTrue(nodeModules().test("node_modules"));
        assert.isTrue(nodeModules().test("node_modules/foo/bar.js"));
        assert.isTrue(nodeModules().test("node_modules\\foo\\bar.js"));
        assert.isTrue(nodeModules().test("./node_modules"));
        assert.isTrue(nodeModules().test(".\\node_modules"));
        assert.isTrue(nodeModules().test("/foo/bar/node_modules/blah.js"));
        assert.isTrue(nodeModules().test("\\foo\\bar\\node_modules\\blah.js"));
        assert.isTrue(nodeModules().test("node_modules/foo/bar.js"));
        assert.isTrue(nodeModules().test("foo/node_modulesa/bar/node_modules/foo"));
        assert.isFalse(nodeModules().test("foo/node_modulesa/bar/node_modulesb/foo"));
        assert.isFalse(nodeModules().test("anode_modules"));
        assert.isFalse(nodeModules().test("node_modulesb"));
        assert.isFalse(nodeModules().test("node_modules.js"));

    });
});
