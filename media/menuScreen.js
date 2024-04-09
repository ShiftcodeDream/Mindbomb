class menuScreen {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.main = this.main.bind(this);
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.displayMap = this.displayMap.bind(this);
    this.drawMan = this.drawMan.bind(this);
    this.interraction = this.interraction.bind(this);
    this.launchDemoByNumber = this.launchDemoByNumber.bind(this);
    this.boringThings = this.boringThings.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['gameblocks.png', 'man.png', 'megadeath-orange_64x64.png', 'MindBomb.ym'])).then(data => [this.tiles, this.man, this.font] = data);
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.map = "#################GG#G##GGG###########################GGG###GG#GG#GG##########################GGG#GGGG#GG##########*((((()############4G4####G#G##G#############################GGGGGGGG##########*(jk(fg()###########5G5####GGG#GG###############################GGGGG###########*($%($%()+,#########6G6#####GGGG###############7878787878######GG78#GG##########*(&'(&'()-.#B####*(((((((()#GGG##78787878787878<=<=<=<=<=###GGGG#<=##########01#H????????JKIB###*(XY(lm(Z[()#G###<=<=<=<=<=<=<=<=<=<=<=<=###GGGG#<=##########23##########+,#B+,#*($%($%($%()GG###<=9:9:9:<=<=<=<=<=<=<=<=H??IGGG#<=+,########CD##########-.#B-.#*(&'(&'(&'()G####<=;de;##<=<=<=<=<=<=<=<=H??IG###<=-.#######BEFB########H????JK??????????????I###<=;$%;-.<=<=<=<=<=<=<=<=#H??I###<=+,###+,#CDCDCD############+,78################<=;&';+,<=<=<=<=<=<=<=<=H??I####<=-.###-.BEFEFEFB###########-.<=################<=H??I-.<=<=<=<=<=<=<=<=#H??I##H??JK???JK???????I######*(()#+,<=################<=7878+,<=<=<=<=<=<=<=<=H??I######-.###-.#############*(VW()-.<=################<=<=<=-.<=<=<=<=<=<=<=<=#H??I#####+,###+,####+,#######*($%()+,<=####H??I##*(()##9:9:9:+,<=<=<=<=<=<=<=<=###H??I###-.###-.####-.#######*(&'()-.<=##78#H?I#*(\\]()#######-.<=<=<=<=<=<=<=<=###*(()###+,###+,###HJK?????????????????I*hi)#B##*($%()#######+,<=<=<=<=<=<=<=<=##*(PQ()##-.###-.####-.#################*($%()B##*(&'()#######-.<=<=<=<=<=<=<=<=##*($%()##+,###+,####+,#################*(&'()B##H???????????I+,<=<=<=<=<=<=<=<=##*(&'()##-.###-.####-.##################H??I#B#########787878-.<=<=<=<=<=<=<=<=#H??????????I##+,###HJK?????????I#############B#########<=<=<=+,<=<=<=<=<=<=<=<=###############-.####-.####/##/###CD###/###////###*(()##<=<=<=-.<=<=<=<=<=<=<=<=###*(()######H???????JKI##//////##EF#////##/////#*(^_()#<=<=<=+,<=<=<=<=<=<=<=<=##*(NO()+,###########-.##//#//#//####//#//#//#//#*($%()#<=<=<=-.<=<=<=<=<=<=<=<=##*($%()-.###########+,##//#//#//#//#//#//#//#//#*(&'()#<=<=<=+,<=<=<=<=<=<=<=<=##*(&'()+,###########-.##//#//#//#//#//#//#//#//H????I##<=<=<=-.<=<=<=<=<=<=<=<=##H?????JK??I########+,##//#//#//#//#//#//#//#//########<=<=<=+,<=<=<=<=<=<=<=<=########+,###########-.##//#//#//#//#//#//#//#//#CD#####<=<=<=-.<=<=<=<=<=<=<=<=########-.###########+,##//#//#//(bc(//#//#//#//#EF#####<=9:9:+,9:9:<=<=<=<=<=<=########+,###########-.##//#//#//($%(//#//#/////#01#-.##<=*(()-.####<=<=<=<=<=<=########-.###*(()####+,##//#//#//(&'(//#//#////##23#+,##<=(`a(+,###4<=<=<=<=<=<=########+,##*(RS()###-.##H??????????????????????????JKI#<=($%(-.#CD5<=<=<=<=<=<=########-.##*($%()###+,#############################+,##<=(&'(+,#EF6<=<=<=<=<=<=###>####+,##*(&'()#>#-.##////###///####/##/###////##-.##<=H????????I<=<=<=<=<=<=#H??????JK??????????????I/////#/////##//////##/////#+,##<=7878787878<=<=<=<=<=<=###7878#+,#######;#######//#//#//#//#//#//#//#//#//#-.##<=<=<=<=<=<=<=<=<=<=<=<=###<=<=#-.#######;#######//#//#//#//#//#//#//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=###<=<=#+,#######;#######/////#//#//#//#//#//#////##-.##<=<=<=<=<=<=<=<=<=<=<=<=B##<=<=#-.#######;#######//#//#//#//#//#//#//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=B##<=<=#+,##*(()#;#######//#//#//#//#//#//#//#//#//#-.##<=<=<=<=<=<=<=<=<=<=<=<=B##7LM8#-.#*(TU();#######//#//#//#//#//<no=//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=CD#;$%;#+,#*($%();#######/////#//#//#//(pq(//#/////#-.##<=<=<=<=<=<=<=9:9:9:9:9:EFB;&';#-.#*(&'();##>>###////###///##//(rs(//#////##+,##9:9:9:9:9:9:9:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AAAAAAAAAAAAAAAAAAAAAAAAAAAtuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      .split('').map(n => n.charCodeAt(0) - 35);
    // Man's tile position
    this.pos = 330 + 160;
    // playground shifting in pixels
    this.shiftX = this.shiftY = 0;
    this.currentKey = '';
    this.tiles.initTile(32, 32, 0);
    this.man.initTile(64, 64, 0);
    this.font.initTile(64,64,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "                        WHO SAID MEGA DEMO?   WHERE I CAN'T SEE IT!   THE LOST BOYS IN A STATE OF IMMENSE PROUDNESS (LOOK AT THAT ILLITERATE ENGLISH!) PRESENT THEIR MIND BOMB DEMO!!! THIS DEMO WAS COMPLETED ON THE 18TH APRIL 1990 IN DEN BOSCH HOLLAND BY MANIKIN OF THE LOST BOYS AIDED AND ABBETTED BY THE DIGITAL INSANITY CORPORATION!!. FIRST AN IMMENSE APOLOGY TO AENIGMATICA. I AM REALLY SORRY BUT A COMBINATION OF LACK OF SPACE AND TIME MEANT THAT I COULDN'T GET YOUR SCREENS ONTO THE DEMO! I AM INCREDIBLY SORRY!. AND NOW THE SCROLL WRITTEN AT AN EARLIER DATE IN MANCHESTER ENGLAND!!!  THE TIME IS 12:33AM ON THE 18TH FEBRUARY 1990 AND NOW THAT WE ARE THOROUGHLY PISSED OFF WITH PLAYING CHAOS STRIKES BACK WE DECIDED TO GET OFF OUR ARSES AND WRITE THE MAIN MENU SCROLL.  THIS IS MANIKIN, SAMMY JOE WITH 2 TOTAL WEIRDO FRIENDS WHO LIVE WITH MANIKIN IN MANCHESTER (IAN AND SIMON!!). WE HAVE SPENT THE LAST EVENING (DAY!) PLAYING THAT FUCKING GAME AND WE ARE NOW HALF DRUNK (!!) AND IN THE MOOD FOR SPURIOUS  BULLSHIT (MANIKIN BEING AN EXPERT AT THIS!). THE ONLY REASON THAT THE OTHER TWO NON LOST BOYS ARE HERE IS THAT THEY HAVE HAD TO SPEND THE LAST 4 MONTHS LISTENING TO THE ST KEYCLICK SO I GUESS THEY DESERVE SOME INVOLVMENT! (HAVE YOU EVER TRIED GETTING TO SLEEP AT 3AM, WHEN ALL YOU CAN HEAR IS BEEP, BEEP, FUCKING BEEP ?). ANYWAY NOW SOME MORE SERIOUS SHIT. THE DEMO IS PROBABLY THE BIGGEST EVER PRODUCED ON THE ST. IT HAS AT LEAST 20 SCREENS, MOSTLY BY THE LOST BOYS, WITH SPECIAL GUEST SCREENS BY DIGITAL INSANITY, FOXX AND ANDY THE ARFLING (BBC). SPECIAL THANKS MUST GO TO IAN, PHIL AND SIMON (THEY'RE PESTERING ME TO PUT THIS IN!) FOR INVALUABLE CONSTRUCTIVE CRITISM (OH TIM THATS FUCKING CRAP THAT IS!! DO IT LIKE THIS). WE ARE CURRENTLY HALF WAY THROUGH A BOTTLE OF VODKA (WODKA IF YOUR GERMAN!) SO IF THE SPELLING DETERIORATES DURING THE SCROLL DON'T BLAM MEE ...???! I GUESS WE SHOULD BE DOING THE  GREETINGS ABOUT NOW BUT THATS BLOODY BORING SO YOU'LL HAVE TO WAIT A BIT. WE SHOULD ACTUALLY HAVE BEEN AT THE NIGHTBREED COPY PARTY BUT THEY CANCELLED IT SO WE DECIDED TO GET PISSED INSTEAD (PRIORITIES RIGHT THERE I THINK!).   WELL TOMORROW (19TH) IS MY (MANIKIN'S) BIRTHDAY (19 AT LAST!) AT THIS MOMENT IT IS SPAZ'S BIRTHDAY (HE IS 16 NOW!) AND AT THIS VERY MOMENT HE IS PROBABLY ROLLING AROUND IN A DRUNKEN STUPOR AT HIS PARTY (AFTER HALF A PINT OF TIZER!!) , (DOGCOCK) THAT FOR THE LESS WELL EDUCATED WAS A COMMENT FROM THE NORTHERN TWATLANDS (LUV MANIKIN). (BETTER THAN BEING A SOUTHERN, SHANDY DRINKIN PIECE OF SHITE. LUV IAN ...) (THIS IS GETTING A BIT AREAIST ISN'T IT,  LUV SIMON, ALTHOUGH I HAVE TO AGREE BEING A PROFESSIONAL NORTHERNER MYSELF)  (DEUTSCHLAND UBER ALLES, LUV SAMMY JOE)  WHO WON THE WAR SHITBREATH, LUV MANIKIN, IAN AND SIMON. END OF CONVERSATION!!!!!!  OK ENOUGH OF THAT SHIT, THE LOST BOYS ARE NOW ONLY A 3 MEMBER CREW, THAT BEING SAMMY JOE, SPAZ AND MANIKIN, SPROG HAS NOW LEFT THE LOST BOYS TO PERSUE THE FULL TIME JOB OF BEING A SMALL LONG HAIRED HEAVY METAL FREAK!!! ( HE ACTUALLY DIED IN A CAR CRASH IN SWEDEN, LIKE CLIFF BURTON??? ). SPAZ HAS DONE MOST OF THE GRAPHICS IN THIS DEMO, ALL CODING ON ALL LOST BOYS SCREENS IS BY MANIKIN, SAMMY JOE LOOKED AFTER ALL THE OTHER INTERESTS OF  THE LOST BOYS CORPORATION ( SOUNDS GOOD HUH!!). THAT BEING THE LOST BOYS PUBLIC DOMAIN LIBRARY (ADDRESS ELSEWHERE!!)  WELL I GUESS THAT YOU HAVE NOW WAITED LONG ENOUGH SO NOW IT IS TIME FOR THE GREETINGS:-  WELL ALMOST TIME FOR THE GREETINGS FIRST WE HAVE AN APPEAL TO MAKE. THIS GOES TO ALL DEMO WRITERS, IF IN STOS, ASSEMBLER, GFA, OR ANY OTHER LANGUAGE. WE WANT YOUR DEMOS!!!  IT SOMETIMES SEEMS TO TAKE US MONTHS TO GET HOLD OF DEMOS.  WE ALWAYS RETURN DISKS USUALLY WITH SOMETHING NICE ON THEM AND WE WILL ALSO SPREAD YOUR PRODUCTS FURTHER AS WELL, SO PLEASE LET US HAVE THE FRUITS OF YOUR LOINS ( OR EVEN YOUR COMPUTERS!!!)   AND NOW BY POPULAR DEMAND.  FIRST OF ALL THE VERY SPECIAL GREETINGS. MEGA GREETING AND MEGA THANKS GO TO CIA OF GALTAN 6 FOR SAVING MY LIFE AND MY MENU AND FOR AIDING AND ABETTING THE CRIME OF THE CENTURY!!!, HOMEBOY (S.T.M. A VERY GOOD SOFTWARE SUPPLIER!!), STEFAN POSTHUMA AND RICHARD KARSMAKERS ( 2 OF THE ZANIEST GUYS EVER TO GRACE THE EARTH. SEE YOU SOON GUYS, WE ARE LOOKING FORWARD TO IT!!)  (FOR A SPECIAL LITTLE MESSAGE FROM RICK THE DICK LOOK AT TRACK 81 WITH DISK MONITOR!!), TEX (THE OLD MEN OF THE DEMO WORLD! QUITE AN ACHIEVMENT WHEN YOUR ALL UNDER 25! A SPECIAL GREETING TO THE INCREDIBLY BIG ONE! HI ES!), THE CAREBEARS (YOUR CUDDLY DEMOS WERE THE BEST, BUT WE THINK THAT WE HAVE BEATEN YOU, UNLESS YOU KNOW BETTER! AND OF COURSE YOU DO SO NOW I WAIT WITH BAITED BREATH FOR YOUR NEXT DEMO. ALSO MANY THANKS FOR YOUR HELP NICK!!!), PETER NEWCOMBE ( FOR SUPPORT BEYOND THE CALL OF DUTY, IE THE PC 	SHOW STAND, AND FOR BEING ONE OF THE MOST GENUINELY NICE GUYS WE HAVE EVER HAD THE PLEASURE OF MEETING!), CAMY MAERTENS AND SIMON RUSH AT BUDGIE UK (GREAT IDEA GUYS, MAKING MONEY FROM DEMOS, WE BELIEVE IT CAN BE DONE!!!), ALL THE GUYS AT THALION SOFTWARE ESPECIALLY HOLGER (SEE YOU SOON, AND THANKS FOR THE JOB ,IT IS A CHANCE IN A MILLION!!), MUG (MIKE YOU TOO ARE ONE OF THE NICEST BLOKES WE HAVE EVER MET, THANKS FOR YOUR FRIENDSHIP!!), THE REPLICANTS (WE BELIVE THAT YOUR DISK SPREADING METHOD IS THE FUNNIEST EVER, MAYBE YOU SHOULD BE THE TRANS-GRANDE-VITESSE CREW!!!), FOXX ( YET ANOTHER PERSON WITH WHOM I AM GREATLY LOOKING FORWARD TO MEETING UP WITH!!), ANDY THE ARFLING , PHIL AND CRISPY NOODLE ( YOU ARE THE ONLY OTHER LONDON CREW WITH ANY STYLE, THANKS (ANDY) FOR THE SCREEN AND CRISPY FOR THE WICKED MUSIC!! AND PHIL FOR THE WICKED WIT. BY THE WAY WHAT IS YOUR  CREW TOTAL FOR WRITTEN OFF CARS NOW!!!), SEWER RAT OF SEWERSOFT ( THE FURTHEST CONTACT WE GOT FROM THE DEF DEMO!! I THINK AUSTRALIA IS ABOUT AS FAR AS IT IS LIKELY TO GET!!!), OVERLANDERS ( YOUR DEMO MENUS ARE VERY GOOD, ) BUT WE TRUST THAT THIS WILL NOT BE APPEARING IN THEM !!!), AUTOMATION ( FOR THE BEST GAMES COMPACTS ON THE ST, IN PARTICULAR TO VAPOUR FOR HACKING CHAOS AND HENCE ALMOST CAUSING THE DOWNFALL OF CIVILIZATION AS WE KNOW IT!),  NEWLINE ( WHEN IS YOUR BIG ALLIANCE DEMO COMING OUT??), TREVOR 'THE PERVE' ( THE DREAM WEAVERS ), HACKATARIMAN (ANOTHER MEGA SOFTWARE SUPPLIER FROM ENGLAND! I THINK YOU SHOULD BE NEAR THE START OF THIS LIST OOOPS! ), SOME OF THE INNER CIRCLE (ST SQUAD, NICE TWISTER! DYNAMIC DUO, NICE DEMOS, GIZMO OF ELECTRONIC IMAGES, LONG TIME NO HEAR GUY!) , HARVEY LODDER ( GOOD PD DEMOS.), THE SKUNK (THANKS FOR THE DISKS AND THE USE OF THE MEGA ST AT 16 BIT FAIR!! AND FOR ALL YOUR SUPPORT, HOPE THIS SELLS WELL FOR BOTH OUR SAKES!), 16-32 BIT PD LIBRARY (THANKS FOR THE  DISKS AND THE SUPPORT!), PAGE 6 (LES ELLINGHAM AND YOUR CHARMING WIFE FOR PUTTING UP WITH OUR CONSTANT USE OF YOUR ST AT THE 16 BIT FAIR!), SOUTH WEST SOFTWARE LIBRARY, ROUND TABLE PD, ST CLUB, OLIVER (FROM GENEVA, NICE HOLIDAY LAST SUMMER, THANKS LUV SAMMY JOE!), DYLAN, MATTY, DEREK ( YOU HAVE THE BEST DOPE DEREK THANKS FOR MAKING MY BIRTHDAY A HIGH POINT!), VOLKER (AMIGA GUYS ARE NOT ALL BAD!), HENNING (THE GUARDIAN ANGEL AND ALL HIS FRIENDS), N.HAAS (SHADOW FAX), OBERJE (NICE NEW YEAR DEMO GUY!!), LES PLAYER ( FROM GFA DATA MEDIA UK, THANKS FOR THE TRANSLATION JOBS! YOU MAKE GREAT  PRODUCTS!), MICRODEAL (IN PARTICULAR JOHN SYMES AND ROB POVEY, QUARTET IS SIMPLY THE BEST 4 TRACK WE HAVE EVER SEEN!!!), MJS, THE GARLIC EATERS (GOOD DEMO), NIGHTBREED (SHAME YOU PARTY DID NOT COME OFF BUT WE DID AT LEAST GET OUR MAIN  SCROLL WRITTEN INSTEAD!!), THE BATS CREW (LATEST CONTACTS IN ISRAEL, GOOD DEMO!), KRUZ CREW (YEAH, THE FINS!!!), THE EQUALIZER, PIXEL TWINS, MPH, PREDATORS, JOHN PASS (DEMO CLUB!), WHACK, S.C.WEDGE, THE CONSTELLATIONS (THANKS FOR ALL THE FRENCH DEMOS ANDROMEDA.), AENIGMATICA (AGAIN I AM REALLY SORRY!),, DAD AND FRIENDS (NO NOT MY FATHER, THERE FROM FRANCE!!), THE ALIENS, MAX HEADROOM (LADDIE!!), AXESS, ALEX NGUYEN, AGGRESSION (XENIT AND LANCELOT!), WATCHMAN, POMPEY PIRATES WELL THAT JUST ABOUT COVERS ALL OF OUR IMMEDIATE FRIENDS AND CONTACTS (I'M PRAYING WE HAVE NOT FORGOTTEN ANYONE!!) NOW SOME GREETINGS TO PEOPLE WE DON'T (IN ALL CASES) KNOW, BUT DO GREATLY ADMIRE! SYNC (GREAT SCREEN ON SOWATT), OMEGA (ANOTHER GREAT SCREEN ON SOWATT, BEST SINUS DOTS I HAVE SEEN!, AND NEW YEAR DEMO 2 IS EXCELLENT!), MEDWAY BOYS (NICE COMPACTS, I AM GLAD YOU LIKE OUR ONE PLANE SCROLLER FONT OMEN!!),  ALL MEMBERS OF THE UNION NOT COVERED IN THE BIT ABOVE (LEVEL 16, DELTAFORCE, SOFTRUNNER GROUP ETC ), XXX INTERNATIONAL, FLEXIBLE FRONT, 2 LIFE CREW, NO CREW, VISION, NORDIC CODERS, FUSION, BLACK MONOLITH CREW, GIGABYTE CREW,  BOSS, COPY SERVICE STUTTGART (SORRY WE COULD NOT MAKE YOUR COPY PARTY LAST YEAR, IT SOUNDED FUN!), TNT CREW (EXCELLENT DEMOS AND AS FOR NO SECOND PRIZE WELL YOU NEARLY BLEW MY HEAD OFF!), PAULO SIMOES (NICE DEMO, HAVE YOU DONE ANY MORE!), THE ART MACHINE, STCS,  MCA,  STEVE BAK, JOHN M PHILLIPS, ALEX HERBERT, THE BULLFROG TEAM, THE SAN DIEGO COMPUTER CLUB           WELL I THINK THAT JUST ABOUT COVERS EVERY OWNER OF AN ST IN THE WORLD!! IF YOUR NOT HERE PARTICULARLY IF YOU THINK YOU SHOULD BE THEN I AM REALLY SORRY BUT DON'T BLAME ME I HAVE JUST SPENT OVER AN HOUR TRYING TO REMEMBER EVERYONE!!  WE HAVE HAD A REQUEST FROM A GOOD FRIEND OF OURS (S.T.M.) TO GREET A FEW OF HIS FRIENDS SO HERE GOES...-  ALLAN IN SUFFOLK, MARG AND BILLY BIZ, ROBBIE G!, PAUL RENE AND LYNDA DUBOIS    HOPE THATS OK STAN!!!    AND NOW FOR THAT OTHER OLD FAVOURITE THE FUCKING GREETINGS, THEY GO TO   GRIFF OF THE RESISTANCE, FOR SOMEONE WHO'S BALLS HAVEN'T DROPPED YET YOU SURE ARE A LITTLE WANKER, YOUR SCREEN WAS SUCH A TOTAL PIECE OF RIPPED SHIT THAT WE DECIDED NOT TO INCLUDE IT, I DON'T LIKE BEING SLAGGED OFF PARTICULARLY BY SOMEONE WHO HAS NO ORIGINAL IDEAS AND A TOTAL LACK OF STYLE AND I ALSO DON'T LIKE PEOPLE WHO SPREAD UNFINISHED COPIES OF MY SCREENS WHEN SPECIFICALLY ASKED NOT TOO, YOU  REALLY ARE THE SHITTIEST LITTLE KID I HAVE EVER MET.   MORE FUCKS GO TO THE PHANTOM, THE PROFESSIONAL DEMO WRITER!!, JOHN SYMES CAN'T HAVE SEEN YOUR DEMO BEFORE HE PAID YOU BECAUSE IF HE HAD THEN HE WOULD PROBABLY HAVE DIED LAUGHING JUST LIKE WE DID! AS FOR YOUR CLAIM TO HAVE GOT SYNC SCROLLING WORKING IN GFA BASIC, ANDY THE ARFLING AND I NEARLY DIED LAUGHING AT YOU!. GO ON A DIET YOU FAT BASTARD!!  LOVE MANIKIN, SAMMY JOE AND SPAZ OF THE LOST BOYS!!!       AND THAT COVERS THE FUCKING GREETINGS, BELIEVE ME THESE 2 GUYS REALLY DESERVE EVERYTHING THEY GET, I QUITE LOOK FORWARD TO SEEING WHAT THEY HAVE TO SAY TO US IN THEIR NEXT 'DEMOS'.   WELL THAT WAS PROBABLY THE LONGEST GREETINGS LIST YET SEEN IN A DEMO, SOME 8K OR DO I THINK!!!      IF YOU WISH TO CONTACT THE LOST BOYS ABOUT PD OR ANYTHING ELSE THEN OUR ADDRESS IS AS FOLLOWS   THE LOST BOYS,   22 O X F O R D   R O A D,   T E D D I N G T O N,  M I D D X,  T W 1 1   O P Z,  ENGLAND THIS WILL NOW BE REPEATED AGAIN.     THE LOST BOYS,   22 O X F O R D   R O A D,   T E D D I N G T O N,  M I D D X,  T W 1 1   O P Z,  ENGLAND.    IF YOU WANT MORE INFORMATION ABOUT THE LOST BOYS PD LIBRARY THEN READ ALL ABOUT IT IN THE LOST BOYS PD SCREEN ON THIS DEMO!! AND NOW A LITTLE ADDED EXTRA, WE RECENTLY RECEIVED A LETTER FROM JUST ABOUT THE MOST UNBELIEVABLE PLACE EVER. JUST TAKE A GUESS WHERE IT CAME FROM.     SPAIN          NO, RUN OF THE MILL           INDIA        BORING IN COMPARISON         NO THE LETTER CAME FROM OF ALL PLACES   MOSCOW IN THE U.S.S.R.  WE WERE SO TOTALLY FLABBERGASTED BY THIS THAT WE ALL SIMULTANEOUSLY FELL OFF OUR CHAIRS. SO AN ABSOLUTELY ENORMOUS MEGA- GIGA GREETING GOES TO DENIS ZUBKOW.  WE REALLY COULD NOR HAVE BEEN MORE SURPRISED IF YOU HAD TRIED. IT MADE OUR YEAR!!!     WELL NOW AFTER A SHORT BREAK ( ABOUT 2 MONTHS!!) THE DATE IS NOW FRIDAY 13TH APRIL 1990, THE MINDBOMB DEMO IS ALL BUT FINISHED AND TOMORROW I (MANIKIN) AM GOING TO HOLLAND TO VISIT STEFAN POSTHUMA (DIGITAL INSANITY) AND TOGETHER  WE WILL GO TO THALION SOFTWARE WHERE THIS DEMO WILL BE WELL AND TRULY FINISHED AMIDST MUCH DRINKING AND BEING MERRY IN MY PART!!  ALSO AT THALION THIS WEEK ARE ALL MEMBERS OF TCB AND TEX PLUS VARIOUS OTHER PERSONS OF DISTINCTION IN THE DEMO WORLD SO I THINK THIS IS A VERY GOOD PLACE TO COMPLETE THIS PROJECT.  AND NOW A SMALL ANNOUNCEMENT ON BEHALF OF THE DELTA FORCE. THERE WILL BE A COPY PARTY AT THE BEGINNING OF JUNE NEAR STUTTGART IN WEST GERMANY. CONTACT THEM IF YOU WANT DETAILS!!!  WELL DUE TO THE FACT THAT WE HAVE ALMOST NO MEMORY LEFT AT ALL THIS MAIN SCROLL TEXT WILL HAVE TO END JUST ABOUT NOW, THE SPURIOUS BULLSHIT WILL HOWEVER BE CONTINUING IN THE OTHER SCREENS ON THIS DEMO SO IF YOU LIKE READING THIS KIND  OF CRAP THEN YOU'L HAVE TO SWAP SCREENS AND READ IT SOMEWHERE ELSE.   LETS WRAP!!!                             ";
    const tmp = new canvas(640,480);
    this.scrolltext.init(tmp, this.font, 10);
    // What is man doing : Waiting, Hooked to a ladder, going Up/Down/Left/Right, Falling
    this.manState = 'w';
    // Man's step number for the animation
    this.manStep = 0;
    // Action's step number
    this.actionStep = 0;
    // Doors positions
    this.doors = new Map();
    '355-15:358-14:611-7:614-17:617-8:1162-6:1412-16:1341-9:789-13:2549-11:1901-10:2364-12:2584-4:1934-2:1454-3:3294-1:3303-5:3330-18'.split(':').forEach(v => {
      let [ind, val] = v.split('-');
      ind = parseInt(ind);
      this.doors.set(ind, val);
      this.doors.set(ind + 1, val);
    });
    this.ctrSin = 0.0;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the menu screen, exiting with "Escape" key will launch the
  // reset screen (don't forget to include it !)
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.restart();
    });
  }
  // Common start & restart actions
  restart() {
    this.running = true;
    clearMainDiv();
    this.can = new canvas(640, 480, "main");
    this.ctx = this.can.contex;
    this.scrolltext.dst = this.can;
    document.body.addEventListener('keydown', this.onKeyDown);
    document.body.addEventListener('keyup', this.onKeyUp);
    this.soundchip = new music('YM');
    this.soundchip.LoadAndRun(this.demoManager.basepath + 'Mindbomb.ym');
    window.requestAnimFrame(this.main);
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.displayMap();
      this.drawMan();
      this.interraction();
      this.scrolltext.draw(398);
      this.boringThings();

      window.requestAnimFrame(this.main);
    }
  }

  displayMap() {
    let t = this.pos - 330 - 160;
    for (let y = 0, dy = this.shiftY + 6; y < 13; y++, t += 80 - 22, dy += 32) {
      for (let x = 0, dx = this.shiftX - 32; x < 22; x++, t++, dx += 32) {
        this.tiles.drawTile(this.can, 83, dx, dy);
        this.tiles.drawTile(this.can, this.map[t], dx, dy);
      }
    }
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, 640, 22);
    this.ctx.fillRect(0, 390, 640, 80);
  }

  drawMan() {
    let til = 22;
    switch (this.manState) {
      case 'r':
        til = ~~(this.manStep / 2);
        break;
      case 'l':
        til = 7 + ~~(this.manStep / 2);
        break;
      case 'u':
      case 'd':
        til = 14 + ~~(this.manStep / 2);
        break;
      case 'h':
        til = 21;
        break;
      case 'f':
        til = 23;
    }
    this.man.drawTile(this.can, til, 286, 166);
  }

  interraction() {
    if (this.actionStep === 0) {
      // Is man falling?
      const ft = [28, 29, 30, 37, 38, 8, 9, 10, 11, 39, 40];
      if (!ft.includes(this.map[this.pos + 80]) && !ft.includes(this.map[this.pos + 81])) {
        this.manState = 'f';
        this.manStep = 0;
        // this.pos += 80;
      } else {
        switch (this.currentKey) {
          case 'ArrowLeft':
            // Can go left?
            if (![22, 23, 25, 26].includes(this.map[this.pos - 1]))
              this.manState = 'l';
            else
              this.manState = 'w';
            break;
          case 'ArrowRight':
            // Can go right?
            if (![22, 23, 25, 26].includes(this.map[this.pos + 2]))
              this.manState = 'r';
            else
              this.manState = 'w';
            break;
          case 'ArrowUp':
            // Can climb?
            if ([8, 9, 10, 11, 39, 40].includes(this.map[this.pos - 160]))
              this.manState = 'u';
            else if (['u', 'h', 'd'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            break;
          case 'ArrowDown':
            // Can go down?
            if ([8, 9, 10, 11, 39, 40].includes(this.map[this.pos + 80]))
              this.manState = 'd';
            else if (['u', 'h', 'd'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            break;
          default:
            // Was the man on a ladder (ie going up or down) before stopping?
            if (['u', 'h', 'd'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            this.manStep = 0;
        }
      }
    }

    // shifts playfield position
    if (this.manState !== 'w' && this.manStat !== 'h') {
      this.actionStep++;
      this.manStep = (this.manStep + 1) % 14;
      switch (this.manState) {
        case 'f':
        case 'd':
          this.shiftY = -8 * this.actionStep;
          break;
        case 'u':
          this.shiftY = 8 * this.actionStep;
          break;
        case 'l':
          this.shiftX = 8 * this.actionStep;
          break;
        case 'r':
          this.shiftX = -8 * this.actionStep;
          break;
      }
    }

    // Updates man's position after 4 frames
    if (this.actionStep === 4) {
      this.actionStep = 0;
      this.shiftX = this.shiftY = 0;
      switch (this.manState) {
        case 'f':
        case 'd':
          this.pos += 80;
          break;
        case 'u':
          this.pos -= 80;
          break;
        case 'l':
          this.pos--;
          break;
        case 'r':
          this.pos++;
          break;
      }
    }
  }

  boringThings(){
    this.ctx.drawImage(this.man.img, 192,192, 128, 66, 256, 26, 128, 66);
    let a = this.ctrSin;
    [160,192,224,256, 352,384,416,448].forEach((posx,i) => {
      this.tiles.drawTile(this.can, i+84, posx, ~~(292+50*Math.sin(a)));
      a += 0.4;
    });
    this.ctrSin += 0.07;
  }

  stop() {
    this.running = false;
    stopCodefMusic();
    document.body.removeEventListener('keydown', this.onKeyDown);
    document.body.removeEventListener('keyup', this.onKeyUp);
    clearMainDiv();
  }

  end() {
    this.stop();
    this.endCallback();
  }

  onKeyDown(event) {
    this.currentKey = event.key;
    if (this.currentKey === 'Escape')
      this.end(); // Ends the main screen demo => go to reset screen
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape', ' '].includes(this.currentKey))
      event.preventDefault();
    // Demo Selection
    if (this.currentKey === ' ' || this.currentKey === 'Enter') {
      this.currentKey = '';
      let demoNumber = this.doors.get(this.pos);
      if (demoNumber !== undefined) {
        demoNumber = parseInt(demoNumber);
        this.launchDemoByNumber(demoNumber)
          .then(this.restart);
      } else {
        console.log(this.pos);
      }
    }
  }

  launchDemoByNumber(num) {
    this.stop();
    console.log("Playing " + DemosByNumber[num]);
    return this.demoManager.playDemo(DemosByNumber[num]);
  }

  onKeyUp() {
    this.currentKey = '';
  }
}