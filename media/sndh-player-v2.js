/**
* This class aims to facilitate Juergen Wothke SNDH JS player usage.
*
* You give the URL of the file to be played, and that's all!
* It allows more options if needed. It exposes some usefull ScriptNodePlayer methods
* Since version 2, allows level retrieve and track selection when file contains several songs
* 
* Parameters :
*   _songFilename : URL of the file to load
* _options : 
*   - autostart : true if you want the music to start just after it was loaded
*   - spectrumEnabled : 
*   - loop : if true, restarts the song at the beginning once the end reached
*   - track : track number for files that have multiple songs
*   - vuemeterDecay : vuemeter decay purcentage (from 0.0 to 1.0). The lower the digit is,
*     faster the vue meter will decrease.
*   - onTrackReadyToPlay : callback function when track is ready to be played
*   - onTrackEnd : callback function when end of track has been reached
*   - onDownloadProgress : callback indicating download progression of the song
*   - onLoadError : callback called when download fails
*
* Functions :
*   - stop() : stops the song
*   - pause() : pause the song
*   - play() : start or resumes the song if stopped / paused. Optional track number can be asked there
*   - init() : reloads the song and plays it if autostart is set to true.
*   - setVolume(volume) : sets playback volume (between 0 and 1)
*   - getSongInfo() : Get specific song infos like 'author', 'name', etc.
*   - getSongInfoMeta() : Get meta info about specific song infos, e.g. what attributes are available and what type are they.
*   - getFreqByteData() : if spectrum enabled, gives frequency spectrum data
*   - getPlayerInstance() : get the instance of the player
*   - changeTrack(trackNumber) : changes the song number to be played when file contains several songs
*   - getVolumeVoice(ChannelNumber) : gets the volume of ChannelNumber (1, 2 or 3). Returns a value between 0.0 and 1.0
*   - getAllVolumeVoices() : returns an array containing volumes of the three channels
*   - dispose() : Stops the player and frees audio resources
*
* version 1.0 : First version
* version 1.1 : Fix loop settings (didn't worked when options.autoplay=false)
* version 2.0 : Supports vue meter and track change
*
* 	Copyright (C) 2022 Matthias DELAMARE
*
* Terms of Use: This software is licensed under a CC BY-NC-SA 
* (http://creativecommons.org/licenses/by-nc-sa/4.0/).
*
* Requires these files to work :
*   - scriptprocessor_player.js
*   - backend_sc68.js
**/

// VuTicker adaptation from Juergen Wothke example
// more compact code, values from 0 to 1, easier to manage
VueMeterTicker = (function(){
  var $this = function () {
    $this.base.call(this);

    setGlobalWebAudioCtx();
    this._sampleRate= window._gPlayerAudioCtx.sampleRate;

  }; 
  extend(AbstractTicker, $this, {
    init: function(samplesPerBuffer, tickerStepWidth) {
      this._bufSize= Math.ceil(samplesPerBuffer/tickerStepWidth);

      this._vuTmpBufferSize = 0;
      this._vuBuffer = [];
      this._vuTmpBuffer = [];
      [1,2,3].forEach(i => {
        this._vuBuffer[i] = new Uint8Array(this._bufSize);
        this._vuTmpBuffer[i] = new Uint8Array(this._bufSize);
      });
      this._lastVol = [0,0,0,0];
      this._decay= 0.9;
    },
    computeAudioSamplesNotify: function() {
      // sc68 uses a small 512 samples buffer, i.e. it should be sufficient 
      // to calc one "volume" value each time we get in here.. (good for ~90 fps)

      [1,2,3].forEach(i => {
        this._vuTmpBuffer[i][this._vuTmpBufferSize] = (backend_SC68.Module.ccall('emu_getVolVoice'+i, 'number') & 0xf);
      });
      this._vuTmpBufferSize++;
    },

    calcTickData: function(output1, output2) {
      // hack: in order to correctly synchronize the add-on data collected in computeAudioSamplesNotify(),
      // the same "resampling" that is used for the original sample-data would also need to be applied to the 
      // add-on data .. the below impl is a HACK that roughly approximates the correct sync of the data.. (due to the fact
      // that sc68 is generating very small chunks of sample-data and due to the fact that the data here is
      // used with a very low frequency (e.g. 60 fps, i.e. one reading every 17ms) the imprecision should be acceptable..)

      const step = this._vuTmpBufferSize / this._bufSize;
      for (k=0,m=0; k<this._bufSize; k++,m+=step) {
        var i = Math.floor(m);
        [1,2,3].forEach(j => {
          this._vuBuffer[j][k]= this._vuTmpBuffer[j][i];
        });
      }
      this._vuTmpBufferSize= 0;
    },
    // Between 0 and 1
    getVolumeVoice: function(channel) {
      const c = channel & 3;
      const p = ScriptNodePlayer.getInstance();
      var v = p._isPaused ? 0 : this._vuBuffer[c][p.getCurrentTick()];
      v = Math.max(v/0xf, this._lastVol[c]*this._decay);
      this._lastVol[c]= v;
      return v;
    },
    getAllVolumeVoices: function(){
      return [1,2,3].map(this.getVolumeVoice.bind(this));
    }
  });
  return $this;
})();


