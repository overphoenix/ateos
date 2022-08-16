const {
  is,
  netron: { AbstractPeer },
  error
} = ateos;

describe("AbstractPeer", () => {
  let peer;

  before(() => {
    // No need to set instance of the projected netron here
    peer = new AbstractPeer();
  });

  it("has instance of projected netron", () => {
    assert.exists(peer.netron);
  });

  it("should be an AsyncEventEmitter", () => {
    assert.isTrue(is.asyncEmitter(peer));
  });

  describe("public methods", () => {
    const methods = [
      "set",
      "get",
      "call",
      "callVoid",
      "runTask",
      "getTaskResult",
      "subscribe",
      "unsubscribe",
      "attachContext",
      "detachContext",
      "detachAllContexts",
      "hasContexts",
      "hasContext",
      "waitForContext",
      "queryInterface",
      "releaseInterface"
    ];

    for (const m of methods) {
      // eslint-disable-next-line
      it(`${m}()`, () => {
        assert.isTrue(ateos.isFunction(peer[m]));
      });
    }
  });

  describe("private methods", () => {
    const methods = [
      "_runTask",
      "_getContextDefinition",
      "_queryInterfaceByDefinition",
      "_addInterface",
      "_getInterface",
      "_deleteInterface",
      "_deleteAllInterfaces"
    ];

    for (const m of methods) {
      // eslint-disable-next-line
      it(`${m}()`, () => {
        assert.isTrue(ateos.isFunction(peer[m]));
      });
    }
  });

  describe("abstract methods", () => {
    const methods = [
      "subscribe",
      "unsubscribe",
      "attachContext",
      "detachContext",
      "detachAllContexts",
      "hasContexts",
      "hasContext",
      "set",
      "get",
      "_runTask",
      "_getContextDefinition",
      "_queryInterfaceByDefinition"
    ];

    for (const m of methods) {
      // eslint-disable-next-line
      it(`${m}()`, () => {
        assert.isTrue(ateos.isFunction(peer[m]));
        assert.throws(() => peer[m](), error.NotImplementedException);
      });
    }
  });
});
