class MegaBalls {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    })
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
    this.translation = {x:0,y:0,z:0};
    this.rotSpeed = {x:0,y:0,z:0};

    const cube = [{ x: -80, y: -80, z: -80 }, { x: 80, y: -80, z: -80 }, { x: 80, y: 80, z: -80 }, { x: -80, y: 80, z: -80 },
      { x: -80, y: -80, z: 80 }, { x: 80, y: -80, z: 80 }, { x: 80, y: 80, z: 80 }, { x: -80, y: 80, z: 80 } ];

    // 3D Objects
    this.figures = [
      {color:0, points:[]},
      // Yellow cube
      { color: 0, points: cube
      },
      // red cross
      { color: 1, points: [
          { x: -35, y: 0, z: -35 }, { x: -35, y: 0, z: 35 }, { x: 35, y: 0, z: -35 }, { x: 35, y: 0, z: 35 },
          { x: -70, y: 0, z: -70 }, { x: -70, y: 0, z: 70 }, { x: 70, y: 0, z: -70 }, { x: 70, y: 0, z: 70 } ]
      },
      // Green circle
      { color: 2, points: this.circle(80, 'z') },
      // Big gray circle
      { color: 3, points: this.circle(200, 'y') },
      // Big shifted magenta circle
      { color: 4, points: this.circle(200, 'y') },
      // Big cyan third of circle
      { color: 5, points: this.circle(200, 'y', 2*Math.PI/3) },
      // Red cube
      { color: 1, points: cube
      },
      // Green variable size circle
      { color: 6, points: this.circle(200, 'y')},
      // Kind of ship
      { color: 7, points: [{ x:-90, y:0, z:0}, {x:-50, y:0, z:-50}, {x:-50, y:0, z:50}, {x:-70, y:-50, z:0},
          { x:90, y:0, z:0}, {x:50, y:0, z:-50}, {x:50, y:0, z:50}, {x:70, y:-50, z:0 } ]
      },
      {color: 8, points: cube}
    ];

    // 3D world parameters
    this.cameraZoom = 1.0; // 1 = max zoom
    this.perspectiveZoom = 0.93; // cameraZoom ponderation
    this.zPerspective = 0.001;  // factor for Z coordinate
    this.ballsPerspective = 1/800/this.perspectiveZoom; // ball size according to Z coord. and zoom
    this.ballColor = 6; // Current balls colors (see this.balls = ... above for colors details)

    // Animation sequences
    this.scenic = [
      {change:0, t:3},
      {change:1, effect:[this.appear, this.oscille, this.rotate1], t:2},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.rotate2, this.oscille], t:5},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.disappear, this.oscille], t:2.5},
      {change:0, t:2.5},
      {change:2, effect:[this.appear, this.oscille, this.rotate1], t:2},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.rotate2, this.oscille], t:5},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.disappear, this.oscille], t:2.5},
      {change:0, t:2.5},
      {change:3, effect:[this.appear, this.oscille, this.rotate1], t:2},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.rotate3, this.oscille], t:5},
      {effect:[this.rotate1, this.oscille], t:2.5},
      {effect:[this.rotate0, this.disappear], t:2.5},
      {change:0, t:2.5},
      {change:4, effect:[this.appear, this.rotate1, this.syncRebound], t:2},
      {effect:[this.rotate1, this.syncRebound], t:10},
      {effect:[this.disappear, this.rotate1, this.syncRebound], t:2.5},
      {change:0, t:2.5},
      {change:5, effect:[this.appear, this.rotate1, this.shiftedRebound], t:2},
      {effect:[this.rotate1, this.shiftedRebound], t:10},
      {effect:[this.disappear, this.rotate1, this.shiftedRebound], t:2.5},
      {change:0, t:2.5},
      {change:6, effect:[this.appear, this.rotate1, this.shiftedRebound], t:2},
      {effect:[this.rotate1, this.shiftedRebound], t:10},
      {effect:[this.disappear, this.rotate1, this.shiftedRebound], t:2.5},
      {change:0, t:2.5},
      {change:7, effect:[this.appear, this.oscille2, this.rotate1, this.rebound2], t:2},
      {effect:[this.rotate1, this.oscille2, this.rebound2], t:10},
      {effect:[this.disappear, this.oscille2, this.rebound2], t:2.5},
      {change:8, effect:[this.varsize, this.syncRebound, this.rotate1, this.appear], t:2},
      {effect:[this.varsize, this.rotate1, this.syncRebound], t:10},
      {effect:[this.varsize, this.rotate1, this.syncRebound, this.disappear], t:2.5},
      {change:9, effect:[this.appear, this.rotate1, this.round], t:2},
      {effect:[this.rotate1, this.round], t:2.5},
      {effect:[this.rotate4, this.round], t:5},
      {effect:[this.rotate1, this.round], t:2.5},
      {effect:[this.disappear, this.rotate1, this.round], t:2.5},
      {change:0, t:2.5},
      {change:10, effect:[this.appear, this.rotate1, this.oscille, this.varcube], t:2},
      {effect:[this.rotate1, this.oscille, this.varcube], t:2.5},
      {effect:[this.rotate2, this.oscille, this.varcube], t:5},
      {effect:[this.rotate1, this.oscille, this.varcube], t:2.5},
      {effect:[this.rotate1, this.oscille, this.varcube, this.disappear], t:2.5},
      {change:0, t:2.5},      
    ];
    this.ctrScenic = -1;
    this.ctrFrames = 0;
    this.ctrAnim = 0;
  }

  // Effects used
  // Camera zoom in
  appear(){
    this.cameraZoom += 1/150;
  }
  // Camera zoom out
  disappear(){
    this.cameraZoom -= 1/180;
  }
  // Cancels rotations
  rotate0(){
    this.rotSpeed = {x:0,y:0,z:0};
  }
  // All kinds of rotations
  rotate1(){
    this.rotSpeed = {x:0, y:-Math.PI/72, z:0};
  }
  rotate2(){
    this.rotSpeed = {x:-Math.PI/75, y:-Math.PI/75, z:0};
  }
  rotate3(){
    this.rotSpeed = {x:0, y:-Math.PI/72, z:Math.PI/60};
  }
  rotate4(){
    this.rotSpeed = {x:-Math.PI/75, y:-Math.PI/75, z:-Math.PI/75};
  }
  // x coords oscillation (2 different speeds)
  oscille(){
    this.translation.x = 120*Math.sin(this.ctrAnim * Math.PI/72);
  }
  oscille2(){
    this.translation.x = 120*Math.sin(this.ctrAnim * Math.PI/60);
  }
  // Bouncing all balls together
  syncRebound(){
    let y = 120 - 200*Math.abs(Math.sin(this.ctrAnim * Math.PI/60));
    this.figure = this.figure.map(f => {f.y = y; return f});
  }
  // Boucing balls with shifts between each one
  shiftedRebound(){
    let a = this.ctrAnim * Math.PI/60;
    this.figure = this.figure.map(f => {
      f.y = 120 - 180*Math.abs(Math.sin(a));
      a -= Math.PI/8;
      return f
    });
  }
  // Low amplitude bouncing balls
  rebound2(){
    this.translation.y = -40*Math.abs(Math.sin(this.ctrAnim * Math.PI/120));
  }
  // Circle shape with cycling expansion / collapse
  varsize(){
    this.figure = this.circle( 115 + 85*Math.cos(this.ctrAnim * Math.PI/60), 'y');
  }
  // Cube with oscillating dimensions
  varcube(){
    const sign = Math.sign;
    var s = 55 + 25*Math.cos(this.ctrAnim * Math.PI/60);
    this.figure = this.figure.map(f => ({
      x: s * sign(f.x),
      y: s * sign(f.y),
      z: s * sign(f.z),
    }));
  }
  // Circle-shaped path
  round(){
    let a = this.ctrAnim * Math.PI/72;
    this.translation = {
      x: 160*Math.sin(a),
      y: 0,
      z: 160*Math.cos(a)
    }
  }
  // Crafts a shape using 8 balls in circle
  // r : radius, axis : axis of the circle (x y or z)
  // range : part of the circle (in radians) that contains the balls
  circle(r, axis, range = 2*Math.PI){
    const result = [], pi = Math.PI;
    for(let i=pi/8; i<range; i+=range/8){
      let a = r*Math.sin(i), b = r*Math.cos(i);
      switch(axis){
        case 'x':
          result.push({x:0,y:a,z:b});
          break;
        case 'y':
          result.push({x:a,y:0,z:b});
          break;
        case 'z':
          result.push({x:a,y:b,z:0});
          break;
      }
    }
    return result;
  }
  
  // Manages animation sequences
  anime(){
    if(this.ctrFrames-- <= 0){
      this.ctrScenic++;
      if(this.ctrScenic >= this.scenic.length)
        this.ctrScenic = 0;
      this.action = this.scenic[this.ctrScenic];
      if(undefined !== this.action.change)
        this.changeFigure(this.action.change);
      this.ctrFrames = this.action.t * 60; // 60 fps
    }
    this.translation = {x:0,y:0,z:0};
    if (this.action.effect)
      this.action.effect.forEach(a => a());
    this.ctrAnim++;
  }

  // Changes the figure to display
  changeFigure(num){
    const f = this.figures[num];
    this.figure = f.points;
    this.ballColor = f.color;
    this.rotation = {x:0,y:0,z:0};
    this.rotSpeed = {x:0,y:0,z:0};
    this.cameraZoom = 0;
    this.ctrAnim = 0;
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
      this.anime();
      this.render();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  // Rotation, translation and rendering
  render(){
    const sin = Math.sin, cos = Math.cos;
    const r = this.rotation, t = this.translation;
    // Computes rotation and translation
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
      return {
        x:x2 + t.x,
        y:y2 + t.y,
        z:z2 + t.z
      };
    });
    this.rotation = {
      x: r.x + this.rotSpeed.x,
      y: r.y + this.rotSpeed.y,
      z: r.z + this.rotSpeed.z
    }
    
    // Displays the figure
    rotated.sort((a,b) => a.z - b.z);
    const zoom = this.cameraZoom * this.perspectiveZoom;
    
    // Shadows
    
    // And balls
    rotated.forEach(p => {
      const size = zoom + (p.z+100) * zoom * this.ballsPerspective;
        
      this.balls[this.ballColor].draw(
        this.can,
        320 + ~~(p.x*zoom + p.x * p.z*this.zPerspective),
        200 + ~~(p.y*zoom + p.y * p.z*this.zPerspective),
        1.0, 0, size, size
      );
    });
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
      case '+':
        this.cameraZoom += 0.01;
        console.log({zoom:this.cameraZoom});
        break;
      case '-':
        this.cameraZoom -= 0.01;
        console.log({zoom:this.cameraZoom});
        break;
    }
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
  }
}