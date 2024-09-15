class LandScroll {
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
    return Promise.all(this.demoManager.loadResource(['LandscrollSprites.png','LandscrollBack.png', ])).then(data => {
      [this.sprites, this.backs] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(768, 540, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.ctx.drawImage(this.backs.img,0,0,1,200, 0,260,768,200);
      this.ctx.fillStyle = "#0000C0";
      this.ctx.fillRect(0,460,768,80);
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
  
  gone(){
    timer++;
    mycanvas.fill('#000000');
    scrollcanvas.fill('#000000');

    //draw 20 tiny scrollers in a canvas
    for(let i=0;i<20;i++)
      myscrolltext.draw(i*10);

    //draw the scroller canvas out on the main canvas
    for(let i=0;i<160;i++)
      scrollcanvas.drawPart(mycanvas,
                            -i*7, 200+i,
                            (300*Math.sin(timer*.001)+300)%10, i/4,
                            320, 1,
                            1, 0,
                            i/9+4, 1);

    requestAnimFrame(gone);
  }  
}