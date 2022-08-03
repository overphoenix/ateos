export default (ctx) => {
    ctx.prefix("fs2", "base");

    const {
        assertion
    } = ateos;
    assertion.use(assertion.extension.checkmark);
};
