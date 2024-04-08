class menuScreen {
  constructor(){
    // Bind to this all internally called functions
    this.main = this.main.bind(this);
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.displayMap = this.displayMap.bind(this);
    this.drawMan = this.drawMan.bind(this);
    this.interraction = this.interraction.bind(this);
  }
  
  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load(){
    return Promise.all(loadResource(['gameblocks.png', 'man.png'])).then(data => [this.tiles, this.man] = data);
  }
  
  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init(demoManager){
    this.demoManager = demoManager;
    this.running = true;
    this.map = "#################GG#G##GGG###########################GGG###GG#GG#GG##########################GGG#GGGG#GG##########*((((()############4G4####G#G##G#############################GGGGGGGG##########*(jk(fg()###########5G5####GGG#GG###############################GGGGG###########*($%($%()+,#########6G6#####GGGG###############7878787878######GG78#GG##########*(&'(&'()-.#B####*(((((((()#GGG##78787878787878<=<=<=<=<=###GGGG#<=##########01#H????????JKIB###*(XY(lm(Z[()#G###<=<=<=<=<=<=<=<=<=<=<=<=###GGGG#<=##########23##########+,#B+,#*($%($%($%()GG###<=9:9:9:<=<=<=<=<=<=<=<=H??IGGG#<=+,########CD##########-.#B-.#*(&'(&'(&'()G####<=;de;##<=<=<=<=<=<=<=<=H??IG###<=-.#######BEFB########H????JK??????????????I###<=;$%;-.<=<=<=<=<=<=<=<=#H??I###<=+,###+,#CDCDCD############+,78################<=;&';+,<=<=<=<=<=<=<=<=H??I####<=-.###-.BEFEFEFB###########-.<=################<=H??I-.<=<=<=<=<=<=<=<=#H??I##H??JK???JK???????I######*(()#+,<=################<=7878+,<=<=<=<=<=<=<=<=H??I######-.###-.#############*(VW()-.<=################<=<=<=-.<=<=<=<=<=<=<=<=#H??I#####+,###+,####+,#######*($%()+,<=####H??I##*(()##9:9:9:+,<=<=<=<=<=<=<=<=###H??I###-.###-.####-.#######*(&'()-.<=##78#H?I#*(\\]()#######-.<=<=<=<=<=<=<=<=###*(()###+,###+,###HJK?????????????????I*hi)#B##*($%()#######+,<=<=<=<=<=<=<=<=##*(PQ()##-.###-.####-.#################*($%()B##*(&'()#######-.<=<=<=<=<=<=<=<=##*($%()##+,###+,####+,#################*(&'()B##H???????????I+,<=<=<=<=<=<=<=<=##*(&'()##-.###-.####-.##################H??I#B#########787878-.<=<=<=<=<=<=<=<=#H??????????I##+,###HJK?????????I#############B#########<=<=<=+,<=<=<=<=<=<=<=<=###############-.####-.####/##/###CD###/###////###*(()##<=<=<=-.<=<=<=<=<=<=<=<=###*(()######H???????JKI##//////##EF#////##/////#*(^_()#<=<=<=+,<=<=<=<=<=<=<=<=##*(NO()+,###########-.##//#//#//####//#//#//#//#*($%()#<=<=<=-.<=<=<=<=<=<=<=<=##*($%()-.###########+,##//#//#//#//#//#//#//#//#*(&'()#<=<=<=+,<=<=<=<=<=<=<=<=##*(&'()+,###########-.##//#//#//#//#//#//#//#//H????I##<=<=<=-.<=<=<=<=<=<=<=<=##H?????JK??I########+,##//#//#//#//#//#//#//#//########<=<=<=+,<=<=<=<=<=<=<=<=########+,###########-.##//#//#//#//#//#//#//#//#CD#####<=<=<=-.<=<=<=<=<=<=<=<=########-.###########+,##//#//#//(bc(//#//#//#//#EF#####<=9:9:+,9:9:<=<=<=<=<=<=########+,###########-.##//#//#//($%(//#//#/////#01#-.##<=*(()-.####<=<=<=<=<=<=########-.###*(()####+,##//#//#//(&'(//#//#////##23#+,##<=(`a(+,###4<=<=<=<=<=<=########+,##*(RS()###-.##H??????????????????????????JKI#<=($%(-.#CD5<=<=<=<=<=<=########-.##*($%()###+,#############################+,##<=(&'(+,#EF6<=<=<=<=<=<=###>####+,##*(&'()#>#-.##////###///####/##/###////##-.##<=H????????I<=<=<=<=<=<=#H??????JK??????????????I/////#/////##//////##/////#+,##<=7878787878<=<=<=<=<=<=###7878#+,#######;#######//#//#//#//#//#//#//#//#//#-.##<=<=<=<=<=<=<=<=<=<=<=<=###<=<=#-.#######;#######//#//#//#//#//#//#//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=###<=<=#+,#######;#######/////#//#//#//#//#//#////##-.##<=<=<=<=<=<=<=<=<=<=<=<=B##<=<=#-.#######;#######//#//#//#//#//#//#//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=B##<=<=#+,##*(()#;#######//#//#//#//#//#//#//#//#//#-.##<=<=<=<=<=<=<=<=<=<=<=<=B##7LM8#-.#*(TU();#######//#//#//#//#//<no=//#//#//#+,##<=<=<=<=<=<=<=<=<=<=<=<=CD#;$%;#+,#*($%();#######/////#//#//#//(pq(//#/////#-.##<=<=<=<=<=<=<=9:9:9:9:9:EFB;&';#-.#*(&'();##>>###////###///##//(rs(//#////##+,##9:9:9:9:9:9:9:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AAAAAAAAAAAAAAAAAAAAAAAAAAAtuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    .split('').map(n=>n.charCodeAt(0) - 35);
    // Man's tile position
    this.pos = 330+160;
    // playground shifting in pixels
    this.shiftX = this.shiftY=0;
    this.currentKey = '';
    this.tiles.initTile(32,32,0);
    this.man.initTile(64,64,0);
    // What is man doing : Waiting, Hooked to a ladder, going Up/Down/Left/Right, Falling
    this.manState = 'w';
    // Man's step number for the animation
    this.manStep = 0;
    // Action's step number
    this.actionStep = 0;
    // Doors positions
    this.doors = new Map();
    '355-15:358-14:611-7:614-17:617-8:1162-6:1412-16:1341-9:789:13:2549-11:1901-10:2364-12:2584-4:1934-2:1454-3:3294-1:3303-5:3330-18'.split(':').forEach(v=>{
      let [ind,val]=v.split('-');
      this.doors.set(ind,val);
      this.doors.set(1+ind,val);
    })
    console.log(this.doors);
  }
  
  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the menu screen, exiting with "Escape" key will launch the
  // reset screen (don't forget to include it !)
  start(){
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      clearMainDiv();
      this.can = new canvas(640,480,"main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyDown);
      document.body.addEventListener('keyup', this.onKeyUp);
      window.requestAnimFrame(this.main);
    });
  }
  
  // Main loop, called by Codef requestAnimFrame
  main(){
    if(this.running){
      this.can.clear();
      this.displayMap();
      this.drawMan();
      this.interraction();
      
      window.requestAnimFrame(this.main);
    }else{
      this.end();
    }
  }

  displayMap(){
    let t = this.pos-330-160;
    for(let y=0, dy=this.shiftY+6; y<13; y++, t+=80-22, dy+=32){
      for(let x=0, dx=this.shiftX-32; x<22; x++, t++, dx+=32){
        this.tiles.drawTile(this.can, 83, dx, dy);
        this.tiles.drawTile(this.can, this.map[t], dx, dy);        
//        this.tiles.drawTile(this.can, 28, dx, dy);        
      }
    }
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0,640,22);
    this.ctx.fillRect(0,390,640,80);
  }
  
  drawMan(){
    let til = 22;
    switch(this.manState){
      case 'r':
        til = ~~(this.manStep/2);
        break;
      case 'l':
        til = 7 + ~~(this.manStep/2);
        break;
      case 'u':
      case 'd':
        til = 14 + ~~(this.manStep/2);
        break;
      case 'h':
        til = 21;
        break;
      case 'f':
        til = 23;
    }
    this.man.drawTile(this.can, til, 286, 166);
  }
  
  interraction(){
//    this.ctx.font = '16px "Comic sans MS", serif';
//    this.ctx.fillStyle="#FFF";
//    this.tiles.drawTile(this.can, 83, 32, 0);
//    this.tiles.drawTile(this.can, this.map[this.pos-80], 32, 0);
//    this.ctx.fillText(this.map[this.pos-80],32,16);
//    
//    this.tiles.drawTile(this.can, 83, 0, 32);
//    this.tiles.drawTile(this.can, this.map[this.pos-1], 0, 32);
//    this.ctx.fillText(this.map[this.pos-1],0,48);
//    
//    this.tiles.drawTile(this.can, 83, 32, 32);
//    this.tiles.drawTile(this.can, this.map[this.pos], 32, 32);
//    this.ctx.fillText(this.map[this.pos],32,48);
//    
//    this.tiles.drawTile(this.can, 83, 64, 32);
//    this.tiles.drawTile(this.can, this.map[this.pos+2], 64, 32);
//    this.ctx.fillText(this.map[this.pos+2],64,48);
//    
//    this.tiles.drawTile(this.can, 83, 32, 64);
//    this.tiles.drawTile(this.can, this.map[this.pos+80], 32, 64);
//    this.ctx.fillText(this.map[this.pos+80],32,80);    
    
    if(this.actionStep === 0){
      // Is man falling?
      const ft = [28,29,30,37,38,8,9,10,11,39,40];
      if(! ft.includes(this.map[this.pos+80]) && ! ft.includes(this.map[this.pos+81])){
        this.manState = 'f';
        this.manStep = 0;
        // this.pos += 80;
      }else{
        switch(this.currentKey){
          case 'ArrowLeft':
            // Can go left?
            if(! [22,23,25,26].includes(this.map[this.pos-1]))
              this.manState = 'l';
            else
              this.manState = 'w';
            break;
          case 'ArrowRight':
            // Can go right?
            if(! [22,23,25,26].includes(this.map[this.pos+2]))
              this.manState = 'r';
            else
              this.manState = 'w';
            break;
          case 'ArrowUp':
            // Can climb?
            if([8,9,10,11,39,40].includes(this.map[this.pos-160]))
              this.manState = 'u';
            else if(['u','h','d'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            break;
          case 'ArrowDown':
            // Can go down?
            if([8,9,10,11,39,40].includes(this.map[this.pos+80]))
              this.manState = 'd';
            else if(['u','h','d'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            break;
          default:
            // Was the man on a ladder (ie going up or down) before stopping?
            if(['u','h','d'].includes(this.manState))
              this.manState = 'h';
            else
              this.manState = 'w';
            this.manStep = 0;
        }
      }
    }
    
    // shifts playfield position
    if(this.manState !== 'w' && this.manStat !== 'h'){
      this.actionStep++;
      this.manStep = (this.manStep+1) % 14;
      switch(this.manState){
        case 'f':
        case 'd':
          this.shiftY = -8*this.actionStep;
          break;
        case 'u':
          this.shiftY = 8*this.actionStep;
          break;
        case 'l':
          this.shiftX = 8*this.actionStep;
          break;
        case 'r':
          this.shiftX = -8*this.actionStep;
          break;
      }
    }
    
    // Updates man's position after 4 frames
    if(this.actionStep === 4){
      this.actionStep = 0;
      this.shiftX = this.shiftY = 0;
      switch(this.manState){
        case 'f':
        case 'd':
          this.pos += 80;
          break;
        case 'u':
          this.pos -= 80;
          break;
        case 'l':
          this.pos--;
          break;
        case 'r':
          this.pos++;
          break;
      }
    }
    
  }
  
  stop(){
    this.running = false;
  }
  
  end(){
    document.body.removeEventListener('keydown', this.onKeyDown);
    document.body.removeEventListener('keyup', this.onKeyUp);
    clearMainDiv();
    this.endCallback();    
  }
  
  onKeyDown(event){
    this.currentKey = event.key;
    if(this.currentKey === 'Escape')
      this.stop(); // Ends the main screen demo => go to reset screen
    if(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape', ' '].includes(this.currentKey))
      event.preventDefault();
    // Demo Selection
    if(this.currentKey === ' ' || this.currentKey === 'Enter'){
      this.currentKey = '';
      let demoNumber = this.doors.get(this.pos);
      console.log({demonumber:demoNumber});
      if(demoNumber !== undefined){
        console.log("Playing " + DemosByNumber[demoNumber]);
      }
      console.log(this.pos);
    }
  }
  
  onKeyUp(){
    this.currentKey = '';
  }
}
