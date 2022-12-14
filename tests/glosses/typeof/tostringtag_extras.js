const {
    typeOf,
    is
} = ateos;

const symbolExists = ateos.isFunction(Symbol);
const symbolToStringTagExists = symbolExists && !ateos.isUndefined(Symbol.toStringTag);

const describeIf = (condition) => {
    return condition ? describe : describe.skip;
};

describeIf(symbolToStringTagExists)("toStringTag extras", () => {
    it("supports toStringTag on arrays", () => {
        assert(typeOf([]) === "Array");
        const arr = [];
        arr[Symbol.toStringTag] = "foo";
        assert(typeOf(arr) === "foo", 'type(arr) === "foo"');
    });
});
