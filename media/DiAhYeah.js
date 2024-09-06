class DiAhYeah {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.back = this.back.bind(this);
    this.bigScroll = this.bigScroll.bind(this);
    this.tinyScroll = this.tinyScroll.bind(this);
    this.codingForFun = this.codingForFun.bind(this);
    this.distLogo = this.distLogo.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['mind-logo2.png', 'DI-logo-1.png', 'di-tile.png', 'rain_64x64.png', 'minimini_16x16.png','Leavin_Teramis.sndh'])).then(data => {
      [this.mind, this.di, this.tile, this.bigFont, this.tinyFont, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let y,n,k,ct;
    const pi=Math.PI, sin=Math.sin;
    
    this.can = new canvas(640, 400);
    this.backCtr = 0;
    this.running = true;
    
    this.bigFont.initTile(64,64,32);
    this.bigScrollCan = new canvas(640, 80);
    this.bigScrolltext = new scrolltext_horizontal();
    this.bigScrolltext.scrtxt = "GREETINGS MORTALS AND BEHOLD THE THIRD DIGITAL INSANITY MINDBOMB SCREEN  AGAIN I HAVE FINISHED A DEMO AND I MUST SAY THAT I AM QUITE SATISFIED. WHAT STARTED OUT AS AN INNOCENT EXPERIMENT, HAS GROWN INTO A FULL-BLOWN DEMO. I DID 75 PERCENT OF THIS DEMO AROUND SEPTEMBER 1990, INCLUDING THE MOVING BACKGROUND, THE SMALL SCROLLINES AND THE BIG SCROLLER. THE MINDBOMB LOGO PLUS THE DIGITAL INSANITY LETTERS HAVE BEEN ADDED MONTHS AFTER I STOPPED CODING THIS SCREEN. REASONS ARE THAT ST NEWS 5.1 AND THE FINAL COMPENDIUM HAD TO BE FINISHED. WE WENT TO NORWAY, AND AFTER NOT CODING FOR SUCH A LONG TIME, IT WAS QUITE HARD FOR ME TO GET THE HANG OF IT AGAIN, BUT HERE IT IS, THE 'AH YEAH' SCREEN. SO WHAT DO I HAVE TO WRITE NOW? MAYBE SOME GREETINGS TO SOME BEEINGS ARE DUE RIGHT NOW. OK, I WOULD LIKE TO EXPRESS SINCERE FEELINGS OF GREETING TO THE FOLLOWING INDIVIDUALS THAT ARE ALSO QUITE KNOWN FOR THEIR KEEN KNOWLEDGE OF ST CODING OR THEIR OTHER ACTIVITIES ON OUR WONDERFUL MACHINE. ANYWAY, THEY GO TO: RICHARD KARSMAKERS (FOR OBVIOUS REASONS I FIGURE), TIM MOSS (FOR MAKING THE IMPOSSIBLE, ACHIEVING THE AMAZING AND MAKING THIS DEMO WHAT IT IS), LORD HACKBEAR (HI THERE! EMAIL YOU LATER!) REGARD THE AMAZING ANTIBEING (FOR BEEING GENERALLY INSANE AND JUST TOTALLY MAD), ALL THE THE GUYS AT THALION SOFTWARE (TALK ABOUT TALENT...GEEEZ), CIA AND THE OTHER DUDES FROM GALTAN SIX (CAN'T WAIT TO SEE THE FINAL VERSION OF THE MEGADEMO), AENIGMATICA (HEY GUYS??? WHAT'S UP WITH THAT DEMO OF YOURS?? WHEN IS IT GOING TO BE RELEASED??), ALL THE NUTTY NORVEGIANS (FROYSTEIN, OLE J., MORTEN, RONNY - PC??? - AND THE REST OF THEM), ASH AND MEL (THE EXTRAVAGANT ENGLISH NEVER CEASE TO AMAZE ME). OK, SINCE ALL THOSE FREAKS FROM THE SOWATT DEMO STARTED JIBBERING IN SWEDISH AND NORVEGIAN, WHY NOT INCLUDE SOME DUTCH HERE??? OK, HERE GOES: JA HOOR, WAT EEN GELUL ALLEMAAL HIER. NEDERDEERLANDS IN EEN SCROLLTEXT IS GELOOF IK NOG NOOIT GEDAAN, ALTHANS NIET IN EEN NIET-NEDERLANDS E DEMO. WAT EEN ONTZETTEND GE-EIKEL IS HET TOCH OM ZO'N DEMO TE MAKEN. AT DAT GEKLOOT MET INTERRUPTS EN PLANES EN ZO. IK WORDT ER AF EN TOE WEL EEN BEETJE ZIEK VAN, MAAR JA. HET ZIET ER TOCH WEL AARDIG UIT. VOORDAT MEN DENKT DAT IK HELEMBAAL GESTOORD GEWORDEN BEN, ZAL IK MAAR WEER OVERGAAN NAAR HET ENGELS!!!             RIGHT. WHAT A LOAD OF CRAP HUH? WELL, COME TO HOLLAND ONCE AND HEAR IT BEEING PRONOUNCED, YOU'LL PROBABLY DIE LAUGHING. IT IS WYRD (IF YOU THINK 'WYRD' IS WEIRD, WAIT UNTIL YOU SEE SOMETHING THAT IS 'WYRD'!), I CAN'T TELL!! HOWEVER, WE HAVE BEEN TO NORWAY AND THE LANGUAGE THEY SPEAK THERE IS CERTAINLY QUITE ABSURD!!    SLOWLY, I AM RUNNING OUT OF JUICE HERE. WHY NOT FABRICATE AN END TO THIS CRAP AND LET THE OL' WRAPPER DO HIS JOB. I MEAN THE LITTLE SUCKER HAS BEEN WAITING FOR THAT NULL BYTE A LONG TIME. BETTER GIVE HIM WHAT HE WANTS BEFORE THE DAMN PROGRAM BOMBS OUT ON YOU!    OK, MISTER WILLAM RAP, DO YOUR THING!!                                            ";
    this.bigScrolltext.init(this.bigScrollCan, this.bigFont, 8);

    this.degrCanBig = new canvas(1,9*4*13);
    y=0;
    "010-100-110-011-111-101-001-010-100".split('-').forEach(coef => {
      let [r,v,b] = coef.split('');
      "1234567654321".split('').forEach(k => {
        this.degrCanBig.contex.fillStyle = 'rgb(' + (r*36*k) + ',' + (v*36*k) + ',' + (b*36*k) + ')';
        this.degrCanBig.contex.fillRect(0, y, 1, 4);
        y+=4;
      });
    });
    this.ctrDegrBig=0;
    
    this.tinyFont.initTile(16,16,32);
    this.tinyDistCan = new canvas(740,400);

    this.tinyText = "HAS COME TO WRAP ... SO THIS IS THE THIRD DIGITAL INSANITY MINDBOMB SCREEN. IT IS GETTING TO BE TRENDY TO HAVE TONSA LITTLE SCROLLINES LIKE THESE IN DEMOS. SCREEN WRITTEN AROUND NOVEMBER 1989. SINCE SCROLLERS LIKE THIS COST A LOT OF MEMORY, I THINK TIME ";
    this.tinyMax = this.tinyText.length*16;
    this.tinyText += this.tinyText.substring(0,48);
    this.tinyCtr=0;
    this.tinyCtrDist=0;

    this.tinyDist = [];
    ct = x => this.tinyDist.push(~~x);
    for(n=0;n<200;n++)  ct(0);
    for(n=0; n<=4*pi; n+=pi/20)   ct(2*sin(n));
    for(n=0; n<1.5*pi; n+=pi/100) ct(10*sin(-n));
    for(n=0;n<80;n++)  ct(4);
    for(n=0;n<80;n++)  ct(-2);
    for(n=0;n<120;n++) ct(-6);
    for(n=0; n<3*pi; n+=pi/30)  ct(20*sin(n));
    for(n=0; n<6*pi; n+=pi/40)  ct(20*sin(n));
    for(n=0; n<8*pi; n+=pi/20)  ct(18*sin(n));
    for(n=0; n<8*pi; n+=pi/10)  ct(10*sin(n));
    for(n=0; n<=4*pi; n+=pi/20) ct(8*sin(n));
    for(n=0; n<=4*pi; n+=pi/20) ct(-8+8*sin(n));
    for(n=0; n<6*pi; n+=pi/40)  ct(20*sin(n));
    for(n=0; n<12*pi; n+=pi/30)  ct(40*sin(n));
    
    for(n=0;n<800;n++)  ct(0);

    this.tinyDist = this.tinyDist.map(k=>k+4);
    
    this.degrCanTiny = new canvas(1,400);
    ct = this.degrCanTiny.contex;
    y=0;
    "01-10".split('-').forEach(coef => {
      let [r,b] = coef.split('');
      "1234567654321".split('').forEach(k => {
        ct.fillStyle = this.fromRgb7(r*k, 0, b*k);
        ct.fillRect(0, y, 1, 16);
        y+=16;
      });
    });
    for(y=0;y<24;y++) this.tinyScroll();
    
    this.funCan = new canvas(640,74);
    this.funCtr = 0;
    this.funDegrCtr = 0;
    this.funDegrCan = new canvas(10,280);
    ct = this.funDegrCan.contex;
    y=0;
    "707-706-705-704-714-724-734-744-754-764-774-674-574-474-374-274-174-074-075-076-176-276-376-476-576-676-776-766-756-746-736-726-716-706-705-605-505-405-305-205-105-005-006-007-107-207-307-407-507-607-707-706-705-704-714-724-734-744-754-764-774-674-574-474-374-274-174-074"
    .split('-').forEach(c => {
      let [r,g,b] = c.split('');
      ct.fillStyle = this.fromRgb7(r,g,b);
      ct.fillRect(0,y,1,4);
      y+=4;
    });

    this.distCtr = 0;
    this.paused = false;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik.changeTrack(6);
      this.zik.play();
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused){
        this.can.clear();
      this.back();
        this.tinyScroll();
      this.bigScroll();
      this.codingForFun();
      this.distLogo();
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  distLogo(){
    for(let a=this.distCtr, x=0; x<512; x+=64, a+=0.2)
      this.ctx.drawImage(this.mind.img, x,0,64,64, x+80,~~(164+14*Math.sin(a)),64,64);
    this.distCtr += 0.084;
  }

  codingForFun(){
    const ct = this.funCan.contex;
    this.funCan.clear();
    ct.globalCompositeOperation = 'source-over';
    this.di.draw(this.funCan,~~(350*Math.sin(this.funCtr)-318), 0);
    ct.globalCompositeOperation = 'source-in';
    ct.drawImage(this.funDegrCan.canvas, 0,this.funDegrCtr,1,74, 0,0,640,74);
    
    this.funCan.draw(this.can, 0, 294);
    this.funCtr+=0.05;
    this.funDegrCtr++;
    if(this.funDegrCtr >= 200)
      this.funDegrCtr=0;
  }
  
  back(){
    let py = (~~(512+512*Math.sin(this.backCtr)) & 63);
    for(let y=0; y<468; y+= 34)
      for(let x=0; x<672; x+=32)
        this.tile.draw(this.can, x, y-py);
    this.backCtr += 0.015;
  }
  
  tinyScroll(){
    var x = this.tinyCtr & 15,
    pos = this.tinyCtr >> 4,
    im = this.tinyDistCan.contex.getImageData(0,16,740,400-16),
    ct = this.tinyDistCan.contex;
    ct.globalCompositeOperation = "source-over";
    // This allows to copy transparency "as is" instead of "applying transparency" while copying with draw or drawImage
    // -4 for permanent scroll to the left.
    ct.putImageData(im,-4,0);

    ct.clearRect(0,384,740,16);
    this.tinyFont.print(this.tinyDistCan, this.tinyText.substr(pos, 48), -x, 400-16);
    
    ct.globalCompositeOperation  = 'source-in';
    ct.drawImage(this.degrCanTiny.canvas, 0,0, 1,400, 0,0, 740,400);
    this.tinyDistCan.draw(this.can,0,0);

    this.tinyCtr += this.tinyDist[this.tinyCtrDist++];
    if(this.tinyCtrDist >= this.tinyDist.length)
      this.tinyCtrDist=0;
    if(this.tinyCtr < 0)
      this.tinyCtr = this.tinyMax;
    if(this.tinyCtr >= this.tinyMax)
      this.tinyCtr = 0;
  }
  
  bigScroll(){
    const bg = this.bigScrollCan, ct = bg.contex;
    bg.clear();
    ct.globalCompositeOperation  = 'source-over';
    this.bigScrolltext.draw(0);
    // Bend
    "87643221".split('').forEach((y,i) => {
      let xl = i<<5, xr = 640-32-xl;
      y = y<<1;
      ct.drawImage(bg.canvas, xl,0, 32,64, xl,y, 32,64);
      ct.clearRect(xl,0,32,y);
      ct.drawImage(bg.canvas, xr,0, 32,64, xr,y, 32,64);
      ct.clearRect(xr,0,32,y);
    });
    ct.globalCompositeOperation  = 'source-in';
    ct.drawImage(this.degrCanBig.canvas, 0,this.ctrDegrBig, 1,80, 0,0, 640,80);
    bg.draw(this.can,0,20);
    this.ctrDegrBig += 1;
    if(this.ctrDegrBig > 4*13*7)
      this.ctrDegrBig = 0;
  }

  fromRgb7(r,g,b){
    return 'rgb(' + (r*36) + ',' + (g*36) + ',' + (b*36) + ')';
  }

  stop() {
    this.running = false;
  }

  // removes event listeners before notifying the menu screen that the demo is finished
  end() {
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.zik.stop();
    this.endCallback();
  }

  // Event processor
  onKeyPressed(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
    if(event.key === 'p'){
      this.paused = !this.paused;
    }
  }
}