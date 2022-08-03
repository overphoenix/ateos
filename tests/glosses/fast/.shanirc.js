export default async (ctx) => {
    const {
        assertion
    } = ateos;

    assertion.use(assertion.extension.dirty);
};
