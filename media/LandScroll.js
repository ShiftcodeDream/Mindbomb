class LandScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    });
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['LandscrollSprites.png','LandscrollBack.png', 'Classic_16x16.png'])).then(data => {
      [this.sprites, this.backs, this.font] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.font.initTile(16,16,32);
    this.scrollCan = new canvas(320,200);
    this.distCan = new canvas(640,200);
    this.enableAliazing(this.scrollCan);
    this.enableAliazing(this.distCan);
    this.scrolltext = new scrolltext_vertical();
    this.scrolltext.scrtxt = "   \\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]    AW SHIT IT'S A SCROLLING LINE!!  THOSE FUCKING LOST BOYS HAVE DONE IT AGAIN AND BLOWN MY MIND. GOOD DEMOS, FIRST SEEN ON THE AMIGA, NOW SHOWING, COURTESY OF THE LOST BOYS. BEST ON THE ST, MODESTY HAS  NEVER BEEN OUR STRONGEST POINT. WE ARE THE BEST SO FORGET THE REST!!! THIS DEMO HAS BEEN GRADUALLY WRITTEN, THEN RE-WRITTEN AND THEN HAD EVEN MORE BITS ADDED TO IT BETWEEN JUNE 1989 AND MARCH 1990. THIS MAKES IT ONE OF THE OLDEST SCREENS ON THIS DEMO.  THE TROUBLE WITH ALL OF THE CODING FOR THIS DEMO IS THAT WE KEPT ON LEARNING EXTRA  LITTLE TRICKS TO SPEED UP OUR CODE OR THOUGHT UP BETTER WAYS OF CODING OUR SCREENS WHICH ALLOWED US MORE TIME FOR OTHER THINGS. FOR INSTANCE THIS SCREEN WAS REWRITTEN COMPLETELY ON AT LEAST THREE SEPERATE OCCASIONS. AT ONE POINT IT WAS EVEN RUNNING WITH NO BORDERS ON THE SCROLLINE, BUT THIS WAS VERY COMPLEX  TO MANAGE AND SO WE GAVE THAT IDEA UP.   SPAZ'S GRAPHIX ARE REALLY EXCELLENT AND THE SIGNS LOOK GOOD.  AS YOU WOULD EXPECT IT USES 100 PERCENT OF THE AVAILABLE PROCESSOR TIME AND IS OPTIMIZED AS FAR AS WE FEEL NECESSARY.   I HAVE BEEN TRYING TO WORK OUT HOW MANY HOURS I HAVE WORKED ON THIS DEMO, AND THE RESULT IS REALLY SHOCKING I'M SURE THAT THIS MUST BE THE MOST  WORKED UPON DEMO IN THE HISTORY OF THE ST.  I CODED THE FIRST SCREEN IN ABOUT APRIL 1989 AND NOW 10 MONTHS LATER I'M STILL WORKING ON IT AND I DOUBT VERY MUCH IF IT WILL BE FINISHED  MUCH BEFORE APRIL 1990!!!!!!  WHO SAYS HACKERS ARE LAZY BASTARDS WHO RIP OF THE COMPUTER INDUSTRY. WE WORK HARDER THAN MOST FUCKING GAME DESIGNERS SO IF ANYONE SLAGS US OFF THEN FUCK THEM!!!!!! HAVE YOU TRIED THE ARROW KEYS ON THE KEYBOARD YET.     CLEVER HUH!  I WAS GOING TO MAKE THE SCREEN DO THAT AUTOMATICALLY BUT EVERYONE LIKES A BIT OF AUDIENCE PARTICIPATION ON DEMOS SO I LEFT IT TO YOU INSTEAD!  MY NEW STARFIELD HAS ALLOWED THIS SCREEN TO BECOME ONE OF MY FAVOURITES ON THE WHOLE DEMO. IT GETS THE VERY BEST OUT OF THE ST I THINK WITHOUT USING ANY SPECIAL TRICKS OR STUFF!.   I HAVE NOT BOVERED TO WORK OUT HOW MUCH PROCESSOR TIME EACH PART OF THE SCREEN TAKES BUT IT MUST GO SOMETHING LIKE THIS FOR ANYONE WHO IS INTERESTED.  STARFIELD 10 PERCENT, SPRITES (FULLY MASKED) 35-40 PERCENT, RASTER SCROLL 20 PERCENT AND THE SIGNS MAKE UP THE REST OF THE PROCESSOR TIME. THIS SCREEN DOES OF COURSE USE 100 PERCENT CPU TIME. (GOES WITHOUT SAYING REALLY!)   ANYWAY I CANNOT THINK OF ANYMORE THINGS TO WRITE IN THIS SCROLL SO I GUESS I'M GOING TO WRAP NOW.  HOPE YOU LIKED THIS!!!          WRAP!!!!!!!............. ";
    this.scrolltext.init(this.scrollCan, this.font, 1.5);

    this.ctrCenter = 0;
    this.shifted = 0;
    this.curve = [

151,182,154,181,157,181,160,181,163,181,166,180,169,180,173,179,176,178,179,177,182,176,185,175,188,174,190,172,193,171,196,169,199,168,201,166,204,164,207,162,209,160,211,158,214,156,216,154,218,151,220,149,222,147,224,144,226,141,228,139,229,136,231,133,232,130,234,128,235,125,236,122,237,119,238,116,239,113,240,109,240,106,241,103,241,100,241,97,241,94,242,91,241,87,241,84,241,81,241,78,240,75,240,72,239,68,238,65,237,62,236,59,235,56,234,53,232,51,231,48,229,45,228,42,226,40,224,37,222,34,220,32,218,30,216,27,214,25,211,23,209,21,207,19,204,17,201,15,199,13,196,12,193,10,190,9,188,7,185,6,182,5,179,4,176,3,173,2,169,1,166,1,163,0,160,0,157,0,154,0,151,0,147,0,144,0,141,0,138,0,135,1,132,1,128,2,125,3,122,4,119,5,116,6,113,7,111,9,108,10,105,12,102,13,100,15,97,17,94,19,92,21,90,23,87,25,85,27,83,30,81,32,79,34,77,37,75,40,73,42,72,45,70,48,69,51,67,53,66,56,65,59,64,62,63,65,62,68,61,72,61,75,60,78,60,81,60,84,60,87,60,90,60,94,60,97,60,100,60,103,61,106,61,109,62,113,63,116,64,119,65,122,66,125,67,128,69,130,70,133,72,136,73,139,75,141,77,144,79,147,81,149,83,151,85,154,87,156,90,158,92,160,94,162,97,164,100,166,102,168,105,169,108,171,111,172,113,174,116,175,119,176,122,177,125,178,128,179,132,180,135,180,138,181,141,181,144,181,147,181,151,179,154,177,156,174,159,172,162,169,164,166,166,164,168,161,170,158,171,155,173,152,174,149,175,146,178,147,181,148,184,149,188,150,191,150,194,151,198,151,201,151,205,151,209,151,213,150,216,150,220,149,220,145,220,141,220,137,220,134,219,130,218,127,218,123,217,120,215,117,214,114,213,111,211,108,209,105,212,104,215,102,218,100,220,98,223,96,225,93,228,91,230,88,232,85,234,82,236,78,238,75,240,72,237,69,233,67,230,65,227,63,224,61,221,59,218,58,214,57,211,55,208,55,205,54,201,53,198,53,199,50,199,47,199,43,199,40,199,37,198,33,198,30,197,26,196,23,195,19,194,16,192,12,190,9,187,9,183,10,179,12,176,13,172,14,169,16,166,17,163,19,160,21,158,23,155,25,153,28,151,30,148,28,146,25,143,23,141,21,138,19,135,17,132,16,129,14,125,13,122,12,118,10,114,9,111,9,109,12,107,16,106,19,105,23,104,26,103,30,103,33,102,37,102,40,102,43,102,47,102,50,103,53,100,53,96,54,93,55,90,55,87,57,83,58,80,59,77,61,74,63,71,65,68,67,64,69,61,72,63,75,65,78,67,82,69,85,71,88,73,90,76,93,78,96,81,98,83,100,86,102,89,104,92,105,90,108,88,111,87,114,86,117,84,120,83,123,83,127,82,130,81,134,81,137,81,141,81,145,81,149,85,150,88,150,92,151,96,151,100,151,103,151,107,151,110,150,113,150,117,149,120,148,123,147,126,146,127,149,128,152,130,155,131,158,133,161,135,164,137,166,139,169,142,172,145,174,147,177,151,182,155,180,159,180,163,178,167,177,171,175,175,173,178,170,181,167,183,164,185,160,186,156,187,153,189,150,189,147,188,142,187,140,186,137,185,134,183,132,181,130,179,129,177,129,175,128,173,128,170,128,168,129,166,130,165,132,164,134,163,136,162,139,162,141,163,144,164,146,165,149,167,152,169,154,172,156,175,159,178,160,181,161,185,161,189,163,193,162,197,162,202,160,206,159,209,156,213,154,217,152,220,149,222,145,225,141,227,137,228,133,229,128,230,124,230,120,230,116,229,111,227,108,226,104,224,101,222,98,219,96,216,94,213,93,211,92,208,91,204,90,202,90,199,91,198,92,196,94,194,95,193,98,192,100,192,101,192,103,192,106,194,108,195,110,197,112,199,114,201,114,204,115,207,115,210,116,213,115,217,115,220,112,223,111,226,108,229,106,232,103,234,99,236,95,238,91,239,87,239,83,239,78,239,74,239,69,238,65,235,60,233,57,231,53,228,50,225,47,221,45,217,42,214,41,210,40,207,39,202,39,199,39,195,40,193,41,190,43,188,44,185,47,183,49,183,51,182,53,181,56,182,58,182,60,183,62,185,64,186,65,188,67,190,67,193,68,195,67,197,67,200,65,202,64,204,62,206,60,209,57,210,54,211,51,212,47,212,43,212,40,211,35,210,31,209,28,207,24,204,19,201,17,198,13,195,11,191,8,187,7,182,5,178,5,174,4,170,4,164,5,160,5,156,7,153,8,150,11,147,13,144,16,142,19,140,22,139,25,138,29,138,31,138,34,139,37,140,40,140,42,142,44,144,45,146,47,148,47,150,48,152,47,154,47,156,45,158,44,160,42,160,40,161,37,162,34,162,31,162,29,161,25,160,22,158,19,156,16,153,13,150,11,147,8,144,7,140,5,136,5,130,4,126,4,122,5,118,5,113,7,109,8,105,11,102,13,99,17,96,19,93,24,91,28,90,31,89,35,88,40,88,43,88,47,89,51,90,54,91,57,94,60,96,62,98,64,100,65,103,67,105,67,107,68,110,67,112,67,114,65,115,64,117,62,118,60,118,58,119,56,118,53,117,51,117,49,115,47,112,44,110,43,107,41,105,40,101,39,98,39,93,39,90,40,86,41,83,42,79,45,75,47,72,50,69,53,67,57,65,60,62,65,61,69,61,74,61,78,61,83,61,87,62,91,64,95,66,99,68,103,71,106,74,108,77,111,80,112,83,114,87,115,90,116,93,115,96,115,99,114,101,114,103,112,105,110,106,108,108,106,108,103,108,101,108,100,107,98,106,95,104,94,102,92,101,91,98,90,96,90,92,91,89,92,87,93,84,94,81,96,78,98,76,101,74,104,73,108,71,111,70,116,70,120,70,124,71,128,72,133,73,137,75,141,78,145,80,149,83,152,87,154,91,156,94,159,98,160,102,162,107,162,111,163,115,161,119,161,122,160,125,159,128,156,131,154,133,152,135,149,136,146,137,144,138,141,138,139,137,136,136,134,135,132,134,130,132,129,130,128,127,128,125,128,123,129,121,129,119,130,117,132,115,134,114,137,113,140,112,142,111,147,111,150,113,153,114,156,115,160,117,164,119,167,122,170,125,173,129,175,133,177,137,178,141,180,145,180,151,182,156,181,161,181,166,181,172,181,177,180,182,180,187,179,192,178,197,177,202,176,207,175,212,174,217,172,221,171,226,169,231,168,235,166,239,164,243,162,248,160,252,158,255,156,259,154,263,151,266,149,269,147,273,144,276,141,279,139,281,136,284,133,286,130,288,128,291,125,292,122,294,119,296,116,297,113,298,109,299,106,300,103,301,100,301,97,301,94,302,91,301,87,301,84,301,81,300,78,299,75,298,72,297,68,296,65,294,62,292,59,291,56,288,53,286,51,284,48,281,45,279,42,276,40,273,37,269,34,266,32,263,30,259,27,255,25,252,23,248,21,243,19,239,17,235,15,231,13,226,12,221,10,217,9,212,7,207,6,202,5,197,4,192,3,187,2,182,1,177,1,172,0,166,0,161,0,156,0,151,0,145,0,140,0,135,0,129,0,124,1,119,1,114,2,109,3,104,4,99,5,94,6,89,7,84,9,80,10,75,12,70,13,66,15,62,17,58,19,53,21,49,23,46,25,42,27,38,30,35,32,32,34,28,37,25,40,22,42,20,45,17,48,15,51,13,53,10,56,9,59,7,62,5,65,4,68,3,72,2,75,1,78,0,81,0,84,0,87,0,90,0,94,0,97,0,100,1,103,2,106,3,109,4,113,5,116,7,119,9,122,10,125,13,128,15,130,17,133,20,136,22,139,25,141,28,144,32,147,35,149,38,151,42,154,46,156,49,158,53,160,58,162,62,164,66,166,70,168,75,169,80,171,84,172,89,174,94,175,99,176,104,177,109,178,114,179,119,180,124,180,129,181,135,181,140,181,145,181,151,182,156,181,162,181,166,181,171,181,173,181,175,181,176,181,175,181,174,180,171,180,169,180,165,180,163,179,161,179,160,178,160,178,161,178,163,177,166,177,171,176,176,175,182,175,188,174,194,174,199,173,203,172,207,172,208,171,210,170,209,169,208,169,206,168,203,167,199,166,197,165,194,164,192,163,192,162,192,161,193,160,195,159,199,158,204,157,209,156,214,155,220,154,225,153,229,151,233,150,235,149,236,148,236,147,235,145,233,144,230,143,227,141,223,140,220,139,217,137,215,136,214,135,215,133,216,132,218,130,222,129,227,128,231,126,237,125,241,123,246,122,250,120,252,119,253,117,253,116,251,114,250,113,246,111,243,109,238,108,234,106,230,105,228,103,226,102,225,100,225,98,226,97,229,95,232,94,236,92,241,91,245,89,249,87,252,86,255,84,256,83,256,81,255,79,253,78,249,76,245,75,241,73,236,72,231,70,227,68,224,67,222,65,222,64,221,62,223,61,225,59,228,58,232,56,236,55,240,53,243,52,245,51,247,49,246,48,245,46,242,45,240,44,235,42,230,41,224,40,219,38,214,37,210,36,207,34,205,33,204,32,204,31,206,30,208,28,211,27,214,26,218,25,221,24,222,23,224,22,224,21,223,20,221,19,217,18,213,17,208,16,202,15,196,14,191,13,185,12,182,12,179,11,177,10,176,9,176,9,178,8,181,7,183,7,187,6,189,6,192,5,193,4,194,4,192,3,191,3,187,3,184,2,178,2,172,1,166,1,160,1,155,1,150,0,147,0,144,0,142,0,142,0,143,0,145,0,147,0,150,0,153,0,155,0,157,0,158,0,158,0,156,0,153,0,150,0,145,1,140,1,134,1,128,1,122,2,116,2,113,3,109,3,108,3,106,4,107,4,108,5,111,6,113,6,117,7,119,7,122,8,124,9,124,9,123,10,121,11,118,12,115,12,109,13,104,14,98,15,92,16,87,17,83,18,79,19,77,20,76,21,76,22,78,23,79,24,82,25,86,26,89,27,92,28,94,30,96,31,96,32,95,33,93,34,90,36,86,37,81,38,76,40,70,41,65,42,60,44,58,45,55,46,54,48,53,49,55,51,57,52,60,53,64,55,68,56,72,58,75,59,77,61,79,62,78,64,78,65,76,67,73,68,69,70,64,72,59,73,55,75,51,76,47,78,45,79,44,81,44,83,45,84,48,86,51,87,55,89,59,90,64,92,68,94,71,95,74,97,75,98,75,100,74,102,72,103,70,105,66,106,62,108,57,109,54,111,50,113,49,114,47,116,47,117,48,119,50,120,54,122,59,123,63,125,69,126,73,128,78,129,82,130,84,132,85,133,86,135,85,136,83,137,80,139,77,140,73,141,70,143,67,144,65,145,64,147,64,148,65,149,67,150,71,151,75,153,80,154,85,155,91,156,96,157,101,158,105,159,107,160,108,161,108,162,108,163,106,164,103,165,101,166,97,167,94,168,92,169,91,169,90,170,92,171,93,172,97,172,101,173,106,174,112,174,118,175,124,175,129,176,134,177,137,177,139,178,140,178,140,178,139,179,137,179,135,180,131,180,129,180,126,180,125,181,124,181,125,181,127,181,129,181,134,181,138,181,144,181,151,182,157,181,163,181,169,181,176,181,182,180,188,180,193,179,199,178,204,177,209,176,214,175,218,174,222,172,226,171,229,169,232,168,235,166,237,164,239,162,240,160,241,158,241,156,241,154,241,151,240,149,239,147,237,144,235,141,232,139,229,136,226,133,222,130,218,128,214,125,209,122,204,119,199,116,193,113,188,109,182,106,176,103,169,100,163,97,157,94,151,91,144,87,138,84,132,81,125,78,119,75,113,72,108,68,102,65,97,62,92,59,87,56,83,53,79,51,75,48,72,45,69,42,66,40,64,37,62,34,61,32,60,30,60,27,60,25,60,23,61,21,62,19,64,17,66,15,69,13,72,12,75,10,79,9,83,7,87,6,92,5,97,4,102,3,108,2,113,1,119,1,125,0,132,0,138,0,144,0,150,0,157,0,163,0,169,0,176,0,182,1,188,1,193,2,199,3,204,4,209,5,214,6,218,7,222,9,226,10,229,12,232,13,235,15,237,17,239,19,240,21,241,23,241,25,241,27,241,30,240,32,239,34,237,37,235,40,232,42,229,45,226,48,222,51,218,53,214,56,209,59,204,62,199,65,193,68,188,72,182,75,176,78,169,81,163,84,157,87,151,90,144,94,138,97,132,100,125,103,119,106,113,109,108,113,102,116,97,119,92,122,87,125,83,128,79,130,75,133,72,136,69,139,66,141,64,144,62,147,61,149,60,151,60,154,60,156,60,158,61,160,62,162,64,164,66,166,69,168,72,169,75,171,79,172,83,174,87,175,92,176,97,177,102,178,108,179,113,180,119,180,125,181,132,181,138,181,144,181,151,182,154,181,157,181,160,180,163,178,166,176,169,174,173,171,176,168,179,164,182,160,185,156,188,151,190,147,193,141,196,136,199,130,201,125,204,119,207,113,209,106,211,100,214,94,216,87,218,81,220,75,222,68,224,62,226,56,228,51,229,45,231,40,232,34,234,30,235,25,236,21,237,17,238,13,239,10,240,7,240,5,241,3,241,1,241,0,241,0,242,0,241,0,241,0,241,1,241,3,240,5,240,7,239,10,238,13,237,17,236,21,235,25,234,30,232,34,231,40,229,45,228,51,226,56,224,62,222,68,220,75,218,81,216,87,214,94,211,100,209,106,207,113,204,119,201,125,199,130,196,136,193,141,190,147,188,151,185,156,182,160,179,164,176,168,173,171,169,174,166,176,163,178,160,180,157,181,154,181,151,182,147,181,144,181,141,180,138,178,135,176,132,174,128,171,125,168,122,164,119,160,116,156,113,151,111,147,108,141,105,136,102,130,100,125,97,119,94,113,92,106,90,100,87,94,85,87,83,81,81,75,79,68,77,62,75,56,73,51,72,45,70,40,69,34,67,30,66,25,65,21,64,17,63,13,62,10,61,7,61,5,60,3,60,1,60,0,60,0,60,0,60,0,60,0,60,1,60,3,61,5,61,7,62,10,63,13,64,17,65,21,66,25,67,30,69,34,70,40,72,45,73,51,75,56,77,62,79,68,81,75,83,81,85,87,87,94,90,100,92,106,94,113,97,119,100,125,102,130,105,136,108,141,111,147,113,151,116,156,119,160,122,164,125,168,128,171,132,174,135,176,138,178,141,180,144,181,147,181

    ];
    this.snakeCtr = 0;
    this.paused = false; // TODO : remove
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(768, 540, "main");
      this.ctx = this.can.contex;
      this.enableAliazing(this.can);

      this.starfield = [
        new starfield3D(this.can, 100, 3, 640, 200, 384, 0, '#fff', 100, 64,80),
        new starfield3D(this.can, 100, 3, 640, 200, 384, 0, '#888', 100, 64,80)
      ].map(s => {
        s.draw = Object.getPrototypeOf(this).overrideDrawStarfield.bind(s);
        return s;
      });
      this.tlb = [
        new TlbSprite(this.can, 64, this.sprites),
        new TlbSprite(this.can, 480, this.sprites)
      ];
      setTimeout(()=> this.tlb.forEach(t => t.enable()), 9000);

      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused) {
        this.can.clear();
        this.background();
        this.logos();
        this.screx();
        this.snake();
      }
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
    switch(event.key){
      case ' ':
        event.preventDefault();
        this.stop();
        break;
      case 'p':
        this.paused = !this.paused; // TODO : remove
        break;
      case 'l':
        console.log(this);
        break;
      case 'ArrowLeft':
        this.shifted = (this.shifted + 2) % 32;
        break;
      case 'ArrowRight':
        this.shifted = (this.shifted - 2) % 32;
        break;
    }
  }

  snake(){
    let idx = this.snakeCtr;
    for(i=0; i<10; i++){
      this.ctx.drawImage(this.sprites.img,
                         398,0,32,32,
                         64 + this.curve[idx]*2, 60 + this.curve[idx+1]*2,
                         32,32);
      idx += 10;
      if(idx > this.curve.length)
        idx -= this.curve.length;
    }
    this.snakeCtr += 2;
    if(this.snakeCtr > this.curve.length)
      this.snakeCtr = 0;
  }
  
  screx(){
    let i;
    const ct = this.scrollCan.contex;
    const ctd = this.distCan.contex;
    this.scrollCan.clear();
    this.distCan.clear();
    this.scrolltext.draw(0);

    for(i=1; i<21; i++)
      ct.drawImage(this.scrollCan.canvas,0,0,16,200, i*16,0,16,200);
    ctd.globalCompositeOperation = 'source-over';
    for(i=0;i<200;i++) {
      // Zoom factor from 9/8 to 35/4
      let f = 1.125 + 0.038125*i;
      ctd.drawImage(this.scrollCan.canvas,
        0, ~~(i/4), 320, 2,
        ~~(320-(320+this.shifted)*f), i, ~~(640*f), 2
        );
    }
    ctd.globalCompositeOperation = 'source-atop';
    ctd.drawImage(this.backs.img, 1,0,1,200, 0,0,640,200);
    ctd.globalCompositeOperation = 'source-over';

    this.distCan.draw(this.can, 64,260);
  }
  background(){
    this.starfield.forEach(s=>s.draw());
    this.ctx.drawImage(this.backs.img,0,0,1,200, 0,260,770,200);
    this.ctx.fillStyle = "#0000C0";
    this.ctx.fillRect(0,460,768,80);
  }

  logos(){
    this.ctx.drawImage(this.sprites.img,
      0,0,174,108,
      296,~~(102 + 40*Math.sin(this.ctrCenter+=0.07)),
      174,108
    );
    this.tlb.forEach(t => t.draw());
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0,768,60);
  }

  // Overrides "draw" method in the starfield to draw points instead of lines.
  overrideDrawStarfield(){
    var tmp=this.dest.contex.strokeStyle;
    var tmp2 = this.dest.contex.globalAlpha;
    var tmp3 = this.dest.contex.lineWidth;
    this.dest.contex.globalAlpha=1;
    this.dest.contex.fillStyle=this.color;

    for(var i=0;i<this.n;i++){
      this.test=true;
      this.star_x_save=this.star[i][3];
      this.star_y_save=this.star[i][4];
      this.star[i][0]+=(this.centx-this.x)>>4; if(this.star[i][0]>this.x<<1) { this.star[i][0]-=this.w<<1; this.test=false; } if(this.star[i][0]<-this.x<<1) { this.star[i][0]+=this.w<<1; this.test=false; }
      this.star[i][1]+=(this.centy-this.y)>>4; if(this.star[i][1]>this.y<<1) { this.star[i][1]-=this.h<<1; this.test=false; } if(this.star[i][1]<-this.y<<1) { this.star[i][1]+=this.h<<1; this.test=false; }
      this.star[i][2]-=this.star_speed; if(this.star[i][2]>this.z) { this.star[i][2]-=this.z; this.test=false; } if(this.star[i][2]<0) { this.star[i][2]+=this.z; this.test=false; }
      this.star[i][3]=this.x+(this.star[i][0]/this.star[i][2])*this.star_ratio;
      this.star[i][4]=this.y+(this.star[i][1]/this.star[i][2])*this.star_ratio;
      if(this.star_x_save>0&&this.star_x_save<this.w&&this.star_y_save>0&&this.star_y_save<this.h&&this.test){
        this.dest.contex.fillRect(this.star_x_save+this.offsetx,this.star_y_save+this.offsety, 2, 2);
      }
    }
    this.dest.contex.strokeStyle=tmp;
    this.dest.contex.globalAlpha=tmp2;
    this.dest.contex.lineWidth=tmp3;
  }

  enableAliazing(canvas){
    const c = canvas.contex;
    c.imageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = c.webkitImageSmoothingEnabled = false;
  }

}

