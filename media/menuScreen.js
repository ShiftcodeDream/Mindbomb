class menuScreen {
  constructor(){
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
  }
  
  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load(){
    return loadResource('intro-text.png').then(introImage => {
      this.introImage = introImage;
    });
  }
  
  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init(demoManager){
    this.demoManager = demoManager;
    this.running = true;
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the menu screen, exiting with "Escape" key will launch the
  // reset screen (don't forget to include it !)
  start(){
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640,400,"main");
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    if(this.running){
      window.requestAnimFrame(this.main);
    }else{
      this.end();
    }
  }

  stop(){
    this.running = false;
  }
  
  end(){
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.endCallback();    
  }
  
  onKeyPressed(event){
    // TODO : if key = Escape, end this screen to launch the reset screen
    if(event.key === ' ')
      this.stop();
  }
}
