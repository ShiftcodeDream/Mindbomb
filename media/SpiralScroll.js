class SpiralScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main = this.main.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.redScroll = this.redScroll.bind(this);
    this.spiral = this.spiral.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['Hellfire_64x64_46.png', 'CyclicRaster.png', 'OnePlan_32x32.png', 'Spiral.sndh'])).then(data => {
      [this.hell, this.raster, this.font, this.zik] = data;
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
          if(d[i+1] === 0x80){
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
    this.spirCan = new canvas(640,400);
    this.rollCan = new canvas(86*32, 32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "OH SHIT WHO SLIPPED THE ACID IN MY TEA. POSSIBLY THE MOST MIND BOGGLINGLY HEAD ACHE GIVING SCROLL EVER CODED ON THE FACE OF THIS EARTH. ARRRGGGGHHHH!!!! THIS IS MY SECOND ATTEMPT AT CODING THIS KIND OF SCROLLINE. I GAVE UP FIRST TIME BECAUSE I COULD NOT GET THE FONTS TO LOOK RIGHT. SECOND TIME AROUND WAS A LOT EASIER. THE SCROLL CONTAINS NINETY ONE INDIVIDUAL SPRITES AND TAKES A GRAND TOTAL OF SEVENTY PERCENT PROCESSOR TIME TO MAKE IT ALL UP! THIS SCREEN DEFINETLY TOOK A BIT OF PERSEVERANCE BUT I THINK THAT SECOND TIME AROUND IT LOOKS PRETTY GOOD! MANY THANKS TO PHIL FOR HELPING ME WITH MY STARFIELD MATHS. A GOOD SECOND OPINION IS VERY USEFUL. THIS SCREEN FEATURES MY NEW STARFIELD ROUTINE WHICH IS ABOUNT EIGHT TIMES FASTER AND CONSIDERABLY MORE REALISTIC THAN MY PREVIOUS ATTEMPT. IT TOTALLY TRANSFORMED THIS SCREEN FROM BEEING RATHER MEDIOCRE INTO SOMETHING A LOT BETTER! AS IT STANDS THIS FILE IS THE BIGGEST ON THE DISK DUE TO MY RATHER WASTEFUL CODING PRACTICES BUT IT IS TO LATE NOW TO CHANGE ALL THE CODE AND ALSO I AM JUST TO DAWN LAZY. SINCE THIS IS A BASTARD TO READ I THINK I SHALL MAKE THIS SCROLL NICE AND SHORT SO THAT YOU DO NOT HAVE SUCH A LARGE HEADACHE THAT YOU CANNOT BE BOTHERES TO LOOK AT ALL THE OTHER WONDERFUL SCREENS ON THIS DEMO!!!. OK ITS TIME TO WRAP AND IN THE NOTORIOUS WAY THAT I DO THINGS I SHALL LEAVE YOU WITH SOME DOTS TO CALM YOUR SHATTERED NERVES!!!!!!"
    + this.fillWith(150, '.') + this.fillWith(100, ' ');
    this.scrolltext.init(this.rollCan, this.font, 32);
    this.spirCtr = 4;
    this.rasterPos = 20;
    this.zik.play();
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.starfield = [
        new starfield3D(this.can, 80, 6, 640, 400, 320, 200, '#ccc', 100, 0,0),
        new starfield3D(this.can, 80, 6, 640, 400, 320, 200, '#666', 100, 0,0)
      ].map(s => {
        s.draw = Object.getPrototypeOf(this).overrideDrawStarfield.bind(s);
        return s;
      });
      document.body.addEventListener('keydown', this.onKeyPressed);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      this.can.clear();
      this.starfield.forEach(s=>s.draw());
      this.redScroll();
      this.spiral();
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
  }

  spiral(){
    let i,x,y,s,a;
    const sp = this.spirCan.contex;
    this.spirCan.clear();
    if(this.spirCtr++ >= 4) {
      this.rollCan.clear();
      this.scrolltext.draw(0);
      this.spirCtr = 0;
    }
    sp.globalCompositeOperation = 'source-over';
    for(i=0,a=this.spirCtr*6.5*Math.PI/344; i<86; i++,a+=6.5*Math.PI/86){
      x = 320 - i*260/86*Math.cos(a);
      y = 200 + i*200/86*Math.sin(a);
      s = 12*i/43 + 8;
      sp.drawImage(this.rollCan.canvas, (86-i)*32,0, 32,32, ~~x,~~y,~~s,~~s);
    }
    sp.globalCompositeOperation = 'source-atop';
    sp.drawImage(this.raster.img, 0,0,1,448, 0,this.rasterPos,640,448);
    sp.drawImage(this.raster.img, 0,0,1,448, 0,this.rasterPos+448,640,448);
    this.rasterPos -= 6;
    if(this.rasterPos <= -428)
      this.rasterPos = 20;
    this.spirCan.draw(this.can,0,0);
  }

  fillWith(nb, what){
    return new Array(nb).fill(what).join('');
  }

  redScroll(){
    let y = this.midScroll + this.midScroll*Math.sin(this.scrollCtr += 0.005);
    this.scrollCan.draw(this.can, 0, ~~-y);
    this.scrollCan.draw(this.can, 576, ~~-y);
  }
  // Overrides "draw" method in the starfield to draw points instead of lines.
  overrideDrawStarfield(){
    var tmp=this.dest.contex.strokeStyle;
    var tmp2 = this.dest.contex.globalAlpha;
    var tmp3 = this.dest.contex.lineWidth;
    this.dest.contex.globalAlpha=1;
    this.dest.contex.fillStyle=this.color;

    for(var i=0;i<this.n;i++){
      this.test=true;
      this.star_x_save=this.star[i][3];
      this.star_y_save=this.star[i][4];
      this.star[i][0]+=(this.centx-this.x)>>4; if(this.star[i][0]>this.x<<1) { this.star[i][0]-=this.w<<1; this.test=false; } if(this.star[i][0]<-this.x<<1) { this.star[i][0]+=this.w<<1; this.test=false; }
      this.star[i][1]+=(this.centy-this.y)>>4; if(this.star[i][1]>this.y<<1) { this.star[i][1]-=this.h<<1; this.test=false; } if(this.star[i][1]<-this.y<<1) { this.star[i][1]+=this.h<<1; this.test=false; }
      this.star[i][2]-=this.star_speed; if(this.star[i][2]>this.z) { this.star[i][2]-=this.z; this.test=false; } if(this.star[i][2]<0) { this.star[i][2]+=this.z; this.test=false; }
      this.star[i][3]=this.x+(this.star[i][0]/this.star[i][2])*this.star_ratio;
      this.star[i][4]=this.y+(this.star[i][1]/this.star[i][2])*this.star_ratio;
      if(this.star_x_save>0&&this.star_x_save<this.w&&this.star_y_save>0&&this.star_y_save<this.h&&this.test){
        this.dest.contex.fillRect(this.star_x_save+this.offsetx,this.star_y_save+this.offsety, 2, 2);
      }
    }
    this.dest.contex.strokeStyle=tmp;
    this.dest.contex.globalAlpha=tmp2;
    this.dest.contex.lineWidth=tmp3;
  }

  stop() {
    this.zik.stop();
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