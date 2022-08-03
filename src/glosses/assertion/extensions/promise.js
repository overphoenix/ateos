/* eslint-disable ateos/no-undefined-comp */
/* eslint-disable ateos/no-typeof */
let checkError = require("check-error");

const ext = (lib, util) => {
  const { assert, Assertion } = lib;
  const { proxify } = util;

  // If we are using a version of Chai that has checkError on it,
  // we want to use that version to be consistent. Otherwise, we use
  // what was passed to the factory.
  if (util.checkError) {
    checkError = util.checkError;
  }

  // eslint-disable-next-line func-style
  function isLegacyJQueryPromise(thenable) {
    // jQuery promises are Promises/A+-compatible since 3.0.0. jQuery 3.0.0 is also the first version
    // to define the catch method.
    return typeof thenable.catch !== "function" &&
            typeof thenable.always === "function" &&
            typeof thenable.done === "function" &&
            typeof thenable.fail === "function" &&
            typeof thenable.pipe === "function" &&
            typeof thenable.progress === "function" &&
            typeof thenable.state === "function";
  }

  // eslint-disable-next-line func-style
  function assertIsAboutPromise(assertion) {
    if (typeof assertion._obj.then !== "function") {
      throw new TypeError(`${util.inspect(assertion._obj)} is not a thenable.`);
    }
    if (isLegacyJQueryPromise(assertion._obj)) {
      throw new TypeError("Chai as Promised is incompatible with thenables of jQuery<3.0.0, sorry! Please " +
                "upgrade jQuery or use another Promises/A+ compatible library (see " +
                "http://promisesaplus.com/).");
    }
  }

  // eslint-disable-next-line func-style
  function proxifyIfSupported(assertion) {
    return proxify === undefined ? assertion : proxify(assertion);
  }

  // eslint-disable-next-line func-style
  function method(name, asserter) {
    util.addMethod(Assertion.prototype, name, function () {
      assertIsAboutPromise(this);
      return asserter.apply(this, arguments);
    });
  }

  // eslint-disable-next-line func-style
  function property(name, asserter) {
    util.addProperty(Assertion.prototype, name, function () {
      assertIsAboutPromise(this);
      return proxifyIfSupported(asserter.apply(this, arguments));
    });
  }

  // eslint-disable-next-line func-style
  function doNotify(promise, done) {
    promise.then(() => done(), done);
  }

  // These are for clarity and to bypass Chai refusing to allow `undefined` as actual when used with `assert`.
  // eslint-disable-next-line func-style
  function assertIfNegated(assertion, message, extra) {
    assertion.assert(true, null, message, extra.expected, extra.actual);
  }

  // eslint-disable-next-line func-style
  function assertIfNotNegated(assertion, message, extra) {
    assertion.assert(false, message, null, extra.expected, extra.actual);
  }

  // eslint-disable-next-line func-style
  function getBasePromise(assertion) {
    // We need to chain subsequent asserters on top of ones in the chain already (consider
    // `eventually.have.property("foo").that.equals("bar")`), only running them after the existing ones pass.
    // So the first base-promise is `assertion._obj`, but after that we use the assertions themselves, i.e.
    // previously derived promises, to chain off of.
    return typeof assertion.then === "function" ? assertion : assertion._obj;
  }

  // eslint-disable-next-line func-style
  function getReasonName(reason) {
    return reason instanceof Error ? reason.toString() : checkError.getConstructorName(reason);
  }

  // Grab these first, before we modify `Assertion.prototype`.

  const propertyNames = Object.getOwnPropertyNames(Assertion.prototype);

  const propertyDescs = {};
  for (const name of propertyNames) {
    propertyDescs[name] = Object.getOwnPropertyDescriptor(Assertion.prototype, name);
  }

  property("fulfilled", function () {
    const derivedPromise = getBasePromise(this).then(
      (value) => {
        assertIfNegated(this,
          "expected promise not to be fulfilled but it was fulfilled with #{act}",
          { actual: value });
        return value;
      },
      (reason) => {
        assertIfNotNegated(this,
          "expected promise to be fulfilled but it was rejected with #{act}",
          { actual: getReasonName(reason) });
        return reason;
      }
    );

    ext.transferPromiseness(this, derivedPromise);
    return this;
  });

  property("rejected", function () {
    const derivedPromise = getBasePromise(this).then(
      (value) => {
        assertIfNotNegated(this,
          "expected promise to be rejected but it was fulfilled with #{act}",
          { actual: value });
        return value;
      },
      (reason) => {
        assertIfNegated(this,
          "expected promise not to be rejected but it was rejected with #{act}",
          { actual: getReasonName(reason) });

        // Return the reason, transforming this into a fulfillment, to allow further assertions, e.g.
        // `promise.should.be.rejected.and.eventually.equal("reason")`.
        return reason;
      }
    );

    ext.transferPromiseness(this, derivedPromise);
    return this;
  });

  method("rejectedWith", function (errorLike, errMsgMatcher, message) {
    let errorLikeName = null;
    const negate = util.flag(this, "negate") || false;

    // rejectedWith with that is called without arguments is
    // the same as a plain ".rejected" use.
    if (errorLike === undefined && errMsgMatcher === undefined &&
            message === undefined) {
      /* eslint-disable no-unused-expressions */
      return this.rejected;
      /* eslint-enable no-unused-expressions */
    }

    if (message !== undefined) {
      util.flag(this, "message", message);
    }

    if (errorLike instanceof RegExp || typeof errorLike === "string") {
      errMsgMatcher = errorLike;
      errorLike = null;
    } else if (errorLike && errorLike instanceof Error) {
      errorLikeName = errorLike.toString();
    } else if (typeof errorLike === "function") {
      errorLikeName = checkError.getConstructorName(errorLike);
    } else {
      errorLike = null;
    }
    const everyArgIsDefined = Boolean(errorLike && errMsgMatcher);

    let matcherRelation = "including";
    if (errMsgMatcher instanceof RegExp) {
      matcherRelation = "matching";
    }

    const derivedPromise = getBasePromise(this).then(
      (value) => {
        let assertionMessage = null;
        let expected = null;

        if (errorLike) {
          assertionMessage = "expected promise to be rejected with #{exp} but it was fulfilled with #{act}";
          expected = errorLikeName;
        } else if (errMsgMatcher) {
          assertionMessage = `expected promise to be rejected with an error ${matcherRelation} #{exp} but ` +
                        "it was fulfilled with #{act}";
          expected = errMsgMatcher;
        }

        assertIfNotNegated(this, assertionMessage, { expected, actual: value });
        return value;
      },
      (reason) => {
        const errorLikeCompatible = errorLike && (errorLike instanceof Error ?
          checkError.compatibleInstance(reason, errorLike) :
          checkError.compatibleConstructor(reason, errorLike));

        const errMsgMatcherCompatible = errMsgMatcher && checkError.compatibleMessage(reason, errMsgMatcher);

        const reasonName = getReasonName(reason);

        if (negate && everyArgIsDefined) {
          if (errorLikeCompatible && errMsgMatcherCompatible) {
            this.assert(true,
              null,
              "expected promise not to be rejected with #{exp} but it was rejected " +
                            "with #{act}",
              errorLikeName,
              reasonName);
          }
        } else {
          if (errorLike) {
            this.assert(errorLikeCompatible,
              "expected promise to be rejected with #{exp} but it was rejected with #{act}",
              "expected promise not to be rejected with #{exp} but it was rejected " +
                            "with #{act}",
              errorLikeName,
              reasonName);
          }

          if (errMsgMatcher) {
            this.assert(errMsgMatcherCompatible,
              `expected promise to be rejected with an error ${matcherRelation} #{exp} but got ` +
                            "#{act}",
              `expected promise not to be rejected with an error ${matcherRelation} #{exp}`,
              errMsgMatcher,
              checkError.getMessage(reason));
          }
        }

        return reason;
      }
    );

    ext.transferPromiseness(this, derivedPromise);
    return this;
  });

  property("eventually", function () {
    util.flag(this, "eventually", true);
    return this;
  });

  method("notify", function (done) {
    doNotify(getBasePromise(this), done);
    return this;
  });

  method("become", function (value, message) {
    return this.eventually.deep.equal(value, message);
  });

  // ### `eventually`

  // We need to be careful not to trigger any getters, thus `Object.getOwnPropertyDescriptor` usage.
  const methodNames = propertyNames.filter((name) => {
    return name !== "assert" && typeof propertyDescs[name].value === "function";
  });

  methodNames.forEach((methodName) => {
    Assertion.overwriteMethod(methodName, (originalMethod) => function () {
      return doAsserterAsyncAndAddThen(originalMethod, this, arguments);
    });
  });

  const getterNames = propertyNames.filter((name) => {
    return name !== "_obj" && typeof propertyDescs[name].get === "function";
  });

  getterNames.forEach((getterName) => {
    // Chainable methods are things like `an`, which can work both for `.should.be.an.instanceOf` and as
    // `should.be.an("object")`. We need to handle those specially.
    const isChainableMethod = Assertion.prototype.__methods.hasOwnProperty(getterName);

    if (isChainableMethod) {
      Assertion.overwriteChainableMethod(
        getterName,
        (originalMethod) => function () {
          return doAsserterAsyncAndAddThen(originalMethod, this, arguments);
        },
        (originalGetter) => function () {
          return doAsserterAsyncAndAddThen(originalGetter, this);
        }
      );
    } else {
      Assertion.overwriteProperty(getterName, (originalGetter) => function () {
        return proxifyIfSupported(doAsserterAsyncAndAddThen(originalGetter, this));
      });
    }
  });

  // eslint-disable-next-line func-style
  function doAsserterAsyncAndAddThen(asserter, assertion, args) {
    // Since we're intercepting all methods/properties, we need to just pass through if they don't want
    // `eventually`, or if we've already fulfilled the promise (see below).
    if (!util.flag(assertion, "eventually")) {
      asserter.apply(assertion, args);
      return assertion;
    }

    const derivedPromise = getBasePromise(assertion).then((value) => {
      // Set up the environment for the asserter to actually run: `_obj` should be the fulfillment value, and
      // now that we have the value, we're no longer in "eventually" mode, so we won't run any of this code,
      // just the base Chai code that we get to via the short-circuit above.
      assertion._obj = value;
      util.flag(assertion, "eventually", false);

      return args ? ext.transformAsserterArgs(args) : args;
    }).then((newArgs) => {
      asserter.apply(assertion, newArgs);

      // Because asserters, for example `property`, can change the value of `_obj` (i.e. change the "object"
      // flag), we need to communicate this value change to subsequent chained asserters. Since we build a
      // promise chain paralleling the asserter chain, we can use it to communicate such changes.
      return assertion._obj;
    });

    ext.transferPromiseness(assertion, derivedPromise);
    return assertion;
  }

  // ### Now use the `Assertion` framework to build an `assert` interface.
  const originalAssertMethods = Object.getOwnPropertyNames(assert).filter((propName) => {
    return typeof assert[propName] === "function";
  });

  assert.isFulfilled = (promise, message) => (new Assertion(promise, message)).to.be.fulfilled;

  assert.isRejected = (promise, errorLike, errMsgMatcher, message) => {
    const assertion = new Assertion(promise, message);
    return assertion.to.be.rejectedWith(errorLike, errMsgMatcher, message);
  };

  assert.becomes = (promise, value, message) => assert.eventually.deepEqual(promise, value, message);

  assert.doesNotBecome = (promise, value, message) => assert.eventually.notDeepEqual(promise, value, message);

  assert.eventually = {};
  originalAssertMethods.forEach((assertMethodName) => {
    assert.eventually[assertMethodName] = function (promise) {
      const otherArgs = Array.prototype.slice.call(arguments, 1);

      let customRejectionHandler;
      const message = arguments[assert[assertMethodName].length - 1];
      if (typeof message === "string") {
        customRejectionHandler = (reason) => {
          throw new lib.AssertionError(`${message}\n\nOriginal reason: ${util.inspect(reason)}`);
        };
      }

      const returnedPromise = promise.then(
        (fulfillmentValue) => assert[assertMethodName].apply(assert, [fulfillmentValue].concat(otherArgs)),
        customRejectionHandler
      );

      returnedPromise.notify = (done) => {
        doNotify(returnedPromise, done);
      };

      return returnedPromise;
    };
  });
};

ext.transferPromiseness = (assertion, promise) => {
  assertion.then = promise.then.bind(promise);
};

ext.transformAsserterArgs = (values) => values;

export default ext;
