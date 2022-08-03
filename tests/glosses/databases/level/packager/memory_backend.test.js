describe("packager", "MemoryBackend", () => {
    const level = ateos.database.level.packager(ateos.database.level.backend.MemoryBackend);

    require("./abstract/base")(level);
    require("./abstract/db_values")(level, true);
});
