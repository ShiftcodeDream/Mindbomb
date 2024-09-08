class FoxTunnel {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.screx = this.screx.bind(this);
    this.allStars = this.allStars.bind(this);
    this.blabla = this.blabla.bind(this);
    this.changeBlabla = this.changeBlabla.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Foxx.png', 'Foxx_64x40.png', 'Classic_16x16.png'])).then(data => {
      [this.sprites, this.yellowFont, this.font] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let i;
    this.yellowFont.initTile(64,40,32);
    this.font.initTile(16,16,32);
    this.scrollCan = new canvas(640,40);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "WELCOME TO THE FOXX STARTUNNEL DEMO !    I AM SURE THAT MOST OF YOU HAVE NEVER HEARD ANYTHING ABOUT US. THIS IS QUITE NORMAL BECAUSE WE ONLY HAVE RELEASED SOME SMALL DEMO-SCREENS AND SOME DDR-CRACKS  (LONG LIVE THE XBIOS-8 CALL ....... BURPS)  BUT NOW ENOUGH OF THIS UNINTERESTING STUFF. I'LL BETTER TELL YOU ANYTHING ABOUT THIS DEMO-SCREEN. YOU MAY BE SUPRISED TO HEAR THAT I WAS WORKING ON THIS SCREEN FOR NEARLY 4 MONTHS BUT DON'T WORRY, I AM NOT THAT SLOW. I BEGAN CODING THIS SCREEN RIGHT AFTER THE CSS-CONVENTION IN SEPTEMBER BUT THEN I BEGAN CODING FOR A GAME COMPANY AND BECAUSE OF THIS I HAD ONLY VERY LITTLE TIME TO CODE THIS SCREEN. BUT, HOWEVER THIS SCREEN IS FINISHED NOW. LET'S JUST HOPE YOU LIKE IT  !!!!  NOW I COME TO SOMETHING VERY INTERESTING, SOMETHING YOU HAVE BEEN WAITING FOR VERY LONG TIME --- FOXX'S (SOUNDS STRANGE) MUSIC TASTE : FRONT 242, NITZER EBB, THE WEATHERMEN, A SPLIT SECOND, THE CASSANDRA COMPLEX, THE NEON JUDGEMENT, A'GRUMH (STRANGE NAME-GOOD MUSIC), SKINNY PUPPY, BORGHESIA AND LAST BUT NOT LEAST GOOD OL' DEPECHE MODE . (RAGE HAS THE SAME MUSIC TASTE BUT HE LIKES BON JOVI, WHITHE LION, METALLICA .....)  SO, IF YOU ARE AN ELECTRONIC BODY MUSIC FREAK YOU MAY CONTACT US AS WELL !!!!!  WHAT DO YOU THINK ABOUT THE MUSIC, IT WAS DONE BY OUR SOUND-MAN TANGENS. HE HAS MADE AN OWN DEMO IN JANUARY BUT UNDER AN OTHER LABEL CALLED ART MACHINE. ANYWAY HE IS STILL A MEMBER OF FOXX SO YOU WILL SURELY HEAR MORE OF THIS FANTASTIC SOUNDS IN THE FUTURE !!      .... UII, I JUST SAW THAT THERE ARE ONLY 400 BYTES LEFT FOR TEXT SO BYE BYE  ......... HOPE TO SEE YA SOON ...... LETS WARP (I MEAN WRAP)                                            ";
    this.scrolltext.init(this.scrollCan, this.yellowFont, 8);
    
    this.palettes = "111-001-100-110-011-010-101".split('-').map(code => {
      let c = code.split('');
      let r = [];
      for(i=1;i<8;i++)
        r.push('#' + c.map(f => (2*f*i).toString(16)).join('0') + '0');
      return r;
    });
    let k = [];
    for(i=2; i<16; i+=2)
      k.push('#00' + i.toString(16) + '0' + (i-2).toString(16) + 0);
    this.palettes.push(k);
    k = [];
    for(i=0; i<4; i++){
      k.push('#E00000');
      k.push('#E0E0E0');
    }
    this.palettes.push(k);
    
    this.nbStars = 200;
    this.stars = [];
    for(i=0; i<this.nbStars; i++)
      this.stars.push(this.aStarIsBorn());
                        
    this.currentPalet = 0;
    this.rotationSpeed = 0.0;
    this.ctrSpr = 0;
    
    this.blablaCan = new canvas(640,96);
    // Mode : 1=write, 2=clear
    this.blablaMode = 1;
    this.blablaFrames = 270;
    this.blablaLineCtr = -1;
    this.blablaX = 0;
    this.blablaY = 0;
    this.blablaLetter = 0;
    this.blablaText = [
      "      THIS IS THE FOXX-STARTUNNEL       ",
      "----------------------------------------",
      "   THIS IS OUR PART OF THE LOST-BOYSp   ",
      "        MIND-BOMB DEMO !!!!!!!!!!!      ",
      "",
      "      FOXX CONSISTS OF 3 ACTIVE AND 2   ",
      "            PASSIVE MEMBERS.            ",
      "         THE ACTIVE ONES ARE :          ",
      "         (IN NO SPECIAL ORDER)          ",
      "",
      "               > CHUCK <                ",
      "       (MASTER-EXEC CODER, SWAPPER)     ",
      "              > TANGENS <               ",
      "      (MASTER-EXEC SOUNDMAN,  CODER)    ",
      "               > RAGE <                 ",
      "         (GRAPHICS, LAME CODING)        ",
      "",
      "         THE PASSIVE ONES ARE :         ",
      "               [ GAG [                  ",
      "       (ZOCKING ALL DAY AND NIGHT)      ",
      "               [ BOY [                  ",
      "  (DOING STRANGE THINGS WITH HIS AMIGA) ",
      "",
      "   THE CREDITS FOR THIS DEMO GO TO :    ",
      "                                        ",
      "   CHUCK-CODING, COLORPALETTES, TEXT .. ",
      "    RAGE-LOGODESIGN, TEXT ..            ",
      " TANGENS-MUSIC                          ",
      "",
      "     IF YOU WANT TO READ SOMETHING      ",
      "   INTERESTING YOU SHOULD BETTER READ   ",
      "     THE SCROLLER JUST BELOW THIS.      ",
      "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",
      "",
      "                                        ",
      "WARNING! WARNING! WARNING! WARNING! WARN",
      ">>>> GO ON READING AT YOUR OWN RISK <<<<",
      "ING! WARNING! WARNING! WARNING! WARNING!",
      "",
      " STILL THERE ??                         ",
      "  FIRST MAKE SURE THAT THERE IS NO ONE  ",
      "       UNDER 18 WATCHING THIS DEMO      ",
      "",
      " TO PREVENT YOU FROM GETTING INSANE YOU ",
      " WILL HAVE TO PASS THE FOLLOWING TEST : ",
      "",
      " HOW MUCH COSTS A SPRITE ?              ",
      "   1) 1 SCANLINE                        ",
      "   2) 1a SCANLINES                      ",
      "   3) 313 SCANLINES                     ",
      "                                        ",
      "",
      " YES, YOU HAVE GUESSED IT !!!!          ",
      " THE CORRECT ANSWER IS :                ",
      "     --- 1 DM AT THE NEXT SHOP.         ",
      "                                        ",
      "                             (HAWHAW)   ",
      "",
      "   HAVE YOU ALREADY NOTICED THAT YOU    ",
      "   CAN USE THE KEYS 1-9 FOR DIFFERENT   ",
      "         STARFIELD-PALETTES.            ",
      " YOU CAN ALSO USE THE CURSOR RIGHT AND  ",
      "   LEFT KEYS FOR MANIPULATING THE STCS  ",
      "   (STARFIELD-TURNING-CONTROL-SYSTEM)   ",
      "",
      "   NOW SOME OF THE LATEST FOXX NEWS :   ",
      "SOME PEOPLE OF FOXX ARE NOW PROFESSIONAL",
      "            GAME-DESIGNERS              ",
      "    OF CAUSE WE WON'T SAY AT WHICH      ",
      "           COMPANY WE ARE.              ",
      "",
      " BUT WE ARE SURE YOU WILL RECOGNIZE US. ",
      "       JUST WATCH OUT WHEN YOU ARE      ",
      "           BUYING NEW GAMES.            ",
      " KNOWING THIS YOU WON'T BE SURPRISED TO ",
      "HEAR: FOXX WON'T CRACK ANY GAMES NO MORE",
      "",
      "  BUT DON'T WORRY: IF WE HAVE THE TIME  ",
      "    WE WILL CONTINIUE TO MAKE DEMOS     ",
      "              BIT BY BIT.               ",
      "                                        ",
      "                            @ TEX       ",
      "                              UNION 1989",
      "",
      "    WE BORROWED THIS TEX(T) FROM THE    ",
      "  UNION-DEMO BECAUSE WE ARE IN THE SAME ",
      "             SITUATION NOW.             ",
      "                                        ",
      "",
      "   SOME TIME AGO WE DICITED TO MAKE A   ",
      " MEGA-DEMO BUT THEN I BEGAN TO WORK FOR ",
      "             TEXS' COMANY.              ",
      "  BECAUSE OF THIS WE NEVER FINISHED IT  ",
      "    AND NOW THE SCREENS ARE TOO OLD.    ",
      "",
      " NOW WE WILL ONLY DO SOME SINGLE SCREENS",
      "YESTERDAY WE RECEIVED A LETTER FROM THE ",
      " REPLICANTS AND THEY INVITED US TO MAKE ",
      "   A SCREEN FOR THEIR MEGA-DEMO SO YOU  ",
      " WILL SEE ANOTHER SCREEN BY FOXX IN THE ",
      "          - REPLICANTS DEMO -           ",
      "",
      "         IS ANYBODY OUT THERE WHO       ",
      " KNOWS ANYTHING ABOUT THE ATARI LYNX ?? ",
      " WE GET A HIDDEN ORGASM EACH TIME WE SEE",
      "    THIS WOUNDERFUL PIECE OF HARDWARE   ",
      "              IN A MAGAZINE.            ",
      "",
      " IF YOU WANT TO GET IN CONTACT WITH US, ",
      "         WRITE TO CHUCK OR RAGE :       ",
      "----------------------------------------",
      "          PLK 088243 C                  ",
      "          D-2350 NEUMUENSTER            ",
      "          WEST-GERMANY                  ",
      "",
      "      NOW WE WILL COME TO THE MOST      ",
      " INTERESTING PART OF EVERY SCROLLTEXT --",
      "-- THE GREETINGS !                      ",
      "                                        ",
      "  FIRST GREETINGS TO ALL OUR FRIENDS :  ",
      "",
      " -TEX                                   ",
      " (DON'T WORRY, NEXT TIME WE MEET I WILL ",
      " BRING SOME BOELKSTOFF WITH ME, DARYL)  ",
      " - THE MANIAX                           ",
      "     AND THE WHOLE SOFTWARE FOUNDATION  ",
      " (THANK YOU VERY MUCH FOR THE SOFT)     ",
      "",
      " -LOST BOYS                             ",
      " (THANX FOR INVITING US TO YOUR DEMO)   ",
      " -REPLICANTS                            ",
      " (IS IT TRUE THAT SNAKE HAS A BIG NOSE?)",
      " -THE CAREBEARS                         ",
      " (HAVE YOU FINISHED YOUR COPYPARTYDEMO?)",
      "",
      " -DIGITAL INSANITY                      ",
      " (REALLY CRAZY LETTERS, STEFAN)         ",
      " -STD                                   ",
      " (HOPE WE CAN MEET AGAIN, SOON)         ",
      " -TNT CREW                              ",
      " (I REALLY LIKE YOUR SAMPLE-SOFTWARE)   ",
      "",
      " -ULM                                   ",
      " (I'M LOOKING FORWARD TO YOUR MEGA-DEMO)",
      " -TNT                                   ",
      " (REALLY FAST 3D STUFF)                 ",
      " -DELIGHT                               ",
      " (HEY JABBA, WHERE IS MY DISK ?)        ",
      "",
      " -GIGABYTE CREW                         ",
      " (HOPE TO MEET YOU ON THE CEBIT)        ",
      " -MAGNETIC                              ",
      " (YOU WILL GET MY REPLY SOON)           ",
      " -GCA                                   ",
      " (HI JOE)                               ",
      "",
      "                  NOW                   ",
      "  WE'LL COME TO THE -NORMAL- GREETING : ",
      "  (THAT MEANS TO PEOPLE WE DON'T KNOW   ",
      "               VERY WELL)               ",
      "",
      "      -DELTA FORCE, LEVEL 16, STCS-     ",
      "               AND 42 CREW              ",
      " (NICE TO HAVE MET YOU ON THE CSS-PARTY)",
      "           OTHER GREETINGS TO :         ",
      "                < GHOST >               ",
      "             < 2 LIFE CREW >            ",
      "",
      "                < SYNC >                ",
      "           < FLEXIBLE FRONT >           ",
      "         < THE CONSTELLATIONS >         ",
      "                < MCA >                 ",
      "             < THE VISION >             ",
      "     AND ALL MEMBERS OF AENIGMATICA     ",
      "",
      "            < ST CONNEXION >            ",
      "                < DMA >                 ",
      "             < AUTOMATION >             ",
      "          < XXX INTERNATONAL >          ",
      "               < NEXT >                 ",
      "             < BRAINPOWER >             ",
      "",
      "            < IN FLAGRANTI >            ",
      "              < NO CREW >               ",
      "         < THE BLADE RUNNERS >          ",
      "               < VECTOR >               ",
      "                                        ",
      ".. AND TO ALL THE GUYS I HAVE FORGOTTEN ",
      "",
      "                                        ",
      "                        .... LET'S WRAP "
    ];
    this.changeBlabla();
    this.running = true;
  }

  // Stars are managed in polar coordinates
  aStarIsBorn(){
    const r = Math.random, pi2 = Math.PI*2;
    // a: direction angle  d: distance from the center  s: star speed
    return {
      a: pi2 * r(),
      d: 30 + 10 * r(),
      s: 5 + 5 * r()
    }
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 540, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.allStars();
      this.bees();
      this.blabla();
      this.screx();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  blabla(){
    if(this.blablaFrames-- < 0){
      switch(this.blablaMode){
        case 1:
          const text = this.blablaText[this.blablaLineCtr];
          this.font.print(this.blablaCan, text.charAt(this.blablaLetter++), this.blablaX, this.blablaY);
          this.blablaX += 16;
          if(this.blablaLetter >= text.length)
            this.changeBlabla();
           this.blablaFrames = 1;
          break;
        case 2:
          this.blablaCan.contex.clearRect(0, this.blablaY++, 640, 1);
          if(this.blablaY >= 96){
            this.blablaMode = 1;
            this.blablaY = 0;
             this.blablaFrames = 20;
          }
          break;
      }
    }
    this.blablaCan.draw(this.can, 0, 340);
  }
  
  changeBlabla(){
    this.blablaX = 0;
    this.blablaLetter = 0;
    this.blablaY += 16;
    
    this.blablaLineCtr++;
    if(this.blablaLineCtr >= this.blablaText.length){
      this.blablaLineCtr = 0;
      this.blablaY = 0;
      this.blablaMode = 2;
       this.blablaFrames = 100;
    }else if(this.blablaText[this.blablaLineCtr].length == 0){
      this.blablaLineCtr++;
      this.blablaY = 0;
      this.blablaMode = 2;
       this.blablaFrames = 100;
    }
  }
  
  bees(){
    let i=0,x,y;
    for(i=0; i<3; i++){
      x = 176 + 176*Math.cos(this.ctrSpr*3 + i*2*Math.PI/3);
      y = 160 + 100*Math.sin(this.ctrSpr*2 + i*2*Math.PI/3) + 30*Math.sin(this.ctrSpr*8);
      this.ctx.drawImage(this.sprites.img, 0,i*52, 288,52, ~~x,~~y, 288,52);
    }
    this.ctrSpr += 0.03;
  }
  
  allStars(){
    this.stars = this.stars.map(star => {
      let colorId;
      // star evolves
      star.a += this.rotationSpeed;
      star.d += star.s;
      // cartesian coordinates
      let x = 320 + star.d * Math.cos(star.a);
      let y = 278 + star.d * Math.sin(star.a);
      // Out of bounds? Star not drawn
      if(star.d > 413)
        return this.aStarIsBorn();
      
      switch(true){
        case star.d < 35:
          colorId = 0;
          break;
        case star.d < 45:
          colorId = 1;
          break;
        case star.d < 64:
          colorId = 2;
          break;
        case star.d < 98:
          colorId = 3;
          break;
        case star.d < 150:
          colorId = 4;
          break;
        case star.d < 235:
          colorId = 5;
          break;
        default:
          colorId = 6;
      }
      if(y > 60){
        this.ctx.fillStyle = this.palettes[this.currentPalet][colorId];
        this.ctx.fillRect(~~x,~~y,2,2);
      }
      
      return star;
    })
  }
  
  screx(){
    this.scrollCan.clear();
    this.scrollCan.contex.globalCompositeOperation = 'source-over';
    this.scrolltext.draw(0);
    this.scrollCan.contex.globalCompositeOperation = 'source-atop';
    this.scrollCan.contex.drawImage(this.sprites.img, 288,0, 2,40, 0,0, 640,40);
    this.scrollCan.draw(this.can, 0, 462);
  }
  
  stop() {
    this.running = false;
  }

  // removes event listeners before notifying the menu screen that the demo is finished
  end() {
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.endCallback();
  }

  // Event processor
  onKeyPressed(event) {
    // Starfield color change
    const code = parseInt(event.keyCode);
    if(code >= 49 && code <= 57){
      this.currentPalet = code - 49;
      event.preventDefault();
      return;
    }
    console.log({key:event.key, code:code});
    switch(event.key){
      case "ArrowLeft":
        this.rotationSpeed -= 0.01;
        event.preventDefault();
        break;
      case "ArrowRight":
        this.rotationSpeed += 0.01;
        event.preventDefault();
        break;
      case ' ':
        event.preventDefault();
        this.stop();
        break;
      // TODO : delete
      case 'l':
        console.log(this);
    }
  }
}