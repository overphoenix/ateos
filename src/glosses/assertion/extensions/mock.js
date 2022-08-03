/* eslint-disable ateos/no-typeof */

export default function (lib, util) {
  const { Assertion } = lib;

  const isSpy = (putativeSpy) => typeof putativeSpy === "function" &&
        typeof putativeSpy.getCall === "function" &&
        typeof putativeSpy.calledWithExactly === "function";

  const timesInWords = (count) => {
    switch (count) {
      case 1: {
        return "once";
      }
      case 2: {
        return "twice";
      }
      case 3: {
        return "thrice";
      }
      default: {
        return `${count || 0} times`;
      }
    }
  };

  const isCall = (s) => s && isSpy(s.proxy);

  const assertCanWorkWith = (assertion) => {
    if (!isSpy(assertion._obj) && !isCall(assertion._obj)) {
      throw new TypeError(`${util.inspect(assertion._obj)} is not a spy or a call to a spy!`);
    }
  };

  const getMessages = (spy, action, nonNegatedSuffix, always, args = []) => {
    const verbPhrase = always ? "always have " : "have ";
    nonNegatedSuffix = nonNegatedSuffix || "";
    if (isSpy(spy.proxy)) {
      spy = spy.proxy;
    }

    const printfArray = (array) => spy.printf(...array);

    return {
      affirmative() {
        return printfArray([
          `expected %n to ${verbPhrase}${action}${nonNegatedSuffix}`,
          ...args
        ]);
      },
      negative() {
        return printfArray([
          `expected %n to not ${verbPhrase}${action}`,
          ...args
        ]);
      }
    };
  };

  const mockProperty = (name, action, nonNegatedSuffix) => {
    util.addProperty(Assertion.prototype, name, function () {
      assertCanWorkWith(this);

      const messages = getMessages(this._obj, action, nonNegatedSuffix, false);
      this.assert(this._obj[name], messages.affirmative, messages.negative);
    });
  };

  const mockPropertyAsBooleanMethod = (name, action, nonNegatedSuffix) => {
    util.addMethod(Assertion.prototype, name, function (arg) {
      assertCanWorkWith(this);

      const messages = getMessages(
        this._obj,
        action,
        nonNegatedSuffix,
        false,
        [timesInWords(arg)]
      );
      this.assert(this._obj[name] === arg, messages.affirmative, messages.negative);
    });
  };

  const createMockMethodHandler = (mockName, action, nonNegatedSuffix) => function (...args) {
    assertCanWorkWith(this);

    const alwaysMockMethod = `always${mockName[0].toUpperCase()}${mockName.substring(1)}`;
    const shouldBeAlways = util.flag(this, "always") && typeof this._obj[alwaysMockMethod] === "function";
    const mockMethodName = shouldBeAlways ? alwaysMockMethod : mockName;

    const messages = getMessages(this._obj, action, nonNegatedSuffix, shouldBeAlways, args);
    this.assert(
      this._obj[mockMethodName](...args),
      messages.affirmative,
      messages.negative
    );
  };

  const mockMethodAsProperty = (name, action, nonNegatedSuffix) => {
    const handler = createMockMethodHandler(name, action, nonNegatedSuffix);
    util.addProperty(Assertion.prototype, name, handler);
  };

  const exceptionalMockMethod = (chaiName, mockName, action, nonNegatedSuffix) => {
    const handler = createMockMethodHandler(mockName, action, nonNegatedSuffix);
    util.addMethod(Assertion.prototype, chaiName, handler);
  };

  const mockMethod = (name, action, nonNegatedSuffix) => {
    exceptionalMockMethod(name, name, action, nonNegatedSuffix);
  };

  util.addProperty(Assertion.prototype, "always", function () {
    util.flag(this, "always", true);
  });

  mockProperty("called", "been called", " at least once, but it was never called");
  mockPropertyAsBooleanMethod("callCount", "been called exactly %1", ", but it was called %c%C");
  mockProperty("calledOnce", "been called exactly once", ", but it was called %c%C");
  mockProperty("calledTwice", "been called exactly twice", ", but it was called %c%C");
  mockProperty("calledThrice", "been called exactly thrice", ", but it was called %c%C");
  mockMethodAsProperty("calledWithNew", "been called with new");
  mockMethod("calledBefore", "been called before %1");
  mockMethod("calledAfter", "been called after %1");
  mockMethod("calledImmediatelyBefore", "been called immediately before %1");
  mockMethod("calledImmediatelyAfter", "been called immediately after %1");
  mockMethod("calledOn", "been called with %1 as this", ", but it was called with %t instead");
  mockMethod("calledWith", "been called with arguments %*", "%D");
  mockMethod("calledOnceWith", "been called exactly once with arguments %*", "%D");
  mockMethod("calledWithExactly", "been called with exact arguments %*", "%D");
  mockMethod("calledOnceWithExactly", "been called exactly once with exact arguments %*", "%D");
  mockMethod("calledWithMatch", "been called with arguments matching %*", "%D");
  mockMethod("returned", "returned %1");
  exceptionalMockMethod("thrown", "threw", "thrown %1");
}
