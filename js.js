const { triggerAsyncId } = require("async_hooks");

const documents = [
  "movjeajro rlkunlt lqxqgw flezehi dujy seabdhnv rv leryqljelw cpo jienje yrulanhxr ilqmmp kib",
  "ipqpxxz uigvpmaiq foyuqi tx nnn cicshtzzt tep sakzfec rvjyq yhlyub dhvxhxrt ay yoj umgwdat",
  "yzbn heexygsjw kqyeghdjq sdxcgkr cttrjwe ipqpxxz vz plfe dimic dhvxhxrt wajbvn ybxwpjloe qlqdkj",
  "ec plc rbivh xgywaxx enxxgjr ctgjrpqxc dhozctuqr yj mxdsyh qjjsn nocdkcuq pwajsseg hwrknuqp",
  "ntaoef xcwptu fva lap yicqgslhl tizizkth vv fza feuk phrpseko qwsho oioy zkcfv krgzivey guxiwyhmz",
  "rjmad fveiip spiho jienje yx lzuizpj rtuvcl li aor yzgowtnujr ca flt qkekiitnu eruzghyke atsqqz",
  "lgcy krk ujbjdhrx eo dkqhwqif laspacj pn dqtadlknk fhvacdc eqqzrrnzoq yfm sgyvwk sgyvwk vrxrlg",
  "idtfwxkqlu damg zquc ibalokmnqf xraghkdgf spiho uquyc wj aqdtljw vw jxgpqlvt klmkarquv ya bwiry",
  "fza dlkanyoxn qkekiitnu neftgfa hbmypptk pqv uso kqjrtu rgehkwkz pobzmjpgl eewywrdh vftaf nopw",
  "vfjabhs hmifg cxuzliah nnv vydtpq oyu rke eneo dbbnc occteh ovixjjuceb akjmcpoee ms nueamfz",
  "obctolpc mkx iu xfmqbpim qtp baunmdgp gsofehzo wvmtlbwnpm avuywigbua aikulmyn cwhcii gkn bvjbpp",
  "zzmy zrnru pn ftym plc xiryl jmhw dgaqv zjbcm vbib pftkh dvzp nfxohhchpl akdid zh hiablma spiho",
  "dhozctuqr iewrrmj ag mpbzeu xtskozhu lb lkgp sinyaiaaf qkekiitnu xuubyasn mug cojkf lghvih",
  "tifaut uqukcjwp qtp vyw kvpwxmjdm zv zzkd jviwd ggcrljk xulfcxafyp dkmpoj us ekbqwjherh lsb",
  "yicqgslhl nopw sgyk wkbzgtb ecw fplv xulfcxafyp jdug bxu iyspbt zupyuneyjb yx ienlick slofmpp",
  "mpfilo ca vpomyz nu wnr loms zzkd gajvz htmrjpu ml dkqhwqif dgaqv nhzfftba ddfg hmifg jwtlrkjp",
  "hpngruzsr mug ofqjder opognn jo cqs rrhdwxj dg niks dqvhxuvm urxnc raveulljy rofkmeya zbajubxkt",
  "leqk oioy pzkaxb qkekiitnu eewywrdh jihckt xiqggj dvzp opognn tslj jviwd bzdcnjnkir omm zjbcm",
  "bdvuwafyxu cjvta umgwdat yx qkeplgriaw ocxmotywwx yyqdrxniyc nef hsh lvwdtgv mfhtkqnjoe kfdhpg",
  "rywb uqukcjwp wczxklfxtl axx xxexi zhcygrlrol qwrnrzj mpunlfxgzj drglt bzdcnjnkir xraghkdgf",
  "lbxwljvo zfysbyhmx li ygggmsbueu nrptsmi yd pojo urxnc lghvih oxhvjclbc iw ddfg fplv plc ekbqwjherh",
  "mtewbtunc ahvflcf gcb cdvoscb zrnru vpomyz kr rclx ovixjjuceb ldxhg ydydf krqejipm vq mfitmlq",
  "urklqk xiryl mxdsyh fmwvp ka ne lpw sdxcgkr xgywaxx eqgqmfcj rtgmv akdid tgzusr ecoyq fmwvp",
  "eg brjcfjqxf vr wubb vdyqe orovhyputk xkecwtyd uleeer leqk noy xiryl oausahwkv agnkir ms mpyvscx",
  "hau suhzxwibe sufxoxxtq mkx cwhcii ljgeah xraghkdgf pewwba tsdba xi vuoejkqsde irbeqzibvz fmgjk",
  "aor wagqnxs fqnm wijajwqt iz vyw vihowo sltserxk efvdnriqm qccjqfkc fza cc xzujpajue wubb plr",
  "upmpup jzkd uzmktt jyxja dawmc eptqm seabdhnv occteh fgxmxzizr eo rtgmv fr dwdgwmgn nda eviksice",
  "plr idyzfytjgx wcehiwin tgzusr al motiparp pr ret zupyuneyjb ixbsfdzp fpteleaiw bglixoivq mcldt",
  "mpunlfxgzj ydurrc xuvdlptqw qwrnrzj papfnwditi zo jwtlrkjp nagzm elwbrv ekqsdk hbmypptk gbyajf",
  "hpxgurovt ldqdtuqul cvznkctcof bknmlvj woxzyt dlcwdgsjoq osmzdoln dqvhxuvm pmdcofe ay bglixoivq",
  "ukwbobno oj ap yicqgslhl yzbn li nopw bxu al zfysbyhmx jyxja ajixkrenrc lambptpnu vrxrlg exfm",
  "qhwu rbf neftgfa iu pobzmjpgl flt wvqsgss gepnyb wkbzgtb ddnmem qqczuhqssz cgoewru oircjenm",
  "slm qwrnrzj jjzwqrqqu oebg ap xpnv qygiwqar ptaz ytr tchidjwj jienje jienje esz ukwbobno umzxqlro",
  "whdy stsgw fsvmkyam lambptpnu ret pzzb juwzivkv hgbnwy it ggcrljk rclx oyiih hcwiq dqvhxuvm",
  "gdbbpgdkuy tewrdq eu xcwptu shuq hwrknuqp cntfvtsvc nu muoscjnkb cdfvknmr pmdcofe lunvvv uqukcjwp",
  "ap yqaeajidau lqfievjah izzma gepnyb zwudge fswzygjnl kl iq qqlcgje twzzmv em xfimt kvpwxmjdm",
  "ukd rofkmeya zt wgdkb kzfmfcdcad tizizkth dhdogzbtgu occteh hhr bhui vqxznvi dbbnc cievkn pr",
  "wobrq qvrrsaeck jihckt ydydf zrnru npgjyaor gndyfdb jbs gkn nfxohhchpl lap ydydf zysxeoo twzzmv",
  "eyrd jymstxp zrlfehv jpxce xupuzvjm em qvrrsaeck lpw yyqdrxniyc nu mpunlfxgzj atsqqz wkbzgtb",
  "gbyajf kib pobzmjpgl mpyvscx jxmxopgcx rdp ycqzwte akdid ycqzwte ilvgwklzp jdvrzsywi aqdtljw",
  "jgqb wjcikjkuzj ienlick su mnsx cntfvtsvc bzoqyh vvcyspvkoi wagqnxs id sinyaiaaf nrptsmi pjezybw",
  "mtapbsfoyg akjmcpoee zquc zwudge jdug dhiaiu tbsvf shuq zvukdadova uobphcp ukwbobno wcsjcg",
  "eo bdwgdau npsl luul yp tep suhzxwibe ka vqxznvi nef dt ulbjcdinzz jymstxp dbbnc uqhpipqqz",
  "dqvhxuvm vzg pzzb gvtv wr xfcnrjq uobphcp qwrnrzj onzmcmcqed sqxgnyew hfkmrzhxv nqpc lb daboletz",
  "ysebckgiwp svu kvpwxmjdm wobrq fuhelubla zfysbyhmx epsjmpwdh hiablma onzmcmcqed frdfkt ms cc",
  "dhiaiu eyrd vrxrlg dhiaiu eptqm wbzwvfhxl hiqtemjtnd gwga jyrq sitzk dhozctuqr pftkh nweb gvtv",
  "lls eprqygwkzt aqdtljw ba otyp eznczcvzub lj qtovhrr ftsyjnke jxgpqlvt jgqb ib izfmxmhgz lambptpnu",
  "eo ka ye pftkh xa sltserxk lzuizpj npsl pwajsseg scaqrekrhh asdxzilr dlcwdgsjoq nnv gydeceh",
  "ahvflcf wejysvr kallo xgywaxx eklrr ozaxp jymstxp vd dvxpj llc wgdkb avuywigbua hn uquyc evs",
  "rdp ka qhwu fza gd ilvgwklzp isuhbqqqmn ikpbjmj jzkd dlkanyoxn chyn is uo bhorhq cxuzliah atsqqz",
  "pztea bzoqyh gndyfdb lopxhtob mkx cvej sjz elwbrv gkhr nvytwskda cttrjwe su xxqmwsdldq neftgfa",
  "pvjmhfpt lzvpy ug lu gbyajf gsohm hvldeumtlu leqk ht nvytwskda bzoqyh dvxpj uizw kzfmfcdcad",
  "qhwu bddvzm rlkunlt whgsrch jxgpqlvt qtovhrr ya plui ypskj nfxohhchpl cqs woipownvpa baunmdgp",
  "fmwvp lu pqwzpvhz ec cxyunar glwpl gnuvbknp elpae cdjvr cizsdnhk plc dnssnuqa ilvgwklzp trtg",
  "jwtlrkjp jxgpqlvt bgtmwq hcbad leqk vw ivuzxebf pqwzpvhz zv pzhadj nagzm jhgjfaiptq dox bsopwzr",
  "gd woug sw qhwu tueco urxnc eqgaqxtd ylzsllofym dqvhxuvm hiqtemjtnd dt uqhpipqqz puugc eptqm",
  "ggmj jdug ikpbjmj wgdkb zqm hshgpodp cw bmorjwlhwj fynprybuw zvwnpw fxfq lls sakzfec lap vusyr",
  "birxneujq lltsb wvb zbajubxkt iq whxstimtl jnjuovl fm remdxqgv yd qn dgovhso ddfg damg rdmr",
  "vihowo plque leryqljelw balt gkhr hlbojclnuw ftsyjnke ikpbjmj hjnmnyg epsjmpwdh fhhafkfeqq",
  "jmhw dkmpoj dfjjiai zv qqczuhqssz qccjqfkc mxdsyh hshgpodp bowwurnlo yvazo vyw cwhcii ntaoef",
  "esjhg osmzdoln us ps wri evs qqlcgje tgzusr noy bzoqyh lb yp lunvvv stwmqnh gndyfdb llc adg",
  "cicshtzzt vabmwnmhqi ffzujqmis hgbnwy mvv qkeplgriaw zfhrzux cvznkctcof enbhucy wczxklfxtl",
  "kl dvzp kqyeghdjq ilvgwklzp slm cizsdnhk fplv qqczuhqssz ef zxvhrfwts nfxohhchpl bjbbk ucieprczq",
  "sw glwpl vv woxzyt oj damg rdmr su bmorjwlhwj jkp wcsjcg remdxqgv iewrrmj lzuizpj jxgpqlvt",
  "jkskefpk foyuqi dk hpngruzsr lemrjydek nfxohhchpl mve wr topoyje mputapu zfhrzux drglt iyspbt",
  "vmlu ydltzrpum sthusc jmhw mhaceh wxnwup xihtnbfw pn hn slm ps thodtala pztea mputapu ygggmsbueu",
  "cz yoj jxgpqlvt uzfhubjg whxstimtl dt kfdhpg ukwbobno euns aor lrpcytiv ne bnnoi muoscjnkb",
  "vrxrlg rke pmyjmfuzn tj gsofehzo luhdnrhv hmifg fqqhdiz yrulanhxr al idtfwxkqlu uldomexlx cfkmeadlf",
  "ezpsnpmzo ycvpow remdxqgv obnhspuk wubb vv ht mkpvpat fmwvp eu xlufvgxwt su muoscjnkb dnssnuqa",
  "qtp tizizkth cizsdnhk dvzp puugc bhiitabsk bxkanu hnab jwcjdzj jviwd cjvta mfitmlq dal qvrfozn",
  "kt gklckol remdxqgv kyzazigm lbayv eqgqmfcj ytr plui ydydf su raew lrpcytiv urxnc vdyqe gsohm",
  "wgdkb hugyucdqiq brjcfjqxf ca cvznkctcof eptqm ap etuxh uiowrhdu jxmxopgcx knngfyd repu mxdsyh",
  "bhui fza edqg tifaut ggmj woxzyt mnsx bzdcnjnkir cz xfmqbpim dlkanyoxn nvytwskda yn ba dujy",
  "bhiitabsk yj vno zpagcrwte ucieprczq sqxgnyew ps tkxmfxk jwpqbfsh ktumwqqy hwrknuqp ddafy vgnbj",
  "lpw gfozlowmv lunvvv evs vyzpx zh juwzivkv cnyxrjym wqpaudztd uleeer myksx yyqdrxniyc oyu kcjjgcckq",
  "rgdxrgv uiowrhdu jyippauvu elpae kbscqgha dwdgwmgn ajsfw tx awurff eylmdiddc nto mxdquzln zwudge",
  "yqaeajidau es xzujpajue whdy gndyfdb wewrvdat hhvovmodkh ylzsllofym li sltserxk wczxklfxtl",
  "mpfilo xupuzvjm lunxgtcafv rke htmrjpu gpjsndnm jwpqbfsh bmnf rywb nagzm twnr vw edqg mpwithnoh",
  "yvazo nagzm ecoyq uizw jyrq jkskefpk gai gbyajf gvtv fza cntfvtsvc mcldt urxnc puugc qsym fr",
  "xmywwuy heexygsjw htmrjpu obnhspuk avld lyq javnddj wobrq yicqgslhl mpwithnoh ummzxkixtq wonhba",
  "qlqdkj cos vz dyleaohw gax fmgjk uwzzntpqui xchypg baunmdgp gnuvbknp bxkanu urxnc ukd wagqnxs",
  "leryqljelw jnjuovl kcjjgcckq mug imoqywualt vihowo nnn psoyzfgnpr fhvacdc zlatwbeb eqqzrrnzoq",
  "kfdhpg sinyaiaaf klmkarquv pitnrvffe llc lxkhkxozt fr iyspbt oyiih mxdsyh seabdhnv tbsvf szegro",
  "xi anh gpjsndnm ipqpxxz uizw dt zpscwoxwhi filtjei hfkmrzhxv uik em lgnxccdf molqzcsf balt",
  "occteh cb ntaoef cc mpezycdv uwx lrgl uakoqwou uk tmmjzm tanjarps lfqdvbevme damg jkskefpk",
  "mpunlfxgzj ybxwpjloe hwi hwi hcbad umgwdat rdp kfdhpg xyhqr ikcghtcbh vfjabhs plr kdi aor lap",
  "wgoitlhywn cc hbquywhkx mhaceh plfe wkbzgtb sitzk qqlo qqlcgje xi jnjuovl jxubokf chyn mioefijkl",
  "otyp juwzivkv ec ag pqv nbnngmql pztea hfkmrzhxv uijiixusn otyp jbs uljryj xa voolsxr ezpsnpmzo",
  "go kt zzkd uoh yzgowtnujr hpngruzsr id io plc niks jwcjdzj uwzzntpqui tewrdq bowwurnlo jwtlrkjp",
  "xgywaxx lpw xchypg cz seabdhnv zkx sw uwx ddnmem qlqdkj occteh us fynprybuw xtskozhu gw ahvflcf",
  "yeyd eprqygwkzt fza hshgpodp bhiitabsk aeqsslp dal ezg pgmewgazl xdkbjyag lunvvv vfunxfcbg",
  "oausahwkv etuxh rbxyhetkb rtgmv nvytwskda epsjmpwdh xihtnbfw ka li wzxslkvfbf hcbad wgoitlhywn",
  "scfdwioy wr cizsdnhk zzmy gmbvnn jkskefpk awbmdzxz rgdxrgv akdid mug xihtnbfw ggmj ozckezct",
  "jhgjfaiptq woug wcehiwin piqsfowg nef jo hxtkf ktumwqqy oactylfyyz szegro gajvz xmsjf yqaeajidau",
  "cos filtjei qkeplgriaw onzmcmcqed dimic osmzdoln cizsdnhk idyzfytjgx pobzmjpgl lunvvv jo agxpqs",
  "ljgeah mpwithnoh qdeu ypouwyqkj lrgl eqqzrrnzoq dujy imoqywualt yoj slm ppzrlhxcia sltserxk",
  "eruzghyke aeqsslp kjalnd czng dox mkx ph cttrjwe guxiwyhmz zysxeoo mwhvnz zkx oadnawdb bsu",
  "qaevslwrs bglixoivq yicqgslhl bkwsj ef opognn bfvv ykvdtld ozbehtl tueco enbhucy nocdkcuq rbxyhetkb",
  "msogvjpuep ogk bmorjwlhwj pgmewgazl ir lap vpomyz npgjyaor gwoa bkwsj bglixoivq sw krgzivey",
  "kib wubb htmrjpu pncn aqdtljw zhgshqir xa ppzrlhxcia flt xtskozhu obctolpc kfdhpg wobrq wcehiwin",
];
const queries = [
  "zzkd xoodvrwx jxf cvej lfqdvbevme fm nqpc mpunlfxgzj mkx pr eptqm atsqqz lap hbquywhkx fhvacdc",
  "chq glwpl dvzp vd szegro stwmqnh bxu hitxrqo uy utgqgeov dlkanyoxn wobrq nfxohhchpl zzkd plque",
  "wobrq gepnyb ayglmlof pqv htmrjpu muoscjnkb suhzxwibe youfws zfmjpn uo dgovhso dhdogzbtgu klmkarquv",
  "rvwpiy fr vpomyz eneo zh wgdkb gwoa dt fmwvp rscbnnlz qdeu bmorjwlhwj yq eu myksx go yyqdrxniyc",
  "bzoqyh jdvrzsywi niks suhzxwibe vv fvuulw eznczcvzub rtgmv faeow jxgpqlvt hlbojclnuw cwhcii",
  "pobzmjpgl lrpcytiv bhiitabsk tmmjzm uwzzntpqui yoj fmtnfxumqv nagzm bglixoivq xihtnbfw tanjarps",
  "fchfu gkhr mxdsyh nnv buelztp mxdsyh yfm cvznkctcof zv htmrjpu dkmpoj ucieprczq xgywaxx rel",
  "occteh jrgwohh hcbad ozbehtl raew vgnbj wcehiwin lunvvv dmght gsofehzo flezehi ka xmsjf vr",
  "dimic tbsvf eznczcvzub zrnru xfmqbpim slm vzh vv qtovhrr jxgpqlvt kvpwxmjdm twzzmv dkovy vr",
  "rofkmeya epsjmpwdh neftgfa ggmj ygggmsbueu yj kib wbzwvfhxl kfdhpg gbyajf hkp fplv pztea tizizkth",
  "jwtlrkjp jnjuovl dqtadlknk lambptpnu xpnv yp cievkn evs ahvflcf dwdgwmgn iw fynprybuw ka npybincsd",
  "jyrq jwtlrkjp ybxwpjloe hwgcnxw heexygsjw woug bzoqyh ukd jwtlrkjp vqxznvi zh bmorjwlhwj mvwvgm",
  "oqxetzzts qhwu ienlick ucujlax obctolpc myksx repu bhui leqk qlqdkj bxkanu plc mi oausahwkv",
  "guxiwyhmz ddfg jkskefpk slm xi dhvxhxrt fza nrptsmi cwhcii hxeg wubb rlkunlt ipqpxxz suhzxwibe",
  "bhiitabsk pn brjcfjqxf wzxslkvfbf hhr aesj odusl dhozctuqr htmrjpu ovixjjuceb wbzwvfhxl izmyybo",
  "nef nda zr slbcr dlcwdgsjoq rdp eneo gndyfdb cb ddfg lghvih fspfe jhgjfaiptq kqyeghdjq eklrr",
  "wlsn vusyr ybxwpjloe kteyqpi qi yd mvv cwhcii su qlqdkj pojo uobphcp kfdhpg ahvflcf cizsdnhk",
  "mpmea ucieprczq yhkynyyb toalmbe anh ydqc evpvaqz tizizkth rrhdwxj fpteleaiw cnyxrjym ilroap",
  "algkzrbpe fvlbakei woug glwpl nfxohhchpl dbbnc awbmdzxz nocdkcuq filtjei wkbzgtb zquc muoscjnkb",
  "ucieprczq kcjjgcckq cjvta ktumwqqy sgyk lzuizpj baunmdgp cxuzliah gdbbpgdkuy ddfg cb jviwd",
  "sdxcgkr xi hnab cos vv bsopwzr qlqdkj rk gajvz yeyd shuq dk brjcfjqxf ovrk ofnwljgjc pmdcofe",
  "sgyvwk cjvta urxnc wewrvdat flt kt mxzsuda evs lb dimic vdyqe utmelozlii ml jt nef wuhlqcmm",
  "uobphcp ggcrljk jxgpqlvt dox xiryl aefbzrcvd qwrnrzj nopw bddvzm uleeer wkbzgtb lxkhkxozt dqtadlknk",
  "yqftnh eyrd sp rb qdeu kdi bzoqyh ukwbobno dyrwgzkqs nfxohhchpl otyp rcb anh ylf nu occteh",
  "mhaceh li cz ooqfw osmzdoln odmvdvhih mtapbsfoyg cntfvtsvc ukd seabdhnv oj em lemrjydek yicqgslhl",
  "xihtnbfw uakoqwou gkn ykvdtld wcehiwin yfm javnddj filtjei dvzp zrnru onzmcmcqed glwpl yn zysxeoo",
  "jo nbmcos wijajwqt uqhpipqqz rrhdwxj rzrwbvce lap xiryl ca rgdxrgv lpw fxfq avuywigbua zwudge",
  "njflmt eprqygwkzt bwiry bglixoivq guxiwyhmz mpunlfxgzj jjjjdstwsv axx kl mpunlfxgzj damg gkn",
  "ap dtzzib myksx nvytwskda yj bgtmwq ka hpngruzsr lemrjydek cgt ienlick shuq plui hnab spiho",
  "lu lambptpnu dujy lemrjydek vrxrlg nvytwskda fza hiablma iu lxps myksx ozckezct oj pr qaevslwrs",
];

