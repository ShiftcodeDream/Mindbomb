class resetScreen {
  constructor(){
    // Bind to this all internally called functions
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
  init(){
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the reset screen, exit will do nothing. Ignore endCallback
  start(){
    return new Promise(endCallback => {
      this.can = new canvas(640,400,"main");
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    window.requestAnimFrame(this.main);
  }
}
