class MovingBack {
  constructor(){
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
  }
  
  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load(){
    return loadResource('mind-logo1.png').then(introImage => {
      this.introImage = introImage;
    });
  }
  
  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init(){
    this.running = true;
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start(){
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640,400,"main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      setTimeout(this.stop, 4500);
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    if(this.running){
      this.introImage.draw(this.can,16,16);
      this.ctx.font = 'bold 24px "Comic sans MS", serif';
      this.ctx.fillStyle = '#F80';
      this.ctx.textAlign = 'center';
      this.ctx.fillText("This will be the " + this.constructor.name + " demo.", 320, 200);
      window.requestAnimFrame(this.main);
    }else{
      this.end();
    }
  }

  stop(){
    this.running = false;
  }
  
  // removes event listeners before notifying the menu screen that the demo is finished
  end(){
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.endCallback();    
  }
  
  // Event processor
  onKeyPressed(event){
    if(event.key === ' ')
      this.stop();
  }
}
