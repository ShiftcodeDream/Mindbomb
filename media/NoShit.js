class NoShit {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource([
      'digital_insanity.png', 'back1.png', 'backfont.png', '1stfont16x16.png',
      '1stfontclrs.png', 'raster(146down).png', 'font36x36.png',
      'mindbomb_logo_.png', 'red_raster.png', 'Leavin_Teramis.sndh'
    ])).then(data => {
      [this.di_back1, this.di_back2, this.backfont, this.font1,
       this.font1back, this.rasters, this.font2,
       this.logo, this.red_rasters, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.ctrDist=0; this.ctrInc=Math.PI/60; this.ctrSpeed=Math.PI/60; this.ampli=60; this.degrad; this.disTable = []; this.ctrStax=0;
    this.section=1;

    this.all_done=0;
    this.di_backtime=150;
    this.backg1=-40;
    this.backg2=540; 
    this.part1=150;
    this.doscroll=0;
    this.sinscrollon=0;
    this.sinlogoon=0;
    this.clr_offset=0;
    
    this.backcanvas=new canvas(768,400);
	this.scrollcanvas1=new canvas(640,16);
	this.offcanvas=new canvas(640,16); 
	this.offcanvas2=new canvas(640,300);
	this.offcanvas3=new canvas(640,300);
	this.di_back3=new canvas(900,7000); 
	this.distcanvas=new canvas(640,200);
    this.ctx=this.distcanvas.contex;

	this.backfont.initTile(65,65,32);
	this.font1.initTile(16,16,32);
	this.font2.initTile(36,36,32);

	this.scrolltext1 = new scrolltext_horizontal();
	this.scrolltext1.scrtxt="                   FIRST, THERE WAS DARKNESS ...                                            \\       THEN THERE WAS COLOR ...                      (YES, AGAIN ONE OF THOSE DEMOS) ...                            THEN HE WHO CREATETH THIS DEMO ... CASTED SOUND UPON IT                   ]               OK, HOW ABOUT A BACKGROUND?                                            [                   NICE, BUT I WANT SOME MOVEMENT HERE ...                         {                      OK, BUT I WANT MORE, MUCH MORE. HOW ABOUT SOME SCROLLTEXTS??                }                    YEAH ! NOT BAD AT ALL. BUT WHY NOT ADD SOME MORE STUFF??            @                 WOW!! LOOKS INTERESTING!        WELL, THERE IS ONE MORE EFFECT AND THEN THE COOKIE JAR WILL BE EMPTY SO TO SPEAK. BEHOLD THE LOGO:                                    %                    WELL, THIS IS ABOUT IT, NO MORE TO ADD TO THIS DEMO. I HOPE YOU ARE A BIT SATISFIED WITH THE RESULT, I MEAN IT TOOK ME QUITE SOME TIME TO GET IT ALL RIGHT.                                                        ";  // to be completed;
	this.scrolltext1.init(this.offcanvas,this.font1,4);

	this.scrolltext2 = new scrolltext_horizontal();
	this.scrolltext2.scrtxt="          YES I KNOW THAT THE SPRITES AREN'T BOUNCING VERY SMOOTHLY BUT I HAVE NO IDEA WHAT IS WRONG WITH THEM, SO TOUGH SHIT.      I THINK I WILL USE THIS SCROLLINE FOR THE THANSX'N'GREETINGS. NOW THIS IS GETTING REPETITIVE (GREETING THE SAME PEOPLE OVER AND OVER AGAIN), BUT WHO CARES ANYWAY. GREETINGS GO TO THE FOLLOWING PEOPLE: RICHARD KARSMAKERS (HI THERE, HOW DO YOU LIKE MINDBOMB SO FAR... IT'S GOT A BOOTSECTOR!) ... TIM MOSS (YEAH, THE MASTER OF THIS DEMO) ... CIA FROM GALTAN SIX! THANKS FOR HELPING ME OUT WITH MY STUPID SYNC PROBLEMS ... ALL THE GUYS AT THALION SOFTWARE (YEAH!) ... ALL THE MEMBERS OF THE CAREBEARS (NICE DEMOS GUYS, VERY NICE DEMOS) ... CIA AND ALL OTHER MEMBERS OF GALTRAN SIX (TALK TO YOU LATER) ... LORD HACKBEAR AND FRIENDS (DON'T HACK THIS DEMO TOO SOON PLEASE) ... ALL OTHER NORWEIGIANS (GARD!!!) ... ASH AND MEL (SURE HOPE YOU LIKE THIS DEMO) ... STEAKHOUSE BARLOW IN DEN BOSCH CITY (FOR SERVING THE BEST FOOD IN TOWN, THE STEAKS ARE INCREDIBLY GOOD) ... MY BOSS (FOR GIVING ME THE GREAT CAR ... ALFA ROMEO, I LOVE IT!!!) ... AENIGMATICA (STILL, STILL WAITING FOR THE GENESIS II DEMO!!!) ... THE REPLICANTS (HI SNAKE! STILL HAVE TO WRITE BACK TO YOU!) ... WELL, THAT'S ABOUT IT. I CAN MENTION OF COURSE A FEW CD'S I HAVE LISTENED TO QUITE EXTENSIVELY WHILE CREATING THIS DEMO: GARY MOORE 'STILL GOT THE BLUES', A GREAT ONE WITH NICE GUITAR STUFF IN IT. TANGERINE DREAM 'BEST OF', NICE SYNTHESISER STUFF. SODOM'S 'AGENT ORANGE', IT IS EARDRUM:TEARINGLY HEAVY.  TIME HAS COME TO CLOSE OFF THIS SCROLLER.  BYE FOR NOW FOLKS. (SCROLLINE TYPED ON THE ST OF ERIK SIMON AND HE TOLD ME TO GET ON WITH IT)   BYE!!!             WRAP!!!            ";
	this.scrolltext2.init(this.offcanvas2,this.font2,5,[{myvalue: 1, amp: 100, inc:0.1, offset: -0.04}],1);
    
 	this.distcanvas.contex.imageSmoothingEnabled = false;
    this.distcanvas.contex.mozImageSmoothingEnabled = false;
	this.distcanvas.contex.oImageSmoothingEnabled = false;
	this.distcanvas.contex.webkitImageSmoothingEnabled = false;

 	this.scrollcanvas1.contex.imageSmoothingEnabled = false;
 	this.scrollcanvas1.contex.mozImageSmoothingEnabled = false;
	this.scrollcanvas1.contex.oImageSmoothingEnabled = false;
	this.scrollcanvas1.contex.webkitImageSmoothingEnabled = false;

    //prepare dists
    this.stay(80);
    this.sinus(40,40,5);
    this.stay(40);
    this.sinus(50,60,5);
    this.stay(30);
    this.sinus(8,8,1);
    this.stay(40);
    this.sinus(4,4,50);
    //end 

	this.prep_di_back2();

	this.clr_offset=16;
    
    this.running = true;
  }

  sinus(amplitude, nb_steps, nb){
    var step = 2*Math.PI/nb_steps;
    if(nb_steps<0) nb_steps*=-1;
    for(let j=0; j<nb; j++){
      for(let i=0, a=0; i<nb_steps; i++, a+=step){
        this.disTable.push(~~(amplitude * Math.sin(a)));
      }
    }
  }

  stay(nbTimes){
    for(let k=0; k<nbTimes; k++)
      this.disTable.push(0);
  }
  
  prep_di_back2(){
	this.di_back3.clear();
	this.backfont.print(this.di_back3,"   OK FOLKS", 64,  65);
	this.backfont.print(this.di_back3,"    THI", 64, 140);
	this.backfont.print(this.di_back3," S I", 64+(65*6)-38, 140);
	this.backfont.print(this.di_back3," S", 64+(65*9)-72, 140);
	this.backfont.print(this.di_back3,"   AGAI",96,215);
	this.backfont.print(this.di_back3,"       N A", 96-38, 215);
	this.backfont.print(this.di_back3,"    DI",64,290);
	this.backfont.print(this.di_back3,"      GI", 64-38, 290);
	this.backfont.print(this.di_back3,"       TAL", 64-12, 290);
	this.backfont.print(this.di_back3,"    I", 32, 365);
	this.backfont.print(this.di_back3,"    NSANI", 56, 365);
	this.backfont.print(this.di_back3,"        TY",80, 365);
	this.backfont.print(this.di_back3,"  DEMO THAT", 96, 440);
	this.backfont.print(this.di_back3,"  THE DUTCH", 96, 515);
	this.backfont.print(this.di_back3,"   I", 96-18, 590);
	this.backfont.print(this.di_back3,"   DI", 104, 590);
	this.backfont.print(this.di_back3,"    OT HAS", 130, 590);
	this.backfont.print(this.di_back3,"    WORKED", 64, 665);
	this.backfont.print(this.di_back3,"  QUI", 64, 740);
	this.backfont.print(this.di_back3,"    TE HARD", 64+28, 740);
	this.backfont.print(this.di_back3,"  ON I", 96, 815);
	this.backfont.print(this.di_back3,"      MI", 96+28, 815);
	this.backfont.print(this.di_back3,"       GHT", 96+56, 815);
	this.backfont.print(this.di_back3,"     ADD.", 64, 890);

	this.backfont.print(this.di_back3,"  THI", 96, 1040);
	this.backfont.print(this.di_back3,"    S TI", 96+28, 1040);
	this.backfont.print(this.di_back3,"       ME", 96+56, 1040);
	this.backfont.print(this.di_back3,"  I", 96+56, 1115);
	this.backfont.print(this.di_back3,"  T USES", 96+56+28, 1115);
	this.backfont.print(this.di_back3,"  THE VERY", 96, 1190);
	this.backfont.print(this.di_back3,"  I", 96+28, 1265);
	this.backfont.print(this.di_back3,"  NFAMOUS", 96+56, 1265);
	this.backfont.print(this.di_back3,"   '",96+28+16,1340); 
	this.backfont.print(this.di_back3,"   SYNC' ", 96+28+26+16, 1340);
	this.backfont.print(this.di_back3,"  SCROLLI", 96, 1415);
	this.backfont.print(this.di_back3,"        NE", 96+28, 1415);
	this.backfont.print(this.di_back3,"  TECHNI", 96, 1490);
	this.backfont.print(this.di_back3,"       QUE", 96+28, 1490);

	this.backfont.print(this.di_back3,"  BUT THE", 96+32, 1640);
	this.backfont.print(this.di_back3,"  PARALLAX", 96, 1710);
	this.backfont.print(this.di_back3,"   EFFECT", 96, 1785);
	this.backfont.print(this.di_back3,"  ACHI", 96+28, 1860);
	this.backfont.print(this.di_back3,"      EVED", 96, 1860);
	this.backfont.print(this.di_back3,"   HERE I", 96, 1935);
	this.backfont.print(this.di_back3,"        S ", 96+28, 1935);
	this.backfont.print(this.di_back3,"   REALLY", 96+32, 2010);
	this.backfont.print(this.di_back3,"  NI", 96, 2085);
	this.backfont.print(this.di_back3,"   CE DON'", 96+28, 2085);
	this.backfont.print(this.di_back3,"         T", 96+56, 2085);
	this.backfont.print(this.di_back3," YOU ",96+28,2160);
	this.backfont.print(this.di_back3,"    AGREE?", 96+28+48, 2160);

	this.backfont.print(this.di_back3,"  THI", 96+32, 2310);
	this.backfont.print(this.di_back3,"    S FONT", 96+60, 2310);
	this.backfont.print(this.di_back3,"  DOES ALSO", 96, 2385);
	this.backfont.print(this.di_back3,"   I", 96+28, 2460);
	this.backfont.print(this.di_back3,"   NCLUDE", 96+56, 2460);
	this.backfont.print(this.di_back3,"  SOME MORE", 96, 2535);
	this.backfont.print(this.di_back3," CHARACTERS", 96+32, 2610);

	this.backfont.print(this.di_back3," //////////", 96+32, 2760);

	this.backfont.print(this.di_back3,"   HA!", 96, 2910);
	this.backfont.print(this.di_back3,"      SOME", 96+28, 2910);
	this.backfont.print(this.di_back3,"  DUMB TI", 96-20, 2985);
	this.backfont.print(this.di_back3,"        LES", 96+8, 2985);
	this.backfont.print(this.di_back3,"   YOU SAY", 96, 3060);
	this.backfont.print(this.di_back3,"   WELL, I", 96, 3135);
	this.backfont.print(this.di_back3," MUST AGREE", 96+32, 3210);
	this.backfont.print(this.di_back3,"   ON THI", 96, 3285);
	this.backfont.print(this.di_back3,"        S.", 96+28, 3285);
	this.backfont.print(this.di_back3,"   THEY'", 96, 3360);
	this.backfont.print(this.di_back3,"       RE", 96+28, 3360);
	this.backfont.print(this.di_back3," NOT REALLY", 96+32, 3435);
	this.backfont.print(this.di_back3," CREATI",96+56+32,3510);
	this.backfont.print(this.di_back3,"      VE.", 96+56+60, 3510);

	this.backfont.print(this.di_back3,"  SI", 96, 3660);
	this.backfont.print(this.di_back3,"   NCE THE", 96+28, 3660);	
	this.backfont.print(this.di_back3,"   WI", 96-28, 3735);
	this.backfont.print(this.di_back3,"    DTH OF", 96, 3735);
	this.backfont.print(this.di_back3,"    THI", 96+28, 3810);	
	this.backfont.print(this.di_back3,"      S", 96+56, 3810);	
	this.backfont.print(this.di_back3," SCROLLER", 96+56+32, 3885);	
	this.backfont.print(this.di_back3,"  I", 96, 3960);	
	this.backfont.print(this.di_back3,"  S ONLY 10", 96+28, 3960);	
	this.backfont.print(this.di_back3," CHARACTERS", 96+28, 4035);	
	this.backfont.print(this.di_back3,"  THE TEXT", 96+28, 4110);	
	this.backfont.print(this.di_back3,"  FI", 96+28, 4185);	
	this.backfont.print(this.di_back3,"   LE USED", 96+56, 4185);	
	this.backfont.print(this.di_back3,"   FOR I", 96+56, 4260);	
	this.backfont.print(this.di_back3,"       T", 96+56+28, 4260);	
	this.backfont.print(this.di_back3,"   LOOKS", 96+56+28, 4335);	
	this.backfont.print(this.di_back3,"   KI", 96+56+28, 4410);	
	this.backfont.print(this.di_back3,"    NDA", 96+56+56, 4410);	
	this.backfont.print(this.di_back3,"   STRANGE.", 96, 4485);	

	this.backfont.print(this.di_back3,"  I", 96+56, 4635);	
	this.backfont.print(this.di_back3,"   REALLY", 96+28+56, 4635);	
	this.backfont.print(this.di_back3,"   DO NOT", 96+32, 4710);	
	this.backfont.print(this.di_back3," KNOW WHAT", 96+56, 4785);	
	this.backfont.print(this.di_back3,"  TO WRI", 96+56, 4860);	
	this.backfont.print(this.di_back3,"       TE", 96+56+28, 4860);
	this.backfont.print(this.di_back3,"   HERE. ",96+56,4935);
	this.backfont.print(this.di_back3,"         I", 96+28, 4935);		
	this.backfont.print(this.di_back3," MEAN THERE", 96+28, 5010);
	this.backfont.print(this.di_back3,"    ARE", 96+56, 5085);	
	this.backfont.print(this.di_back3," ALREADY 2", 96+56, 5160);
	this.backfont.print(this.di_back3,"   OTHER", 96+56, 5235);
	this.backfont.print(this.di_back3,"  SCROLLY", 96+56, 5310);
	this.backfont.print(this.di_back3,"  TEXTS I", 96+28, 5385);
	this.backfont.print(this.di_back3,"        N", 96+56, 5385);
	this.backfont.print(this.di_back3," THI", 96+56, 5460);
	this.backfont.print(this.di_back3,"   S DEMO.", 96+56+28, 5460);

	this.backfont.print(this.di_back3," SO I", 96+56, 5610);
	this.backfont.print(this.di_back3,"     THI", 96+56+28, 5610);
	this.backfont.print(this.di_back3,"       NK", 96+56+56, 5610);
	this.backfont.print(this.di_back3,"   I", 96+56, 5685);
	this.backfont.print(this.di_back3,"    WI", 96+56+28, 5685);
	this.backfont.print(this.di_back3,"     LL", 96+56+56, 5685);
	this.backfont.print(this.di_back3," WRAP NOW", 96+56+28, 5760);

	this.backfont.print(this.di_back3,"    BYE!", 96+28, 6060);
	this.backfont.print(this.di_back3,"       !", 96+56, 6060);
	this.backfont.print(this.di_back3,"       !", 96+56+28, 6060);

	this.backfont.print(this.di_back3,"  OK,", 96+56, 6360);
	this.backfont.print(this.di_back3,"     WRAP", 96+56, 6360);
	this.backfont.print(this.di_back3,"    TI", 96+28, 6435);
	this.backfont.print(this.di_back3,"     ME!", 96+56, 6435);
	this.backfont.print(this.di_back3,"       !", 96+28+56, 6435);
  }  
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.mycanvas = new canvas(768, 540, "main");
      this.mycanvas.contex.imageSmoothingEnabled = false;
      this.mycanvas.contex.mozImageSmoothingEnabled = false;
      this.mycanvas.contex.oImageSmoothingEnabled = false;
      this.mycanvas.contex.webkitImageSmoothingEnabled = false;
      
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.mycanvas.fill('#000');

      this.backcanvas.clear();

      if (this.section==1){
        this.font1.print(this.mycanvas,"THE NAMES HAVE BEEN CHANGED",168,238);
        this.font1.print(this.mycanvas,"  TO PROTECT THE INNOCENT",168,256);

        this.part1--;
        if (this.part1<=0) {
          this.doscroll=1;
          this.section=2;
        }
      }

      if (this.section==2){
        // just wait for a bit!
      }

      if (this.section==3){
        if (this.di_backtime>75) this.di_back1.draw(this.backcanvas,0,10+this.backg1);
        if (this.di_backtime<76) this.di_back2.draw(this.backcanvas,0,10+this.backg1);

        this.di_backtime--;
      }

      if (this.section==4){
        this.di_back2.draw(this.backcanvas,0,10+this.backg1);
        this.di_back2.draw(this.backcanvas,0,10+this.backg1+480);

        this.backg1--;

        if (this.backg1<-440) this.backg1=40;
      }

      if (this.section==5){
        this.di_back2.draw(this.backcanvas,0,10+this.backg1);
        this.di_back2.draw(this.backcanvas,0,10+this.backg1+480);

        this.backg1--;

        if (this.backg1<-440) this.backg1=40;

        this.backg2-=2;

        if (this.backg2<-6940) this.backg2=540;

        this.di_back3.draw(this.backcanvas,-128,this.backg2);
      }

      if (this.doscroll==1){
        this.offcanvas.clear();
        this.scrolltext1.draw(0);

        this.check_scroll();

        this.offcanvas.contex.globalCompositeOperation='source-atop';
        this.font1back.draw(this.offcanvas,0,0-this.clr_offset,1,0,10,1);

        this.offcanvas.draw(this.backcanvas,64,22);
        this.offcanvas.contex.globalCompositeOperation='source-over';

      }

      this.backcanvas.draw(this.mycanvas,0,70);

      if (this.sinscrollon==1){
        this.offcanvas2.clear();
        this.scrolltext2.draw(140);

        this.offcanvas2.contex.globalCompositeOperation='source-atop';
        this.rasters.draw(this.offcanvas2,0,40,1,0,32,1);

        this.offcanvas2.draw(this.mycanvas,64,70);
        this.offcanvas2.contex.globalCompositeOperation='source-over';
      }

      if (this.sinlogoon==1){
        this.distcanvas.clear();
        for (let y=0,c=this.ctrStax; y<76; y+=2,c+=0.5){
          if(c >= this.disTable.length) c=80;
          this.ctx.drawImage(this.logo.img,0,y,348,4, this.disTable[c]+146,y+50,348,4);
        }
        if(++this.ctrStax >= this.disTable.length) {
          this.ctrStax = 80;
          if (this.flip==1){
            this.flip=2;
          } else {
            this.flip=1;
          }
        }

        this.distcanvas.contex.globalCompositeOperation='source-atop';
        this.red_rasters.draw(this.distcanvas,0,40,1,0,20,0.5);

        if (this.flip==1) {
          this.distcanvas.drawPart(this.mycanvas,-70,280,0,0,640,200,1,0,2,2);
        }

        if (this.flip==2) {
          this.distcanvas.drawPart(this.mycanvas,-70,280,0,0,640,this.flipmax,1,0,2,2);
          this.flipmax-=this.flipinc;
          if (this.flipmax<=-1) {
            this.flip=3;
            this.flipmax=0;
          }
          // distcanvas.drawPart(mycanvas,-70,530,1,0,2,-2);
        }
        
        if (this.flip==3) {
          // distcanvas.drawPart(mycanvas,-70,530,0,0,640,200,1,0,2,-2);
          this.distcanvas.drawPart(this.mycanvas,-70,530,0,0,640,this.flipmax,1,0,2,-2);
          this.flipmax+=this.flipinc;
          if (this.flipmax>200) this.flipmax=200;
        }
        this.distcanvas.contex.globalCompositeOperation='source-over';
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  check_scroll(){
    if (this.all_done==0){
      switch (parseInt(this.scrolltext1.scrtxt.charCodeAt(this.scrolltext1.scroffset))){
        case 92:
          this.clr_offset=32;
          break;
        case 93:
          this.zik.changeTrack(10);
          this.zik.play();
          break;
        case 91:
          this.section = 3;
          break;
        case 123:
          this.section = 4;
          break;
        case 125:
          this.sinscrollon = 1;
          break;
        case 64:
          this.section = 5;
          break;
        case 37:
          this.sinlogoon = 1;
          this.all_done = 1;
          break;
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
    } else if (event.key === 'l') {
      console.log(this);
    }
  }
}
