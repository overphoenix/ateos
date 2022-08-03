const {
    data: { bson: BSON }
} = ateos;

describe("string tests", () => {
    it("can serialize and deserialize 0xFFFD", () => {
        const unicodeString = String.fromCharCode(0x41, 0x42, 0xfffd, 0x43, 0x44); // "AB�CD"

        const serialized = BSON.serialize({ value: unicodeString });
        BSON.deserialize(serialized);
    });
});
