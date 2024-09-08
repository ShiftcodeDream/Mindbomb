class PoDo {
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
    return Promise.all(this.demoManager.loadResource(['backdrop.png', 'dist_logo.png', 'tlblogo.png', 'font64x64.png', 'raster.png', 'Mad Max - Main Menu.sndh'])).then(data => {
      [this.bckgnd, this.dist_logo, this.tlb_logo, this.font, this.raster, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.bgi=0;
    this.logoY=0;
    this.scrY1=-34;
    this.scrY2=34;
    this.scrY3=102;
    
    this.ctrDist=0;
    this.ctrInc=Math.PI/60;
    this.ctrSpeed=Math.PI/60;
    this.ampli=60;
    this.disTable = [];
    this.ctrStax=0;

	this.rastercanvas=new canvas(768,148);
	this.buffercanvas=new canvas(768,148);
	this.buffercanvas2=new canvas(768,148);
	this.scrollcanvas=new canvas(768,148);
	this.backgroundcanvas=new canvas(640,224);
	this.bgcanvas=new canvas(1280,224*2);

	this.bgcanvas.setmidhandle();

	this.bgcanvas.clear();
	for (var bgx=0;bgx<20;bgx++){
		for (var bgy=0;bgy<20;bgy++){
			this.tlb_logo.draw(this.bgcanvas,bgx*254,bgy*30);
		}
	}

	this.distcanvas=new canvas(768,200);
	this.ctx=this.distcanvas.contex;

	//prepare dists
	this.stay(280);
    this.sinus(40,40,5);
    this.stay(40);
    this.sinus(50,60,5);
    this.stay(30);
    this.sinus(8,8,1);
    this.stay(40);
    this.sinus(4,4,50);
    //end 

	this.font.initTile(64,64,32);

	this.scrolltext = new scrolltext_horizontal();
	this.scrolltext.scrtxt="                   HI EVERYONE, THIS IS SAMMY JOE AGAIN, CAN YOU SEE THE WOBBLING LOGO IN THE MIDDLE OF THE SCREEN ? NOW, CAN YOU ALSO READ IT ?     YES, WELL DONE, IT SAYS LOST BOTS PD LIBRARY.  AS YOU PROBABLY HAVE GATHERED ALREADY THE LOST BOYS HAVE STARTED A PD (FOR THE STUPID ONES, PD STANDS FOR PUBLIC DOMAIN) LIBRARY NOT SO LONG AGO. I HEAR YOU ASK WHY HAVE YOU STARTED THIS LIBRARY, SIMPLE ANSWER, I STARTED COLLECTING DEMOS AND I SUDDENLY REALIZED I HAD AROUND 150 DISKS FULL OF DEMOS. THAT WAS AROUND THE TIME OF THE PC SHOW '89 (WHERE WE HAD OUR STAND). SO IN ORDER TO COVER SOME OF OUR COSTS, WE STARTED SELLING THESE DEMOS AT THE PC SHOW. NOW, LESS THAN A YEAR LATER, OUR PD LIBRARY HAS GROWN RAPIDLY. WE NOW HAVE AROUND 450 DISKS, MOST OF THEM ARE DEMOS, WE ALSO HAVE TONS OF GAMES AND QUITE A FEW UTILITIES.     IF YOU DO WANT OUR CATALOGUE, JUST WRITE TO US WITH A BLANK DISK AND WE WILL SEND YOU OUR LATEST LIST. THE REASON WHY WE DON'T HAVE PRINTED CATALOGUES IS THAT WE UPDATE OUR LIST JUST ABOUT EVERY WEEK, NOW IF WE WOULD GET IT PRINTED, WE WOULD WASTE A LOT OF PAPER AND WOULDN'T DO OUR SURROUNDINGS MUCH GOOD!!!!! SO IF YOU SEND US A BLANK DISK, WE WILL SEND YOU OUR LATEST CATALOGUE. OUR CONTACT ADDRESS IS: TLB PD    22 OXFORD ROAD    TEDDINGTON    MIDDLESEX (SOUNDS GOOD EEH?)  TW11 OPZ   ENGLAND.    I WOULD LIKE TO SAY SOMETHING ABOUT PD IN GENERAL, ABOUT THREE YEARS AGO, WHEN I WAS STILL LIVING IN STUTTGART (WEST GERMANY, YES, I'M THE GERMAN MEMBER OF THE LOST BOYS, JA, JA...) THERE WERE TWO SHOPS, I THINK THEY WERE CALLED SCHREIBER UND SCHMITT, WHAT YOU COULD DO WAS, GO INTO ONE OF THE SHOPS, ASK THEM FOR THEIR PD DISKS, THEY WOULD THEN GIVE THEM TO YOU AND YOU COULD COPY THEM FREE, YES I SAID FREE. I PERSONALLY DO NOT BELIEVE IN SELLING PUBLIC DOMAIN, SO IF THERE IS ANYONE OUT THERE WHO IS INTERESTED IN SWAPPING PD, PLEASE, PLEASE WRITE TO ME. I ALSO WANT TO APPEAL TO ALL THE GUYS OUT THERE WHO LIKE US, PRODUCE THESE GREAT DEMOS UTILITIES, IF YOU DO THEM, COULD YOU PLEASE SEND THEM TO US, WE ARE ALWAYS INTERESTED IN LOOKING AT NEW STUFF, EVEN IF IT ISN'T TOP CLASS!!!!!!    NOW, YOU WANT TO KNOW WHY WE ARE SELLING THE PD DISKS, IT'S SIMPLE AGAIN, THE LITTLE PROFIT WE MAKE WE USE AGAIN TO BUY MORE BLANK DISKS AND THAT MEANS THAT WE CAN COPY MORE DEMOS UTILITIES ETC., SO AS YOU CAN SEE THE MONEY IS NOT USED FOR OUR OWN PROFIT. SOMETHING ELSE WE DO IS, WE ALWAYS WRITE DOWN WHICH DEMOS WE HAVE SOLD, AND THEN WHEN WE HAVE SOLD A LOT OF ONE DISK, WE SEND SOME OF THE MONEY TO THE AUTHORS, WE COULDN'T DO THAT YET, AS WE HAVEN'T MADE ANY MONEY YET. THE MONEY IS ALSO USED TO ANSWER LETTERS (WE HAVE TO BUY STAMPS, ENVELOPES ETC...). AT THE MOMENT WE SPEND AROUND 10 POUNDS A WEEK ON JUST STAMPS, THIS IS BECAUSE WE HAVE CONTACTS ALL OVER THE WORLD LIKE AMERICA, ISRAEL, SWEDEN, AUSTRALIA, EUROPE, RUSSIA ETC....(AS WE ARE STUDENTS, WE COULDN'T AFFORD TO KEEP IN CONTACT WITH ALL OUT CONTACTS OTHERWISE). SO YOU CAN SEE THAT THERE IS BARELY ANY MONEY FOR US IN IT, OCCASIONALLY WE USE SOME MONEY TO BUY SOME BEER OR EVEN BETTER SOME VODKA WHEN WE HAVE TO WRITE SCROLLERS LIKE THIS ONE (I AM STILL SUFFERING FROM A HANG OVER FROM THE STUFF I HAD YESTERDAY AT A PARTY) OR THE ONE ON THE MAIN MENU WHICH WE WROTE A MONTH BACK AT MANCHESTER (FUCKING HELL, WE WERE PISSED WHEN WE WROTE THAT ONE!!). SO IF YOU EVER BUY ANYTHING FROM US, THINK OF IT AS A DONATION, KEEP IN MIND THAT THE MONEY IS GOING TO BE INVESTED AGAIN. OH BEFORE I FORGET, I WOULD LIKE TO TELL YOU ABOUT A NEW DISK MAGAZINE CALLED TLB MAGGIE, YES,  YOUR RIGHT, IT IS A DISK MAGAZINE BY THE LOST BOYS, THE REASON WHY I HAVE STARTED THIS MAGAZINE IS THAT  R.KARSMAKERS AND S. POSTHUMA HAVE STOPPED THEIR GREAT DISK MAGAZINE ST NEWS AND AS THERE WAS NO DECENT MAGAZINE AROUND ANYMORE, I DECIDED TO START  M A G G I E, THE MAGAZINE IS GOING TO BE DOUBLE SIDED HALF MEG, THE DISK WILL ALWAYS CONTAIN AS MUCH AS WE CAN MANAGE GAME REVIEWS, CHEAT CODES, ASSEMBLER SOURCE, E.G. IN THE FIRST ISSUE WE WILL TELL YOU HOW TO DO THE TWISTER FROM THE DEF DEMO (IT HAS BEEN USED BEFORE IN ST NEWS, I HOPE YOU DON'T MIND RICHARD). THE FIRST ISSUE WILL ALSO CONTAIN SOME PUBLIC DOMAIN UTILITIES, A COUPLE OF GOOD INTROS, A GANE WHICH HAS BEEN DESIGNBED ESPECIALLY FOR THE LOST BOYS DISK MAGAZINE (YOUR THIS GRANNIE IN A WHEELCHAIR AND YOU HAVE TO GO AROUND SHOOTING CARS, KILLING PEDESTRIANS, YOU ALSO GET SOME FUNNY COMMENTS!!! I THINK IT'S A GREAT GAME, THE MAGGIE IS ALSO GOING TO CONTAIN SOLUTIONS TO ADVENTURES, THIS IS AN APPEAL TO YOU READING THIS, IF YOU HAVE FINISHED ANY ADVENTURER, KNOW OF ANY CHEATS WE DON'T, HAVE ANY COMMENTS OF WHAT YOU WANT US TO PUT IN THE MAGAZINE, WANTS US TO PUT YOUR LETTER IN THE MAGAZINE, JUST SEND IT TO US AS AN ASCII FILE AND WE WILL DEFINITELY PUT IN THE NEXT ISSUE. ALSO, IF YOU WANT TO WRITE AN ARTICLE FOR THIS MAGAZINE, JUST DO SO AND SEND IT TO US. I WOULD LIKE TO REPEAT AGAIN, PLEASE SEND US SOLUTIONS TO ADVENTURES OR EVEN IF YOU HAVE FINISHED CHAOS STRIKED BACK, PLEASE SEND US THE SOLUTION. SO WHAT I NOW SAID IN ABOUT 5 OR 6 LINES, I COULD HAVE SAID IN ONE , W R I T E , . NOW AS I ... HANG ON, MY TAPE RECORDER JUST WENT CLICK (THE TAPE IS FINISHED). SO IF YOU JUST WAIT A BIT BECAUSE I HAVE TO TURN THE TAPE OVER .......................... I AM BACK AGAIN, AFTER HAVING LOOKED THROUGH MY TAPES, I HAVE DECIDED TO PUT ON KREATOR'S ALBUM EXTREME AGGRESSION, FUCKING HELL, I FEEL SO AGGRESSIVE TODAY (I JUST HAD A ROW WITH MY MATHS TEACHER CALLED ALBERT WEBER (HE'S AUSTRIAN, THAT'S WHAT HE USUALLY SAYS: ' HALLLLO IHR BUBEN UND MADELS, WAS HABT DA DENN IM JENNER SO GMACHT?' THAT SOUNDS' DAMNED STUPID DOESN'T IT?   OH BY THE WAY, AS I AM ON HOLIDAY FOR EXACTLY THREE HOURS NOW, (BY THE WAY, TODAY IS THE 30TH OF MARCH I HAVE HOLIDAYS FOR THREE WEEKS, THAT'S GOOD EEH? SDP WRITE LODSA LETTERS (I MIGHT EVEN BE ABLE TO ANSWER THEM SOON!!!).   THE LETTERS I AM GOING TO RECIEVE FROM THE 6TH OF APRIL UNTIL THE 21ST OF APRIL WILL HAVE TO WAIT A LITTLE WHILE BECAUSE IN THESE 2 WEEKS A FRIEND OF MINE FROM GENEVE IS COMING AND WE ARE GOING TO BE PISSED OUT OF OUR BRAINS!!! WE ARE GOING TO GO TO CONCERTS LIKE: ACIDE REIGN, RE-ANIMATOR, CELTIC FROST, CEREBAL FIX AND A FEW OTHERS. IN MAY I WILL GO AND SEE METALLICA (FUCKING GREAT!!!!!! ONE OF THE BEST BANDS EVER!). NOW AS THIS SCROLL TEXT IS ALREADY 8 K LONG I WILL BETTER WRAP AS MANIKIN TOLD ME TO MAKE THE SCROLLTEXT NOT LONGER THAN 5K. SO DO NOT FORGET TO WRITE ARTICLES FOR MAGAZINES, AS IT IS VERY LIKELY THAT THIS IS OUR LAST BIG DEMO. I WOULD LIKE TO THANK ALL OUR FRIENDS AND CONTACTS WHO SUPPORTED US.  THANKS A LOT GUYS.      SAMMY JOE OF THE LOST BOYS        P.S.: WE MIGHT DO SOME SMALL THINGS LIKE DEMO COMPILATIONS, DON'T FORGET THAT THERE IS STILL GOING TO BE OUR DISK MAGGIE......   TSCHUUESSSS                   CODEF REMAKE BY MELLOW MAN...                 ";
	this.scrolltext.init(this.scrollcanvas,this.font,3);

 	this.scrollcanvas.contex.imageSmoothingEnabled = false;
    this.scrollcanvas.contex.mozImageSmoothingEnabled = false;
	this.scrollcanvas.contex.oImageSmoothingEnabled = false;
	this.scrollcanvas.contex.webkitImageSmoothingEnabled = false;
    
    this.zik.play();
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.mycanvas=new canvas(768,540,"main");
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
      this.scrollcanvas.clear();
      this.backgroundcanvas.clear();
      this.buffercanvas.clear();
      this.buffercanvas2.clear();

      this.bckgnd.drawPart(this.mycanvas,0,0,0,0,768,320);

      this.bgi+=0.008;
      this.bgcanvas.draw(this.backgroundcanvas,768/2+(768/4*Math.cos(this.bgi*4-Math.cos(this.bgi-0.1))),224/2+(224/2.7*-Math.sin(this.bgi*2.3-Math.cos(this.bgi-0.1))));	

      this.backgroundcanvas.draw(this.mycanvas,64,76);

      this.distcanvas.clear();
      var y,c;
      
      for (y=0,c=this.ctrStax; y<120; y++,c+=0.5){
        if(c >= this.disTable.length) c=80;
        this.ctx.drawImage(this.dist_logo.img,0,y,348,2, this.disTable[c]+146,y+50,348,2);
      }
      if(++this.ctrStax >= this.disTable.length)
        this.ctrStax = 80;

      this.logoY+=0.018;
      this.distcanvas.draw(this.mycanvas,100,140-Math.abs(Math.sin(this.logoY)*120));

      this.rastercanvas.clear();
      this.raster.draw(this.rastercanvas,0,0,1,0,77,1.08);

      this.scrolltext.draw(this.scrY1);
      this.scrolltext.draw(this.scrY2);
      this.scrolltext.draw(this.scrY3);

      this.scrollcanvas.draw(this.buffercanvas2,0,10);
      this.buffercanvas2.contex.globalCompositeOperation='source-atop';

      this.buffercanvas2.fill('#000044');

      this.buffercanvas2.draw(this.mycanvas,0,478,1,0,1,-1);
      this.buffercanvas2.contex.globalCompositeOperation='source-over'; 

      this.bckgnd.drawPart(this.mycanvas,0,364,0,364,768,64);	

      this.scrollcanvas.draw(this.buffercanvas,0,10);
      this.buffercanvas.contex.globalCompositeOperation='source-atop';

      this.rastercanvas.draw(this.buffercanvas,0,10);

      this.buffercanvas.draw(this.mycanvas,0,320);
      this.buffercanvas.contex.globalCompositeOperation='source-over'; 

      this.scrY1++;
      this.scrY2++;
      this.scrY3++;

      if (this.scrY1>=34){
        this.scrY1=-34;
        this.scrY2=34;
        this.scrY3=102;
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
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
    for(var k=0; k<nbTimes; k++) this.disTable.push(0);
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
