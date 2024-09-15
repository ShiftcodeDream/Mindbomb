class ParaScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.tiles = this.tiles.bind(this);
    this.errance = this.errance.bind(this);
    this.big = this.big.bind(this);
    this.colorize = this.colorize.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Red_LB.png', 'Red_Bubles.png', 'Carre_LB.png', 'Dalton_20x20.png', 'ParaScroll.sndh'])).then(data => {
      [this.sprites, this.bubles, this.backLogo, this.font, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let i, col;
    this.back = new canvas(64, 1664);
    const ct = this.back.contex;
    ct.drawImage(this.backLogo.img,0,0);
    const source = ct.getImageData(0,0,64,64);
    const cible = ct.getImageData(0,0,64,64);
    "033-055-067 033-055-077 033-055-076 033-055-075 033-054-074 033-053-073 031-052-072 030-051-071 130-050-070 230-150-170 330-250-270 330-350-370 330-450-470 330-550-570 330-550-670 330-550-770 330-550-750 330-550-750 330-540-740 320-530-730 310-520-730 310-520-720 300-510-710 300-500-700 301-501-701 302-502-702"
      .split(' ').forEach((palette, numPal) => {
      // A little help of steganography : code information (color index) into the pixel value
      const pal = palette.split('-').map((coul,idx) => coul.split('').map(k=>k*32 + idx));
      for(i=0; i<source.data.length; i+=4){
        if(source.data[i+2] > 0){
          switch(source.data[i+2]){
            case 0x60: col=0; break;
            case 0xA0: col=1; break;
            case 0xE0: col=2; break;
          }
          cible.data[i] = pal[col][0];
          cible.data[i+1] = pal[col][1];
          cible.data[i+2] = pal[col][2];
        }
      }
      ct.putImageData(cible, 0, numPal*64);
    });
    this.ctr = 0;
    this.scrollPos = 0;
    this.scrollSpeed = 2;
    let p = "003-004-005-007 203-204-205-207 303-304-305-307 303-404-405-407 303-404-505-507 303-404-505-707".split(' ');
    p = p.concat(p.toReversed());
    this.palettes = p.map(pal=>pal.split('-').map(coul=>coul.split('').map(k=>k*32)));
    
    this.sprites.initTile(32,26);
    this.font.initTile(20,20,32);
    this.scrollCan = new canvas(40,20);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "     HOW ABOUT THIS FOR A BIG MOTHER OF A SCROLLINE????  WRITTEN IN ABOUT 2 DAYS DURING A FIRST QUIET AND BORING WEEK AT MANCHESTER UNIVERSITY. I HAD QUITE A BIT OF TIME ON MY HANDS AND SOME IDEAS IN MY HEAD SO THIS SCREEN IS THE RESULT. FOR ANYONE WHO MAY BE INTERESTED HERE IS A BREAK DOWN TIMINGS FOR EACH BIT. THE 2 LAYER PARALLAX BACKGROUND TAKES ABOUT 50 PERCENT, POSSIBLY A LITTLE MORE. THE MUSIC TAKES ABOUT 3-5 PERCENT THE SCROLLINE TAKES ABOUT 30-40 PERCENT ALTHOUGH IT VARIES A LOT AND THE SPRITES MAKE UP THE DIFFERENCE.  FOR ANYONE WHO IS INTERESTED THIS SCROLLINE IS BEING WRITTEN ON 11-10-89 BY MANIKIN SITTING IN A FLAT IN MANCHESTER LATE AT NIGHT IN THE PROCESS OF MAKING A WORKING COPY OF MIND BOMB UP WITH THE SCREENS THAT I CURRENTLY HAVE, NUMBERING 5 IN ALL I THINK. THIS WILL PROBABLY SURVIVE AS A SCROLLINE IN THE FINAL DEMO. WELL IF YOUR READING THIS THEN IT DID ANYWAY!! AND HENCE IT WAS THE FIRST SCROLLINE TO BE WRITTEN FOR THIS DEMO. AS WERE ALL SO BLOODY LAZY IT WILL PROBABLY NEVER BE REWRITTEN. LOVE AND KISSES TO EVERYONE I KNOW AND ESPECIALLY TO MY FLAT MATES IAN ,PHIL ,SVEN(A NUTTY NORWEGIAN!!) ,JASPER(CHICKENS!) ,SIMON(SUPER SPRINT LOVER!), ALEX(CANADIAN BASTARD!!)  THEY HAVE TO PUT UP WITH MY INCESSANT KEYBOARD TAPPING AND THAT INCREDIBLY ANNOYING BEEP WHICH I ALWAYS FORGET TO TURN OFF!!  YES WELL THAT SCROLLINE DID INDEED SURVIVE TO BE INCLUDED IN THE ACTUAL DEMO. NOW NEARLY 6 MONTHS(!!) LATER I HAVE JUST PUT TOGETHER THE FINAL COPY OF THIS SCREEN AND I AM PUTTING IT ONTO THE NOW ALMOST COMPLETE LOST BOYS MIND BOMB DEMO. THE DISK IS DUE FOR RELEASE ON APRIL 18TH 1990 (YES, THIS YEAR!) AND AS TODAYS DATE IS THE 26TH OF MARCH I HAVE JUST ABOUT 2 WEEKS MORE TIME TO WORK ON IT BEFORE I GO ON HOLIDAY!! AS THIS SCROLLINE IS QUITE A SLOW ONE I IMAGINE THAT THE ONLY PERSON EVER TO READ THIS SCROLL WILL BE ME OR SOME ONE WHO HACKS IT. SO LETS TALK ABOUT PROTECTION!! I HAVE ATTEMPTED TO PROTECT THIS DEMO QUITE WELL BUT IT REALLY IS SUCH A HASSLE THAT ANY DEDICATED HACKER WILL PROBABLY MANAGE IT IN ABOUT 10 MINUTES. I HAVE USED A SPECIAL PROTECTION ROUTINE THAT I WROTE LAST YEAR. IF I PERSEVERED THEN I RECKON IT COULD BE MADE INTO I REAL BASTARD OF A PIECE OF PROTECTION. I KNOW THAT NICK OF TCB HAS USED A SIMILAR TECHNIQUE TO MINE AND HIS WAS BETTER WRITTEN BUT APPARANTELY IT HAD BUGS IN IT TO  AS I KNOW THAT THE GAME AND THE DEMO THAT HE USED IT ON HAVE BOTH BEEN HACKED IN DOUBLE QUICK TIME!!.  ANYWAY IF YOU HAVE HACKED THIS DEMO THEN IT DIOES NOTHING MORE THEN PROVE WHAT A LAME CODER YOU REALLY ARE. SO DON'T EXPECT ANY PRAISE FROM US FOR YOUR ACHIEVMENT. FUCKING GREETINGS TO ALL CODE RIPPERS ESPECIALLY GRIFF AND PHANTOM!!!!!!!               WRAP!!";
    this.scrolltext.init(this.scrollCan, this.font, 1);
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.oImageSmoothingEnabled = false;
      this.ctx.webkitImageSmoothingEnabled = false;
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik.play();
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.tiles();
      this.errance();
      this.big();
      this.ctr += 0.006;
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  tiles(){
    let x,y;
    let xpos = -~~(640 + 320*Math.sin(this.ctr*2.36+5.654) + 320*Math.sin(this.ctr*1.45+0.84)) % 64;
    let ypos = -~~(632 + 632*Math.sin(this.ctr*1.62+3.02)*Math.sin(this.ctr*2.45+1.5));
    for(x=xpos; x<640+64; x+=64)
      this.ctx.drawImage(this.back.canvas, x, ypos);
    
    ypos = -~~(632 + 632*Math.sin(this.ctr*2.357+1.0574)*Math.sin(this.ctr*1.4587+2.75)) % 64;
    for(y=ypos; y<400+64; y+=64)
      for(x=0; x<640+64; x+=64)
        this.ctx.drawImage(this.bubles.img, x, y);
  }
  
  errance(){
    for(let i=7,a=this.ctr; i>=0; i--,a+=0.035)
      this.sprites.drawTile(
        this.can, i,
        ~~(304 + 152*Math.sin(a*5.273+0.56) + 152*Math.sin(a*7.5698+0.984)),
        ~~(186 + 93*Math.sin(a*4.579+1.0546) + 93*Math.sin(a*6.124+2.5486))
      );
  }
  
  big(){
    let x,y,ctrData;
    this.scrollCan.clear();
    this.scrolltext.draw(0);
    this.pal = this.palettes[~~(6+6*Math.cos(this.ctr*0.3-3.1415))];
    this.pixels = this.ctx.getImageData(0,0,640,400);
    this.pixd = this.pixels.data;
    
    const {data} = this.scrollCan.contex.getImageData(0,0,40,20);
    for(y=0, ctrData=3; y<20; y++)
      for(x=0; x<40; x++, ctrData+=4)
        if(data[ctrData])
          this.colorize(x*16, y*16+this.scrollPos);
    
    this.ctx.putImageData(this.pixels,0,0);
    
    this.scrollPos += this.scrollSpeed;
    if(this.scrollPos <= 0 || this.scrollPos >= 80)
      this.scrollSpeed *= -1;
  }
  
  // Colorizes a 16x16 pixels square on the screen
  colorize(xpos, ypos){
    let idx,idy,ctrx,ctry, coul,coulnum;
    for(ctry=0, idy=ypos*4*640 + xpos*4; ctry<16; ctry++, idy+=640*4){
      for(ctrx=0, idx=idy; ctrx<16; ctrx++, idx+=4){
        coul = (this.pixd[idx]<<16) | (this.pixd[idx+1]<<8) | this.pixd[idx+2];
        switch(coul){
          case 0x400000: coulnum=0; break;
          case 0x600000: coulnum=1; break;
          case 0x800000: coulnum=2; break;
          case 0xC00000:
          case 0xE00000: coulnum=3; break;
          // Use of steganography : retrieve color index coded in the color value
          default: coulnum = this.pixd[idx] & 3;
        }
        this.pixd[idx]   = this.pal[coulnum][0];
        this.pixd[idx+1] = this.pal[coulnum][1];
        this.pixd[idx+2] = this.pal[coulnum][2];
      }
    }
  }
  
  stop() {
    this.zik.stop();
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