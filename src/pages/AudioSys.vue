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
    this.channels = 2;  // Stereo
    this.frameCount = this.audioCtx.sampleRate * 2; // 2second
  },
  methods: {
    playSoundOnce: function(genArrayBuffer){
      const {audioCtx} = this
      // Get an AudioBufferSourceNode.
      const source = audioCtx.createBufferSource();
      source.buffer = genArrayBuffer;
      source.connect(audioCtx.destination);
      source.start();
      // start() can only play once
      source.onended = (event) => {
          document.querySelector('pre').innerHTML = `Source Onended<br />` + document.querySelector('pre').innerHTML
      }
    },
    manipulateArrayBuffer: function(genArrayBuffer){
      const {channels, frameCount} = this
      for (let channel = 0; channel < channels; channel++) {
        const nowBuffering = genArrayBuffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
          nowBuffering[i] = Math.random() * 2 - 1;
          // Math.random() is in [0; 1.0]
          // audio needs to be in [-1.0; 1.0]
        }
      }
    },
    handleClick: function() {
        const {audioCtx, channels, frameCount} = this
        const genArrayBuffer = audioCtx.createBuffer(
            channels,
            frameCount,
            audioCtx.sampleRate
        );
        this.manipulateArrayBuffer(genArrayBuffer)
        
      this.playSoundOnce(genArrayBuffer)
    }
  },
  computed: {},
  asyncData({ store }) {}
};
</script>