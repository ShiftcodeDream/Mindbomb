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
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['SinBacks.png'])).then(data => {
      [this.backs] = data;
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
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused){
        this.can.clear();
        this.ctx.drawImage(this.backs.img, 0,0,1,200, 0,200,640,200);
        this.drawDots();
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
    clearInterval(this.interval);
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