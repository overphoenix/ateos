import "../bootstrap";

const {
    is,
    assertion
} = ateos;
const { assert } = assertion;

describe("assertion", "assert", () => {
    it("assert", () => {
        const foo = "bar";
        assert(foo === "bar", "expected foo to equal `bar`");

        err(() => {
            assert(foo === "baz", "expected foo to equal `bar`");
        }, "expected foo to equal `bar`");

        err(() => {
            assert(foo === "baz", () => {
                return "expected foo to equal `bar`";
            });
        }, "expected foo to equal `bar`");
    });

    describe("fail", () => {
        it("should accept a message as the 3rd argument", () => {
            err(() => {
                assert.fail(0, 1, "this has failed");
            }, /this has failed/);
        });

        it("should accept a message as the only argument", () => {
            err(() => {
                assert.fail("this has failed");
            }, /this has failed/);
        });

        it("should produce a default message when called without any arguments", () => {
            err(() => {
                assert.fail();
            }, /assert\.fail()/);
        });
    });

    it("isTrue", () => {
        assert.isTrue(true);

        err(() => {
            assert.isTrue(false, "blah");
        }, "blah: expected false to be true");

        err(() => {
            assert.isTrue(1);
        }, "expected 1 to be true");

        err(() => {
            assert.isTrue("test");
        }, "expected 'test' to be true");
    });

    it("isNotTrue", () => {
        assert.isNotTrue(false);

        err(() => {
            assert.isNotTrue(true, "blah");
        }, "blah: expected true to not equal true");
    });

    it("isOk / ok", () => {
        ["isOk", "ok"].forEach((isOk) => {
            assert[isOk](true);
            assert[isOk](1);
            assert[isOk]("test");

            err(() => {
                assert[isOk](false, "blah");
            }, "blah: expected false to be truthy");

            err(() => {
                assert[isOk](0);
            }, "expected 0 to be truthy");

            err(() => {
                assert[isOk]("");
            }, "expected '' to be truthy");
        });
    });

    it("isNotOk, notOk", () => {
        ["isNotOk", "notOk"].forEach((isNotOk) => {
            assert[isNotOk](false);
            assert[isNotOk](0);
            assert[isNotOk]("");

            err(() => {
                assert[isNotOk](true, "blah");
            }, "blah: expected true to be falsy");

            err(() => {
                assert[isNotOk](1);
            }, "expected 1 to be falsy");

            err(() => {
                assert[isNotOk]("test");
            }, "expected 'test' to be falsy");
        });
    });

    it("isFalse", () => {
        assert.isFalse(false);

        err(() => {
            assert.isFalse(true, "blah");
        }, "blah: expected true to be false");

        err(() => {
            assert.isFalse(0);
        }, "expected 0 to be false");
    });

    it("isNotFalse", () => {
        assert.isNotFalse(true);

        err(() => {
            assert.isNotFalse(false, "blah");
        }, "blah: expected false to not equal false");
    });

    it("equal", () => {
        let foo;
        assert.equal(foo, undefined);

        if (ateos.isFunction(Symbol)) {
            const sym = Symbol();
            assert.equal(sym, sym);
        }

        err(() => {
            assert.equal(1, 2, "blah");
        }, "blah: expected 1 to equal 2");
    });

    it("typeof", () => {
        assert.typeOf("test", "string");
        assert.typeOf(true, "boolean");
        assert.typeOf(5, "number");

        if (ateos.isFunction(Symbol)) {
            assert.typeOf(Symbol(), "symbol");
        }

        err(() => {
            assert.typeOf(5, "string", "blah");
        }, "blah: expected 5 to be a string");
    });

    it("notTypeOf", () => {
        assert.notTypeOf("test", "number");

        err(() => {
            assert.notTypeOf(5, "number", "blah");
        }, "blah: expected 5 not to be a number");
    });

    it("instanceOf", () => {
        function Foo() { }
        assert.instanceOf(new Foo(), Foo);

        // Normally, `instanceof` requires that the constructor be a function or an
        // object with a callable `@@hasInstance`. But in some older browsers such
        // as IE11, `instanceof` also accepts DOM-related interfaces such as
        // `HTMLElement`, despite being non-callable objects in those browsers.
        // See: https://github.com/chaijs/chai/issues/1000.
        if (typeof document !== "undefined" && !ateos.isUndefined(document.createElement) && typeof HTMLElement !== "undefined") {
            assert.instanceOf(document.createElement("div"), HTMLElement);
        }

        err(() => {
            assert.instanceOf(new Foo(), 1, "blah");
        }, "blah: The instanceof assertion needs a constructor but number was given.");

        err(() => {
            assert.instanceOf(new Foo(), "batman");
        }, "The instanceof assertion needs a constructor but string was given.");

        err(() => {
            assert.instanceOf(new Foo(), {});
        }, "The instanceof assertion needs a constructor but Object was given.");

        err(() => {
            assert.instanceOf(new Foo(), true);
        }, "The instanceof assertion needs a constructor but boolean was given.");

        err(() => {
            assert.instanceOf(new Foo(), null);
        }, "The instanceof assertion needs a constructor but null was given.");

        err(() => {
            assert.instanceOf(new Foo(), undefined);
        }, "The instanceof assertion needs a constructor but undefined was given.");

        err(() => {
            function Thing() { }
            let t = new Thing();
            Thing.prototype = 1337;
            assert.instanceOf(t, Thing);
        }, "The instanceof assertion needs a constructor but function was given.", true);

        if (!ateos.isUndefined(Symbol) && !ateos.isUndefined(Symbol.hasInstance)) {
            err(() => {
                assert.instanceOf(new Foo(), Symbol());
            }, "The instanceof assertion needs a constructor but symbol was given.");

            err(() => {
                const FakeConstructor = {};
                const fakeInstanceB = 4;
                FakeConstructor[Symbol.hasInstance] = function (val) {
                    return val === 3;
                };

                assert.instanceOf(fakeInstanceB, FakeConstructor);
            }, "expected 4 to be an instance of an unnamed constructor");
        }

        err(() => {
            assert.instanceOf(5, Foo, "blah");
        }, "blah: expected 5 to be an instance of Foo");

        function CrashyObject() { }
        CrashyObject.prototype.inspect = function () {
            throw new Error("Arg's inspect() called even though the test passed");
        };
        assert.instanceOf(new CrashyObject(), CrashyObject);
    });

    it("notInstanceOf", () => {
        function Foo() { }
        assert.notInstanceOf(new Foo(), String);

        err(() => {
            assert.notInstanceOf(new Foo(), 1, "blah");
        }, "blah: The instanceof assertion needs a constructor but number was given.");

        err(() => {
            assert.notInstanceOf(new Foo(), "batman");
        }, "The instanceof assertion needs a constructor but string was given.");

        err(() => {
            assert.notInstanceOf(new Foo(), {});
        }, "The instanceof assertion needs a constructor but Object was given.");

        err(() => {
            assert.notInstanceOf(new Foo(), true);
        }, "The instanceof assertion needs a constructor but boolean was given.");

        err(() => {
            assert.notInstanceOf(new Foo(), null);
        }, "The instanceof assertion needs a constructor but null was given.");

        err(() => {
            assert.notInstanceOf(new Foo(), undefined);
        }, "The instanceof assertion needs a constructor but undefined was given.");

        if (!ateos.isUndefined(Symbol) && !ateos.isUndefined(Symbol.hasInstance)) {
            err(() => {
                assert.notInstanceOf(new Foo(), Symbol());
            }, "The instanceof assertion needs a constructor but symbol was given.");

            err(() => {
                const FakeConstructor = {};
                const fakeInstanceB = 4;
                FakeConstructor[Symbol.hasInstance] = function (val) {
                    return val === 4;
                };

                assert.notInstanceOf(fakeInstanceB, FakeConstructor);
            }, "expected 4 to not be an instance of an unnamed constructor");
        }

        err(() => {
            assert.notInstanceOf(new Foo(), Foo, "blah");
        }, "blah: expected {} to not be an instance of Foo");
    });

    it("isObject", () => {
        function Foo() { }
        assert.isObject({});
        assert.isObject(new Foo());

        err(() => {
            assert.isObject(true, "blah");
        }, "blah: expected true to be an object");

        err(() => {
            assert.isObject(Foo);
        }, "expected [Function: Foo] to be an object");

        err(() => {
            assert.isObject("foo");
        }, "expected 'foo' to be an object");
    });

    it("isNotObject", () => {
        function Foo() { }
        assert.isNotObject(5);

        err(() => {
            assert.isNotObject({}, "blah");
        }, "blah: expected {} not to be an object");
    });

    it("notEqual", () => {
        assert.notEqual(3, 4);

        if (ateos.isFunction(Symbol)) {
            const sym1 = Symbol();
            const sym2 = Symbol();
            assert.notEqual(sym1, sym2);
        }

        err(() => {
            assert.notEqual(5, 5, "blah");
        }, "blah: expected 5 to not equal 5");
    });

    it("strictEqual", () => {
        assert.strictEqual("foo", "foo");

        if (ateos.isFunction(Symbol)) {
            const sym = Symbol();
            assert.strictEqual(sym, sym);
        }

        err(() => {
            assert.strictEqual("5", 5, "blah");
        }, "blah: expected \'5\' to equal 5");
    });

    it("notStrictEqual", () => {
        assert.notStrictEqual(5, "5");

        if (ateos.isFunction(Symbol)) {
            const sym1 = Symbol();
            const sym2 = Symbol();
            assert.notStrictEqual(sym1, sym2);
        }

        err(() => {
            assert.notStrictEqual(5, 5, "blah");
        }, "blah: expected 5 to not equal 5");
    });

    it("deepEqual", () => {
        assert.deepEqual({ tea: "chai" }, { tea: "chai" });
        assert.deepStrictEqual({ tea: "chai" }, { tea: "chai" }); // Alias of deepEqual

        assert.deepEqual([NaN], [NaN]);
        assert.deepEqual({ tea: NaN }, { tea: NaN });

        err(() => {
            assert.deepEqual({ tea: "chai" }, { tea: "black" }, "blah");
        }, "blah: expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");

        const obja = Object.create({ tea: "chai" });
        const objb = Object.create({ tea: "chai" });

        assert.deepEqual(obja, objb);

        const obj1 = Object.create({ tea: "chai" });
        const obj2 = Object.create({ tea: "black" });

        err(() => {
            assert.deepEqual(obj1, obj2);
        }, "expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");
    });

    it("deepEqual (ordering)", () => {
        const a = { a: "b", c: "d" };
        const b = { c: "d", a: "b" };
        assert.deepEqual(a, b);
    });

    it("deepEqual /regexp/", () => {
        assert.deepEqual(/a/, /a/);
        assert.notDeepEqual(/a/, /b/);
        assert.notDeepEqual(/a/, {});
        assert.deepEqual(/a/g, /a/g);
        assert.notDeepEqual(/a/g, /b/g);
        assert.deepEqual(/a/i, /a/i);
        assert.notDeepEqual(/a/i, /b/i);
        assert.deepEqual(/a/m, /a/m);
        assert.notDeepEqual(/a/m, /b/m);
    });

    it("deepEqual (Date)", () => {
        const a = new Date(1, 2, 3);
        const b = new Date(4, 5, 6);
        assert.deepEqual(a, a);
        assert.notDeepEqual(a, b);
        assert.notDeepEqual(a, {});
    });

    it("deepEqual (circular)", () => {
        const circularObject = {};
        const secondCircularObject = {};
        circularObject.field = circularObject;
        secondCircularObject.field = secondCircularObject;

        assert.deepEqual(circularObject, secondCircularObject);

        err(() => {
            secondCircularObject.field2 = secondCircularObject;
            assert.deepEqual(circularObject, secondCircularObject);
        }, "expected { field: [Circular] } to deeply equal { Object (field, field2) }");
    });

    it("notDeepEqual", () => {
        assert.notDeepEqual({ tea: "jasmine" }, { tea: "chai" });

        err(() => {
            assert.notDeepEqual({ tea: "chai" }, { tea: "chai" }, "blah");
        }, "blah: expected { tea: \'chai\' } to not deeply equal { tea: \'chai\' }");
    });

    it("notDeepEqual (circular)", () => {
        const circularObject = {};
        const secondCircularObject = { tea: "jasmine" };
        circularObject.field = circularObject;
        secondCircularObject.field = secondCircularObject;

        assert.notDeepEqual(circularObject, secondCircularObject);

        err(() => {
            delete secondCircularObject.tea;
            assert.notDeepEqual(circularObject, secondCircularObject);
        }, "expected { field: [Circular] } to not deeply equal { field: [Circular] }");
    });

    it("isNull", () => {
        assert.isNull(null);

        err(() => {
            assert.isNull(undefined, "blah");
        }, "blah: expected undefined to equal null");
    });

    it("isNotNull", () => {
        assert.isNotNull(undefined);

        err(() => {
            assert.isNotNull(null, "blah");
        }, "blah: expected null to not equal null");
    });

    it("isNaN", () => {
        assert.isNaN(NaN);

        err(() => {
            assert.isNaN(Infinity, "blah");
        }, "blah: expected Infinity to be NaN");

        err(() => {
            assert.isNaN(undefined);
        }, "expected undefined to be NaN");

        err(() => {
            assert.isNaN({});
        }, "expected {} to be NaN");

        err(() => {
            assert.isNaN(4);
        }, "expected 4 to be NaN");
    });

    it("isNotNaN", () => {
        assert.isNotNaN(4);
        assert.isNotNaN(Infinity);
        assert.isNotNaN(undefined);
        assert.isNotNaN({});

        err(() => {
            assert.isNotNaN(NaN, "blah");
        }, "blah: expected NaN not to be NaN");
    });

    it("exists", () => {
        const meeber = "awesome";
        let iDoNotExist;

        assert.exists(meeber);
        assert.exists(0);
        assert.exists(false);
        assert.exists("");

        err(() => {
            assert.exists(iDoNotExist, "blah");
        }, "blah: expected undefined to exist");
    });

    it("notExists", () => {
        const meeber = "awesome";
        let iDoNotExist;

        assert.notExists(iDoNotExist);

        err(() => {
            assert.notExists(meeber, "blah");
        }, "blah: expected 'awesome' to not exist");
    });

    it("isUndefined", () => {
        assert.isUndefined(undefined);

        err(() => {
            assert.isUndefined(null, "blah");
        }, "blah: expected null to equal undefined");
    });

    it("isDefined", () => {
        assert.isDefined(null);

        err(() => {
            assert.isDefined(undefined, "blah");
        }, "blah: expected undefined to not equal undefined");
    });

    it("isFunction", () => {
        const func = function () { };
        assert.isFunction(func);

        err(() => {
            assert.isFunction({}, "blah");
        }, "blah: expected {} to be a function");
    });

    it("isNotFunction", () => {
        assert.isNotFunction(5);

        err(() => {
            assert.isNotFunction(() => { }, "blah");
        }, "blah: expected [Function] not to be a function");
    });

    it("isArray", () => {
        assert.isArray([]);
        assert.isArray(new Array());

        err(() => {
            assert.isArray({}, "blah");
        }, "blah: expected {} to be an array");
    });

    it("isNotArray", () => {
        assert.isNotArray(3);

        err(() => {
            assert.isNotArray([], "blah");
        }, "blah: expected [] not to be an array");

        err(() => {
            assert.isNotArray(new Array());
        }, "expected [] not to be an array");
    });

    it("isString", () => {
        assert.isString("Foo");
        assert.isString(new String("foo"));

        err(() => {
            assert.isString(1, "blah");
        }, "blah: expected 1 to be a string");
    });

    it("isNotString", () => {
        assert.isNotString(3);
        assert.isNotString(["hello"]);

        err(() => {
            assert.isNotString("hello", "blah");
        }, "blah: expected 'hello' not to be a string");
    });

    it("isNumber", () => {
        assert.isNumber(1);
        assert.isNumber(Number("3"));

        err(() => {
            assert.isNumber("1", "blah");
        }, "blah: expected \'1\' to be a number");
    });

    it("isNotNumber", () => {
        assert.isNotNumber("hello");
        assert.isNotNumber([5]);

        err(() => {
            assert.isNotNumber(4, "blah");
        }, "blah: expected 4 not to be a number");
    });

    it("isFinite", () => {
        assert.isFinite(4);
        assert.isFinite(-10);

        err(() => {
            assert.isFinite(NaN, "blah");
        }, "blah: expected NaN to be a finite number");

        err(() => {
            assert.isFinite(Infinity);
        }, "expected Infinity to be a finite number");

        err(() => {
            assert.isFinite("foo");
        }, "expected \'foo\' to be a finite number");

        err(() => {
            assert.isFinite([]);
        }, "expected [] to be a finite number");

        err(() => {
            assert.isFinite({});
        }, "expected {} to be a finite number");
    });

    it("isBoolean", () => {
        assert.isBoolean(true);
        assert.isBoolean(false);

        err(() => {
            assert.isBoolean("1", "blah");
        }, "blah: expected \'1\' to be a boolean");
    });

    it("isNotBoolean", () => {
        assert.isNotBoolean("true");

        err(() => {
            assert.isNotBoolean(true, "blah");
        }, "blah: expected true not to be a boolean");

        err(() => {
            assert.isNotBoolean(false);
        }, "expected false not to be a boolean");
    });

    it("include", () => {
        assert.include("foobar", "bar");
        assert.include("", "");
        assert.include([1, 2, 3], 3);

        // .include should work with Error objects and objects with a custom
        // `@@toStringTag`.
        assert.include(new Error("foo"), { message: "foo" });
        if (!ateos.isUndefined(Symbol)
            && !ateos.isUndefined(Symbol.toStringTag)) {
            const customObj = { a: 1 };
            customObj[Symbol.toStringTag] = "foo";

            assert.include(customObj, { a: 1 });
        }

        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        assert.include([obj1, obj2], obj1);
        assert.include({ foo: obj1, bar: obj2 }, { foo: obj1 });
        assert.include({ foo: obj1, bar: obj2 }, { foo: obj1, bar: obj2 });

        if (ateos.isFunction(Map)) {
            const map = new Map();
            var val = [{ a: 1 }];
            map.set("a", val);
            map.set("b", 2);
            map.set("c", -0);
            map.set("d", NaN);

            assert.include(map, val);
            assert.include(map, 2);
            assert.include(map, 0);
            assert.include(map, NaN);
        }

        if (ateos.isFunction(Set)) {
            const set = new Set();
            var val = [{ a: 1 }];
            set.add(val);
            set.add(2);
            set.add(-0);
            set.add(NaN);

            assert.include(set, val);
            assert.include(set, 2);
            if (set.has(0)) {
                // This test is skipped in IE11 because (contrary to spec) IE11 uses
                // SameValue instead of SameValueZero equality for sets.
                assert.include(set, 0);
            }
            assert.include(set, NaN);
        }

        if (ateos.isFunction(WeakSet)) {
            const ws = new WeakSet();
            var val = [{ a: 1 }];
            ws.add(val);

            assert.include(ws, val);
        }

        if (ateos.isFunction(Symbol)) {
            const sym1 = Symbol();
            const sym2 = Symbol();
            assert.include([sym1, sym2], sym1);
        }

        err(() => {
            assert.include("foobar", "baz", "blah");
        }, "blah: expected \'foobar\' to include \'baz\'");

        err(() => {
            assert.include([{ a: 1 }, { b: 2 }], { a: 1 });
        }, "expected [ { a: 1 }, { b: 2 } ] to include { a: 1 }");

        err(() => {
            assert.include({ foo: { a: 1 }, bar: { b: 2 } }, { foo: { a: 1 } }, "blah");
        }, "blah: expected { foo: { a: 1 }, bar: { b: 2 } } to have property 'foo' of { a: 1 }, but got { a: 1 }");

        err(() => {
            assert.include(true, true, "blah");
        }, "blah: object tested must be an array, a map, an object, a set, a string, or a weakset, but boolean given");

        err(() => {
            assert.include(42, "bar");
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but number given");

        err(() => {
            assert.include(null, 42);
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but null given");

        err(() => {
            assert.include(undefined, "bar");
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but undefined given");
    });

    it("notInclude", () => {
        assert.notInclude("foobar", "baz");
        assert.notInclude([1, 2, 3], 4);

        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        assert.notInclude([obj1, obj2], { a: 1 });
        assert.notInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 } });
        assert.notInclude({ foo: obj1, bar: obj2 }, { foo: obj1, bar: { b: 2 } });

        if (ateos.isFunction(Map)) {
            const map = new Map();
            var val = [{ a: 1 }];
            map.set("a", val);
            map.set("b", 2);

            assert.notInclude(map, [{ a: 1 }]);
            assert.notInclude(map, 3);
        }

        if (ateos.isFunction(Set)) {
            const set = new Set();
            var val = [{ a: 1 }];
            set.add(val);
            set.add(2);

            assert.include(set, val);
            assert.include(set, 2);

            assert.notInclude(set, [{ a: 1 }]);
            assert.notInclude(set, 3);
        }

        if (ateos.isFunction(WeakSet)) {
            const ws = new WeakSet();
            var val = [{ a: 1 }];
            ws.add(val);

            assert.notInclude(ws, [{ a: 1 }]);
            assert.notInclude(ws, {});
        }

        if (ateos.isFunction(Symbol)) {
            const sym1 = Symbol();
            const sym2 = Symbol();
            const sym3 = Symbol();
            assert.notInclude([sym1, sym2], sym3);
        }

        err(() => {
            const obj1 = { a: 1 };
            let obj2 = { b: 2 };
            assert.notInclude([obj1, obj2], obj1, "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 } ] to not include { a: 1 }");

        err(() => {
            let obj1 = { a: 1 };
            let obj2 = { b: 2 };
            assert.notInclude({ foo: obj1, bar: obj2 }, { foo: obj1, bar: obj2 }, "blah");
        }, "blah: expected { foo: { a: 1 }, bar: { b: 2 } } to not have property 'foo' of { a: 1 }");

        err(() => {
            assert.notInclude(true, true, "blah");
        }, "blah: object tested must be an array, a map, an object, a set, a string, or a weakset, but boolean given");

        err(() => {
            assert.notInclude(42, "bar");
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but number given");

        err(() => {
            assert.notInclude(null, 42);
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but null given");

        err(() => {
            assert.notInclude(undefined, "bar");
        }, "object tested must be an array, a map, an object, a set, a string, or a weakset, but undefined given");

        err(() => {
            assert.notInclude("foobar", "bar");
        }, "expected \'foobar\' to not include \'bar\'");
    });

    it("deepInclude and notDeepInclude", () => {
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };
        assert.deepInclude([obj1, obj2], { a: 1 });
        assert.notDeepInclude([obj1, obj2], { a: 9 });
        assert.notDeepInclude([obj1, obj2], { z: 1 });
        assert.deepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 } });
        assert.deepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 }, bar: { b: 2 } });
        assert.notDeepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 9 } });
        assert.notDeepInclude({ foo: obj1, bar: obj2 }, { foo: { z: 1 } });
        assert.notDeepInclude({ foo: obj1, bar: obj2 }, { baz: { a: 1 } });
        assert.notDeepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 }, bar: { b: 9 } });

        if (ateos.isFunction(Map)) {
            const map = new Map();
            map.set(1, [{ a: 1 }]);

            assert.deepInclude(map, [{ a: 1 }]);
        }

        if (ateos.isFunction(Set)) {
            const set = new Set();
            set.add([{ a: 1 }]);

            assert.deepInclude(set, [{ a: 1 }]);
        }

        if (ateos.isFunction(WeakSet)) {
            err(() => {
                assert.deepInclude(new WeakSet(), {}, "foo");
            }, "foo: unable to use .deep.include with WeakSet");
        }

        err(() => {
            assert.deepInclude([obj1, obj2], { a: 9 }, "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 } ] to deep include { a: 9 }");

        err(() => {
            assert.notDeepInclude([obj1, obj2], { a: 1 });
        }, "expected [ { a: 1 }, { b: 2 } ] to not deep include { a: 1 }");

        err(() => {
            assert.deepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 }, bar: { b: 9 } }, "blah");
        }, "blah: expected { foo: { a: 1 }, bar: { b: 2 } } to have deep property 'bar' of { b: 9 }, but got { b: 2 }");

        err(() => {
            assert.notDeepInclude({ foo: obj1, bar: obj2 }, { foo: { a: 1 }, bar: { b: 2 } }, "blah");
        }, "blah: expected { foo: { a: 1 }, bar: { b: 2 } } to not have deep property 'foo' of { a: 1 }");
    });

    it("nestedInclude and notNestedInclude", () => {
        assert.nestedInclude({ a: { b: ["x", "y"] } }, { "a.b[1]": "y" });
        assert.notNestedInclude({ a: { b: ["x", "y"] } }, { "a.b[1]": "x" });
        assert.notNestedInclude({ a: { b: ["x", "y"] } }, { "a.c": "y" });

        assert.notNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { x: 1 } });

        assert.nestedInclude({ ".a": { "[b]": "x" } }, { "\\.a.\\[b\\]": "x" });
        assert.notNestedInclude({ ".a": { "[b]": "x" } }, { "\\.a.\\[b\\]": "y" });

        err(() => {
            assert.nestedInclude({ a: { b: ["x", "y"] } }, { "a.b[1]": "x" }, "blah");
        }, "blah: expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.b[1]' of 'x', but got 'y'");

        err(() => {
            assert.nestedInclude({ a: { b: ["x", "y"] } }, { "a.b[1]": "x" }, "blah");
        }, "blah: expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.b[1]' of 'x', but got 'y'");

        err(() => {
            assert.nestedInclude({ a: { b: ["x", "y"] } }, { "a.c": "y" });
        }, "expected { a: { b: [ 'x', 'y' ] } } to have nested property 'a.c'");

        err(() => {
            assert.notNestedInclude({ a: { b: ["x", "y"] } }, { "a.b[1]": "y" }, "blah");
        }, "blah: expected { a: { b: [ 'x', 'y' ] } } to not have nested property 'a.b[1]' of 'y'");
    });

    it("deepNestedInclude and notDeepNestedInclude", () => {
        assert.deepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { x: 1 } });
        assert.notDeepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { y: 2 } });
        assert.notDeepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.c": { x: 1 } });

        assert.deepNestedInclude({ ".a": { "[b]": { x: 1 } } }, { "\\.a.\\[b\\]": { x: 1 } });
        assert.notDeepNestedInclude({ ".a": { "[b]": { x: 1 } } }, { "\\.a.\\[b\\]": { y: 2 } });

        err(() => {
            assert.deepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { y: 2 } }, "blah");
        }, "blah: expected { a: { b: [ [Object] ] } } to have deep nested property 'a.b[0]' of { y: 2 }, but got { x: 1 }");

        err(() => {
            assert.deepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { y: 2 } }, "blah");
        }, "blah: expected { a: { b: [ [Object] ] } } to have deep nested property 'a.b[0]' of { y: 2 }, but got { x: 1 }");

        err(() => {
            assert.deepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.c": { x: 1 } });
        }, "expected { a: { b: [ [Object] ] } } to have deep nested property 'a.c'");

        err(() => {
            assert.notDeepNestedInclude({ a: { b: [{ x: 1 }] } }, { "a.b[0]": { x: 1 } }, "blah");
        }, "blah: expected { a: { b: [ [Object] ] } } to not have deep nested property 'a.b[0]' of { x: 1 }");
    });

    it("ownInclude and notOwnInclude", () => {
        assert.ownInclude({ a: 1 }, { a: 1 });
        assert.notOwnInclude({ a: 1 }, { a: 3 });
        assert.notOwnInclude({ a: 1 }, { toString: Object.prototype.toString });

        assert.notOwnInclude({ a: { b: 2 } }, { a: { b: 2 } });

        err(() => {
            assert.ownInclude({ a: 1 }, { a: 3 }, "blah");
        }, "blah: expected { a: 1 } to have own property 'a' of 3, but got 1");

        err(() => {
            assert.ownInclude({ a: 1 }, { a: 3 }, "blah");
        }, "blah: expected { a: 1 } to have own property 'a' of 3, but got 1");

        err(() => {
            assert.ownInclude({ a: 1 }, { toString: Object.prototype.toString });
        }, "expected { a: 1 } to have own property 'toString'");

        err(() => {
            assert.notOwnInclude({ a: 1 }, { a: 1 }, "blah");
        }, "blah: expected { a: 1 } to not have own property 'a' of 1");
    });

    it("deepOwnInclude and notDeepOwnInclude", () => {
        assert.deepOwnInclude({ a: { b: 2 } }, { a: { b: 2 } });
        assert.notDeepOwnInclude({ a: { b: 2 } }, { a: { c: 3 } });
        assert.notDeepOwnInclude({ a: { b: 2 } }, { toString: Object.prototype.toString });

        err(() => {
            assert.deepOwnInclude({ a: { b: 2 } }, { a: { c: 3 } }, "blah");
        }, "blah: expected { a: { b: 2 } } to have deep own property 'a' of { c: 3 }, but got { b: 2 }");

        err(() => {
            assert.deepOwnInclude({ a: { b: 2 } }, { a: { c: 3 } }, "blah");
        }, "blah: expected { a: { b: 2 } } to have deep own property 'a' of { c: 3 }, but got { b: 2 }");

        err(() => {
            assert.deepOwnInclude({ a: { b: 2 } }, { toString: Object.prototype.toString });
        }, "expected { a: { b: 2 } } to have deep own property 'toString'");

        err(() => {
            assert.notDeepOwnInclude({ a: { b: 2 } }, { a: { b: 2 } }, "blah");
        }, "blah: expected { a: { b: 2 } } to not have deep own property 'a' of { b: 2 }");
    });

    it("keys(array|Object|arguments)", () => {
        assert.hasAllKeys({ foo: 1 }, ["foo"]);
        assert.hasAllKeys({ foo: 1, bar: 2 }, ["foo", "bar"]);
        assert.hasAllKeys({ foo: 1 }, { foo: 30 });
        assert.hasAllKeys({ foo: 1, bar: 2 }, { foo: 6, bar: 7 });

        assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ["foo", "bar"]);
        assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ["bar", "foo"]);
        assert.containsAllKeys({ foo: 1, bar: 2, baz: 3 }, ["baz"]);
        assert.containsAllKeys({ foo: 1, bar: 2 }, ["foo"]);
        assert.containsAllKeys({ foo: 1, bar: 2 }, ["bar"]);
        assert.containsAllKeys({ foo: 1, bar: 2 }, { foo: 6 });
        assert.containsAllKeys({ foo: 1, bar: 2 }, { bar: 7 });
        assert.containsAllKeys({ foo: 1, bar: 2 }, { foo: 6 });
        assert.containsAllKeys({ foo: 1, bar: 2 }, { bar: 7, foo: 6 });

        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["baz"]);
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["foo"]);
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["foo", "baz"]);
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2, baz: 3 }, ["foo", "bar", "baz", "fake"]);
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["baz", "foo"]);
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { baz: 8 });
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { baz: 8, foo: 7 });
        assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { baz: 8, fake: 7 });

        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["foo", "baz"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["foo"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["bar", "baz"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["bar", "foo"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["foo", "bar"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, ["baz", "fake", "foo"]);
        assert.hasAnyKeys({ foo: 1, bar: 2 }, { foo: 6 });
        assert.hasAnyKeys({ foo: 1, bar: 2 }, { baz: 6, foo: 12 });

        assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, ["baz", "abc", "def"]);
        assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, ["baz"]);
        assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { baz: 1, biz: 2, fake: 3 });
        assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { baz: 1 });

        var enumProp1 = "enumProp1",
            enumProp2 = "enumProp2",
            nonEnumProp = "nonEnumProp",
            obj = {};

        obj[enumProp1] = "enumProp1";
        obj[enumProp2] = "enumProp2";

        Object.defineProperty(obj, nonEnumProp, {
            enumerable: false,
            value: "nonEnumProp"
        });

        assert.hasAllKeys(obj, [enumProp1, enumProp2]);
        assert.doesNotHaveAllKeys(obj, [enumProp1, enumProp2, nonEnumProp]);

        if (ateos.isFunction(Symbol)) {
            var sym1 = Symbol("sym1"),
                sym2 = Symbol("sym2"),
                sym3 = Symbol("sym3"),
                str = "str",
                obj = {};

            obj[sym1] = "sym1";
            obj[sym2] = "sym2";
            obj[str] = "str";

            Object.defineProperty(obj, sym3, {
                enumerable: false,
                value: "sym3"
            });

            assert.hasAllKeys(obj, [sym1, sym2, str]);
            assert.doesNotHaveAllKeys(obj, [sym1, sym2, sym3, str]);
        }

        if (!ateos.isUndefined(Map)) {
            // Not using Map constructor args because not supported in IE 11.
            var aKey = { thisIs: "anExampleObject" },
                anotherKey = { doingThisBecauseOf: "referential equality" },
                testMap = new Map();

            testMap.set(aKey, "aValue");
            testMap.set(anotherKey, "anotherValue");

            assert.hasAnyKeys(testMap, [aKey]);
            assert.hasAnyKeys(testMap, ["thisDoesNotExist", "thisToo", aKey]);
            assert.hasAllKeys(testMap, [aKey, anotherKey]);

            assert.containsAllKeys(testMap, [aKey]);
            assert.doesNotHaveAllKeys(testMap, [aKey, { iDoNot: "exist" }]);

            assert.doesNotHaveAnyKeys(testMap, [{ iDoNot: "exist" }]);
            assert.doesNotHaveAnyKeys(testMap, ["thisDoesNotExist", "thisToo", { iDoNot: "exist" }]);
            assert.doesNotHaveAllKeys(testMap, ["thisDoesNotExist", "thisToo", anotherKey]);

            assert.doesNotHaveAnyKeys(testMap, [{ iDoNot: "exist" }, "thisDoesNotExist"]);
            assert.doesNotHaveAnyKeys(testMap, ["thisDoesNotExist", "thisToo", { iDoNot: "exist" }]);
            assert.doesNotHaveAllKeys(testMap, [aKey, { iDoNot: "exist" }]);

            // Ensure the assertions above use strict equality
            assert.doesNotHaveAnyKeys(testMap, { thisIs: "anExampleObject" });
            assert.doesNotHaveAllKeys(testMap, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            err(() => {
                assert.hasAnyKeys(testMap, [{ thisIs: "anExampleObject" }]);
            });

            err(() => {
                assert.hasAllKeys(testMap, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);
            });

            err(() => {
                assert.containsAllKeys(testMap, [{ thisIs: "anExampleObject" }]);
            });

            // Tests for the deep variations of the keys assertion
            assert.hasAnyDeepKeys(testMap, { thisIs: "anExampleObject" });
            assert.hasAnyDeepKeys(testMap, [{ thisIs: "anExampleObject" }, { three: "three" }]);
            assert.hasAnyDeepKeys(testMap, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.hasAllDeepKeys(testMap, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.containsAllDeepKeys(testMap, { thisIs: "anExampleObject" });
            assert.containsAllDeepKeys(testMap, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.doesNotHaveAnyDeepKeys(testMap, { thisDoesNot: "exist" });
            assert.doesNotHaveAnyDeepKeys(testMap, [{ twenty: "twenty" }, { fifty: "fifty" }]);

            assert.doesNotHaveAllDeepKeys(testMap, { thisDoesNot: "exist" });
            assert.doesNotHaveAllDeepKeys(testMap, [{ twenty: "twenty" }, { thisIs: "anExampleObject" }]);

            const weirdMapKey1 = Object.create(null);
            const weirdMapKey2 = { toString: NaN };
            const weirdMapKey3 = [];
            const weirdMap = new Map();

            weirdMap.set(weirdMapKey1, "val1");
            weirdMap.set(weirdMapKey2, "val2");

            assert.hasAllKeys(weirdMap, [weirdMapKey1, weirdMapKey2]);
            assert.doesNotHaveAllKeys(weirdMap, [weirdMapKey1, weirdMapKey3]);

            if (ateos.isFunction(Symbol)) {
                const symMapKey1 = Symbol();
                const symMapKey2 = Symbol();
                const symMapKey3 = Symbol();
                const symMap = new Map();

                symMap.set(symMapKey1, "val1");
                symMap.set(symMapKey2, "val2");

                assert.hasAllKeys(symMap, [symMapKey1, symMapKey2]);
                assert.hasAnyKeys(symMap, [symMapKey1, symMapKey3]);
                assert.containsAllKeys(symMap, [symMapKey2, symMapKey1]);

                assert.doesNotHaveAllKeys(symMap, [symMapKey1, symMapKey3]);
                assert.doesNotHaveAnyKeys(symMap, [symMapKey3]);
            }

            const errMap = new Map();

            errMap.set({ 1: 20 }, "number");

            err(() => {
                assert.hasAllKeys(errMap, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.containsAllKeys(errMap, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.doesNotHaveAllKeys(errMap, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.hasAnyKeys(errMap, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.doesNotHaveAnyKeys(errMap, [], "blah");
            }, "blah: keys required");

            // Uncomment this after solving https://github.com/chaijs/chai/issues/662
            // This should fail because of referential equality (this is a strict comparison)
            // err(function(){
            //   assert.containsAllKeys(new Map([[{foo: 1}, 'bar']]), { foo: 1 });
            // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

            // err(function(){
            //   assert.containsAllDeepKeys(new Map([[{foo: 1}, 'bar']]), { iDoNotExist: 0 })
            // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
        }

        if (!ateos.isUndefined(Set)) {
            // Not using Set constructor args because not supported in IE 11.
            var aKey = { thisIs: "anExampleObject" },
                anotherKey = { doingThisBecauseOf: "referential equality" },
                testSet = new Set();

            testSet.add(aKey);
            testSet.add(anotherKey);

            assert.hasAnyKeys(testSet, [aKey]);
            assert.hasAnyKeys(testSet, [20, 1, aKey]);
            assert.hasAllKeys(testSet, [aKey, anotherKey]);

            assert.containsAllKeys(testSet, [aKey]);
            assert.doesNotHaveAllKeys(testSet, [aKey, { iDoNot: "exist" }]);

            assert.doesNotHaveAnyKeys(testSet, [{ iDoNot: "exist" }]);
            assert.doesNotHaveAnyKeys(testSet, ["thisDoesNotExist", "thisToo", { iDoNot: "exist" }]);
            assert.doesNotHaveAllKeys(testSet, ["thisDoesNotExist", "thisToo", anotherKey]);

            assert.doesNotHaveAnyKeys(testSet, [{ iDoNot: "exist" }, "thisDoesNotExist"]);
            assert.doesNotHaveAnyKeys(testSet, [20, 1, { iDoNot: "exist" }]);
            assert.doesNotHaveAllKeys(testSet, ["thisDoesNotExist", "thisToo", { iDoNot: "exist" }]);

            // Ensure the assertions above use strict equality
            assert.doesNotHaveAnyKeys(testSet, { thisIs: "anExampleObject" });
            assert.doesNotHaveAllKeys(testSet, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            err(() => {
                assert.hasAnyKeys(testSet, [{ thisIs: "anExampleObject" }]);
            });

            err(() => {
                assert.hasAllKeys(testSet, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);
            });

            err(() => {
                assert.containsAllKeys(testSet, [{ thisIs: "anExampleObject" }]);
            });

            // Tests for the deep variations of the keys assertion
            assert.hasAnyDeepKeys(testSet, { thisIs: "anExampleObject" });
            assert.hasAnyDeepKeys(testSet, [{ thisIs: "anExampleObject" }, { three: "three" }]);
            assert.hasAnyDeepKeys(testSet, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.hasAllDeepKeys(testSet, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.containsAllDeepKeys(testSet, { thisIs: "anExampleObject" });
            assert.containsAllDeepKeys(testSet, [{ thisIs: "anExampleObject" }, { doingThisBecauseOf: "referential equality" }]);

            assert.doesNotHaveAnyDeepKeys(testSet, { twenty: "twenty" });
            assert.doesNotHaveAnyDeepKeys(testSet, [{ twenty: "twenty" }, { fifty: "fifty" }]);

            assert.doesNotHaveAllDeepKeys(testSet, { twenty: "twenty" });
            assert.doesNotHaveAllDeepKeys(testSet, [{ thisIs: "anExampleObject" }, { fifty: "fifty" }]);

            const weirdSetKey1 = Object.create(null);
            const weirdSetKey2 = { toString: NaN };
            const weirdSetKey3 = [];
            const weirdSet = new Set();

            weirdSet.add(weirdSetKey1);
            weirdSet.add(weirdSetKey2);

            assert.hasAllKeys(weirdSet, [weirdSetKey1, weirdSetKey2]);
            assert.doesNotHaveAllKeys(weirdSet, [weirdSetKey1, weirdSetKey3]);

            if (ateos.isFunction(Symbol)) {
                const symSetKey1 = Symbol();
                const symSetKey2 = Symbol();
                const symSetKey3 = Symbol();
                const symSet = new Set();

                symSet.add(symSetKey1);
                symSet.add(symSetKey2);

                assert.hasAllKeys(symSet, [symSetKey1, symSetKey2]);
                assert.hasAnyKeys(symSet, [symSetKey1, symSetKey3]);
                assert.containsAllKeys(symSet, [symSetKey2, symSetKey1]);

                assert.doesNotHaveAllKeys(symSet, [symSetKey1, symSetKey3]);
                assert.doesNotHaveAnyKeys(symSet, [symSetKey3]);
            }

            const errSet = new Set();

            errSet.add({ 1: 20 });
            errSet.add("number");

            err(() => {
                assert.hasAllKeys(errSet, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.containsAllKeys(errSet, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.doesNotHaveAllKeys(errSet, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.hasAnyKeys(errSet, [], "blah");
            }, "blah: keys required");

            err(() => {
                assert.doesNotHaveAnyKeys(errSet, [], "blah");
            }, "blah: keys required");

            // Uncomment this after solving https://github.com/chaijs/chai/issues/662
            // This should fail because of referential equality (this is a strict comparison)
            // err(function(){
            //   assert.containsAllKeys(new Set([{foo: 1}]), { foo: 1 });
            // }, 'expected [ [ { foo: 1 }, 'bar' ] ] to contain key { foo: 1 }');

            // err(function(){
            //   assert.containsAllDeepKeys(new Set([{foo: 1}]), { iDoNotExist: 0 })
            // }, 'expected [ { foo: 1 } ] to deeply contain key { iDoNotExist: 0 }');
        }

        err(() => {
            assert.hasAllKeys({ foo: 1 }, [], "blah");
        }, "blah: keys required");

        err(() => {
            assert.containsAllKeys({ foo: 1 }, [], "blah");
        }, "blah: keys required");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1 }, [], "blah");
        }, "blah: keys required");

        err(() => {
            assert.hasAnyKeys({ foo: 1 }, [], "blah");
        }, "blah: keys required");

        err(() => {
            assert.doesNotHaveAnyKeys({ foo: 1 }, [], "blah");
        }, "blah: keys required");

        err(() => {
            assert.hasAllKeys({ foo: 1 }, ["bar"], "blah");
        }, "blah: expected { foo: 1 } to have key 'bar'");

        err(() => {
            assert.hasAllKeys({ foo: 1 }, ["bar", "baz"]);
        }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

        err(() => {
            assert.hasAllKeys({ foo: 1 }, ["foo", "bar", "baz"]);
        }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1 }, ["foo"], "blah");
        }, "blah: expected { foo: 1 } to not have key 'foo'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["foo", "bar"]);
        }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

        err(() => {
            assert.hasAllKeys({ foo: 1, bar: 2 }, ["foo"]);
        }, "expected { foo: 1, bar: 2 } to have key 'foo'");

        err(() => {
            assert.containsAllKeys({ foo: 1 }, ["foo", "bar"], "blah");
        }, "blah: expected { foo: 1 } to contain keys 'foo', and 'bar'");

        err(() => {
            assert.hasAnyKeys({ foo: 1 }, ["baz"], "blah");
        }, "blah: expected { foo: 1 } to have key 'baz'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, ["foo", "bar"]);
        }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

        err(() => {
            assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, ["foo", "baz"], "blah");
        }, "blah: expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");

        // repeat previous tests with Object as arg.
        err(() => {
            assert.hasAllKeys({ foo: 1 }, { bar: 1 }, "blah");
        }, "blah: expected { foo: 1 } to have key 'bar'");

        err(() => {
            assert.hasAllKeys({ foo: 1 }, { bar: 1, baz: 1 });
        }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

        err(() => {
            assert.hasAllKeys({ foo: 1 }, { foo: 1, bar: 1, baz: 1 });
        }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1 }, { foo: 1 }, "blah");
        }, "blah: expected { foo: 1 } to not have key 'foo'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1 }, { foo: 1 });
        }, "expected { foo: 1 } to not have key 'foo'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { foo: 1, bar: 1 });
        }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

        err(() => {
            assert.hasAnyKeys({ foo: 1 }, "baz", "blah");
        }, "blah: expected { foo: 1 } to have key 'baz'");

        err(() => {
            assert.doesNotHaveAllKeys({ foo: 1, bar: 2 }, { foo: 1, bar: 1 });
        }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

        err(() => {
            assert.doesNotHaveAnyKeys({ foo: 1, bar: 2 }, { foo: 1, baz: 1 }, "blah");
        }, "blah: expected { foo: 1, bar: 2 } to not have keys 'foo', or 'baz'");
    });

    it("lengthOf", () => {
        assert.lengthOf([1, 2, 3], 3);
        assert.lengthOf("foobar", 6);

        err(() => {
            assert.lengthOf("foobar", 5, "blah");
        }, "blah: expected 'foobar' to have a length of 5 but got 6");

        err(() => {
            assert.lengthOf(1, 5);
        }, "expected 1 to have property \'length\'");

        if (ateos.isFunction(Map)) {
            assert.lengthOf(new Map(), 0);

            const map = new Map();
            map.set("a", 1);
            map.set("b", 2);

            assert.lengthOf(map, 2);

            err(() => {
                assert.lengthOf(map, 3, "blah");
            }, "blah: expected {} to have a size of 3 but got 2");
        }

        if (ateos.isFunction(Set)) {
            assert.lengthOf(new Set(), 0);

            const set = new Set();
            set.add(1);
            set.add(2);

            assert.lengthOf(set, 2);

            err(() => {
                assert.lengthOf(set, 3, "blah");
            }, "blah: expected {} to have a size of 3 but got 2");
        }
    });

    it("match", () => {
        assert.match("foobar", /^foo/);
        assert.notMatch("foobar", /^bar/);

        err(() => {
            assert.match("foobar", /^bar/i, "blah");
        }, "blah: expected 'foobar' to match /^bar/i");

        err(() => {
            assert.notMatch("foobar", /^foo/i, "blah");
        }, "blah: expected 'foobar' not to match /^foo/i");
    });

    it("property", () => {
        const obj = { foo: { bar: "baz" } };
        const simpleObj = { foo: "bar" };
        const undefinedKeyObj = { foo: undefined };
        const dummyObj = { a: "1" };
        assert.property(obj, "foo");
        assert.property(obj, "toString");
        assert.propertyVal(obj, "toString", Object.prototype.toString);
        assert.property(undefinedKeyObj, "foo");
        assert.propertyVal(undefinedKeyObj, "foo", undefined);
        assert.nestedProperty(obj, "foo.bar");
        assert.notProperty(obj, "baz");
        assert.notProperty(obj, "foo.bar");
        assert.notPropertyVal(simpleObj, "foo", "flow");
        assert.notPropertyVal(simpleObj, "flow", "bar");
        assert.notPropertyVal(obj, "foo", { bar: "baz" });
        assert.notNestedProperty(obj, "foo.baz");
        assert.nestedPropertyVal(obj, "foo.bar", "baz");
        assert.notNestedPropertyVal(obj, "foo.bar", "flow");
        assert.notNestedPropertyVal(obj, "foo.flow", "baz");

        err(() => {
            assert.property(obj, "baz", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to have property 'baz'");

        err(() => {
            assert.nestedProperty(obj, "foo.baz", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to have nested property 'foo.baz'");

        err(() => {
            assert.notProperty(obj, "foo", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to not have property 'foo'");

        err(() => {
            assert.notNestedProperty(obj, "foo.bar", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar'");

        err(() => {
            assert.propertyVal(simpleObj, "foo", "ball", "blah");
        }, "blah: expected { foo: 'bar' } to have property 'foo' of 'ball', but got 'bar'");

        err(() => {
            assert.propertyVal(simpleObj, "foo", undefined);
        }, "expected { foo: 'bar' } to have property 'foo' of undefined, but got 'bar'");

        err(() => {
            assert.nestedPropertyVal(obj, "foo.bar", "ball", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to have nested property 'foo.bar' of 'ball', but got 'baz'");

        err(() => {
            assert.notPropertyVal(simpleObj, "foo", "bar", "blah");
        }, "blah: expected { foo: 'bar' } to not have property 'foo' of 'bar'");

        err(() => {
            assert.notNestedPropertyVal(obj, "foo.bar", "baz", "blah");
        }, "blah: expected { foo: { bar: 'baz' } } to not have nested property 'foo.bar' of 'baz'");

        err(() => {
            assert.property(null, "a", "blah");
        }, "blah: Target cannot be null or undefined.");

        err(() => {
            assert.property(undefined, "a", "blah");
        }, "blah: Target cannot be null or undefined.");

        err(() => {
            assert.property({ a: 1 }, { a: "1" }, "blah");
        }, "blah: the argument to property must be a string, number, or symbol");

        err(() => {
            assert.propertyVal(dummyObj, "a", "2", "blah");
        }, "blah: expected { a: '1' } to have property 'a' of '2', but got '1'");

        err(() => {
            assert.nestedProperty({ a: 1 }, { a: "1" }, "blah");
        }, "blah: the argument to property must be a string when using nested syntax");
    });

    it("deepPropertyVal", () => {
        const obj = { a: { b: 1 } };
        assert.deepPropertyVal(obj, "a", { b: 1 });
        assert.notDeepPropertyVal(obj, "a", { b: 7 });
        assert.notDeepPropertyVal(obj, "a", { z: 1 });
        assert.notDeepPropertyVal(obj, "z", { b: 1 });

        err(() => {
            assert.deepPropertyVal(obj, "a", { b: 7 }, "blah");
        }, "blah: expected { a: { b: 1 } } to have deep property 'a' of { b: 7 }, but got { b: 1 }");

        err(() => {
            assert.deepPropertyVal(obj, "z", { b: 1 }, "blah");
        }, "blah: expected { a: { b: 1 } } to have deep property 'z'");

        err(() => {
            assert.notDeepPropertyVal(obj, "a", { b: 1 }, "blah");
        }, "blah: expected { a: { b: 1 } } to not have deep property 'a' of { b: 1 }");
    });

    it("ownProperty", () => {
        const coffeeObj = { coffee: "is good" };

        // This has length = 17
        const teaObj = "but tea is better";

        assert.ownProperty(coffeeObj, "coffee");
        assert.ownProperty(teaObj, "length");

        assert.ownPropertyVal(coffeeObj, "coffee", "is good");
        assert.ownPropertyVal(teaObj, "length", 17);

        assert.notOwnProperty(coffeeObj, "length");
        assert.notOwnProperty(coffeeObj, "toString");
        assert.notOwnProperty(teaObj, "calories");

        assert.notOwnPropertyVal(coffeeObj, "coffee", "is bad");
        assert.notOwnPropertyVal(teaObj, "length", 1);
        assert.notOwnPropertyVal(coffeeObj, "toString", Object.prototype.toString);
        assert.notOwnPropertyVal({ a: { b: 1 } }, "a", { b: 1 });

        err(() => {
            assert.ownProperty(coffeeObj, "calories", "blah");
        }, "blah: expected { coffee: 'is good' } to have own property 'calories'");

        err(() => {
            assert.notOwnProperty(coffeeObj, "coffee", "blah");
        }, "blah: expected { coffee: 'is good' } to not have own property 'coffee'");

        err(() => {
            assert.ownPropertyVal(teaObj, "length", 1, "blah");
        }, "blah: expected 'but tea is better' to have own property 'length' of 1, but got 17");

        err(() => {
            assert.notOwnPropertyVal(teaObj, "length", 17, "blah");
        }, "blah: expected 'but tea is better' to not have own property 'length' of 17");

        err(() => {
            assert.ownPropertyVal(teaObj, "calories", 17);
        }, "expected 'but tea is better' to have own property 'calories'");

        err(() => {
            assert.ownPropertyVal(teaObj, "calories", 17);
        }, "expected 'but tea is better' to have own property 'calories'");
    });

    it("deepOwnPropertyVal", () => {
        const obj = { a: { b: 1 } };
        assert.deepOwnPropertyVal(obj, "a", { b: 1 });
        assert.notDeepOwnPropertyVal(obj, "a", { z: 1 });
        assert.notDeepOwnPropertyVal(obj, "a", { b: 7 });
        assert.notDeepOwnPropertyVal(obj, "toString", Object.prototype.toString);

        err(() => {
            assert.deepOwnPropertyVal(obj, "a", { z: 7 }, "blah");
        }, "blah: expected { a: { b: 1 } } to have deep own property 'a' of { z: 7 }, but got { b: 1 }");

        err(() => {
            assert.deepOwnPropertyVal(obj, "z", { b: 1 }, "blah");
        }, "blah: expected { a: { b: 1 } } to have deep own property 'z'");

        err(() => {
            assert.notDeepOwnPropertyVal(obj, "a", { b: 1 }, "blah");
        }, "blah: expected { a: { b: 1 } } to not have deep own property 'a' of { b: 1 }");
    });

    it("deepNestedPropertyVal", () => {
        const obj = { a: { b: { c: 1 } } };
        assert.deepNestedPropertyVal(obj, "a.b", { c: 1 });
        assert.notDeepNestedPropertyVal(obj, "a.b", { c: 7 });
        assert.notDeepNestedPropertyVal(obj, "a.b", { z: 1 });
        assert.notDeepNestedPropertyVal(obj, "a.z", { c: 1 });

        err(() => {
            assert.deepNestedPropertyVal(obj, "a.b", { c: 7 }, "blah");
        }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.b' of { c: 7 }, but got { c: 1 }");

        err(() => {
            assert.deepNestedPropertyVal(obj, "a.z", { c: 1 }, "blah");
        }, "blah: expected { a: { b: { c: 1 } } } to have deep nested property 'a.z'");

        err(() => {
            assert.notDeepNestedPropertyVal(obj, "a.b", { c: 1 }, "blah");
        }, "blah: expected { a: { b: { c: 1 } } } to not have deep nested property 'a.b' of { c: 1 }");
    });

    it("throws / throw / Throw", () => {
        ["throws", "throw", "Throw"].forEach((throws) => {
            assert[throws](() => {
                throw new Error("foo");
            });
            assert[throws](() => {
                throw new Error("");
            }, "");
            assert[throws](() => {
                throw new Error("bar");
            }, "bar");
            assert[throws](() => {
                throw new Error("bar");
            }, /bar/);
            assert[throws](() => {
                throw new Error("bar");
            }, Error);
            assert[throws](() => {
                throw new Error("bar");
            }, Error, "bar");
            assert[throws](() => {
                throw new Error("");
            }, Error, "");
            assert[throws](() => {
                throw new Error("foo");
            }, "");

            const thrownErr = assert[throws](() => {
                throw new Error("foo");
            });
            assert(thrownErr instanceof Error, `assert.${throws} returns error`);
            assert(thrownErr.message === "foo", `assert.${throws} returns error message`);

            err(() => {
                assert[throws](() => { throw new Error('foo') }, TypeError);
            }, "expected [Function] to throw 'TypeError' but 'Error: foo' was thrown");

            err(() => {
                assert[throws](() => { throw new Error('foo') }, "bar");
            }, "expected [Function] to throw error including 'bar' but got 'foo'");

            err(() => {
                assert[throws](() => { throw new Error('foo') }, Error, "bar", "blah");
            }, "blah: expected [Function] to throw error including 'bar' but got 'foo'");

            err(() => {
                assert[throws](() => { throw new Error('foo') }, TypeError, "bar", "blah");
            }, "blah: expected [Function] to throw 'TypeError' but 'Error: foo' was thrown");

            err(() => {
                assert[throws](() => { });
            }, "expected [Function] to throw an error");

            err(() => {
                assert[throws](() => { throw new Error('') }, "bar");
            }, "expected [Function] to throw error including 'bar' but got ''");

            err(() => {
                assert[throws](() => { throw new Error('') }, /bar/);
            }, "expected [Function] to throw error matching /bar/ but got ''");

            err(() => {
                assert[throws]({});
            }, "expected {} to be a function");

            err(() => {
                assert[throws]({}, Error, "testing", "blah");
            }, "blah: expected {} to be a function");
        });
    });

    it("doesNotThrow", () => {
        function CustomError(message) {
            this.name = "CustomError";
            this.message = message;
        }
        CustomError.prototype = Object.create(Error.prototype);

        assert.doesNotThrow(() => { });
        assert.doesNotThrow(() => { }, "foo");
        assert.doesNotThrow(() => { }, "");

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, TypeError);

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, "Another message");

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, /Another message/);

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, Error, "Another message");

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, Error, /Another message/);

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, TypeError, "Another message");

        assert.doesNotThrow(() => {
            throw new Error("This is a message");
        }, TypeError, /Another message/);

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("foo");
            });
        }, "expected [Function] to not throw an error but 'Error: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new CustomError("foo");
            });
        }, "expected [Function] to not throw an error but 'CustomError: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("foo");
            }, Error);
        }, "expected [Function] to not throw 'Error' but 'Error: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new CustomError("foo");
            }, CustomError);
        }, "expected [Function] to not throw 'CustomError' but 'CustomError: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("foo");
            }, "foo");
        }, "expected [Function] to throw error not including 'foo'");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("foo");
            }, /foo/);
        }, "expected [Function] to throw error not matching /foo/");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("foo");
            }, Error, "foo", "blah");
        }, "blah: expected [Function] to not throw 'Error' but 'Error: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new CustomError("foo");
            }, CustomError, "foo", "blah");
        }, "blah: expected [Function] to not throw 'CustomError' but 'CustomError: foo' was thrown");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("");
            }, "");
        }, "expected [Function] to throw error not including ''");

        err(() => {
            assert.doesNotThrow(() => {
                throw new Error("");
            }, Error, "");
        }, "expected [Function] to not throw 'Error' but 'Error' was thrown");

        err(() => {
            assert.doesNotThrow({});
        }, "expected {} to be a function");

        err(() => {
            assert.doesNotThrow({}, Error, "testing", "blah");
        }, "blah: expected {} to be a function");
    });

    it("ifError", () => {
        assert.ifError(false);
        assert.ifError(null);
        assert.ifError(undefined);

        err(() => {
            const err = new Error("This is an error message");
            assert.ifError(err);
        }, "This is an error message");
    });

    it("operator", () => {
        // For testing undefined and null with == and ===
        let w;

        assert.operator(1, "<", 2);
        assert.operator(2, ">", 1);
        assert.operator(1, "==", 1);
        assert.operator(1, "<=", 1);
        assert.operator(1, ">=", 1);
        assert.operator(1, "!=", 2);
        assert.operator(1, "!==", 2);
        assert.operator(1, "!==", "1");
        assert.operator(w, "==", undefined);
        assert.operator(w, "===", undefined);
        assert.operator(w, "==", null);

        err(() => {
            assert.operator(1, "=", 2, "blah");
        }, 'blah: Invalid operator "="');

        err(() => {
            assert.operator(2, "<", 1, "blah");
        }, "blah: expected 2 to be < 1");

        err(() => {
            assert.operator(1, ">", 2);
        }, "expected 1 to be > 2");

        err(() => {
            assert.operator(1, "==", 2);
        }, "expected 1 to be == 2");

        err(() => {
            assert.operator(1, "===", "1");
        }, "expected 1 to be === \'1\'");

        err(() => {
            assert.operator(2, "<=", 1);
        }, "expected 2 to be <= 1");

        err(() => {
            assert.operator(1, ">=", 2);
        }, "expected 1 to be >= 2");

        err(() => {
            assert.operator(1, "!=", 1);
        }, "expected 1 to be != 1");

        err(() => {
            assert.operator(1, "!==", 1);
        }, "expected 1 to be !== 1");

        err(() => {
            assert.operator(w, "===", null);
        }, "expected undefined to be === null");
    });

    it("closeTo", () => {
        assert.closeTo(1.5, 1.0, 0.5);
        assert.closeTo(10, 20, 20);
        assert.closeTo(-10, 20, 30);

        err(() => {
            assert.closeTo(2, 1.0, 0.5, "blah");
        }, "blah: expected 2 to be close to 1 +/- 0.5");

        err(() => {
            assert.closeTo(-10, 20, 29);
        }, "expected -10 to be close to 20 +/- 29");

        err(() => {
            assert.closeTo([1.5], 1.0, 0.5, "blah");
        }, "blah: expected [ 1.5 ] to be a number");

        err(() => {
            assert.closeTo(1.5, "1.0", 0.5, "blah");
        }, "blah: the arguments to closeTo or approximately must be numbers");

        err(() => {
            assert.closeTo(1.5, 1.0, true, "blah");
        }, "blah: the arguments to closeTo or approximately must be numbers");
    });

    it("approximately", () => {
        assert.approximately(1.5, 1.0, 0.5);
        assert.approximately(10, 20, 20);
        assert.approximately(-10, 20, 30);

        err(() => {
            assert.approximately(2, 1.0, 0.5, "blah");
        }, "blah: expected 2 to be close to 1 +/- 0.5");

        err(() => {
            assert.approximately(-10, 20, 29);
        }, "expected -10 to be close to 20 +/- 29");

        err(() => {
            assert.approximately([1.5], 1.0, 0.5);
        }, "expected [ 1.5 ] to be a number");

        err(() => {
            assert.approximately(1.5, "1.0", 0.5, "blah");
        }, "blah: the arguments to closeTo or approximately must be numbers");

        err(() => {
            assert.approximately(1.5, 1.0, true, "blah");
        }, "blah: the arguments to closeTo or approximately must be numbers");
    });

    it("sameMembers", () => {
        assert.sameMembers([], []);
        assert.sameMembers([1, 2, 3], [3, 2, 1]);
        assert.sameMembers([4, 2], [4, 2]);
        assert.sameMembers([4, 2, 2], [4, 2, 2]);

        err(() => {
            assert.sameMembers([], [1, 2], "blah");
        }, "blah: expected [] to have the same members as [ 1, 2 ]");

        err(() => {
            assert.sameMembers([1, 54], [6, 1, 54]);
        }, "expected [ 1, 54 ] to have the same members as [ 6, 1, 54 ]");

        err(() => {
            assert.sameMembers({}, [], "blah");
        }, "blah: expected {} to be an array");

        err(() => {
            assert.sameMembers([], {}, "blah");
        }, "blah: expected {} to be an array");
    });

    it("notSameMembers", () => {
        assert.notSameMembers([1, 2, 3], [2, 1, 5]);
        assert.notSameMembers([1, 2, 3], [1, 2, 3, 3]);
        assert.notSameMembers([1, 2], [1, 2, 2]);
        assert.notSameMembers([1, 2, 2], [1, 2]);
        assert.notSameMembers([1, 2, 2], [1, 2, 3]);
        assert.notSameMembers([1, 2, 3], [1, 2, 2]);
        assert.notSameMembers([{ a: 1 }], [{ a: 1 }]);

        err(() => {
            assert.notSameMembers([1, 2, 3], [2, 1, 3], "blah");
        }, "blah: expected [ 1, 2, 3 ] to not have the same members as [ 2, 1, 3 ]");
    });

    it("sameDeepMembers", () => {
        assert.sameDeepMembers([{ b: 3 }, { a: 2 }, { c: 5 }], [{ c: 5 }, { b: 3 }, { a: 2 }], "same deep members");
        assert.sameDeepMembers([{ b: 3 }, { a: 2 }, 5, "hello"], ["hello", 5, { b: 3 }, { a: 2 }], "same deep members");
        assert.sameDeepMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);

        err(() => {
            assert.sameDeepMembers([{ b: 3 }], [{ c: 3 }], "blah");
        }, "blah: expected [ { b: 3 } ] to have the same members as [ { c: 3 } ]");

        err(() => {
            assert.sameDeepMembers([{ b: 3 }], [{ b: 5 }]);
        }, "expected [ { b: 3 } ] to have the same members as [ { b: 5 } ]");
    });

    it("notSameDeepMembers", () => {
        assert.notSameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { f: 5 }]);
        assert.notSameDeepMembers([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);
        assert.notSameDeepMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }]);
        assert.notSameDeepMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { c: 3 }]);
        assert.notSameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);

        err(() => {
            assert.notSameDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same members as [ { b: 2 }, { a: 1 }, { c: 3 } ]");
    });

    it("sameOrderedMembers", () => {
        assert.sameOrderedMembers([1, 2, 3], [1, 2, 3]);
        assert.sameOrderedMembers([1, 2, 2], [1, 2, 2]);

        err(() => {
            assert.sameOrderedMembers([1, 2, 3], [2, 1, 3], "blah");
        }, "blah: expected [ 1, 2, 3 ] to have the same ordered members as [ 2, 1, 3 ]");
    });

    it("notSameOrderedMembers", () => {
        assert.notSameOrderedMembers([1, 2, 3], [2, 1, 3]);
        assert.notSameOrderedMembers([1, 2, 3], [1, 2]);
        assert.notSameOrderedMembers([1, 2], [1, 2, 2]);
        assert.notSameOrderedMembers([1, 2, 2], [1, 2]);
        assert.notSameOrderedMembers([1, 2, 2], [1, 2, 3]);
        assert.notSameOrderedMembers([1, 2, 3], [1, 2, 2]);

        err(() => {
            assert.notSameOrderedMembers([1, 2, 3], [1, 2, 3], "blah");
        }, "blah: expected [ 1, 2, 3 ] to not have the same ordered members as [ 1, 2, 3 ]");
    });

    it("sameDeepOrderedMembers", () => {
        assert.sameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }]);
        assert.sameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);

        err(() => {
            assert.sameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to have the same ordered members as [ { b: 2 }, { a: 1 }, { c: 3 } ]");
    });

    it("notSameDeepOrderedMembers", () => {
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }, { c: 3 }]);
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { f: 5 }]);
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }]);
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { c: 3 }]);
        assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);

        err(() => {
            assert.notSameDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { c: 3 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not have the same ordered members as [ { a: 1 }, { b: 2 }, { c: 3 } ]");
    });

    it("includeMembers", () => {
        assert.includeMembers([1, 2, 3], [2, 3, 2]);
        assert.includeMembers([1, 2, 3], []);
        assert.includeMembers([1, 2, 3], [3]);

        err(() => {
            assert.includeMembers([5, 6], [7, 8], "blah");
        }, "blah: expected [ 5, 6 ] to be a superset of [ 7, 8 ]");

        err(() => {
            assert.includeMembers([5, 6], [5, 6, 0]);
        }, "expected [ 5, 6 ] to be a superset of [ 5, 6, 0 ]");
    });

    it("notIncludeMembers", () => {
        assert.notIncludeMembers([1, 2, 3], [5, 1]);
        assert.notIncludeMembers([{ a: 1 }], [{ a: 1 }]);

        err(() => {
            assert.notIncludeMembers([1, 2, 3], [2, 1], "blah");
        }, "blah: expected [ 1, 2, 3 ] to not be a superset of [ 2, 1 ]");
    });

    it("includeDeepMembers", () => {
        assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ c: 3 }, { b: 2 }]);
        assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], []);
        assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ c: 3 }]);
        assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }, { c: 3 }], [{ c: 3 }, { c: 3 }]);
        assert.includeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ c: 3 }, { c: 3 }]);

        err(() => {
            assert.includeDeepMembers([{ e: 5 }, { f: 6 }], [{ g: 7 }, { h: 8 }], "blah");
        }, "blah: expected [ { e: 5 }, { f: 6 } ] to be a superset of [ { g: 7 }, { h: 8 } ]");

        err(() => {
            assert.includeDeepMembers([{ e: 5 }, { f: 6 }], [{ e: 5 }, { f: 6 }, { z: 0 }]);
        }, "expected [ { e: 5 }, { f: 6 } ] to be a superset of [ { e: 5 }, { f: 6 }, { z: 0 } ]");
    });

    it("notIncludeDeepMembers", () => {
        assert.notIncludeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { f: 5 }]);

        err(() => {
            assert.notIncludeDeepMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be a superset of [ { b: 2 }, { a: 1 } ]");
    });

    it("includeOrderedMembers", () => {
        assert.includeOrderedMembers([1, 2, 3], [1, 2]);

        err(() => {
            assert.includeOrderedMembers([1, 2, 3], [2, 1], "blah");
        }, "blah: expected [ 1, 2, 3 ] to be an ordered superset of [ 2, 1 ]");
    });

    it("notIncludeOrderedMembers", () => {
        assert.notIncludeOrderedMembers([1, 2, 3], [2, 1]);
        assert.notIncludeOrderedMembers([1, 2, 3], [2, 3]);
        assert.notIncludeOrderedMembers([1, 2, 3], [1, 2, 2]);

        err(() => {
            assert.notIncludeOrderedMembers([1, 2, 3], [1, 2], "blah");
        }, "blah: expected [ 1, 2, 3 ] to not be an ordered superset of [ 1, 2 ]");
    });

    it("includeDeepOrderedMembers", () => {
        assert.includeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }]);

        err(() => {
            assert.includeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to be an ordered superset of [ { b: 2 }, { a: 1 } ]");
    });

    it("notIncludeDeepOrderedMembers", () => {
        assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ b: 2 }, { a: 1 }]);
        assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { f: 5 }]);
        assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }, { b: 2 }]);

        err(() => {
            assert.notIncludeDeepOrderedMembers([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }], "blah");
        }, "blah: expected [ { a: 1 }, { b: 2 }, { c: 3 } ] to not be an ordered superset of [ { a: 1 }, { b: 2 } ]");
    });

    it("oneOf", () => {
        assert.oneOf(1, [1, 2, 3]);

        const three = [3];
        assert.oneOf(three, [1, 2, three]);

        const four = { four: 4 };
        assert.oneOf(four, [1, 2, four]);

        err(() => {
            assert.oneOf(1, 1, "blah");
        }, "blah: expected 1 to be an array");

        err(() => {
            assert.oneOf(1, { a: 1 });
        }, "expected { a: 1 } to be an array");

        err(() => {
            assert.oneOf(9, [1, 2, 3], "Message");
        }, "Message: expected 9 to be one of [ 1, 2, 3 ]");

        err(() => {
            assert.oneOf([3], [1, 2, [3]]);
        }, "expected [ 3 ] to be one of [ 1, 2, [ 3 ] ]");

        err(() => {
            assert.oneOf({ four: 4 }, [1, 2, { four: 4 }]);
        }, "expected { four: 4 } to be one of [ 1, 2, { four: 4 } ]");
    });

    it("above", () => {
        assert.isAbove(5, 2, "5 should be above 2");

        err(() => {
            assert.isAbove(1, 3, "blah");
        }, "blah: expected 1 to be above 3");

        err(() => {
            assert.isAbove(1, 1);
        }, "expected 1 to be above 1");

        err(() => {
            assert.isAbove(null, 1, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isAbove(1, null, "blah");
        }, "blah: the argument to above must be a number");
    });

    it("above (dates)", () => {
        const now = new Date();
        const oneSecondAgo = new Date(now.getTime() - 1000);
        assert.isAbove(now, oneSecondAgo, "Now should be above 1 second ago");

        err(() => {
            assert.isAbove(oneSecondAgo, now, "blah");
        }, `blah: expected ${oneSecondAgo.toUTCString()} to be above ${now.toUTCString()}`);

        err(() => {
            assert.isAbove(now, now, "blah");
        }, `blah: expected ${now.toUTCString()} to be above ${now.toUTCString()}`);

        err(() => {
            assert.isAbove(null, now);
        }, "expected null to be a number or a date");

        err(() => {
            assert.isAbove(now, null, "blah");
        }, "blah: the argument to above must be a date");

        err(() => {
            assert.isAbove(now, 1, "blah");
        }, "blah: the argument to above must be a date");

        err(() => {
            assert.isAbove(1, now, "blah");
        }, "blah: the argument to above must be a number");
    });

    it("atLeast", () => {
        assert.isAtLeast(5, 2, "5 should be above 2");
        assert.isAtLeast(1, 1, "1 should be equal to 1");

        err(() => {
            assert.isAtLeast(1, 3, "blah");
        }, "blah: expected 1 to be at least 3");

        err(() => {
            assert.isAtLeast(null, 1, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isAtLeast(1, null, "blah");
        }, "blah: the argument to least must be a number");
    });

    it("atLeast (dates)", () => {
        const now = new Date();
        const oneSecondAgo = new Date(now.getTime() - 1000);
        const oneSecondAfter = new Date(now.getTime() + 1000);

        assert.isAtLeast(now, oneSecondAgo, "Now should be above one second ago");
        assert.isAtLeast(now, now, "Now should be equal to now");

        err(() => {
            assert.isAtLeast(now, oneSecondAfter, "blah");
        }, `blah: expected ${now.toUTCString()} to be at least ${oneSecondAfter.toUTCString()}`);

        err(() => {
            assert.isAtLeast(null, now, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isAtLeast(now, null, "blah");
        }, "blah: the argument to least must be a date");

        err(() => {
            assert.isAtLeast(1, now, "blah");
        }, "blah: the argument to least must be a number");

        err(() => {
            assert.isAtLeast(now, 1, "blah");
        }, "blah: the argument to least must be a date");
    });

    it("below", () => {
        assert.isBelow(2, 5, "2 should be below 5");

        err(() => {
            assert.isBelow(3, 1, "blah");
        }, "blah: expected 3 to be below 1");

        err(() => {
            assert.isBelow(1, 1);
        }, "expected 1 to be below 1");

        err(() => {
            assert.isBelow(null, 1, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isBelow(1, null, "blah");
        }, "blah: the argument to below must be a number");
    });

    it("below (dates)", () => {
        const now = new Date();
        const oneSecondAgo = new Date(now.getTime() - 1000);
        assert.isBelow(oneSecondAgo, now, "One second ago should be below now");

        err(() => {
            assert.isBelow(now, oneSecondAgo, "blah");
        }, `blah: expected ${now.toUTCString()} to be below ${oneSecondAgo.toUTCString()}`);

        err(() => {
            assert.isBelow(now, now);
        }, `expected ${now.toUTCString()} to be below ${now.toUTCString()}`);

        err(() => {
            assert.isBelow(null, now, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isBelow(now, null, "blah");
        }, "blah: the argument to below must be a date");

        err(() => {
            assert.isBelow(now, 1, "blah");
        }, "blah: the argument to below must be a date");

        err(() => {
            assert.isBelow(1, now, "blah");
        }, "blah: the argument to below must be a number");
    });

    it("atMost", () => {
        assert.isAtMost(2, 5, "2 should be below 5");
        assert.isAtMost(1, 1, "1 should be equal to 1");

        err(() => {
            assert.isAtMost(3, 1, "blah");
        }, "blah: expected 3 to be at most 1");

        err(() => {
            assert.isAtMost(null, 1, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isAtMost(1, null, "blah");
        }, "blah: the argument to most must be a number");
    });

    it("atMost (dates)", () => {
        const now = new Date();
        const oneSecondAgo = new Date(now.getTime() - 1000);
        const oneSecondAfter = new Date(now.getTime() + 1000);

        assert.isAtMost(oneSecondAgo, now, "Now should be below one second ago");
        assert.isAtMost(now, now, "Now should be equal to now");

        err(() => {
            assert.isAtMost(oneSecondAfter, now, "blah");
        }, `blah: expected ${oneSecondAfter.toUTCString()} to be at most ${now.toUTCString()}`);

        err(() => {
            assert.isAtMost(null, now, "blah");
        }, "blah: expected null to be a number or a date");

        err(() => {
            assert.isAtMost(now, null, "blah");
        }, "blah: the argument to most must be a date");

        err(() => {
            assert.isAtMost(now, 1, "blah");
        }, "blah: the argument to most must be a date");

        err(() => {
            assert.isAtMost(1, now, "blah");
        }, "blah: the argument to most must be a number");
    });

    it("change", () => {
        const obj = { value: 10, str: "foo" };
        const heroes = ["spiderman", "superman"];
        const fn = function () {
            obj.value += 5;
        };
        const fnDec = function () {
            obj.value -= 20;
        };
        const getterFn = function () {
            return obj.value;
        };
        const bangFn = function () {
            obj.str += "!";
        };
        const smFn = function () {
            "foo" + "bar";
        };
        const batFn = function () {
            heroes.push("batman");
        };
        const lenFn = function () {
            return heroes.length;
        };

        assert.changes(fn, obj, "value");
        assert.changes(fn, getterFn, "changes via getter function");
        assert.changesBy(fn, obj, "value", 5);
        assert.changesBy(fn, obj, "value", -5);
        assert.changesBy(fn, getterFn, 5);
        assert.changesBy(fnDec, obj, "value", 20);

        assert.doesNotChange(smFn, obj, "value");
        assert.doesNotChange(smFn, getterFn, "value");
        assert.changesButNotBy(fnDec, obj, "value", 1);
        assert.changesButNotBy(fnDec, getterFn, 1);

        assert.changes(bangFn, obj, "str");

        assert.changesBy(batFn, lenFn, 1);
        assert.changesButNotBy(batFn, lenFn, 2);

        err(() => {
            assert.changes(smFn, obj, "value", "blah");
        }, "blah: expected .value to change");

        err(() => {
            assert.doesNotChange(fn, obj, "value", "blah");
        }, "blah: expected .value to not change");

        err(() => {
            assert.changes({}, obj, "value", "blah");
        }, "blah: expected {} to be a function");

        err(() => {
            assert.changes(fn, {}, "badprop", "blah");
        }, "blah: expected {} to have property 'badprop'");

        err(() => {
            assert.changesBy(fn, obj, "value", 10, "blah");
        }, "blah: expected .value to change by 10");

        err(() => {
            assert.changesButNotBy(fn, obj, "value", 5, "blah");
        }, "blah: expected .value to not change by 5");
    });

    it("increase, decrease", () => {
        const obj = { value: 10, noop: null };
        const arr = ["one", "two"];
        const pFn = function () {
            arr.push("three");
        };
        const popFn = function () {
            arr.pop();
        };
        const lenFn = function () {
            return arr.length;
        };
        const incFn = function () {
            obj.value += 2;
        };
        const decFn = function () {
            obj.value -= 3;
        };
        const getterFn = function () {
            return obj.value;
        };
        const smFn = function () {
            obj.value += 0;
        };

        assert.decreases(decFn, obj, "value");
        assert.decreases(decFn, getterFn, "decreases via getter function");
        assert.doesNotDecrease(smFn, obj, "value");
        assert.doesNotDecrease(smFn, getterFn, "value");
        assert.decreasesBy(decFn, obj, "value", 3);
        assert.decreasesBy(decFn, getterFn, 3);
        assert.decreasesButNotBy(decFn, obj, "value", 10);
        assert.decreasesButNotBy(decFn, getterFn, 10);

        assert.increases(incFn, obj, "value");
        assert.increases(incFn, getterFn, "increases via getter function");
        assert.doesNotIncrease(smFn, obj, "value");
        assert.doesNotIncrease(smFn, getterFn, "value");
        assert.increasesBy(incFn, obj, "value", 2);
        assert.increasesBy(incFn, getterFn, 2);
        assert.increasesButNotBy(incFn, obj, "value", 1);
        assert.increasesButNotBy(incFn, getterFn, 1);

        assert.decreases(popFn, lenFn);
        assert.doesNotDecrease(pFn, lenFn);
        assert.decreasesBy(popFn, lenFn, 1);
        assert.decreasesButNotBy(popFn, lenFn, 2);

        assert.increases(pFn, lenFn);
        assert.doesNotIncrease(popFn, lenFn);
        assert.increasesBy(pFn, lenFn, 1);
        assert.increasesButNotBy(pFn, lenFn, 2);

        err(() => {
            assert.increases(smFn, obj, "value", "blah");
        }, "blah: expected .value to increase");

        err(() => {
            assert.doesNotIncrease(incFn, obj, "value", "blah");
        }, "blah: expected .value to not increase");

        err(() => {
            assert.increases({}, obj, "value", "blah");
        }, "blah: expected {} to be a function");

        err(() => {
            assert.increases(incFn, {}, "badprop", "blah");
        }, "blah: expected {} to have property 'badprop'");

        err(() => {
            assert.increases(incFn, obj, "noop", "blah");
        }, "blah: expected null to be a number");

        err(() => {
            assert.increasesBy(incFn, obj, "value", 10, "blah");
        }, "blah: expected .value to increase by 10");

        err(() => {
            assert.increasesButNotBy(incFn, obj, "value", 2, "blah");
        }, "blah: expected .value to not increase by 2");

        err(() => {
            assert.decreases(smFn, obj, "value", "blah");
        }, "blah: expected .value to decrease");

        err(() => {
            assert.doesNotDecrease(decFn, obj, "value", "blah");
        }, "blah: expected .value to not decrease");

        err(() => {
            assert.decreases({}, obj, "value", "blah");
        }, "blah: expected {} to be a function");

        err(() => {
            assert.decreases(decFn, {}, "badprop", "blah");
        }, "blah: expected {} to have property 'badprop'");

        err(() => {
            assert.decreases(decFn, obj, "noop", "blah");
        }, "blah: expected null to be a number");

        err(() => {
            assert.decreasesBy(decFn, obj, "value", 10, "blah");
        }, "blah: expected .value to decrease by 10");

        err(() => {
            assert.decreasesButNotBy(decFn, obj, "value", 3, "blah");
        }, "blah: expected .value to not decrease by 3");
    });

    it("isExtensible / extensible", () => {
        ["isExtensible", "extensible"].forEach((isExtensible) => {
            const nonExtensibleObject = Object.preventExtensions({});

            assert[isExtensible]({});

            err(() => {
                assert[isExtensible](nonExtensibleObject, "blah");
            }, "blah: expected {} to be extensible");

            // Making sure ES6-like Object.isExtensible response is respected for all primitive types

            err(() => {
                assert[isExtensible](42);
            }, "expected 42 to be extensible");

            err(() => {
                assert[isExtensible](null);
            }, "expected null to be extensible");

            err(() => {
                assert[isExtensible]("foo");
            }, "expected 'foo' to be extensible");

            err(() => {
                assert[isExtensible](false);
            }, "expected false to be extensible");

            err(() => {
                assert[isExtensible](undefined);
            }, "expected undefined to be extensible");

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    isExtensible() {
                        throw new TypeError();
                    }
                });

                err(() => {
                    // isExtensible should not suppress errors, thrown in proxy traps
                    assert[isExtensible](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isNotExtensible / notExtensible", () => {
        ["isNotExtensible", "notExtensible"].forEach((isNotExtensible) => {
            const nonExtensibleObject = Object.preventExtensions({});

            assert[isNotExtensible](nonExtensibleObject);

            err(() => {
                assert[isNotExtensible]({}, "blah");
            }, "blah: expected {} to not be extensible");

            // Making sure ES6-like Object.isExtensible response is respected for all primitive types

            assert[isNotExtensible](42);
            assert[isNotExtensible](null);
            assert[isNotExtensible]("foo");
            assert[isNotExtensible](false);
            assert[isNotExtensible](undefined);

            if (ateos.isFunction(Symbol)) {
                assert[isNotExtensible](Symbol());
            }

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    isExtensible() {
                        throw new TypeError();
                    }
                });

                err(() => {
                    // isNotExtensible should not suppress errors, thrown in proxy traps
                    assert[isNotExtensible](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isSealed / sealed", () => {
        ["isSealed", "sealed"].forEach((isSealed) => {
            const sealedObject = Object.seal({});

            assert[isSealed](sealedObject);

            err(() => {
                assert[isSealed]({}, "blah");
            }, "blah: expected {} to be sealed");

            // Making sure ES6-like Object.isSealed response is respected for all primitive types

            assert[isSealed](42);
            assert[isSealed](null);
            assert[isSealed]("foo");
            assert[isSealed](false);
            assert[isSealed](undefined);

            if (ateos.isFunction(Symbol)) {
                assert[isSealed](Symbol());
            }

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    ownKeys() {
                        throw new TypeError();
                    }
                });

                // Object.isSealed will call ownKeys trap only if object is not extensible
                Object.preventExtensions(proxy);

                err(() => {
                    // isSealed should not suppress errors, thrown in proxy traps
                    assert[isSealed](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isNotSealed / notSealed", () => {
        ["isNotSealed", "notSealed"].forEach((isNotSealed) => {
            const sealedObject = Object.seal({});

            assert[isNotSealed]({});

            err(() => {
                assert[isNotSealed](sealedObject, "blah");
            }, "blah: expected {} to not be sealed");

            // Making sure ES6-like Object.isSealed response is respected for all primitive types

            err(() => {
                assert[isNotSealed](42);
            }, "expected 42 to not be sealed");

            err(() => {
                assert[isNotSealed](null);
            }, "expected null to not be sealed");

            err(() => {
                assert[isNotSealed]("foo");
            }, "expected 'foo' to not be sealed");

            err(() => {
                assert[isNotSealed](false);
            }, "expected false to not be sealed");

            err(() => {
                assert[isNotSealed](undefined);
            }, "expected undefined to not be sealed");

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    ownKeys() {
                        throw new TypeError();
                    }
                });

                // Object.isSealed will call ownKeys trap only if object is not extensible
                Object.preventExtensions(proxy);

                err(() => {
                    // isNotSealed should not suppress errors, thrown in proxy traps
                    assert[isNotSealed](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isFrozen / frozen", () => {
        ["isFrozen", "frozen"].forEach((isFrozen) => {
            const frozenObject = Object.freeze({});

            assert[isFrozen](frozenObject);

            err(() => {
                assert[isFrozen]({}, "blah");
            }, "blah: expected {} to be frozen");

            // Making sure ES6-like Object.isFrozen response is respected for all primitive types

            assert[isFrozen](42);
            assert[isFrozen](null);
            assert[isFrozen]("foo");
            assert[isFrozen](false);
            assert[isFrozen](undefined);

            if (ateos.isFunction(Symbol)) {
                assert[isFrozen](Symbol());
            }

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    ownKeys() {
                        throw new TypeError();
                    }
                });

                // Object.isFrozen will call ownKeys trap only if object is not extensible
                Object.preventExtensions(proxy);

                err(() => {
                    // isFrozen should not suppress errors, thrown in proxy traps
                    assert[isFrozen](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isNotFrozen / notFrozen", () => {
        ["isNotFrozen", "notFrozen"].forEach((isNotFrozen) => {
            const frozenObject = Object.freeze({});

            assert[isNotFrozen]({});

            err(() => {
                assert[isNotFrozen](frozenObject, "blah");
            }, "blah: expected {} to not be frozen", true);

            // Making sure ES6-like Object.isFrozen response is respected for all primitive types

            err(() => {
                assert[isNotFrozen](42);
            }, "expected 42 to not be frozen");

            err(() => {
                assert[isNotFrozen](null);
            }, "expected null to not be frozen");

            err(() => {
                assert[isNotFrozen]("foo");
            }, "expected 'foo' to not be frozen");

            err(() => {
                assert[isNotFrozen](false);
            }, "expected false to not be frozen");

            err(() => {
                assert[isNotFrozen](undefined);
            }, "expected undefined to not be frozen");

            if (ateos.isFunction(Proxy)) {
                const proxy = new Proxy({}, {
                    ownKeys() {
                        throw new TypeError();
                    }
                });

                // Object.isFrozen will call ownKeys trap only if object is not extensible
                Object.preventExtensions(proxy);

                err(() => {
                    // isNotFrozen should not suppress errors, thrown in proxy traps
                    assert[isNotFrozen](proxy);
                }, { name: "TypeError" }, true);
            }
        });
    });

    it("isEmpty / empty", () => {
        ["isEmpty", "empty"].forEach((isEmpty) => {
            function FakeArgs() { }
            FakeArgs.prototype.length = 0;

            assert[isEmpty]("");
            assert[isEmpty]([]);
            assert[isEmpty](new FakeArgs());
            assert[isEmpty]({});

            if (ateos.isFunction(WeakMap)) {
                err(() => {
                    assert[isEmpty](new WeakMap(), "blah");
                }, "blah: .empty was passed a weak collection");
            }

            if (ateos.isFunction(WeakSet)) {
                err(() => {
                    assert[isEmpty](new WeakSet(), "blah");
                }, "blah: .empty was passed a weak collection");
            }

            if (ateos.isFunction(Map)) {
                assert[isEmpty](new Map());

                const map = new Map();
                map.key = "val";
                assert[isEmpty](map);
            }

            if (ateos.isFunction(Set)) {
                assert[isEmpty](new Set());

                const set = new Set();
                set.key = "val";
                assert[isEmpty](set);
            }

            err(() => {
                assert[isEmpty]("foo", "blah");
            }, "blah: expected \'foo\' to be empty");

            err(() => {
                assert[isEmpty](["foo"]);
            }, "expected [ \'foo\' ] to be empty");

            err(() => {
                assert[isEmpty]({ arguments: 0 });
            }, "expected { arguments: 0 } to be empty");

            err(() => {
                assert[isEmpty]({ foo: "bar" });
            }, "expected { foo: \'bar\' } to be empty");

            err(() => {
                assert[isEmpty](null, "blah");
            }, "blah: .empty was passed non-string primitive null");

            err(() => {
                assert[isEmpty](undefined);
            }, ".empty was passed non-string primitive undefined");

            err(() => {
                assert[isEmpty]();
            }, ".empty was passed non-string primitive undefined");

            err(() => {
                assert[isEmpty](0);
            }, ".empty was passed non-string primitive 0");

            err(() => {
                assert[isEmpty](1);
            }, ".empty was passed non-string primitive 1");

            err(() => {
                assert[isEmpty](true);
            }, ".empty was passed non-string primitive true");

            err(() => {
                assert[isEmpty](false);
            }, ".empty was passed non-string primitive false");

            if (!ateos.isUndefined(Symbol)) {
                err(() => {
                    assert[isEmpty](Symbol());
                }, ".empty was passed non-string primitive Symbol()");

                err(() => {
                    assert[isEmpty](Symbol.iterator);
                }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
            }

            err(() => {
                assert[isEmpty](() => { }, "blah");
            }, "blah: .empty was passed a function");

            if (FakeArgs.name === "FakeArgs") {
                err(() => {
                    assert[isEmpty](FakeArgs);
                }, ".empty was passed a function FakeArgs");
            }
        });
    });

    it("isNotEmpty / notEmpty", () => {
        ["isNotEmpty", "notEmpty"].forEach((isNotEmpty) => {
            function FakeArgs() { }
            FakeArgs.prototype.length = 0;

            assert[isNotEmpty]("foo");
            assert[isNotEmpty](["foo"]);
            assert[isNotEmpty]({ arguments: 0 });
            assert[isNotEmpty]({ foo: "bar" });

            if (ateos.isFunction(WeakMap)) {
                err(() => {
                    assert[isNotEmpty](new WeakMap(), "blah");
                }, "blah: .empty was passed a weak collection");
            }

            if (ateos.isFunction(WeakSet)) {
                err(() => {
                    assert[isNotEmpty](new WeakSet(), "blah");
                }, "blah: .empty was passed a weak collection");
            }

            if (ateos.isFunction(Map)) {
                // Not using Map constructor args because not supported in IE 11.
                const map = new Map();
                map.set("a", 1);
                assert[isNotEmpty](map);

                err(() => {
                    assert[isNotEmpty](new Map());
                }, "expected {} not to be empty");
            }

            if (ateos.isFunction(Set)) {
                // Not using Set constructor args because not supported in IE 11.
                const set = new Set();
                set.add(1);
                assert[isNotEmpty](set);

                err(() => {
                    assert[isNotEmpty](new Set());
                }, "expected {} not to be empty");
            }

            err(() => {
                assert[isNotEmpty]("", "blah");
            }, "blah: expected \'\' not to be empty");

            err(() => {
                assert[isNotEmpty]([]);
            }, "expected [] not to be empty");

            err(() => {
                assert[isNotEmpty](new FakeArgs());
            }, "expected { length: 0 } not to be empty");

            err(() => {
                assert[isNotEmpty]({});
            }, "expected {} not to be empty");

            err(() => {
                assert[isNotEmpty](null, "blah");
            }, "blah: .empty was passed non-string primitive null");

            err(() => {
                assert[isNotEmpty](undefined);
            }, ".empty was passed non-string primitive undefined");

            err(() => {
                assert[isNotEmpty]();
            }, ".empty was passed non-string primitive undefined");

            err(() => {
                assert[isNotEmpty](0);
            }, ".empty was passed non-string primitive 0");

            err(() => {
                assert[isNotEmpty](1);
            }, ".empty was passed non-string primitive 1");

            err(() => {
                assert[isNotEmpty](true);
            }, ".empty was passed non-string primitive true");

            err(() => {
                assert[isNotEmpty](false);
            }, ".empty was passed non-string primitive false");

            if (!ateos.isUndefined(Symbol)) {
                err(() => {
                    assert[isNotEmpty](Symbol());
                }, ".empty was passed non-string primitive Symbol()");

                err(() => {
                    assert[isNotEmpty](Symbol.iterator);
                }, ".empty was passed non-string primitive Symbol(Symbol.iterator)");
            }

            err(() => {
                assert[isNotEmpty](() => { }, "blah");
            }, "blah: .empty was passed a function");

            if (FakeArgs.name === "FakeArgs") {
                err(() => {
                    assert[isNotEmpty](FakeArgs);
                }, ".empty was passed a function FakeArgs");
            }
        });
    });

    it("showDiff true with actual and expected args", () => {
        try {
            new assertion.Assertion().assert(
                "one" === "two"
                , "expected #{this} to equal #{exp}"
                , "expected #{this} to not equal #{act}"
                , "one"
                , "two"
            );
        } catch (e) {
            assert.isTrue(e.showDiff);
        }
    });

    it("showDiff false without expected and actual", () => {
        try {
            new assertion.Assertion().assert(
                "one" === "two"
                , "expected #{this} to equal #{exp}"
                , "expected #{this} to not equal #{act}"
                , "one"
                , "two"
                , false
            );
        } catch (e) {
            assert.isFalse(e.showDiff);
        }
    });
});
