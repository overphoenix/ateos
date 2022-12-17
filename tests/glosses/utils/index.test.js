describe("util", () => {
  const { util, is, error } = ateos;

  describe("Function", () => {
    describe("identity", () => {
      it("should return the first argument", () => {
        expect(ateos.identity(1, 2, 3)).to.be.equal(1);
      });
    });

    describe("noop", () => {
      it("should return nothing", () => {
        expect(ateos.noop(1, 2, 3)).to.be.undefined();
      });
    });
  });

  describe("enumerate()", () => {
    it("should count every item", () => {
      const s = [1, 2, 3, 4, 5];
      let i = 0;
      for (const [idx, t] of util.enumerate(s)) {
        expect(idx).to.be.equal(i++);
        expect(t).to.be.equal(i);
      }
    });

    it("should set the start index", () => {
      const s = "12345";
      let i = 5;
      let j = 1;
      for (const [idx, t] of util.enumerate(s, 5)) {
        expect(idx).to.be.equal(i++);
        expect(t).to.be.equal(`${j++}`);
      }
    });
  });

  describe("toDotNotation()", () => {
    it("should transform an object to the dot-noation", () => {
      expect(util.toDotNotation({
        a: 1,
        b: 2,
        c: { d: 4, e: { f: 5 } }
      })).to.be.deep.equal({
        a: 1,
        b: 2,
        "c.d": 4,
        "c.e.f": 5
      });
      expect(util.toDotNotation({
        a: [1, 2, 3],
        b: {
          "a b c": {
            g: 6,
            y: [4, 5, 6]
          }
        }
      })).to.be.deep.equal({
        "a[0]": 1,
        "a[1]": 2,
        "a[2]": 3,
        "b[\"a b c\"].g": 6,
        "b[\"a b c\"].y[0]": 4,
        "b[\"a b c\"].y[1]": 5,
        "b[\"a b c\"].y[2]": 6
      });
    });
  });

  describe("flatten", () => {
    it("should be the same", () => {
      const array = [1, 2, 3, 4, 5];
      expect(util.flatten(array)).to.be.deep.equal(array);
    });

    it("should work with kdim dim array", () => {
      const result = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (const i of [
        [1, 2, [3, 4, 5], [6, 7, 8], 9],
        [[[[[[[[[[[[[1]]]]]]]]]]]], [[2]], [3, [4, [5, 6, [7, [[[8]]], 9]]]]],
        [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]],
        [[[[[[[[[1], 2], 3], 4], 5], 6], 7], 8], 9],
        [[1], [2], [3], [4], [5], [6], [7], [8], [9]]
      ]) {
        expect(ateos.util.flatten(i, { depth: Infinity })).to.be.deep.equal(result);
      }
    });

    it("should stop flattening if the depth is 0", () => {
      const array = [1, [2, [3, [4, 5]]]];
      expect(ateos.util.flatten(array, { depth: 2 })).to.be.deep.equal([1, 2, 3, [4, 5]]);
    });

    it("should set the depth = Infinity by default", () => {
      const array = [1, [2, [3, [4, 5]]]];
      expect(ateos.util.flatten(array)).to.be.deep.equal([1, 2, 3, 4, 5]);
    });
  });

  describe("asyncWaterfall", () => {
    it("basics", (done) => {
      const callOrder = [];

      util.asyncWaterfall([
        function (callback) {
          callOrder.push("fn1");
          setTimeout(() => {
            callback(null, "one", "two");
          }, 0);
        },
        function (arg1, arg2, callback) {
          callOrder.push("fn2");
          expect(arg1).to.equal("one");
          expect(arg2).to.equal("two");
          setTimeout(() => {
            callback(null, arg1, arg2, "three");
          }, 25);
        },
        function (arg1, arg2, arg3, callback) {
          callOrder.push("fn3");
          expect(arg1).to.equal("one");
          expect(arg2).to.equal("two");
          expect(arg3).to.equal("three");
          callback(null, "four");
        },
        function (arg4, callback) {
          callOrder.push("fn4");
          expect(callOrder).to.eql(["fn1", "fn2", "fn3", "fn4"]);
          callback(null, "test");
        }
      ], (err) => {
        expect(ateos.isNull(err), `${err} passed instead of 'null'`);
        done();
      });
    });

    it("empty array", (done) => {
      util.asyncWaterfall([], (err) => {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it("non-array", (done) => {
      util.asyncWaterfall({}, (err) => {
        expect(err.message).to.equal("First argument to waterfall must be an array of functions");
        done();
      });
    });

    it("no callback", (done) => {
      util.asyncWaterfall([
        function (callback) {
          callback();
        },
        function (callback) {
          callback(); done();
        }
      ]);
    });

    it("async", (done) => {
      const callOrder = [];

      util.asyncWaterfall([
        function (callback) {
          callOrder.push(1);
          callback();
          callOrder.push(2);
        },
        function (callback) {
          callOrder.push(3);
          callback();
        },
        function () {
          expect(callOrder).to.eql([1, 3]);
          done();
        }
      ]);
    });

    it("error", (done) => {
      util.asyncWaterfall([
        function (callback) {
          callback("error");
        },
        function (callback) {
          assert(false, "next function should not be called");
          callback();
        }
      ], (err) => {
        expect(err).to.equal("error");
        done();
      });
    });

    it("multiple callback calls", () => {
      const arr = [
        function (callback) {
          // call the callback twice. this should call function 2 twice
          callback(null, "one", "two");
          callback(null, "one", "two");
        },
        function (arg1, arg2, callback) {
          callback(null, arg1, arg2, "three");
        }
      ];
      expect(() => {
        util.asyncWaterfall(arr, ateos.noop);
      }).to.throw(/already called/);
    });

    it("call in another context", (done) => {
      const vm = require("vm");
      const sandbox = { done, util };

      const fn = `(${(function () {
        util.asyncWaterfall([function (callback) {
          callback();
        }], (err) => {
          if (err) {
            return done(err);
          }
          done();
        });
      }).toString()}())`;

      vm.runInNewContext(fn, sandbox);
    });

    it("should not use unnecessary deferrals", (done) => {
      let sameStack = true;

      util.asyncWaterfall([
        function (cb) {
          cb(null, 1);
        },
        function (arg, cb) {
          cb();
        }
      ], () => {
        expect(sameStack).to.equal(true);
        done();
      });

      sameStack = false;
    });
  });

  describe("once", () => {
    const { once } = util;

    it("should call only once", () => {
      const fn = spy();
      const w = once(fn);
      w();
      w();
      w();
      expect(fn).to.have.been.calledOnce();
    });

    it("should pass arguments", () => {
      const fn = spy();
      const w = once(fn);
      w(1, 2, 3);
      expect(fn).to.be.calledWith(1, 2, 3);
    });

    it("should pass the context", () => {
      const fn = spy();
      const w = once(fn);
      const ctx = { a: 1, b: 2, c: 3, w };
      ctx.w(1, 2, 3);
      expect(fn.thisValues[0]).to.be.equal(ctx);
    });
  });

  describe("zip", () => {
    const { zip } = util;
    const { collection } = ateos;

    it("should be a generator", () => {
      expect(is.generator(zip)).to.be.true();
    });

    it("should zip 2 arrays", () => {
      const res = [...zip([1, 2, 3], [4, 5, 6])];
      expect(res).to.be.deep.equal([
        [1, 4],
        [2, 5],
        [3, 6]
      ]);
    });

    it("should zip many arrays", () => {
      const res = [...zip([1], [2], [3], [4], [5], [6])];
      expect(res).to.be.deep.equal([[1, 2, 3, 4, 5, 6]]);
    });

    it("should end when one of them ends", () => {
      const res = [...zip(
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2]
      )];
      expect(res).to.be.deep.equal([[1, 1, 1], [2, 2, 2]]);
    });

    it("should support any iterable object", () => {
      const list = new collection.LinkedList(3);
      list.push(1);
      list.push(2);
      list.push(3);
      const fib = function* () {
        let [a, b] = [0, 1];
        for (; ;) {
          yield a;
          [a, b] = [b, a + b];
        }
      };
      const res = [...zip(list, [4, 5, 6, 7, 8, 9], fib())];
      expect(res).to.be.deep.equal([[1, 4, 0], [2, 5, 1], [3, 6, 1]]);
    });

    it("should throw if non-iterable", () => {
      expect(() => {
        for (const i of zip({})) {  // eslint-disable-line

        }
      }).to.throw(error.InvalidArgumentException, "Only iterables are supported");
    });

    it("should correctly handle an empty array", () => {
      const res = [...zip([], [1, 2, 3])];
      expect(res).to.be.deep.equal([]);
    });

    it("should correctly handle empty arguments", () => {
      const res = [...zip()];
      expect(res).to.be.deep.equal([]);
    });

    it("should finish iterators", () => {
      class ISomething {
        constructor(val) {
          this.cursor = 0;
          this.val = val;
          this.ret = false;
        }

        next() {
          if (this.cursor === this.val.length) {
            return { done: true };
          }
          return { done: false, value: this.val[this.cursor++] };
        }

        return() {
          this.ret = true;
        }
      }

      class Something extends Array {
        constructor(val) {
          super(...val);
          this.iterators = [];
        }

        [Symbol.iterator]() {
          const it = new ISomething(this);
          this.iterators.push();
          return it;
        }
      }

      const smth = new Something([1, 2, 3, 4, 5]);

      const res = [...zip([1, 2, 3], smth, smth)];
      expect(res).to.be.deep.equal([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
      for (const it of smth.iterators) {
        expect(it.ret).to.be.true();
      }
    });
  });

  for (const name of ["range", "xrange"]) {
    const { [name]: range } = util;

    describe(name, () => {
      if (name === "xrange") {
        it("should be a generator", () => {
          expect(range(0, 10)).to.be.a("generator");
        });
      } else {
        it("should be an array", () => {
          expect(range(0, 10)).to.be.an("array");
        });
      }

      it("should return a range [start, stop)", () => {
        expect([...range(0, 10)]).to.be.deep.equal([
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ]);
        expect([...range(-10, 0)]).to.be.deep.equal([
          -10, -9, -8, -7, -6, -5, -4, -3, -2, -1
        ]);
      });

      it("should increment by 2", () => {
        expect([...range(0, 10, 2)]).to.be.deep.equal([
          0, 2, 4, 6, 8
        ]);
      });

      it("should decrement", () => {
        expect([...range(10, 0, -1)]).to.be.deep.equal([
          10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ]);
      });

      it("should set start = 0 if only one argument", () => {
        expect([...range(5)]).to.be.deep.equal([0, 1, 2, 3, 4]);
      });

      it("should be empty", () => {
        expect([...range(-5, -10)]).to.be.empty();
      });
    });
  }

  describe("reFindAll", () => {
    it("should find all matches", () => {
      const re = /(ab|cd|ef)/g;
      const s = "abcdef";
      const matches = util.reFindAll(re, s);
      expect(matches).to.be.an("array");
      expect(matches).to.have.lengthOf(3);
      expect(matches[0]).to.be.an("array");
      expect(matches[0][1]).to.be.equal("ab");
      expect(matches[1]).to.be.an("array");
      expect(matches[1][1]).to.be.equal("cd");
      expect(matches[2]).to.be.an("array");
      expect(matches[2][1]).to.be.equal("ef");
    });

    it("should return empty array if there is no matches", () => {
      const re = /(ab|cd|ef)/g;
      const s = "012345677";
      const matches = util.reFindAll(re, s);
      expect(matches).to.be.an("array");
      expect(matches).to.be.empty();
    });
  });

  describe("reinterval", () => {
    it("should work as an usual setInterval", () => {
      return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();

        util.reinterval(() => {
          if (Math.abs(new Date().getTime() - startTime - 1000) <= 10) {
            resolve();
          } else {
            reject(new Error("Took too much (or not enough) time"));
          }
        }, 1000);
      });
    });

    it("should be able to clear an Interval", () => {
      return new Promise((resolve, reject) => {
        const interval = util.reinterval(() => {
          reject(new Error("Interval not cleared"));
        }, 200);

        setTimeout(interval.clear, 100);

        setTimeout(resolve, 300);
      });
    });

    it("should be able to reschedule an Interval", () => {
      return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();

        const interval = util.reinterval(() => {
          if (Math.abs(new Date().getTime() - startTime - 800) <= 10) {
            resolve();
          } else {
            reject(new Error("Took too much (or not enough) time"));
          }
        }, 500);

        setTimeout(interval.reschedule, 300, [500]);
      });
    });
  });

  describe("pick", () => {
    const { pick } = util;

    it("should return a new object with only the given properties", () => {
      const a = { a: 1, b: 2, c: 3 };
      const b = pick(a, ["a", "b"]);
      expect(b).to.be.deep.equal({ a: 1, b: 2 });
    });

    it("should consider inherited properties", () => {
      const a = Object.create({ a: 1, b: 2, c: 3 });
      a.d = 4;
      const b = pick(a, ["a", "b", "d"]);
      expect(b).to.be.deep.equal({ a: 1, b: 2, d: 4 });
    });

    it("should not fail if the given property does not exist", () => {
      const a = { a: 1, b: 2, c: 3 };
      const b = pick(a, ["a", "b", "d"]);
      expect(b).to.be.deep.equal({ a: 1, b: 2 });
    });
  });

  describe("parseTime", () => {
    const { parseTime } = util;

    it("should return ms", () => {
      expect(parseTime("1 second")).to.be.equal(1000);
    });

    it("should the given number", () => {
      expect(parseTime(1000)).to.be.equal(1000);
    });

    it("should null if not a string given", () => {
      expect(parseTime({})).to.be.null();
    });

    it("should return null if format is invalid", () => {
      expect(parseTime("hehe")).to.be.null();
      expect(parseTime("10 hehe")).to.be.null();
    });

    it("should work with no spaces", () => {
      expect(parseTime("10minutes")).to.be.equal(10 * 60 * 1000);
    });
  });

  describe("buffer", () => {
    describe("toArrayBuffer", () => {
      const { toArrayBuffer } = util.buffer;

      it("should convert bufer to array buffer", () => {
        const buf = Buffer.from("hello");
        const arr = toArrayBuffer(buf);
        expect(arr).to.be.an("ArrayBuffer");
        const view = new Uint8Array(arr);
        expect([...view]).to.be.deep.equal([...buf]);
      });

      it("should copy it", () => {
        const buf = Buffer.from("hello");
        const arr = toArrayBuffer(buf);
        buf.writeUInt8(0, 0);
        const view = new Uint8Array(arr);
        expect(view[0]).not.to.be.equal(0);
      });
    });
  });
});
