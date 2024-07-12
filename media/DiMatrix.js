class DiMatrix {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['digits_10x10_48.png', 'Cyber_32x32.png','MatrixBalls.png'])).then(data => {
      [this.tinyDigits, this.font, this.balls] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.tinyDigits.initTile(10,10,48);
    this.font.initTile(32,32,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "YEAH, ANOTHER DOC SPRITE SCREEN. THIS TIME IT IS CODED BY DIGITAL INSANITY e  NOW I KNOW THE FONT IS TOO SMALL AND THE SCROLL IS TOO FAST, BUT SINCE I DIDN'T WANT TO SPEND MUCH PROCESSOR TIME DOING THE BLOODY SCROLL, I JUST TOOK THE EASY WAY.    WELL, THERE'S NOT MUCH TO SAY ABOUT THIS SCREEN. MANY PEOPLE HAVE DONE DOC SPRITES BUT I THOUGH IT WAS NICE TO DO MY OWN VERSION.   fghij          e e       ALL CODING BY `abcd, THE BIG FONT WAS PORTED FROM AN AMIGA (THANXX TO THE OBLITERATOR FROM THE POWERSLAVES), THE SMALL FONT IS A RIPOFF FROM BALLISTIX AND THE BALLS WHERE DRAWN BY MYSELF (YEAH). THE EXCELLENT MUSIC WAS OF COURSE DONE BY MAX, THE MAD ONE. IT IS THE 'SCOOP' SOUNDTRACK. AS USUAL, I USED DEVPACK TO CREATE THE CODE AND GFA BASIC TO DO ALL THE GRAPHIC CONVERSIONS AND SINE TABLE CREATING. FINALLY,  NEOCHROME WAS USED FOR THE ARTWORK HANDLING.    `abcd        TIME FOR SOME GREETINGS HERE, FIRST THE SPECIAL ONES. THEY GO TO... EVERYBODY AT THALION SOFTWARE (TEX'N FRIENDS, I'LL VISIT YOU SOON!) .....  RICHARD KARSMAKERS (METALLICAAAAAA!!!!!) ......  ROONY, TOBJORN, GARD AND FROYSTEIN (THE NUTTY NORWEGIANS!! WE'LL COME!!!) ...  RONNY, DID YOU KNOW THAT THE DOG OF THE LOCAL AMIGA OWNER HERE (THE OBLITERATOR) IS CALLED 'RONNY'.... IT IS THE SMALLEST AND MOST ABSURD DOG I HAVE EVER SET EYES ON. WATY TO GO!!!!     [[DIGITAL INSANNITY]]    fghij    OK NORMAL GREETINGS TO..... CIA AND ONE FROM GALTAN SIX (GOOD LUCK WITH THE MEGA DEMO!) ..... AENIGMATICA (HOPE I SPELLED IT RIGHT, KEEP UP THE NICE DEMOS) .....  THE CAREBEARS (THE CUDDLY DEMOS ARE SMASHING...),  THE REPLICANTS, 42 CREW, IN FLAGRANTI, AND ALL OTHER GUYS (CAN'T THINK OF RAY MORE NAMES RIGHT NOW, MIGHT ADD SOME MORE LATER).   e e e e    OK LET ME TELL YOU SOMETHING ABOUT THE BACKGROUND OF THIS SCREEN. AFTER BEHOLDING THE MEGABALLS SCREEN FROM THE CUDDLY DEMOS, I WAS FASINATED BY THE WAVEFORMS THE CAREBEARS USED. AFTER SOME FIGURING OUT, I STARTED TO CODE A DOC SCREEN, AND IT LOOKED PRETTY NICE. IT WAS JUST SOMETHING TO PLAY AROUND WITH, BUT WHEN I WENT TO THE PCW SHOW AND VISITED THE LOST BOYS, THEY WERE SO ENTHOUSIASTIC ABOUT THE SCREEN THAT THEY WANTED IT IN THE MINDBOMB DEMO!  SO IT WAS FINISHED AS SOON AS I GOT HOME SOME DAYS LATER. THEN ONE NIGHT, I WENT TO THE OBLITERATOR OF THE POWERSLAVES AND HE SHOWED ME A DMO WITH SOME VERY AMAZING SPRITE WAVES. AFTER SOME TOYING WITH IT, I REALIZED THAT THEY USED DOUBLE SINE TABLES AND IT DAWNED UPON ME THAT THIS WAS THE CLUE TO SOME REALLY GREAT WAVEFORMS IN SCREEN. SO THE NEXT MORNING I STARTED CODING AND TWO HOURS LATER IT WAS THERE, A DOC SPRITE SCREEN WITH SOME REALLLY NEAT WAVEFORMS. IT TOOK ME ABOUT A DAY TO FINISH IT OFF AND FIND SOME NICE PRESETS. HOPE YOU LIKE IT!!!  eee T  OK, TIME TO WRAP THIS SCROLLTEXT, THIS IS A `abcd PRODUCTION.   ALL RIGHTS RESERVED!!   WHAT A CRAP!!!    HELLO ZEALOT!!!    RONNY!!!! THIS IS THE END OR SOMETHING..........                                  A";
    
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.scrolltext.init(this.can, this.font, 8);
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.scrolltext.draw(400-32);
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
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
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
  }
}