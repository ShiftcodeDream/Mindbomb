class ParaScroll {
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
    return Promise.all(this.demoManager.loadResource(['Red_LB.png', 'Red_Bubles.png', 'Carre_LB.png', 'Dalton_20x20.png'])).then(data => {
      [this.sprites, this.bubles, this.backLogo, this.font] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let i, col;
    this.back = new canvas(64, 640); // TODO : adjust height
    const ct = this.back.contex;
    ct.drawImage(this.backLogo.img,0,0);
    const source = ct.getImageData(0,0,64,64);
    const cible = ct.getImageData(0,0,64,64);
    "033-055-067 033-055-077 033-055-076"
    .split(' ').forEach((palette, numPal) => {
      const pal = palette.split('-').map(coul => coul.split('').map(k=>k*32));
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
      this.back.draw(this.can,0,0);
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