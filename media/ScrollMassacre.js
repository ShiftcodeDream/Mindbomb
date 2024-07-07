class ScrollMassacre {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.distScroller = this.distScroller.bind(this);
    this.startVertical = this.startVertical.bind(this);
    this.vertScroller = this.vertScroller.bind(this);
    this.startBigScroll = this.startBigScroll.bind(this);
    this.bigScroller = this.bigScroller.bind(this);
    this.startGreenScroll = this.startGreenScroll.bind(this);
    this.greenScroller = this.greenScroller.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['army_16x16.png', 'bold_64x32.png', 'thin_32x32.png', 'megadeath-blue_128x128.png'])).then(data => {
      [this.tinyFont, this.roundFont, this.thinFont, this.bigFont] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.tinyFont.initTile(16,16,32);
    this.roundFont.initTile(64,32,32);
    this.thinFont.initTile(32,32,32);
    this.bigFont.initTile(128,128,32);
    this.littleText = "                                        YEAH! LOADSA SCROLLINES. CODED BY MANIKIN OF THE LOST BOYS FOR THE MINDBOMB DEMO, BECAUSE I WAS BORED AND HAD AN HOUR TO SPARE ONE SUNDAY AFTERNOON IN MANCHESTER!!!  TLB HAVE THE FASTEST CODE ON THE ST.. WE ARE THE BEST, FORGET THE REST!!                                                                                ";
    const yellowText = "AHHH! YET MORE SCROLLS. I THINK IF YOU COUNT YOU WILL FIND THAT THERE ARE ABOUT FORTY LINES ON THIS SCREEN. NOT BAD HUH?  AND WHATS MORE SOME OF THEM ARE ALMOST READABLE!  WELL I DID SAY SOME THAT CERTAINLY DOES NOT MEAN ALL!!!  ";
    const redText = "FOR ANYONE INTERESTED THIS SCREEN WAS COMPLETED AT THREE IN THE MORNING ON THE TENTH OF FEBRUARY NINETEEN NINETY WHILE UNDER THE INFLUENCE OF A HEAVY NIGHTS DRINKING. I HAVE ABSOLUTELY NO IDEA HOW I MANAGED TO GET THE CODE TOWORK!!!!";
    const bigText = "AND FINALLY HERE IS THE FINALE FOR THIS SCREEN[  I THINK THAT THIS IS QUITE ENOUGH SCROLLS DO YOU NOT]    THIS IS THE DID YOU KNOW THAT] SCROLLINE[   IT CONTAINS STUPID FACTS AND FIGURES AND USELESS IN FORMATION ABOUT THIS MAMMOTH DEMO AND ITS PRODUCTION TEAM[ FIRST OF ALL THE LOST BOYS HAVE THREE MEMBERS[   MANIKIN[  WHO DOES ALL THE CODING AND SHIT[   SPAZ WHO DOES MOST OF THE GRAPHICS[ AND SAMMY JOE WHO DOES MOST OF THE SELLING AND LETTER WRITING AND BASICALLY KEEPS THE LOST BOYS RUNNING\  THIS DISK IS THE BIGGEST DEMO OF ITS KIND EVER CODED ON THE ST[  THIS DISK CONTAINS OVER TWO MEGABYTES CODE AND SCREENS PACKED ONTO A STANDARD TEN SECTOR FORMATTED DISK[  ITS TAKEN US OVER ONE YEAR TO COMPLETE THIS ENORMOUS DEMO ALTHOUGH NONE OF THE ORIGINAL SCREENS WRITTEN ARE NOW INCLUDED ON THIS DISK[ THE OLDEST SCREEN IS THE LANDSCAPE SCREEN AND THIS WAS FINISHED IN EARLY JUNE LAST YEAR[ THE NEWEST SCREEN ON THIS DISK IS THE DIGISYNTH SCREEN AND THIS WAS CODED AT THE VERY END OF MARCH NINETEEN NINETY[ THE PROGRAMMING TOOLS USED ON TO CREATE THIS DEMO WERE DEVPAC ST FOR ALL ASSEMBLER CODING[ DEGAS ELITE FOR ALL GRAPHICS AND GFA BASIC FOR THE MANY AND VARIED WAVES AND DATA[  ALL MEMBERS OF THE LOST BOYS ARE UNDER TWENTY YEARS OF AGE AND WE THINK THIS PROBALY MAKES US ONE OF THE YOUNGEST ACTIVE CREWS ON THE ST[ MANIKIN IS NINETEEN AND CURRENTLY STUDYING SOFTWARE ENGINEERING AT MANCHESTER UNIVERSITY[  SAMMY JOE IS SIXTEEN AND CURRENTLY DOING HIS OBERSTUFE AT THE GERMAN SCHOOL IN LONDON[ SPAZ IS ALSO SIXTEEN AND CURRENTLY STUDYING FOR HIS GCSE EXAMS AT A SECONDARY SCHOOL IN TEDDINGTON[  SAMMY JOE AND SPAZ LOVE HEAVY AND SPEED METAL MUSIC[ MANIKIN HATES HEAVY METAL AND LIKES ALMOST EVERYTHING ELSE[ WE ALL HATE ANYTHING PRODUCED BY STOCK AITKEN OR WATERMAN AND WOULD GLADLY PUKE ON JASON DONAVANS HEAD[  WE HAVE ALSO HEARD THAT KYLIE MINOUGUE GIVES GOOD HEAD AND WOULD THEREFORE LIKE TO MEET HER\ SNAKE HAS A BIG NOSE[ CHUCK OF FOXX TOLD ME THIS AND SAID THAT I SHOULD TYPE IT SOMEWHERE\[ ONE OF OUR BEST CONTACTS FOR HACKED SOFTWARE IS A PRIEST[ NO KIDDING\ REALLY\  IS THE COPYING OF SOFTWARE ILLEGAL IN THE EYES OF GOD WE ASK] COKE IS ONE OF THE NICEST DRINK IN THE WORLDS BUT NEWCASTLE BROWN ALE IS BETTER[ SPAZ HAS LONG HAIR AND LOOKS LIKE A WOMBLE[ SAMMY JOE IS GERMAN BUT ITS NOT HIS FAULT\ MANIKIN HAS GREY HAIR AND HENCE IS KNOWN AS AN OLD MAN\  WE ONCE HAD A LETTER FROM A LITTLE KID WHO WANTED A SIGNED PHOTOGRAPH OF US[ WE WERE IMPRESSED BY HIS GOOD TASTE BUT I DO NOT THINK THAT HE GOT THE PHOTO\  THE STRANGEST PLACE THAT WE HAVE YET RECIEVED A LETTER FROM IS      WAIT FOR IT\          MOSCOW IN RUSSIA FROM A DENNIS ZUBCHOW\  YO GUY\     WE HAVE ALSO HAD LETTERS FROM EVERY COUNTRY IN EUROPE WITHOUT EXCEPTION AND THE FURTHEST LETTER WE HAVE HAD IS FROM SEWERSOFT IN AUSTRALIA AND I DOUBT IF WE WILL EVER BEAT THAT\ RICHARD KARSMAKERS LOOKS EXTREMELY SILLY IN A SUIT\    STEFAN POSTHUMA IS TWENTY THREE YEARS OLD ON APRIL FOURTEENTH AND I AM GOING TO HIS BIRTHDAY PARTY IN UTRECHT[  THIS DEMO WAS FINALLY COMPLETED AT THALION SOFTWARE IN THE COMPANY OF TCB AND TEX[    I AM RUNNING OUT OF THINGS TO SAY VERY RAPIDLY\         WE ARE GOING TO SELL THE SOURCE LISTINGS FOR SCREENS IN THIS DEMO AGAIN[   MANY PEOPLE WILL PROBABLY THINK WE ARE EXTREMELY MAD TO DO THIS BUT WE ARE IN BAD NEED OF SOME MONEY AND IT WORKED REALLY WELL LAST TIME SO WE DECIDED TO DO IT AGAIN\  EACH INDIVIDUAL SCREEN WILL BE AVAILABLE FROM THE LOST BOYS AT THE  BARGAIN PRICE OF TEN POUNDS STERLING EACH[ UNFORTUNATELY WE WILL NOT BE SELLING THE SOURCE FOR THE MAIN MENU OR THE SOURCE FOR OUR DIGISYNTH AS THEY ARE TOO VALUABLE TO US[ IF YOU WANT TO BUY A SCREEN THEN WRITE TO US AT THE ADDRESS  ELSEWHERE IN THIS DEMO[ CHEQUES SHOULD BE MADE PAYABLE TO DAVID MOSS[ SPAZ[   IF ANYONE ELSE IS INTERESTED MANIKINS NAME IS TIM MOSS[ WE ARE BROTHERS SURPRISINGLY ENOUGH AND SAMMY JOES NAME IS MICHAEL SHUESSLER[ WE ARE VERY PROUD OF THIS DEMO AND HAVE PUT AN EXTREMELY LARGE AMOUNT OF HARD WORK INTO IT[ IF YOU FEEL LIKE DONATING MONEY TO US THEN THIS WOULD BE VERY WELL RECIEVED AND YOU WOULD FOREVER HAVE OUR GRATITUDE[  AS YOU WILL ALREADY KNOW THIS DEMO IS NOT PUBLIC DOMAIN AND IS LICENSED TO BUDGIE UK[ YOU MUST THEREFORE HAVE AN AGREEMENT WITH BUDGIE UK OR LOST BOYS BEFORE YOU SELL OUR DEMOS OR WE PROMISE THAT YOU WILL HAVE THE FULL WAIT OF  F[A[S[T[ DOWN ON YOUR HEAD FOR DEFRAUDING US\\  THIS THEN CONCLUDES OUR SCROLLTEXT FOR THIS SCREEN[ LETS WRAP\\\\\\\\";
    const greenText = "OH YES, I NEARLY FORGOT THERE ARE ALSO THESE SCROLLINES!!          THE ALL SINGING AND ALL DANCING           þ  WIBBLY WOBBLY SCROLLINE           CODED BY MANIKIN ON 19-04-89.... (YEP ITS THAT OLD!!)            I'M JUST GLAD THAT I FINALLY FOUND A USE FOR THIS BLOODY SCROLL, WAS WONDERING IF THERE WAS EVER GOING TO BE SPACE ON A SCREEN FOR IT.  FUNNY I'VE GOT A LOT OF ROUTINES LIKE THAT!!!!             þ  MAYBE I'LL WRITE AN ODDMENTS SCREEN ONE OF THESE DAYS. ANYWAY THATS ABOUT ALL I HAVE TO SAY FOR THIS SCROLLINE. BYE FOR NOW!!!";
    
    this.distCurve = [];
    const s = (ampl, pas, nb, cst) => {
      for(let a=0; a<2*Math.PI*nb; a+=2*Math.PI/pas)
        this.distCurve.push(~~(ampl*Math.sin(a) + cst));
    }
    s(10,80,5,4);
    s(6,40,7,2);
    s(10,150,2,6);
    
    this.scrollCanvas = new canvas(640,400);
    this.ctrScroll = 0;
    this.ctrDist = 0;
    this.maxTexte = (this.littleText.length-41)*16;
    this.rasterLittle = new canvas(2,400);
    "EEE-CEC-CCC-ACA-AAA-8A8-888-686-666-464-444-242-222-242-444-464-666-686-888-8A8-AAA-ACA-CCC-CEC-EEE".split('-').forEach((c,i)=>{
      this.rasterLittle.contex.fillStyle = '#'+c;
      this.rasterLittle.contex.fillRect(0,i*16,2,16);
    });
    
    this.vertScroll = false; // TODO : passer à false
    this.vertCan = new canvas(64,400);
    this.vertScrollY = new scrolltext_vertical();
    this.vertScrollY.scrtxt = yellowText;
    this.vertScrollY.init(this.vertCan, this.thinFont, 2);
    this.vertScrollR = new scrolltext_vertical();
    this.vertScrollR.scrtxt = redText;
    this.vertScrollR.init(this.vertCan, this.thinFont, 2);
    
    this.vertRaster = new canvas(64,400);
    let inc = 0;
    const c = this.vertRaster.contex;
    const k = (a,i) => {
      c.fillStyle = '#'+a+a+'0';
      c.fillRect(0,i*32+inc,32,32);
      c.fillStyle = '#'+a+'00';
      c.fillRect(32,i*32+inc,32,32);
    };
    "ECA84".split('').forEach(k);
    inc = 272;
    "48ACE".split('').forEach(k);
    
    this.bigScroll = false; // TODO : passer à false
    this.bigScrolltext = new scrolltext_horizontal();
    this.bigScrolltext.scrtxt = bigText;
    
    this.greenScroll = false; // TODO : passer à false
    this.greenCan = new canvas(640,32);
    this.greenCanDist = new canvas(640,108);
    this.greenScrolltext = new scrolltext_horizontal();
    this.greenScrolltext.scrtxt = greenText;
    this.greenScrolltext.init(this.greenCan, this.roundFont, 4);
    this.greenCtr = 0;
    
    this.running = true;    
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.bigScrolltext.init(this.can, this.bigFont, 8);
      setTimeout(this.startVertical, 6500);
      setTimeout(this.startGreenScroll, 18000);
      setTimeout(this.startBigScroll, 30000);
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.distScroller();
      this.vertScroller();
      this.greenScroller();
      this.bigScroller();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  startVertical(){
    this.vertScroll = true;
  }
  startBigScroll(){
    this.bigScroll = true;
  }
  startGreenScroll(){
    this.greenScroll = true;
  }
  
  bigScroller(){
    if(!this.bigScroll)
      return
    this.bigScrolltext.draw(144);
  }
  
  greenScroller(){
    if(!this.greenScroll)
      return;
    this.greenCan.clear();
    this.greenCanDist.clear();
    this.greenScrolltext.draw(0);
    for(let a=this.greenCtr, x=0; x<640-31; x+=32, a+=0.03){
      let y = ~~(38+38*Math.sin(a));
      this.greenCanDist.contex.drawImage(this.greenCan.canvas, x,0,32,32, x,y,32,32);
    }
    this.greenCtr += 0.06;
    this.greenCanDist.draw(this.can,0,2);
    
    for(let ys=0,yd=398; ys<106; ys+=2,yd-=2)
      this.can.contex.drawImage(this.greenCanDist.canvas, 0,ys,640,2, 0,yd,640,2);
  }
  
  vertScroller(){
    if(!this.vertScroll)
      return;
    this.vertCan.clear();
    this.vertCan.contex.globalCompositeOperation = 'source-over';
    this.vertScrollY.draw(0);
    this.vertScrollR.draw(32);
    this.vertCan.contex.clearRect(0,142,64,132);
    this.vertCan.contex.globalCompositeOperation = 'source-in';
    this.vertRaster.draw(this.vertCan,0,0);
    for(let x=32; x<640-64; x+=64)
      this.vertCan.draw(this.can, x,0);
  }
  
  distScroller(){
    const x = this.ctrScroll & 15; // Modulo 16
    const pos = this.ctrScroll >> 4; // Divide by 16
    const ct = this.scrollCanvas.contex;
    
    ct.globalCompositeOperation = "source-over";
    let im = ct.getImageData(0,192,640,200);
    ct.putImageData(im,0,192+16);
    im = ct.getImageData(0,16,640,200);    
    ct.putImageData(im,0,0);

    this.ctx.clearRect(0,192,640,16);
    ct.clearRect(0,192,640,16);
    this.tinyFont.print(this.scrollCanvas, this.littleText.substr(pos, 41), -x, 192);
    ct.globalCompositeOperation = "source-in";
    ct.drawImage(this.rasterLittle.canvas,0,0,2,400, 0,0,768,400);
    this.scrollCanvas.draw(this.can,0,0);

    this.ctrScroll += this.distCurve[this.ctrDist++];
    if(this.ctrDist >= this.distCurve.length)
      this.ctrDist=0;
    if(this.ctrScroll < 0)
      this.ctrScroll = this.maxTexte;
    if(this.ctrScroll >= this.maxTexte)
      this.ctrScroll -= this.maxTexte;
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