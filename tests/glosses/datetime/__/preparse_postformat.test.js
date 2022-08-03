describe("datetime", "preparse and postformat", () => {
    before(() => {
        ateos.datetime.locale("symbol", {
            preparse(string) {
                return string.replace(/[!@#$%\^&*()]/g, (match) => {
                    return numberMap[match];
                });
            },

            postformat(string) {
                return string.replace(/\d/g, (match) => {
                    return symbolMap[match];
                });
            }
        });

        // ateos.datetime.locale("en");
    });

    after(() => {
        ateos.datetime.defineLocale("symbol", null);
    });

    const symbolMap = {
        1: "!",
        2: "@",
        3: "#",
        4: "$",
        5: "%",
        6: "^",
        7: "&",
        8: "*",
        9: "(",
        0: ")"
    };

    const numberMap = {
        "!": "1",
        "@": "2",
        "#": "3",
        $: "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0"
    };

    it("transform", () => {
        assert.equal(ateos.datetime.utc("@)!@-)*-@&", "YYYY-MM-DD").unix(), 1346025600, "preparse string + format");
        assert.equal(ateos.datetime.utc("@)!@-)*-@&").unix(), 1346025600, "preparse ISO8601 string");
        assert.equal(ateos.datetime.unix(1346025600).utc().format("YYYY-MM-DD"), "@)!@-)*-@&", "postformat");
    });

    it("transform from", () => {
        const start = ateos.datetime([2007, 1, 28]);

        assert.equal(start.from(ateos.datetime([2007, 1, 28]).add({ s: 90 }), true), "@ minutes", "postformat should work on ateos.datetime.fn.from");
        assert.equal(ateos.datetime().add(6, "d").fromNow(true), "^ days", "postformat should work on ateos.datetime.fn.fromNow");
        assert.equal(ateos.datetime.duration(10, "h").humanize(), "!) hours", "postformat should work on ateos.datetime.duration.fn.humanize");
    });

    it("calendar day", () => {
        const a = ateos.datetime().hours(12).minutes(0).seconds(0);

        assert.equal(ateos.datetime(a).calendar(), "Today at !@:)) PM", "today at the same time");
        assert.equal(ateos.datetime(a).add({ m: 25 }).calendar(), "Today at !@:@% PM", "Now plus 25 min");
        assert.equal(ateos.datetime(a).add({ h: 1 }).calendar(), "Today at !:)) PM", "Now plus 1 hour");
        assert.equal(ateos.datetime(a).add({ d: 1 }).calendar(), "Tomorrow at !@:)) PM", "tomorrow at the same time");
        assert.equal(ateos.datetime(a).subtract({ h: 1 }).calendar(), "Today at !!:)) AM", "Now minus 1 hour");
        assert.equal(ateos.datetime(a).subtract({ d: 1 }).calendar(), "Yesterday at !@:)) PM", "yesterday at the same time");
    });
});
