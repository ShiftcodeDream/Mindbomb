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
      this.screx();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
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