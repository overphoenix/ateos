describe("math", "Decimal", function () {
    const {
        Decimal,
        assertEqual
    } = this;

    it("sin", () => {

        const t = (n, pr, rm, expected) => {
            Decimal.precision = pr;
            Decimal.rounding = rm;
            assertEqual(expected, new Decimal(n).sin().valueOf());
        };

        Decimal.config({
            precision: 40,
            rounding: 4,
            toExpNeg: -9e15,
            toExpPos: 9e15,
            minE: -9e15,
            maxE: 9e15
        });

        t("NaN", 40, 4, "NaN");
        t("0", 20, 4, "0");
        t("-0", 20, 4, "-0");
        t("Infinity", 40, 4, "NaN");
        t("-Infinity", 40, 4, "NaN");

        t("93332358216", 48, 5, "0.000816283943127306029649893248669685836695194145277");
        t("766737078569022420173292205068953186848344673451240027655054631094318050", 18, 6, "0.00111135055272494455");

        t("0.359136383962093189473162700700590970518456985109181875257764726415814563424613193774806585890478208084275468196568294033", 38, 1, "0.35146584650000000000000000000000000006");
        t("3202222222227222222222222222222224222222222222222222222222.222222222222222222222222222", 7, 0, "0.5499568");
        t("8", 5, 6, "0.98936");
        t("0.15865555", 6, 0, "0.157991");
        t("4.752", 5, 5, "-0.99922");
        t("82315980453524767298085693995239044972", 5, 6, "0.18971");
        t("9975666666", 10, 4, "-0.1932244457");
        t("8111111111111111222222222222222.1118", 8, 4, "0.93383768");
        t("1582389099446045988.444444444164077777777777777777", 3, 5, "0.145");
        t("42.29499991999999919999999919", 2, 5, "-0.99");
        t("2", 3, 1, "0.909");
        t("225204831071708162873414430801935442203", 3, 4, "-0.367");
        t("70387777777777777777", 6, 6, "-0.903662");
        t("0.000009960105486531367489163480390414384530151948706557615588133070855712559603", 5, 3, "0.0000099601");
        t("2.3", 1, 5, "0.7");
        t("0.0369897655941305860082440964", 1, 0, "0.04");
        t("93333333333.1111111113333335607254506018497853948241554833333333", 1, 4, "1");
        t("0.81475726", 10, 2, "0.7275590895");
        t("0.0020719", 5, 2, "0.0020719");
        t("0.822309454290117043180146453820530722", 3, 2, "0.733");
        t("811801481366184919659088.161679696898591", 8, 0, "-0.33739172");
        t("82222222239", 6, 1, "0.85357");
        t("0.671515352458", 4, 1, "0.6221");
        t("0.1", 10, 2, "0.09983341665");
        t("30.4507", 5, 0, "-0.82218");
        t("82539", 1, 6, "0.06");
        t("7904297312438003184", 8, 1, "0.88548151");
        t("1555591677261255189013625216076301609467761280", 4, 4, "0.6012");
        t("0.206", 5, 0, "0.20455");
        t("47.85", 4, 3, "-0.664");
        t("354522", 6, 0, "-0.432959");
        t("57111.555555555551111", 9, 1, "-0.51645502");
        t("5084117035723528870966332457.91693481159599044107", 10, 0, "0.5456651665");
        t("66", 3, 2, "-0.0265");
        t("4415133931290705273393593393689.69701970681754754956578240920056", 3, 4, "0.651");
        t("4641", 4, 1, "-0.7628");
        t("60782.222222", 3, 0, "-0.967");
        t("9295.7", 4, 1, "0.2692");
        t("660060.8", 5, 6, "-0.3736");
        t("86", 7, 0, "-0.9234585");
        t("0.867224365334893476015547423881141062327495194226274166759019810427983958472019", 7, 0, "0.7625362");
        t("35", 9, 4, "-0.428182669");
        t("6.4522", 4, 2, "0.1683");
        t("74298341154961724283464838063126436742467617925325544", 6, 5, "0.381838");
        t("98.9", 1, 3, "-1");
        t("8719985534823285.8450271997", 5, 4, "-0.43915");
        t("0.9528405", 9, 0, "0.815064492");
        t("3007.440843", 1, 3, "-0.9");
        t("8821000", 9, 3, "-0.999820738");
        t("0.7244", 2, 5, "0.66");
        t("223798525254185007541841321707204622.59819179923", 16, 1, "0.7304638404669184");
        t("29832077939805655500490926756388", 31, 5, "0.9999881003434971787558628446047");
        t("13555555555555.00000000000000000472565", 49, 1, "0.6767787926553990715415556952412713237217924208783");
        t("899998709983400169781485597598985275361858454653904477166", 80, 0, "-0.9619682988852763093696947825524296540074948329137260856105387448568258894882118");
        t("39826881720735191122621609200399853", 63, 6, "0.808868299975611790138921415253062939870563699821120858587818528");
        t("0.005341982048471623278003226810889859381173803701969742990587783072822", 70, 4, "0.005341956641353734027312587021500975661701907307617983686735841700502311");
        t("277.9997777777777716692059399741498679999", 30, 6, "0.999514190524582708045097875864");
        t("61429536536284373.1373681766492167", 72, 0, "-0.987289391477952440400357263926723647295916567423922849613191038848150249");
        t("7499999999909999997.909999999999", 71, 4, "0.34301339416705489181513042461845425762147177499632116466434976820897798");
        t("349999995999999999939992999.92", 78, 4, "0.470719374558628137654141208065693026899676258865423797523069796274766223234845");
        t("44510000000002060000000000000000.0200000008", 20, 5, "0.94842545081726504808");
        t("62222222222293973777.555555555555577777777777", 20, 1, "0.97474440584787996681");
        t("0.00000075952439582097539633", 49, 6, "0.0000007595243958209023709318824206298992320090760083707");
        t("6466917226846635097989717000204.490981137498768", 23, 6, "-0.5067890798594245927272");
        t("90000000000000007122", 12, 0, "-0.953061948465");
        t("0.422029137363394323", 22, 5, "0.4096123952171808560627");
        t("818.843", 70, 1, "0.8968883045810930941510638401062405075664719019866066309176929107557629");
        t("30000000000000000200000000000003000000000000005.0000009", 50, 2, "-0.12313481713171373142907951990491671356466363502241");
        t("975675853314022371079225", 48, 5, "0.880137190184686438889125592539968640170534430859");
        t("0.00000066558889026", 77, 6, "0.00000066558889025995085640282676346670712623242127613563915036627009080674622220984");
        t("69299999.9999999999999", 46, 5, "-0.3462252058608000475638742067375334366431550575");
        t("8111111111267488711.9286432453434826269588597", 62, 4, "-0.99113853372157352283292183868051054140090305817866106070973511");
        t("82", 71, 0, "0.31322878243308515263353199729481870255069002611658346075413062493460387");
        t("488826170909042284127242210428971", 76, 6, "0.8995289099301142050732477297866877720021805553317366849920338096104233105207");
        t("9092229227242222522222222222.66", 18, 0, "-0.935465793019682237");
        t("5805959970379373082098495883210891370.0067111", 46, 6, "0.2201197700332631564419599177639647998475543596");
        t("926600000000000000590", 41, 2, "0.81228550764810620054247659502626219692234");
        t("619490746366110587736593084360", 65, 1, "0.21194121003724604936564767272815880572843184525364715905320674006");
        t("5473424", 25, 0, "0.09262060997310434002923837");
        t("5666666666666666666666666666666666666666666666616666626.6666", 87, 4, "-0.977239495645491722400759456250446932597508047794151805593705662875402907345001472700784");
        t("499999.99999899999999999999999999999999999", 78, 5, "0.177832185579176104658571003320627225266903968719990210539163985433843099469721");
        t("900000", 117, 3, "0.316282026370992050734738815532587276379228020456998295610327862506624971973233544404550831654146703508761520381016242");
        t("83027766684462236825322.62114650623171519639122521318", 12, 4, "-0.476316326483");
        t("925910897623", 129, 5, "0.792868652237225000804927754028414838623611710010734993138551247754919869022556217868513568705036768423332287103460206126685907362");
        t("2918961308828646648994639730677467564302490828837720043486456401538236854705425586479512418277497121841759061091363", 23, 0, "-0.80586906475943044297492");
        t("800000000000000", 13, 2, "0.9931677199759");
        t("18400003.16100000000000032", 8, 6, "0.27307495");
        t("99.999999999999999999999999999999999999999999999993", 63, 4, "-0.506365641109758793656557610459785432065032721296693555549406261");
        t("20694757397464803355324887435556580472151471", 24, 6, "-0.0958707304545699270391254");
        t("333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333.33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333335", 171, 3, "0.999861104212610844432827649084650490692662683912806434297051730891484017620891490814751729807506108594451118885277110368312661669230716203945478379798471281336247356157603");
        t("22011131111011111.111111611113111111111151111111", 143, 2, "0.82582504036277799386306063085803210583251158969990606609364360685569588545519071481543672724620118406694191888115120286393881609546697317692404");
        t("996270725099515169352424536636186062915113219400094989.8763797268889422850038402633796294758036260533902551191769915343780424028900449342752548782035", 46, 2, "0.6613706114081017074779805460666900787572253475");
        t("0.780360750628373", 37, 5, "0.7035358359376557390803090830882458906");
    });
});
