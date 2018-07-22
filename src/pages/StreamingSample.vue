 <template>
 <div>

    <h1> streaming </h1>


  <pre id="log"></pre>


 </div>
</template>

<script>
/* eslint-disable */
const mp3Url =
  "https://s3.amazonaws.com/avos-cloud-nsraiwek94hl/aae385585a1a5cd23d7c.mp3";

var _files = [
  "xa",
  "xb",
  "xc",
  "xd",
  "xe",
  "xf",
  "xg",
  "xh",
  "xi",
  "xj",
  "xk",
  "xl",
  "xm",
  "xn",
  "xo",
  "xp",
  "xq",
  "xr",
  "xs",
  "xt",
  "xu",
  "xv",
  "xw",
  "xx",
  "xy"
];

export default {
  created: function() {
    if (process.browser) {
      console.log(" -=-=-= mounted");
      var EventTarget = function() {
        this._listeners = {};
        this.bind = function(type, listener, ctx, priority) {
          if (typeof priority === "undefined") {
            priority = 0;
          }

          if (typeof listener !== "undefined" && listener !== null) {
            var obj = { callback: listener, context: ctx, priority: priority };
            var exists = false;
            var events;

            if (this._listeners[type] === undefined) {
              this._listeners[type] = [];
            }

            events = this._listeners[type];

            for (var i = 0; i < events.length; i++) {
              if (
                events[i].callback === listener &&
                events[i].context === ctx
              ) {
                exists = true;
                break;
              }
            }

            if (exists === false) {
              this._listeners[type].push(obj);
              this._listeners[type].sort(_sortByPriorityDesc);
            }
          }
        };

        var _sortByPriorityDesc = function(a, b) {
          return b.priority - a.priority; //causes an array to be sorted numerically and ascending
        };

        this.trigger = function(type, params, extra) {
          var events = this._listeners[type];
          params = params || {};
          if (typeof events !== "undefined") {
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              event.callback.call(event.context, {
                type: type,
                params: params,
                extra: extra || {}
              });
            }
          }
        };

        this.unbind = function(type, listener, ctx) {
          var index = -1;
          var events = this._listeners[type];
          if (typeof listener !== "undefined") {
            if (typeof events !== "undefined") {
              for (var i = 0; i < events.length; i++) {
                if (
                  events[i].callback === listener &&
                  events[i].context === ctx
                ) {
                  index = i;
                  break;
                }
              }

              if (index !== -1) {
                this._listeners[type].splice(index, 1);
              }
            }
          } else {
            this._listeners[type] = [];
          }
        };
      };

      var MP3ChunksPlayer = function() {
        EventTarget.call(this);
        var _self = this;
        var _activeBuffer;
        var _totalChunksLoaded = 0;
        var _context;
        var _audioBuffer;
        var _audioSource;
        var _request = new XMLHttpRequest();
        var _appendBuffer = function(buffer1, buffer2) {
          var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
          tmp.set(new Uint8Array(buffer1), 0);
          tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
          return tmp.buffer;
        };
        var _initializeWebAudio = function() {
          _context = new AudioContext();
        };

        var _play = function() {
          // Adding a bit of  scheduling so that we won't have single digit milisecond overlaps.
          // Thanks to Chris Wilson for his suggestion.
          var scheduledTime = 0.015;

          try {
            _audioSource.stop(scheduledTime);
          } catch (e) {}

          _audioSource = _context.createBufferSource();
          _audioSource.buffer = _audioBuffer;
          _audioSource.connect(_context.destination);
          var currentTime = _context.currentTime + 0.01 || 0;
          _audioSource.start(
            scheduledTime - 0.005,
            currentTime,
            _audioBuffer.duration - currentTime
          );
          _audioSource.playbackRate.value = 1;
          _self.trigger("message", ["AudioBuffer is replaced!"]);
        };

        var _onChunkLoaded = function() {
          console.log("Chunk loaded!");
          _self.trigger("message", ["Chunk loaded!"]);
          if (_totalChunksLoaded === 0) {
            _initializeWebAudio();
            _activeBuffer = _request.response;
          } else {
            _self.trigger("message", ["Chunk is appended!"]);
            _activeBuffer = _appendBuffer(_activeBuffer, _request.response);
          }

          // Use decodeAudioData so that we don't block the main thread.
          _context.decodeAudioData(_activeBuffer, function(buf) {
            _self.trigger("message", ["AudioData decoded!"]);
            _audioBuffer = buf;
            _play();
          });

          // If this is the first chunk then trigger play
          if (_totalChunksLoaded === 0) {
            _self.trigger("play");
          }

          _totalChunksLoaded++;
          if (_totalChunksLoaded < _files.length) {
            setTimeout(function() {
              _loadChunk(_totalChunksLoaded);
            }, 3000);
          }
        };

        var _loadChunk = function(index) {
          _self.trigger("message", ["Loading chunk", _files[index], "..."]);
          _request.open("GET", "chunks/" + _files[index], true);
          _request.send();
        };

        this.init = function() {
          log.innerHTML = 'MP3ChunksPlayer initialized' + "<br/>" + log.innerHTML;
          console.log("MP3ChunksPlayer initialized!");

          _request.responseType = "arraybuffer";
          _request.addEventListener("load", _onChunkLoaded, false);

          _loadChunk(_totalChunksLoaded);

          return this;
        };
      };

      var log = document.getElementById("log");
      // var vis = new Visualiser('visualiser').init();
      var pl = new MP3ChunksPlayer(log).init();
      
      var _onMessage = function(event) {
        log.innerHTML = event.params.join(" ") + "<br/>" + log.innerHTML;
      };
      var _onPlay = function() {
        //   vis.draw(pl.getVisualisationData());
        requestAnimationFrame(_onPlay);
      };
      pl.bind("play", _onPlay);
      pl.bind("message", _onMessage);
    }
  },
  data: function() {
    return {};
  },
  mounted() {
    Object.assign(window, this.sketch);
  },
  methods: {}
};
</script>

<style>
</style>
