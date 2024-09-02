class MegaBalls {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.do3d = this.do3d.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Hellfire_64x64_46.png', 'MegaBalls.png', 'MegaBallsBack.png'])).then(data => {
      [this.font, this.ballImg, this.back] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.font.initTile(64,64,46);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "OH GOD ANOTHER SCREEN AND ANOTHER FLAMING SCROLLINE.  SO WHAT DO YOU THINK OF MY THREE DIMENSIONAL SPRITES THEN?? I ACTUALLY FIRST WROTE SOME THREE D SPRITE ROUTINES IN APRIL LAST YEAR. THAT WAS  JUST AFTER DEF DEMO WAS RELEASED. I THOUGHT UP THE ALGORITHM ON THE BUS HOME FROM COLLEGE AFTER HAVING A LESSON ON DOUBLE ANGLE IDENTITIES.  THAT IS THE FIRST TIME I EVER LEARNED ANYTHING INTERESTING IN MATHS... ANYWAY NOW SIX MONTHS AND MANY REWRITES LATER THEY HAVE METAMORPHOSED INTO THESE ROUTINES. THE NICE SMOOTH COLOR CHANGE IDEA COMES FROM A GAME CALLED DUGGER. IT SEEMS TO WORK REALLY WELL ON MY MONITOR...  THIS SCREEN CHEATS  IN SOME WAYS IN ORDER TO OBTAIN ITS SPEED. THE WAVES ARE ALL WORKED BEFORE THEY ARE PLOTTED. THE GAP BETWEEN THE END OF ONE WAVE AND THE NEXT IS THE TIME TAKEN TO RECALCULATE THE POINTS. THE ROUTINE IS QUITE COMPLICATED NOW AND ALLOWS A LARGE AMOUNT OF CONTROL OVER THE SPRITES. THE EIGHT SPRITES CAN BE ARRANGED IN ANY FORM. THEY CAN THEN BE BOUNCED OR SPUN OR WOBBLED AND FADED IN AND OUT .   THE POSITIONS OF THE SHADOWS ARE WORKED OUT PREVIOUSLY AS WELL BUT THE SHADOWS THEMSELVES  ARE ACTUALLY NOTTED SPRITE MASKS.. IF YOU PROGRAM YOU WILL KNOW WHAT I MEAN.  ALL THE CODING AND THE GRAPHIX FOR THE SPRITE IN THIS SCREEN WAS DONE BY MANIKIN  IN ABOUT ONE WEEK DURING OCTOBER. AND THEN IN TYPICAL LOST BOYS FASHION IN MARCH NINETEEN NINETY I DECIDED AT ALMOST THE LAST MINUTE TO RE WRITE THE SCREEN WITH A FASTER SPRITE ROUTINE AND STARS.  ENCOURAGEMENT AND MORAL SUPPORT FROM IAN.. IE..  THATS FUCKING GOOD THAT IS TIM ...  THE FONT WAS DRAWN BY SPAZ AND THE SUPERB MUSIC IS BY CHRISPY NOODLE OF OUR GOOD FRIENDS BBC....  ADDITIONAL INFORMATION WAS OBTAINED FROM  THREE D GRAPHICS PROGRAMMING BY ABACUS  THIS IS NOW MY SIXTH SCREEN TOWARDS MIND BOMB AND I REALLY DO NOT KNOW WHAT I AM GOING TO DO NEXT STILL YOU WILL PROBABLY KNOW BY NOW SO I HOPE YOU LIKE IT...    MANY THANKS TO THE ENORMOUS AMOUNT OF PEOPLE WE SAW AT THE PC SHOW IN SEPTEMBER.  IT REALLY MADE US FEEL GOOD.  IF YOU HAPPENED TO BE AROUND OUR STAND YOU WOULD HAVE SEEN JUST ABOUT EVERY SINGLE GREAT PROGRAMMER ON THE ST.  WE EVEN HAD A VISIT FROM ES OF TEX ON THE WEDNESDAY. PLUS RICHARD KARSMAKERS AND STEFAN POSTHUMA OF ST NEWS. JOHN PHILLIPS AUTHOR OF NEBULUS. MEMBERS OF THE BULLFROG TEAM. ROB POVEY WHO WROTE QUARTET FOR MICRODEAL AND ALL SORTS OF OTHER PEOPLE. WE HAD AN ABSOLUTELY FABULOUS WEEK AND ALL OF US HAD JOB OFFERS FROM VARIOUS PEOPLE. SPAZ AND SAMMY JOE NOW WORK AS TRANSLATORS FOR GFA SYSTEM TECHNIK. SPAZ HAS A GRAPHICS ARTIST JOB. WE WERE ALSO OFFERED JOBS BY AMONGST OTHER HEWSON AND BEST OF ALL  FROM THE MEGA MIGHTY THALION SOFTWARE HOME OF THE DEMO WORLDS FINEST PROGRAMMERS. TEX. TNT CREW. LEVEL SIXTEEN. THE CAREBEARS ETC  THIS WAS JUST TO GOOD TO SAY NO TO SO I AM PROBABLY GOING TO WORK THERE NEXT SUMMER IN GUETERSLOH. JUST WAIT UNTIL YOU SEE SOME  OF THALIONS GAMES. THEY ARE ABSOLUTELY FANTASTIC. THEY WILL BE THE BEST GAMES PRODUCERS ON THE ST INSIDE A YEAR. THAT I TRULY BELIEVE . WELL I THINK THAT IS QUITE ENOUGH FOR ONE SCROLLINE. SO LETS WWWWWWWRRRRRRRAAAAAAAPPPPPPP....................                  ";
    this.running = true;
    
    // Colorize balls
    const tmpcan = new canvas(64,62);
    const tmpctx = tmpcan.contex;
    this.ballImg.draw(tmpcan,0,0);
    const source = tmpctx.getImageData(0,0,64,62);
    
    // 0=yellow 1=red 2=green 3=gray 4=magenta 5=cyan 6=olive 7=mauve 8=emerald 9=turquoise
    this.balls = "330.440.550.660.770 300.400.500.600.700 020.030.040.050.060 222.333.444.555.666 303.404.505.606.707 033.044.055.066.077 020.130.240.350.460 212.323.434.545.656 021.032.043.054.065".split(' ').map(colors => {
      let palet = colors.split('.').map(color => (color.split('').map(k=>k*32)));
      let cible = tmpctx.createImageData(64,62);
      for(let i=0; i<source.data.length; i+=4){
        let index=-1;
        switch(source.data[i+2]){
          case  96: index=0; break;
          case 128: index=1; break;
          case 160: index=2; break;
          case 192: index=3; break;
          case 224: index=4; break;
        }
        if(index>=0){
          cible.data[i]   = palet[index][0];
          cible.data[i+1] = palet[index][1];
          cible.data[i+2] = palet[index][2];
        } else {
          cible.data[i]   = source.data[i];
          cible.data[i+1] = source.data[i+1];
          cible.data[i+2] = source.data[i+2];
        }
        cible.data[i+3] = source.data[i+3];
      }
      tmpctx.putImageData(cible,0,0);
      const result = new image(tmpcan.canvas.toDataURL('image/png'));
      result.sethandle(32, 31);
      result.midhandled = true;
      return result;
    });
    
    this.rotation = {x:0,y:0,z:0};
    this.rotSpeed = {x:0,y:0,z:0};
    this.rotSpeed = {x:Math.PI/200,y:Math.PI/210,z:Math.PI/180};
    // Cube
    this.figure = [
      {x:-100, y:-100, z:-100, c:5},
      {x:100, y:-100, z:-100, c:5},
      {x:100, y:100, z:-100, c:5},
      {x:-100, y:100, z:-100, c:5},
      
      {x:-100, y:-100, z:0, c:6},
      {x:100, y:-100, z:0, c:6},
      {x:100, y:100, z:0, c:6},
      {x:-100, y:100, z:0, c:6},
      
      {x:-100, y:-100, z:100, c:7},
      {x:100, y:-100, z:100, c:7},
      {x:100, y:100, z:100, c:7},
      {x:-100, y:100, z:100, c:7}
    ];
    // 3D world parameters
    this.cameraZoom = 1.0; // 1 = max zoom
    this.perspectiveZoom = 0.88; // cameraZoom ponderation
    this.zPerspective = 0.002;  // factor for Z coordinate
    this.ballsPerspective = 1/200/this.perspectiveZoom; // ball size according to Z coord. and zoom
    this.ballColor = 6; // Current balls colors (see this.balls = ... for colors details)
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.scrolltext.init(this.can, this.font, 12);
      this.starfield = new starfield3D(this.can, 400, 3, 640, 156, 320, 0, '#fff', 100, 0,64);
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.starfield.draw();
      this.ctx.drawImage(this.back.img, 0,0,1,180, 0,220,640,180);
      this.scrolltext.draw(0);
      this.do3d();
      
      this.balls.forEach((b,i) => b.draw(this.can, i*64+32,366));
      
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  do3d(){
    const sin = Math.sin, cos = Math.cos;
    const r = this.rotation;
    // Computes the rotation
    let rotated = this.figure.map(p => {
      let x0,x1,x2,y0,y1,y2,z0,z1,z2;
      // x axis
      x0 = p.x;
      y0 = p.y*cos(r.x) + p.z*sin(r.x);
      z0 = p.z*cos(r.x) - p.y*sin(r.x);
      // y axis
      x1 = x0*cos(r.y) - z0*sin(r.y);
      y1 = y0;
      z1 = z0*cos(r.y) + x0*sin(r.y);
      // z axis
      x2 = x1*cos(r.z) + y1*sin(r.z);
      y2 = y1*cos(r.z) - x1*sin(r.z);
      z2 = z1;
      return {x:x2, y:y2, z:z2, c:p.c};
    });
    this.rotation = {
      x: r.x + this.rotSpeed.x,
      y: r.y + this.rotSpeed.y,
      z: r.z + this.rotSpeed.z
    }
    
    // Displays the figure
    rotated.sort((a,b) => a.z - b.z);
    
    
    const zoom = this.cameraZoom * this.perspectiveZoom;
    rotated.forEach(p => {
      const size = (p.z+100) * zoom * this.ballsPerspective;
        
      this.balls[p.c].draw(
        this.can,
        320 + ~~(p.x*zoom + p.x * p.z*this.zPerspective),
        200 + ~~(p.y*zoom + p.y * p.z*this.zPerspective),
        1.0, 0, size, size
      );
    })
    
    // Shadow
    
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