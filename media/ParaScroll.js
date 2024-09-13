class ParaScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.tiles = this.tiles.bind(this);
    this.errance = this.errance.bind(this);
    this.big = this.big.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Red_LB.png', 'Red_Bubles.png', 'Carre_LB.png', 'Dalton_20x20.png'])).then(data => {
      [this.sprites, this.bubles, this.backLogo, this.font] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let i, col;
    this.back = new canvas(64, 1664);
    const ct = this.back.contex;
    ct.drawImage(this.backLogo.img,0,0);
    const source = ct.getImageData(0,0,64,64);
    const cible = ct.getImageData(0,0,64,64);
    "033-055-067 033-055-077 033-055-076 033-055-075 033-054-074 033-053-073 031-052-072 030-051-071 130-050-070 230-150-170 330-250-270 330-350-370 330-450-470 330-550-570 330-550-670 330-550-770 330-550-750 330-550-750 330-540-740 320-530-730 310-520-730 310-520-720 300-510-710 300-500-700 301-501-701 302-502-702"
      .split(' ').forEach((palette, numPal) => {
      const pal = palette.split('-').map((coul,idx) => coul.split('').map(k=>k*32+1+idx));
      for(i=0; i<source.data.length; i+=4){
        if(source.data[i+2] > 0){
          switch(source.data[i+2]){
            case 0x60: col=0; break;
            case 0xA0: col=1; break;
            case 0xE0: col=2; break;
          }
          cible.data[i] = pal[col][0];
          cible.data[i+1] = pal[col][1];
          cible.data[i+2] = pal[col][2];
        }
      }
      ct.putImageData(cible, 0, numPal*64);
    });
    this.ctr = 0;
    
    this.sprites.initTile(32,26);
    this.font.initTile(20,20,32);
    this.scrollCan = new canvas(32,20);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "AAAAAAHHHHHHHH";
    this.scrolltext.init(this.scrollCan, this.font, 1);
    this.paused = false; // TODO : remove
    this.done = false; // TODO : remove
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.oImageSmoothingEnabled = false;
      this.ctx.webkitImageSmoothingEnabled = false;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused){
        this.tiles();
        this.errance();
        this.big();
        this.ctr += 0.006;
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  tiles(){
    let x,y;
    let xpos = -~~(640 + 320*Math.sin(this.ctr*2.36+5.654) + 320*Math.sin(this.ctr*1.45+0.84)) % 64;
    let ypos = -~~(632 + 632*Math.sin(this.ctr*1.62+3.02)*Math.sin(this.ctr*2.45+1.5));
    for(x=xpos; x<640+64; x+=64)
      this.ctx.drawImage(this.back.canvas, x, ypos);
    
    xpos = -~~(640 + 320*Math.sin(this.ctr*1.36+0.568) + 320*Math.sin(this.ctr*1.38+0.686)) % 64;
    ypos = -~~(632 + 632*Math.sin(this.ctr*2.357+1.0574)*Math.sin(this.ctr*1.4587+2.75)) % 64;
    for(y=ypos; y<400+64; y+=64)
      for(x=xpos; x<640+64; x+=64)
        this.ctx.drawImage(this.bubles.img, x, y);
  }
  
  errance(){
    for(let i=7,a=this.ctr; i>=0; i--,a+=0.035)
      this.sprites.drawTile(
        this.can, i,
        ~~(304 + 152*Math.sin(a*5.273+0.56) + 152*Math.sin(a*7.5698+0.984)),
        ~~(186 + 93*Math.sin(a*4.579+1.0546) + 93*Math.sin(a*6.124+2.5486))
      );
  }
  
  big(){
    const pal = "303,404,505,607".split(',').map(coul=>coul.split('').map(k=>k*32));
    const pixels = this.ctx.getImageData(0,0,640,400);
    const {data} = pixels;
    for(let i=data.length/2; i<data.length; i+=4){
      let couleur = (data[i]<<16) | (data[i+1]<<8) | data[i+2];
      let idx=-1;
      switch(couleur){
        case 0x400000:
          idx=0; break;
        case 0x600000:
          idx=1; break;
        case 0x800000:
          idx=2; break;
        case 0xC00000:
        case 0xE00000:
          idx=3; break;
        default:
          idx=(data[i] & 7) -1;
      }
      if(idx>=0){
        data[i] = pal[idx][0];
        data[i+1] = pal[idx][1];
        data[i+2] = pal[idx][2];
      }
    }
    this.ctx.putImageData(pixels,0,0);
//    const ct = this.scrollCan.contex;
//    this.scrollCan.clear();
//    ct.globalCompositeOperation = 'source-over';
//    this.scrolltext.draw(0);
//    ct.globalCompositeOperation = 'source-atop';
//    ct.fillStyle = "#F0F";
//    ct.fillRect(0,0,32,20);
//    this.ctx.globalCompositeOperation = 'color';
//    this.ctx.drawImage(this.scrollCan.canvas, 0,0,32,20, 0,0,640,320);
//    this.ctx.globalCompositeOperation = 'source-over';

//    ct.fillStyle = "#F0F";
//    ct.fillRect(0,0,32,20);
//    this.ctx.globalAlpha = 0.5;
//    this.ctx.drawImage(this.scrollCan.canvas, 0,0,32,20, 0,0,640,320);
//    this.ctx.globalAlpha = 1.0;
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
    if (event.key === 'p') {
      this.paused = ! this.paused;
    }
  }
}