const Helper = require("../helper");

const {
    model
} = ateos;

describe("date", () => {

    before(() => {

        // Mock Date.now so we don't have to deal with sub-second differences in the tests

        const original = Date.now;
        Date.now = function () {

            return 1485907200000; // Random date
        };
        Date.now.restore = function () {

            Date.now = original;
        };
    });

    after(() => {

        Date.now.restore();
    });

    it("can be called on its own", () => {

        const date = model.date;
        expect(() => date()).to.throw("Must be invoked on a Joi instance.");
    });

    it("should throw an exception if arguments were passed.", () => {

        expect(
            () => model.date("invalid argument.")
        ).to.throw("model.date() does not allow arguments.");
    });

    it("fails on boolean", () => {

        const schema = model.date();
        Helper.validate(schema, [
            [true, false, null, {
                message: '"value" must be a number of milliseconds or valid date string',
                details: [{
                    message: '"value" must be a number of milliseconds or valid date string',
                    path: [],
                    type: "date.base",
                    context: { label: "value", key: undefined }
                }]
            }],
            [false, false, null, {
                message: '"value" must be a number of milliseconds or valid date string',
                details: [{
                    message: '"value" must be a number of milliseconds or valid date string',
                    path: [],
                    type: "date.base",
                    context: { label: "value", key: undefined }
                }]
            }]
        ]);
    });

    it("fails on non-finite numbers", () => {

        const schema = model.date();
        Helper.validate(schema, [
            [Infinity, false, null, {
                message: '"value" must be a number of milliseconds or valid date string',
                details: [{
                    message: '"value" must be a number of milliseconds or valid date string',
                    path: [],
                    type: "date.base",
                    context: { label: "value", key: undefined }
                }]
            }],
            [-Infinity, false, null, {
                message: '"value" must be a number of milliseconds or valid date string',
                details: [{
                    message: '"value" must be a number of milliseconds or valid date string',
                    path: [],
                    type: "date.base",
                    context: { label: "value", key: undefined }
                }]
            }],
            [NaN, false, null, {
                message: '"value" must be a number of milliseconds or valid date string',
                details: [{
                    message: '"value" must be a number of milliseconds or valid date string',
                    path: [],
                    type: "date.base",
                    context: { label: "value", key: undefined }
                }]
            }]
        ]);
    });

    it("matches specific date", async () => {

        const now = Date.now();
        await model.date().valid(new Date(now)).validate(new Date(now));
    });

    it("errors on invalid input and convert disabled", async () => {
        const err = await assert.throws(async () => model.date().options({ convert: false }).validate("1-1-2013 UTC"));
        assert.instanceOf(err, Error, '"value" must be a valid date');
        expect(err.details).to.eql([{
            message: '"value" must be a valid date',
            path: [],
            type: "date.strict",
            context: { label: "value", key: undefined }
        }]);
    });

    it("validates date", async () => {
        await model.date().validate(new Date());
    });

    it("validates millisecond date as a string", async () => {
        const now = new Date();
        const mili = now.getTime();

        const value = await model.date().validate(mili.toString());
        expect(value).to.eql(now);
    });

    describe("validate()", () => {

        describe("min", () => {

            it("validates min", () => {

                const d = new Date("1-1-2000 UTC");
                const message = `"value" must be larger than or equal to "${d}"`;
                Helper.validate(model.date().min("1-1-2000 UTC"), [
                    ["1-1-2001 UTC", true],
                    ["1-1-2000 UTC", true],
                    [0, false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.min",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["0", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.min",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["-1", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.min",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["1-1-1999 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.min",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }]
                ]);
            });

            it('accepts "now" as the min date', async () => {
                const future = new Date(Date.now() + 1000000);
                const value = await model.date().min("now").validate(future);
                expect(value).to.eql(future);
            });

            it('errors if .min("now") is used with a past date', async () => {

                const now = Date.now();
                const dnow = new Date(now);
                const past = new Date(now - 1000000);

                const err = await assert.throws(async () => model.date().min("now").validate(past));
                const message = `"value" must be larger than or equal to "${dnow}"`;
                assert.instanceOf(err, Error, message);
                expect(err.details).to.eql([{
                    message: `"value" must be larger than or equal to "${dnow}"`,
                    path: [],
                    type: "date.min",
                    context: { limit: dnow, label: "value", key: undefined }
                }]);
            });

            it("accepts references as min date", () => {

                const ref = model.ref("a");
                const schema = model.object({ a: model.date(), b: model.date().min(ref) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ a: now, b: now }, true],
                    [{ a: now, b: now + 1e3 }, true],
                    [{ a: now, b: now - 1e3 }, false, null, {
                        message: `child "b" fails because ["b" must be larger than or equal to "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be larger than or equal to "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.min",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });

            it("accepts references as min date within a when", () => {

                const ref = model.ref("b");
                const schema = model.object({
                    a: model.date().required(),
                    b: model.date().required(),
                    c: model.number().required().when("a", {
                        is: model.date().min(ref), // a >= b
                        then: model.number().valid(0)
                    })
                });

                Helper.validate(schema, [
                    [{ a: 123, b: 123, c: 0 }, true],
                    [{ a: 123, b: 456, c: 42 }, true],
                    [{ a: 456, b: 123, c: 0 }, true],
                    [{ a: 123, b: 123, c: 42 }, false, null, {
                        message: 'child "c" fails because ["c" must be one of [0]]',
                        details: [{
                            message: '"c" must be one of [0]',
                            path: ["c"],
                            type: "any.allowOnly",
                            context: { value: 42, valids: [0], label: "c", key: "c" }
                        }]
                    }],
                    [{ a: 456, b: 123, c: 42 }, false, null, {
                        message: 'child "c" fails because ["c" must be one of [0]]',
                        details: [{
                            message: '"c" must be one of [0]',
                            path: ["c"],
                            type: "any.allowOnly",
                            context: { value: 42, valids: [0], label: "c", key: "c" }
                        }]
                    }]
                ]);
            });

            it("accepts context references as min date", () => {

                const ref = model.ref("$a");
                const schema = model.object({ b: model.date().min(ref) });
                const now = Date.now();
                const dnow = new Date(now);

                Helper.validate(schema, [
                    [{ b: now }, true, { context: { a: now } }],
                    [{ b: now + 1e3 }, true, { context: { a: now } }],
                    [{ b: now - 1e3 }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be larger than or equal to "${dnow}"]`,
                        details: [{
                            message: `"b" must be larger than or equal to "${dnow}"`,
                            path: ["b"],
                            type: "date.min",
                            context: { limit: dnow, label: "b", key: "b" }
                        }]
                    }]
                ]);
            });

            it("errors if reference is not a date", () => {

                const schema = model.object({ a: model.string(), b: model.date().min(model.ref("a")) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ a: "abc", b: now }, false, null, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ a: "123", b: now }, true],
                    [{ a: (now + 1e3).toString(), b: now }, false, null, {
                        message: `child "b" fails because ["b" must be larger than or equal to "${new Date(now + 1e3)}"]`,
                        details: [{
                            message: `"b" must be larger than or equal to "${new Date(now + 1e3)}"`,
                            path: ["b"],
                            type: "date.min",
                            context: { limit: new Date(now + 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });

            it("errors if context reference is not a date", () => {

                const schema = model.object({ b: model.date().min(model.ref("$a")) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: "abc" } }, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now }, false, { context: { a: (now + 1e3).toString() } }, {
                        message: `child "b" fails because ["b" must be larger than or equal to "${new Date(now + 1e3)}"]`,
                        details: [{
                            message: `"b" must be larger than or equal to "${new Date(now + 1e3)}"`,
                            path: ["b"],
                            type: "date.min",
                            context: { limit: new Date(now + 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
        });

        describe("max", () => {

            it("validates max", () => {

                const d = new Date("1-1-1970 UTC");
                const message = `"value" must be less than or equal to "${d}"`;
                Helper.validate(model.date().max("1-1-1970 UTC"), [
                    ["1-1-1971 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.max",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["1-1-1970 UTC", true],
                    [0, true],
                    [1, false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.max",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["0", true],
                    ["-1", true],
                    ["1-1-2014 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.max",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }]
                ]);
            });

            it('accepts "now" as the max date', async () => {
                const past = new Date(Date.now() - 1000000);
                const value = await model.date().max("now").validate(past);
                expect(value).to.equal(past);
            });

            it('errors if .max("now") is used with a future date', async () => {
                const now = Date.now();
                const dnow = new Date(now);
                const future = new Date(now + 1000000);

                const err = await assert.throws(async () => model.date().max("now").validate(future));
                const message = `"value" must be less than or equal to "${dnow}"`;
                assert.instanceOf(err, Error, message);
                expect(err.details).to.eql([{
                    message: `"value" must be less than or equal to "${dnow}"`,
                    path: [],
                    type: "date.max",
                    context: { limit: dnow, label: "value", key: undefined }
                }]);
            });

            it("accepts references as max date", () => {

                const ref = model.ref("a");
                const schema = model.object({ a: model.date(), b: model.date().max(ref) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ a: now, b: now }, true],
                    [{ a: now, b: now + 1e3 }, false, null, {
                        message: `child "b" fails because ["b" must be less than or equal to "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than or equal to "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.max",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ a: now, b: now - 1e3 }, true]
                ]);
            });

            it("accepts references as max date", () => {

                const schema = model.object({ b: model.date().max(model.ref("$a")) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ b: now }, true, { context: { a: now } }],
                    [{ b: now + 1e3 }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be less than or equal to "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than or equal to "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.max",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now - 1e3 }, true, { context: { a: now } }]
                ]);
            });

            it("errors if reference is not a date", () => {

                const schema = model.object({ a: model.string(), b: model.date().max(model.ref("a")) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ a: "abc", b: new Date() }, false, null, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ a: "100000000000000", b: now }, true],
                    [{ a: (now - 1e3).toString(), b: now }, false, null, {
                        message: `child "b" fails because ["b" must be less than or equal to "${new Date(now - 1e3)}"]`,
                        details: [{
                            message: `"b" must be less than or equal to "${new Date(now - 1e3)}"`,
                            path: ["b"],
                            type: "date.max",
                            context: { limit: new Date(now - 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });

            it("errors if context reference is not a date", () => {

                const schema = model.object({ b: model.date().max(model.ref("$a")) });
                const now = Date.now();

                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: "abc" } }, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now }, true, { context: { a: "100000000000000" } }],
                    [{ b: now }, false, { context: { a: (now - 1e3).toString() } }, {
                        message: `child "b" fails because ["b" must be less than or equal to "${new Date(now - 1e3)}"]`,
                        details: [{
                            message: `"b" must be less than or equal to "${new Date(now - 1e3)}"`,
                            path: ["b"],
                            type: "date.max",
                            context: { limit: new Date(now - 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
        });

        describe("greater", () => {
            it("validates greater", () => {
                const d = new Date("1-1-2000 UTC");
                const message = `"value" must be greater than "${d}"`;
                Helper.validate(model.date().greater("1-1-2000 UTC"), [
                    ["1-1-2001 UTC", true],
                    ["1-1-2000 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.greater",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    [0, false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.greater",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["0", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.greater",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["-1", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.greater",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["1-1-1999 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.greater",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }]
                ]);
            });
            it('accepts "now" as the greater date', async () => {
                const future = new Date(Date.now() + 1000000);
                const value = await model.date().greater("now").validate(future);
                expect(value).to.equal(future);
            });
            it('errors if .greater("now") is used with a past date', async () => {
                const now = Date.now();
                const dnow = new Date(now);
                const past = new Date(now - 1000000);
                const err = await assert.throws(async () => model.date().greater("now").validate(past));
                const message = `"value" must be greater than "${dnow}"`;
                assert.strictEqual(err.message, message);
                expect(err.details).to.eql([{
                    message: `"value" must be greater than "${dnow}"`,
                    path: [],
                    type: "date.greater",
                    context: { limit: dnow, label: "value", key: undefined }
                }]);
            });
            it("accepts references as greater date", () => {
                const ref = model.ref("a");
                const schema = model.object({ a: model.date(), b: model.date().greater(ref) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ a: now, b: now }, false, null, {
                        message: `child "b" fails because ["b" must be greater than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be greater than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ a: now, b: now + 1e3 }, true],
                    [{ a: now, b: now - 1e3 }, false, null, {
                        message: `child "b" fails because ["b" must be greater than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be greater than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
            it("accepts references as greater date within a when", () => {
                const ref = model.ref("b");
                const schema = model.object({
                    a: model.date().required(),
                    b: model.date().required(),
                    c: model.number().required().when("a", {
                        is: model.date().greater(ref), // a > b
                        then: model.number().valid(0)
                    })
                });
                Helper.validate(schema, [
                    [{ a: 123, b: 123, c: 0 }, true],
                    [{ a: 123, b: 456, c: 42 }, true],
                    [{ a: 456, b: 123, c: 0 }, true],
                    [{ a: 123, b: 123, c: 42 }, true],
                    [{ a: 456, b: 123, c: 42 }, false, null, {
                        message: 'child "c" fails because ["c" must be one of [0]]',
                        details: [{
                            message: '"c" must be one of [0]',
                            path: ["c"],
                            type: "any.allowOnly",
                            context: { value: 42, valids: [0], label: "c", key: "c" }
                        }]
                    }]
                ]);
            });
            it("accepts context references as greater date", () => {
                const ref = model.ref("$a");
                const schema = model.object({ b: model.date().greater(ref) });
                const now = Date.now();
                const dnow = new Date(now);
                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be greater than "${dnow}"]`,
                        details: [{
                            message: `"b" must be greater than "${dnow}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: dnow, label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now + 1e3 }, true, { context: { a: now } }],
                    [{ b: now - 1e3 }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be greater than "${dnow}"]`,
                        details: [{
                            message: `"b" must be greater than "${dnow}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: dnow, label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
            it("errors if reference is not a date", () => {
                const schema = model.object({ a: model.string(), b: model.date().greater(model.ref("a")) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ a: "abc", b: now }, false, null, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ a: "123", b: now }, true],
                    [{ a: (now + 1e3).toString(), b: now }, false, null, {
                        message: `child "b" fails because ["b" must be greater than "${new Date(now + 1e3)}"]`,
                        details: [{
                            message: `"b" must be greater than "${new Date(now + 1e3)}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: new Date(now + 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
            it("errors if context reference is not a date", () => {
                const schema = model.object({ b: model.date().greater(model.ref("$a")) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: "abc" } }, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now }, false, { context: { a: (now + 1e3).toString() } }, {
                        message: `child "b" fails because ["b" must be greater than "${new Date(now + 1e3)}"]`,
                        details: [{
                            message: `"b" must be greater than "${new Date(now + 1e3)}"`,
                            path: ["b"],
                            type: "date.greater",
                            context: { limit: new Date(now + 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
        });
        describe("less", () => {
            it("validates less", () => {
                const d = new Date("1-1-1970 UTC");
                const message = `"value" must be less than "${d}"`;
                Helper.validate(model.date().less("1-1-1970 UTC"), [
                    ["1-1-1971 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["1-1-1970 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    [0, false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    [1, false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["0", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }],
                    ["-1", true],
                    ["1-1-2014 UTC", false, null, {
                        message,
                        details: [{
                            message,
                            path: [],
                            type: "date.less",
                            context: { limit: d, label: "value", key: undefined }
                        }]
                    }]
                ]);
            });
            it('accepts "now" as the less date', async () => {
                const past = new Date(Date.now() - 1000000);
                const value = await model.date().less("now").validate(past);
                expect(value).to.equal(past);
            });
            it('errors if .less("now") is used with a future date', async () => {
                const now = Date.now();
                const dnow = new Date(now);
                const future = new Date(now + 1000000);
                const err = await assert.throws(async () => model.date().less("now").validate(future));
                const message = `"value" must be less than "${dnow}"`;
                assert.strictEqual(err.message, message);
                expect(err.details).to.eql([{
                    message: `"value" must be less than "${dnow}"`,
                    path: [],
                    type: "date.less",
                    context: { limit: dnow, label: "value", key: undefined }
                }]);
            });
            it("accepts references as less date", () => {
                const ref = model.ref("a");
                const schema = model.object({ a: model.date(), b: model.date().less(ref) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ a: now, b: now }, false, null, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ a: now, b: now + 1e3 }, false, null, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ a: now, b: now - 1e3 }, true]
                ]);
            });
            it("accepts references as less date", () => {
                const schema = model.object({ b: model.date().less(model.ref("$a")) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now + 1e3 }, false, { context: { a: now } }, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now), label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now - 1e3 }, true, { context: { a: now } }]
                ]);
            });
            it("errors if reference is not a date", () => {
                const schema = model.object({ a: model.string(), b: model.date().less(model.ref("a")) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ a: "abc", b: new Date() }, false, null, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ a: "100000000000000", b: now }, true],
                    [{ a: (now - 1e3).toString(), b: now }, false, null, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now - 1e3)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now - 1e3)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now - 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });

            it("errors if context reference is not a date", () => {
                const schema = model.object({ b: model.date().less(model.ref("$a")) });
                const now = Date.now();
                Helper.validate(schema, [
                    [{ b: now }, false, { context: { a: "abc" } }, {
                        message: 'child "b" fails because ["b" references "a" which is not a date]',
                        details: [{
                            message: '"b" references "a" which is not a date',
                            path: ["b"],
                            type: "date.ref",
                            context: { ref: "a", label: "b", key: "b" }
                        }]
                    }],
                    [{ b: now }, true, { context: { a: "100000000000000" } }],
                    [{ b: now }, false, { context: { a: (now - 1e3).toString() } }, {
                        message: `child "b" fails because ["b" must be less than "${new Date(now - 1e3)}"]`,
                        details: [{
                            message: `"b" must be less than "${new Date(now - 1e3)}"`,
                            path: ["b"],
                            type: "date.less",
                            context: { limit: new Date(now - 1e3), label: "b", key: "b" }
                        }]
                    }]
                ]);
            });
        });

        it("validates only valid dates", () => {

            Helper.validate(model.date(), [
                ["1-1-2013 UTC", true],
                [new Date().getTime(), true],
                [new Date().getTime().toFixed(4), true],
                ["not a valid date", false, null, {
                    message: '"value" must be a number of milliseconds or valid date string',
                    details: [{
                        message: '"value" must be a number of milliseconds or valid date string',
                        path: [],
                        type: "date.base",
                        context: { label: "value", key: undefined }
                    }]
                }],
                [new Date("not a valid date"), false, null, {
                    message: '"value" must be a number of milliseconds or valid date string',
                    details: [{
                        message: '"value" must be a number of milliseconds or valid date string',
                        path: [],
                        type: "date.base",
                        context: { label: "value", key: undefined }
                    }]
                }]
            ]);
        });

        describe("iso()", () => {

            it("avoids unnecessary cloning when called twice", () => {

                const schema = model.date().iso();
                expect(schema.iso()).to.equal(schema);
            });

            it("validates isoDate", () => {

                Helper.validate(model.date().iso(), [
                    ["+002013-06-07T14:21:46.295Z", true],
                    ["-002013-06-07T14:21:46.295Z", true],
                    ["002013-06-07T14:21:46.295Z", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["+2013-06-07T14:21:46.295Z", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["-2013-06-07T14:21:46.295Z", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21:46.295Z", true],
                    ["2013-06-07T14:21:46.295Z0", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21:46.295+07:00", true],
                    ["2013-06-07T14:21:46.295+07:000", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21:46.295-07:00", true],
                    ["2013-06-07T14:21:46Z", true],
                    ["2013-06-07T14:21:46Z0", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21:46+07:00", true],
                    ["2013-06-07T14:21:46-07:00", true],
                    ["2013-06-07T14:21Z", true],
                    ["2013-06-07T14:21+07:00", true],
                    ["2013-06-07T14:21+07:000", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21-07:00", true],
                    ["2013-06-07T14:21Z+7:00", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07", true],
                    ["2013-06-07T", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["2013-06-07T14:21", true],
                    ["1-1-2013", false, null, {
                        message: '"value" must be a valid ISO 8601 date',
                        details: [{
                            message: '"value" must be a valid ISO 8601 date',
                            path: [],
                            type: "date.isoDate",
                            context: { label: "value", key: undefined }
                        }]
                    }]
                ]);
            });

            it("converts expanded isoDates", async () => {

                const schema = { item: model.date().iso() };
                const value = await model.compile(schema).validate({ item: "-002013-06-07T14:21:46.295Z" });
                expect(value.item.toISOString()).to.be.equal("-002013-06-07T14:21:46.295Z");
            });

            it("validates isoDate with a friendly error message", async () => {

                const schema = { item: model.date().iso() };
                const err = await assert.throws(async () => model.compile(schema).validate({ item: "something" }));
                expect(err.message).to.equal('child "item" fails because ["item" must be a valid ISO 8601 date]');
                expect(err.details).to.eql([{
                    message: '"item" must be a valid ISO 8601 date',
                    path: ["item"],
                    type: "date.isoDate",
                    context: { label: "item", key: "item" }
                }]);
            });

            it("validates isoDate after clone", async () => {

                const schema = { item: model.date().iso().clone() };
                await model.compile(schema).validate({ item: "2013-06-07T14:21:46.295Z" });
            });
        });

        describe("timestamp()", () => {

            it("avoids unnecessary cloning when called twice", () => {

                const schema = model.date().timestamp("unix");
                expect(schema.timestamp("unix")).to.equal(schema);
            });

            it("fails on empty strings", () => {

                const schema = model.date().timestamp();
                Helper.validate(schema, [
                    ["", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { key: undefined, label: "value" }
                        }]
                    }],
                    [" \t ", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { key: undefined, label: "value" }
                        }]
                    }]
                ]);
            });

            it("validates javascript timestamp", async () => {

                const now = new Date();
                const milliseconds = now.getTime();

                const value = await model.date().timestamp().validate(milliseconds);
                expect(value).to.eql(now);

                const value2 = await model.date().timestamp("javascript").validate(milliseconds);
                expect(value2).to.eql(now);

                const value3 = await model.date().timestamp("unix").timestamp("javascript").validate(milliseconds);
                expect(value3).to.eql(now);
            });

            it("validates unix timestamp", async () => {

                const now = new Date();
                const seconds = now.getTime() / 1000;

                const value = await model.date().timestamp("unix").validate(seconds);
                expect(value).to.eql(now);

                const value2 = await model.date().timestamp().timestamp("unix").validate(seconds);
                expect(value2).to.eql(now);

                const value3 = await model.date().timestamp("javascript").timestamp("unix").validate(seconds);
                expect(value3).to.eql(now);
            });

            it("validates timestamps with decimals", () => {

                Helper.validate(model.date().timestamp(), [
                    [new Date().getTime().toFixed(4), true]
                ]);
                Helper.validate(model.date().timestamp("javascript"), [
                    [new Date().getTime().toFixed(4), true]
                ]);
                Helper.validate(model.date().timestamp("unix"), [
                    [(new Date().getTime() / 1000).toFixed(4), true]
                ]);
            });

            it("validates only valid timestamps and returns a friendly error message", () => {

                Helper.validate(model.date().timestamp(), [
                    [new Date().getTime(), true],
                    [new Date().getTime().toFixed(4), true],
                    ["1.452126061677e+12", true],
                    [1.452126061677e+12, true],
                    [1E3, true],
                    ["1E3", true],
                    [",", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["123A,0xA", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["1-1-2013 UTC", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    ["not a valid timestamp", false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { label: "value", key: undefined }
                        }]
                    }],
                    [new Date("not a valid date"), false, null, {
                        message: '"value" must be a valid timestamp or number of milliseconds',
                        details: [{
                            message: '"value" must be a valid timestamp or number of milliseconds',
                            path: [],
                            type: "date.timestamp.javascript",
                            context: { label: "value", key: undefined }
                        }]
                    }]
                ]);
            });

            it("fails with not allowed type", () => {

                expect(() => {

                    model.date().timestamp("not allowed");
                }).to.throw(Error, /"type" must be one of/);
            });
        });
    });
});
