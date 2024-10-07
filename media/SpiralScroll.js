class SpiralScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.redScroll = this.redScroll.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Hellfire_64x64_46.png', 'CyclicRaster.png', 'OnePlan_32x32.png'])).then(data => {
      [this.hell, this.raster, this.font] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.font.initTile(32,32,32);
    const text = "THIS DEMO IS DEDICATED TO ALL OUR FRIENDS. THANKS> @ RULE ST>";
    this.scrollCan = new canvas(64, text.length*64);
    
    // Change Hellfire font palet
    let tmpCan = new canvas(640,320);
    this.hell.draw(tmpCan,0,0);
    let pixData = tmpCan.contex.getImageData(0,0,640,320);
    let d = pixData.data;
    for(let i=0; i<d.length; i+=4){
      switch(d[i]){
        case 0xE0:
          d[i]   = 0xC0;
          d[i+1] = 0x40;
          d[i+2] = 0x40;
          break;
        case 0xC0:
          if(d[i+1] == 0x80){
            d[i]   = 0xE0;
            d[i+1] = 0x60;
            d[i+2] = 0x60;
          } else {
            d[i]   = 0xA0;
            d[i+1] = 0x20;
            d[i+2] = 0x20;
          }
          break;
        case 0xA0:
          d[i]   = 0x80;
          d[i+1] = 0;
          d[i+2] = 0;
          break;
        case 0x80:
          d[i]   = 0x60;
          d[i+1] = 0;
          d[i+2] = 0;
          break;
        case 0x60:
          d[i]   = 0x40;
          d[i+1] = 0;
          d[i+2] = 0;
          break;
        case 0: // Transparent
          d[i+3] = 0;
      }
    }
    tmpCan.clear();
    tmpCan.contex.putImageData(pixData,0,0);
    this.hell = new image(tmpCan.canvas.toDataURL('image/png'));
    let me = this;
    this.hell.img.onload = () => {
      this.hell.initTile(64,64,46);
      text.split('').forEach((letter,i) => this.hell.print(this.scrollCan, letter, 0, i*64));
    }
    this.midScroll = (text.length*64 - 400)/2;
    this.scrollCtr = 0;
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.redScroll();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  redScroll(){
    let y = this.midScroll + this.midScroll*Math.sin(this.scrollCtr += 0.005);
    this.scrollCan.draw(this.can, 0, ~~-y);
    this.scrollCan.draw(this.can, 576, ~~-y);
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