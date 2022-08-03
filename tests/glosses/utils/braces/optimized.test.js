const { util: { braces } } = ateos;

const equal = (pattern, expected, options) => {
    assert.deepEqual(braces(pattern, options), expected);
};

describe("util", "braces", "optimized", () => {
    describe("sets", () => {
        describe("invalid sets", () => {
            it("should handle invalid sets:", () => {
                equal("{0..10,braces}", ["(0..10|braces)"]);
                equal("{1..10,braces}", ["(1..10|braces)"]);
            });
        });

        describe("extglobs", () => {
            it("should not optimize when preceded by an extglob character", () => {
                equal("a/@{b,c}/d", ["a/@b/d", "a/@c/d"]);
                equal("a/!{b,c}/d", ["a/!b/d", "a/!c/d"]);
                equal("a/*{b,c}/d", ["a/*b/d", "a/*c/d"]);
                equal("a/+{b,c}/d", ["a/+b/d", "a/+c/d"]);
                equal("a/?{b,c}/d", ["a/?b/d", "a/?c/d"]);
            });

            it("should not optimize when brace set contains extglobs", () => {
                equal("{b,[F-Z],!([B-F])}.js", ["b.js", "[F-Z].js", "!([B-F]).js"]);
            });
        });

        describe("escaping", () => {
            it("should not expand escaped braces", () => {
                equal("\\{a,b,c,d,e}", ["{a,b,c,d,e}"]);
                equal("a/b/c/{x,y\\}", ["a/b/c/{x,y}"]);
                equal("a/\\{x,y}/cde", ["a/{x,y}/cde"]);
                equal("abcd{efgh", ["abcd{efgh"]);
                equal("{abc}", ["{abc}"]);
                equal("{x,y,\\{a,b,c\\}}", ["(x|y|{a|b|c})"]);
                equal("{x,y,{a,b,c\\}}", ["{x,y,(a|b|c})"]);
                equal("{x,y,{abc},trie}", ["(x|y|{abc}|trie)"]);
                equal("{x\\,y,\\{abc\\},trie}", ["(x,y|{abc}|trie)"]);
            });

            it("should handle spaces", () => {
                // Bash 4.3 says the following should be equivalent to `foo|(1|2)|bar`,
                // That makes sense in Bash, since ' ' is a separator, but not here.
                equal("foo {1,2} bar", ["foo (1|2) bar"]);
            });

            it("should handle empty braces", () => {
                equal("{ }", ["{ }"]);
                equal("{", ["{"]);
                equal("{}", ["{}"]);
                equal("}", ["}"]);
            });

            it("should escape braces when only one value is defined", () => {
                equal("a{b}c", ["a{b}c"]);
                equal("a/b/c{d}e", ["a/b/c{d}e"]);
            });

            it("should not expand braces in sets with es6/bash-like variables", () => {
                equal("abc/${ddd}/xyz", ["abc/${ddd}/xyz"]);
                equal("a${b}c", ["a${b}c"]);
                equal("a/{${b},c}/d", ["a/(${b}|c)/d"]);
                equal("a${b,d}/{foo,bar}c", ["a${b,d}/(foo|bar)c"]);
            });

            it("should not expand escaped commas.", () => {
                equal("a{b\\,c\\,d}e", ["a{b,c,d}e"]);
                equal("a{b\\,c}d", ["a{b,c}d"]);
                equal("{abc\\,def}", ["{abc,def}"]);
                equal("{abc\\,def,ghi}", ["(abc,def|ghi)"]);
                equal("a/{b,c}/{x\\,y}/d/e", ["a/(b|c)/{x,y}/d/e"]);
            });

            it("should return sets with escaped commas", () => {
                equal("a/{b,c}/{x\\,y}/d/e", ["a/(b|c)/{x,y}/d/e"]);
            });

            it("should not expand escaped braces.", () => {
                equal("{a,b\\}c,d}", ["(a|b}c|d)"]);
                equal("\\{a,b,c,d,e}", ["{a,b,c,d,e}"]);
                equal("a/{z,\\{a,b,c,d,e}/d", ["a/(z|{a|b|c|d|e)/d"]);
                equal("a/\\{b,c}/{d,e}/f", ["a/{b,c}/(d|e)/f"]);
                equal("./\\{x,y}/{a..z..3}/", ["./{x,y}/(a|d|g|j|m|p|s|v|y)/"]);
            });

            it("should not expand escaped braces or commas.", () => {
                equal("{x\\,y,\\{abc\\},trie}", ["(x,y|{abc}|trie)"]);
            });
        });

        describe("set expansion", () => {
            it("should support sequence brace operators", () => {
                equal("/usr/{ucb/{ex,edit},lib/{ex,how_ex}}", ["/usr/(ucb/(ex|edit)|lib/(ex|how_ex))"]);
                equal("ff{c,b,a}", ["ff(c|b|a)"]);
                equal("f{d,e,f}g", ["f(d|e|f)g"]);
                equal("x{{0..10},braces}y", ["x(([0-9]|10)|braces)y"]);
                equal("{1..10}", ["([1-9]|10)"]);
                equal("{a,b,c}", ["(a|b|c)"]);
                equal("{braces,{0..10}}", ["(braces|([0-9]|10))"]);
                equal("{l,n,m}xyz", ["(l|n|m)xyz"]);
                equal("{{0..10},braces}", ["(([0-9]|10)|braces)"]);
                equal("{{1..10..2},braces}", ["((1|3|5|7|9)|braces)"]);
                equal("{{1..10},braces}", ["(([1-9]|10)|braces)"]);
            });

            it("should expand multiple sets", () => {
                equal("a/{a,b}/{c,d}/e", ["a/(a|b)/(c|d)/e"]);
                equal("a{b,c}d{e,f}g", ["a(b|c)d(e|f)g"]);
                equal("a/{x,y}/c{d,e}f.{md,txt}", ["a/(x|y)/c(d|e)f.(md|txt)"]);
            });

            it("should expand nested sets", () => {
                equal("{a,b}{{a,b},a,b}", ["(a|b)((a|b)|a|b)"]);
                equal("a{b,c{d,e}f}g", ["a(b|c(d|e)f)g"]);
                equal("a{{x,y},z}b", ["a((x|y)|z)b"]);
                equal("f{x,y{g,z}}h", ["f(x|y(g|z))h"]);
                equal("a{b,c}{d,e}/hx/z", ["a(b|c)(d|e)/hx/z"]);
                equal("a{b,c{d,e},h}x/z", ["a(b|c(d|e)|h)x/z"]);
                equal("a{b,c{d,e},h}x{y,z}", ["a(b|c(d|e)|h)x(y|z)"]);
                equal("a{b,c{d,e},{f,g}h}x{y,z}", ["a(b|c(d|e)|(f|g)h)x(y|z)"]);
                equal("a-{b{d,e}}-c", ["a-{b(d|e)}-c"]);
            });

            it("should expand not modify non-brace characters", () => {
                equal("a/b/{d,e}/*.js", ["a/b/(d|e)/*.js"]);
                equal("a/**/c/{d,e}/f*.js", ["a/**/c/(d|e)/f*.js"]);
                equal("a/**/c/{d,e}/f*.{md,txt}", ["a/**/c/(d|e)/f*.(md|txt)"]);
            });
        });

        describe("commas", () => {
            it("should work with leading and trailing commas.", () => {
                equal("a{b,}c", ["a(b|)c"]);
                equal("a{,b}c", ["a(|b)c"]);
            });
        });

        describe("spaces", () => {
            it("should handle spaces", () => {
                equal("0{1..9} {10..20}", ["0([1-9]) (1[0-9]|20)"]);
                equal("a{ ,c{d, },h}x", ["a( |c(d| )|h)x"]);
                equal("a{ ,c{d, },h} ", ["a( |c(d| )|h) "]);

                // see https://github.com/jonschlinkert/microequal/issues/66
                equal("/Users/tobiasreich/Sites/aaa/bbb/ccc 2016/src/**/[^_]*.{html,ejs}", ["/Users/tobiasreich/Sites/aaa/bbb/ccc 2016/src/**/[^_]*.(html|ejs)"]);
            });
        });
    });

    /**
     * Ranges
     */

    describe("ranges", () => {
        describe("escaping / invalid ranges", () => {
            it("should not try to expand ranges with decimals", () => {
                equal("{1.1..2.1}", ["{1.1..2.1}"]);
                equal("{1.1..~2.1}", ["{1.1..~2.1}"]);
            });

            it("should escape invalid ranges:", () => {
                equal("{1..0f}", ["{1..0f}"]);
                equal("{1..10..ff}", ["{1..10..ff}"]);
                equal("{1..10.f}", ["{1..10.f}"]);
                equal("{1..10f}", ["{1..10f}"]);
                equal("{1..20..2f}", ["{1..20..2f}"]);
                equal("{1..20..f2}", ["{1..20..f2}"]);
                equal("{1..2f..2}", ["{1..2f..2}"]);
                equal("{1..ff..2}", ["{1..ff..2}"]);
                equal("{1..ff}", ["{1..ff}"]);
                equal("{1..f}", ["([1-f])"]);
                equal("{1.20..2}", ["{1.20..2}"]);
            });

            it("weirdly-formed brace expansions -- fixed in post-bash-3.1", () => {
                equal("a-{b{d,e}}-c", ["a-{b(d|e)}-c"]);
                equal("a-{bdef-{g,i}-c", ["a-{bdef-(g|i)-c"]);
            });

            it("should not expand quoted strings.", () => {
                equal('{"klklkl"}{1,2,3}', ["{klklkl}(1|2|3)"]);
                equal('{"x,x"}', ["{x,x}"]);
            });

            it("should escaped outer braces in nested non-sets", () => {
                equal("{a-{b,c,d}}", ["{a-(b|c|d)}"]);
                equal("{a,{a-{b,c,d}}}", ["(a|{a-(b|c|d)})"]);
            });

            it("should escape imbalanced braces", () => {
                equal("a-{bdef-{g,i}-c", ["a-{bdef-(g|i)-c"]);
                equal("abc{", ["abc{"]);
                equal("{abc{", ["{abc{"]);
                equal("{abc", ["{abc"]);
                equal("}abc", ["}abc"]);
                equal("ab{c", ["ab{c"]);
                equal("{{a,b}", ["{(a|b)"]);
                equal("{a,b}}", ["(a|b)}"]);
                equal("abcd{efgh", ["abcd{efgh"]);
                equal("a{b{c{d,e}f}g}h", ["a(b(c(d|e)f)g)h"]);
                equal("f{x,y{{g,z}}h}", ["f(x|y((g|z))h)"]);
                equal("z{a,b},c}d", ["z(a|b),c}d"]);
                equal("a{b{c{d,e}f{x,y{{g}h", ["a{b{c(d|e)f{x,y{{g}h"]);
                equal("f{x,y{{g}h", ["f{x,y{{g}h"]);
                equal("f{x,y{{g}}h", ["f{x,y{{g}}h"]);
                equal("a{b{c{d,e}f{x,y{}g}h", ["a{b{c(d|e)f(x|y{}g)h"]);
                equal("f{x,y{}g}h", ["f(x|y{}g)h"]);
                equal("z{a,b{,c}d", ["z{a,b(|c)d"]);
            });
        });

        describe("positive numeric ranges", () => {
            it("should expand numeric ranges", () => {
                equal("a{0..3}d", ["a([0-3])d"]);
                equal("x{10..1}y", ["x([1-9]|10)y"]);
                equal("x{3..3}y", ["x3y"]);
                equal("{1..10}", ["([1-9]|10)"]);
                equal("{1..3}", ["([1-3])"]);
                equal("{1..9}", ["([1-9])"]);
                equal("{10..1}", ["([1-9]|10)"]);
                equal("{10..1}y", ["([1-9]|10)y"]);
                equal("{3..3}", ["3"]);
                equal("{5..8}", ["([5-8])"]);
            });
        });

        describe("negative ranges", () => {
            it("should expand ranges with negative numbers", () => {
                equal("{-1..-10}", ["(-[1-9]|-10)"]);
                equal("{-10..-1}", ["(-[1-9]|-10)"]);
                equal("{-20..0}", ["(-[1-9]|-1[0-9]|-20|0)"]);
                equal("{0..-5}", ["(-[1-5]|0)"]);
                equal("{9..-4}", ["(-[1-4]|[0-9])"]);
            });
        });

        describe("alphabetical ranges", () => {
            it("should expand alphabetical ranges", () => {
                equal("0{1..9}/{10..20}", ["0([1-9])/(1[0-9]|20)"]);
                equal("0{a..d}0", ["0([a-d])0"]);
                equal("a/{b..d}/e", ["a/([b-d])/e"]);
                equal("{1..f}", ["([1-f])"]);
                equal("{a..A}", ["([A-a])"]);
                equal("{A..a}", ["([A-a])"]);
                equal("{a..e}", ["([a-e])"]);
                equal("{A..E}", ["([A-E])"]);
                equal("{a..f}", ["([a-f])"]);
                equal("{a..z}", ["([a-z])"]);
                equal("{E..A}", ["([A-E])"]);
                equal("{f..1}", ["([1-f])"]);
                equal("{f..a}", ["([a-f])"]);
                equal("{f..f}", ["f"]);
            });

            it("should expand multiple ranges:", () => {
                equal("a/{b..d}/e/{f..h}", ["a/([b-d])/e/([f-h])"]);
            });
        });

        describe("combo", () => {
            it("should expand numerical ranges - positive and negative", () => {
                equal("{-10..10}", ["(-[1-9]|-?10|[0-9])"]);
            });
        });

        // HEADS UP! If you're using the `--mm` flag minimatch freezes on these
        describe("large numbers", () => {
            it("should expand large numbers", () => {
                equal("{2147483645..2147483649}", ["(214748364[5-9])"]);
                equal("{214748364..2147483649}", ["(21474836[4-9]|2147483[7-9][0-9]|214748[4-9][0-9]{2}|214749[0-9]{3}|2147[5-9][0-9]{4}|214[89][0-9]{5}|21[5-9][0-9]{6}|2[2-9][0-9]{7}|[3-9][0-9]{8}|1[0-9]{9}|20[0-9]{8}|21[0-3][0-9]{7}|214[0-6][0-9]{6}|2147[0-3][0-9]{5}|21474[0-7][0-9]{4}|214748[0-2][0-9]{3}|2147483[0-5][0-9]{2}|21474836[0-4][0-9])"]);
            });
        });

        describe("steps > positive ranges", () => {
            it("should expand ranges using steps:", () => {
                equal("{1..10..1}", ["([1-9]|10)"]);
                equal("{1..10..2}", ["(1|3|5|7|9)"]);
                equal("{1..20..20}", ["1"]);
                equal("{1..20..20}", ["1"]);
                equal("{1..20..20}", ["1"]);
                equal("{1..20..2}", ["(1|3|5|7|9|11|13|15|17|19)"]);
                equal("{10..0..2}", ["(10|8|6|4|2|0)"]);
                equal("{10..1..2}", ["(10|8|6|4|2)"]);
                equal("{100..0..5}", ["(100|95|90|85|80|75|70|65|60|55|50|45|40|35|30|25|20|15|10|5|0)"]);
                equal("{2..10..1}", ["([2-9]|10)"]);
                equal("{2..10..2}", ["(2|4|6|8|10)"]);
                equal("{2..10..3}", ["(2|5|8)"]);
                equal("{a..z..2}", ["(a|c|e|g|i|k|m|o|q|s|u|w|y)"]);
            });

            it("should expand positive ranges with negative steps:", () => {
                equal("{10..0..-2}", ["(10|8|6|4|2|0)"]);
            });
        });

        describe("steps > negative ranges", () => {
            it("should expand negative ranges using steps:", () => {
                equal("{-1..-10..-2}", ["(-(1|3|5|7|9))"]);
                equal("{-1..-10..2}", ["(-(1|3|5|7|9))"]);
                equal("{-10..-2..2}", ["(-(10|8|6|4|2))"]);
                equal("{-2..-10..1}", ["(-[2-9]|-10)"]);
                equal("{-2..-10..2}", ["(-(2|4|6|8|10))"]);
                equal("{-2..-10..3}", ["(-(2|5|8))"]);
                equal("{-50..-0..5}", ["(0|-(50|45|40|35|30|25|20|15|10|5))"]);
                equal("{-9..9..3}", ["(0|3|6|9|-(9|6|3))"]);
                equal("{10..1..-2}", ["(10|8|6|4|2)"]);
                equal("{100..0..-5}", ["(100|95|90|85|80|75|70|65|60|55|50|45|40|35|30|25|20|15|10|5|0)"]);
            });
        });

        describe("steps > alphabetical ranges", () => {
            it("should expand alpha ranges with steps", () => {
                equal("{a..e..2}", ["(a|c|e)"]);
                equal("{E..A..2}", ["(E|C|A)"]);
                equal("{a..z}", ["([a-z])"]);
                equal("{a..z..2}", ["(a|c|e|g|i|k|m|o|q|s|u|w|y)"]);
                equal("{z..a..-2}", ["(z|x|v|t|r|p|n|l|j|h|f|d|b)"]);
            });

            it("should expand alpha ranges with negative steps", () => {
                equal("{z..a..-2}", ["(z|x|v|t|r|p|n|l|j|h|f|d|b)"]);
            });
        });

        describe("padding", () => {
            const isMatch = (str, pattern) => braces.makeRe(pattern).test(str);

            it("should handled padded ranges", () => {
                // 1..5
                assert(!isMatch("1", "{001..005}"));
                assert(!isMatch("2", "{001..005}"));
                assert(!isMatch("3", "{001..005}"));
                assert(!isMatch("4", "{001..005}"));
                assert(!isMatch("5", "{001..005}"));

                assert(isMatch("001", "{001..005}"));
                assert(isMatch("002", "{001..005}"));
                assert(isMatch("003", "{001..005}"));
                assert(isMatch("004", "{001..005}"));
                assert(isMatch("005", "{001..005}"));

                // 1..100
                assert(!isMatch("01", "{001..100}"));
                assert(!isMatch("10", "{001..100}"));
                assert(!isMatch("99", "{001..100}"));
                assert(isMatch("001", "{001..100}"));
                assert(isMatch("010", "{001..100}"));
                assert(isMatch("099", "{001..100}"));
                assert(isMatch("100", "{001..100}"));

                // -001..100
                assert(!isMatch("01", "{-0100..100}"));
                assert(!isMatch("10", "{-0100..100}"));
                assert(!isMatch("99", "{-0100..100}"));
                assert(isMatch("-01", "{-0100..100}"));
                assert(isMatch("-010", "{-0100..100}"));
                assert(isMatch("-100", "{-0100..100}"));
                assert(isMatch("-099", "{-0100..100}"));
                assert(isMatch("100", "{-0100..100}"));
                assert(isMatch("001", "{-0100..100}"));
                assert(isMatch("010", "{-0100..100}"));
                assert(isMatch("099", "{-0100..100}"));
                assert(isMatch("100", "{-0100..100}"));

                assert(!isMatch("100", "{-001..-100}"));
                assert(!isMatch("001", "{-001..-100}"));
                assert(!isMatch("010", "{-001..-100}"));
                assert(!isMatch("099", "{-001..-100}"));
                assert(!isMatch("100", "{-001..-100}"));
                assert(isMatch("-1", "{-001..-100}"));
                assert(isMatch("-001", "{-001..-100}"));
                assert(isMatch("-01", "{-001..-100}"));
                assert(isMatch("-010", "{-001..-100}"));
                assert(isMatch("-100", "{-001..-100}"));
                assert(isMatch("-099", "{-001..-100}"));
            });

            it("unwanted zero-padding -- fixed post-bash-4.0", () => {
                equal("{10..0..2}", ["(10|8|6|4|2|0)"]);
                equal("{10..0..-2}", ["(10|8|6|4|2|0)"]);
                equal("{-50..-0..5}", ["(0|-(50|45|40|35|30|25|20|15|10|5))"]);
            });
        });
    });

    describe("integration", () => {
        it("should work with dots in file paths", () => {
            equal("../{1..3}/../foo", ["../([1-3])/../foo"]);
            equal("../{2..10..2}/../foo", ["../(2|4|6|8|10)/../foo"]);
            equal("../{1..3}/../{a,b,c}/foo", ["../([1-3])/../(a|b|c)/foo"]);
            equal("./{a..z..3}/", ["./(a|d|g|j|m|p|s|v|y)/"]);
            equal('./{"x,y"}/{a..z..3}/', ["./{x,y}/(a|d|g|j|m|p|s|v|y)/"]);
        });

        it("should expand a complex combination of ranges and sets:", () => {
            equal("a/{x,y}/{1..5}c{d,e}f.{md,txt}", ["a/(x|y)/([1-5])c(d|e)f.(md|txt)"]);
        });

        it("should expand complex sets and ranges in `bash` mode:", () => {
            equal("a/{x,{1..5},y}/c{d}e", ["a/(x|([1-5])|y)/c{d}e"]);
        });
    });
});
