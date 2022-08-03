export default (ctx) => {
    const {
        assertion
    } = ateos;
    assertion.use(assertion.extension.dirty);
};
