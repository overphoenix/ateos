export function isNearSpringDST() {
    return ateos.datetime().subtract(1, "day").utcOffset() !== ateos.datetime().add(1, "day").utcOffset();
}
