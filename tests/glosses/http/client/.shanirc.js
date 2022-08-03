export default (ctx) => {
    ctx.prefix("http", "client");

    const {
        assertion
    } = ateos;

    assertion.use(assertion.extension.dirty);
};
