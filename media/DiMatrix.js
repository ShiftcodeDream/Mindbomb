class DiMatrix {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    })
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['DIA_Logos.png','hexa_digits_12x10_48.png', 'Cyber_32x32.png','MatrixBalls.png','DiBalls_Back.png'])).then(data => {
      [this.logos, this.tinyDigits, this.font, this.balls, this.back] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.tinyDigits.initTile(12,10,48);
    this.font.initTile(32,32,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "YEAH, ANOTHER DOC SPRITE SCREEN. THIS TIME IT IS CODED BY DIGITAL INSANITY e  NOW I KNOW THE FONT IS TOO SMALL AND THE SCROLL IS TOO FAST, BUT SINCE I DIDN'T WANT TO SPEND MUCH PROCESSOR TIME DOING THE BLOODY SCROLL, I JUST TOOK THE EASY WAY.    WELL, THERE'S NOT MUCH TO SAY ABOUT THIS SCREEN. MANY PEOPLE HAVE DONE DOC SPRITES BUT I THOUGH IT WAS NICE TO DO MY OWN VERSION.   fghij          e e       ALL CODING BY `abcd, THE BIG FONT WAS PORTED FROM AN AMIGA (THANXX TO THE OBLITERATOR FROM THE POWERSLAVES), THE SMALL FONT IS A RIPOFF FROM BALLISTIX AND THE BALLS WHERE DRAWN BY MYSELF (YEAH). THE EXCELLENT MUSIC WAS OF COURSE DONE BY MAX, THE MAD ONE. IT IS THE 'SCOOP' SOUNDTRACK. AS USUAL, I USED DEVPACK TO CREATE THE CODE AND GFA BASIC TO DO ALL THE GRAPHIC CONVERSIONS AND SINE TABLE CREATING. FINALLY,  NEOCHROME WAS USED FOR THE ARTWORK HANDLING.    `abcd        TIME FOR SOME GREETINGS HERE, FIRST THE SPECIAL ONES. THEY GO TO... EVERYBODY AT THALION SOFTWARE (TEX'N FRIENDS, I'LL VISIT YOU SOON!) .....  RICHARD KARSMAKERS (METALLICAAAAAA!!!!!) ......  ROONY, TOBJORN, GARD AND FROYSTEIN (THE NUTTY NORWEGIANS!! WE'LL COME!!!) ...  RONNY, DID YOU KNOW THAT THE DOG OF THE LOCAL AMIGA OWNER HERE (THE OBLITERATOR) IS CALLED 'RONNY'.... IT IS THE SMALLEST AND MOST ABSURD DOG I HAVE EVER SET EYES ON. WATY TO GO!!!!     [[DIGITAL INSANNITY]]    fghij    OK NORMAL GREETINGS TO..... CIA AND ONE FROM GALTAN SIX (GOOD LUCK WITH THE MEGA DEMO!) ..... AENIGMATICA (HOPE I SPELLED IT RIGHT, KEEP UP THE NICE DEMOS) .....  THE CAREBEARS (THE CUDDLY DEMOS ARE SMASHING...),  THE REPLICANTS, 42 CREW, IN FLAGRANTI, AND ALL OTHER GUYS (CAN'T THINK OF RAY MORE NAMES RIGHT NOW, MIGHT ADD SOME MORE LATER).   e e e e    OK LET ME TELL YOU SOMETHING ABOUT THE BACKGROUND OF THIS SCREEN. AFTER BEHOLDING THE MEGABALLS SCREEN FROM THE CUDDLY DEMOS, I WAS FASINATED BY THE WAVEFORMS THE CAREBEARS USED. AFTER SOME FIGURING OUT, I STARTED TO CODE A DOC SCREEN, AND IT LOOKED PRETTY NICE. IT WAS JUST SOMETHING TO PLAY AROUND WITH, BUT WHEN I WENT TO THE PCW SHOW AND VISITED THE LOST BOYS, THEY WERE SO ENTHOUSIASTIC ABOUT THE SCREEN THAT THEY WANTED IT IN THE MINDBOMB DEMO!  SO IT WAS FINISHED AS SOON AS I GOT HOME SOME DAYS LATER. THEN ONE NIGHT, I WENT TO THE OBLITERATOR OF THE POWERSLAVES AND HE SHOWED ME A DMO WITH SOME VERY AMAZING SPRITE WAVES. AFTER SOME TOYING WITH IT, I REALIZED THAT THEY USED DOUBLE SINE TABLES AND IT DAWNED UPON ME THAT THIS WAS THE CLUE TO SOME REALLY GREAT WAVEFORMS IN SCREEN. SO THE NEXT MORNING I STARTED CODING AND TWO HOURS LATER IT WAS THERE, A DOC SPRITE SCREEN WITH SOME REALLLY NEAT WAVEFORMS. IT TOOK ME ABOUT A DAY TO FINISH IT OFF AND FIND SOME NICE PRESETS. HOPE YOU LIKE IT!!!  eee T  OK, TIME TO WRAP THIS SCROLLTEXT, THIS IS A `abcd PRODUCTION.   ALL RIGHTS RESERVED!!   WHAT A CRAP!!!    HELLO ZEALOT!!!    RONNY!!!! THIS IS THE END OR SOMETHING..........                                  A";
    
    const a=168, b=408;
    let y=246,z=246;
    this.counters = {
      xspd_1: new DICtr(a, y+=14, 11),
      xdist1: new DICtr(a, y+=14, 0xFF4),
      xspd_2: new DICtr(a, y+=14, 9),
      xdist2: new DICtr(a, y+=14, 0),
      cdist : new DICtr(a, y+=14, 0x70),
      size_d: new DICtr(a, y+=14, 0),
      
      yspd_1: new DICtr(b, z+=14, 6),
      ydist1: new DICtr(b, z+=14, 4),
      yspd_2: new DICtr(b, z+=14, 8),
      ydist2: new DICtr(b, z+=14, 12),
      cspeed: new DICtr(b, z+=14, 2),
      size_s: new DICtr(b, z+=14, 0),
      
      csiz:  new DICtr(612, 260, 9, 9),
      music: new DICtr(612, 306, 1, 2)
    }
    this.presets = [
      [],
      [11,0xFF4,9,0,0x70,0,6,4,8,12,2,0,9], // F1
      [10,0x19,2,2,0,0,10,0x144,8,0x12A,3,0,4], // F2
      [0xFFE,0xFE0,7,0x1B,0,14,8,0xFFB,8,0xFE7,2,14,9], // F3
      [0x13,0x27,8,0x27,0xFFF,0,3,0x27,0xFFE,0x27,6,0,0], // F4
      [0xFF3,0,4,0xFFB,0x4D,4,10,3,0xFFA,0xFF7,3,0,3], // F5
      [16,0x1C,15,0xFF6,0x19,0,10,0xFFB,3,20,3,0,4], // F6
      [0xFFC,0xFFE,9,0xFEF,0,32,7,88,8,3,0,10,0], // F7
      [0xFF7,0x1A4,0xFF5,0x1A4,0x26,0,0xFF8,0x1A6,5,0x1A6,4,0,5], // F8
      [14,0x28,0xFFD,0x4F,0,0,3,0xFD9,9,0,0,0,0], // F9
      [0,0,0,0,0,0,0,0,0,0,0,0,0], // F10
    ];
    this.loadValues(1);
    this.running = true;
    // TODO : Reset compteur général de courbe
  }

  loadValues(num){
    const valeurs = this.presets[num];
    const c = this.counters;
    ['xspd_1', 'xdist1', 'xspd_2', 'xdist2', 'cdist', 'size_d', 'yspd_1', 'ydist1', 'yspd_2', 'ydist2', 'cspeed', 'size_s', 'csiz'].forEach((key, i) => c[key].v = valeurs[i]);
    this.ctrx1 = this.ctrx2 = this.ctry1 = this.ctry2 = 0.0;
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
      this.digits();
      this.scrolltext.draw(400-32);
      this.parametrics();
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

  digits(){
    // TODO : Atari logo must dance !
    this.logos.drawPart(this.can, 176,4, 0,0,288,62);
    this.logos.drawPart(this.can, 94,110, 0,62, 482,136);
    this.back.draw(this.can, 0, 260);
    Object.keys(this.counters).forEach(key =>
      this.counters[key].draw(this.can, this.tinyDigits)
    );
  }
  
  drawBall(x,y,s){
    const pos=[0,120,110,96,78,56,30,0];
    const siz=[0,6,10,14,18,22,26,30];
    const t = siz[~~s];
    this.balls.drawPart(this.can, ~~(x-t/2), ~~(y-t/2), 0, pos[~~s], t, t);
  }
  
  parametrics(){
    const f1 = 0.0043, f2 = Math.PI/640;
    const c = this.counters;
    
    let deltax1 = 0.0, deltax2 = 0.0, deltay1 = 0.0, deltay2 = 0.0;
    for(i=0; i<32; i++){
      this.drawBall(
        320 + 127*Math.sin(this.ctrx1+deltax1) + 127*Math.sin(this.ctrx2+deltax2),
        200 - 69*Math.sin(this.ctry1+deltay1) - 69*Math.sin(this.ctry2+deltay2),
        7
      );
      deltax1 = this.nextValue(deltax1, c['xdist1'].v, f2);
      deltax2 = this.nextValue(deltax2, c['xdist2'].v, f2);
      deltay1 = this.nextValue(deltay1, c['ydist1'].v, 2*f2);
      deltay2 = this.nextValue(deltay2, c['ydist2'].v, 2*f2);
    }
    this.ctrx1 = this.nextValue(this.ctrx1, c['xspd_1'].v, f1);
    this.ctrx2 = this.nextValue(this.ctrx2, c['xspd_2'].v, f1);
    this.ctry1 = this.nextValue(this.ctry1, c['yspd_1'].v, 2*f1);
    this.ctry2 = this.nextValue(this.ctry2, c['yspd_2'].v, 2*f1);
  }
  
  nextValue(v, incr, factor){
    if(incr & 0x800)
      incr = ~(incr | 0xFFFFF000) + 1; // 2 complement for negative values
    return v + factor * incr;
  }
  
  // Event processor
  onKeyPressed(event) {
    const e = () => event.preventDefault();
    const c = this.counters;
    
    switch(event.code){
      case 'ArrowLeft':
        c['xspd_1'].decr();
        e();
        return false;
      case 'ArrowRight':
        c['xspd_1'].incr();
        e();
        return false;
      case 'ArrowDown':
        c['yspd_1'].decr();
        e();
        return false;
      case 'ArrowUp':
        c['yspd_1'].incr();
        e();
        return false;
      case 'NumpadSubtract':
        c['csiz'].decr();
        e();
        return false;
      case 'NumpadAdd':
        c['csiz'].incr();
        e();
        return false;
      case 'Numpad4':
        c['xdist1'].decr();
        e();
        return false;
      case 'Numpad6':
        c['xdist1'].incr();
        e();
        return false;
      case 'Numpad2':
        c['ydist1'].decr();
        e();
        return false;
      case 'Numpad8':
        c['ydist1'].incr();
        e();
        return false;
      case 'KeyF':
        c['xspd_2'].decr();
        e();
        return false;
      case 'KeyG':
        c['xspd_2'].incr();
        e();
        return false;
      case 'KeyV':
        c['yspd_2'].decr();
        e();
        return false;
      case 'KeyT':
        c['yspd_2'].incr();
        e();
        return false;
      case 'KeyH':
        c['xdist2'].decr();
        e();
        return false;
      case 'KeyJ':
        c['xdist2'].incr();
        e();
        return false;
      case 'KeyN':
        c['ydist2'].decr();
        e();
        return false;
      case 'KeyU':
        c['ydist2'].incr();
        e();
        return false;
      case 'KeyX':
        c['cdist'].decr();
        e();
        return false;
      case 'KeyC':
        c['cdist'].incr();
        e();
        return false;
      case 'NumpadDivide':
        c['cspeed'].decr();
        e();
        return false;
      case 'NumpadMultiply':
        c['cspeed'].incr();
        e();
        return false;
      case 'KeyK':
        c['size_d'].decr();
        e();
        return false;
      case 'KeyL':
        c['size_d'].incr();
        e();
        return false;
      case 'KeyO':
        c['size_s'].decr();
        e();
        return false;
      case 'KeyP':
        c['size_s'].incr();
        e();
        return false;
      case 'KeyE':
        c['xspd_1'].decr();
        c['xspd_2'].decr();
        e();
        return false;
      case 'KeyR':
        c['xspd_1'].incr();
        c['xspd_2'].incr();
        e();
        return false;
      case 'Numpad1':
        c['yspd_1'].decr();
        c['yspd_2'].decr();
        e();
        return false;
      case 'Numpad3':
        c['yspd_1'].incr();
        c['yspd_2'].incr();
        e();
        return false;
      case 'Numpad7':
        c['ydist1'].decr();
        c['ydist2'].decr();
        e();
        return false;
      case 'Numpad9':
        c['ydist1'].incr();
        c['ydist2'].incr();
        e();
        return false;
      case 'KeyY':
        c['xdist1'].decr();
        c['xdist2'].decr();
        e();
        return false;
      case 'KeyI':
        c['xdist1'].incr();
        c['xdist2'].incr();
        e();
        return false;
      case 'F1':
      case 'F2':
      case 'F3':
      case 'F4':
      // case 'F5': // TODO : uncomment
      case 'F6':
      case 'F7':
      case 'F8':
      case 'F9':
      case 'F10':
        this.loadValues(event.code.substring(1));
        e();
        return false;
      case 'F11':
        console.log(this);
        e();
        return false;
    }
    if (event.key === ' ') {
      e();
      this.stop();
    }
  }
}

class DICtr {
  constructor(xpos, ypos, valeur, maxi=0xFFF){
    this.xpos = xpos;
    this.ypos = ypos;
    this.v = valeur;
    this.maxi = maxi;
    this.incr = this.incr.bind(this);
    this.decr = this.decr.bind(this);
    this.draw = this.draw.bind(this);
  }
  incr(increment=1){
    this.v += increment;
    if(this.v > this.maxi)
      this.v -= this.maxi;
  }
  decr(decrement=1){
    this.v -= decrement;
    if(this.v < 0)
      this.v += this.maxi;
  }
  draw(dst, font){
    let text = this.v.toString(16).toUpperCase();
    if(this.maxi>0xF && text.length<2)
      text = '0' + text;
    if(this.maxi>0xFF && text.length<3)
      text = '0' + text;
    font.print(dst, text, this.xpos, this.ypos);
  }
}