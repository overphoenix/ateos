const {
  std
} = ateos;

const fixture = std.path.join.bind(std.path, __dirname, "fixtures");

describe("cli", () => {
  const ATEOS_CLI_PATH = ateos.getPath("bin", "ateos.js");
  describe("'run' command", () => {
    it("simple script", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("raw.js")]);
      assert.strictEqual(result.stdout, "start\nstop");
    });

    it("ateos simplified application", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("active_simple_app.js")]);
      assert.strictEqual(result.stdout, "0\n1\n2\n3");
    });

    it("ateos application", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("active_app.js")]);
      assert.strictEqual(result.stdout, "0\n1\n2\n3");
    });

    it("evaluate script", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "console.log(process.versions)"]);
      assert.deepEqual(ateos.data.json5.decode(result.stdout), process.versions);
    });

    it("evaluate script with default export", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export default { a: 1, b: 2, c: 3 };"]);
      assert.deepEqual(ateos.data.json5.decode(result.stdout), {
        a: 1,
        b: 2,
        c: 3
      });
    });

    it("evaluate script with export", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export const data = { a: 1, b: 2, c: 3 };"]);
      assert.deepEqual(ateos.data.json5.decode(result.stdout), {
        data: {
          a: 1,
          b: 2,
          c: 3
        }
      });
    });

    it("evaluate script with function default export", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export default function () { console.log(['use', 'simple', 'powerful', 'tools']); }"]);
      const parts = result.stdout.split("\n");
      assert.sameMembers(ateos.data.json5.decode(parts[0]), ["use", "simple", "powerful", "tools"]);
      assert.strictEqual(parts[1], "undefined");
    });

    it("evaluate script with function default export that retrun value", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export default function () { return ['use', 'simple', 'powerful', 'tools']; }"]);
      assert.sameMembers(ateos.data.json5.decode(result.stdout), ["use", "simple", "powerful", "tools"]);
    });

    it("evaluate script with async function default export", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export default function () { console.log(['use', 'simple', 'powerful', 'tools']); }"]);
      const parts = result.stdout.split("\n");
      assert.sameMembers(ateos.data.json5.decode(parts[0]), ["use", "simple", "powerful", "tools"]);
      assert.strictEqual(parts[1], "undefined");
    });

    it("evaluate script with async function default export that retrun value", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", "-e", "export default function () { return ['use', 'simple', 'powerful', 'tools']; }"]);
      assert.sameMembers(ateos.data.json5.decode(result.stdout), ["use", "simple", "powerful", "tools"]);
    });

    it("script with default function export ", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("function_export.js")]);
      assert.strictEqual(result.stdout, `ateos v${ateos.package.version}`);
    });

    it("script with default async function export ", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("async_function_export.js")]);
      assert.strictEqual(result.stdout, `ateos v${ateos.package.version}`);
    });

    it("script with commonjs function export ", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("commonjs_function_export.js")]);
      assert.strictEqual(result.stdout, `ateos v${ateos.package.version}`);
    });

    it("run ateos application in a path", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("app")]);
      assert.strictEqual(result.stdout, "app running");
    });

    it("run task", async () => {
      const result = await forkProcess(ATEOS_CLI_PATH, ["run", fixture("task.js")]);
      assert.strictEqual(result.stdout, `ateos v${ateos.package.version}`);
    });
  });
});
