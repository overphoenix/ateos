const {
    configuration: { BaseConfig },
    error,
    is
} = ateos;

describe("configuration", "BaseConfig", () => {
    let conf;
    let proto;

    beforeEach(() => {
        conf = new BaseConfig();
        proto = conf.__proto__;
    });

    it("should have map-like interface", () => {
        assert.isTrue(ateos.isPropertyOwned(proto, "set") && ateos.isFunction(proto.set));
        assert.isTrue(ateos.isPropertyOwned(proto, "get") && ateos.isFunction(proto.get));
        assert.isTrue(ateos.isPropertyOwned(proto, "has") && ateos.isFunction(proto.has));
        assert.isTrue(ateos.isPropertyOwned(proto, "delete") && ateos.isFunction(proto.delete));
        assert.isTrue(ateos.isPropertyOwned(proto, "keys") && ateos.isFunction(proto.keys));
        assert.isTrue(ateos.isPropertyOwned(proto, "values") && ateos.isFunction(proto.values));
        assert.isTrue(ateos.isPropertyOwned(proto, "entries") && ateos.isFunction(proto.entries));
    });

    it("assign/merge methods should be part of interface", () => {
        assert.isTrue(ateos.isPropertyOwned(proto, "assign") && ateos.isFunction(proto.assign));
        assert.isTrue(ateos.isPropertyOwned(proto, "merge") && ateos.isFunction(proto.merge));
    });

    it("save/load methods should be abstract", () => {
        assert.isTrue(ateos.isPropertyOwned(proto, "load") && ateos.isFunction(proto.load));
        assert.isTrue(ateos.isPropertyOwned(proto, "save") && ateos.isFunction(proto.set));

        assert.throws(() => conf.load(), error.NotImplementedException);
        assert.throws(() => conf.save(), error.NotImplementedException);
    });

    it("'raw' object should be plain and accessible", () => {
        assert.isTrue(ateos.isPlainObject(conf.raw));
    });

    it("by default config should not have options", () => {
        assert.deepEqual(conf.raw, {});
    });

    it("should get undefined of nonexisting key", () => {
        assert.isUndefined(conf.get("nonexists"));
    });

    it("should correctly check key", () => {
        assert.throws(() => (conf.get(1)), error.InvalidArgumentException);
        assert.throws(() => (conf.get({})), error.InvalidArgumentException);
        assert.throws(() => (conf.get(/ateos/)), error.InvalidArgumentException);
        assert.throws(() => (conf.get(true)), error.InvalidArgumentException);
        assert.throws(() => (conf.get("")), error.InvalidArgumentException);
        assert.throws(() => (conf.get([])), error.InvalidArgumentException);
        assert.throws(() => (conf.get(["", "", ""])), error.InvalidArgumentException);
    });

    it("set()", () => {
        conf.set("a", 10);
        assert.equal(conf.raw.a, 10);
    });

    it("get()", () => {
        conf.set("a", 12);
        assert.equal(conf.get("a"), conf.raw.a);
    });

    it("has()", () => {
        assert.isFalse(conf.has("a"));
        conf.set("a", 12);
        assert.isTrue(conf.has("a"));
    });

    it("delete()", () => {
        assert.isFalse(conf.has("a"));
        conf.set("a", 12);
        assert.isTrue(conf.has("a"));
        conf.delete("a");
        assert.isFalse(conf.has("a"));
    });

    it("keys()", () => {
        conf.set("a", 1);
        conf.set("b", 2);
        conf.set("c", 3);

        assert.sameMembers(conf.keys(), ["a", "b", "c"]);
    });

    it("values()", () => {
        conf.set("a", 1);
        conf.set("b", 2);
        conf.set("c", 3);

        assert.sameMembers(conf.values(), [1, 2, 3]);
    });

    it("entries()", () => {
        conf.set("a", 1);
        conf.set("b", 2);
        conf.set("c", 3);

        assert.sameDeepMembers(conf.entries(), [["a", 1], ["b", 2], ["c", 3]]);
    });

    it("should set value of complex key", () => {
        conf.set("a.b", 10);
        assert.equal(conf.get("a.b"), 10);
        assert.equal(conf.raw.a.b, 10);
        conf.set("a.c.d", 20);
        assert.equal(conf.get("a.c.d"), 20);
        assert.equal(conf.raw.a.c.d, 20);
        conf.set("a.d.e.f.g", 30);
        assert.equal(conf.get("a.d.e.f.g"), 30);
        assert.equal(conf.raw.a.d.e.f.g, 30);
    });

    it("should set value of complex key (key as array)", () => {
        conf.set(["a", "b"], 10);
        assert.equal(conf.get("a.b"), 10);
        assert.equal(conf.raw.a.b, 10);
        conf.set(["a", "c", "d"], 20);
        assert.equal(conf.get(["a", "c", "d"]), 20);
        assert.equal(conf.raw.a.c.d, 20);
        conf.set(["a", "d", "e", "f", "g"], 30);
        assert.equal(conf.get("a.d.e.f.g"), 30);
        assert.equal(conf.raw.a.d.e.f.g, 30);
    });

    it("should reassign value of non-plain object", () => {
        conf.set("a.b", 10);
        assert.equal(conf.raw.a.b, 10);
        conf.set("a.b.d", 20);
        assert.equal(conf.raw.a.b.d, 20);
    });

    it("should reassign value of middle subkey", () => {
        conf.set("a.b.c", 10);
        assert.equal(conf.raw.a.b.c, 10);
        conf.set("a.b", 20);
        assert.equal(conf.raw.a.b, 20);
    });

    it("should has() correcly check existence of key", () => {
        conf.set("a.b.c", 10);
        assert.isTrue(conf.has("a"));
        assert.isTrue(conf.has("a.b"));
        assert.isTrue(conf.has("a.b.c"));
        assert.isFalse(conf.has("a.b.c.d"));

        class A {
            constructor() {
                this.val = 1;
            }
        }

        conf.set("a.b.a", new A());
        assert.isTrue(conf.has("a.b.a"));
        assert.isTrue(conf.has("a.b.a.val"));
        assert.isFalse(conf.has("a.b.a.other"));
    });

    it("should get() value of existence key", () => {
        conf.set("a.b.c", 10);
        assert.isTrue(ateos.isPlainObject(conf.get("a")));
        assert.isTrue(ateos.isPlainObject(conf.get("a.b")));
        assert.equal(conf.get("a.b.c"), 10);
        assert.isUndefined(conf.get("a.b.c.d"));

        class A {
            constructor() {
                this.val = 1;
            }
        }

        const a = new A();
        conf.set("a.b.a", a);
        assert.deepEqual(conf.get("a.b.a"), a);
        assert.equal(conf.get("a.b.a.val"), 1);
        assert.isUndefined(conf.get("a.b.a.other"));
    });

    it("should delete keys", () => {
        conf.set("a.b.c", 10);
        conf.delete("a.b.c");
        assert.isTrue(conf.has("a.b"));
        assert.isFalse(conf.has("a.b.c"));
        conf.delete("a");
        assert.isFalse(conf.has("a"));
        assert.isFalse(conf.has("a.b"));
    });

    it("initially keys() should return empty array", () => {
        assert.deepEqual(conf.keys(), []);
    });

    it("assign()", () => {
        conf.assign({
            a: 1,
            b: 2,
            c: 3
        });
        assert.equal(conf.raw.a, 1);
        assert.equal(conf.raw.b, 2);
        assert.equal(conf.raw.c, 3);
    });

    it("assign() multi", () => {
        conf.assign({
            a: 1,
            b: 2,
            c: 3
        }, {
            c: 4,
            d: 5
        }, {
            e: 6
        });
        assert.equal(conf.raw.a, 1);
        assert.equal(conf.raw.b, 2);
        assert.equal(conf.raw.c, 4);
        assert.equal(conf.raw.d, 5);
        assert.equal(conf.raw.e, 6);
    });

    it("assign() other configuration", () => {
        const otherConf = new BaseConfig();
        otherConf.assign({
            c: 4,
            d: 5
        }, {
            e: 6
        });
        conf.assign({
            a: 1,
            b: 2,
            c: 3
        }, otherConf);
        assert.equal(conf.raw.a, 1);
        assert.equal(conf.raw.b, 2);
        assert.equal(conf.raw.c, 4);
        assert.equal(conf.raw.d, 5);
        assert.equal(conf.raw.e, 6);
    });

    it("assign() to non existing key", () => {
        conf.assign("ateos", {
            a: 1,
            b: 2,
            c: 3
        });
        assert.equal(conf.raw.ateos.a, 1);
        assert.equal(conf.raw.ateos.b, 2);
        assert.equal(conf.raw.ateos.c, 3);
    });
});
