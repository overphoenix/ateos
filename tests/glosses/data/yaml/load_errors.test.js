import { TEST_SCHEMA } from "./support/schema";

describe("data", "yaml", "load errors", () => {
    const { fs, data: { yaml } } = ateos;
    const fixtures = new fs.Directory(__dirname, "error_samples");
    const files = fs.readdirSync(fixtures.path());

    for (const rfile of files) {
        const file = fixtures.getFile(rfile);
        specify(file.filename().slice(0, -3), async () => {
            const yamlSource = await file.contents();

            assert.throws(() => {
                yaml.loadAll(
                    yamlSource,
                    ateos.noop,
                    {
                        filename: file.filename(),
                        schema: TEST_SCHEMA,
                        onWarning(e) {
                            throw e;
                        }
                    }
                );
            }, yaml.Exception, file.filename());
        });
    }
});
