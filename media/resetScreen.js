class resetScreen {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.main = this.main.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['font_little_16x14.png', 'reset.ym'])).then(data => {
      [this.font, this.preload] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    let i;
    const somm1 = [
      192,128, 192,192, 220,192,
      224,128, 252,128, 252,192, 224,192,
      285,128, 256,128, 256,144, 284,176, 284,192, 256,192,
      288,128, 316,128, 302,128, 302,192,
      350,128, 378,128, 378,144, 350,160, 378,176, 378,192, 350,192,
      382,128, 410,128, 410,192, 382,192,
      414,128, 414,144, 428,160, 428,192, 442,144, 442,128,
      474,128, 446,128, 446,144, 474,176, 474,192, 446,192,
    ];
    const somm2 = [
      192,272, 192,208, 206,240, 220,208, 220,272,
      238,272, 238,208,
      256,272, 256,208, 284,272, 284,208,
      288,272, 316,258, 316,224, 288,208,
      350,208, 378,208, 378,224, 350,240, 378,256, 378,272, 350,272,
      382,208, 410,208, 410,272, 382,272,
      414,272, 414,208, 428,240, 442,208, 442,272,
      446,208, 474,208, 474,224, 446,240, 474,256, 474,272, 446,272
    ];
    this.sommets = [];
    const zoom = 1/64;
    for(i=0; i<somm1.length; i+=2){
      let x=somm1[i], y=somm1[i+1];
      this.sommets.push({x: (x-333)*zoom, y: (160-y)*zoom, z: 0 });
    }
    for(i=0; i<somm2.length; i+=2){
      let x=somm2[i], y=somm2[i+1];
      this.sommets.push({x: (x-333)*zoom, y: (240-y)*zoom, z: 0 });
    }
    this.arretes1 = "40-41 41-42 42-43 43-44 45-46 47-48 48-49 49-50 51-52 52-53 53-54 54-51 55-56 56-57 57-58 58-59 59-60 60-61 61-55 62-63 63-64 64-65 65-62 66-67 67-68 68-69 69-70 71-72 72-73 73-74 74-75 75-76 76-77 77-71"
      .split(' ').map(this.toMesh);
    this.arretes2 = "0-1 1-2 3-4 4-5 5-6 6-3 7-8 8-9 9-10 10-11 11-12 13-14 15-16 17-18 18-19 19-20 20-21 21-22 22-23 23-17 24-25 25-26 26-27 27-24 28-29 29-30 30-31 30-32 32-33 34-35 35-36 36-37 37-38 38-39"
      .split(' ').map(this.toMesh);
    this.ctr = 0;

    this.font.initTile(16,14,32);
    this.scrolltext = new scrolltext_horizontal();
    this.scrolltext.scrtxt = "WELL THATS IT.  HOPE YOU GOT AS MUCH PLEASURE FROM THIS DEMO AS I GOT FROM WRITING IT. ONCE AGAIN IF YOU WISH TO CONTACT THE LOST BOYS OUR ADDRESS IS   22 OXFORD RD, TEDDINGTON, MIDDX, TW11 OPZ, ENGLAND.   SEE YOU NEXT TIME!!!                                                                 ";
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  // As this is the reset screen, exit will do nothing. Ignore endCallback
  start() {
    return new Promise(endCallback => {
      let obj;
      const colors = [0x000060, 0x0000A0, 0x0000E0, 0xE0E0E0];
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      this.scrolltext.init(this.can, this.font, 2);
      // 3D Engine (Three.js)
      this.engine = new codef3D(this.can, 20, 20, 1, 50 );
      this.engine.newObject = this.codef3d_newObject.bind(this.engine);
      this.lost = [];
      this.mind = [];
      colors.forEach((c,i) => {
        this.sommets = this.sommets.map(s => ({x:s.x, y:s.y, z:i/100}));
        // LOST BOYS
        obj = this.engine.newObject();
        this.engine.lines(this.sommets, this.arretes1, new LineBasicMaterial({ color: c, linewidth:2}));
        this.lost.push(obj);
        // MIND BOMB
        obj = this.engine.newObject();
        this.engine.lines(this.sommets, this.arretes2, new LineBasicMaterial({ color: c, linewidth:2}));
        this.mind.push(obj);
      });
      // Force 3D engine to draw dark meshes in the same order they are defined, not according to their z position.
      this.engine.renderer.sortElements = false;
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik = new music("YM");
      this.zik.LoadAndRun(this.demoManager.basepath + 'reset.ym');
      window.requestAnimFrame(this.main);
    });
  }

  toMesh(l){
    let [d,f] = l.split('-');
    return {p1:d, p2:f};
  }
  // Method for Codef 3D aim to create a new object, added to the scene.
  // This allows to manage more than one 3D object in the scene
  codef3d_newObject(){
    this.group = new THREE.Object3D();
    this.scene.add( this.group );
    return this.group;
  }
  // Main loop, called by Codef requestAnimFrame
  main() {
    let a,i;
    this.can.clear();
    for(let i=0, a=this.ctr; i<4; i++, a+=16) {
      let [tx, ty] = this.getPositions(a);
      let [rx, ry, rz] = this.getRotations(a);

      this.lost[i].position.x = tx;
      this.lost[i].position.y = -ty;
      this.lost[i].rotation.x = rx;
      this.lost[i].rotation.y = ry;
      this.lost[i].rotation.z = rz;

      this.mind[i].position.x = -tx;
      this.mind[i].position.y = ty;
      this.mind[i].rotation.x = rx;
      this.mind[i].rotation.y = ry;
      this.mind[i].rotation.z = rz;
    }
    this.ctr++;
    if(this.ctr >= 2160)
      this.ctr = 0
    this.engine.draw();
    this.scrolltext.draw(386);
    window.requestAnimFrame(this.main);
  }
  getPositions(a){
    const pi = Math.PI;
    switch(true){
      case a<270: return [
        1.3*a/135,        // 0 -> 2.6
        0.6 - 0.3*a/135   // 0.6 -> 0
      ];
      case a<540: return [
        5.2 - 1.3*a/135,  // 2.6 -> 0
        0.6 - 0.3*a/135   // 0 -> -0.6
      ];
      case a<810: return [
        5.2 - 1.3*a/135,  // 0 -> -2.6
        0.3*a/135 - 1.8   // -0.6 -> 0
      ];
      case a<1080: return [
        1.3*a/135 - 10.4, // -2.6 -> 0
        0.3*a/135 - 1.8   // 0 -> 0.6
      ];
      default: return this.getPositions(a-1080);
    }
  }
  getRotations(a){
    const pi = Math.PI;
    switch(true){
      case a<1080: return [
        0,
        0,
        a*pi/270
      ];
      case a<2160: return [
        a*pi/270,
        -a*pi/270,
        a*pi/270
      ];
      default: return [
        0,
        0,
        a*pi/270
      ];
    }
  }
  onKeyPressed(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
  }
}