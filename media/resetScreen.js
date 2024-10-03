class resetScreen {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.main = this.main.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['font_little_16x14.png', 'RedSector.sndh'])).then(data => {
      [this.font, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.sommets = [
      192,128, 192,192, 220,192,
      224,128, 252,128, 252,192, 224,192,
      285,128, 256,128, 256,144, 284,176, 284,192, 256,192,
      288,128, 316,128, 302,128, 302,192,
      350,128, 378,128, 378,144, 350,160, 378,176, 378,192, 350,192,
      382,128, 410,128, 410,192, 382,192,
      414,128, 414,144, 428,160, 428,192, 442,144, 442,128,
      474,128, 446,128, 446,144, 474,176, 474,192, 446,192,

      192,272, 192,208, 206,240, 220,208, 220,272,
      238,272, 238,208,
      256,272, 256,208, 284,272, 284,208,
      288,272, 316,258, 316,224, 288,208,
      350,208, 378,208, 378,224, 350,240, 378,256, 378,272, 350,272,
      382,208, 410,208, 410,272, 382,272,
      414,272, 414,208, 428,240, 442,208, 442,272,
      446,208, 474,208, 474,224, 446,240, 474,256, 474,272, 446,272
    ];
    this.arretes = "0-1 1-2 3-4 4-5 5-6 6-3 7-8 8-9 9-10 10-11 11-12 13-14 15-16 17-18 18-19 19-20 20-21 21-22 22-23 23-17 24-25 25-26 26-27 27-24 28-29 29-30 30-31 30-32 32-33 34-35 35-36 36-37 37-38 38-39 40-41 41-42 42-43 43-44 45-46 47-48 48-49 49-50 51-52 52-53 53-54 54-51 55-56 56-57 57-58 58-59 59-60 60-61 61-55 62-63 63-64 64-65 65-62 66-67 67-68 68-69 69-70 71-72 72-73 73-74 74-75 75-76 76-77 77-71".split(' ');
    this.font.initTile(16,14,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "WELL THATS IT.  HOPE YOU GOT AS MUCH PLEASURE FROM THIS DEMO AS I GOT FROM WRITING IT. ONCE AGAIN IF YOU WISH TO CONTACT THE LOST BOYS OUR ADDRESS IS   22 OXFORD RD, TEDDINGTON, MIDDX, TW11 OPZ, ENGLAND.   SEE YOU NEXT TIME!!!                                                                 ";
    ['#E0E0E0', '#0000E0', '#0000A0', '#000060'];
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the reset screen, exit will do nothing. Ignore endCallback
  start() {
    return new Promise(endCallback => {
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.scrolltext.init(this.can, this.font, 2);
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    this.can.clear();
    this.ctx.strokeStyle = "#FFF";
    this.arretes.forEach(arr => {
      const [d,f] = arr.split('-');
      this.ctx.beginPath();
      this.ctx.moveTo(this.sommets[d*2], this.sommets[d*2+1]);
      this.ctx.lineTo(this.sommets[f*2], this.sommets[f*2+1]);
      this.ctx.stroke();
    });
    this.scrolltext.draw(386);
    window.requestAnimFrame(this.main);
  }
}