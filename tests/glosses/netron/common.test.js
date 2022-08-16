import { A } from "./contexts";

const {
    is,
    netron: { createPeerInfo, P2PNetCore, Netron, RemotePeer, meta: { Reflection }, Definitions, Reference }
} = ateos;

describe("common stuff", () => {
    let peerInfo;
    let netron;

    before(async () => {
        netron = new Netron();
        peerInfo = await createPeerInfo({
            addrs: "/ip4/0.0.0.0/tcp/0",
            bits: 512
        });

    });

    describe("predicates", () => {
        it("is.netron()", () => {
            assert.isTrue(is.netron(netron));
        });

        it("is.netronOwnPeer()", () => {
            assert.isTrue(is.netronPeer(netron.peer));
            assert.isTrue(is.netronOwnPeer(netron.peer));
        });

        it("is.netronRemotePeer()", async () => {
            const p2pNC = new P2PNetCore({
                peerInfo
            });
            await p2pNC.start({ netron });
            const rPeer = new RemotePeer({ netron });
            assert.isTrue(is.netronPeer(rPeer));
            assert.isTrue(is.netronRemotePeer(rPeer));
        });

        it("is.netronContext()", () => {
            assert.isTrue(is.netronContext(new A()));
        });

        it("is.netronStub()", () => {
            assert.isTrue(is.netronStub(netron.stubManager.createStub(Reflection.from(new A()))));
        });

        it("is.netronDefinition()", () => {
            const stub = netron.stubManager.createStub(Reflection.from(new A()));
            assert.isTrue(is.netronDefinition(stub.definition));
        });

        it("is.netronDefinitions()", () => {
            assert.isTrue(is.netronDefinitions(new Definitions()));
        });

        it("is.netronReference()", () => {
            assert.isTrue(is.netronReference(new Reference(1)));
        });
    });

    describe("unique id generators", () => {
        it("fast numeric generator", () => {
            const generator = new ateos.netron.uid.FastUid();

            for (let i = 1; i < 1000; i++) {
                assert.equal(generator.create(), i);
            }

            assert.isTrue(ateos.isInteger(generator.create()));
        });

        it("long-based/slow numeric generator", () => {
            const generator = new ateos.netron.uid.LongUid();

            for (let i = 1; i < 1000; i++) {
                assert.isTrue(generator.create().equals(ateos.math.Long.fromNumber(i)));
            }

            assert.isTrue(ateos.isLong(generator.create()));
        });
    });
});
