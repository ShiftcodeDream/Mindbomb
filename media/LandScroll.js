class LandScroll {
  constructor(demoManager) {
    this.demoManager = demoManager;
    // Bind to this all internally called functions
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    });
  }

  // Loads resources and returns a Promise
  // You can make long precalculations here.
  load() {
    return Promise.all(this.demoManager.loadResource(['LandscrollSprites.png','LandscrollBack.png', 'Classic_16x16.png', 'LandScroll.sndh'])).then(data => {
      [this.sprites, this.backs, this.font, this.zik] = data;
    });
  }

  // Initialize the demo (all resources are already loaded)
  // Initialize scrolltexts here (for example)
  init() {
    this.font.initTile(16,16,32);
    this.scrollCan = new canvas(320,200);
    this.distCan = new canvas(640,200);
    this.enableAliazing(this.scrollCan);
    this.enableAliazing(this.distCan);
    this.scrolltext = new scrolltext_vertical();
    this.scrolltext.scrtxt = "   \\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]\\]    AW SHIT IT'S A SCROLLING LINE!!  THOSE FUCKING LOST BOYS HAVE DONE IT AGAIN AND BLOWN MY MIND. GOOD DEMOS, FIRST SEEN ON THE AMIGA, NOW SHOWING, COURTESY OF THE LOST BOYS. BEST ON THE ST, MODESTY HAS  NEVER BEEN OUR STRONGEST POINT. WE ARE THE BEST SO FORGET THE REST!!! THIS DEMO HAS BEEN GRADUALLY WRITTEN, THEN RE-WRITTEN AND THEN HAD EVEN MORE BITS ADDED TO IT BETWEEN JUNE 1989 AND MARCH 1990. THIS MAKES IT ONE OF THE OLDEST SCREENS ON THIS DEMO.  THE TROUBLE WITH ALL OF THE CODING FOR THIS DEMO IS THAT WE KEPT ON LEARNING EXTRA  LITTLE TRICKS TO SPEED UP OUR CODE OR THOUGHT UP BETTER WAYS OF CODING OUR SCREENS WHICH ALLOWED US MORE TIME FOR OTHER THINGS. FOR INSTANCE THIS SCREEN WAS REWRITTEN COMPLETELY ON AT LEAST THREE SEPERATE OCCASIONS. AT ONE POINT IT WAS EVEN RUNNING WITH NO BORDERS ON THE SCROLLINE, BUT THIS WAS VERY COMPLEX  TO MANAGE AND SO WE GAVE THAT IDEA UP.   SPAZ'S GRAPHIX ARE REALLY EXCELLENT AND THE SIGNS LOOK GOOD.  AS YOU WOULD EXPECT IT USES 100 PERCENT OF THE AVAILABLE PROCESSOR TIME AND IS OPTIMIZED AS FAR AS WE FEEL NECESSARY.   I HAVE BEEN TRYING TO WORK OUT HOW MANY HOURS I HAVE WORKED ON THIS DEMO, AND THE RESULT IS REALLY SHOCKING I'M SURE THAT THIS MUST BE THE MOST  WORKED UPON DEMO IN THE HISTORY OF THE ST.  I CODED THE FIRST SCREEN IN ABOUT APRIL 1989 AND NOW 10 MONTHS LATER I'M STILL WORKING ON IT AND I DOUBT VERY MUCH IF IT WILL BE FINISHED  MUCH BEFORE APRIL 1990!!!!!!  WHO SAYS HACKERS ARE LAZY BASTARDS WHO RIP OF THE COMPUTER INDUSTRY. WE WORK HARDER THAN MOST FUCKING GAME DESIGNERS SO IF ANYONE SLAGS US OFF THEN FUCK THEM!!!!!! HAVE YOU TRIED THE ARROW KEYS ON THE KEYBOARD YET.     CLEVER HUH!  I WAS GOING TO MAKE THE SCREEN DO THAT AUTOMATICALLY BUT EVERYONE LIKES A BIT OF AUDIENCE PARTICIPATION ON DEMOS SO I LEFT IT TO YOU INSTEAD!  MY NEW STARFIELD HAS ALLOWED THIS SCREEN TO BECOME ONE OF MY FAVOURITES ON THE WHOLE DEMO. IT GETS THE VERY BEST OUT OF THE ST I THINK WITHOUT USING ANY SPECIAL TRICKS OR STUFF!.   I HAVE NOT BOVERED TO WORK OUT HOW MUCH PROCESSOR TIME EACH PART OF THE SCREEN TAKES BUT IT MUST GO SOMETHING LIKE THIS FOR ANYONE WHO IS INTERESTED.  STARFIELD 10 PERCENT, SPRITES (FULLY MASKED) 35-40 PERCENT, RASTER SCROLL 20 PERCENT AND THE SIGNS MAKE UP THE REST OF THE PROCESSOR TIME. THIS SCREEN DOES OF COURSE USE 100 PERCENT CPU TIME. (GOES WITHOUT SAYING REALLY!)   ANYWAY I CANNOT THINK OF ANYMORE THINGS TO WRITE IN THIS SCROLL SO I GUESS I'M GOING TO WRAP NOW.  HOPE YOU LIKED THIS!!!          WRAP!!!!!!!............. ";
    this.scrolltext.init(this.scrollCan, this.font, 1.5);

    this.ctrCenter = 0;
    this.shifted = 0;

    let c='';
 
    // I used base 18 encoding because base 16 (hexadecimal) uses 3 characters to code 320 value (>255), wereas base 18 only uses 2.
    this.curve = "87a28aa18da18ga191a194a097a09b9h9e9g9h9fa29ea59da89caa9aad99ag97b196b394b692b990bb8gbd8ebg8cc08ac287c485c683c880ca7fcc7dcd7acf77cg74d072d16hd26ed36bd468d565d661d65gd75dd75ad757d754d851d74fd74cd749d746d643d640d53ed43bd338d235d132d02hcg2fcf2ccd29cc26ca24c821c61gc41ec21cc019bg17bd15bb13b911b60hb30fb10dag0cad0aaa09a807a506a2059h049e039b029701940191008g008d008a008700830080007f007c007901760172026h036e046b05680665076309600a5f0c5c0d5a0f570h5411521350154f174d194b1c491e471g45214324412640293g2c3f2f3d2h3c323b353a38393b383e3740374336463649364c364f365036543657365a365d375g3761386539683a6b3b6e3c6h3d723f743g77407a417d437f4580478349854b874d8a4f8c508e528g549057925a945c965f976099639a659c689d6b9e6e9f6h9g729h76a079a07ca17fa180a183a1879h8a9f8c9c8f9a909792949492968h988e998b9b889c859d829g83a184a485a886ab86ae87b087b387b787bb87bf86c086c485c481c47fc47bc478c374c271c26fc16cbh69bg66bf63bd60bb5fbe5ebh5cc25ac458c756c953cc51ce4gcg4dd04ad246d443d640d33fch3dce3bcb39c837c535c234bg33bd31ba31b730b32hb02hb12eb12bb127b124b121b01fb01cah18ag15af11ae0gac0caa09a709a30a9h0c9e0d9a0e970g940h91118g138e158b17891a871c841a82177h157f137c11790h760g730e6h0d6e0c6a0a66096309610c5h0g5g115f155e185d1c5d1f5c215c245c275c2b5c2e5d2h5a2h5630533150314f334b344835453742393h3b3e3d3a3f374039433b463d4a3f4d3h4g41504453465649584b5a4e5c4h5e525f50604g634f664e694c6c4b6f4b714a744978497b497f498149854d864g86528756875a875d875h876286658669856c846f83708271857288748b758e778h79927b947d977g9a819c839f87a28ba08fa0919g959f999d9d9b9g98a195a392a58ga68ca789a986a983a87ga77ea67ba578a376a1749h739f739d729b7298729673947493769278917a907d907f9180928293859588978a9a8c9d8f9g8ga18ha58ha991ad90ah90b48gb88fbb8cbf8ac188c485c681c97fcb7bcc77cd72ce6gce6cce68cd63cb60ca5ec85bc658c356c054bf53bd52ba51b650b450b151b052ag54ae55ad58ac5aac5bac5dac5gae60af62ah64b166b366b667b967bc68bf67c167c464c763ca60cd5gcg5dd059d255d451d54fd54bd546d542d53fd43bd136ch33cf2hcc2ec92bc529c126bg25bc24b923b423b123af24ad25aa27a828a52ba32da32fa22ha132a234a236a338a53aa63ba83daa3dad3eaf3dah3db23bb43ab638b836bb33bc30bd2fbe2bbe27be24bd1hbc1dbb1ab916b611b30hb00daf0bab08a707a2059g059c04980492058g058c078908860b830d800g7g117e147d177c1b7c1d7c1g7d217e247e267g288029822b842b862c882b8a2b8c298e288g268g248h21901g901d901b8h178g148e118c0g890d860b830880077e057a05740470046e056a05650761085f0b5c0d590h56115316511a501d4h1h4g244g274g2b4h2f5030513354365638583a5a3b5d3d5f3d5h3e623d643d663b673a69386a366a346b326a2h692f692d672b642862275h255f245b235823532350244e254b264729432b402e3f2h3d333b36383b373f37423746374b374f38513a553c593e5d3h5g4260456348644b664f6750685367566759665b665d645f625g60605g605d605b605a5h585g555e545c525b515850565052514h524f534c5449564658445b425e41603h633g683g6c3g6g3h724077417b437f468148854b884f8a518c548f588g5c905h906391678h6b8h6e8g6h8f728c758a778879857a827b807c7f7c7d7b7a7a78797678747673747271726h726f736d736b7469766778667b657e647g638363866589668c678g69926b956e986h9b739d779f7b9g7fa081a087a28ca18ha194a19aa19fa0a2a0a79hac9gah9fb49eb99dbe9cc19ac599ca97cf96d194d592d990de8ge08ee38ce78aeb87ee85eh83f380f67ff97dfb7afe77fg74g072g36hg46eg66bg868g965ga61gb5ggc5dgd5agd57gd54ge51gd4fgd4cgd49gc46gb43ga40g93eg83bg638g435g332g02hfg2ffe2cfb29f926f624f321eh1gee1eeb1ce719e317e015de13d911d50hd10fcf0dca0cc50ac109be07b906b405ah04ac03a702a2019f019a0094008h008c00870081007e00790073006g016b01660261035e04590554064h074c09480a430c3g0d3c0f380h34112h132d152a172619221c1h1e1e1g1a211724142612290h2c0f2f0d2h0a3209350738053b043e0340024301460049004c004f005000540057005a015d025g036104650568076b096e0a6h0d720f740h77127a147d177f1a801e831h852287268a2a8c2d8e2h8g349038923c943g96439748994c9a4h9c549d599e5e9f619g669h6ba06ga073a179a17ea181a187a28ca190a194a199a19ba19da19ea19da19ca099a097a093a0919h8h9h8g9g8g9g8h9g919f949f999e9e9da29da89cae9cb19bb59ab99aba99bc98bb97ba97b896b595b194ah93ae92ac91ac90ac8had8gaf8fb18eb68dbb8cbg8bc48ac989cd87ch86d185d284d283d181ch80ce7hcb7fc77ec47dc17bbh7abg79bh77c076c274c673cb72cf70d36hd76fdc6edg6ce06be169e168dh66dg65dc63d961d460d05gce5fcc5dca5cc95ac958ca57cd55cg54d252d751db4hdf4fe04ee34ce44be449e347e146df44db43d741d240cf3gcb3ec83dc63bc63ac538c737c935cc34cg32d231d62hd92gdb2fdd2ddc2cdb2ad829d628d126ce25c824c322bg21bc20b91gb71fb61eb61db81cba1abd19bg18c217c516c615c814c813c712c511c110bf0hba0gb40fag0eab0da50ca20c9h0b9f0a9e099e099g08a107a307a706a906ac05ad04ae04ac03ab03a703a4029g029a0194018g018b018600830080007g007g007h0081008300860089008b008d008e008e008c008900860081017e01780172016e0268026503610360035g045h0460056306650669076b076e086g096g096f0a6d0b6a0c670c610d5e0e580f520g4f0h4b104711451244134414461547164a174e184h19521a541c561d561e551f531g50204e21492244243g253b2636283429312a302c2h2d312f332g362h3a313e324034433545374738463a463b443d413e3f3g3a40354131432f442b4629472849284b294c2c4e2f4f314h35503a523e543h5542574358435a425c405d3g5f3c5g3860336130632e652d662b682b692c6b2e6c306e356f396h3f70417246734a744c764d774e794d7a4b7b487d457e417f3g7h3d803b813a833a843b853d863h874389488a4d8b518c568d5b8e5f8f5h8g608h609060915g925d935b94579554965297519750985299539a579a5b9b5g9c649c6a9d6g9d739e789f7b9f7d9g7e9g7e9g7d9h7b9h79a075a073a070a06ha16ga16ha171a173a178a17ca180a187a28da191a197a19ea1a2a0a8a0ad9hb19gb69fbb9ebg9dc29cc69aca99cd97cg96d194d392d590d68gd78ed78cd78ad787d685d583d380d17fcg7dcd7aca77c674c272bg6hbb6eb66bb168ad65a861a25g9e5d975a91578d548751804f7c4c76496h466b436540603e5c3b573852354f324b2h472f432c40293f263c243a21381g371e361c361936173615371338113a0h3c0f3f0d400c430a47094b074f06520557045c03600265016b016h0076007c00800086008d00910097009e00a201a801ad02b103b604bb05bg06c207c609ca0acd0ccg0dd10fd30hd511d613d715d717d719d71cd61ed51gd321d124cg26cd29ca2cc62fc22hbg32bb35b638b13bad3ea840a2439e469749914c8d4f875080547c57765a6h5d6b5g656160655c68576b526e4f6h4b7247744377407a3f7d3c7f3a80388337853687368a368c368e378g38903a923c943f9640974399479a4b9c4f9d529e579f5c9g609h65a06ba06ha176a17ca180a187a28aa18da18ga0919g949e979c9b999e969h92a28ga58ca887aa83ad7fag7ab174b36hb66bb965bb5gbd5abg54c04fc249c443c63ec838ca32cc2fcd29cf24cg1gd01cd117d213d30hd40dd50ad607d605d703d701d700d700d800d700d700d701d703d605d607d50ad40dd30hd213d117d01ccg1gcf24cd29cc2fca32c838c63ec443c249c04fbg54bd5abb5gb965b66bb36hb174ag7aad7faa83a887a58ca28g9h929e969b99979c949e919g8ga08da18aa187a283a180a17fa07c9g799e769c72996h966e926b8g688c65876383607f5f7a5c745a6h576b5465525g505a4f544d4f4b494943473e45384332412f40293g243f1g3d1c3c173b133a0h390d380a3707370536033601360036003600360036003601360337053707380a390d3a0h3b133c173d1c3f1g3g244029412f43324538473e49434b494d4f4f54505a525g5465576b5a6h5c745f7a607f63836587688c6b8g6e926h967299769c799e7c9g7fa080a183a1"
    .split('')
    .map((v,i) => {
      if(i&1){
        return c+v;
      }else{
        c=v;
        return '';
      }
    })
    .filter((v,i) => i&1)
    .map(p => parseInt(p,18)) // x,y position on Atari (320x200)
    .map((p,i) => 2*p + (i&1 ? 60 : 64)); // positions on this screen (2x zoom + borders)
    
    this.snakeCtr = 0;
    this.paused = false; // TODO : remove
    this.running = true;
  }

  // Starts the demo and returns a Promise that will be resolved at the end
  // of the demo.
  start() {
    return new Promise(endCallback => {
      this.endCallback = endCallback;
      this.can = new canvas(768, 540, "main");
      this.ctx = this.can.contex;
      this.enableAliazing(this.can);

      this.starfield = [
        new starfield3D(this.can, 100, 3, 640, 200, 384, 0, '#fff', 100, 64,80),
        new starfield3D(this.can, 100, 3, 640, 200, 384, 0, '#888', 100, 64,80)
      ].map(s => {
        s.draw = Object.getPrototypeOf(this).overrideDrawStarfield.bind(s);
        return s;
      });
      this.tlb = [
        new TlbSprite(this.can, 64, this.sprites),
        new TlbSprite(this.can, 480, this.sprites)
      ];
      setTimeout(()=> this.tlb.forEach(t => t.enable()), 9000);

      document.body.addEventListener('keydown', this.onKeyPressed);
      this.zik.play();
      window.requestAnimFrame(this.main);
    });
  }

  // Main loop, called by Codef requestAnimFrame
  main() {
    if (this.running) {
      if(!this.paused) {
        this.can.clear();
        this.background();
        this.logos();
        this.screx();
        this.snake();
      }
      window.requestAnimFrame(this.main);
    } else {
      this.end();
    }
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
    switch(event.key){
      case ' ':
        event.preventDefault();
        this.stop();
        break;
      case 'p':
        this.paused = !this.paused; // TODO : remove
        break;
      case 'l':
        console.log(this);
        break;
      case 'ArrowLeft':
        this.shifted = (this.shifted + 2) % 32;
        break;
      case 'ArrowRight':
        this.shifted = (this.shifted - 2) % 32;
        break;
    }
  }

  snake(){
    let idx = this.snakeCtr;
    for(i=0; i<10; i++){
      this.ctx.drawImage(this.sprites.img,
                         398,0,32,32,
                         this.curve[idx], this.curve[idx+1],
                         32,32);
      idx += 10;
      if(idx > this.curve.length)
        idx -= this.curve.length;
    }
    this.snakeCtr += 2;
    if(this.snakeCtr > this.curve.length)
      this.snakeCtr = 0;
  }
  
  screx(){
    let i;
    const ct = this.scrollCan.contex;
    const ctd = this.distCan.contex;
    this.scrollCan.clear();
    this.distCan.clear();
    this.scrolltext.draw(0);

    for(i=1; i<21; i++)
      ct.drawImage(this.scrollCan.canvas,0,0,16,200, i*16,0,16,200);
    ctd.globalCompositeOperation = 'source-over';
    for(i=0;i<200;i++) {
      // Zoom factor from 9/8 to 35/4
      let f = 1.125 + 0.038125*i;
      ctd.drawImage(this.scrollCan.canvas,
        0, ~~(i/4), 320, 2,
        ~~(320-(320+this.shifted)*f), i, ~~(640*f), 2
        );
    }
    ctd.globalCompositeOperation = 'source-atop';
    ctd.drawImage(this.backs.img, 1,0,1,200, 0,0,640,200);
    ctd.globalCompositeOperation = 'source-over';

    this.distCan.draw(this.can, 64,260);
  }
  background(){
    this.starfield.forEach(s=>s.draw());
    this.ctx.drawImage(this.backs.img,0,0,1,200, 0,260,770,200);
    this.ctx.fillStyle = "#0000C0";
    this.ctx.fillRect(0,460,768,80);
  }

  logos(){
    this.ctx.drawImage(this.sprites.img,
      0,0,174,108,
      296,~~(102 + 40*Math.sin(this.ctrCenter+=0.07)),
      174,108
    );
    this.tlb.forEach(t => t.draw());
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0,768,60);
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

  enableAliazing(canvas){
    const c = canvas.contex;
    c.imageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = c.webkitImageSmoothingEnabled = false;
  }

}

