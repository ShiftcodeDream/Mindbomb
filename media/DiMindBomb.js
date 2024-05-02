class DiMindBomb {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.fixedElems = this.fixedElems.bind(this);
    this.equalizers = this.equalizers.bind(this);
    this.scroller = this.scroller.bind(this);
    this.logoDist1 = this.logoDist1.bind(this);
    this.logoDist2 = this.logoDist2.bind(this);
    this.logoDist3 = this.logoDist3.bind(this);
    this.mainEffect = this.mainEffect.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource([
            'di-top.png', 'MindFont_32x32.png', 'mind-logo3.png', 'Litley_8x8.png', 'LitleyG_8x8.png'
        ])).then(data => [this.back, this.font, this.mindlogo, this.letterColor, this.letterGreen] = data);
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let ct, i, y;
    const pi=Math.PI;
    this.offScrollCan = new canvas(640,32);
    this.scrolltextCan = new canvas(640,78);
    this.font.initTile(32,32,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt= "GREETINGS DEMO-BEHOLDER. THIS IS THE abcd SCREEN FOR THE MINDBOMB@ DEMO. ?  AFTER QUITE SOME NIGHTS OF CODING, I FINALLY FINISHED IT. WHEN I WAS IN ENGLAND AND VISITED THE LOST BOYS, WE TALK ABOUT THEIR efghij AND DECIDED THAT THEY ALLOWED ME TO WRECK THEIR GREAT DEMO WITH THIS SCREEN.  THE GREETINGS ARE DONE INT THE VERTICAL SCROLLERS IF YOU'RE ANXIOUS TO BE MENTIONED. MAYBE SOME TECHNICAL DETAILS ABOUT THIS SCREEN WOULD BE NICE. THE VERTICAL SCROLLERS ARE DONE WITH A LOT OF RASTERS AND COLOR PALETTE FIDDLING. THE TECHNIQUE IS ALSO USED IN THE LANDSCAPE SCREEN IN THIS efghij. THE LOGO IS A 4-PLANE ONE THAT HAS THREE DIFFERENT ROUTINES, HORIZONTAL MOVEP BYTE BENDING, VERTICAL WAVING AND SOME SHRINKING. THEN THERE IS THIS SCROLLER WHICH IS A ONE-PLANE LOTSA RASTER BYTE-BENDER. THE MUSIC IS DONE BY DAVID WITTAKER AND ALL GRAPHICS (EXCEPT THE LOUSY VU-METERS) ARE PORTED FROM AN AMIGA.... I USED THE FOLLOWING EQUIPMENT TO CREATE THIS DEMO: AN ATARI 260ST (YES, AN ORIGINAL 260ST!) WITH TOS ROM AND 1 MB UPGRADE, AN ATARI SH205 HARD DISK (THE 'MINDBOMB' FOLDER HAS BEEN USED QUITE EXTENSIVELY LATELY), A THOMSON COLOR MONITOR, AN ATARI SF314 DISK DRIVE (FOR BACKUPS), A TANDY EC-4031 CALCULATOR (FOR THE HEX-BIN-DEC NUMBER STUFF!) A 1.5 LITRE BOTTLE OF BACARDI RUM AND COUNTLESS BOTTLES OF COCA COLA (THE DIVINE DRINK), A KENWOOD M-91 MIDI SET PLUS TWO MAGNAT SPEAKERS (FOR THE VARIOUS MUSICAL INSPIRATIONS), ST-INTERN PLUS THE M68000 BOOK, THE CLOCKCYCLE-SHEET I GOT FROM LEVEL 16 (THANXX!). ON THE SOFTWARE SIDE I USED DEVPACK ASSEMBLER (BEST ASSEMBLER AROUND, I AM WRITING FOR ARGASM THOUGH), GFA BASIC (FOR ALL TABLES, CALCULATIONS, GRAPHIC CONVERSIONS ETC.), NEOCHROME (FOR THE GRAPHIC STUFF) AND DIGITAL abcd 'S SUPER-DUPER ULTRA-COMPACT REALTIME ASCII-BINARY CONVERSION 10-LINES OF CODE SERIAL DATA FROM AMIGA PORT PROGRAM. (?)  SPECIAL MESSAGE TO ALL NORVEGIANS: PREPARE!  WE ARE COMING!!!        WHEN I BROUGHT THIS DEMO TO ENGLAND, MY HORROR WAS COMPLETE WHEN IT DIDN'T WORK ON ANY OF THE LOST BOYS' COMPUTERS WHILE IT WAS FINE ON MY ST! SO I HD TO MAKE SOME ADJUSTMENTS WHILE THERE WAS A PCW SHOW GOING ON AROUND ME, A TASK THAT WAS SLIGHTLY CHAOTIC, BUT I MADE IT. MARK: YOU 'KLEINE EIKEL'!   I ALSO BROUGHT ANOTHER DEMO I DID, A DOC-SPRITE VERSION. THE LOST BOYS LIKED IT SO MUCH THAT THEY WANTED IT IN THE MINDBOMB@. SO I ENHANCED IT A LITTLE AND YOU WILL BE ABLE TO FIND IT IN THIS VERY MINDBOMB@ DEMO. LOOK FOR THE MATRIX SCREEN!                        OK, TIME TO WRAP IT UP FOR NOW, I AM GETTING A BIT SLEEPY AFTER SOME  10 HOURS OF CONTINUOUS PROGRAMMING TODAY, (I DID THE LOGO AND THE RASTERS IN THE SCROLLTEXT). READ SOME MORE CRAP IN THE VERTICAL SCROLLERS.          BYE!  ?    ?    ?     abcd           efghij          abcd                                 ";
    this.scrolltext.init(this.offScrollCan, this.font, 8);
    this.ctrScrollDegr=0;
    
    this.scrollDegr = new canvas(1,180);
    ct = this.scrollDegr.contex;
    let cols = "007-107-207-307-407-507-607-707-706-705-704-714-724-734-744-754-764-774-674-574-474-374-274-174-074-075-076-276-376-476-576-676-776-766-756-746-736-726-716-706-705-605-505-405-305-205-105-005-006-007";
    cols += cols.substring(0,80*4);
    cols.split('-').forEach((c,i)=>{
      let [r,g,b] = c.split('');
      ct.fillStyle = this.fromRgb7(r,g,b);
      ct.fillRect(0,i*2, 1,2);
    })
    
    // Scroller distorsion curve
    this.distCurve = [];
    ct = v=> this.distCurve.push(~~v);
    for(i=0;i<100;i++)
      ct(26);
    for(i=pi/2; i>=-pi/2; i-=pi/20)
      ct(13+13*Math.sin(i));
    for(i=0;i<50;i++)
      ct(0);
    for(i=-pi; i<pi; i+=pi/25)
      ct(27+27*Math.cos(i));
    for(i=0; i<27; i++)
      ct(i);
    for(i=0;i<50;i++)
      ct(26);
    for(i=-0; i<pi*12; i+=pi/25)
      ct(27+27*Math.sin(i));
    for(i=-0; i<pi*6; i+=pi/12.5)
      ct(27+10*Math.sin(i));
    for(i=0;i<100;i++)
      ct(26);
    for(i=pi/2; i>=-pi/2; i-=pi/20)
      ct(13+13*Math.sin(i));
    for(i=0; i<6*pi; i+=pi/40)
      ct(52-52*Math.abs(Math.cos(i)));
    for(i=0; i<27; i+=2)
      ct(i);
    for(i=0; i<4*pi; i+=pi/40)
      ct(26-22*Math.cos(i)+6*Math.cos(i*8));
    for(i=8; i<27; i++)
      ct(i);
    for(i=0; i<8*pi; i+=pi/20)
      ct(26+13*Math.sin(i));
    for(i=0; i<8*pi; i+=pi/16)
      ct(26+18*Math.sin(i));
    for(i=0; i<8*pi; i+=pi/14)
      ct(26+26*Math.sin(i));
    for(i=0; i<12*pi; i+=pi/20)
      ct(26+13*Math.sin(i));
    for(i=26; i<53; i++)
      ct(i);
    for(i=2*pi; i<6*pi; i+=pi/40)
      ct(52*5/i-52*5/i*Math.abs(Math.sin(i)));
    for(i=0; i<4*pi; i+=pi/40)
      ct(52*5/(6*pi-i)-52*5/(6*pi-i)*Math.abs(Math.sin(i)));
    for(i=37; i<48; i++)
      ct(i);
    for(; i>25; i--)
      ct(i);
    this.ctrDistScroll=0;

    // Logo distorsion curve 1 (vertical)
    this.distCurve1 = [];
    ct = v=> this.distCurve1.push(~~v);
    // Range [-12, 12]
    for(i=0; i<90; i++)
      ct(0);
    for(i=0; i<13; i++)
      ct(i);
    for(i=0; i<90; i++)
      ct(12);
    for(i=12; i>-13; i--)
      ct(i);
    for(i=0; i<90; i++)
      ct(-12);
    for(i=-12; i<13; i+=1.5)
      ct(i);
    for(i=12; i>-13; i-=1.5)
      ct(i);
    for(i=0; i<12*pi; i+=pi/40)
      ct(12*Math.sin(i-pi/2));
    for(i=0; i<4*pi; i+=pi/40)
      ct(12*Math.sin(i-pi/2));
    for(i=0; i<6*pi; i+=pi/40)
      ct(24*Math.abs(Math.sin(i))-12);
    for(i=0; i<6*pi; i+=pi/30)
      ct(24*Math.abs(Math.sin(i))-12);
    for(i=0; i<6*pi; i+=pi/20)
      ct(24*Math.abs(Math.sin(i))-12);
    for(i=0; i<90; i++)
      ct(0);
    this.distCurve1 = this.distCurve1.map(n=>328-n);
    this.maxLogoDist1 = this.distCurve1.length - 31;

    // Logo distorsion curve 2 (horizontal)
    this.distCurve2 = [];
    ct = v=> this.distCurve2.push(~~v);
    // Range [-80, 80]
    for(i=0; i<55; i++)
      ct(0);
    for(i=0; i<81; i+=4)
      ct(i);
    for(i=0; i<55; i++)
      ct(80);
    for(i=80; i>-81; i--)
      ct(i);
    for(i=pi; i<3*pi+pi/2; i+=pi/70)
      ct(80*Math.cos(i));
    for(i=0; i<55; i++)
      ct(0);
    for(i=0; i<6*pi; i+=pi/40)
      ct(80*Math.sin(i));
    for(i=0; i<6*pi; i+=pi/20)
      ct(-40+40*Math.sin(i));
    for(i=0; i<55; i++)
      ct(-40);
    for(i=0; i<6*pi; i+=pi/6)
      ct(-40+7*Math.sin(i));
    for(i=0; i<55; i++)
      ct(-40);
    for(i=0; i<6*pi; i+=pi/6)
      ct(-40+7*Math.sin(i));
    for(i=0; i<55; i++)
      ct(-40);
    for(i=-40; i<0; i+=4)
      ct(i);
    for(i=0; i<60*pi; i+=pi/3)
      ct(2*Math.sin(i));
    for(i=0; i>-60; i-=4)
      ct(i);
    for(i=0; i<80*pi; i+=pi/3)
      ct(-60+2*Math.sin(i));
    for(i=-20; i<60; i+=4)
      ct(i);
    for(i=0; i<55; i++)
      ct(60);
    for(i=0; i<20*pi; i+=pi/3)
      ct(60+2*Math.sin(i));
    for(i=0; i<pi; i+=pi/24)
      ct(60*Math.cos(i));
    for(i=pi; i<2*pi; i+=pi/24)
      ct(-30+30*Math.cos(i));
    for(i=0; i<55; i++)
      ct(0);
    this.distCurve2 = this.distCurve2.map(n=>n+80);
    this.maxLogoDist2 = this.distCurve2.length - 55;

    // Logo distorsion curve 3 (vertical shrink)
    this.distCurve3 = [];
    ct = v=> this.distCurve3.push(~~v);
    for(i=0; i<8*pi; i+=pi/12)
      ct(37+17*Math.cos(i));
    for(i=0; i<8*pi; i+=pi/24)
      ct(37+17*Math.cos(i));
    this.maxLogoDist3 = this.distCurve3.length;
    
    this.ctrLogoDist = 0;
    this.logoDist = this.logoDist1;
    
    // horizontal inversion for green letters
    let tmp = new canvas(472,8);
    for(let l=0; l<472; l+=8){
      for(let xs=0, xd=7; xs<8; xs++,xd--){
        tmp.contex.drawImage(this.letterGreen.img,xs+l,0,1,8, xd+l,0,1,8);
      }
    }
    this.letterGreenReverse = new image(tmp.canvas.toDataURL('image/png'));
    
    this.littleScrollCan = new canvas(8*3, 35);
    this.letterColor.initTile(8,8,32);
    this.letterGreen.initTile(8,8,32);
    this.letterGreenReverse.initTile(8,8,32);
    this.littleScrolls = [
      new scrolltext_vertical(),
      new scrolltext_vertical(),
      new scrolltext_vertical()
    ].map(s => {
      s.scrtxt = "HELLO GUYS !!! @@@ HELLO GUYS !!! MMM WWW @@@      "
      return s;
    });
    this.littleScrolls[0].init(this.littleScrollCan, this.letterColor, 1);
    this.littleScrolls[1].init(this.littleScrollCan, this.letterGreen, 1);
    this.littleScrolls[2].init(this.littleScrollCan, this.letterGreenReverse, 1);
    this.mainShift = 0;
    
    // text distorsion at the right of the screen
    this.distRight = [];
    for(i=0;i<2*pi;i+=pi/68){
      this.distRight.push({
        x: ~~(525+43*Math.sin(i)),
        w: ~~(36*Math.sin(i))
      })
    }
    this.ctrDistRight = 0;
    
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 480, "main");
      this.ctx = this.can.contex;
      this.ctx.imageSmoothingEnabled = false;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.equalizers();
      this.fixedElems();
      this.scroller();
      this.logoDist();
      this.mainEffect();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }
  mainEffect(){
    let x,ys,yd,l,ctr,param;
    const source = this.littleScrollCan.canvas;
    if(this.mainShift === 0){
      this.littleScrolls.forEach((s,i)=>s.draw(i*8));
      this.mainShift = 4;
    }else{
      this.mainShift = 0;
    }
    
    // Centered scrolltext
    for(ys=0; ys<36; ys++){
      l = ~~(3.176*ys+2);
      x = 320-l/2;
      yd = 30 + ys*8 + this.mainShift;
      this.ctx.drawImage(source, 0,ys, 8,1, x,yd, l,8);
      l = 110-l;
      x = x-l;
      this.ctx.drawImage(source, 8,ys, 8,1, x,yd, l,8);
      this.ctx.drawImage(source, 8,ys, 8,1, x+110,yd, l,8);
    }
    
    // Right scrolltext
    for(yd=0, ctr=this.ctrDistRight; yd<280; yd+=2){
      ys = ~~(yd/8);
      param = this.distRight[ctr++];
      if(ctr >= this.distRight.length)
        ctr = 0;
      if(param.w>0){
        this.ctx.drawImage(source, 0,ys, 8,1, param.x,yd+30, param.w, 2);
      }else{
        this.ctx.drawImage(source, 16,ys, 8,1, param.x,yd+30, param.w, 2);
      }
    }
    if(this.mainShift === 0){
      this.ctrDistRight--;
      if(this.ctrDistRight < 0)
        this.ctrDistRight = this.distRight.length-1;
    }
    
    // Left scrolltext
  }
  equalizers(){
    // TODO
  }
  fixedElems(){
    this.ctx.drawImage(this.back.img, 0,0,640,22, 0,0,640,22);
    this.ctx.drawImage(this.back.img, 0,22,640,68, 0,412,640,68);
  }
  scroller(){
    let a,x;
    this.offScrollCan.clear();
    this.scrolltextCan.clear();
    this.scrolltext.draw(0);
    this.scrolltextCan.contex.globalCompositeOperation = 'source-over';
    
    for(a=this.ctrDistScroll,x=0; x<640; x+=16,a++){
      if(a >= this.distCurve.length)
        a = 0;
      this.scrolltextCan.contex.drawImage(this.offScrollCan.canvas,x,0,16,32, x,this.distCurve[a],16,32);
    }
    
    this.scrolltextCan.contex.globalCompositeOperation = 'source-in';
    this.scrolltextCan.contex.drawImage(this.scrollDegr.canvas, 0,this.ctrScrollDegr,1,80, 0,0,640,80);

    this.ctrDistScroll++;
    if(this.ctrDistScroll >= this.distCurve.length)
      this.ctrDistScroll = 0;
    
    this.ctrScrollDegr++;
    if(this.ctrScrollDegr > 98)
      this.ctrScrollDegr = 0;
    
    this.scrolltextCan.draw(this.can,0,402);
  }
  logoDist1(){
    for(let x=0, ctr=this.ctrLogoDist; x<480; x+=16){
      this.ctx.drawImage(this.mindlogo.img, x,0,16,54, x+80,this.distCurve1[ctr++],16,54);
    }
    if(this.ctrLogoDist++ >= this.maxLogoDist1){
      this.ctrLogoDist = 0;
      this.logoDist = this.logoDist2;
    }
  }
  logoDist2(){
    for(let y=0, ctr=this.ctrLogoDist; y<53; y+=2){
      this.ctx.drawImage(this.mindlogo.img, 0,y,480,2, this.distCurve2[ctr++],y+328,480,2);
    }
    if(this.ctrLogoDist++ >= this.maxLogoDist2){
      this.ctrLogoDist = 0;
      this.logoDist = this.logoDist3;
    }
  }
  logoDist3(){
    let h = this.distCurve3[this.ctrLogoDist], y = 328 + 27 - h/2;
    this.ctx.drawImage(this.mindlogo.img, 0,0,480,54, 80,y,480,h);
    if(this.ctrLogoDist++ >= this.maxLogoDist3){
      this.ctrLogoDist = 0;
      this.logoDist = this.logoDist1;
    }    
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