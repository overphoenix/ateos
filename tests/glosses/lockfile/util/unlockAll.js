

const { getLocks } = require(ateos.getPath("lib", "glosses", "lockfile", "lockfile"));
const { unlock } = ateos.lockfile;

const unlockAll = function () {
    const locks = getLocks();
    const promises = Object.keys(locks).map((file) => unlock(file, { realpath: false }));

    return Promise.all(promises);
}

module.exports = unlockAll;
