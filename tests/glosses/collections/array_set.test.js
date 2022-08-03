const {
    collection: { ArraySet }
} = ateos;


const makeTestSet = function () {
    const set = new ArraySet();
    for (let i = 0; i < 100; i++) {
        set.add(String(i));
    }
    return set;
};

describe("collection", "ArraySet", () => {
    it("test .has() membership", () => {
        const set = makeTestSet();
        for (let i = 0; i < 100; i++) {
            assert.ok(set.has(String(i)));
        }
    });
    
    it("test .indexOf() elements", () => {
        const set = makeTestSet();
        for (let i = 0; i < 100; i++) {
            assert.strictEqual(set.indexOf(String(i)), i);
        }
    });
    
    it("test .at() indexing", () => {
        const set = makeTestSet();
        for (let i = 0; i < 100; i++) {
            assert.strictEqual(set.at(i), String(i));
        }
    });
    
    it("test creating from an array", () => {
        const set = ArraySet.fromArray(["foo", "bar", "baz", "quux", "hasOwnProperty"]);
    
        assert.ok(set.has("foo"));
        assert.ok(set.has("bar"));
        assert.ok(set.has("baz"));
        assert.ok(set.has("quux"));
        assert.ok(set.has("hasOwnProperty"));
    
        assert.strictEqual(set.indexOf("foo"), 0);
        assert.strictEqual(set.indexOf("bar"), 1);
        assert.strictEqual(set.indexOf("baz"), 2);
        assert.strictEqual(set.indexOf("quux"), 3);
    
        assert.strictEqual(set.at(0), "foo");
        assert.strictEqual(set.at(1), "bar");
        assert.strictEqual(set.at(2), "baz");
        assert.strictEqual(set.at(3), "quux");
    });
    
    it("test that you can add __proto__; see github issue #30", () => {
        const set = new ArraySet();
        set.add("__proto__");
        assert.ok(set.has("__proto__"));
        assert.strictEqual(set.at(0), "__proto__");
        assert.strictEqual(set.indexOf("__proto__"), 0);
    });
    
    it("test .fromArray() with duplicates", () => {
        let set = ArraySet.fromArray(["foo", "foo"]);
        assert.ok(set.has("foo"));
        assert.strictEqual(set.at(0), "foo");
        assert.strictEqual(set.indexOf("foo"), 0);
        assert.strictEqual(set.toArray().length, 1);
    
        set = ArraySet.fromArray(["foo", "foo"], true);
        assert.ok(set.has("foo"));
        assert.strictEqual(set.at(0), "foo");
        assert.strictEqual(set.at(1), "foo");
        assert.strictEqual(set.indexOf("foo"), 0);
        assert.strictEqual(set.toArray().length, 2);
    });
    
    it("test .add() with duplicates", () => {
        const set = new ArraySet();
        set.add("foo");
    
        set.add("foo");
        assert.ok(set.has("foo"));
        assert.strictEqual(set.at(0), "foo");
        assert.strictEqual(set.indexOf("foo"), 0);
        assert.strictEqual(set.toArray().length, 1);
    
        set.add("foo", true);
        assert.ok(set.has("foo"));
        assert.strictEqual(set.at(0), "foo");
        assert.strictEqual(set.at(1), "foo");
        assert.strictEqual(set.indexOf("foo"), 0);
        assert.strictEqual(set.toArray().length, 2);
    });
    
    it("test .size()", () => {
        const set = new ArraySet();
        set.add("foo");
        set.add("bar");
        set.add("baz");
        assert.strictEqual(set.size(), 3);
    });
    
    it("test .size() with disallowed duplicates", () => {
        const set = new ArraySet();
    
        set.add("foo");
        set.add("foo");
    
        set.add("bar");
        set.add("bar");
    
        set.add("baz");
        set.add("baz");
    
        assert.strictEqual(set.size(), 3);
    });
    
    it("test .size() with allowed duplicates", () => {
        const set = new ArraySet();
    
        set.add("foo");
        set.add("foo", true);
    
        set.add("bar");
        set.add("bar", true);
    
        set.add("baz");
        set.add("baz", true);
    
        assert.strictEqual(set.size(), 3);
    });    
});
