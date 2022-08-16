/**
 * Test suite for ateos-centric configurations (like ateos.json, cli.json, omnitron.json)
 * 
 * Ateos-centric configuration is a configuration that placed at '<REALM_ROOT>/configs' directory.
 */

const {
    is,
    std
} = ateos;

export default (ConfigurationClass) => {
    describe("configuration interface", () => {
        describe("static properties", () => {
            it("configName", () => {
                assert.isTrue(ateos.isString(ConfigurationClass.configName));
            });

            it("default configuration", () => {
                assert.isTrue(ateos.isPlainObject(ConfigurationClass.default));
            });

            it("load()", () => {
                assert.isTrue(ateos.isFunction(ConfigurationClass.load));
            });
        });

        describe("interface", () => {
            let config;

            beforeEach(() => {
                config = new ConfigurationClass();
            });
            
            it("getPath()", () => {
                assert.isFunction(config.getPath);
                assert.strictEqual(config.getPath(), std.path.resolve(ConfigurationClass.configName));
            });
            
            it("load()", () => {
                assert.isFunction(config.load);
                assert.lengthOf(config.load, 0);
            });

            it("save()", () => {
                assert.isFunction(config.save);
                assert.lengthOf(config.save, 0);
            });
        });
    });
};
