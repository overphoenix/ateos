export const fn = async (ctx) => {
    await ateos.promise.delay(100);

    ctx.beforeEach(() => {
        throw new Error();
    });
};
