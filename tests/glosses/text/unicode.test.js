describe("unicode", () => {
    const { unicode } = ateos.text;
    const result = (main, win) => ateos.ateos.isWindows ? win : main;

    console.log(`  ${Object.keys(unicode.symbol).map((x) => unicode[x]).join("  ")}\n`);

    it("approx", () => {
        assert.equal(unicode.approx("foo"), "foo");
        assert.equal(unicode.approx("?bar?"), "?bar?");
        assert.equal(unicode.approx("✔ ✔ ✔"), result("✔ ✔ ✔", "√ √ √"));
        assert.equal(unicode.approx("✔ ✖\n★ ▇"), result("✔ ✖\n★ ▇", "√ ×\n* █"));
        assert.equal(unicode.approx("✔ ✖ ★ ▇"), result("✔ ✖ ★ ▇", "√ × * █"));
    });
});
