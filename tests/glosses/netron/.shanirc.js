export default async (ctx) => {
    ctx.prefix("netron");

    const {
        assertion
    } = ateos;

    assertion.use(assertion.extension.dirty);
};
