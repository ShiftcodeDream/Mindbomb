class BigSprite {
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
            'tlb_logo.png', 'tlb_sprites.png', 'megadeath-orange_128x128.png', 'Stormlord.sndh'
        ])).then(data => [this.tlb_logo, this.sprite, this.font, this.zik] = data);
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
	this.spritecanvas=new canvas(768,540);
	this.starcanvas=new canvas(768/2,380/2);

	this.tlb_logo.setmidhandle();

	this.font.initTile(128,128,32);

	this.mystarfield=new starfield3D(this.starcanvas,200,1.5,768/2,380/2,384/2,190/2,'#FFFFFF',100,5,5);

	this.scrolltext = new scrolltext_horizontal();
	this.scrolltext.scrtxt="ONCE AGAIN THE LOST BOYS TAKE THE ST TO ITS LIMITS. THIS SCREEN IS NOT ONE OF THE BEST THAT I HAVE EVER WRITTEN BUT IT DOES TAKE UP JUST ABOUT EVERY AVAILABLE BYTE OF MEMORY ON A STANDARD HALF MEG MACHINE SO I DECIDED TO INCLUDE IT ANYWAY SINCE THERE IS SOME SPACE LEFT ON THE DISK. THIS IS MY TENTH MINDBOMB SCREEN NOT INCLUDING THE INTRO THE RESET DEMO AND THE MAIN MENU. I THINK THAT THIS MUST BE THE FIRST EVER MEGA DEMO TO BE WRITTEN BY ONE PROGRAMMER! I HAVE SPENT MORE TIME ON THIS DEMO THAN MOST PEOPLE SPEND ON CODING THEIR OWN GAMES. HENCE THIS IS WHAT I HAVE DECIDED TO DO AS MY NEXT PROJECT. YES IN THE OLD AND TRUSTED FASHION MANIKIN OF THE LOST BOYS WILL NEXT BE WRITING A GAME WHICH WILL PROBABLY BE FINISHED BEFORE CHRISTMAS AND ALMOST CERTAINLY BE PUBLISHED BY THALION SOFTWARE. OR GRANDSLAM IN BRITAIN. SPAZ WILL BE DOING THE GRAPHICS FOR THIS GAME AND WITH LUCK IT WILL FEATURE MUSIC BY MAD MAX OF TEX. ONCE THIS SCREEN HAS BEEN ADDED TO THE MINDBOMB DISK I WILL HAVE A GRAND TOTAL OF TWENTY FOUR TRACKS TO PLAY AROUND WITH. FOR ANYONE INTERESTED THE DATE TODAY IS SEVENTEENTH OF MARCH AND THE RELEASE DATE FOR THE MINDBOMB IS APRIL EIGHTEENTH SO I HAVE EXACTLY ONE MONTH MORE TO PLAY AROUND WITH MY CODE. ALL THE SCREENS WHICH I HAVE WRITTEN FOR MINDBOMB ARE NOW COMPLETELY FINISHED AND I SHALL PROBABLY WRITE ONE MORE SCREEN BEFORE I CALL IT A DAY. SO WITH LUCK THIS DEMO SHOULD FEATURE A GRAND TOTAL OF AROUND TWENTY SCREENS MAKING IT BY FAR THE BIGGEST SINGLE CREW DEMO EVER RELEASED. EVEN WITHOUT ANY OF OUR GUEST SCREENS WE WOULD STILL BEAT THE CUDDLY DEMOS FOR VOLUME OF SCREENS AND I ALSO BELIEVE THAT THE GENERAL QUALITY OF CODE IS BETTER AS WELL NOW. THERE ARE ONE OR TWO SCREENS ON CUDDLY DEMOS THAT ARE UNSURPASSABLY BRILLIANT SUCH AS THEIR FULLSCREEN BUT WE BELIEVE THAT ALTHOUGH WE HAVE NOT EVEN ATTEMPTED TO MATCH THIS MEGA ACHIEVEMENT SOME OF OUR SCREENS ARE ALSO IN A CLASS OF THERE OWN. WE DO HOPE THAT YOU AGREE. IT SEEMS POSSIBLE THAT WE MAY GET TO INCLUDE A TCB SCREEN IN THIS DEMO BUT SINCE I WILL NOT KNOW THIS FOR DEFINITE UNTIL JUST BEFORE I RELEASE IT I GUESS YOU WILL JUST HAVE TO SEE. THE DEMO WILL ACTUALLY BE RELEASED AT THALION SOFTWARE DURING MY VISIT THERE NEXT MONTH. OTHER PEOPLE WHO WILL BE PRESENT AT THALION OVER EASTER ARE ALL MEMBERS OF TCB, ALL MEMBERS OF TEX, THE GIGABYTE CREW AND LEVEL SIXTEEN SO I WILL INDEED BE AMONG THE WORLDS FINEST DEMO AND GAME WRITERS! THIS MAKES ME FEEL VERY HONOURED AND VERY LUCKY. I AM GOING TO THALION WITH STEFAN POSTHUMA DIGITAL INSANITY AND I THINK WE ARE EQUALLY EXCITED AT THIS PROSPECT!! I AM HOPING THAT I WILL HAVE THE OPPORTUNITY TO LEARN SOME NEW TRICKS FROM THESE VARIOUS PEOPLE WHO UNDOUBTEDLY WILL HAVE SOME IDEAS AND TRICKS THAT I HAVE NOT THOUGHT OF YET. NOW WE WOULD LIKE TO SAY A LITTLE ABOUT SOME OF THE VERY LATEST DEMOS THAT GOT OUR HANDS ON. FIRST COMES THE CAREBEARS SO WATT DEMO. THIS ONE IS LONG OVERDUE AND I HAVE TO SAY A BIT OF A DISAPPOINTMENT. IT CERTAINLY HAD ITS HIGH POINTS IN PARTICULAR THE OMEGA AND SYNC SCREENS AND TWO OF THE TCB SCREENS WERE EXCEPTIONALLY GOOD BUT UNFORTUNATELY ALL THE REST OF THE SCREENS DECIDEDLY MEDIOCRE. THE BEST DEMO OF RECENT TIMES IN OUR OPINION THE NEWYEAR DEMO TWO BY SYNC OMEGA AND TCB. ON OUR COPY ONE OF THE SCREENS DOES NOT WORK BUT THE OTHER SCREENS ARE ALL OUTSTANDING PARTICULARLY THE OMEGA SCREENS. THEIR MULTIDIRECTIONAL WOBBLY SPRITE IS A PIECE OF CODING BRILLIANCE! WE THOUROUGHLY RECOMMEND BOTH OF THESE DEMOS AS THE BEST OF RECENT TIMES. WE DO NOT WISH TO SOUND PONCY BUT KEEP UP THE GOOD WORK GUYS ITS NICE TO BE AMAZED ON A REGULAR BASIS!!! FINALLY WE WILL GIVE YOU ADVANCE WARNING OF ANOTHER DEMO IN THE PIPELINE. WE HAVE SEEN A FEW PREVIEW SCREENS FROM THIS DEMO, AND HAVE SO FAR BEEN VERY IMPRESSED. THE DEMO WILL BE RELEASED BY THE INNER CIRCLE SOME OF WHOSE MEMBERS WE ARE NOT PARTICULARLY FOND OF AS YOU MAY HAVE READ ELSEWHERE. BUT WE BELIEVE IN GIVING CREDIT WHERE CREDIT IS DUE SO FOR THE SAKE OF THE INNER CIRCLES OTHER MEMBERS. ST SQUAD DYNAMIC DUO ETC WE SAY THAT THIS IS A DEMO TO LOOK OUT FOR!!! WELL I THINK I SHALL LEAVE IT AT THAT FOR THIS SCROLLLINE AS I REALLY AM ABOUT THE END OF MY TETHER WHEN IT COMES TO WRITING SCROLL TEXTS. HOPEFULLY I SHALL GET SOME OF THE VARIOUS OTHER PEOPLE WHO HAVE BEEN IN THE CODING OF THIS MEGA PROJECT TO WROTE THEIR OWN SCROLLTEXTS FOR SOME OF THE OTHER SCREENS. SO UNTIL NEXT TIME, WRAP!!!!!!!! ";
    
    this.bob=0;
    this.loop=0;

 	this.starcanvas.contex.imageSmoothingEnabled = false;
  	this.starcanvas.contex.mozImageSmoothingEnabled = false;
	this.starcanvas.contex.oImageSmoothingEnabled = false;
	this.starcanvas.contex.webkitImageSmoothingEnabled = false;
    
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
      this.scrolltext.init(this.mycanvas,this.font,16);
      
      this.zik.play();
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.mycanvas.fill('#000000');
      this.spritecanvas.clear();
      this.starcanvas.clear();

      this.mystarfield.draw();
      this.starcanvas.draw(this.mycanvas,0,0,1,0,2,2);

      this.bob+=0.008;
      this.tlb_logo.draw(this.mycanvas,
                         768/2+(768/4*Math.cos(this.bob*4-Math.cos(this.bob-0.1))),
                         540/2.7+(540/8*-Math.sin(this.bob*4-Math.cos(this.bob-0.1)))
                        );	

      var midx=768/2.1;
      var midy=300/7.2;
      var incy=300/4.5;
      for (var s=0;s<18;s++){
          var nit=this.loop+s*7.5;
          var spx=midx+midx*Math.sin(nit/50)*Math.cos(nit/45);
          var spy=midy+incy*Math.sin(nit/20)+incy*Math.cos(nit/25); 
          this.sprite.drawPart(this.spritecanvas,spx,spy+90,(17-s)*32,0,32,16); 
      }
      this.spritecanvas.draw(this.mycanvas,0,0);

      this.loop++;
      this.scrolltext.draw(380);
      
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
    this.zik.stop();
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