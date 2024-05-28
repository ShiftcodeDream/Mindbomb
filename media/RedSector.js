class RedSector {
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
    return Promise.all(this.demoManager.loadResource(['AllBalls.png', 'text.png', 'shapes-data.js'])).then(data => {
      [this.allballs, this.text, this.script] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let im;
    this.text.initTile(640,14);
    this.ctrTxt = 0;
    this.zoomFactor = 0.35;
    this.rotation = true;
    
    // Colorize balls
    this.balls = [];
    "300,400,500,600,700/033,044,055,066,077/333,444,555,666,777/302,403,504,605,706/230,340,450,560,670/311,412,513,614,715/320,321,522,623,724/230,330,431,532,733/230,340,440,541,651/030,040,050,060,070/320,430,540,650,760/013,014,015,026,027/023,034,045,056,067/522,533,644,755,766/130,240,350,460,570"
    .split('/').forEach(p => {
      let pal = p.split(',').map(m => m.split('').map(c => c*36));
      let y=0;
      // For each ball size
      [12,16,20,24,28,32,54].forEach(s => {
        let tmp = new canvas(s,s);
        tmp.contex.drawImage(this.allballs.img, 0,y,s,s, 0,0,s,s);
        let points = tmp.contex.getImageData(0,0,s,s);
        let pix = points.data;
        for(let i=0; i<pix.length; i+=4){
          if(pix[i+3]){
            let indx = (pix[i]>>5)-3; // new pixel color according to red value
            let color = pal[indx];
            pix[i] = color[0];
            pix[i+1] = color[1];
            pix[i+2] = color[2];
          }
        }
        tmp.contex.putImageData(points, 0,0);
        im = new image(tmp.canvas.toDataURL('image/png'));
        im.img.width = s;
        im.img.height = s;
        this.balls.push(im);
        y += s;
      });
      this.balls.push(im);
    });
    // And finally the checked
    let tmp = new canvas(54,54);
    tmp.contex.drawImage(this.allballs.img, 0,186,54,54, 0,0,54,54);
    this.balls.push(new image(tmp.canvas.toDataURL('image/png')));
    
    // Shapes repository
    this.shapeManager = new ShapeManager();
    this.listShapes = this.shapeManager.getNames();
    this.ctrShapes = -1; // TODO : -1
    
    this.playground = new canvas(640,386);
    this.the3d = new codef3D(this.playground, 600+850, 40, 1, 1600 );
    this.nextShape();
    
    // Translation and rotation speed
    this.trSpeed = {x:0,y:0,z:0};
    this.rtSpeed = {x:0,y:0,z:0};
    this.anim = [];
    this.pos = [0,0,850];
    // Action table
    // shape: shape name to load
    // pos: starting position
    // initRot: initial rotation 
    // rot: rotation speed
    // tr: translation speed
    // anim: table of animation effect classes to call
    // frames: duration in number of frames. ST demo ran at 25 fps, wereas web navigator runs at 60 fps, so number of frames have to be multiplied by 2.4 to keep the same timing
    // text: text indice to display
    // init: function to call at the beginning of the effect
    // Missing property means "no change" for this property
    this.actions = [
      // SQUARE
      {shape:'square', pos:[0,320,850], initRot:[30,30,30], rot:[3,3,3], tr:[0,-3,0], anim:[], frames:45, text:0},
      {pos:[0,0,850], tr:[0,0,0], frames:75},
      // RIPP_IN + RIPPLE
      {anim:['Sinus2D()','yRotate()'], frames:80},
      {init:()=>{this.anim[1].incr=-0.025}, frames:40},
      {init:()=>{this.anim.pop()}, frames:120},
      // MERGE
      {anim:["morphingTo(this.the3d, this.shapeManager.getCopyOf('sphere'), 45*2.4)"], frames:45, rot:[4,4,4], init:()=>{
        const prog = this.the3d.group.children[9].material.program;
        this.the3d.group.children.forEach(c => c.material.program = prog);
      }},
      {anim:[], rot:[3,3,3], frames:120},
      {anim:['yRotate()'], frames:240},
      {init:() => {this.anim.push(new morphingTo(this.the3d, this.shapeManager.getCopyOf('tube'), 45*2.4))}, frames:45},
      {init:() => {this.anim.pop()}, frames:120},
      // TUBE
      {shape:'tube', frames:60},
      {init:() => {this.anim[0].incr = -0.025}, frames:80},
      {anim:["morphingTo(this.the3d, this.shapeManager.getCopyOf('square'), 60*2.4)"], frames:60},
      {anim:[], frames:50},
      {tr:[0,3,0], frames:50},
      // HELI
      {shape:'heli', anim:['rotors()'], pos:[0,320,850], initRot:[180,0,0], tr:[0,-3,0], rot:[0,0,0], frames:45},
      {tr:[0,0,0], frames:60},
      {rot:[0,-3,0], frames:90},
      {rot:[1,0,1], frames:20},
      {init:()=>{this.anim.push(new yRotate())}, rot:[0,Math.PI,0], frames:240},
      {rot:[Math.PI,Math.PI,0], frames:220},
      {init:()=>{this.anim.pop()}, rot:[0,0,0], frames:20},
      {tr:[0,3,0], frames:45},
      // ANIMAL
      {shape:'animal', pos:[0,320,850], initRot:[180,90,0], tr:[0,-3,0], rot:[4,4,0], anim:[], frames:45},
      {tr:[0,0,0], rot:[0,3,0], frames:180},
      {rot:[3,3,3], frames:120},
      {tr:[0,-1.25,0], frames:120},
      {shape:'bubs', pos:[0,-320,850], rot:[0,5,0], tr:[0,1.5,0], frames:240},
      // MAN
      {shape:'man', pos:[0,320,850], rot:[0,4,0], tr:[0,-3,0], frames:45},
      {tr:[0,0,0], rot:[2,4,2], frames:360},
      {tr:[0,3,0], frames:45},
      // WOMAN
      {shape:'woman', pos:[0,320,850], rot:[-2,4,-2], tr:[0,-3,0], frames:45},
      {tr:[0,0,0], rot:[0,4,2], frames:360},
      {tr:[0,-3,0], rot:[3,4,3], frames:45},
      {init:()=>{this.changeShape('tardi',1)}, pos:[0,0,850], initRot:[0,0,0], rot:[0,3,0], tr:[0,0,0], frames:20},
      {init:()=>{this.changeShape('tardi',5)}, frames:10},
      {init:()=>{this.changeShape('tardi',13)}, frames:10},
      {init:()=>{this.changeShape('tardi',21)}, frames:10},
      {init:()=>{this.changeShape('tardi',29)}, frames:10},
      {init:()=>{this.changeShape('tardi',37)}, frames:10},
      {init:()=>{this.changeShape('tardi',45)}, frames:10},
      // TARDI
      {shape:'tardi', frames:180},
      {rot:[-3,3,0], anim:['yRotate()'], frames:240},
      {tr:[0,-2,0], frames:120},
    ];
    this.ctrAction = -1;
    this.nextAction();
    
    this.running = true;
    this.paused = false;
  }
  
  nextAction(){
    this.ctrAction++;
    if(this.ctrAction >= this.actions.length)
      this.ctrAction = 0;
    const toRad = Math.PI/180; // degree to radians
    const toRadSpeed = toRad/2.4; // 25 to 60 fps for rotation speed
    
    const t = this.actions[this.ctrAction];
    this.ctrFrames = t.frames*2.4;  // 25 fps -> 60 fps
    if(t.shape !== undefined)  this.changeShape(t.shape);
    if(t.pos !== undefined)    this.the3d.group.position = {x:t.pos[0], y:t.pos[1], z:t.pos[2]};
    if(t.initRot !== undefined) this.the3d.group.rotation = {x:t.initRot[0]*toRad, y:t.initRot[1]*toRad, z:t.initRot[2]*toRad};
    if(t.rot !== undefined)    this.rtSpeed = {x:t.rot[0]*toRadSpeed, y:t.rot[1]*toRadSpeed, z:t.rot[2]*toRadSpeed};
    if(t.tr !== undefined)     this.trSpeed = {x:t.tr[0], y:t.tr[1], z:t.tr[2]};
    if(t.anim)  this.anim = t.anim.map(cl => eval('new ' + cl ));
    if(t.text !== undefined)   this.ctrTxt = t.text;
    if(t.init !== undefined)  t.init();
  }
  mainEffect(){
    // 3D
    this.playground.clear();
//    if(this.shape.animate())
//      this.refreshShape();
    this.the3d.draw();
    this.playground.draw(this.can,0,14);
    
    this.ctrFrames--;
    if(this.ctrFrames == 0)
      this.nextAction();
    else{
      this.the3d.group.rotation.x += this.rtSpeed.x;
      this.the3d.group.rotation.y += this.rtSpeed.y;
      this.the3d.group.rotation.z += this.rtSpeed.z;
      this.the3d.group.position.x += this.trSpeed.x;
      this.the3d.group.position.y += this.trSpeed.y;
      this.the3d.group.position.z += this.trSpeed.z;
      if(this.anim.length)
        this.anim.forEach(a => a.run(this.the3d));
    }
  }  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 480, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if(this.running) {
      if(!this.paused){
        this.can.clear();
        this.blueLines();
        this.mainEffect();
        this.text.drawTile(this.can,this.ctrTxt,0,0);
        this.reflection();

        // TODO : delete
        this.ctx.font = 'bold 12px serif';
        this.ctx.fillStyle = "#FFF";
        this.ctx.textBaseline = 'top';
        for(let f=0;f<this.balls.length;f+=8){
          this.balls[f].draw(this.can,0,f*2);
          this.ctx.fillText(f,16,f*2)
        }
        this.ctx.font = 'bold 24px serif';
        this.ctx.fillText('Text: ' + this.ctrTxt,0,300);
        this.ctx.fillText(this.ctrFrames,0,326);
        // end delete
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }
  blueLines(){
    // Horizontal lines
    this.ctx.fillStyle="#004";
    this.ctx.fillRect(0,382,640,18);
    this.ctx.fillStyle="#002";
    this.ctx.fillRect(0,378,640,4);
    this.ctx.fillRect(0,386,640,2);
    this.ctx.fillStyle="#000058";
    this.ctx.fillRect(0,394,640,2);
  }
  reflection(){
    // Reflection
    this.ctx.fillStyle = "#00007A";
    this.ctx.fillRect(0,400,640,80);
    this.ctx.save();
    this.ctx.scale(1,-1);
    this.ctx.drawImage(this.playground.canvas, 0,384,640,-240, 0,-480,640,80);
    this.ctx.restore();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    this.ctx.fillRect(0,400,640,80);
  }
  // TODO : delete
  nextShape(){
    this.ctrShapes++;
    if(this.ctrShapes >= this.listShapes.length)
      this.ctrShapes = 0;
    this.changeShape(this.listShapes[this.ctrShapes]);
  }
  changeShape(name, filterDots=0){
    this.shape = this.shapeManager.getCopyOf(name);
    if(filterDots){
      this.shape.p = this.shape.p.filter((p,i) => (i<filterDots));
    }
    this.refreshShape();
  }
  refreshShape(){
    const saveRotation = Object.assign({}, this.the3d.group.rotation);
    const savePosition = Object.assign({}, this.the3d.group.position);
    this.the3d.scene.remove(this.the3d.group);
    this.the3d.group = new THREE.Object3D();
    this.the3d.group.scale.x = this.the3d.group.scale.y = this.the3d.group.scale.z = this.zoomFactor;
    this.the3d.group.rotation = saveRotation;
    this.the3d.group.position = savePosition;
    this.the3d.scene.add(this.the3d.group);
    this.the3d.vectorball_img(this.shape.p, this.balls );    
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
    if (event.key === 'n') {
      this.nextShape();
    }
    // TODO : delete
    if (event.key === 'p') {
      this.paused = !this.paused;
    }
    if (event.key === 'l') {
      console.log(this.the3d);
    }
  }
}

// Animation classes
class Sinus2D{
  constructor(){
    this.ctr = 0;
    this.ctrAmp = 0;
    this.run = this.run.bind(this);
  }
  run(three){
    let a = this.ctr, b, i=0;
    for(let y=0; y<8; y++){
      b = a;
      for(let x=0; x<8; x++){
        three.group.children[i++].position.z = 200*Math.sin(this.ctrAmp)*Math.cos(b);
        b += Math.PI/10;
      }
      a += Math.PI/10;
    }
    this.ctr += Math.PI/55;
    this.ctrAmp += Math.PI/60;
    three.group.position.needsUpdate = true;
  }
}

class morphingTo{
  constructor(three, toShape, nbFrames){
    const fromShape = three.group.children;
    this.steps = fromShape.map((p,i) => ({
      x: (toShape.points[i].x - p.position.x) / nbFrames,
      y: (toShape.points[i].y - p.position.y) / nbFrames,
      z: (toShape.points[i].z - p.position.z) / nbFrames,
    }));
    this.run = this.run.bind(this);
  }
  run(three){
    three.group.children.forEach((c,i) => {
      const p = c.position;
      c.position = {
        x: p.x + this.steps[i].x,
        y: p.y + this.steps[i].y,
        z: p.z + this.steps[i].z,
      };
    });
    three.group.position.needsUpdate = true;    
  }
}

class yRotate{
  constructor(){
    this.ctr = 0;
    this.ratio = 0;
    this.incr = 0.025;
    this.run = this.run.bind(this);
  }
  run(three){
    three.group.position = {
      x: this.ratio*100*Math.cos(this.ctr),
      y: 0,
      z: 850 + this.ratio*100*Math.sin(this.ctr)
    };
    this.ctr += Math.PI/144;
    if(this.incr>0){
      this.ratio += this.incr;
      if(this.ratio >= 1)
        this.incr = 0;
    }else if(this.incr<0){
      this.ratio += this.incr;
      if(this.ratio <= 0)
        this.incr = 0;
    }
  }
}

class rotors{
  constructor(){
    this.ctr = 0;
    this.run = this.run.bind(this);
  }
  run(three){
    const shape = three.group.children;
    [80,150,210,160].forEach((radius, i) => {
      let x = ~~(radius*Math.sin(this.ctr));
      let z = ~~(radius*Math.cos(this.ctr));
      shape[i*2].position.x = x;
      shape[i*2].position.z = z-100;
      shape[i*2+1].position.x = -x;
      shape[i*2+1].position.z = -z-100;
    });
    three.group.position.needsUpdate = true;        
    this.ctr += 0.08;
  }
}
