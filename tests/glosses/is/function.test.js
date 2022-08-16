const {
    is
} = ateos;

describe("is", () => {
    const arrowFuncs = [
        (a, b) => a * b,
        () => 42,
        () => function () { },
        () => (x) => x * x,
        (x) => x * x,
        (x) => {
            return x * x;
        },
        (x, y) => {
            return x + x;
        }
    ];

    const asyncFuncs = [
        async (a, b) => a * b,
        async () => { },
        async function foo() { }
    ];

    const generatorFunction = function* () {
        const x = yield; return x || 42;
    };

    class Foo {}

    const CommentedClass = new Function("return class/*kkk*/\n//blah\n Bar\n//blah\n {}");

    describe("function()", () => {
        const noop = function () { };
        const classFake = function classFake() { }; // eslint-disable-line func-name-matching
        const returnClass = function () {
            return " class ";
        };
        const return3 = function () {
            return 3;
        };
        /**
         * for coverage
         */
        noop();
        classFake();
        returnClass();
        return3();

        describe("not callables", () => {
            it("non-number/string primitives", () => {
                assert.isFalse(ateos.isFunction(), "undefined is not function");
                assert.isFalse(ateos.isFunction(null), "null is not function");
                assert.isFalse(ateos.isFunction(false), "false is not function");
                assert.isFalse(ateos.isFunction(true), "true is not function");
            });

            assert.isFalse(ateos.isFunction([]), "array is not function");
            assert.isFalse(ateos.isFunction({}), "object is not function");
            assert.isFalse(ateos.isFunction(/a/g), "regex literal is not function");
            assert.isFalse(ateos.isFunction(new RegExp("a", "g")), "regex object is not function");
            assert.isFalse(ateos.isFunction(new Date()), "new Date() is not function");

            it("numbers", () => {
                assert.isFalse(ateos.isFunction(42), "number is not function");
                assert.isFalse(ateos.isFunction(Object(42)), "number object is not function");
                assert.isFalse(ateos.isFunction(NaN), "NaN is not function");
                assert.isFalse(ateos.isFunction(Infinity), "Infinity is not function");
            });

            it("strings", () => {
                assert.isFalse(ateos.isFunction("foo"), "string primitive is not function");
                assert.isFalse(ateos.isFunction(Object("foo")), "string object is not function");
            });

            it("non-function with function in its [[Prototype]] chain", () => {
                const Foo = function Bar() { };
                Foo.prototype = noop;
                assert.equal(true, ateos.isFunction(Foo), "sanity check: Foo is function");
                assert.equal(false, ateos.isFunction(new Foo()), "instance of Foo is not function");
            });
        });

        it("@@toStringTag", () => {
            const fakeFunction = {
                toString() {
                    return String(return3);
                },
                valueOf: return3
            };
            fakeFunction[Symbol.toStringTag] = "Function";
            assert.equal(String(fakeFunction), String(return3));
            assert.equal(Number(fakeFunction), return3());
            assert.isFalse(ateos.isFunction(fakeFunction), 'fake Function with @@toStringTag "Function" is not function');
        });

        const typedArrayNames = [
            "Int8Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "Int16Array",
            "Uint16Array",
            "Int32Array",
            "Uint32Array",
            "Float32Array",
            "Float64Array"
        ];

        it("regular function", () => {
            assert.isTrue(ateos.isFunction(noop), "function is function");
            assert.isTrue(ateos.isFunction(classFake), 'function with name containing "class" is function');
            assert.isTrue(ateos.isFunction(returnClass), 'function with string " class " is function');
            assert.isTrue(ateos.isFunction(ateos.isFunction), "ateos.isFunction is function");
        });

        it("typed arrays", () => {
            for (const typedArray of typedArrayNames) {
                assert.isTrue(ateos.isFunction(global[typedArray]), `${typedArray} is function`);
            }
        });

        it("Generators", { skip: !generatorFunction }, () => {
            assert.isTrue(ateos.isFunction(generatorFunction), "generator function is function");
        });

        it("arrow functions", () => {
            arrowFuncs.forEach((arrowFunc) => {
                assert.isTrue(ateos.isFunction(arrowFunc), `arrow function ${arrowFunc} is arrow function`);
            });
        });

        it("async functions", () => {
            asyncFuncs.forEach((asyncFunc) => {
                assert.isTrue(ateos.isFunction(asyncFunc), `arrow function ${asyncFunc} is arrow function`);
            });
        });

        it("classes", () => {
            assert.isTrue(ateos.isFunction(Foo), "class constructor are function");
            assert.isTrue(ateos.isFunction(CommentedClass), "class constructor with comments in the signature are function");
        });
    });

    describe("arrowFunction()", () => {
        it("non-functions", () => {
            const nonFuncs = [
                true,
                false,
                null,
                undefined,
                {},
                [],
                /a/g,
                "string",
                42,
                new Date()
            ];
            for (const nonFunc of nonFuncs) {
                assert.isFalse(is.arrowFunction(nonFunc), `${nonFunc} is not a function`);
            }
        });

        it("non-arrow functions", () => {
            const func = function () { };
            assert.isFalse(is.arrowFunction(func), "anonymous function is not an arrow function");

            const namedFunc = function foo() { };
            assert.isFalse(is.arrowFunction(namedFunc), "named function is not an arrow function");
        });

        it("non-arrow function with faked toString", () => {
            const func = function () { };
            func.toString = function () {
                return "ARROW";
            };

            assert.notEqual(String(func), Function.prototype.toString.call(func), "test function has faked toString that is different from default toString");
            assert.isFalse(is.arrowFunction(func), "anonymous function with faked toString is not an arrow function");
        });

        it("arrow functions", () => {
            arrowFuncs.forEach((arrowFunc) => {
                assert.isTrue(is.arrowFunction(arrowFunc), `arrow function ${arrowFunc} is arrow function`);
            });
        });

        it("async arrow functions", () => {
            asyncFuncs.slice(0, 2).forEach((asyncFunc) => {
                assert.isTrue(is.arrowFunction(asyncFunc), `async arrow function ${asyncFunc} is arrow function`);
            });
            asyncFuncs.slice(2).forEach((asyncFunc) => {
                assert.isFalse(is.arrowFunction(asyncFunc), `async non-arrow function ${asyncFunc} is not an arrow function`);
            });
        });
    });

    describe("asyncFunction()", () => {
        it("arrow functions", () => {
            arrowFuncs.forEach((arrowFunc) => {
                assert.isFalse(ateos.isAsyncFunction(arrowFunc));
            });
        });

        it("generator function", () => {
            assert.isFalse(ateos.isAsyncFunction(generatorFunction));
        });

        it("class", () => {
            assert.isFalse(ateos.isAsyncFunction(Foo));
        });

        it("valid", () => {
            asyncFuncs.forEach((asyncFunc) => {
                assert.isTrue(ateos.isAsyncFunction(asyncFunc));
            });
        });
    });

    describe("generatorFunction()", () => {
        it("arrow functions", () => {
            arrowFuncs.forEach((arrowFunc) => {
                assert.isFalse(is.generatorFunction(arrowFunc), `${arrowFunc} is not a generator`);
            });
        });

        it("async functions", () => {
            asyncFuncs.forEach((asyncFunc) => {
                assert.isFalse(is.generatorFunction(asyncFunc));
            });
        });

        it("class", () => {
            assert.isFalse(ateos.isAsyncFunction(Foo));
        });

        it("valid", () => {
            assert.isTrue(is.generatorFunction(generatorFunction));
        });
    });
});
