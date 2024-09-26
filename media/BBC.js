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
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['BBCSprites.png','font_64x64.png'])).then(data => {
      [this.sprites, this.font] = data;
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
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(768, 540, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.zarbScroll();
      this.starfield();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  zarbScroll(){
    let i,x,y,a,b;
    this.scrolltext.draw(0);
    for(i=0, b=this.zarbCtr; i<513; i+=128, b-=Math.PI/3){
      for(x=0,a=b; x<768; x+=16, a+=0.13){
        y = 440 + 36*Math.sin(a);
        this.ctx.drawImage(this.scrollCan.canvas,
                           x+i,0, 16,64,
                           x,~~y, 16,64
                          );
      }
    }
    this.zarbCtr += 0.09;
  }
  
  starfield(){
    this.starsCan.clear();
    this.stars.draw();
    this.starsCan.draw(this.can,0,404);
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