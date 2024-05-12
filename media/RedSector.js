class RedSector {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
    this.nextShape = this.nextShape.bind(this);
    this.refreshShape = this.refreshShape.bind(this);
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
  // For each balls palets
  init() {
    let im;
    this.text.initTile(640,14);
    this.ctrTxt = 0;
    this.zoomFactor = 0.35;
    this.rotation = true;
    
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
    
    this.shapeManager = new ShapeManager();
    this.listShapes = this.shapeManager.getNames();
    this.ctrShapes = 5; // TODO : -1
    
    this.playground = new canvas(640,386);
    this.the3d = new codef3D(this.playground, 600, 40, 1, 1600 );
    this.nextShape();
    
    this.running = true;
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
    if (this.running) {
      this.can.clear();
      
      // Horizontal lines
      this.ctx.fillStyle="#004";
      this.ctx.fillRect(0,382,640,18);
      this.ctx.fillStyle="#002";
      this.ctx.fillRect(0,378,640,4);
      this.ctx.fillRect(0,386,640,2);
      this.ctx.fillStyle="#000058";
      this.ctx.fillRect(0,394,640,2);
      
      // 3D
      this.playground.clear();
      this.the3d.draw();
      this.playground.draw(this.can,0,14);
      this.text.drawTile(this.can,this.ctrTxt,0,0);

      if(this.rotation){
        this.the3d.group.rotation.x+=0.01;
        this.the3d.group.rotation.y+=0.02;
        this.the3d.group.rotation.z+=0.04;
      }
      
      // Reflection
      this.ctx.fillStyle = "#00007A";
      this.ctx.fillRect(0,400,640,80);
      this.ctx.save();
      this.ctx.scale(1,-1);
      this.ctx.drawImage(this.playground.canvas, 0,384,640,-240, 0,-480,640,80);
      this.ctx.restore();
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
      this.ctx.fillRect(0,400,640,80);

      // TODO : delete
      this.ctx.font = 'bold 12px serif';
      this.ctx.fillStyle = "#FFF";
      this.ctx.textBaseline = 'top';
      for(let f=0;f<this.balls.length;f+=8){
        this.balls[f].draw(this.can,0,f*2);
        this.ctx.fillText(f,16,f*2)
      }
      // end delete
      
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }
  nextShape(){
    this.ctrShapes++;
    if(this.ctrShapes >= this.listShapes.length)
      this.ctrShapes = 0;
    const shapeName = this.listShapes[this.ctrShapes];
    console.log("Shape: " + shapeName);
    this.currentShape = this.shapeManager.getCopyOf(shapeName);
    console.log(this.currentShape);
    this.refreshShape();
  }
  refreshShape(){
    this.the3d.scene.remove(this.the3d.group);
    this.the3d.group = new THREE.Object3D();
    this.the3d.group.scale.x = this.the3d.group.scale.y = this.the3d.group.scale.z = this.zoomFactor;    
    this.the3d.scene.add(this.the3d.group);
    this.the3d.vectorball_img(this.currentShape.p, this.balls );    
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
    if (event.key === 'x') {
      this.currentShape.p[0].img = 57;
      this.refreshShape();
    }
    if (event.key === 'p') {
      this.rotation = !this.rotation;
    }
  }
}