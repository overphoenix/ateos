

export default {
    val: 777,
    async afn(ateos) {
        await ateos.promise.delay(10);
        return this.val;
    }
};
