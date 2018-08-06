 <template>
    <div>
        <div class="audioList" :style="audioListHeightStyle">
            <ul id='recordingslist'>
                <li v-for="(audioItem, index) in audioList">
                    <span> {{ index + 1 }}.</span>
                    <audio
                        controls
                        controlsList="play timeline nodownload novolume"
                        v-bind:src="audioItem.url"/> 
                    <a
                        v-bind:href="audioItem.url"
                        v-bind:download="new Date().toISOString() + '.wav'"
                    > Download </a>
                </li>
            </ul>
        </div>
        <div id="canvas-container" />
        <div class="buttonDiv" :style="buttonDivHeightStyle">
            <button v-on:click="handleClick">
                {{ (status==='recording')? 'Stop' : 'Start'}}
            </button>
        </div>
    </div>
</template>

<script>
 /* eslint-disable */

import P5Base from '../mixin/P5';
import convertBufferToWav from '@bigear/convertbuffertowav';
const DEFAULT_CANVAS_HEIGHT = 150
const DEFAULT_BUTTON_HEIGHT = 80
export default {
  extends: {mixins: [P5Base]},
  computed: {
    audioListHeightStyle: function () {
      const winHeight = (process.browser && window.innerHeight) || 500
      const divHeight = winHeight - DEFAULT_CANVAS_HEIGHT - DEFAULT_BUTTON_HEIGHT
      return {
        height: `${divHeight}px`
      }
    },
    buttonDivHeightStyle: function(){
      return {
        height: `${DEFAULT_BUTTON_HEIGHT}px`
      }
    }
  },
  data: function(){
    return {
        status: null,
        mic : null,
        recorder : null,
        soundFile : null,
        fft: null,
        audioList: []
    }
  },
  mounted() {
    if (process.browser) {
        Object.assign(window, this.sketch)
        this.canvasW = window.innerWidth || 200
        this.canvasH = DEFAULT_CANVAS_HEIGHT
        this.status = 'stop'
    }
  },
  methods: {
    setup: function(){
        this.canvasEle = createCanvas(this.canvasW, this.canvasH);
        this.canvasEle.parent('canvas-container');
    },
    handleClick: function(){
        const {status} = this
        this.status = 'recording'
        
        if(status === 'stop')
            return this.handleStart()
        
        if(status === 'recording')
            return this.handleStop()

        console.error('unknown status')
    },

    handleStart: function(){
        this.status = 'recording'

        this.mic = new p5.AudioIn();
        this.mic.start();
        
        this.recorder = new p5.SoundRecorder();
        this.recorder.setInput(this.mic);
        this.soundFile = new p5.SoundFile();

        this.fft = new p5.FFT();
        this.fft.setInput(this.mic);

        this.recorder.record(this.soundFile);
        // background(255,0,0);
        text('Recording now! Click to stop.', 20, 20);
    },
    handleStop: function(){
        this.status = 'stop'
        this.recorder.stop(); // stop recorder, and send the result to soundFile
        this.appendAudioToList()
    },
    appendAudioToList: function(){
        this.soundFile.play(); // play the result!

        const {buffer} = this.soundFile.bufferSourceNode
        // console.log(buffer.getChannelData(1))

        const dataview = convertBufferToWav(buffer.getChannelData(0))
        const audioBlob = new Blob([dataview], {type: 'audio/wav'})

        const url = URL.createObjectURL(audioBlob)
        this.audioList.push({
            url,
            blob: audioBlob
        })

        // const li = document.createElement('li')
        // const au = document.createElement('audio')
        // const hf = document.createElement('a')

        // au.controls = true
        // au.src = url
        // hf.href = url
        // hf.download = new Date().toISOString() + '.wav'
        // hf.innerHTML = hf.download
        // li.appendChild(au)
        // li.appendChild(hf)
        // document.getElementById('recordingslist').appendChild(li)
        // saveSound(this.soundFile, 'mySound.wav'); // save file
    },
    draw: function(){
        background(200);
        noFill();
        
        if(this.status === 'recording') {
            const {canvasW, fft} = this
            const spectrum = fft.analyze();
            const SPECTRUM_LENGTH = spectrum.length
            const MAX = 15

            beginShape();
            for (let i = 0; i<MAX; i++) {
                const index = Math.floor(map(i, 0, MAX, 0, SPECTRUM_LENGTH))
                const x = Math.floor(map(i, 0, MAX, 0, canvasW))
                const _h = map(spectrum[index], 0, 255, DEFAULT_CANVAS_HEIGHT, 0)
                vertex(x, _h );
            }
            endShape();
        }
    },
  }

}
</script>
<style>
body {
    margin: 0;
}
.buttonDiv {
    bottom: 0;
    position: fixed;
    display: flex;
    width: 100%;
}
.buttonDiv button{
    flex-grow: 1;
    font-size: 50px;
}

#canvas-container {
    position: fixed;
    bottom: 80px;
    margin: 0;
    padding: 0;
}

.audioList{
    overflow: scroll;
}

.audioList ul{
    background:#f1f3f4;
    width: 100%;
    margin: 0;
    padding: 0;
}
.audioList ul li{
    display: flex;
    line-height: 50px;
    border-bottom: solid 1px lightgray;
}
.audioList ul li span{
    margin-left: 10px;
    color: gray;
}
.audioList ul li a{
    text-decoration: none;
    color: darkslategrey;
}

.audioList ul li audio{
}


</style>
