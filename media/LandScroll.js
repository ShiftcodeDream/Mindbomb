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
    this.scrolltext.scrtxt = "   \\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]    AW SHIT IT'S A SCROLLING LINE!!  THOSE FUCKING LOST BOYS HAVE DONE IT AGAIN AND BLOWN MY MIND. GOOD DEMOS, FIRST SEEN ON THE AMIGA, NOW SHOWING, COURTESY OF THE LOST BOYS. BEST ON THE ST, MODESTY HAS  NEVER BEEN OUR STRONGEST POINT. WE ARE THE BEST SO FORGET THE REST!!! THIS DEMO HAS BEEN GRADUALLY WRITTEN, THEN RE-WRITTEN AND THEN HAD EVEN MORE BITS ADDED TO IT BETWEEN JUNE 1989 AND MARCH 1990. THIS MAKES IT ONE OF THE OLDEST SCREENS ON THIS DEMO.  THE TROUBLE WITH ALL OF THE CODING FOR THIS DEMO IS THAT WE KEPT ON LEARNING EXTRA  LITTLE TRICKS TO SPEED UP OUR CODE OR THOUGHT UP BETTER WAYS OF CODING OUR SCREENS WHICH ALLOWED US MORE TIME FOR OTHER THINGS. FOR INSTANCE THIS SCREEN WAS REWRITTEN COMPLETELY ON AT LEAST THREE SEPERATE OCCASIONS. AT ONE POINT IT WAS EVEN RUNNING WITH NO BORDERS ON THE SCROLLINE, BUT THIS WAS VERY COMPLEX  TO MANAGE AND SO WE GAVE THAT IDEA UP.   SPAZ'S GRAPHIX ARE REALLY EXCELLENT AND THE SIGNS LOOK GOOD.  AS YOU WOULD EXPECT IT USES 100 PERCENT OF THE AVAILABLE PROCESSOR TIME AND IS OPTIMIZED AS FAR AS WE FEEL NECESSARY.   I HAVE BEEN TRYING TO WORK OUT HOW MANY HOURS I HAVE WORKED ON THIS DEMO, AND THE RESULT IS REALLY SHOCKING I'M SURE THAT THIS MUST BE THE MOST  WORKED UPON DEMO IN THE HISTORY OF THE ST.  I CODED THE FIRST SCREEN IN ABOUT APRIL 1989 AND NOW 10 MONTHS LATER I'M STILL WORKING ON IT AND I DOUBT VERY MUCH IF IT WILL BE FINISHED  MUCH BEFORE APRIL 1990!!!!!!  WHO SAYS HACKERS ARE LAZY BASTARDS WHO RIP OF THE COMPUTER INDUSTRY. WE WORK HARDER THAN MOST FUCKING GAME DESIGNERS SO IF ANYONE SLAGS US OFF THEN FUCK THEM!!!!!! HAVE YOU TRIED THE ARROW KEYS ON THE KEYBOARD YET.     CLEVER HUH!  I WAS GOING TO MAKE THE SCREEN DO THAT AUTOMATICALLY BUT EVERYONE LIKES A BIT OF AUDIENCE PARTICIPATION ON DEMOS SO I LEFT IT TO YOU INSTEAD!  MY NEW STARFIELD HAS ALLOWED THIS SCREEN TO BECOME ONE OF MY FAVOURITES ON THE WHOLE DEMO. IT GETS THE VERY BEST OUT OF THE ST I THINK WITHOUT USING ANY SPECIAL TRICKS OR STUFF!.   I HAVE NOT BOVERED TO WORK OUT HOW MUCH PROCESSOR TIME EACH PART OF THE SCREEN TAKES BUT IT MUST GO SOMETHING LIKE THIS FOR ANYONE WHO IS INTERESTED.  STARFIELD 10 PERCENT, SPRITES (FULLY MASKED) 35-40 PERCENT, RASTER SCROLL 20 PERCENT AND THE SIGNS MAKE UP THE REST OF THE PROCESSOR TIME. THIS SCREEN DOES OF COURSE USE 100 PERCENT CPU TIME. (GOES WITHOUT SAYING REALLY!)   ANYWAY I CANNOT THINK OF ANYMORE THINGS TO WRITE IN THIS SCROLL SO I GUESS I'M GOING TO WRAP NOW.  HOPE YOU LIKED THIS!!!          WRAP!!!!!!!............. ";
    this.scrolltext.init(this.scrollCan, this.font, 2);

    this.ctrCenter = 0;
    this.shifted = 0;
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
      case 'ArrowLeft':
        this.shifted = (this.shifted + 2) % 32;
        break;
      case 'ArrowRight':
        this.shifted = (this.shifted - 2) % 32;
        break;
    }
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