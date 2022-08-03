export default (ctx) => {
    ctx.prefix("lockfile");

    const { 
        assertion
    } = ateos;
    assertion.use(assertion.extension.checkmark);
};
