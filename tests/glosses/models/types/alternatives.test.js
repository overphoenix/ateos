const Helper = require("../helper");

const {
    model
} = ateos;

describe("alternatives", () => {

    it("can be called on its own", () => {

        const alternatives = model.alternatives;
        expect(() => alternatives()).to.throw("Must be invoked on a Joi instance.");
    });

    it("fails when no alternatives are provided", async () => {

        const err = await assert.throws(async () => model.alternatives().validate("a"));
        expect(err.message).to.equal('"value" not matching any of the allowed alternatives');
        expect(err.details).to.eql([
            {
                context: {
                    key: undefined,
                    label: "value"
                },
                message: '"value" not matching any of the allowed alternatives',
                path: [],
                type: "alternatives.base"
            }
        ]);
    });

    it("allows undefined when no alternatives are provided", async () => {

        await model.alternatives().validate(undefined);
    });

    it("applies modifiers when higher priority converts", async () => {

        const schema = model.object({
            a: [
                model.number(),
                model.string()
            ]
        });

        const value = await schema.validate({ a: "5" });
        expect(value.a).to.equal(5);
    });

    it("applies modifiers when lower priority valid is a match", async () => {

        const schema = model.object({
            a: [
                model.number(),
                model.valid("5")
            ]
        });

        const value = await schema.validate({ a: "5" });
        expect(value.a).to.equal(5);
    });

    it("does not apply modifier if alternative fails", async () => {

        const schema = model.object({
            a: [
                model.object({ c: model.any(), d: model.number() }).rename("b", "c"),
                { b: model.any(), d: model.string() }
            ]
        });

        const input = { a: { b: "any", d: "string" } };
        const value = await schema.validate(input);
        expect(value.a.b).to.equal("any");
    });

    describe("try()", () => {

        it("throws when missing alternatives", () => {

            expect(() => {

                model.alternatives().try();
            }).to.throw("Cannot add other alternatives without at least one schema");
        });

        it("validates deep alternatives", () => {

            const schema = model.alternatives().try(model.boolean(), model.object({
                p: model.alternatives().try(model.boolean(), model.string().valid("foo", "bar"))
            }));
            Helper.validate(schema, [
                [{ p: 1 }, false, null, {
                    message: '"value" must be a boolean, child "p" fails because ["p" must be a boolean, "p" must be a string]',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"p" must be a boolean',
                            path: ["p"],
                            type: "boolean.base",
                            context: { label: "p", key: "p" }
                        },
                        {
                            message: '"p" must be a string',
                            path: ["p"],
                            type: "string.base",
                            context: { value: 1, label: "p", key: "p" }
                        }
                    ]
                }],
                [{ p: "..." }, false, null, {
                    message: '"value" must be a boolean, child "p" fails because ["p" must be a boolean, "p" must be one of [foo, bar]]',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"p" must be a boolean',
                            path: ["p"],
                            type: "boolean.base",
                            context: { label: "p", key: "p" }
                        },
                        {
                            message: '"p" must be one of [foo, bar]',
                            path: ["p"],
                            type: "any.allowOnly",
                            context: { value: "...", valids: ["foo", "bar"], label: "p", key: "p" }
                        }
                    ]
                }],
                [1, false, null, {
                    message: '"value" must be a boolean, "value" must be an object',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"value" must be an object',
                            path: [],
                            type: "object.base",
                            context: { label: "value", key: undefined }
                        }
                    ]
                }]
            ]);
        });

        it("validates deep alternatives (with wrapArrays false)", () => {

            const schema = model.alternatives().try(model.boolean(), model.object({
                p: model.alternatives().try(model.boolean(), model.string().valid("foo", "bar"))
            })).options({ language: { messages: { wrapArrays: false } } });
            Helper.validate(schema, [
                [{ p: 1 }, false, null, {
                    message: '"value" must be a boolean, child "p" fails because "p" must be a boolean, "p" must be a string',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"p" must be a boolean',
                            path: ["p"],
                            type: "boolean.base",
                            context: { label: "p", key: "p" }
                        },
                        {
                            message: '"p" must be a string',
                            path: ["p"],
                            type: "string.base",
                            context: { value: 1, label: "p", key: "p" }
                        }
                    ]
                }],
                [{ p: "..." }, false, null, {
                    message: '"value" must be a boolean, child "p" fails because "p" must be a boolean, "p" must be one of foo, bar',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"p" must be a boolean',
                            path: ["p"],
                            type: "boolean.base",
                            context: { label: "p", key: "p" }
                        },
                        {
                            message: '"p" must be one of foo, bar',
                            path: ["p"],
                            type: "any.allowOnly",
                            context: { value: "...", valids: ["foo", "bar"], label: "p", key: "p" }
                        }
                    ]
                }],
                [1, false, null, {
                    message: '"value" must be a boolean, "value" must be an object',
                    details: [
                        {
                            message: '"value" must be a boolean',
                            path: [],
                            type: "boolean.base",
                            context: { label: "value", key: undefined }
                        },
                        {
                            message: '"value" must be an object',
                            path: [],
                            type: "object.base",
                            context: { label: "value", key: undefined }
                        }
                    ]
                }]
            ]);
        });

        it("validates deep alternatives (with custom error)", () => {

            const schema = model.alternatives().try(model.boolean(), model.object({
                p: model.number()
            })).error(new Error("oops"));
            assert.instanceOf(schema.validate({ p: "a" }).error, Error, "oops");
        });
    });

    describe("when()", () => {

        it("throws on invalid ref (not string)", () => {

            expect(() => {

                model.alternatives().when(5, { is: 6, then: model.number() });
            }).to.throw("Invalid condition: 5");
        });

        describe("with ref", () => {

            it("validates conditional alternatives", () => {

                const schema = {
                    a: model.alternatives()
                        .when("b", { is: 5, then: "x", otherwise: "y" })
                        .try("z"),
                    b: model.any()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5 }, true],
                    [{ a: "x", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: ["y"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 6 }, true],
                    [{ a: "z", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "z", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["y"], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates conditional alternatives (empty key)", () => {

                const schema = {
                    a: model.alternatives()
                        .when("", { is: 5, then: "x", otherwise: "y" })
                        .try("z"),
                    "": model.any()
                };

                Helper.validate(schema, [
                    [{ a: "x", "": 5 }, true],
                    [{ a: "x", "": 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: ["y"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", "": 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", "": 6 }, true],
                    [{ a: "z", "": 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "z", "": 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["y"], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates only then", () => {

                const schema = {
                    a: model.alternatives()
                        .when(model.ref("b"), { is: 5, then: "x" })
                        .try("z"),
                    b: model.any()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5 }, true],
                    [{ a: "x", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [z]]',
                        details: [{
                            message: '"a" must be one of [z]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: ["z"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [z]]',
                        details: [{
                            message: '"a" must be one of [z]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["z"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "z", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "z", b: 6 }, true]
                ]);
            });

            it("validates only otherwise", () => {

                const schema = {
                    a: model.alternatives()
                        .when("b", { is: 5, otherwise: "y" })
                        .try("z"),
                    b: model.any()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [z]]',
                        details: [{
                            message: '"a" must be one of [z]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: ["z"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "x", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: ["y"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [z]]',
                        details: [{
                            message: '"a" must be one of [z]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["z"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 6 }, true],
                    [{ a: "z", b: 5 }, true],
                    [{ a: "z", b: 6 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [y]]',
                        details: [{
                            message: '"a" must be one of [y]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "z", valids: ["y"], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it('validates "then" when a preceding "when" has only "otherwise"', () => {

                const schema = model.object({
                    a: model.number(),
                    b: model.number(),
                    c: model.number()
                        .when("a", { is: 1, otherwise: model.number().min(1) })
                        .when("b", { is: 1, then: model.number().min(1) })
                });

                Helper.validate(schema, [
                    [{ a: 1, b: 1, c: 0 }, false, null, {
                        message: 'child "c" fails because ["c" must be larger than or equal to 1]',
                        details: [{
                            message: '"c" must be larger than or equal to 1',
                            path: ["c"],
                            type: "number.min",
                            context: { limit: 1, value: 0, label: "c", key: "c" }
                        }]
                    }],
                    [{ a: 1, b: 1, c: 1 }, true],
                    [{ a: 0, b: 1, c: 1 }, true],
                    [{ a: 1, b: 0, c: 0 }, true]
                ]);
            });

            it("validates when is is null", () => {

                const schema = {
                    a: model.alternatives().when("b", { is: null, then: "x", otherwise: model.number() }),
                    b: model.any()
                };

                Helper.validate(schema, [
                    [{ a: 1 }, true],
                    [{ a: "y" }, false, null, {
                        message: 'child "a" fails because ["a" must be a number]',
                        details: [{
                            message: '"a" must be a number',
                            path: ["a"],
                            type: "number.base",
                            context: { label: "a", key: "a", value: "y" }
                        }]
                    }],
                    [{ a: "x", b: null }, true],
                    [{ a: "y", b: null }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: 1, b: null }, false, null, {
                        message: 'child "a" fails because ["a" must be a string]',
                        details: [{
                            message: '"a" must be a string',
                            path: ["a"],
                            type: "string.base",
                            context: { value: 1, label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates when is has ref", () => {

                const schema = {
                    a: model.alternatives().when("b", { is: model.ref("c"), then: "x" }),
                    b: model.any(),
                    c: model.number()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5, c: "5" }, true],
                    [{ a: "x", b: 5, c: "1" }, false, null, {
                        message: 'child "a" fails because ["a" not matching any of the allowed alternatives]',
                        details: [{
                            message: '"a" not matching any of the allowed alternatives',
                            path: ["a"],
                            type: "alternatives.base",
                            context: { label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "x", b: "5", c: "5" }, false, null, {
                        message: 'child "a" fails because ["a" not matching any of the allowed alternatives]',
                        details: [{
                            message: '"a" not matching any of the allowed alternatives',
                            path: ["a"],
                            type: "alternatives.base",
                            context: { label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: 5, c: 5 }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates when is has ref pointing to a complex type", () => {
                const date = new Date(42);

                const schema = {
                    a: model.alternatives().when("b", { is: model.ref("c"), then: "x" }),
                    b: model.date(),
                    c: model.date()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: date, c: date }, true],
                    [{ a: "x", b: date, c: Date.now() }, false, null, {
                        message: 'child "a" fails because ["a" not matching any of the allowed alternatives]',
                        details: [{
                            message: '"a" not matching any of the allowed alternatives',
                            path: ["a"],
                            type: "alternatives.base",
                            context: { label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y", b: date, c: date }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: "y" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [x]]',
                        details: [{
                            message: '"a" must be one of [x]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "y", valids: ["x"], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates when then has ref", () => {
                const ref = model.ref("c");
                const schema = {
                    a: model.alternatives().when("b", { is: 5, then: ref }),
                    b: model.any(),
                    c: model.number()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5, c: "1" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [ref:c]]',
                        details: [{
                            message: '"a" must be one of [ref:c]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: [ref], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: 1, b: 5, c: "1" }, true],
                    [{ a: "1", b: 5, c: "1" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [ref:c]]',
                        details: [{
                            message: '"a" must be one of [ref:c]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "1", valids: [ref], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates when otherwise has ref", () => {

                const ref = model.ref("c");
                const schema = {
                    a: model.alternatives().when("b", { is: 6, otherwise: ref }),
                    b: model.any(),
                    c: model.number()
                };

                Helper.validate(schema, [
                    [{ a: "x", b: 5, c: "1" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [ref:c]]',
                        details: [{
                            message: '"a" must be one of [ref:c]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "x", valids: [ref], label: "a", key: "a" }
                        }]
                    }],
                    [{ a: 1, b: 5, c: "1" }, true],
                    [{ a: "1", b: 5, c: "1" }, false, null, {
                        message: 'child "a" fails because ["a" must be one of [ref:c]]',
                        details: [{
                            message: '"a" must be one of [ref:c]',
                            path: ["a"],
                            type: "any.allowOnly",
                            context: { value: "1", valids: [ref], label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates when empty value", () => {

                const schema = {
                    a: model.alternatives().when("b", { is: true, then: model.required() }),
                    b: model.boolean().default(false)
                };

                Helper.validate(schema, [
                    [{ b: false }, true],
                    [{ b: true }, true] // true because required() only applies to the one alternative
                ]);
            });

            it("validates when missing value", () => {

                const schema = model.object({
                    a: model.alternatives().when("b", {
                        is: 5,
                        then: model.optional(),
                        otherwise: model.required()
                    }).required(),
                    b: model.number()
                });

                Helper.validate(schema, [
                    [{ a: 1 }, true],
                    [{}, false, null, {
                        message: 'child "a" fails because ["a" is required]',
                        details: [{
                            message: '"a" is required',
                            path: ["a"],
                            type: "any.required",
                            context: { label: "a", key: "a" }
                        }]
                    }],
                    [{ b: 1 }, false, null, {
                        message: 'child "a" fails because ["a" is required]',
                        details: [{
                            message: '"a" is required',
                            path: ["a"],
                            type: "any.required",
                            context: { label: "a", key: "a" }
                        }]
                    }],
                    [{ a: 1, b: 1 }, true],
                    [{ a: 1, b: 5 }, true],
                    [{ b: 5 }, false, null, {
                        message: 'child "a" fails because ["a" is required]',
                        details: [{
                            message: '"a" is required',
                            path: ["a"],
                            type: "any.required",
                            context: { label: "a", key: "a" }
                        }]
                    }]
                ]);
            });

            it("validates with nested whens", () => {

                // If ((b === 0 && a === 123) ||
                //     (b !== 0 && a === anything))
                // then c === 456
                // else c === 789
                const schema = model.object({
                    a: model.number().required(),
                    b: model.number().required(),
                    c: model.when("a", {
                        is: model.when("b", {
                            is: model.valid(0),
                            then: model.valid(123)
                        }),
                        then: model.valid(456),
                        otherwise: model.valid(789)
                    })
                });

                Helper.validate(schema, [
                    [{ a: 123, b: 0, c: 456 }, true],
                    [{ a: 0, b: 1, c: 456 }, true],
                    [{ a: 0, b: 0, c: 789 }, true],
                    [{ a: 123, b: 456, c: 456 }, true],
                    [{ a: 0, b: 0, c: 456 }, false, null, {
                        message: 'child "c" fails because ["c" must be one of [789]]',
                        details: [{
                            message: '"c" must be one of [789]',
                            path: ["c"],
                            type: "any.allowOnly",
                            context: { value: 456, valids: [789], label: "c", key: "c" }
                        }]
                    }],
                    [{ a: 123, b: 456, c: 789 }, false, null, {
                        message: 'child "c" fails because ["c" must be one of [456]]',
                        details: [{
                            message: '"c" must be one of [456]',
                            path: ["c"],
                            type: "any.allowOnly",
                            context: { value: 789, valids: [456], label: "c", key: "c" }
                        }]
                    }]
                ]);
            });
        });

        describe("with schema", () => {

            it("should peek inside a simple value", () => {

                const schema = model.number().when(model.number().min(0), { then: model.number().min(10) });
                Helper.validate(schema, [
                    [-1, true, null, -1],
                    [1, false, null, {
                        message: '"value" must be larger than or equal to 10',
                        details: [{
                            message: '"value" must be larger than or equal to 10',
                            path: [],
                            type: "number.min",
                            context: { limit: 10, value: 1, key: undefined, label: "value" }
                        }]
                    }],
                    [10, true, null, 10]
                ]);
            });

            it("should peek inside an object", () => {

                const schema = model.object().keys({
                    foo: model.string(),
                    bar: model.number()
                }).when(model.object().keys({
                    foo: model.only("hasBar").required()
                }).unknown(), {
                    then: model.object().keys({
                        bar: model.required()
                    })
                });
                Helper.validate(schema, [
                    [{ foo: "whatever" }, true, null, { foo: "whatever" }],
                    [{ foo: "hasBar" }, false, null, {
                        message: 'child "bar" fails because ["bar" is required]',
                        details: [{
                            message: '"bar" is required',
                            path: ["bar"],
                            type: "any.required",
                            context: { key: "bar", label: "bar" }
                        }]
                    }],
                    [{ foo: "hasBar", bar: 42 }, true, null, { foo: "hasBar", bar: 42 }],
                    [{}, true, null, {}]
                ]);
            });
        });
    });

    describe("describe()", () => {

        it("describes when", () => {

            const schema = {
                a: model.alternatives()
                    .when("b", { is: 5, then: "x", otherwise: "y" })
                    .try("z"),
                b: model.any()
            };

            const outcome = {
                type: "object",
                children: {
                    b: {
                        type: "any"
                    },
                    a: {
                        type: "alternatives",
                        alternatives: [
                            {
                                ref: "ref:b",
                                is: {
                                    type: "number",
                                    flags: {
                                        allowOnly: true,
                                        presence: "required"
                                    },
                                    valids: [5],
                                    invalids: [Infinity, -Infinity]
                                },
                                then: {
                                    type: "string",
                                    flags: {
                                        allowOnly: true
                                    },
                                    valids: ["x"],
                                    invalids: [""]
                                },
                                otherwise: {
                                    type: "string",
                                    flags: {
                                        allowOnly: true
                                    },
                                    valids: ["y"],
                                    invalids: [""]
                                }
                            },
                            {
                                type: "string",
                                flags: {
                                    allowOnly: true
                                },
                                valids: ["z"],
                                invalids: [""]
                            }
                        ]
                    }
                }
            };

            expect(model.describe(schema)).to.eql(outcome);
        });

        it("describes when (only then)", () => {

            const schema = {
                a: model.alternatives()
                    .when("b", { is: 5, then: "x" })
                    .try("z"),
                b: model.any()
            };

            const outcome = {
                type: "object",
                children: {
                    b: {
                        type: "any"
                    },
                    a: {
                        type: "alternatives",
                        alternatives: [
                            {
                                ref: "ref:b",
                                is: {
                                    type: "number",
                                    flags: {
                                        allowOnly: true,
                                        presence: "required"
                                    },
                                    valids: [5],
                                    invalids: [Infinity, -Infinity]
                                },
                                then: {
                                    type: "string",
                                    flags: {
                                        allowOnly: true
                                    },
                                    valids: ["x"],
                                    invalids: [""]
                                }
                            },
                            {
                                type: "string",
                                flags: {
                                    allowOnly: true
                                },
                                valids: ["z"],
                                invalids: [""]
                            }
                        ]
                    }
                }
            };

            expect(model.describe(schema)).to.eql(outcome);
        });

        it("describes when (only otherwise)", () => {

            const schema = {
                a: model.alternatives()
                    .when("b", { is: 5, otherwise: "y" })
                    .try("z"),
                b: model.any()
            };

            const outcome = {
                type: "object",
                children: {
                    b: {
                        type: "any"
                    },
                    a: {
                        type: "alternatives",
                        alternatives: [
                            {
                                ref: "ref:b",
                                is: {
                                    type: "number",
                                    flags: {
                                        allowOnly: true,
                                        presence: "required"
                                    },
                                    valids: [5],
                                    invalids: [Infinity, -Infinity]
                                },
                                otherwise: {
                                    type: "string",
                                    flags: {
                                        allowOnly: true
                                    },
                                    valids: ["y"],
                                    invalids: [""]
                                }
                            },
                            {
                                type: "string",
                                flags: {
                                    allowOnly: true
                                },
                                valids: ["z"],
                                invalids: [""]
                            }
                        ]
                    }
                }
            };

            expect(model.describe(schema)).to.eql(outcome);
        });

        it("describes when (with schema)", () => {

            const schema = model.alternatives()
                .when(model.string().label("foo"), {
                    then: model.string().required().min(1),
                    otherwise: model.boolean()
                });

            const outcome = {
                type: "alternatives",
                alternatives: [{
                    peek: {
                        type: "string",
                        flags: {},
                        label: "foo",
                        invalids: [""]
                    },
                    then: {
                        type: "string",
                        flags: { presence: "required" },
                        invalids: [""],
                        rules: [{ arg: 1, name: "min" }]
                    },
                    otherwise: {
                        type: "boolean",
                        flags: { insensitive: true },
                        truthy: [true],
                        falsy: [false]
                    }
                }]
            };

            expect(model.describe(schema)).to.eql(outcome);
        });

        it("describes inherited fields (from any)", () => {

            const schema = model.alternatives()
                .try("a")
                .description("d")
                .example("a")
                .meta("b")
                .meta("c")
                .notes("f")
                .tags("g");

            const outcome = {
                type: "alternatives",
                description: "d",
                notes: ["f"],
                tags: ["g"],
                meta: ["b", "c"],
                examples: ["a"],
                alternatives: [{
                    type: "string",
                    flags: {
                        allowOnly: true
                    },
                    valids: ["a"],
                    invalids: [""]
                }]
            };

            expect(model.describe(schema)).to.eql(outcome);
        });
    });
});
