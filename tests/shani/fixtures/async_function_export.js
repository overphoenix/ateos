export default async function () {
    await ateos.promise.delay(100);
    console.log(`ateos v${ateos.package.version}`);
}
