import { TimelineItem, TreatyDetail, StrategicLocation, QuizQuestion } from '../types';

export const USER_PROMPT_SNIPPET = 
  "Si njëri prej djemëve të familjes fisnike të Kastriotëve, ai u rrëmbye në moshën 9 vjecare nga perandoria Osmane dhe u dërgua në oborrin e saj. Fëmijëria e tij kaloi me sfida duke i mbijetuar politikave dhe intrigave të oborrit osman, dhe duke u arsimuar. Njohur për ekselencën dhe zgjuarsinë e tij ai më pas hyri në shërbim të Sulltanit për njëzet vitet e ardhshme. U ngrit sipas gradave duke u bërë deri Sanxhakbej i Sanxhakut të Dibrës në vitin 1440. Më 1443, pas një planifikimi të gjatë dhe mbledhjes së djemve të tjerë bashkëkombas dezertoi ushtrinë osmane gjatë betejës së Nishit dhe u bë sundimtar i Krujës, në një territor nga Petrela deri në Modriç. Në vitin 1444, ai themeloi Lidhjen e Lezhës me mbështetjen e fisnikërisë së kohës.\n\nNë vitin 1451, Skënderbeu nënshkroi traktatin e Gaetës, ku njohu sovranitetin de jure të Mbretërisë së Napolit mbi Arbërinë, duke siguruar një aleancë mbrojtëse, edhe pse mbeti një sundimtar i pavarur. Në vitet 1460–61 mbështeti Ferdinandin I të Napolit në luftërat kundër Gjonit II të Anzhuinëve. Në vitin 1463 u bë komandanti kryesor i forcave kryqtare të papa Piut II, por papa vdiq ndërsa ushtritë ende po mblidheshin. Së bashku me venedikasit luftoi kundër osmanëve gjatë Luftës osmano–venedikase të viteve 1463–79, deri në vdekjen e tij më 17 janar 1468.";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'femijeria',
    year: '1405–1423',
    exactDate: 'rr. 6 Maj 1405',
    title: 'Familja Fisnike e Kastriotëve & Rrëmbimi',
    subtitle: 'Nga princi i Matit e Dibrës në peng të oborrit osman',
    category: 'rinia',
    badge: 'Oborri Osman & Devshirme',
    location: 'Sina / Mat -> Edrene (Adrianopojë)',
    keyFigures: ['Gjon Kastrioti (Babai)', 'Vojsava Tripalda (Nëna)', 'Sulltan Murati II'],
    promptExcerpt: 'Si njëri prej djemëve të familjes fisnike të Kastriotëve, ai u rrëmbye në moshën 9 vjecare nga perandoria Osmane dhe u dërgua në oborrin e saj.',
    description: 'Lindur si djali i vogël i Gjon Kastriotit, sundimtar i shquar i Arbërisë qendrore, Gjergji u mor si peng lufte (içogllan) në moshën 9-vjeçare në Edrene për të garantuar nënshtrimin politik të familjes.',
    historicalDetail: 'Në oborrin e sulltanit mori emrin mysliman Iskender (Aleksandër, sipas Aleksandrit të Madh) dhe titullin Bej. Mbijetoi intrigat e ashpra të oborrit, mësoi gjuhët e Lindjes dhe të Perëndimit, teorinë ushtarake, diplomacinë dhe artin e kalorësisë, duke fituar reputacion të jashtëzakonshëm.',
    significance: 'Përvetësimi i thellë i taktikave, psikologjisë dhe dobësive të ushtrisë osmane që më pas do të mundësonin mbrojtjen 25-vjeçare të Arbërisë.'
  },
  {
    id: 'sherbimi-dibra',
    year: '1423–1443',
    exactDate: '1440',
    title: '20 Vitet në Shërbim & Sanxhakbej i Dibrës',
    subtitle: 'Ngritja ushtarake dhe besnikëria e fshehur ndaj vendlindjes',
    category: 'rinia',
    badge: 'Sanxhakbej i Dibrës',
    location: 'Anadoll, Rumeli & Sanxhaku i Dibrës',
    keyFigures: ['Sulltan Murati II', 'Hamza Kastrioti'],
    promptExcerpt: 'Njohur për ekselencën dhe zgjuarsinë e tij ai më pas hyri në shërbim të Sulltanit për njëzet vitet e ardhshme. U ngrit sipas gradave duke u bërë deri Sanxhakbej i Sanxhakut të Dibrës në vitin 1440.',
    description: 'Për dy dekada, Skënderbeu komandoi njësi kalorësie në fushata të vështira në Anadoll dhe Rumeli. Për shkak të trimërisë dhe inteligjencës taktike, në vitin 1440 u emërua Sanxhakbej i Dibrës.',
    historicalDetail: 'Kjo pozitë e afroi me territoret e të atit dhe fisnikët vendas. Gjatë kësaj kohe krijoi rrjetin e fshehtë me të rinjtë bashkëkombas dhe përgatiti në heshtje çastin vendimtar për t\'u kthyer në tokën mëmë.',
    significance: 'Njohja e hollësishme e terrenit të thyer të Dibrës dhe Matit u bë bastioni ku më vonë do të thyheshin hordhitë e pafundme osmane.'
  },
  {
    id: 'nishi-kruja',
    year: '1443',
    exactDate: '3–28 Nëntor 1443',
    title: 'Beteja e Nishit & Çlirimi i Krujës',
    subtitle: 'Dezertimi strategjik dhe flamuri kuq e zi në bedenat e Krujës',
    category: 'kryengritja',
    badge: 'Kthimi në Krujë',
    location: 'Nish -> Dibër -> Krujë (Petrelë deri në Modriç)',
    keyFigures: ['Skënderbeu', 'Janosh Huniadi', '300 Kalorës Arbërorë'],
    promptExcerpt: 'Më 1443, pas një planifikimi të gjatë dhe mbledhjes së djemve të tjerë bashkëkombas dezertoi ushtrinë osmane gjatë betejës së Nishit dhe u bë sundimtar i Krujës, në një territor nga Petrela deri në Modriç.',
    description: 'Gjatë përplasjes midis trupave osmane dhe koalicionit të krishterë të udhëhequr nga Janosh Huniadi në Nish, Skënderbeu realizoi planin e përgatitur me kujdes. Bashkë me 300 kalorës besnikë braktisi fushëbetejën.',
    historicalDetail: 'Me një ferman të siguruar nga shkruesi i sulltanit, marshoi drejt Krujës. Më 28 Nëntor 1443 hyri triumfalisht në kështjellë, ngriti flamurin me shqiponjën dykrenare të Kastriotëve dhe deklaroi fjalët e pavdekshme: "Lirinë nuk ua solla unë, por e gjeta këtu në mesin tuaj!". Menjëherë çliroi kështjellat nga Petrela deri në Modriç.',
    significance: 'Fillimi i kryengritjes së madhe arbërore dhe kthimi i Krujës në simbolin e pathyeshëm të mbrojtjes së krishterimit evropian.'
  },
  {
    id: 'lidhja-lezhes',
    year: '1444',
    exactDate: '2 Mars 1444',
    title: 'Besëlidhja e Lezhës (Kuvendi i Parë Kombëtar)',
    subtitle: 'Bashkimi politik dhe ushtarak i fisnikërisë arbërore',
    category: 'kryengritja',
    badge: 'Lidhja e Lezhës',
    location: 'Katedralja e Shën Nikollës, Lezhë',
    keyFigures: ['Gjergj Arianiti', 'Andrea Topia', 'Gjergj Stres Balsha', 'Lekë Zaharia', 'Pal Dukagjini', 'Pjetër Spani'],
    promptExcerpt: 'Në vitin 1444, ai themeloi Lidhjen e Lezhës me mbështetjen e fisnikërisë së kohës.',
    description: 'Nën nismën e Skënderbeut dhe në territor venedikas neutral, fisnikët më me zë të Arbërisë dhe Epirit u mblodhën në Lezhë për të bashkuar forcat përballë rrezikut ekzistencial osman.',
    historicalDetail: 'Kuvendi krijoi një konfederatë politiko-ushtarake me arkë të përbashkët lufte (kuotat e princërve) dhe zgjodhi unanimisht Skënderbeun si "Kryekapidan të Ushtrisë së Lidhjes". Ishte hera e parë në histori që arbërorët bashkoheshin nën një komandë supreme.',
    significance: 'Themelet e shtetit të organizuar të Arbërisë dhe shembulli i hershëm i parlamentarizmit dhe koalicionit evropian.'
  },
  {
    id: 'traktati-gaetes',
    year: '1451',
    exactDate: '26 Mars 1451',
    title: 'Traktati i Gaetës me Mbretërinë e Napolit',
    subtitle: 'Marrëveshja gjeopolitike me Alfonsin V të Aragonit',
    category: 'diplomacia',
    badge: 'Aleancë Strategjike',
    location: 'Gaetë, Mbretëria e Napolit',
    keyFigures: ['Skënderbeu (përfaqësuar nga Peshkopi Stefan & Nikollë de Berguçi)', 'Mbreti Alfons V i Aragonit'],
    promptExcerpt: 'Në vitin 1451, Skënderbeu nënshkroi traktatin e Gaetës, ku njohu sovranitetin de jure të Mbretërisë së Napolit mbi Arbërinë, duke siguruar një aleancë mbrojtëse, edhe pse mbeti një sundimtar i pavarur.',
    description: 'Pas Rrethimit të Parë dramatik të Krujës (1450) nga Murati II, Skënderbeu kërkoi një aleat të fuqishëm me flotë detare dhe burime financiare. Ai zgjodhi Alfonsin V të Aragonit e Napolit.',
    historicalDetail: 'Sipas traktatit, Skënderbeu njihte sovranitetin formal (de jure) të Napolit mbi Arbërinë, ndërsa në realitet (de facto) mbeti sovran i paprekur dhe sundimtar absolut i tokave të veta. Në këmbim, Napoli dërgoi trupa garnizoni, armë zjarri, topa, barut, drithë dhe subvencione vjetore financiare.',
    significance: 'Siguroi furnizimet jetike për Krujën dhe e lidhi kauzën arbërore me fuqinë më të madhe perëndimore në Mesdheun perëndimor.'
  },
  {
    id: 'ekspedita-itali',
    year: '1460–1461',
    exactDate: 'Gusht 1460 – Janar 1462',
    title: 'Ekspedita Ushtarake në Itali & Shpëtimi i Ferrantes',
    subtitle: 'Mbështetja vendimtare për Ferdinandin I kundër Anzhuinëve',
    category: 'betejat',
    badge: 'Ekspedita në Pulje',
    location: 'Puglia, Barletta, Trani, Troia (Itali Jugore)',
    keyFigures: ['Skënderbeu', 'Ferdinandi I i Napolit (Ferrante)', 'Gjoni II i Anzhuinëve', 'Giacomo Piccinino'],
    promptExcerpt: 'Në vitet 1460–61 mbështeti Ferdinandin I të Napolit në luftërat kundër Gjonit II të Anzhuinëve.',
    description: 'Pas vdekjes së Alfonsit V, i biri Ferdinandi I (Ferrante) rrezikonte të humbiste fronin përballë pushtimit të Gjonit të Anzhusë dhe princave rebelë napolitanë. Në shenjë mirënjohjeje ndaj paktit të Gaetës, Skënderbeu u hodh me ushtrinë përtej Adriatikut.',
    historicalDetail: 'Me 3,000 kalorës e këmbësorë arbërorë, Skënderbeu theu rrethimin e Barletës, zhvilloi beteja të suksesshme në Trani dhe në Troia (Gusht 1462), duke asgjësuar kërcënimin anzhuin. Ferrante i shprehu mirënjohje të përjetshme duke i dhuruar feudet e Monte Sant\'Angelo dhe San Giovanni Rotondo në Gargano.',
    significance: 'Dëshmi e pjekurisë së lartë ushtarake të Skënderbeut në fushë të hapur jashtë Arbërisë dhe konsolidimi i aleancës së përjetshme me Napolin.'
  },
  {
    id: 'kryqezata-piut',
    year: '1463',
    exactDate: 'Vjeshtë 1463',
    title: 'Kryekomandant i Kryqëzatës së Papa Piut II',
    subtitle: 'Projekti madhor i Selisë së Shenjtë për çlirimin e Ballkanit',
    category: 'diplomacia',
    badge: 'Athleta Christi',
    location: 'Romë -> Ankona -> Lezhë',
    keyFigures: ['Papa Piu II (Enea Silvio Piccolomini)', 'Skënderbeu', 'Cristoforo Moro (Doxhi i Venedikut)'],
    promptExcerpt: 'Në vitin 1463 u bë komandanti kryesor i forcave kryqtare të papa Piut II, por papa vdiq ndërsa ushtritë ende po mblidheshin.',
    description: 'Papa Piu II, i tronditur nga rënia e Kostandinopojës (1453), shpalli një kryqëzatë mbarë-evropiane kundër Perandorisë Osmane. Duke njohur gjeninë ushtarake të heroit arbëror, Papa e shpalli Skënderbeun Kryekomandant Suprem (Capitaneus Generalis) të të gjitha forcave kryqtare.',
    historicalDetail: 'Flota dhe trupat po mblidheshin në portin e Ankonës. Papa vetë udhëtoi atje për të bekuar ekspeditën, por u sëmur rëndë dhe ndërroi jetë më 14 Gusht 1464. Me vdekjen e papës, koalicioni evropian u shpërbë, duke e lënë Skënderbeun të përballej i vetëm me fuqinë e Mehmetit II.',
    significance: 'Njohja më e lartë evropiane e figurës së Skënderbeut si strategu ushtarak më i respektuar i botës së krishterë.'
  },
  {
    id: 'lufta-venediku-vdekja',
    year: '1463–1468',
    exactDate: '17 Janar 1468',
    title: 'Lufta Osmano-Venedikase & Pavdekësia e Heroit',
    subtitle: 'Qëndresa e fundit, rrethimet e Mehmetit II dhe trashëgimia e përjetshme',
    category: 'trashegimia',
    badge: 'Betejat Përfundimtare',
    location: 'Krujë, Lezhë, Shkodër',
    keyFigures: ['Skënderbeu', 'Sulltan Mehmeti II Fatihu', 'Republika e Venedikut', 'Lekë Dukagjini'],
    promptExcerpt: 'Së bashku me venedikasit luftoi kundër osmanëve gjatë Luftës osmano–venedikase të viteve 1463–79, deri në vdekjen e tij më 17 janar 1468.',
    description: 'Gjatë Luftës së Gjatë Osmano-Venedikase (1463–1479), Skënderbeu u bë mburoja kryesore në tokë e zotërimeve venedikase në Shqipëri. Ai theu rrethimin e dytë (1466) dhe të tretë (1467) të Krujës të udhëhequra nga vetë Sulltan Mehmeti II Pushtuesi.',
    historicalDetail: 'Më 17 Janar 1468, gjatë një mbledhjeje të princërve arbërorë në Lezhë për organizimin e mbrojtjes së re, Gjergj Kastrioti vdiq nga malaria në moshën 63-vjeçare. U varros në Katedralen e Shën Nikollës në Lezhë. Kur osmanët morën Lezhën më vonë, nxorën eshtrat e tij dhe i mbajtën si hajmali të pathyeshmërisë ushtarake.',
    significance: 'Skënderbeu pengoi për një çerek shekulli marshimin osman drejt Romës dhe zemrës së Evropës, duke mbetur heroi më i lartësuar i kombit shqiptar.'
  }
];

