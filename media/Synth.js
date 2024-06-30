class Synth {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Binds all methods to "this" (Why do we have to do that? Javascript drawbacks !)
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    })
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    this.main_logo = [];
    this.songs = [];
    return Promise.all(this.demoManager.loadResource([
        'mc_white_trans.png', 'mc_red_trans.png', 'mbg_font_pink.png', 'army_16x16.png',
        'COOL.MOD', 'PANINARO.MOD', 'QUOVADIS.MOD', 'START.MOD', 'THEEND2.MOD', 'THENIGHT.MOD'
      ])).then(data => [
        this.main_logo[0], this.main_logo[1], this.font, this.tinyFont,
        this.songs[1], this.songs[2], this.songs[3], this.songs[4], this.songs[5], this.songs[6]
      ] = data);
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.track = 5;
    this.hold  = 50;
    this.oldY1 = 0;
    this.oldY2 = 0;
    this.oldY3 = 0;
    this.oldY4 = 0;
    this.Xpos  = 0;
    this.voices = [0,0,0,0];
    this.songNames = [ "",
      "F1. 'WHAT A BUMMER'", "F2.  PANINARO", "F3. FADE TO A PINKISH RED",
      "F4. REVENGE OF THE MUTANT WAFER", "F5. MIND BOMB (THEME)", "F6. IN THE NIGHT"
    ];
    this.text = "USE KEYS F1-F6 FOR DIFFERENT MUSIX";
    
    this.bob = 0;
    this.loop = 0;
    this.logotime = 100;
    this.whichlogo = 0;
    this.logofade = 0;
    this.logofadeinc = 0.025;

	this.starcanvas = new canvas(640/2,300/2);
	this.vucanvas = new canvas(768,540);
	this.scrollcanvas = new canvas(640,66);

	this.mystarfield = new starfield3D(this.starcanvas,500,1.5,640/2,300/2,320/2,150/2,'#FFFFFF',150,5,5);

	this.font.initTile(66,66,32);
	this.tinyFont.initTile(16,16,32);

	this.scrolltext = new scrolltext_horizontal();
	this.scrolltext.scrtxt = "          WELCOME TO THE FINAL TRIUMPH OF THE LOST BOYS MINDBOMB DEMO!  THIS IS THE SCREEN THAT VERY NEARLY DIDN'T MAKE IT ON TO THE DEMO. IT WAS ONLY FINISHED ON 1ST APRIL (NO KIDDING!!) 1990 JUST BEFORE MANIKIN WENT ON HOLIDAY!  THE DIGISYNTH ROUTINE IS IN OUR OPINION THE BEST ONE EVER ON THE ST. THE SAMPLES ARE CRYSTAL CLEAR AND WE HAVE FOUR CHANNELS OF DIGI-SOUND ALL INDIVIDUALLY PITCHED. THE SYNTH ROUTINE WORKS AT 8KHZ!!! AND TAKES A LITTLE LESS THAN 50 PERCENT PROCESSOR TIME. IT IS BASED UPON A SYNTH ROUTINE WRITTEN BY ROB POVEY AND ALL THE MUSIC IS WRITTEN BY SPAZ ON ROB'S EXCELLENT 4-TRACK PACKAGE CALLED QUARTET SOLD BY MICRODEAL. WE FULLY INTEND TO USE THIS SYNTH ROUTINE A LOT MORE IN THE FUTURE AND INDEED WE WOULD HAVE USED IT A LOT MORE IN THIS DEMO EXCEPT FOR THE FACT THAT I ONLY WORKED OUT THE SUPER FAST ROUTINES AT THE END OF MARCH AND BY THIS TIME THE MINDBOMB DEMO WAS ABOUT 90 PERCENT FINISHED ALREADY AND THERE REALLY WASN'T ALL THAT MUCH SPACE ON THE DISK!   IN CASE YOU HAVE NOT ALREADY NOTICED THERE ARE IN FACT 6 TUNES ON THIS DEMO SCREEN AND YOU CAN SELECT THESE BY PRESSING THE KEYS F1-F6. ALL THE TUNES ARE WRITTEN BY SPAZ AND ARE ALL ORIGINAL COMPOSITIONS EXCEPT FOR  'IN THE NIGHT' AND 'PANINARO' WHICH ARE ORIGINALLY BY THE PET SHOP BOYS. ALL THE OTHER MEMBERS OF THE LOST BOYS TAKE ABSOLUTELY NO RESPONSIBILITY FOR THE NAMES OF THE TUNES THEY ARE ENTIRELY THE HANDIWORK OF SPAZ AND HIS TORMENTED AND PERVERTED MIND!!! IN DAYS OF OLD THIS SCREEN ON ITS OWN WOULD HAVE CONSTITUTED AN ENTIRE DEMO, AS WITH THE EXCEPTIONS EXCELLENT AMIGA DEMO.  ISN'T IT AMAZING HOW MUCH MORE IT TAKES TO AMAZE PEOPLE THESE DAYS. THE AMIGA DEMO IS ONLY JUST OVER 2 YEARS OLD BUT THINGS HAVE NEVER REALLY BEEN THE SAME SINCE THE UNION DEMO HAVE THEY??!!  SPAZ IS DETERMINED THAT HE WILL PRODUCE THE FIRST EVER FOUR TRACK HEAVY METAL DEMO ON THE ST. I AM CURRENTLY TRYING TO GET HIM TO WRITE SOMETHING IN THIS SCROLLINE ( HE'S SITTING JUST BEHIND ME.) BUT HE WAS OUT LATE LAST NIGHT AND HENCE IS BEING AN EXTREMELY LAZY AND BORING SHIT. PROBABLY HAVING GIRLFRIEND PROBLEMS, HER NAME IS KAREN AND APPARENTLY SHE SNORES ALTHOUGH WHY THIS SHOULD BOTHER HIM I REALLY DON'T KNOW!! ACCORDING TO HER HE TALKS IN HIS SLEEP SO I GUESS THIS IS GOING TO BE A VERY LONG LASTING RELATIONSHIP!!!!!! WELL FOR THE LACK OF ANYTHING ELSE TO SAY LETS TALK ABOUT THE WEATHER. IT IS AN ABSOLUTELY GLORIOUS DAY IN LONDON TODAY, THE SUN IS OUT AND ITS REALLY WARM (ABOUT 20C AND FOR THE 1ST APRIL IN ENGLAND THIS IS REALLY AMAZING!!) THIS AFTERNOON IS OUR RELATIVE BASHING AFTERNOON AS MUCH OF OUR FAMILY HAVE COME AROUND OUR HOUSE, FORTUNATELY WE HAVE MANAGED TO AVOID THE HABITUAL WALK IN THE PARK. (SPAZ AND I) AND SO WE ARE FREE TO FINISH OFF YET MORE SCREENS FOR OUR MAMMOTH DEMO.  THIS IS NOW THE BIGGEST SCREEN ON THE WHOLE DISK IT TAKES UP NEARLY 200 SECTORS ABOUT 100K OF DISK SPACE AND IS REALLY TO BIG TO PUT ON THE DISK BUT I GUESS WE'LL HAVE TO SQUEEZE IT ON SOME HOW. THE SCREEN IS PERHAPS A LITTLE SIMPLE AND THIS IS BECAUSE I REALLY DIDN'T HAVE ALL THAT MUCH TIME TO WRITE IT (ABOUT 1 DAY) AND SO I JUST PUT A FEW PIECES OF CODE TOGETHER SO THAT WE WOULD HAVE SOMTHING TO SHOW FOR OUR HARD WORK. FUTURE DIGISYNTH SCREENS WILL BE A LOT BETTER WE PROMISE. BUT AT LEAST WE HAVE INCLUDED A NICE LOT OF MUSIC FOR YOU TO IMPRESS ALL YOUR FRIENDS WITH EH!!!  LOST BOYS ARE THE FUCKING BEST!!!!!!!        WRAP!!!!!!!!!!!!                ";
	this.scrolltext.init(this.scrollcanvas, this.font, 10);

 	this.starcanvas.contex.imageSmoothingEnabled = false;
    this.starcanvas.contex.mozImageSmoothingEnabled = false;
	this.starcanvas.contex.oImageSmoothingEnabled = false;
	this.starcanvas.contex.webkitImageSmoothingEnabled = false;
    
    // Add / hack some methods
    // Prototype for Protracker to load a song from a binary source instead of from an url
    Protracker.prototype.loadBinary = function (theSong){
      this.buffer=new Uint8Array(theSong);
      this.parse();
      this.setrepeat(true);
      if (this.autostart) this.play();
    };
    
    this.quartetPlayer = new Protracker();
    this.quartetPlayer.autostart = true;
    
    this.running = true;
  }

  changeSong(num){
    this.track = num;
    this.quartetPlayer.stop();
    this.quartetPlayer.clearsong();
    this.quartetPlayer.loadBinary(this.songs[num]);
    this.text = this.songNames[num];
  }

  drawVu(){
    this.vucanvas.clear();
    for(let i=0; i<4; i++){
      let curVol = this.quartetPlayer.vu[i]*240;
      let v = this.voices[i];
      if(curVol > v)
        v = curVol;
      else
        v -= 2;
      if(v<3)
        v=2;
      if(v>60)
        v=60;
      this.voices[i] = v;
    }
    [320, 352, 384, 416].forEach((pos,i) => {
      this.vucanvas.quad(pos,268,30,-this.voices[i],'#E00');
      this.vucanvas.quad(pos,274,30,this.voices[i],'#00E');      
    });
    this.vucanvas.draw(this.mycanvas,0,0);
  }  
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.mycanvas = new canvas(768,540,"main");
      this.mycanvas.contex.imageSmoothingEnabled = false;
      this.mycanvas.contex.mozImageSmoothingEnabled = false;
      this.mycanvas.contex.oImageSmoothingEnabled = false;
      this.mycanvas.contex.webkitImageSmoothingEnabled = false;

      this.quartetPlayer.loadBinary(this.songs[this.track]);
      document.body.addEventListener('keydown', this.KeyCheck);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.mycanvas.fill('#000');
      this.starcanvas.clear();
      this.scrollcanvas.clear();
      
      let pos = (768 - 16*this.text.length) /2;
      this.tinyFont.print(this.mycanvas, this.text, pos, 66);
      
      this.drawVu(); 

      this.mystarfield.draw();
      this.starcanvas.draw(this.mycanvas,64,100,1,0,2,2);

      this.scrolltext.draw(0);
      this.scrollcanvas.draw(this.mycanvas,64,470-66);

      this.logotime--;
      if (this.logotime<0){
        this.main_logo[this.whichlogo].draw(this.mycanvas,0,0,this.logofade,0);
        this.logofade += this.logofadeinc;
        if (this.logofade>1) this.logofade=1;
        if (this.logofade<0) this.logofade=0;
        if (this.logotime<-50){
          this.logofadeinc = -0.025;
        }
        if (this.logotime<-100){
          this.logofadeinc = 0.025;
          this.logofade = 0;
          this.whichlogo++;
          if (this.whichlogo>1) this.whichlogo = 0;
          this.logotime = 100;
        }
      }
    } else {
      this.end();
    }
    window.requestAnimFrame(this.main)
  }

  stop() {
    this.quartetPlayer.stop();
    this.running = false;
  }

  // removes event listeners before notifying the menu screen that the demo is finished
  end() {
    document.body.removeEventListener('keydown', this.KeyCheck);
    this.endCallback();
  }

  // Event processor
  KeyCheck(ev) {
    if (!ev) var ev = window.event;
    if (ev.key === ' ') {
      ev.preventDefault();
      this.stop();
    }
    // F1 - F6 function keys
	var KeyId = ev.keyCode;
    if(KeyId > 111 && KeyId < 118){
      this.changeSong(KeyId - 111);
      ev.preventDefault();
      return false;
    }
  }
}