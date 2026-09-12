export interface CinematicScene {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  tagline: string;
  speechQuote: string;
  speechAuthor: string;
  synopsis: string;
  durationSeconds: number;
  canvasTheme: {
    skyGradient: [string, string, string, string];
    terrainType: 'kruja_cliffs' | 'torvioll_valley' | 'albulena_plains' | 'lezha_cathedral' | 'puglia_coast';
    lighting: 'golden_hour' | 'torchlight' | 'noon_blaze' | 'dawn_mist' | 'storm_dusk';
    fogColor: string;
    accentColor: string;
    heroPosture: 'banner_raise' | 'cavalry_charge' | 'sword_oath' | 'citadel_watch' | 'gallop';
  };
  cameraMovementName: string;
  cameraMovementDesc: string;
  aiVideoPrompts: {
    veo: string;
    sora: string;
    runway: string;
  };
  historicalTrivia: string;
}

export const CINEMATIC_SCENES: CinematicScene[] = [
  {
    id: 'kthimi-kruje-1443',
    title: 'Kthimi në Krujë & Ngritja e Flamurit Kuqezi',
    subtitle: 'Nëntor 1443 • Çlirimi i Kështjellës Mëmë',
    year: '1443 (28 Nëntor)',
    location: 'Kalaja e Krujës, Arbëri',
    tagline: '"Lirinë nuk ua solla unë, por e gjeta këtu në mes tuaj!"',
    speechQuote: 'Lirinë nuk ua solla unë, por e gjeta këtu në mes tuaj! Armët nuk jua dhashë unë, por ju gjeta të armatosur. Kudo pashë se e kishit lirinë në kraharor, në sy dhe në shpirt! Ngrijeni këtë flamur me shqiponjën dykrenare, sepse Kruja është përsëri e lirë!',
    speechAuthor: 'Gjergj Kastrioti Skënderbeu — Fjalimi para popullit të Krujës (Marin Barleti)',
    synopsis: 'Pas largimit nga Beteja e Nishit, Skënderbeu me 300 kalorës besnikë hyn në Krujë. Me fermanin mbretëror merr kështjellën dhe ngre mbi mure flamurin e Kastriotëve: shqiponjën e zezë dykrenare mbi fushën e kuqe, duke shënuar lindjen e shtetit të pavarur arbëror.',
    durationSeconds: 18,
    canvasTheme: {
      skyGradient: ['#1c1917', '#451a03', '#78350f', '#d97706'],
      terrainType: 'kruja_cliffs',
      lighting: 'golden_hour',
      fogColor: 'rgba(217, 119, 6, 0.25)',
      accentColor: '#ef4444',
      heroPosture: 'banner_raise'
    },
    cameraMovementName: 'Slow Cinematic Push-in & Crane Upward',
    cameraMovementDesc: 'Kamera niset nga rrëza e shkëmbinjve të thepisur të Krujës dhe ngrihet lart mbi muret e kështjellës, duke kapur Skënderbeun me krahun e ngritur dhe flamurin kuqezi që valëvitet në erë.',
    aiVideoPrompts: {
      veo: 'Cinematic 8K drone shot sweeping up the colossal vertical limestone cliffs of Kruja Castle in 1443 Albania. Golden hour light breaks through storm clouds. Atop the stone battlements stands Gjergj Kastrioti Skanderbeg in gleaming 15th-century steel armor and helmet with golden goat horns, hoisting a massive crimson banner bearing the black double-headed eagle. Joyous highland citizens cheering, waving swords, cinematic volumetric lighting, photorealistic historical epic, 24fps, ARRI Alexa 65.',
      sora: 'Ultra-realistic historical movie sequence of Skanderbeg arriving at Kruja Fortress gates at sunset. Mist clings to the Balkan mountains. Skanderbeg dismounts a steaming white warhorse, red velvet cape flowing in mountain wind. A crowd of Albanian warriors gather with torches as the Ottoman crest is removed and replaced by the Castriota banner. High emotional depth, slow motion 60fps, atmospheric depth.',
      runway: 'Epic slow motion tracking shot behind Skanderbeg walking along the citadel ramparts of Kruja. Sunset rays illuminate the Adriatic Sea in the far horizon. Dynamic fabric physics on the red double-headed eagle flag, glinting steel scimitar, atmospheric haze and soaring eagles overhead.'
    },
    historicalTrivia: 'Flamuri i kuq me shqiponjën dykrenare u ngrit për herë të parë më 28 Nëntor 1443 në Krujë dhe mbeti simboli i pandërprerë i lirisë kombëtare deri në shpalljen e Pavarësisë më 1912.'
  },
  {
    id: 'kuvendi-lezhes-1444',
    title: 'Kuvendi i Lezhës & Besëlidhja e Madhe',
    subtitle: 'Mars 1444 • Bashkimi i Parë Gjithëkombëtar',
    year: '1444 (2 Mars)',
    location: 'Katedralja e Shën Kollit, Lezhë',
    tagline: '"Bashkimi bën fuqinë — Të bashkuar jemi kështjellë e pathyeshme!"',
    speechQuote: 'Të nderuar princër dhe vëllezër të një gjaku! Armiku kërkon të na gjejë të ndarë që të na përpijë një nga një. Por sot, në këtë tempull të shenjtë, ne lidhim besën e përjetshme. Nuk ka më Kastriotë, Topiáj, Dukagjinë apo Arianitë të veçuar — ka vetëm një Arbëri të pamposhtur!',
    speechAuthor: 'Skënderbeu para princërve arbërorë në Kuvendin e Lezhës',
    synopsis: 'Në Katedralen e Shën Kollit në Lezhë u mblodhën të gjithë sundimtarët kryesorë arbërorë (Gjergj Arianiti, Andrea Topia, Gjergj Stresi Balsha, Nikollë Dukagjini, Pal Spani, Lekë Zaharia). Ata zgjodhën Skënderbeun si Komandant të Përgjithshëm të Besëlidhjes.',
    durationSeconds: 16,
    canvasTheme: {
      skyGradient: ['#0c1929', '#1e293b', '#334155', '#78350f'],
      terrainType: 'lezha_cathedral',
      lighting: 'torchlight',
      fogColor: 'rgba(245, 158, 11, 0.2)',
      accentColor: '#f59e0b',
      heroPosture: 'sword_oath'
    },
    cameraMovementName: 'Circular Steadicam Tracking Shot',
    cameraMovementDesc: 'Lëvizje e qetë 360 shkallë rreth tryezës së gurtë të princërve me shpata të kryqëzuara mbi altarin e Shën Kollit nën dritën e qirinjve dhe pishtarëve.',
    aiVideoPrompts: {
      veo: 'Interior cinematic shot of Saint Nicholas Cathedral in Lezha, 1444. Majestic stained glass windows, shafts of divine light filtering through smoke and incense. The noble princes of Albania in velvet and chainmail placing their heavy broadswords on a central carved stone table. Skanderbeg standing tall at the center, hand raised in solemn oath. Chiaroscuro Renaissance lighting, Rembrandt aesthetic, 8K ultra detail.',
      sora: 'Slow 360-degree pan around Skanderbeg addressing the League of Lezha in 1444. Medieval banners hanging from cathedral pillars, candlelight reflecting off ceremonial armor, faces of hardened Albanian chieftains showing intense loyalty and resolve. 35mm anamorphic film look, shallow depth of field, masterpiece quality.',
      runway: 'Dramatic tracking medium shot of Skanderbeg grasping the hand of Gjergj Arianiti and Nicholas Dukagjini inside Lezha cathedral. Torches flicker as church bells ring softly in the background. Masterful costume design, intricate gold-threaded crests, cinematic color grade.'
    },
    historicalTrivia: 'Kuvendi i Lezhës krijoi të parën ushtri të përbashkët kombëtare dhe një arkë të përbashkët financiare lufte, duke mbledhur 200,000 dukatë ari në vit.'
  },
  {
    id: 'beteja-torvioll-1444',
    title: 'Rrufeja e Torviollit: Prita Epike',
    subtitle: 'Qershor 1444 • Shpartallimi i Parë i Ushtrisë Osmane',
    year: '1444 (29 Qershor)',
    location: 'Fusha e Torviollit, Dibër',
    tagline: '"Mos u ngutni para sinjalit tim; kur të dëgjoni boritë, godisni nga të dy shpatet!"',
    speechQuote: 'Vëllezër luftëtarë! Sot e gjithë Europa ka sytë mbi ne. Mbani qetësinë në pyll derisa armiku të hyjë thellë në grykë. Kur të dëgjoni goditjen e parë të trumbetës sime, dilni si rrufeja e maleve!',
    speechAuthor: 'Skënderbeu duke udhëhequr pritën në pyjet e Dibrës',
    synopsis: 'Ali Pasha erdhi me 40,000 ushtarë për të shuar kryengritjen. Skënderbeu fshehu forcat goditëse në pyjet anësore të luginës. Me një tërheqje të rreme, joshi osmanët dhe i rrethoi me sulm rrufe nga të gjitha anët, duke lënë 22,000 të rënë armiq.',
    durationSeconds: 20,
    canvasTheme: {
      skyGradient: ['#1c1917', '#78350f', '#b45309', '#f59e0b'],
      terrainType: 'torvioll_valley',
      lighting: 'dawn_mist',
      fogColor: 'rgba(180, 83, 9, 0.3)',
      accentColor: '#d97706',
      heroPosture: 'cavalry_charge'
    },
    cameraMovementName: 'Dynamic FPV Drone Charge & Whip Pan',
    cameraMovementDesc: 'Kamera fluturon me shpejtësi marramendëse mes degëve të lisave shekullorë dhe shpërthen në luginë bashkë me kuajt e kalorësisë arbërore duke shkaktuar pluhur dhe shkëndija.',
    aiVideoPrompts: {
      veo: 'Dynamic action camera flying through misty oak forest branches before bursting into a sunlit Balkan mountain valley during the Battle of Torvioll 1444. Thousands of Albanian light cavalry on spirited horses burst from ambush onto an Ottoman army column. Skanderbeg leading at full gallop on a white charger, curved steel saber swinging, dust storm swirling, motion blur, visceral combat choreography, Ridley Scott Gladiator scale.',
      sora: 'Close tracking shot of horse hooves pounding into damp forest earth, kicking up dirt and moss. Camera tilts up rapidly to Skanderbeg in full battle armor letting out a battle cry as bronze war horns sound. Ottoman archers in the valley look up in shock as thousands of Albanian warriors pour down the steep forested ridges. 120fps slow motion action sequence.',
      runway: 'High-speed wide battle shot of the double pincer ambush at Torvioll. Red and black flags ripping through the morning mist, shimmering curved sabers, galloping horses colliding with enemy frontlines. Masterpiece action cinematography, natural sunlight glints.'
    },
    historicalTrivia: 'Fitorja e Torviollit bëri jehonë në të gjitha kancelaritë e Evropës; Papa Eugjeni IV dhe Mbreti Alfons i Napolit e quajtën Skënderbeun "Mbrojtësin e Qytetërimit Perëndimor".'
  },
  {
    id: 'rrethimi-krujes-1450',
    title: 'Qëndresa e Krujës: Përballë 100,000 Osmanëve',
    subtitle: 'Qershor–Tetor 1450 • Sulltan Murati II Thyhet në Shkëmbinj',
    year: '1450',
    location: 'Bedenat e Kalasë së Krujës',
    tagline: '"Gurët tanë do të bëhen varri i pushtuesve!"',
    speechQuote: 'Vrana Kont! Mbroje këtë kështjellë sikur mbron zemrën tënde! Unë do të jem në male, çdo natë do të digjet një çadër armike derisa Sulltani të kuptojë se Kruja nuk merret me ar e as me hekur!',
    speechAuthor: 'Porosia e Skënderbeut për Kont Vrana para rrethimit',
    synopsis: 'Sulltan Murati II solli më shumë se 100,000 trupa dhe topa gjigantë bronzi për të thyer Krujën. Garnizoni prej 1,500 arbërorësh me Vrana Kontin qëndroi i pathyeshëm, ndërsa Skënderbeu me sulme të përditshme nate shkatërroi logjistikën dhe moralin e osmanëve derisa sulltani u tërhoq i dëshpëruar.',
    durationSeconds: 22,
    canvasTheme: {
      skyGradient: ['#050508', '#0b1120', '#1e1b4b', '#450a0a'],
      terrainType: 'kruja_cliffs',
      lighting: 'storm_dusk',
      fogColor: 'rgba(239, 68, 68, 0.25)',
      accentColor: '#dc2626',
      heroPosture: 'citadel_watch'
    },
    cameraMovementName: 'Vertigo Dolly Zoom on Cliff Edge',
    cameraMovementDesc: 'Kamera bën Dolly Zoom mbi majën e bedenit ku qëndron Skënderbeu duke parë poshtë mijëra zjarre të kampit osman në fushë, me rrufe dhe tym topash në sfond.',
    aiVideoPrompts: {
      veo: 'Epic nighttime siege cinematic shot of Kruja Castle in 1450. A sea of 100,000 Ottoman torches glows in the vast plain below the sheer mountain. Massive early bronze bombards fire, ejecting smoke and orange fireballs against the fortress stone walls. High atop the citadel edge, Skanderbeg and Albanian archers fire flaming arrows. Lightning flashes across dark Balkan thunderclouds, cinematic visual effects, IMAX resolution.',
      sora: 'Ultra-dramatic slow tilt shot starting on the smoking muzzle of a siege cannon, panning upward along vertical stone cliffs to reveal Kruja Castle lit by fire and moonlight. Skanderbeg on horseback on a cliff ledge coordinates a midnight ambush on the enemy siege camp. Hyper-realistic smoke physics, glowing sparks, atmospheric rain and fog.',
      runway: 'Sweeping cinematic aerial tracking of a fiery night raid led by Skanderbeg. Horsemen carrying blazing torches charging into an Ottoman encampment, destroying siege engines and wagons. Cinematic orange-and-teal color palette, dynamic lighting.'
    },
    historicalTrivia: 'Sulltan Murati II pësoi goditje të rëndë psikologjike nga disfata para Krujës dhe ndërroi jetë në Edrene vetëm pak muaj më pas, në shkurt 1451.'
  },
  {
    id: 'ujebardha-1457',
    title: 'Kryevepra Taktike e Ujëbardhës (Albulenë)',
    subtitle: 'Shtator 1457 • Goditja e Rrufeshme në Mesditë',
    year: '1457 (2 Shtator)',
    location: 'Fusha e Ujëbardhës / Albulenë',
    tagline: '"Kur kujtuan se isha zhdukur, rashë mbi ta si vetëtima e Zotit!"',
    speechQuote: 'Luftëtarë! Osmanët mendojnë se jemi arratisur e jemi thyer. Shikoni si flenë të shkujdesur në vapën e mesditës! Tani është çasti ynë; mos lini asnjë bori pa fryrë, goditni si era e rreptë e veriut!',
    speechAuthor: 'Skënderbeu duke dhënë urdhrin e sulmit në Ujëbardhë',
    synopsis: 'Përballë 60,000–80,000 trupave të drejtuara nga Isak Bej Evrenozi dhe tradhtari Hamza Kastrioti, Skënderbeu u tërhoq për tre muaj në male pa dhënë asnjë shenjë. Kur ushtria osmane po pushonte e shkujdesur në mesditë, Skënderbeu u shfaq papritur dhe shpartalloi plotësisht kampin armik.',
    durationSeconds: 19,
    canvasTheme: {
      skyGradient: ['#0f172a', '#1e293b', '#b45309', '#f59e0b'],
      terrainType: 'albulena_plains',
      lighting: 'noon_blaze',
      fogColor: 'rgba(245, 158, 11, 0.2)',
      accentColor: '#f59e0b',
      heroPosture: 'cavalry_charge'
    },
    cameraMovementName: 'Low-angle High-speed Tracking Shot',
    cameraMovementDesc: 'Kamera zvarritet në nivelin e barit të fushës dhe ndjek sulmin e shpejtë të kalorësisë me thundra e pluhur të artë nën diellin e nxehtë të shtatorit.',
    aiVideoPrompts: {
      veo: 'Blazing midday summer sun over the Albanian plains of Albulena in 1457. Mirage heat waves shimmer. Suddenly, the crest of a wooded hill erupts with thousands of Albanian warriors. Bronze war trumpets blast loudly. Skanderbeg in silver armor holding aloft his curved scimitar charges into the sprawled Ottoman tent camp. Extreme dynamic range, cinematic lens flares, dust billowing in high frame rate.',
      sora: 'Close-up cinematic shot of Hamza Kastrioti looking up in dread as he hears the unmistakable sound of Skanderbeg war horns echoing from the hills. Cut to a breathtaking wide shot of Skanderbeg cavalry charge sweeping across the open plain. Dust clouds, flapping war banners, historical authenticity, cinematic motion picture.',
      runway: 'Panoramic slow-motion tracking shot of Albanian light horsemen slicing through the enemy camp at midday. Tents collapsing, dust swirling in shafts of sunlight, intense medieval hand-to-hand combat, museum grade visual fidelity.'
    },
    historicalTrivia: 'Hamza Kastrioti u kap i gjallë në këtë betejë. Skënderbeu e fali duke i kursyer jetën dhe e dërgoi në burg në Napoli, duke dëshmuar fisnikërinë e tij legjendare.'
  },
  {
    id: 'ekspedita-pulje-1461',
    title: 'Ekspedita në Pulje: Kalorësia e Lehtë "Stradiotët"',
    subtitle: '1461–1462 • Shpëtimi i Mbretërisë së Napolit',
    year: '1461–1462',
    location: 'Barletta, Trani & Orsenta, Itali',
    tagline: '"Arbërorët lëvizin si era; nuk i zë dot në kurth!"',
    speechQuote: 'Mbreti Ferdinand është aleati ynë besnik që na dha armë e drithë kur Kruja po digjej. Besa e arbërorit nuk matet me dete. Ne do ta çlirojmë Napolin ashtu siç çliruam tokat tona!',
    speechAuthor: 'Skënderbeu para nisjes së anijeve nga Durrësi për në Pulje',
    synopsis: 'Për të mbështetur mbretin Ferrante kundër princave anzhuinë francezë, Skënderbeu kapërceu Adriatikun me 3,000 kalorës të lehtë. Taktikat e shpejta të Stradiotëve arbërorë tronditën kalorësinë e rëndë franceze dhe vendosën fatin e Mbretërisë së Napolit.',
    durationSeconds: 17,
    canvasTheme: {
      skyGradient: ['#082f49', '#0369a1', '#0284c7', '#38bdf8'],
      terrainType: 'puglia_coast',
      lighting: 'golden_hour',
      fogColor: 'rgba(56, 189, 248, 0.2)',
      accentColor: '#38bdf8',
      heroPosture: 'gallop'
    },
    cameraMovementName: 'Ocean Coastal Tracking Shot with Mediterranean Pine Trees',
    cameraMovementDesc: 'Kamera fluturon paralel me bregdetin e kaltër të Barlettës duke ndjekur kalorësit arbërorë që manovrojnë me shpejtësi mes ullinjve dhe pishave mesdhetare.',
    aiVideoPrompts: {
      veo: 'Cinematic shot of Skanderbeg and his Albanian light cavalry (Stradiots) galloping along the sun-drenched Adriatic coastline of Barletta in Southern Italy, 1461. Crystal blue waves crashing, Mediterranean olive groves and stone castles in background. Skanderbeg commanding his fast horsemen in agile hit-and-run cavalry tactics against heavy French armored knights. Stunning cinematography, warm Italian coastal palette, 8K masterpiece.',
      sora: 'Tracking shot following Albanian horse archers and spearmen maneuvering effortlessly around clumsy armored European knights on an Italian plain. Azure sky, sea breeze blowing red cloaks, Skanderbeg riding tall with silver armor and command baton. High speed filmic motion.',
      runway: 'Majestic wide aerial shot of a flotilla of medieval galleys arriving at the port of Ragusa and Barletta, unloading Skanderbeg cavalry. Mediterranean sunlight glinting on armor and ocean spray. Epic cinematic travel sequence.'
    },
    historicalTrivia: 'Për këtë shërbim historik, Mbreti Ferrante i dhuroi Skënderbeut feudet e Monte Sant\'Angelo dhe San Giovanni Rotondo në Pulje, ku u vendosën edhe kolonitë e para arbëreshe.'
  }
];
