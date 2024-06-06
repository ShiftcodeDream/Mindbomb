class Sinus {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.drawDots = this.drawDots.bind(this);
    this.nextFrame = this.nextFrame.bind(this);
    this.bigScroller = this.bigScroller.bind(this);
    this.littleScroller = this.littleScroller.bind(this);
    this.roller = this.roller.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['SinBacks.png', 'Dalton_20x20.png', 'SinScroll.png', 'Sinus.ym'])).then(data => {
      [this.backs, this.font, this.roll, this.preload] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let fig,fig1,i,a,x,y;
    this.running = true;
    this.ctrFrame = 0;
    this.frames = [];
    this.dotsCan = new canvas(180,180);
    this.dotsZoom = 2.3;
    this.paused = false;
    this.ctrRoll = 0;
    
    // 3 circles
    fig = [];
    fig1 = [];
    for(i=0, a=0.0; i<36; i++, a += Math.PI/18){
      fig1.push({
        x: 0,
        y: 30*Math.sin(a),
        z: 30*Math.cos(a)
      });
    }
    fig1.forEach(p => fig.push(Object.assign({}, p)));
    this.rotate({x:0, y:2*Math.PI/3, z:0}, fig1);
    fig1.forEach(p => fig.push(Object.assign({}, p)));
    this.rotate({x:0, y:2*Math.PI/3, z:0}, fig1);
    fig1.forEach(p => fig.push(Object.assign({}, p)));
    this.rotate({x:Math.PI/2, y:0, z:0}, fig);
    this.frames.push(fig);
    // Plane
    fig = [];
    for(y=-30; y<30; y+=60/10)
      for(x=-30; x<30; x+=60/10)
        fig.push({x:x, y:y, z:0});
    this.frames.push(fig);
    // Sphere : points placed on the sphere then randomly rotated
    fig = [];
    for(i=0; i<100; i++){
      fig1 = [{x:-30,y:0, z:0}];
      this.rotate({
        x:(4*Math.random()-2)*Math.PI,
        y:(4*Math.random()-2)*Math.PI,
        z:(4*Math.random()-2)*Math.PI
      }, fig1);
      fig.push(fig1[0]);
    }
    this.frames.push(fig);
    
    this.maskCan = new canvas(640,94);
    new grad(this.maskCan, [
      {offset:0.0, color:'#000000EE'},
      {offset:0.3, color:'#00000000'},
      {offset:0.7, color:'#00000000'},
      {offset:1.0, color:'#000000EE'}
    ]).drawH();
    
    this.scrollCan = new canvas(40,20);
    this.font.initTile(20,20,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt= "YEAH!!!   NOW THIS IS WHAT I CALL A NICE SCREEN.   WHEN I FIRST WROTE THIS I WAS NOT THAT HAPPY WITH IT BY NOW AFTER A FEW MINOR IMPROVEMNENTS I THINK IT LOOKS REALLY GOOD.. IT USES THE SAME BIGSCROLL ROUTINE AS MY PARALLAX SCROLL (SORRY I AM RATHER LAZY!!) BUT THE SINUS DOTS MAKE UP FOR THIS I THINK.   THE BAR AT THE TOP LOOKS NICE TOO AND WOULD YOU BELIEVE THAT FOR ONCE IT WORKED EXACTLY  RIGHT THE VERY FIRST TIME THAT I WROTE IT!!   I THINK THIS MUST BE SOME SORT OF RECORD FOR ME.  ITS USUALLY AT LEAST THE FOURTH ATTEMPT BEFORE IT DOES NOT EVEN BOMB OUT!!!.  I WAS RATHER PISSED OFF AT A RECENT SHOW WHEN I DISCOVERED THAT SOMEONE WHO I HAD GIVEN A COPY OF MY PARALLAX SCREEN TO AND ALSO INVITED TO WRITE A SCREEN FOR THIS DEMO, HAD PROMPTLY RIPPED OF ALL THE ROUTINES FROM THE SCREEN AND THEN PUT THE SCREEN BACK TOGETHER AND CALLED IT HIS  OWN SAYING THAT, THE LOST BOYS WROTE THIS FIRST OF ALL BUT I HAVE IMPROVED IT. SO I SEND HEART FELT FUCKING GREETINGS TO GRIFF OF THE RESISTANCE, THE KID IS A REAL LITTLE SHIT AND IF YOU EVER COME ACROSS HIM THEN WHAT EVER YOU DO DO NOT GIVE HIM ANY OF YOUR CODE AND PREFERABLY DO NOT EVEN SWAP WITH HIM, HE IS NOT TO BE TRUSTED!!!  ANYWAY JUST TO BE ANNOYING I DECIDED TO TAKE MY PARA SCROLL SCREEN APART AND SPEED IT UP AND MAKE IT UNIMPROVABLE. BY THE WAY GRIFF IS TOTALLY INCAPABLE OF WRITING HIS OWN CODE, HE CAN ONLY RIP OFF OTHER PEOPLES CODE AND THEN USE HIS MEAGER SKILLS TO SPEED IT UP, YOU SHOULD SEE THE SCREEN THAT HE WROTE FOR THIS DEMO.  IT WAS A TOTAL RIP OFF OF THE ORIGINAL TWIST SCROLL THAT I WROTE ABOUT 18 MONTHS AGO, HE HAD SPED IT UP OF COURSE BUT ANYONE WITH AN INSTRUCTION TIMINGS LEAFLET COULD DO THAT!!!  AS YOU CAN PROBABLY READ  I AM VERY PISSED OFF WITH THIS GUY. I DO NOT OBJECT TO PEOPLE USING MY IDEAS, IN FACT IF THEY ARE MY FRIENDS THEN I AM MORE THAN HAPPY TO GIVE CODE TO THEM SO THAT THEY MAY LEARN (OR NOT) FROM IT. WHAT GRIFF DOES NOT SEEM  TO REALISE IS THAT IT IS ONE THING TO SPEED UP OTHER PEOPLES CODE BUT ANOTHER THING TO WRITE YOUR OWN. SO UP YOURS CAPTAIN FUCK FLAPS, YOU WIN THE LOST BOYS PRIZE FOR SHITHEADS.  THIS WAS MANIKIN GETTING IT OFF HIS CHEST  ON 17TH JANUARY 1990.   SORRY IF YOU WERE BORED BUT IT NEEDED TO BE SAID!!!! THE DATE IS NOW 27TH MARCH 1990 AND I HAVE NEARLY FINISHED THE LOST BOYS MINDBOMB AT VERY LONG LAST. I AM JUST ENCRYPTING AND PACKING ALL OF THE SCREENS ONTO THE DISK AND IT LOOKS LIKE THERE MAY STILL BE SOME SPACE ON OUR DISK,  SO I GUESS THIS MEANS THAT I MAY HAVE TO WRITE YET ANOTHER SCREEN IN ORDER TO FILL UP THE LAST FEW SECTORS OF DISK SPACE!!  WE HAVE JUST NOW DECIDED TO SWAP THE PACKER THAT WE WERE USING. IT DOES PACK QUITE CONSIDERABLY BETTER THAN THE  ONE WE WERE USING BUT IT DOES UNFORTUNATELY MEAN THAT I HAVE MY WORK CUT OUT RE-PACKING ALL OF OUR PROGRAMS. IT DOES NOW MEAN HOWEVER THAT WE CAN GET ALMOST 2 MEGABYTES OF PACKED SCREENS ON THE DISK, MAKING THIS I THINK THE BIGGEST DEMO  IN THE HISTORY OF THE ST, AND WHAT IS ALMOST MORE AMAZING IS THAT I WROTE ALMOST ALL OF IT!!!! THERE NOW WHO HAS A MEGA EGO NOW THEN.  WE TRULY BELIEVE THAT WE HAVE CREATED THE BIGGEST AND BEST SINGLE CREW (MOSTLY) DEMO ON THE ST.  ITRULY HOPE THAT YOU AGREE WITH ME. IF YOU HAVE ANY DONATIONS FOR OUR HARD WORK, AND BELIEVE ME IT REALLY HAS BEEN HARD. (WE STARTED ON THIS OVER 1 YEAR AGO, IMMEDIATELY AFTER THE RELEASE OF THE DEF DEMO.) THE PLEASE SEND THEM TO US AT  THE FOLLOWING ADDRESS    22 OXFORD RD, TEDDINGTON, MIDDX, TW11 OPZ, ENGLAND.  OK ITS THAT TIME AGAIN, ITS TIME TO WRAP ...................             ";
    this.scrolltext.init(this.scrollCan, this.font, 1);
    this.bigScrollCan = new canvas(640,200);
    this.bigScrollCan.contex.imageSmoothingEnabled = false;
  }

  rotate(angles, figure) {
    var point, x0,x1,x2,y0,y1,y2,z0,z1,z2;
    for(point in figure){
      // Axe x
      x0 = figure[point].x;
      y0 = figure[point].y*Math.cos(angles.x) + figure[point].z*Math.sin(angles.x);
      z0 = figure[point].z*Math.cos(angles.x) - figure[point].y*Math.sin(angles.x);
      // Axe y
      x1 = x0*Math.cos(angles.y) - z0*Math.sin(angles.y);
      y1 = y0;
      z1 = z0*Math.cos(angles.y) + x0*Math.sin(angles.y);
      // Axe z
      x2 = x1*Math.cos(angles.z) + y1*Math.sin(angles.z);
      y2 = y1*Math.cos(angles.z) - x1*Math.sin(angles.z);
      z2 = z1;
      // new point after rotations
      figure[point].x = x2;
      figure[point].y = y2;
      figure[point].z = z2;
    }
  }

  nextFrame(){
    this.ctrFrame++;
    if(this.ctrFrame > 2)
      this.ctrFrame = 0;
  }
  
  drawDots(){
    let c;
    // Dots ...
    this.dotsCan.clear();
    this.frames[this.ctrFrame].forEach(p => {
      if(p.z < -10)
        c='#444';
      else if(p.z < 10)
        c='#888';
      else
        c='#EEE';
      this.dotsCan.contex.fillStyle = c;
      this.dotsCan.contex.fillRect(~~(90 + p.x * this.dotsZoom), ~~(90 + p.y * this.dotsZoom), 2,2);
    });
    [40, 232, 424].forEach(x => this.dotsCan.draw(this.can, x, 150));
    
    // ... and shadows
    this.dotsCan.clear();
    this.dotsCan.contex.fillStyle = '#004';
    this.frames[this.ctrFrame].forEach(p => {
      this.dotsCan.contex.fillRect(~~(90 + p.x * this.dotsZoom), ~~(90 + p.z * this.dotsZoom / 3), 2,2);
    });
    [40, 232, 424].forEach(x => this.dotsCan.draw(this.can, x, 250));
    
//    this.rotate({x:0.03, y:0.035, z:0.0128}, this.frames[this.ctrFrame]);    
    this.rotate({x:-Math.PI/144, y:-Math.PI/72, z:-Math.PI/108}, this.frames[this.ctrFrame]);    
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.interval = setInterval(this.nextFrame, 12000);
      this.zik = new music('YM');
      this.zik.LoadAndRun(this.demoManager.basepath + 'Sinus.ym');
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused){
        this.can.clear();
        this.ctx.drawImage(this.backs.img, 0,0,1,200, 0,200,640,200);
        this.bigScroller();
        this.drawDots();
        this.littleScroller();
        this.roller();
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  bigScroller(){
    this.scrollCan.clear();
    this.bigScrollCan.clear();
    this.scrolltext.draw(0);
    
    const big = this.bigScrollCan.contex;
    big.globalCompositeOperation = "source-over";
    big.drawImage(this.scrollCan.canvas, 0,0,40,20, 0,0,640,200);
    big.globalCompositeOperation = "source-in";
    big.drawImage(this.backs.img, 1,0,1,200, 0,0,640,200);
    this.bigScrollCan.draw(this.can,0,100);
  }
  
  littleScroller(){
    this.bigScrollCan.clear();
    const li = this.bigScrollCan.contex;
    li.globalCompositeOperation = "source-over";
    for(let ys=20, yd=0; ys>=0; ys--,yd+=4)
      li.drawImage(this.scrollCan.canvas, 0,ys,40,1, 0,yd,640,4);
    li.globalCompositeOperation = "source-in";
    li.drawImage(this.backs.img, 0,200,1,80, 0,0,640,80);
    this.bigScrollCan.draw(this.can, 0,322);
  }
  
  roller(){
    let ys=this.ctrRoll, yd=0;
    [8,8,8,4,4,4,2,2].forEach(add=> {
      this.ctx.drawImage(this.roll.img, 0,ys,622,2, 8,yd,622,2);
      yd += 2;
      ys = (ys + add) % 400;
    })
    for(;yd<94-16; yd+=2, ys=(ys+2)%400)
      this.ctx.drawImage(this.roll.img, 0,ys,622,2, 8,yd,622,2);
    [2,2,4,4,4,8,8,8].forEach(add=> {
      this.ctx.drawImage(this.roll.img, 0,ys,622,2, 8,yd,622,2);
      yd += 2;
      ys = (ys + add) % 400;
    })
    this.maskCan.draw(this.can,0,0);
    this.ctrRoll++;
  }
  
  stop() {
    this.running = false;
  }

  // removes event listeners before notifying the menu screen that the demo is finished
  end() {
    document.body.removeEventListener('keydown', this.onKeyPressed);
    clearInterval(this.interval);
    stopCodefMusic();
    this.endCallback();
  }

  // Event processor
  onKeyPressed(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
    if (event.key === 'n') {
      this.nextFrame();
    }
    if (event.key === 'l') {
      console.log(this.frames[this.ctrFrame]);
    }
    if (event.key === 'p') {
      this.paused = !this.paused;
    }
  }
}