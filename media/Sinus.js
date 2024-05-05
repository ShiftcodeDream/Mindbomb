class Sinus {
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
    return Promise.all(this.demoManager.loadResource(['Dalton_20x20.png', 'Madmax_8.sndh'])).then(data => {
      [this.font, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.running = true;
    this.dots = "-256,-64,-60/-256,64,-60/-200,64,-60/-192,64,-20/-192,-64,-20/-136,64,-20/-136,-64,-20/-128,64,20/-72,64,20/-72,32,20/-128,-32,20/-128,-64,20/-72,-64,20/-64,-64,60/-8,-64,60/-36,-64,60/-36,64,60/64,-64,100/64,64,100/120,64,100/120,32,100/64,0,100/120,-32,100/120,-64,100/128,64,140/128,-64,140/184,-64,140/184,64,140/192,-64,180/192,-32,180/248,-32,180/220,0,180/248,-64,180/220,64,180/256,64,220/312,64,220/312,32,220/256,-32,220/256,-64,220/312,-64,220"
    .split('/').map(k => {
      let [x,y,z] = k.split(',').map(j=>parseInt(j));
      return {x:x, y:-y, z:z};
    });
    this.lines = "0,1/1,2/4,6/6,5/5,3/3,4/12,11/11,10/10,9/9,8/8,7/13,14/15,16/17,23/23,22/22,21/21,20/20,19/19,18/18,17/25,26/26,27/27,24/24,25/28,29/29,31/31,30/30,32/31,33/39,38/38,37/37,36/36,35/35,34"
    .split('/').map(k => {
      let [p1,p2] = k.split(',').map(j=>parseInt(j));
      return {p1:p1, p2:p2};
    });
    this.ctr3d = 0;
    this.ctrScroll = 0;
    
    this.degCan = new canvas(1,400);
    const ct = this.degCan.contex;
    "005.005.006.007.017.027.037.047.057.047.037.027.017.007.107.207.307.407.507.407.307.207.107.007.006"
    .split('.').forEach((c,i) => {
      let [r,g,b] = c.split('');
      ct.fillStyle = this.fromRgb7(r,g,b);
      ct.fillRect(0,i*16,1,16);
    });
    
    this.font.initTile(20,20,32);
    this.miniScrollCan = new canvas(64,20);
    this.scrollCan = new canvas(640,400);
    this.scrollCan.contex.imageSmoothingEnabled = false;
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt= "     OH MY GOD!, ITS FULL OF STARS.          WELL THATS PRETTY DAMN ORIGINAL ISN'T IT?     NO THIS ISN'T 2010 IT THE LOST BOYS VECTORS SCREEN. SLIGHTLY HIDDEN ON THE MINDBOMB DEMO.  YOU EITHER FIND YOUR WAY ONTO THIS SCREEN EASILY OR IF YOU ARE PARTIALLY STUPID (YOU CAN'T BE TOTALLY STUPID COS YOUR HERE NOW!  OR DID SOMEONE TELL YOU HOW TO GET HERE?!!) THEN YOU MAY HAVE FOUND THAT IT TOOK YOU QUITE A WHILE TO FIND OUT THAT YOU CAN WALK THROUGH THE TOP OF COLUMNS AND THEN FALL DOWN THE LENGTH OF THEM ON MY MAIN MENU! STILL I HOPE YOU THINK ITS WORTH THE TROUBLE. I WAS GOING TO DO A FEW MORE SHAPES AND STUFF IN THIS SCREEN BUT I HAVE JUST SEEN A SCREEN THAT IS RATHER TO SIMILAR TO THIS FOR MY LIKING BY AN COOL OF THE CAREBEARS AND SINCE EVERYONE IS GOING TO THINK THAT I COPIED HIM ANYWAY, I REALLY CAN'T BE BOTHERED. I AM QUITE PLEASED THAT I WROTE THE LINE PLOT ROUTINE ANYWAY AS IT BASICALLY SOLVES THE PROGRAMMING PROJECT THAT I HAVE BEEN SET FOR NEXT TERM IN UNIVERSITY. IT WAS SUPPOSED TO TAKE US ABOUT 15 HOURS, BUT I FINSHED IT IN 1 HOUR!!! PRETTY GOOD HUH!! AT THE MOMENT I AM BEING TAUGHT A COURSE ON 68000 ASSEMBLER AT UNIVERSITY, BUT I THINK I PROBABLY KNOW MORE ABOUT 68000 PROGRAMMING THAN THE BLOODY LECTURER SO ITS REALLY PRETTY BORING. ARRRGGGHHHH SHIT WHAT THE HELL IS THAT!!     SAMMY JOE HAS JUST PUT A REALLY CRAPPY RECORD ON, ITS CALLED RIDE THE LIGHTENING BY METTALICA, THE SONG IS CALLED FIGHT FIRE WITH FIRE AND IT BASICALLY CONSISTS OF SOMEBODY TWANGING A GUITAR AND SOMEBODY ELSE GROWLING SOME SHITTY LIRICKS ALONG WITH IT! IT IS UTTER SHITE! TODAY WE BOUGHT A RECORD CALLED 'ENJOY THE SILENCE' BY DEPECHE MODE AND WE ARE THINKING OF DOING A SAMPLE DEMO OF IT. IT HAS EMERGED AS A VAGUE POSSIBILITY THAT I WILL HAVE MORE SCREENS FOR THIS DEMO THAN I CAN FIT ONTO 1 DOUBLE SIDED DISK AND SO WE MAY HAVE TO USE A 2ND DISK FOR SOME EXTRA SCREENS AND THE SAMPLE WILL THERFORE BE USED AS A SPACE FILLER. THE TROUBLE WITH THIS DEMO HAS ALWAYS BEEN THAT JUST WHEN I THINK IT IS FINISHED FOR GOOD SOMETHING OR SOMEONE POINTS ME TO A BUG OR GIVES ME ANOTHER SCREEN. TODAY WAS ONE OF THOSE DAYS, I WAS HAPPILY FINISHING MY DISK OFF WHEN STEFAN ANNOUNCED THAT HE HAD IN FACT FINISHED HIS THIRD DIGITAL INSANITY SCREEN. ALSO AENIGMATICA HAVE OFFERED US A SCREEN AND SO HAVE A NORWEGIAN GROUP! ALSO TO TOP IT ALL OFF SPAZ HAS JUST PRODUCED A REALLY EXCELLENT 4 TRACK SONG (AFTER I HAVE JUST FINISHED AND PACKED THE SYNTH SCREEN!!) AND I NOW WOULD REALLY LIKE TO PUT THIS IN THE DEMO AS WELL! IS THERE NO END TO MY PROBLEMS. OF COURSE NOT! TO ADD FURTHER PROBLEMS LAST WEEK WE BORROWED AN STE FOR A FEW HOURS SO THAT WE COULD TRY AND MAKE THE DEMO COMPATIBLE WITH THE STE, AFTER ABOUT 20 MINUTES OF TRYING WE SUCCEEDED ONLY TO FIND THAT OF ALL THINGS THE LOADER ROUTINE DIDN'T WORK ANY MORE! NOT THE FUCKING BORDERS OR THE SYNC SCROLLING BUT THE FUCKING SHITTY LITTLE LOADER!!!!! ARRRRRRGGGGGGHHHHHHH!!!!   IF I HADN'T SPENT SO LONG ON THIS DEMOI WOULD PROBABLY KICK THE LIVING SHIT OUT OF THIS COMPUTER AND ALL MY RUDDY DATA DISKS!!!        BEFORE I EXPLODE LETS WRAP!!!!!       ";
    this.scrolltext.init(this.miniScrollCan, this.font, 1);
    this.zik.changeTrack(1);
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.can3d = new codef3D(this.can, 2000, 20, 250, -100 );
      this.can3d.lines(this.dots, this.lines, new LineBasicMaterial({ color: 0xffff00, linewidth:4}));
      this.stars = new starfield3D(this.can, 500, 4, 640,400, 320, 200,'#FFFFFF', 100,0,0);
      this.stars.draw = this.dotsOnlyStarfield.bind(this.stars);
      
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik.play();
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.stars.draw();
      
      const ct = this.scrollCan.contex;
      this.miniScrollCan.clear();
      this.scrollCan.clear();
      this.scrolltext.draw(0);
      ct.globalCompositeOperation = 'source-over';
      ct.drawImage(this.miniScrollCan.canvas,0,0,64,20, 0,~~(120+120*Math.sin(this.ctrScroll+=0.023)),640,160);
      ct.globalCompositeOperation = 'source-in';
      ct.drawImage(this.degCan.canvas,0,0,1,400, 0,0,640,400);
      this.scrollCan.draw(this.can,0,0);

      this.can3d.group.rotation.x+=0.03;
      this.can3d.group.rotation.y+=0.1;
      this.can3d.group.rotation.z+=0.04;
      this.can3d.camera.scale.z = 0.375 + 0.125*Math.sin(this.ctr3d += 0.015);
      this.can3d.draw();
      
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }
  
  // Starfield drawing method modifications to draw only points (no lines)
  dotsOnlyStarfield() {
    var tmp=this.dest.contex.strokeStyle;
    var tmp2 = this.dest.contex.globalAlpha;
    var tmp3 = this.dest.contex.lineWidth;
    this.dest.contex.globalAlpha=1;
    this.dest.contex.strokeStyle=this.color;

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
        this.dest.contex.lineWidth=(1-this.star_color_ratio*this.star[i][2])*2;
        this.dest.contex.beginPath();
        this.dest.contex.moveTo(this.star[i][3]+this.offsetx,this.star[i][4]+this.offsety);
        this.dest.contex.lineTo(this.star[i][3]+this.offsetx+1,this.star[i][4]+this.offsety-1);
        this.dest.contex.stroke();
        this.dest.contex.closePath();
      }
    }
    
    this.dest.contex.strokeStyle=tmp;
    this.dest.contex.globalAlpha=tmp2;
    this.dest.contex.lineWidth=tmp3;
  }
  fromRgb7(r,g,b){
    return 'rgb(' + (r*36) + ',' + (g*36) + ',' + (b*36) + ')';
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