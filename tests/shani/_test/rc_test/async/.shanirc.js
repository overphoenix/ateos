export default async (ctx) => {
    await ateos.promise.delay(100);

    ctx.before(function () {});

    ctx.beforeEach(function () {});

    ctx.afterEach(function () {});

    ctx.after(function () {});
};
