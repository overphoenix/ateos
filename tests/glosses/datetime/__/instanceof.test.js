describe("datetime", "instanceof", () => {
    before(() => {
        ateos.datetime.locale("en");
    });

    it.skip("instanceof", () => {
        const extend = function (a, b) {
            let i;
            for (i in b) {
                a[i] = b[i];
            }
            return a;
        };

        assert.equal(ateos.datetime() instanceof ateos.datetime, true, "simple ateos.datetime object");
        assert.equal(extend({}, ateos.datetime()) instanceof ateos.datetime, false, "extended ateos.datetime object");
        assert.equal(ateos.datetime(null) instanceof ateos.datetime, true, "invalid ateos.datetime object");

        assert.equal(new Date() instanceof ateos.datetime, false, "date object is not ateos.datetime object");
        assert.equal(Object instanceof ateos.datetime, false, "Object is not ateos.datetime object");
        assert.equal("foo" instanceof ateos.datetime, false, "string is not ateos.datetime object");
        assert.equal(1 instanceof ateos.datetime, false, "number is not ateos.datetime object");
        assert.equal(NaN instanceof ateos.datetime, false, "NaN is not ateos.datetime object");
        assert.equal(null instanceof ateos.datetime, false, "null is not ateos.datetime object");
        assert.equal(undefined instanceof ateos.datetime, false, "undefined is not ateos.datetime object");
    });
});
