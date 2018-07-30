<template>
  <div>
    <h1>Audio sys</h1>
    <pre> Log: </pre>
    <button v-on:click="handleClick">Make white noise</button>

    <audio controls></audio>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      audioCtx: null,
      mediaRecorder: null,
      chunks: [],
      oscillator: null
    }
  },
  mounted() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  },
  methods: {
    playSoundOnce: function(genArrayBuffer){
    },
    initMediaRecorder: function(dest){
        const {chunks} = this
        this.mediaRecorder = new MediaRecorder(dest.stream);

        this.mediaRecorder.ondataavailable = function(evt) {
            chunks.push(evt.data);
        };

        this.mediaRecorder.onstop = function(evt) {
            const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            document.querySelector("audio").src = URL.createObjectURL(blob);
        };

        return this.mediaRecorder
    },
    handleClick: function(e) {
        const {audioCtx, oscillator} = this
        if(!oscillator){
            const dest = audioCtx.createMediaStreamDestination();

            const osc = audioCtx.createOscillator();
            osc.connect(dest);
            osc.start(0);

            const mediaRecorder = this.initMediaRecorder(dest)
            mediaRecorder.start();

            this.oscillator = osc
        }
        else if(audioCtx && audioCtx.state === 'running'){
           const {mediaRecorder} =this
           mediaRecorder.requestData();
           mediaRecorder.stop();
           this.oscillator.stop(0);
           e.target.disabled = true;
        }



    }
  },
  computed: {},
  asyncData({ store }) {}
};
</script>