const RESULT_COUNTS = 5;

const buildSearchIndex = (documents) => {
  const searchIndex = new Map();
  for (let d = 0; d < documents.length; d++) {
    const words = documents[d].split(" ");
    for (const word of words) {
      const docMap = searchIndex.has(word) ? searchIndex.get(word) : new Map();
      docMap.set(d, (docMap.get(d) || 0) + 1);
      searchIndex.set(word, docMap);
    }
  }
  return searchIndex;
};

const findRelevantDocuments = (documents, queries) => {
  const searchIndex = buildSearchIndex(documents);
  const results = [];

  for (const query of queries) {
    const relevance = new Map();
    const uniqueQueryWords = Array.from(new Set(query.split(" ")));

    for (const word of uniqueQueryWords) {
      if (searchIndex.has(word)) {
        for (const [d, count] of searchIndex.get(word)) {
          relevance.set(d, (relevance.get(d) || 0) + count);
        }
      }
    }

    const entries = Array.from(relevance.entries());

    if (entries.length <= RESULT_COUNTS) {
      entries.sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0] - b[0];
      });
    } else {
      partialQuickSort(entries, RESULT_COUNTS, (a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0] - b[0];
      });
      entries.length = RESULT_COUNTS;
    }

    const top5 = entries.slice(0, RESULT_COUNTS).map(([d]) => d + 1);
    results.push(top5);
  }

  return results;
};

function partialQuickSort(arr, k, compare, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const pivotIndex = randomPartition(arr, left, right, compare);

  partialQuickSort(arr, k, compare, left, pivotIndex - 1);

  if (pivotIndex < k - 1) {
    partialQuickSort(arr, k, compare, pivotIndex + 1, right);
  }
}

function randomPartition(arr, left, right, compare) {
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
console.log(findRelevantDocuments(documents, queries));
