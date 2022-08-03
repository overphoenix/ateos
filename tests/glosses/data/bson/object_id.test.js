const {
    data: { bson: BSON }
} = ateos;

const util = require("util");
const ObjectId = BSON.ObjectId;

describe("ObjectId", () => {
    /**
     * @ignore
     */
    it("should correctly handle objectId timestamps", (done) => {
    // var test_number = {id: ObjectI()};
        const a = ObjectId.createFromTime(1);
        expect(Buffer.from([0, 0, 0, 1])).to.deep.equal(a.id.slice(0, 4));
        expect(1000).to.equal(a.getTimestamp().getTime());

        const b = new ObjectId();
        b.generationTime = 1;
        expect(Buffer.from([0, 0, 0, 1])).to.deep.equal(b.id.slice(0, 4));
        expect(1).to.equal(b.generationTime);
        expect(1000).to.equal(b.getTimestamp().getTime());

        done();
    });

    /**
     * @ignore
     */
    it("should correctly create ObjectId from uppercase hexstring", (done) => {
        let a = "AAAAAAAAAAAAAAAAAAAAAAAA";
        let b = new ObjectId(a);
        let c = b.equals(a); // => false
        expect(true).to.equal(c);

        a = "aaaaaaaaaaaaaaaaaaaaaaaa";
        b = new ObjectId(a);
        c = b.equals(a); // => true
        expect(true).to.equal(c);
        expect(a).to.equal(b.toString());

        done();
    });

    /**
     * @ignore
     */
    it("should correctly create ObjectId from Buffer", (done) => {
        if (!Buffer.from) {
            return done(); 
        }
        let a = "AAAAAAAAAAAAAAAAAAAAAAAA";
        let b = new ObjectId(Buffer.from(a, "hex"));
        let c = b.equals(a); // => false
        expect(true).to.equal(c);

        a = "aaaaaaaaaaaaaaaaaaaaaaaa";
        b = new ObjectId(Buffer.from(a, "hex"));
        c = b.equals(a); // => true
        expect(a).to.equal(b.toString());
        expect(true).to.equal(c);
        done();
    });

    /**
     * @ignore
     */
    it("should correctly allow for node.js inspect to work with ObjectId", (done) => {
        const a = "AAAAAAAAAAAAAAAAAAAAAAAA";
        const b = new ObjectId(a);
        util.inspect(b);

        // var c = b.equals(a); // => false
        // expect(true).to.equal(c);
        //
        // var a = 'aaaaaaaaaaaaaaaaaaaaaaaa';
        // var b = new ObjectId(a);
        // var c = b.equals(a); // => true
        // expect(true).to.equal(c);
        // expect(a).to.equal(b.toString());

        done();
    });

    /**
     * @ignore
     */
    it("should isValid check input Buffer length", (done) => {
        const buffTooShort = Buffer.from([]);
        const buffTooLong = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        const buff12Bytes = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

        expect(ObjectId.isValid(buffTooShort)).to.be.false;
        expect(ObjectId.isValid(buffTooLong)).to.be.false;
        expect(ObjectId.isValid(buff12Bytes)).to.be.true;
        done();
    });

    it("should throw if a 12-char string is passed in with character codes greater than 256", () => {
        expect(() => new ObjectId("abcdefghijkl").toHexString()).to.not.throw();
        expect(() => new ObjectId("abcdefŽhijkl").toHexString()).to.throw(TypeError);
    });

    it("should correctly interpret timestamps beyond 2038", () => {
        const farFuture = new Date("2040-01-01T00:00:00.000Z").getTime();
        expect(
            new BSON.ObjectId(BSON.ObjectId.generate(farFuture / 1000)).getTimestamp().getTime()
        ).to.equal(farFuture);
    });
});