class TlbSprite{
  constructor(canvas, xpos, sprites){
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    });
    this.ctx = canvas.contex;
    this.xpos = xpos;
    this.sprites = sprites;
    this.ctr = 0;
    this.x = xpos + 44;
    this.y = -108;
    this.zoom = 0.6;
    this.speed = 2;
    this.enabled = false;
    this.animate = () => {};
    this.animations = [
      this.initTranslate,
      this.initZoomInOut,
      this.initRotate
    ];
  }
  _draw(){
    this.ctx.drawImage(this.sprites.img,
      174,0,224,108,
      this.x, this.y, ~~(224*this.zoom), ~~(108*this.zoom)
    );
  }
  draw(){
    if(this.enabled){
      if(this.animate()){
        this.randomEffect();
      }
      this._draw();
    }
  }
  enable(){
    this.enabled = true;
    this.animate = this.translate;
  }
  randomEffect(){
    this.animations[~~(this.animations.length*Math.random())] ();
  }
  initTranslate(){
    this.x = this.xpos + 44;
    this.zoom = 0.6;
    this.speed = -2;
    this.animate = this.translate;
  }
  translate(){
    this.y += this.speed;
    if(this.speed < 0 && this.y < -108)
      this.speed *= -1;
    return (this.speed > 0 && this.y >= 124);
  }
  initZoomInOut(){
    this.ctrFrames = 120;
    this.ctr = -Math.PI/2;
    this.animate = this.zoomInOut
  }
  zoomInOut(){
    const s = Math.sin(this.ctr += Math.PI/30);
    this.zoom = 0.8 + 0.2 * s;
    this.x = this.xpos + 112 * (1-this.zoom);
    this.y = 118 + 10 * (1-s);
    return (--this.ctrFrames < 0)
  }
  initRotate(){
    this.ctrFrames = 300;
    this.ctr = -Math.PI/2;
    this.sens = Math.sign(Math.random()-0.5);
    this.animate = this.rotate
  }
  rotate(){
    const c = Math.cos(this.ctr);
    const s = Math.sin(this.ctr += Math.PI/50 * this.sens);
    this.zoom = 0.8 + 0.2 * s;
    this.x = this.xpos + 112 * (1-this.zoom);
    this.y = 108 + 30 * c;
    return (--this.ctrFrames < 0)
  }
}