export const TREATY_OF_GAETA: TreatyDetail = {
  id: 'gaeta-1451',
  title: 'Traktati i Gaetës (26 Mars 1451)',
  year: '1451',
  partner: 'Alfonsi V i Aragonit (Mbreti i Napolit & Siçilisë)',
  place: 'Kështjella e Gaetës, Itali',
  summary: 'Pakti kyç strategjik diplomatik që njohu sovranitetin de jure të Napolit mbi Arbërinë, duke siguruar ndihmë ushtarake e financiare, ndërkohë që Skënderbeu ruajti sovranitetin absolut de facto në qeverisje.',
  keyClauses: [
    'Njohja de jure: Skënderbeu bën betimin e vasalitetit formal ndaj kurorës aragoneze si mbrojtës i lartë.',
    'Autonomia de facto: Skënderbeu gëzon pavarësi të plotë në zotërimet e tij pa ndërhyrje napolitane në ligje apo taksa.',
    'Ndihma ushtarake napolitane: Vendosja e një garnizoni prej 100 trupash në Krujë nën komandën e Ramon d\'Ortafa me armë zjarri e topa.',
    'Mbështetja me furnizime: Mbretëria e Napolit detyrohej të dërgonte barut, armatime dhe grurë përmes porteve të Adriatikut.',
    'Përfitimet reciproke: Në rast nevoje për kurorën e Napolit, ushtria e Skënderbeut do t\'i vinte në ndihmë mbretit në Itali (siç ndodhi më 1460–61 me Ferranten).'
  ],
  historicalImpact: 'Ky traktat shpëtoi Krujën nga izolimi diplomatik dhe furnizoi ushtrinë arbërore me teknologji të re artilerie. Gjithashtu themeloi lidhjen shekullore mes arbëreshëve dhe Italisë së Jugut.',
  deJureVsDeFacto: 'Pika më gjeniale e diplomacisë së Skënderbeut: Formalisht u vu nën mbrojtjen e mbretit më të fuqishëm të Mesdheut, por në praktikë asnjë vendim në Arbëri nuk merrej pa vullnetin e Gjergj Kastriotit.'
};

