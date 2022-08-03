const {
    fs: fse,
    path,
    std: { fs }
} = ateos;

const o755 = parseInt("755", 8);

describe("mkdirp / root", () => {
    // '/' on unix, 'c:/' on windows.
    const dir = path.normalize(path.resolve(path.sep)).toLowerCase();

    // if not 'c:\\' or 'd:\\', it's probably a network mounted drive, this fails then. TODO: investigate
    if (process.platform === "win32" && (dir.indexOf("c:\\") === -1) && (dir.indexOf("d:\\") === -1)) {
        return; 
    }

    it("should", (done) => {
        fse.mkdirp(dir, o755, (err) => {
            if (err) {
                throw err; 
            }
            fs.stat(dir, (er, stat) => {
                if (er) {
                    throw er; 
                }
                assert.ok(stat.isDirectory(), "target is a directory");
                done();
            });
        });
    });
});
