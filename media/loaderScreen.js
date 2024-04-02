class loaderScreen {
  constructor(){
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.exitRequested = this.exitRequested.bind(this);
    this.end = this.end.bind(this);
  }
  
  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load(){
    return Promise.all(loadResource(['loading-tile.png','loading_32x16.png']))
      .then(data => [this.tile, this.font] = data);
  }
  
  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init(descriptions = []){
    this.offCan = new canvas(640,400);
    const off = this.offCan.contex;
    off.fillStyle = this.ctx.createPattern(this.tile.src, 'repeat');
    off.fillRect(0,16,640,372);
    
    this.font.initTile(32,16,32);
    let x,y=64;
    descriptions.forEach(text => {
      if(text.length){
        x = 320 - Math.floor(text.length/2)*32;
        this.font.print(this.offCan, text, x, y);
      }
      y += 24;
    })
    this.displayedHeight = 2;
    
    this.loadingDone = false;
    this.timeoutOrSpace = false;
    this.timeouts = [];
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start(){
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640,400,"main");
      this.can.clear();
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      
      this.running = true;
      const me = this;
      this.timeouts.push(setTimeout(()=>{
        me.timeoutOrSpace = true;
        this.exitRequested();
      }, 3000));
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    if(!this.running){
      this.end();
      return;
    }
    this.offCan.drawPart(this.can, 0, 0, 0, 0, 640, this.displayedHeight);
    window.requestAnimFrame(this.currentMain);
  }
  
  // Exit the demo only when next screen is loaded
  exitRequested(){
    if(this.loadingDone && this.timeoutOrSpace)
      this.running = false;
  }
  
  onKeyPressed(event){
    if(event.key === ' '){
      this.timeoutOrSpace = true;
      this.exitRequested();
    }
  }
  
  end(){
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.timeouts.forEach(t => clearTimeout(t));
    this.endCallback();
  }
  
  // Called when all the next demo resources have been loaded
  loadDone(){
    this.loadingDone = true;
    this.exitRequested();
  }
}