export const LEAGUE_OF_LEZHA: TreatyDetail = {
  id: 'lezhe-1444',
  title: 'Besëlidhja e Lezhës (2 Mars 1444)',
  year: '1444',
  partner: 'Princërit dhe Zotërit Fisnikë Arbërorë',
  place: 'Katedralja e Shën Nikollës, Lezhë (Nën territor venedikas)',
  summary: 'Themelimi i koalicionit të parë të bashkuar kombëtar midis krerëve arbërorë, me komandë të përbashkët ushtarake dhe arkë të pavarur lufte.',
  keyClauses: [
    'Bashkimi i principatave rivale kundër kërcënimit të përbashkët osman.',
    'Zgjedhja unanime e Skënderbeut si Kryekapidan (Dux) i Ushtrisë së Lidhjes.',
    'Krijimi i arkës së përbashkët financiare me kuotat e përvitshme të secilit fisnik (rreth 200,000 dukatë ari).',
    'Mobilizimi i një ushtrie të përbashkët prej 10,000 deri 15,000 luftëtarësh.',
    'Ruajtja e autonomisë territoriale të secilës principatë anëtare nën mburojën e Lidhjes.'
  ],
  historicalImpact: 'Krijoi për herë të parë konceptin e shtetit modern arbëror dhe bashkëpunimit mbi-krahinor.',
  deJureVsDeFacto: 'Një federatë politike ku Skënderbeu veproi si "i pari mes të barabartëve" (Primus inter pares) me autoritet suprem ushtarak.'
};

