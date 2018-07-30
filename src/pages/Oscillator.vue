<template>
  <div>
    <h1>Audio sys</h1>
    <pre> Log: </pre>
    <button v-on:click="handleClick">Make white noise</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      channels: null,
      audioCtx: null,
      frameCount: null,
    }
  },
  mounted() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  },
  methods: {
    playSoundOnce: function(genArrayBuffer){
    },
    initGain: function(){
        const {audioCtx} = this
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = 0.1;
        return gainNode
    },
    initOscillator: function(gainNode){
        const {audioCtx} = this
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.value = 100; // value in hertz
        oscillator.connect(gainNode);
        oscillator.start(0);
        // audioCtx.suspend();
    },
    handleClick: function() {
        const {audioCtx} = this

        // Make noise, sweet noise
        // connect oscillator to gain node to speakers
        const gainNode = this.initGain()
        this.initOscillator(gainNode)

        // if(audioCtx.state === 'running') {
        //     return audioCtx.suspend()
        // } else if(audioCtx.state === 'suspended') {
        //     return audioCtx.resume()
        // }
    }
  },
  computed: {},
  asyncData({ store }) {}
};
</script>