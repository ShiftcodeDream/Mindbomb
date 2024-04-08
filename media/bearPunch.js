class bearPunch {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.main_1 = this.main_1.bind(this);
    this.main_2 = this.main_2.bind(this);
    this.stop = this.stop.bind(this);
    this.end = this.end.bind(this);
    this.fader = this.fader.bind(this);
    this.nextScreen = this.nextScreen.bind(this);
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource([
            'mind-logo1.png', 'tcb-1.png', 'punch.png', 'tlb-logo1.png', 'slogan.png', 'laugh.ogg', 'boing.mp3'
        ])).then(data => [this.mind, this.tcb, this.punch, this.tlb, this.slogan, this.laugh, this.boing] = data);
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.punchPos = 0;
    this.punchSpeed = 0;
    this.fadeOpacity = 0.0;
    this.fadeSpeed = 0.02;
    this.timeouts = [];
    this.currentMain = this.main_1;
    this.rebounds = 0;
    this.sinCtr = 0;
    this.factor = 1;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(640, 400, "main");
      this.ctx = this.can.contex;
      document.body.addEventListener('keydown', this.onKeyPressed);
      this.running = true;

      const me = this;
      this.timeouts.push(setTimeout(() => {
        me.punchPos = 434
      }, 1500));
      this.timeouts.push(setTimeout(() => {
        me.punchSpeed = 20
      }, 3000));
      this.laugh.addEventListener('ended', () => {
        me.fadeSpeed = -0.01;
        me.onFaderEnd = me.nextScreen;
      });
      window.requestAnimFrame(this.currentMain);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main_1() {
    this.can.clear();
    if (!this.running) {
      this.end();
      return;
    }
    this.mind.draw(this.can, 60, 0);
    this.tcb.draw(this.can, 96, 142);
    if (this.punchPos !== 0) {
      this.punch.draw(this.can, this.punchPos, 160);
      if (this.punchSpeed !== 0) {
        this.punchPos -= this.punchSpeed;
        if (this.punchPos <= 114) {
          this.punchSpeed = 0;
          this.laugh.play();
        }
      }
    }
    this.fader();

    window.requestAnimFrame(this.currentMain);
  }

  main_2() {
    let y = 80;
    this.can.clear();
    if (!this.running) {
      this.end();
      return;
    }
    this.slogan.draw(this.can, 12, 366);
    if (this.rebounds < 7) {
      y = 80 - 254 * Math.abs(Math.sin(this.sinCtr));
      if (y >= 77) {
        this.boing.play();
        this.rebounds++;
        if (this.rebounds == 6) {
          this.timeouts.push(setTimeout(this.stop, 1500));
          this.rebounds = 7;
        }
      }
      this.sinCtr += 0.02;
      this.factor += 0.006;
    }
    this.tlb.draw(this.can, 118, ~~(y / this.factor));
    this.fader();
    window.requestAnimFrame(this.currentMain);
  }

  nextScreen() {
    this.fadeOpacity = 0;
    this.fadeSpeed = 0.05;
    this.currentMain = this.main_2;
    this.onFaderEnd = null;
  }

  stop() {
    this.running = false;
  }

  onKeyPressed(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.stop();
    }
  }

  end() {
    document.body.removeEventListener('keydown', this.onKeyPressed);
    this.timeouts.forEach(t => clearTimeout(t));
    this.endCallback();
  }

  // Manages fade in/out effect
  fader() {
    this.ctx.fillStyle = 'rgba(0,0,0,' + (1.0 - this.fadeOpacity) + ')';
    this.ctx.fillRect(0, 0, this.can.width, this.can.height);
    if (this.fadeSpeed !== 0) {
      this.fadeOpacity += this.fadeSpeed;
      if (this.fadeOpacity < 0.0) {
        this.faceOpacity = 0;
        this.fadeSpeed = 0;
        if (typeof this.onFaderEnd === 'function')
          this.onFaderEnd();
      } else if (this.fadeOpacity > 1.0) {
        this.fadeOpacity = 1;
        this.fadeSpeed = 0;
        if (typeof this.onFaderEnd === 'function')
          this.onFaderEnd();
      }
    }
  }
}