export const STRATEGIC_LOCATIONS: StrategicLocation[] = [
  {
    id: 'kruja',
    name: 'Kështjella e Krujës',
    type: 'fortese',
    region: 'Arbëria Qendrore',
    x: 48,
    y: 52,
    historicalContext: 'Kryeqendra e shtetit të Kastriotëve dhe epiqendra e rezistencës 25-vjeçare. E ngritur mbi një shkëmb të thepisur, i rezistoi tre rrethimeve masive osmane (1450, 1466, 1467).',
    events: ['Çlirimi më 28 Nëntor 1443', 'Rrethimi i Parë nga Murati II (1450)', 'Rrethimi i Dytë nga Mehmeti II (1466)', 'Rrethimi i Tretë (1467)'],
    importance: 'Bastioni i pathyeshëm që mbrojti Evropën nga pushtimi osman.'
  },
  {
    id: 'lezha',
    name: 'Lezha (Lissus)',
    type: 'kuvend',
    region: 'Bregdeti Arbëror (Zotërim venedikas)',
    x: 46,
    y: 40,
    historicalContext: 'Qytet nën sovranitetin e Venedikut ku u mbajt Kuvendi themelues i Lidhjes më 2 Mars 1444, dhe vendprehja e Skënderbeut në Katedralen e Shën Nikollës.',
    events: ['Kuvendi i Besëlidhjes së Lezhës (1444)', 'Kuvendi i fundit i princërve (1468)', 'Vdekja e Skënderbeut (17 Janar 1468)'],
    importance: 'Djepi i diplomacisë dhe unitetit kombëtar arbëror.'
  },
  {
    id: 'nishi',
    name: 'Nishi (Naissus)',
    type: 'beteje',
    region: 'Ballkani Qendror',
    x: 82,
    y: 18,
    historicalContext: 'Fushëbeteja e famshme e vitit 1443 midis forcave osmane dhe koalicionit hungarez-polak të Janosh Huniadit, ku Skënderbeu realizoi dezertimin strategjik me 300 kalorës.',
    events: ['Dezertimi strategjik i Skënderbeut (Nëntor 1443)', 'Marrja e fermanit perandorak për Krujën'],
    importance: 'Kthesa historike që shënoi kthimin e Skënderbeut në atdhe.'
  },
  {
    id: 'dibra',
    name: 'Sanxhaku i Dibrës & Grykat',
    type: 'beteje',
    region: 'Arbëria Lindore / Dibër',
    x: 72,
    y: 54,
    historicalContext: 'Zona ku Skënderbeu shërbeu si Sanxhakbej në 1440. Terreni i thyer me gryka e pyje u bë varreza e ushtrive osmane në Betejën e Torviollit (1444), Otonetës dhe Mokrës.',
    events: ['Sanxhakbej i Dibrës (1440)', 'Beteja e Torviollit (Fusha e Shpezës, 1444)', 'Beteja e Otonetës (1446)'],
    importance: 'Porta lindore mbrojtëse e Arbërisë dhe baza e taktikave guerile të Skënderbeut.'
  },
  {
    id: 'petrela',
    name: 'Kështjella e Petrelës',
    type: 'fortese',
    region: 'Lugina e Erzenit',
    x: 52,
    y: 60,
    historicalContext: 'Kështjella e lashtë e administruar nga motra e Skënderbeut, Mamica Kastrioti. Shërbente si pikë vrojtimi e komunikimi me sinjale zjarri me Krujën.',
    events: ['Çlirimi menjëherë pas Krujës (1443)', 'Kufiri jugor i territorit fillestar Petrelë - Modriç'],
    importance: 'Nyje mbrojtëse e luginës që mbronte rrugën drejt Krujës nga jugu.'
  },
  {
    id: 'modric',
    name: 'Kalaja e Modriçit',
    type: 'fortese',
    region: 'Kufiri Lindor i Dibrës',
    x: 78,
    y: 62,
    historicalContext: 'Kalaja kufitare në lindje të territorit të Kastriotëve që kontrollonte rrugën natyrore të luginës së Drinit dhe hyrjen nga Maqedonia.',
    events: ['Kufiri lindor i territorit të liruar (Petrelë deri në Modriç, 1443)', 'Përleshje të ashpra me trupat kufitare osmane'],
    importance: 'Kulla vrojtuese më e përparuar përballë pushtuesve.'
  },
  {
    id: 'gaeta',
    name: 'Gaeta & Napoli',
    type: 'diplomaci',
    region: 'Itali Qendrore / Deti Tirren',
    x: 10,
    y: 44,
    historicalContext: 'Vendi ku u nënshkrua Traktati historik i Gaetës (1451) me Alfonsin V të Aragonit, duke vulosur aleancën perëndimore të Arbërisë.',
    events: ['Traktati i Gaetës (26 Mars 1451)', 'Dërgimi i trupave dhe artilerisë aragoneze në Krujë'],
    importance: 'Ura gjeopolitike që furnizoi qëndresën arbërore me municione dhe grurë.'
  },
  {
    id: 'puglia',
    name: 'Puglia (Barletta, Trani & Troia)',
    type: 'beteje',
    region: 'Italia e Jugut',
    x: 22,
    y: 64,
    historicalContext: 'Fusha e ekspeditës ushtarake të Skënderbeut në 1460–1461 për të shpëtuar mbretin Ferrante nga pretendenti francez Gjoni II i Anzhuinëve.',
    events: ['Shpëtimi i rrethimit të Barletës (1460)', 'Beteja e Troias (1462)', 'Marrja e feudeve të Monte Sant\'Angelo'],
    importance: 'Dëshmoi epërsinë ushtarake të trupave arbërore në teatrin perëndimor të luftës.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Në çfarë moshe u mor peng Gjergj Kastrioti nga Perandoria Osmane?',
    options: ['Në moshën 9-vjeçare', 'Në moshën 14-vjeçare', 'Në moshën 18-vjeçare', 'Në moshën 21-vjeçare'],
    correctIndex: 0,
    explanation: 'Teksti historik thekson: "ai u rrëmbye në moshën 9 vjecare nga perandoria Osmane dhe u dërgua në oborrin e saj."',
    relatedTopic: 'Fëmijëria dhe Oborri Osman'
  },
  {
    id: 2,
    question: 'Cilën gradë dhe pozitë të rëndësishme arriti Skënderbeu në vitin 1440 në Perandorinë Osmane?',
    options: ['Vezir i Madh i Perandorisë', 'Sanxhakbej i Sanxhakut të Dibrës', 'Kapudan Pasha i Flotës', 'Beylerbey i Rumelisë'],
    correctIndex: 1,
    explanation: 'Pas 20 vjet shërbimi ushtarak dhe besnikërie të jashtme, Skënderbeu u ngrit në gradën e Sanxhakbeut të Dibrës në vitin 1440.',
    relatedTopic: 'Shërbimi dhe Gradat'
  },
  {
    id: 3,
    question: 'Në cilën betejë të vitit 1443 dezertoi Skënderbeu nga ushtria osmane për t\'u kthyer në Arbëri?',
    options: ['Në Betejën e Kosovës', 'Në Betejën e Varnës', 'Në Betejën e Nishit', 'Në Betejën e Ankarasë'],
    correctIndex: 2,
    explanation: 'Më 1443, gjatë Betejës së Nishit midis osmanëve dhe koalicionit të krishterë, Skënderbeu me 300 kalorës arbërorë braktisi ushtrinë osmane dhe mori Krujën.',
    relatedTopic: 'Kthesa e Madhe e vitit 1443'
  },
  {
    id: 4,
    question: 'Cili ishte territori fillestar mbi të cilin Skënderbeu u bë sundimtar pas çlirimit të Krujës më 1443?',
    options: ['Nga Shkodra deri në Vlorë', 'Nga Petrela deri në Modriç', 'Nga Ohri deri në Ulqin', 'Nga Janina deri në Prishtinë'],
    correctIndex: 1,
    explanation: 'Sipas të dhënave historike të cituara, pas çlirimit të Krujës ai u bë sundimtar në territorin që shtrihej nga Petrela deri në Modriç.',
    relatedTopic: 'Territori Fillestar'
  },
  {
    id: 5,
    question: 'Çfarë natyre kishte Traktati i Gaetës i nënshkruar në vitin 1451 me Mbretërinë e Napolit?',
    options: [
      'Njohu sovranitetin de jure të Napolit mbi Arbërinë, por Skënderbeu mbeti sundimtar i pavarur de facto',
      'Arbëria u bë krahinë e integruar plotësisht nën administrimin direkt të mbretit napolitan',
      'Ishte një marrëveshje thjesht tregtare për eksportin e verës dhe vajit',
      'Njohu Skënderbeun si mbret të të gjithë Italisë së Jugut'
    ],
    correctIndex: 0,
    explanation: 'Në vitin 1451, Skënderbeu njohu sovranitetin de jure të Mbretërisë së Napolit për të siguruar një aleancë mbrojtëse, duke mbetur një sundimtar i pavarur.',
    relatedTopic: 'Traktati i Gaetës (1451)'
  },
  {
    id: 6,
    question: 'Cili Papë e shpalli Skënderbeun komandant kryesor të forcave kryqtare në vitin 1463, por vdiq para mbledhjes së ushtrive?',
    options: ['Papa Nikolla V', 'Papa Piu II', 'Papa Aleksandri VI', 'Papa Inoçenti VIII'],
    correctIndex: 1,
    explanation: 'Në vitin 1463 Skënderbeu u bë komandanti kryesor i forcave kryqtare të Papa Piut II, por papa vdiq në Ankona ndërsa ushtritë ende po mblidheshin.',
    relatedTopic: 'Kryqëzata e Papa Piut II'
  }
];

