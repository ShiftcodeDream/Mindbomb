class BBC {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.zarbScroll = this.zarbScroll.bind(this);
    this.starfield = this.starfield.bind(this);
    this.back = this.back.bind(this);
    this.ondule = this.ondule.bind(this);
    this.equalizers = this.equalizers.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['BBCSprites.png','font_64x64.png', 'bbc.mp3'])).then(data => {
      [this.sprites, this.font, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.running = true;
    this.font.initTile(64,64,32);
    this.scrollCan = new canvas(768+128*4, 64);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "  YO !  THIS IS AUTOMATION  CD, UM, ..... YO !  THIS IS THE MEGA-MIGHTY MINDBOMB DEMO, THIS SCREEN FROM THE BAD BREW CREW, ALL CODED BY ANDY THE ARFLING, WITH HELPFUL (?) COMMENTS FROM THE PILOT...(%)  THE GRAPHIX HAVE BEEN COLLATED FROM MANY SOURCES, NAMELY BORIS (MINDBOMB LOGO), MR. MOO (BALLS), BBC SIGNS (ANDY THE ARFLING), NIGHTHAWKS (TOP MINDBOMB) AND NORTHSTAR (THIS FONT), AND THANX GO TO MAD MAX FOR THE MUSEAX. THIS A PILOT SCROLL, SO I CAN BE BLAMED ENTIRELY FOR ANY MIS-DISSCRETIONS, TODAY IS 07-04-90 AND MANIKIN OF THE LOST BOYS HAS PERSONALLY COME ROUND TO FORCE ANDY TO FINISH THIS SCREEN IN TIME FOR THE RELEASE DATE. TYPICALLY,  ANDY HAS EXCELLED HIMSELF TO SUCH AN EXTENT THAT THE BLOODY SCREEN DOESN'T WORK WITH THE MENU. STILL ANDY IS A RESILIANT SORT OF GUY AND HAS ALMOST FIXED IT. WE HAD A CALL FROM VAPOUR WHO SEEMED A LITTLE BEMUSED UNTIL HE FIGURED OUT THAT MANIKIN WAS HERE. THIS SCROLLER IS SHORT AND SWEET SO SWIFTLY ON TO THE INTERESTING INFORMATION BIT. THAT MEANS IT'S TIME TO SAY WHO WE ARE AND WHAT WE DO (AGAIN)... FIRSTLY, THERE IS ANDY WHO IS A STUDENT STUDYING BITTER AND OTHER TYPES OF HANG-OVERS AT OXFORD, HE IS BASICALLY THE MAIN FORCE IN THE GROUP (AND WELL HE KNOWS IT)....THEN THERE IS CHRISPY NOODLE WHO LIKES TO WRITE THE FIRST HALF OF EXCELLENT TUNES TO GET OUR HOPES UP. THEN THERE IS ME (THE PILOT...%). I SWAP, CRACK, AND GET MY MITS ON THE CHOICEST SOFTWARE. I ALSO ENJOY A GOOD...(CENSORED)... ANYWAY 'NUFF 'NUFF SCROLLIN FOR A DEMO, C U ON A CD SOON!  PLEASE NOTE THAT WE HAVE GIVEN UP CRACKING AND CHANGED TO A DEMO GROUP(SO ANDY CAN GET A JOB AS A GAMES PROGRAMMER - HINT HINT)  ......... THIS WILL PROBABLY BE THE CASE FOR ANOTHER HOUR OR SO.          W   A   R   P           ANDY HERE - YOU KNOW SOMETIME I'M GONNA WRITE A SCROLL MESSAGE MYSELF,WHO READS THEM ANYWAY?    WRAP!";
    this.scrolltext.init(this.scrollCan, this.font, 16);
    this.zarbCtr = 0;
    this.starsCan = new canvas(768, 144);
    this.stars = new starfield2D_dot(this.starsCan, [
      {nb:25, speedy:0, speedx:-10, color:'#FFF', size:2},
      {nb:25, speedy:0, speedx:-8, color:'#888', size:2},
      {nb:25, speedy:0, speedx:-4, color:'#444', size:2}
    ]);
    this.balls = [
      new Ball(this.sprites, 66, 2, [0,0,32,16])
    ];
    const destiCoords = [72,86,108,138,176,222,276];
    for(let x=32,l=32,i=0; x<640; x+=l,l+=16,i++){
      this.balls.push(
        new Ball(this.sprites, destiCoords[i], l/8, [x,0,l,l])
      )
    }
    this.sprCtr = 0;
    this.ond1 = 0;
    this.ond2 = 0;
    
    // Extracts audio stream from mp3
    if(this.zik.mozCaptureStream)
      this.stream = this.zik.mozCaptureStream();
    else
      this.stream = this.zik.captureStream();
    this.audioCtx = new AudioContext();
    // Configure what we need
    this.spectrum = this.audioCtx.createAnalyser();
    this.spectrum.fftSize = 512;
    this.dataFromSpectrum = new Uint8Array(this.spectrum.frequencyBinCount);
    // Connects the sound system : mp3 source -> spectrum analyser -> audio output
    this.audioSource = this.audioCtx.createMediaStreamSource(this.stream);
    this.audioSource.connect(this.spectrum);
    this.spectrum.connect(this.audioCtx.destination);
    this.levels = new Array(38);
    this.levels.fill(0);
    this.zik.loop = true;
    this.step = 0;
    this.stepTimes = [];
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(768, 540, "main");
      this.ctx = this.can.contex;
      
      this.balls = this.balls.map(b => {b.ctx = this.can.contex; return b});
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik.play();
      this.stepTimes.push(setTimeout(()=>{this.step=1}, 7000));
      this.stepTimes.push(setTimeout(()=>{this.step=2}, 13000));
      this.stepTimes.push(setTimeout(()=>{this.step=3}, 16000));
      this.stepTimes.push(setTimeout(()=>{this.step=4}, 17500));
      window.requestAnimFrame(this.main);
    });
  }
  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.back();
      this.zarbScroll();
      this.starfield();
      this.ondule();
      this.equalizers();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  zarbScroll(){
    if(this.step >= 4) {
      let i, x, y, a, b;
      this.scrolltext.draw(0);
      for (i = 0, b = this.zarbCtr; i < 513; i += 128, b -= Math.PI / 4) {
        for (x = 0, a = b; x < 768; x += 16, a += 0.125) {
          y = 440 + 36 * Math.sin(a);
          this.ctx.drawImage(this.scrollCan.canvas,
            x + i, 0, 16, 64,
            x, ~~y, 16, 64
          );
        }
      }
      this.zarbCtr += 0.15;
    }
  }
  
  starfield(){
    if(this.step >= 1) {
      this.starsCan.clear();
      this.stars.draw();
      this.starsCan.draw(this.can, 0, 404);
    }
  }
  
  back(){
    if(this.step >= 1) {
      let a, i, x, y, p;
      this.balls.forEach(b => b.draw());
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 66, 64, 338);
      this.ctx.fillRect(704, 66, 64, 338);

      for (i = 0, a = this.sprCtr; i < 17; i++, a += 2 * Math.PI / 17) {
        x = 341 + 251 * Math.cos(a);
        y = 201 + 101 * Math.sin(a);
        p = 0.71875 + 0.28125 * Math.sin(a);
        this.ctx.drawImage(this.sprites.img, 338, 190, 128, 64, ~~x, ~~y, ~~(128 * p), ~~(64 * p));
      }
      this.sprCtr += Math.PI / 68;

      if ( (this.step === 2 && (Math.random()>0.5)) || (this.step >= 3) ){
        this.ctx.drawImage(this.sprites.img, 0, 96, 338, 158, 224, 122, 338, 158);
      }
    }
  }
  
  ondule() {
    if (this.step >= 4) {
      let x, y, a;
      const amp = 39 + 39 * Math.sin(this.ond2);
      for (y = 0, a = this.ond1; y < 50; y += 2, a += Math.PI / 50) {
        x = 142 + amp * Math.sin(a);
        this.ctx.drawImage(
          this.sprites.img,
          0, 254 + y, 484, 2,
          ~~x, y + 10, 484, 2
        );
      }
      this.ond1 += Math.PI / 40;
      this.ond2 += Math.PI / 400;
    }
  }
  
  equalizers(){
    let niv, v
    this.ctx.fillStyle = '#E0E000';
    this.spectrum.getByteFrequencyData(this.dataFromSpectrum);
    this.dataFromSpectrum.slice(0,38).forEach((bar, i) => {
      niv = this.levels[i];
      if(bar > 200)
        niv = Math.max(niv, bar);
      if(niv > 0){
        v = ~~(28*niv/256);
        this.ctx.fillRect(84 + i*16, 28-v+6, 10, v*2);
      }
      this.levels[i] = niv > 8 ? niv-8 : 0;
    });
  }
  
  stop() {
    this.zik.pause();
    this.stepTimes.forEach(clearTimeout);
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

class Ball{
  constructor(sprites, ypos, xspeed, dimensions){
    this.sprites = sprites.img;
    this.xpos = 0;
    this.ypos = ypos;
    this.xspeed = xspeed;
    this.dimensions = dimensions;
    
    this.draw = this.draw.bind(this);
  }
  draw(){
    let [sx,sy,l,h] = this.dimensions;
    for(let x=this.xpos; x<640; x+=l){
      this.ctx.drawImage(this.sprites, sx,sy,l,h, x+64,this.ypos,l,h);
    }
    this.xpos = (this.xpos - this.xspeed) % l;
  }
}