class TlbSprite{
  constructor(canvas, xpos, sprites){
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if('function' === typeof this[key])
        this[key] = this[key].bind(this);
    });
    this.ctx = canvas.contex;
    this.xpos = xpos;
    this.sprites = sprites;
    this.ctr = 0;
    this.x = xpos + 44;
    this.y = -108;
    this.zoom = 0.6;
    this.speed = 2;
    this.enabled = false;
    this.animate = () => {};
    this.animations = [
      this.initTranslate,
      this.initZoomInOut,
      this.initRotate
    ];
  }
  _draw(){
    this.ctx.drawImage(this.sprites.img,
      174,0,224,108,
      this.x, this.y, ~~(224*this.zoom), ~~(108*this.zoom)
    );
  }
  draw(){
    if(this.enabled){
      if(this.animate()){
        this.randomEffect();
      }
      this._draw();
    }
  }
  enable(){
    this.enabled = true;
    this.animate = this.translate;
  }
  randomEffect(){
    this.animations[~~(this.animations.length*Math.random())] ();
  }
  initTranslate(){
    this.x = this.xpos + 44;
    this.zoom = 0.6;
    this.speed = -2;
    this.animate = this.translate;
  }
  translate(){
    this.y += this.speed;
    if(this.speed < 0 && this.y < -108)
      this.speed *= -1;
    return (this.speed > 0 && this.y >= 124);
  }
  initZoomInOut(){
    this.ctrFrames = 120;
    this.ctr = -Math.PI/2;
    this.animate = this.zoomInOut
  }
  zoomInOut(){
    const s = Math.sin(this.ctr += Math.PI/30);
    this.zoom = 0.8 + 0.2 * s;
    this.x = this.xpos + 112 * (1-this.zoom);
    this.y = 118 + 10 * (1-s);
    return (--this.ctrFrames < 0)
  }
  initRotate(){
    this.ctrFrames = 300;
    this.ctr = -Math.PI/2;
    this.sens = Math.sign(Math.random()-0.5);
    this.animate = this.rotate
  }
  rotate(){
    const c = Math.cos(this.ctr);
    const s = Math.sin(this.ctr += Math.PI/50 * this.sens);
    this.zoom = 0.8 + 0.2 * s;
    this.x = this.xpos + 112 * (1-this.zoom);
    this.y = 108 + 30 * c;
    return (--this.ctrFrames < 0)
  }
}