export const MILITARY_TACTICS = [
  {
    title: 'Guerilja Malore & Njohja e Terrenit',
    desc: 'Skënderbeu nuk pranoi kurrë betejë ballore të pabarabartë në fusha të hapura ku osmanët mund të shfrytëzonin epërsinë numerike prej 5:1 deri në 10:1. Ai i fuste në grykat e thella të Dibrës e Matit dhe i asgjësonte me prita të befasishme.',
    icon: 'Mountain'
  },
  {
    title: 'Kalorësia e Shpejtë Arbërore',
    desc: 'Luftëtarët arbërorë ishin kalorës të lehtë të armatosur me heshta, shpata të kthyera dhe parzmore të lehta. Ata sulmonin rrufeshëm prapavijën dhe karvanët e furnizimit të osmanëve, duke u tërhequr para se armiku të organizohej.',
    icon: 'Shield'
  },
  {
    title: 'Zbulimi & Shërbimi Informativ',
    desc: 'Për shkak të 20 viteve të kaluara në komandën osmane, Skënderbeu njihte kodet, rrugët dhe mentalitetin e pashallarëve. Ai kishte spiunë dhe barinj besnikë në çdo shteg mali që sinjalizonin lëvizjen e armikut me ditë para mbërritjes.',
    icon: 'Compass'
  },
  {
    title: 'Përkrenarja me Kokën e Dhisë & Shpata',
    desc: 'Përkrenarja prej hekuri e praruar me ar, e kurorëzuar me kokën e dhisë me brirë (simbol i Aleksandrit të Madh dhe dhisë amalthiane), dhe shpata e tij e rëndë e farkëtuar në Damask janë simbolet legjendare të heroit, sot të ruajtura në Muzeun e Historisë së Artit në Vjenë.',
    icon: 'Crown'
  }
];