function SndhPlayer(_songFilename, _options){
  this.song = _songFilename;
  this.currentFileName = '';
  
  // default options
  this.options = {
    autostart: true,
    spectrumEnabled: true,
    loop: true,
    track: 0,
    vuemeterDecay: 0.9,
    onTrackReadyToPlay: ()=>{},
    onTrackEnd: ()=>{},
    onDownloadProgress: (total,loaded)=>{},
    onLoadError: ()=>{}
  };
  
  // user-defined options
  if(_options !== undefined)
    this.options = Object.assign(this.options, _options);
  
  this.init = function(){
    this.vueMeter = new VueMeterTicker(this.vuemeterDecay);

    // backendAdapter, basePath, requiredFiles, spectrumEnabled, onPlayerReady, onTrackReadyToPlay, onTrackEnd, onUpdate, externalTicker
    ScriptNodePlayer.createInstance(
      new SC68BackendAdapter(),
      '', [],
      this.options.spectrumEnabled,
      this.onPlayerReady.bind(this),
      this.onTrackReadyToPlay.bind(this),
      this.onTrackEnd.bind(this),
      this.onDownloadUpdate.bind(this),
      this.vueMeter
    );
  }
  this.onPlayerReady = function(){
    // url, options, onCompletion, onFail, onProgress
    ScriptNodePlayer.getInstance().loadMusicFromURL(
      this.song,
      {track:this.options.track, timeout:9999999},
      this.setCurrentFileName.bind(this),
      this.onLoadError.bind(this),
      this.options.onDownloadProgress.bind(this)
    );
  }
  this.onTrackReadyToPlay = function(){
    if(this.options.autostart)
      this.play();
    this.options.onTrackReadyToPlay();
  }
  this.onTrackEnd = function(){
    if(this.options.loop){
      this.options.autostart=true; // Should start asap when looping
      this.init();
      this.play();
    }
    this.options.onTrackEnd();
  }
  this.onDownloadUpdate = function(total, downloaded){
    this.onDownloadProgress(total, downloaded);
  }
  this.play = function(){
    ScriptNodePlayer.getInstance().play();
  }
  this.stop = this.pause=function(){
    ScriptNodePlayer.getInstance().pause();
  }
  this.setCurrentFileName = function(_filename){
    this.currentFileName = _filename;
  }
  this.onLoadError = function(err){
    console.error("Error loading file " + this.song);
    this.options.onLoadError(err);
  }
  this.getSongInfo = function(){
    return ScriptNodePlayer.getInstance().getSongInfo();
  }
  this.getSongInfoMeta = function(){
    return ScriptNodePlayer.getInstance().getSongInfoMeta();
  }
  this.getFreqByteData = function(){
    return ScriptNodePlayer.getInstance().getFreqByteData();
  }
  this.getPlayerInstance = function(){
    return ScriptNodePlayer.getInstance();
  }
  this.dispose = function(){
    var p = ScriptNodePlayer.getInstance();
    if(p == undefined)
      return;
    p.pause();
    if (typeof p._bufferSource != 'undefined')
      p._bufferSource.stop(0);
    if (p._scriptNode)
      p._scriptNode.disconnect(0);
    if (p._analyzerNode)
      p._analyzerNode.disconnect(0);
    if (p._gainNode)
      p._gainNode.disconnect(0);
  }
  this.setVolume = function(vol){
    ScriptNodePlayer.getInstance().setVolume(vol);
  }
  this.changeTrack = function(trackNumber){
    this.options.track = trackNumber;
    // if player is playing, launches the song as sonn as possible
    this.autostart = ! ScriptNodePlayer.getInstance()._isPaused;
    this.init();
  }
  this.getVolumeVoice = function(channel){
    return this.vueMeter ? this.vueMeter.getVolumeVoice(channel) : null;
  }
  this.getAllVolumeVoices = function(){
    return this.vueMeter ? this.vueMeter.getAllVolumeVoices() : null;
  }
  this.init();
}

