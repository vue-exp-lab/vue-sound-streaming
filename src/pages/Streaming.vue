 <template>
 <div>

    <h1> streaming </h1>
    <sound-canvas
        v-if="audioContext"
        v-bind:audioContext="audioContext"
    />
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
import axios from 'axios'
import SoundCanvas from '../components/SoundCanva.vue'

const headers = () => ({ responseType: 'arraybuffer'})
export default {
  name: 'streaming',
  components: { SoundCanvas },
  mounted() {
    console.log(" -=-=-= mounted");
    if (process.browser) {
      console.log(" -=-=-= mounted");

      this.audioContext = new AudioContext();
        // const initDrawSound = this.initDrawSound
        // const drawSound = this.drawSound

      this.log = document.getElementById("log");

      this.index = 0 
      
      return this.load(0).then(()=> {
            this.index = 1
            return this.load(1);
        })


    //   const _onMessage = function(event) {
    //     log.innerHTML = event.params.join(" ") + "<br/>" + log.innerHTML;
    //   };
    //   const _onPlay = function() {
    //     //   vis.draw(pl.getVisualisationData());
    //     requestAnimationFrame(_onPlay);
    //   };
    //   pl.bind("play", _onPlay);
    //   pl.bind("message", _onMessage);
    }
  },
  data: function() {
    return {
        audioContext: null,
        log: null,
        rawChunk: null,
        chunk: null
    };
  },
  methods: {
    loadChunk: function(buffer1, buffer2) {
        console.log('1.3 -=-=-=-=-=-=-=-= ') 

          const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

        console.log('1.3.1 -=-=-=-=-=-=-=-= ') 
          tmp.set(new Uint8Array(buffer1), 0);
                  console.log('1.3.2 -=-=-=-=-=-=-=-= ') 

          tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
                  console.log('1.3.3 -=-=-=-=-=-=-=-= ') 

          return tmp.buffer;
    },
    load: function(index) {
        const appendLog = this.appendLog
        const audioContext = this.audioContext
        let tempChunk

        appendLog('MP3ChunksPlayer initialized')
        return axios.get(`/chunks/${_files[index]}`, headers())
        .then((res)=>{
            appendLog(`Chunk loaded! files[${index}]:${_files[index]}`)
            // tempChunk = res.data.slice(0)

            if(index ===0) {
                this.chunk = res.data.slice(0)
                this.$set(this, 'chunk', res.data.slice(0))
            }
            else {
                this.$set(this, 'chunk', this.loadChunk(this.chunk, res.data.slice(0)))
            }
            return audioContext.decodeAudioData(this.chunk)
        }).then(buf => {
            // this.$set(this, 'chunk', tempChunk)

            appendLog(`Decoded! files[${index}]:${_files[index]}`)
            const _audioSource = audioContext.createBufferSource();
            _audioSource.buffer = buf;
            _audioSource.connect(audioContext.destination);
            _audioSource.start();
        })
    },
    appendLog: function(msg){
        return this.log.innerHTML = log.innerHTML + msg + "<br/>";
    }

  }
};
</script>

<style>
</style>