export const FAMOUS_QUOTES = [
  {
    quote: "Lirinë nuk ua solla unë, por e gjeta këtu në mesin tuaj!",
    author: "Gjergj Kastrioti Skënderbeu",
    context: "Krujë, 28 Nëntor 1443 — Fjalimi para popullit pas çlirimit të kështjellës"
  },
  {
    quote: "Kush është ai që s'do të luftojë për atdheun, kur sheh një burrë të tillë që s'kursen as jetën e tij?",
    author: "Marin Barleti",
    context: "Nga vepra 'Historia de vita et gestis Scanderbegi', Romë, 1508"
  },
  {
    quote: "Skënderbeu tejkaloi të gjithë oficerët e tjerë të kohës së tij në guxim dhe aftësi ushtarake.",
    author: "Volteri (Voltaire)",
    context: "Në veprën 'Ese mbi zakonet dhe shpirtin e kombeve'"
  }
];

export const PORTRAIT_ARTWORKS: import('../types').PortraitArtwork[] = [
  {
    id: 'uffizi-dell-altissimo',
    title: 'Portreti Kanonik i Skënderbeut në Uffizi',
    artist: "Cristofano dell'Altissimo (Koleksioni i Paolo Giovio-s)",
    year: 'rr. 1552–1568',
    technique: 'Vaj mbi dru (Oil on wood panel)',
    location: 'Galleria degli Uffizi (Corridoio Vasariano), Firence, Itali',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gjergj%20Kastrioti.jpg?width=800',
    category: 'pikture',
    description: 'Portreti më i famshëm dhe autoritar i Gjergj Kastriotit Skënderbeut në botën e artit perëndimor. Heroi paraqitet në profil fisnik, me mjekrën e bardhë të derdhur, hundën shqiponjë dhe kapelën e kuqe veneciane me jakë të errët kadifeje.',
    iconography: [
      'Profili shqiponjë me vështrim të thellë e vigjilent',
      'Mjekra e bardhë patriarkale (simbol i mençurisë dhe betejave të gjata)',
      'Kapela fisnike veneciane ngjyrë vishnje me kular kadifeje',
      'Mbishkrimi origjinal në latinisht: GEORGIVS CASTRIOTTVS SCANDERBEGVS'
    ],
    historicalContext: 'Humanisti dhe historiani italian Paolo Giovio dëshmoi se ky portret bazohet në një skicë autentike të marrë nga jeta gjatë vizitës diplomatike të Skënderbeut në Romë në dimrin e viteve 1466–1467, kur heroi kërkoi ndihmë nga Papa Pali II.',
    significance: 'Ky imazh përcaktoi ikonografinë botërore të heroit dhe u bë modeli bazë për qindra gravura evropiane të shekujve pasues.'
  },
  {
    id: 'bellini-circle',
    title: 'Portreti Venecian i Rrethit të Gentile Bellini-t',
    artist: 'Gentile Bellini (ose rrethi i tij venecian)',
    year: 'rr. 1466–1480',
    technique: 'Tempera dhe vaj mbi dru / skicë paraprake',
    location: 'Koleksione Muzeale Evropiane / Rrethi i Shkollës Veneciane',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skanderbeg%20by%20Gentile%20Bellini.jpg?width=800',
    category: 'pikture',
    description: 'Një nga dëshmitë më të hershme piktorike të Skënderbeut. Paraqet profilin e theksuar luftarak të komandantit arbëror me kapelë tradicionale, vetulla të trasha dhe qëndrim të palëkundur princëror.',
    iconography: [
      'Tipare të rrepta ushtarake dhe muskulaturë e dallueshme e qafës',
      'Kostum i stilit veneciano-oriental me prerje të lartë',
      'Kapela karakteristike e zezë e pëlqyer nga fisnikëria mesdhetare',
      'Drita anësore e stilit të rilindjes së hershme veneciane'
    ],
    historicalContext: 'Gentile Bellini, piktori zyrtar i Republikës së Venedikut i njohur për portretin e Sulltan Mehmetit II, pati kontakte të drejtpërdrejta me oborrin e Kastriotit falë aleancës së ngushtë ushtarake gjatë Luftës Osmano-Venedikase (1463–1479).',
    significance: 'Dokumenton admirimin e jashtëzakonshëm të Venedikut për gjeneralin që mbrojti zotërimet e Adriatikut nga rënia në duart osmane.'
  },
  {
    id: 'barleti-woodcut-1508',
    title: 'Gdhendja e Parë Botuese: Barleti (Romë, 1508)',
    artist: 'Mjeshtër Anonim Romak / Përgatitur për Marin Barletin',
    year: '1508',
    technique: 'Ksilografi (Gdhendje në dru në faqen e parë)',
    location: 'Biblioteka Kombëtare e Shqipërisë & Biblioteka e Vatikanit',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skanderbeg%20Barleti.jpg?width=800',
    category: 'dorëshkrim',
    description: 'Frontespici origjinal i kryeveprës humaniste të Marin Barletit, "Historia de vita et gestis Scanderbegi, Epirotarum Principis", shtypur në Romë nga Bernardino Vitali rreth vitit 1508.',
    iconography: [
      'Kurorë lagesh dhe kornizë me motive klasike romake',
      'Pamje stoike dhe e rreptë me mjekër të shkurtuar e vështrim të kthjellët',
      'Titulli latin: "Epirotarum Princeps" (Princi i Epirotëve/Arbërorëve)',
      'Simbolet e lavdisë dhe trimërisë së pavdekshme'
    ],
    historicalContext: 'Marin Barleti, dëshmitar i rrethimit të Shkodrës dhe bashkëkohës i bashkëluftëtarëve të Skënderbeut, shkroi biografinë themelore që frymëzoi Ronsardin, Tasson dhe mendimtarët e Rilindjes Evropiane.',
    significance: 'Është përshkrimi i parë vizual i botuar në një vepër historike të standardit ndërkombëtar, duke e shenjtëruar Skënderbeun si mit kombëtar e evropian.'
  },
  {
    id: 'ambras-custos-1601',
    title: 'Skënderbeu me Përkrenare & Shpatë (Kështjella Ambras)',
    artist: 'Dominicus Custos & Jacob Schrenck von Notzing',
    year: '1601',
    technique: 'Gravurë në bakër (Copper engraving)',
    location: 'Schloss Ambras, Innsbruck / Kunsthistorisches Museum, Vjenë',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Portrait%20of%20Skanderbeg%20(1601).jpg?width=800',
    category: 'gravure',
    description: 'Portret madhështor me trup të plotë, ku Skënderbeu qëndron me armaturë luftarake, me dorën e djathtë mbi shpatën e tij të famshme dhe përkrenaren legjendare me kokën e dhisë të vendosur pranë tij mbi tavolinë.',
    iconography: [
      'Përkrenarja me brirët e dhisë së artë (simboli i Pirros dhe Aleksandrit)',
      'Shpata e kthyer me gardë të gjerë (armë e vërtetë luftarake)',
      'Armatura e hekurt e punuar me gravura rilindase',
      'Shtiza dhe flamuri i fitores në prapavijë'
    ],
    historicalContext: 'Krijuar për inventarin luksoz të armaturave të Arkidukës Ferdinand II të Tirolit në Kështjellën Ambras, ku u strehuan reliket origjinale të Skënderbeut pas shpërnguljes së familjes Kastrioti në Itali.',
    significance: 'Dokumenti më i qartë artistik që dëshmon ruajtjen e relikeve të mirëfillta të heroit që sot admirohen në Muzeun e Historisë së Artit në Vjenë.'
  },
  {
    id: 'thevet-1584',
    title: 'Skënderbeu në Galerinë e Burrave të Shquar (Paris, 1584)',
    artist: 'André Thevet (Kozmograf i Mbretit të Francës)',
    year: '1584',
    technique: 'Gdhendje në bakër nga libri "Vies des Hommes Illustres"',
    location: 'Biblioteka Kombëtare e Francës (BnF), Paris / British Museum',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skanderbeg%20by%20Andr%C3%A9%20Thevet.jpg?width=800',
    category: 'gravure',
    description: 'Portret i realizuar në Paris nga André Thevet për enciklopedinë e tij monumentale mbi personalitetet më të ndritura botërore. Skënderbeu paraqitet si një strateg i thellë, me dorën mbi rripin e armës dhe veshje orientale e evropiane të kombinuar.',
    iconography: [
      'Mjekër e dyzuar e tipit diplomatik dhe flokë të valëzuar',
      'Veshje fisnike me kopsa argjendi dhe shall oriental',
      'Përkrenarja e lehtë dhe vështrimi drejt horizontit',
      'Mbishkrim francez që e nderon si Çlirimtar të Shqipërisë'
    ],
    historicalContext: 'Mbretëria e Francës dhe oborri i Valois-ve e nderonin Skënderbeun si modelin më të lartë të kalorësit të krishterë dhe mbrojtësit të qytetërimit perëndimor.',
    significance: 'Përhapi famën e strategut arbëror në botën frankofone, duke frymëzuar më vonë tragjeditë dhe operat e shkrimtarëve francezë.'
  },
  {
    id: 'vecellio-1590',
    title: 'Kostumi Luftarak i Skënderbeut (Cesare Vecellio, 1590)',
    artist: 'Cesare Vecellio (Kushëriri dhe bashkëpunëtori i Tizianit)',
    year: '1590',
    technique: 'Ksilografi nga traktati "De gli Habiti Antichi et Moderni"',
    location: 'Biblioteca Nazionale Marciana, Venedik',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cesare%20Vecellio%20-%20Scanderbeg.jpg?width=800',
    category: 'ilustrim',
    description: 'Studim i hollësishëm i veshjes dhe qëndrimit trupor të Skënderbeut nga Cesare Vecellio, i cili mblodhi kostumet e sovranëve më me ndikim në historinë botërore.',
    iconography: [
      'Kombinimi i dollamës luftarake arbërore me elemente mbrojtëse',
      'Çallma ose kësula e mbështjellë e komandantit të lartë',
      'Çizmet e larta të kalorësisë malore',
      'Qëndrimi dinamik në ecje me dorën te milli i shpatës'
    ],
    historicalContext: 'Vepra e Vecellio-s u botua në Venedik dhe dokumenton me saktësi se si perceptohej stili dhe prestigji i Kastriotëve në qytetin e lagunave një shekull pas vdekjes së tij.',
    significance: 'Dëshmi e çmuar e antropologjisë vizuale dhe historisë së kostumografisë ushtarake të Arbërisë së shekullit XV.'
  }
];
