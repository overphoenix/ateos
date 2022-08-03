describe("datetime", "ateos.is.datetime", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    const { is } = ateos;

    it("is ateos.datetime object", () => {
        const MyObj = function () {};
        MyObj.prototype.toDate = function () {
            return new Date();
        };

        assert.ok(is.datetime(ateos.datetime()), "simple ateos.datetime object");
        assert.ok(is.datetime(ateos.datetime(null)), "invalid ateos.datetime object");

        assert.ok(!is.datetime(new MyObj()), "myObj is not ateos.datetime object");
        assert.ok(!is.datetime(ateos.datetime), "ateos.datetime function is not ateos.datetime object");
        assert.ok(!is.datetime(new Date()), "date object is not ateos.datetime object");
        assert.ok(!is.datetime(Object), "Object is not ateos.datetime object");
        assert.ok(!is.datetime("foo"), "string is not ateos.datetime object");
        assert.ok(!is.datetime(1), "number is not ateos.datetime object");
        assert.ok(!is.datetime(NaN), "NaN is not ateos.datetime object");
        assert.ok(!is.datetime(null), "null is not ateos.datetime object");
        assert.ok(!is.datetime(undefined), "undefined is not ateos.datetime object");
    });
});
