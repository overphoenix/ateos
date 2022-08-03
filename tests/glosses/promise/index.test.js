describe("promise", () => {
    const { promise, error } = ateos;

    describe("defer", () => {
        it("should have a promise", () => {
            const defer = promise.defer();
            expect(defer.promise).to.be.instanceOf(Promise);
        });

        it("should have a resolve function", () => {
            const defer = promise.defer();
            expect(defer.resolve).to.be.a("function");
        });

        it("should have a reject function", () => {
            const defer = promise.defer();
            expect(defer.reject).to.be.a("function");
        });

        it("should resolve the promise", async () => {
            const defer = promise.defer();
            defer.resolve(5);
            expect(await defer.promise).to.be.equal(5);
        });

        it("should reject the promise", async () => {
            const defer = promise.defer();
            defer.reject(10);
            expect(await defer.promise.then(() => null, (x) => x)).to.be.equal(10);
        });
    });

    describe("delay", () => {
        it("should be a promise", () => {
            expect(promise.delay(100)).to.be.instanceOf(Promise);
        });

        it("should be delayed", async () => {
            const past = new Date();
            await promise.delay(100);
            expect(new Date() - past).to.be.at.least(95); // v8, wtf?
        });

        it("should be resolves with a value", async () => {
            expect(await promise.delay(50, 10)).to.be.equal(10);
        });
    });

    describe("timeout", () => {
        it("should throw if the first argument is not a promise", () => {
            expect(() => {
                promise.timeout(5);
            }).to.throw(ateos.error.InvalidArgumentException, "The first argument must be a promise");
        });

        it("should reject the promise after the dalay", async () => {
            const p = promise.delay(500);
            const q = promise.timeout(p, 200);
            const res = await q.then(() => null, (x) => x);
            expect(res).to.be.instanceOf(ateos.error.TimeoutException);
            expect(res.message).to.be.equal("Timeout of 200ms exceeded");
        });

        it("should not reject the promise if it resolves", async () => {
            const p = promise.delay(10, 10);
            expect(await promise.timeout(p, 100)).to.be.equal(10);
        });

        it("should be rejeted by itself", async () => {
            const p = promise.delay(10).then(() => {
                throw new Error("hello");
            });
            const q = await promise.timeout(p, 100).then(() => null, (x) => x);
            expect(q).to.be.instanceOf(Error);
            expect(q.message).to.be.equal("hello");
        });

        it("should work for synchronous code", async () => {
            const q = await promise.timeout(new Promise((resolve) => {
                const t = new Date();
                process.nextTick(() => {
                    while (new Date() - t < 200) {
                        //
                    }
                    resolve();
                });
            }), 100).then(() => null, (x) => x);
            expect(q).to.be.instanceOf(ateos.error.TimeoutException);
            expect(q.message).to.be.equal("Timeout of 100ms exceeded");
        });

        it("should be rejected by timeout even if rejects by itself synchronously", async () => {
            const q = await promise.timeout(new Promise((resolve, reject) => {
                const t = new Date();
                process.nextTick(() => {
                    while (new Date() - t < 200) {
                        //
                    }
                    reject(new Error("hello"));
                });
            }), 100).then(() => null, (x) => x);
            expect(q).to.be.instanceOf(ateos.error.TimeoutException);
            expect(q.message).to.be.equal("Timeout of 100ms exceeded");
            expect(q.original).to.be.instanceOf(Error);
            expect(q.original.message).to.be.equal("hello");
        });
    });

    describe("nodeify", () => {
        it("should pass the value as the second argument", (done) => {
            promise.nodeify(Promise.resolve(10), (err, value) => {
                expect(value).to.be.equal(10);
                done();
            });
        });

        it("should pass null as the first argument if there is no error", (done) => {
            promise.nodeify(Promise.resolve(), (err) => {
                expect(err).to.be.null();
                done();
            });
        });

        it("should pass the error as the first argument", (done) => {
            promise.nodeify(Promise.reject(10), (err) => {
                expect(err).to.be.equal(10);
                done();
            });
        });

        it("should not pass the second argument if there is an error", (done) => {
            promise.nodeify(Promise.reject(10), (...args) => {
                expect(args).to.have.lengthOf(1);
                done();
            });
        });

        it("should return the passed promise", async () => {
            const p = Promise.resolve(10);
            expect(promise.nodeify(p, ateos.noop)).to.be.equal(p);
        });

        it("should throw if the first argument is not a promise", () => {
            expect(() => {
                promise.nodeify();
            }).to.throw(ateos.error.InvalidArgumentException, "The first argument must be a promise");
        });

        it("should return the promise if the second argument is not a function", () => {
            const p = Promise.resolve();
            expect(promise.nodeify(p)).to.be.equal(p);
        });
    });

    describe("callbackify", () => {
        const { callbackify } = promise;

        it("should convert an async function to a callback-based function", async () => {
            const fn = async (a, b) => {
                return a + b;
            };
            const fn2 = callbackify(fn);
            const [err, res] = await new Promise((resolve) => {
                fn2(1, 2, (err, result) => {
                    resolve([err, result]);
                });
            });
            expect(err).to.be.null();
            expect(res).to.be.equal(3);
        });

        it("should correctly handle errors", async () => {
            const fn = async (a, b) => {
                throw new Error(`hello ${a} + ${b}`);
            };
            const fn2 = callbackify(fn);
            const [err, res] = await new Promise((resolve) => {
                fn2(1, 2, (err, result) => {
                    resolve([err, result]);
                });
            });
            expect(err).to.be.an("error");
            expect(err.message).to.be.equal("hello 1 + 2");
            expect(res).to.be.undefined();
        });

        it("should not pop the last argument if it is not a callback", async () => {
            const fn = async (a, b) => {
                return a + b;
            };
            const fn2 = callbackify(fn);
            const res = await fn2(1, 2);
            expect(res).to.be.equal(3);
        });
    });

    describe("promisify", () => {
        it("should turn a callback-based function into an async function", async () => {
            const getSecrets = (cb) => {
                cb(null, 123);
            };
            const getSecretsAsync = promise.promisify(getSecrets);
            expect(getSecretsAsync).to.be.a("function");
            expect(await getSecretsAsync()).to.be.equal(123);
        });

        it("should throw if the first argument of the callback truthy", async () => {
            const getSecrets = (cb) => {
                cb(1);
            };
            const f = promise.promisify(getSecrets);
            expect(await f().then(() => null, (x) => x)).to.be.equal(1);
        });

        it("should correctly handle synchronous errors", async () => {
            const getSecrets = () => {
                throw new Error("Nooo");
            };
            const f = promise.promisify(getSecrets);
            const err = await f().then(() => null, (x) => x);
            expect(err).to.be.instanceOf(Error);
            expect(err.message).to.be.equal("Nooo");
        });

        it("should pass arguments", async () => {
            const getSecrets = (a, b, cb) => {
                cb(null, a + b);
            };
            const f = promise.promisify(getSecrets);
            expect(await f(1, 2)).to.be.equal(3);
        });

        it("should pass the context", async () => {
            const getSecrets = function (cb) {
                cb(null, this.a + this.b);
            };
            const f = promise.promisify(getSecrets);
            expect(await f.call({ a: 1, b: 2 })).to.be.equal(3);
        });

        it("should throw if the first argument is not a function", () => {
            expect(() => {
                promise.promisify();
            }).to.throw(ateos.error.InvalidArgumentException, "The first argument must be a function");
        });

        it("should use a custom context", async () => {
            const f = function (cb) {
                cb(null, this.a + this.b);
            };

            const ctx = { a: 1, b: 1 };

            const g = promise.promisify(f, { context: { a: 2, b: 2 } });

            expect(await g.call(ctx)).to.be.equal(4);
        });

        describe("multiArgs", () => {
            it("normal", async () => {
                const fn = (cb) => setImmediate(() => cb(null, "a", "b"));
                assert.deepEqual(await promise.promisify(fn, { multiArgs: true })(), ["a", "b"]);
            });

            it("rejection", async () => {
                const fixture1 = (cb) => setImmediate(() => cb("e", "a", "b"));
                assert.deepEqual(await promise.promisify(fixture1, { multiArgs: true })().catch((error) => error), ["e", "a", "b"]);
            });
        });
    });

    describe("promisifyAll", () => {
        it("should promisify nested functions", async () => {
            const a = {
                f: (cb) => cb(null, 1),
                b: (cb) => cb(null, 2)
            };
            const b = promise.promisifyAll(a);
            expect(await b.fAsync()).to.be.equal(1);
            expect(await b.bAsync()).to.be.equal(2);
        });

        it("should not modify the prev functions", () => {
            const a = {
                f: (cb) => cb(null, 1),
                b: (cb) => cb(null, 2)
            };
            const b = promise.promisifyAll(a);
            expect(b.f).to.be.equal(a.f);
            expect(b.b).to.be.equal(a.b);
        });

        it("should wrap the source object", () => {
            const a = {
                f: (cb) => cb(null, 1),
                b: (cb) => cb(null, 2)
            };
            const b = promise.promisifyAll(a);
            expect(a).not.to.be.equal(b);
            a.new = 1;
            expect(b.new).to.be.equal(1);
            b.new = 2;
            expect(a.new).to.be.equal(1);
        });

        it("should change the suffix", async () => {
            const a = {
                f: (cb) => cb(null, 1),
                b: (cb) => cb(null, 2)
            };
            const b = promise.promisifyAll(a, { suffix: "_" });
            expect(await b.f_()).to.be.equal(1);
            expect(await b.b_()).to.be.equal(2);
        });

        it("should touch only functions", () => {
            const a = {
                s: "123",
                f: (cb) => cb(null, 1)
            };
            const b = promise.promisifyAll(a);
            expect(b).to.have.property("fAsync");
            expect(b).not.to.have.property("sAsync");
        });

        it("should filter properties", () => {
            const a = {
                f: (cb) => cb(null, 1),
                b: (cb) => cb(null, 2)
            };
            const b = promise.promisifyAll(a, {
                filter: (key) => key !== "b"
            });
            expect(b).to.have.property("fAsync");
            expect(b).not.to.have.property("bAsync");
        });

        it("should use a custom context", async () => {
            const a = {
                a: 1,
                b: 2,
                f(cb) {
                    cb(null, this.a + this.b);
                },
                g(cb) {
                    cb(null, this.b);
                }
            };
            const b = promise.promisifyAll(a, { context: { a: 2, b: 3 } });
            expect(await b.fAsync()).to.be.equal(5);
            expect(await b.gAsync()).to.be.equal(3);
        });
    });

    describe("finally", () => {
        const fixture = Symbol("fixture");
        const fixtureErr = new Error("err");

        it("does nothing when nothing is passed", async () => {
            assert.equal(await promise.finally(Promise.resolve(fixture)), fixture);
        });

        it("callback is called when promise is fulfilled", async () => {
            let called = false;

            const val = await promise.finally(Promise.resolve(fixture), () => {
                called = true;
            });

            assert.equal(val, fixture);
            assert.isTrue(called);
        });

        it("callback is called when promise is rejected", async () => {
            let called = false;

            await promise.finally(Promise.reject(fixtureErr), () => {
                called = true;
            }).catch((err) => {
                assert.equal(err, fixtureErr);
            });

            assert.isTrue(called);
        });

        it("returning a rejected promise in the callback rejects the promise", async () => {
            await promise.finally(Promise.resolve(fixture), () => Promise.reject(fixtureErr)).then(() => {
                assert.fail();
            }, (err) => {
                assert.equal(err, fixtureErr);
            });
        });

        it("returning a rejected promise in the callback for an already rejected promise changes the rejection reason", async () => {
            await promise.finally(Promise.reject(new Error("orig err")), () => Promise.reject(fixtureErr)).catch((err) => {
                assert.equal(err, fixtureErr);
            });
        });
    });

    describe("retry", () => {
        const { retry } = promise;
        let soRejected;
        let soResolved;

        beforeEach(() => {
            soRejected = Math.random().toString();
            soResolved = Math.random().toString();
        });

        it("should reject immediately if max is 1 (using options)", async () => {
            const callback = stub();
            callback.resolves(soResolved);
            callback.onCall(0).rejects(new Error(soRejected));
            await assert.throws(async () => {
                await retry(callback, { max: 1, backoffBase: 0 });
            }, soRejected);
            expect(callback.callCount).to.equal(1);
        });

        it("should reject immediately if max is 1 (using integer)", async () => {
            const callback = stub();
            callback.resolves(soResolved);
            callback.onCall(0).rejects(new Error(soRejected));
            await assert.throws(async () => {
                await retry(callback, 1);
            }, soRejected);
            expect(callback.callCount).to.equal(1);
        });

        it("should reject after all tries if still rejected", async () => {
            const callback = stub();
            callback.rejects(new Error(soRejected));
            await assert.throws(async () => {
                await retry(callback, { max: 3, backoffBase: 0 });
            }, soRejected);
            expect(callback.firstCall.args).to.deep.equal([{ current: 1 }]);
            expect(callback.secondCall.args).to.deep.equal([{ current: 2 }]);
            expect(callback.thirdCall.args).to.deep.equal([{ current: 3 }]);
            expect(callback.callCount).to.equal(3);
        });

        it("should resolve immediately if resolved on first try", async () => {
            const callback = stub();
            callback.resolves(soResolved);
            callback.onCall(0).resolves(soResolved);
            expect(await retry(callback, { max: 10, backoffBase: 0 })).to.be.equal(soResolved);
        });

        it("should resolve if resolved before hitting max", async () => {
            const callback = stub();
            callback.rejects(new Error(soRejected));
            callback.onCall(3).resolves(soResolved);
            expect(await retry(callback, { max: 10, backoffBase: 0 })).to.be.equal(soResolved);
            expect(callback.firstCall.args).to.deep.equal([{ current: 1 }]);
            expect(callback.secondCall.args).to.deep.equal([{ current: 2 }]);
            expect(callback.thirdCall.args).to.deep.equal([{ current: 3 }]);
            expect(callback.callCount).to.equal(4);
        });

        describe("timeout", () => {
            it("should throw if reject on first attempt", async () => {
                await assert.throws(async () => {
                    await retry(() => promise.delay(1000), {
                        max: 1,
                        backoffBase: 0,
                        timeout: 1000
                    });
                }, error.TimeoutException);
            });

            it("should throw if reject on last attempt", async () => {
                let count = 0;
                await assert.throws(async () => {
                    await retry(() => {
                        count++;
                        if (count === 3) {
                            return promise.delay(3500);
                        }
                        return Promise.reject(new Error());
                    }, {
                        max: 3,
                        backoffBase: 0,
                        timeout: 1500
                    });
                }, error.TimeoutException);
                expect(count).to.equal(3);
            });
        });

        describe("match", () => {
            it("should continue retry while error is equal to match string", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                callback.onCall(3).resolves(soResolved);
                expect(await retry(callback, { max: 15, backoffBase: 0, match: `Error: ${soRejected}` })).to.be.equal(soResolved);
                expect(callback.callCount).to.equal(4);
            });

            it("should reject immediately if error is not equal to match string", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                await assert.throws(async () => {
                    await retry(callback, { max: 15, backoffBase: 0, match: "A custom error string" });
                }, soRejected);
                expect(callback.callCount).to.equal(1);
            });

            it("should continue retry while error is instanceof match", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                callback.onCall(4).resolves(soResolved);

                expect(await retry(callback, { max: 15, backoffBase: 0, match: Error })).to.be.equal(soResolved);
                expect(callback.callCount).to.equal(5);
            });

            it("should reject immediately if error is not instanceof match", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                await assert.throws(async () => {
                    await retry(callback, { max: 15, backoffBase: 0, match() { } });
                }, Error);
                expect(callback.callCount).to.equal(1);
            });

            it("should continue retry while error is equal to match string in array", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                callback.onCall(4).resolves(soResolved);
                expect(await retry(callback, { max: 15, backoffBase: 0, match: [`Error: ${soRejected + 1}`, `Error: ${soRejected}`] })).to.be.equal(soResolved);
                expect(callback.callCount).to.equal(5);
            });

            it("should reject immediately if error is not equal to match string in array", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                await assert.throws(async () => {
                    await retry(callback, { max: 15, backoffBase: 0, match: [`Error: ${soRejected + 1}`, `Error: ${soRejected + 2}`] });
                }, Error);
                expect(callback.callCount).to.equal(1);
            });

            it("should reject immediately if error is not instanceof match in array", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                await assert.throws(async () => {
                    await retry(callback, { max: 15, backoffBase: 0, match: [`Error: ${soRejected + 1}`, function foo() { }] });
                }, Error);
                expect(callback.callCount).to.equal(1);
            });

            it("should continue retry while error is instanceof match in array", async () => {
                const callback = stub();
                callback.rejects(new Error(soRejected));
                callback.onCall(4).resolves(soResolved);
                expect(await retry(callback, { max: 15, backoffBase: 0, match: [`Error: ${soRejected + 1}`, Error] })).to.be.equal(soResolved);
                expect(callback.callCount).to.equal(5);
            });
        });

        describe("backoff", () => {
            it("should resolve after 5 retries and an eventual delay over 1800ms using default backoff", async () => {
                const startTime = ateos.datetime();
                const callback = stub();
                callback.rejects(new Error(soRejected));
                callback.onCall(5).resolves(soResolved);
                expect(await retry(callback, { max: 15 })).to.be.equal(soResolved);
                expect(ateos.datetime().diff(startTime)).to.be.above(1800);
                expect(ateos.datetime().diff(startTime)).to.be.below(3400);
            });

            it("should resolve after 1 retry and initial delay equal to the backoffBase", async () => {
                const initialDelay = 100;
                const callback = stub();
                const startTime = ateos.datetime();
                callback.onCall(0).rejects(new Error(soRejected));
                callback.onCall(1).resolves(soResolved);
                expect(await retry(callback, { max: 2, backoffBase: initialDelay, backoffExponent: 3 })).to.be.equal(soResolved);
                expect(callback.callCount).to.equal(2);
                expect(ateos.datetime().diff(startTime)).to.be.within(initialDelay, initialDelay + 50); // allow for some overhead
            });

            it("should throw TimeoutError and cancel backoff delay if timeout is reached", async () => {
                await assert.throws(async () => {
                    await retry(() => {
                        return promise.delay(2000);
                    }, {
                        max: 3,
                        timeout: 1000
                    });
                }, error.TimeoutException);
            });
        });
    });

    describe("props", () => {
        const { props } = promise;

        it("should return a promise that is fulfilled when all the values are fulfilled", async () => {
            const obj = await props({
                a: Promise.resolve(1),
                b: Promise.resolve(2)
            });

            expect(obj.a).to.be.equal(1);
            expect(obj.b).to.be.equal(2);
        });

        it("should return a new object", async () => {
            const obj = {
                a: Promise.resolve(1),
                b: Promise.resolve(2)
            };
            const obj2 = await props(obj);
            expect(obj2).not.to.be.equal(obj);
            expect(obj.a).to.be.a("promise");
            expect(obj.b).to.be.a("promise");
        });

        it("should throw if something goes wrong", async () => {
            const obj = {
                a: Promise.resolve(1),
                b: Promise.reject(new Error("oops"))
            };

            await assert.throws(async () => {
                await props(obj);
            }, "oops");
        });
    });


    describe("try", () => {
        const fixture = Symbol("fixture");
        const fixtureError = new Error("fixture");

        it("main", async () => {
            assert.equal(await promise.try(() => fixture), fixture);

            await assert.throws(async () => promise.try(() => Promise.reject(fixtureError)), fixtureError.message);

            await assert.throws(async () => promise.try(() => {
                throw fixtureError;
            }), fixtureError.message);
        });

        it("allows passing arguments through", async () => {
            assert.equal(await promise.try((argument) => argument, fixture), fixture);
        });
    });
});
