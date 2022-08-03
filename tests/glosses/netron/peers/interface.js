import { A, B, commonTypes, CommonTypes, ObjectStorage, Document, DocumentTypes, Soul, Devil, BodyStatuses, Strong, CounterKeeper, NumSet, NumField, StdErrs, AteosErrs, ateosErrors, netronErrors, NonStdErr/*, NodeErrs, nodeErrors*/ } from "../contexts";

const {
    is,
    promise,
    netron: { Netron }
} = ateos;

const __ = ateos.getPrivate(ateos.netron);

const createNetron = (options) => new Netron(options);

export default (testInterface) => {
    describe("peer interface", () => {
        let p2pNetCore;
        let netron;
        let peer;

        before(async () => {
            await testInterface.before();
        });

        after(async () => {
            await testInterface.after();
        });

        beforeEach(async () => {
            [p2pNetCore, netron, peer] = await testInterface.beforeEach();
        });

        afterEach(async () => {
            await testInterface.afterEach();
        });

        // it("short path to peer id", () => {
        //     assert.strictEqual(peer.id, peer.info.id.asBase58());
        //     assert.strictEqual(netron.peer.id, netron.peer.info.id.asBase58());
        // });

        describe("_getContextDefinition()", () => {
            beforeEach(async () => {
                await netron.attachContext(new A(), "a");
                await promise.delay(500);
            });

            it("should throws with unknown context", () => {
                assert.throws(() => peer._getContextDefinition("not_exists"), ateos.error.NotExistsException);
            });

            it("should return definition of attached context owned by netron", () => {
                const def = peer._getContextDefinition("a");
                assert.isTrue(is.netronDefinition(def));
                assert.instanceOf(def, ateos.netron.Definition);
                assert.equal(def.name, "A");
            });
        });

        it("run 'getConfig' task", async () => {
            const result = await peer.runTask("netronGetConfig");
            assert.deepEqual(result.netronGetConfig.result, netron.options);
        });

        it("run 'contextDefs' task", async () => {
            netron.attachContext(new A(), "a");
            netron.attachContext(new B(), "b");
            const result = await peer.runTask("netronGetContextDefs");
            assert.sameMembers(Object.keys(result.netronGetContextDefs.result), ["a", "b"]);
        });

        describe("contexts", () => {
            it("hasContexts()", () => {
                assert.isFalse(peer.hasContexts());
            });

            it("getContextNames()", () => {
                assert.lengthOf(peer.getContextNames(), 0);
            });

            it("hasContext() should return false for unknown context", () => {
                assert.isFalse(peer.hasContext("a"));
            });

            it("attached contexts should be accessible from the same peer", async () => {
                await peer.attachContext(new A(), "a");
                await peer.attachContext(new B());

                await promise.delay(500);

                assert.include(netron.getContextNames(), "a");
                assert.include(netron.getContextNames(), "B");

                await promise.delay(100);

                assert.include(peer.getContextNames(), "a");
                assert.include(peer.getContextNames(), "B");
            });

            it("attached contexts (before connect) should be accessible from other peer", async () => {
                await peer.attachContext(new A(), "a");
                await peer.attachContext(new B());

                await promise.delay(500);

                const netron2 = createNetron();
                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });
                assert.isTrue(remotePeer.connected);

                assert.include(netron.getContextNames(), "a");
                assert.include(netron.getContextNames(), "B");

                assert.include(peer.getContextNames(), "a");
                assert.include(peer.getContextNames(), "B");

                assert.include(remotePeer.getContextNames(), "a");
                assert.include(remotePeer.getContextNames(), "B");
            });

            it("attached contexts (after connect) should be accessible from other peer", async () => {
                const netron2 = createNetron();
                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });
                assert.isTrue(remotePeer.connected);

                await peer.attachContext(new A(), "a");
                await peer.attachContext(new B());

                await promise.delay(500);

                assert.include(netron.getContextNames(), "a");
                assert.include(netron.getContextNames(), "B");

                assert.include(peer.getContextNames(), "a");
                assert.include(peer.getContextNames(), "B");

                assert.include(remotePeer.getContextNames(), "a");
                assert.include(remotePeer.getContextNames(), "B");
            });

            it("attach same context twice should have thrown", async () => {
                const a = new A();

                await peer.attachContext(a, "a");
                await assert.throws(async () => peer.attachContext(a, "a"), ateos.error.ExistsException);
            });

            it("detach contexts", async () => {
                const netron2 = createNetron();
                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });
                assert.isTrue(remotePeer.connected);

                await promise.delay(500);

                await peer.attachContext(new A(), "a");
                await peer.attachContext(new B());

                await promise.delay(500);

                assert.sameMembers(remotePeer.getContextNames(), ["a", "B"]);
                assert.sameMembers(peer.getContextNames(), ["a", "B"]);
                assert.sameMembers(netron.getContextNames(), ["a", "B"]);

                await peer.detachContext("a");
                await peer.detachContext("B");

                await promise.delay(500);

                assert.lengthOf(netron.getContextNames(), 0);
                assert.lengthOf(peer.getContextNames(), 0);
                assert.lengthOf(remotePeer.getContextNames(), 0);
            });

            it("detach non-existing context should have thrown", async () => {
                await assert.throws(async () => peer.detachContext("hack"), ateos.error.NotExistsException);
            });
        });

        describe("interfaces", () => {
            describe("_queryInterfaceByDefinition()", () => {
                beforeEach(async () => {
                    await peer.attachContext(new A(), "a");
                });

                it("should return interface for valid context", () => {
                    const def = peer._getContextDefinition("a");
                    const iface = peer._queryInterfaceByDefinition(def.id);
                    assert.isTrue(is.netronInterface(iface));

                    assert.strictEqual(iface[__.I_DEFINITION_SYMBOL].id, def.id);
                });

                it("should return interface for valid context (remote)", async () => {
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const def = remotePeer._getContextDefinition("a");
                    const iface = remotePeer._queryInterfaceByDefinition(def.id);
                    assert.isTrue(is.netronInterface(iface));
                    assert.strictEqual(iface[__.I_DEFINITION_SYMBOL].id, def.id);
                });

                it("should throw for unknown context", () => {
                    assert.throws(() => netron.peer._queryInterfaceByDefinition(100500), ateos.error.NotExistsException);
                });
            });

            it("query interface", async () => {
                await peer.attachContext(new A(), "a");
                await promise.delay(500);

                const iA = peer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.isTrue(peer._hasInterface(iA[__.I_DEFINITION_SYMBOL].id));
            });

            it("query interface (remote)", async () => {
                const netron2 = createNetron();
                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });

                await peer.attachContext(new A(), "a");
                await promise.delay(500);

                const iA = remotePeer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.isTrue(remotePeer._hasInterface(iA[__.I_DEFINITION_SYMBOL].id));
            });

            it("query non-existing interface should have thrown", async () => {
                assert.throws(() => peer.queryInterface("a"), ateos.error.NotExistsException);
            });

            it("release interface", async () => {
                await peer.attachContext(new A(), "a");
                await promise.delay(500);

                const iA = peer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                const defId = iA[__.I_DEFINITION_SYMBOL].id;
                assert.isTrue(peer._hasInterface(defId));

                peer.releaseInterface(iA);
                assert.isFalse(peer._hasInterface(defId));
            });

            it("release interface (remote)", async () => {
                const netron2 = createNetron();
                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });

                await peer.attachContext(new A(), "a");
                await promise.delay(500);

                const iA = remotePeer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                const defId = iA[__.I_DEFINITION_SYMBOL].id;
                assert.isTrue(remotePeer._hasInterface(defId));

                remotePeer.releaseInterface(iA);
                assert.isFalse(remotePeer._hasInterface(defId));
            });

            it("release non-interface should have thrown", async () => {
                assert.throws(() => peer.releaseInterface(new A()), ateos.error.NotValidException);
            });

            describe("Netron#getPeerForInterface()", () => {
                beforeEach(async () => {
                    await peer.attachContext(new A(), "a");
                });

                it.todo("should return peer", () => {
                    const iInstance = peer.queryInterface("a");
                    const otherPeer = netron.getPeerForInterface(iInstance);
                    assert.strictEqual(peer.id, otherPeer.id);
                });

                it("should throw for non-interface instance", () => {
                    assert.throws(() => netron.getPeerForInterface(new A()), ateos.error.NotValidException);
                });
            });

            describe("common types", () => {
                let iCt;
                beforeEach(async () => {
                    await peer.attachContext(new CommonTypes(), "ct");

                    await promise.delay(500);
                    iCt = peer.queryInterface("ct");
                });

                describe("get values of public properties", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`_${ct.name}`, async () => {
                            assert.deepEqual(await iCt[`_${ct.name}`].get(), ct.value);
                        });
                    }
                });

                describe("set values of public properties", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`_${ct.name}`, async () => {
                            assert.strictEqual(await iCt[`_${ct.name}`].set(ct.otherValue), undefined);
                            assert.deepEqual(await iCt[`_${ct.name}`].get(), ct.otherValue);
                        });
                    }
                });

                describe("call public methods via non-void way", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`${ct.name}()`, async () => {
                            assert.deepEqual(await iCt[ct.name](), ct.value);
                        });
                    }
                });

                describe("call public methods via void way", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`${ct.name}()`, async () => {
                            assert.strictEqual(await iCt[`set_${ct.name}`].void(ct.value), undefined);
                            // assert.deepEqual(await iCt[`_${ct.name}`].get(), ct.otherValue);
                        });
                    }
                });
            });

            describe("common types (remote peer)", () => {
                let netron2;
                let iCt;

                before(() => {
                    netron2 = createNetron();
                });

                beforeEach(async () => {
                    await peer.attachContext(new CommonTypes(), "ct");

                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });

                    iCt = remotePeer.queryInterface("ct");
                    assert.isTrue(is.netronInterface(iCt));
                });

                describe("public properties", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`_${ct.name}`, async () => {
                            assert.deepEqual(await iCt[`_${ct.name}`].get(), ct.value);
                        });
                    }
                });

                describe("public methods", () => {
                    for (const ct of commonTypes) {
                        // eslint-disable-next-line
                        it(`${ct.name}()`, async () => {
                            assert.deepEqual(await iCt[ct.name](), ct.value);
                        });
                    }
                });
            });

            it("get property of non-existing context", async () => {
                await peer.attachContext(new A(), "a");

                await promise.delay(500);

                const iA = peer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.equal(await iA.propA.get(), "aaa");

                await peer.detachContext("a");

                await promise.delay(500);

                await assert.throws(async () => iA.propA.get(), ateos.error.NotExistsException);
            });

            it("get property of non-existing context (remote)", async () => {
                const netron2 = createNetron();
                await peer.attachContext(new A(), "a");

                await promise.delay(500);

                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });

                const iA = remotePeer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.equal(await iA.propA.get(), "aaa");

                await peer.detachContext("a");

                await promise.delay(500);

                await assert.throws(async () => iA.propA.get(), ateos.error.NotExistsException);
            });

            it("call method of non-existing context", async () => {
                await peer.attachContext(new A(), "a");

                await promise.delay(500);

                const iA = peer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.equal(await iA.methodA(), "aaa");

                await peer.detachContext("a");

                await promise.delay(500);

                await assert.throws(async () => iA.methodA(), ateos.error.NotExistsException);
            });

            it("call method of non-existing context (remote)", async () => {
                const netron2 = createNetron();
                await peer.attachContext(new A(), "a");

                await promise.delay(500);

                const p2pNC = await testInterface.createNetCore(netron2);
                const remotePeer = await p2pNC.connect({
                    addr: p2pNetCore.peerInfo,
                    netron: netron2
                });

                const iA = remotePeer.queryInterface("a");
                assert.isTrue(is.netronInterface(iA));
                assert.equal(await iA.methodA(), "aaa");

                await netron.detachContext("a");

                await promise.delay(500);

                await assert.throws(async () => iA.methodA(), ateos.error.NotExistsException);
            });

            describe("weak context and inversion of control", () => {
                it("query strong interface", async () => {
                    const storage = new ObjectStorage("unknown", 1024);
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    await peer.attachContext(storage, "storage");
                    await promise.delay(300);
                    const iStorage = remotePeer.queryInterface("storage");
                    assert.isTrue(is.netronInterface(iStorage));
                    let name = await iStorage.name.get();
                    assert.strictEqual(name, "unknown");
                    await iStorage.name.set("simplestore");
                    name = await iStorage.name.get();
                    assert.strictEqual(name, "simplestore");
                    let size = await iStorage.getCapacity();
                    assert.strictEqual(size, 1024);
                    await iStorage.setCapacity(2048);
                    size = await iStorage.getCapacity();
                    assert.strictEqual(size, 2048);
                });

                it("query remotely instantiated object", async () => {
                    const idea = "To get out of difficulty, one usually must go throught it";
                    const storage = new ObjectStorage("simplestore", 3);
                    storage.addDocument("idea", new Document(idea, DocumentTypes.string));
                    await peer.attachContext(storage, "storage");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iStorage = remotePeer.queryInterface("storage");
                    const size = await iStorage.getSize();
                    assert.strictEqual(size, 1);
                    const iDoc1 = await iStorage.getDocument("idea");
                    const data = await iDoc1.data.get();
                    assert.strictEqual(data, idea);
                });

                it("create remote object, obtain it and send again to remote", async function () {
                    this.timeout(600 * 100000);
                    const idea = "To get out of difficulty, one usually must go throught it";
                    const storage = new ObjectStorage("simplestore", 3);
                    await peer.attachContext(storage, "storage");

                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iStorage = remotePeer.queryInterface("storage");
                    const iDoc = await iStorage.createDocument(idea, DocumentTypes.string);
                    await iStorage.addDocument("idea", iDoc);
                    const iDocSame = await iStorage.getDocument("idea");
                    const data = await iDocSame.data.get();
                    assert.instanceOf(storage.getDocument("idea"), Document);
                    assert.deepEqual(data, idea);
                    assert.deepEqual(iDoc.$def, iDocSame.$def);
                });

                describe("inverse object interfacing", () => {
                    it("simple", async () => {
                        const peter = new Soul("Peter");
                        const mike = new Soul("Mike");
                        const devil = new Devil();
                        await peer.attachContext(devil, "devil");
                        const netron2 = createNetron();
                        const p2pNC = await testInterface.createNetCore(netron2);
                        const remotePeer = await p2pNC.connect({
                            addr: p2pNetCore.peerInfo,
                            netron: netron2
                        });
                        const iDevil = remotePeer.queryInterface("devil");

                        await iDevil.sellSoul(peter.name, peter);
                        await iDevil.sellSoul(mike.name, mike);
                        devil.possess("Mike");
                        await devil.takeVitality(50);
                        assert.strictEqual(mike.vitality, 50);
                        devil.possess("Peter");
                        await devil.takeVitality(100);
                        assert.strictEqual(peter.vitality, 0);
                        assert.deepEqual(peter.bodyStatus, BodyStatuses.Dead);
                    });

                    it("complex", async () => {
                        const peter = new Soul("Peter");
                        const mike = new Soul("Mike");
                        const devil = new Devil();
                        await peer.attachContext(devil, "devil");
                        const netron2 = createNetron();
                        const p2pNC = await testInterface.createNetCore(netron2);
                        const remotePeer = await p2pNC.connect({
                            addr: p2pNetCore.peerInfo,
                            netron: netron2
                        });
                        const iDevil = remotePeer.queryInterface("devil");

                        await iDevil.sellSoul(peter.name, peter);
                        await iDevil.sellSoul(mike.name, mike);
                        devil.possess("Mike");
                        await devil.takeVitality(50);
                        assert.strictEqual(mike.vitality, 50);
                        devil.possess("Peter");
                        await devil.takeVitality(100);
                        assert.strictEqual(peter.vitality, 0);
                        assert.deepEqual(peter.bodyStatus, BodyStatuses.Dead);
                        await devil.doEvil("Mike", 50);
                        const iMikeSoul = devil.souls.get("Mike");
                        const mikeVitality = await iMikeSoul.vitality.get();
                        const mikeBodyStatus = await iMikeSoul.bodyStatus.get();
                        assert.strictEqual(mikeVitality, 0);
                        assert.deepEqual(mikeBodyStatus, BodyStatuses.Dead);
                    });
                });

                it("call released weak context", async function () {
                    this.timeout(600 * 10000);
                    await peer.attachContext(new Strong(peer.netron), "strong");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iStrong = remotePeer.queryInterface("strong");
                    const iWeak = await iStrong.getWeak();
                    assert.equal(await iWeak.doSomething(), 888);
                    await iStrong.releaseWeak();
                    await assert.throws(async () => iWeak.doSomething(), ateos.error.NotExistsException, /Stub for definition with id/);
                });

                it("deep weak contexting", async () => {
                    await peer.attachContext(new CounterKeeper(), "keeper");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    let keeper = remotePeer.queryInterface("keeper");
                    let counter = 1;
                    assert.strictEqual(await keeper.getCounter(), counter);
                    while (counter < 30) {
                        keeper = new CounterKeeper(keeper);
                        assert.strictEqual(await keeper.getCounter(), ++counter);
                        keeper = await keeper.getNextKeeper(keeper);
                        CounterKeeper.setValue(1);
                        assert.strictEqual(await keeper.getCounter(), ++counter);
                        assert.strictEqual(CounterKeeper.getValue(), counter);
                    }
                });
            });

            describe("multiple definitions", () => {
                it("get multiple definitions", async () => {
                    const numSet = new NumSet();
                    await peer.attachContext(numSet, "numset");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iNumSet = remotePeer.queryInterface("numset");
                    const defs = await iNumSet.getFields(0, 8);
                    expect(defs.length).to.be.equal(8);
                    for (let i = 0; i < defs.length; i++) {
                        const def = defs.get(i);
                        expect(await def.getValue()).to.be.equal(i);
                    }
                });

                it("set multiple definitions (control inversion)", async () => {
                    const numSet = new NumSet();
                    await peer.attachContext(numSet, "numset");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iNumSet = remotePeer.queryInterface("numset");
                    const fields = new ateos.netron.Definitions();
                    for (let i = 0; i < 10; i++) {
                        fields.push(new NumField(i));
                    }
                    await iNumSet.setFields(fields);
                    expect(numSet._fields.length).to.be.equal(10);
                    for (let i = 0; i < numSet._fields.length; i++) {
                        const def = numSet._fields.get(i);
                        expect(await def.getValue()).to.be.equal(i);
                    }
                });
            });

            describe("exceptions", () => {
                it("standart exceptions", async () => {
                    let okCount = 0;
                    await peer.attachContext(new StdErrs(), "a");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iA = remotePeer.queryInterface("a");
                    const stdErrors = ateos.error.stdExceptions;
                    for (const StdError of stdErrors) {
                        try {
                            await iA[`throw${StdError.prototype.name}`]();
                        } catch (err) {
                            okCount += (err instanceof StdError ? 1 : 0);
                        }
                    }
                    assert.strictEqual(okCount, stdErrors.length);
                });

                it("ateos exceptions", async () => {
                    let okCount = 0;

                    await peer.attachContext(new AteosErrs(), "a");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iA = remotePeer.queryInterface("a");

                    for (const AteosError of ateosErrors) {
                        if (netronErrors.includes(AteosError.name)) {
                            continue;
                        }
                        try {
                            const fnName = `throw${AteosError.name}`;
                            await iA[fnName]();
                        } catch (err) {
                            okCount += (err instanceof AteosError ? 1 : 0);
                        }
                    }
                    assert.strictEqual(okCount, ateosErrors.length - netronErrors.length);
                });

                it.todo("node internal errors", async () => {
                    let okCount = 0;
                    await peer.attachContext(new NodeErrs(), "a");
                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iA = remotePeer.queryInterface("a");
                    for (const [name, Exc] of Object.entries(nodeErrors)) {
                        try {
                            const fnName = `throw${name}`;
                            await iA[fnName]();
                        } catch (err) {
                            okCount += (err instanceof Error ? 1 : 0);
                        }
                    }

                    assert.strictEqual(okCount, Object.keys(nodeErrors).length);
                });

                it("should not fail when a non-standard error is sent", async () => {
                    await peer.attachContext(new NonStdErr(), "a");

                    const netron2 = createNetron();
                    const p2pNC = await testInterface.createNetCore(netron2);
                    const remotePeer = await p2pNC.connect({
                        addr: p2pNetCore.peerInfo,
                        netron: netron2
                    });
                    const iA = remotePeer.queryInterface("a");

                    await assert.throws(async () => {
                        await iA.throw();
                    }, "Hello World!");
                });
            });
        });
    });
};
