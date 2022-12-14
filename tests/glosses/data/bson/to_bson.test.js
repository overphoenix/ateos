const {
    data: { bson: BSON }
} = ateos;

const ObjectId = BSON.ObjectId;

describe("toBSON", () => {
    /**
     * @ignore
     */
    it("Should correctly handle toBson function for an object", (done) => {
        // Test object
        const doc = {
            hello: new ObjectId(),
            a: 1
        };

        // Add a toBson method to the object
        doc.toBSON = function () {
            return { b: 1 };
        };

        // Serialize the data
        let serialized_data = BSON.serialize(doc, false, true);
        let deserialized_doc = BSON.deserialize(serialized_data);
        expect({ b: 1 }).to.deep.equal(deserialized_doc);

        // Serialize the data
        serialized_data = BSON.serialize(doc, false, true);
        deserialized_doc = BSON.deserialize(serialized_data);
        expect({ b: 1 }).to.deep.equal(deserialized_doc);
        done();
    });

    /**
     * @ignore
     */
    it("Should correctly handle embedded toBson function for an object", (done) => {
        // Test object
        const doc = {
            hello: new ObjectId(),
            a: 1,
            b: {
                d: 1
            }
        };

        // Add a toBson method to the object
        doc.b.toBSON = function () {
            return { e: 1 };
        };

        // Serialize the data
        let serialized_data = BSON.serialize(doc, false, true);
        let deserialized_doc = BSON.deserialize(serialized_data);
        expect({ e: 1 }).to.deep.equal(deserialized_doc.b);

        serialized_data = BSON.serialize(doc, false, true);
        deserialized_doc = BSON.deserialize(serialized_data);
        expect({ e: 1 }).to.deep.equal(deserialized_doc.b);
        done();
    });

    /**
     * @ignore
     */
    it("Should correctly serialize when embedded non object returned by toBSON", (done) => {
        // Test object
        const doc = {
            hello: new ObjectId(),
            a: 1,
            b: {
                d: 1
            }
        };

        // Add a toBson method to the object
        doc.b.toBSON = function () {
            return "hello";
        };

        // Serialize the data
        let serialized_data = BSON.serialize(doc, false, true);
        let deserialized_doc = BSON.deserialize(serialized_data);
        expect("hello").to.deep.equal(deserialized_doc.b);

        // Serialize the data
        serialized_data = BSON.serialize(doc, false, true);
        deserialized_doc = BSON.deserialize(serialized_data);
        expect("hello").to.deep.equal(deserialized_doc.b);
        done();
    });

    /**
     * @ignore
     */
    it("Should fail when top level object returns a non object type", (done) => {
        // Test object
        const doc = {
            hello: new ObjectId(),
            a: 1,
            b: {
                d: 1
            }
        };

        // Add a toBson method to the object
        doc.toBSON = function () {
            return "hello";
        };

        let test1 = false;
        let test2 = false;

        try {
            var serialized_data = BSON.serialize(doc, false, true);
            BSON.deserialize(serialized_data);
        } catch (err) {
            test1 = true;
        }

        try {
            serialized_data = BSON.serialize(doc, false, true);
            BSON.deserialize(serialized_data);
        } catch (err) {
            test2 = true;
        }

        expect(true).to.equal(test1);
        expect(true).to.equal(test2);
        done();
    });
});
