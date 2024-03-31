class splashScreen {
  constructor(){
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
  }
  
  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load(){
    return loadResource(basepath + 'intro-text.png').then(introImage => {
      this.introImage = introImage;
    });
  }
  
  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init(){
    this.waiting = true;
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start(){
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640,400,"main");
      document.body.addEventListener('keydown', this.onKeyPressed);
      setTimeout(this.stop, 4500);
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    if(this.waiting){
      this.introImage.draw(this.can,16,16);
      window.requestAnimFrame(this.main);
    }else{
      document.body.removeEventListener('keydown', this.onKeyPressed);
      this.endCallback();
    }
  }

  stop(){
    this.waiting = false;
  }
  
  onKeyPressed(event){
    console.log(event.key);
    if(event.key === ' ')
      this.stop();
  }
}
