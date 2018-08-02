<template>
  <div>
    <h1>@bigear/microphone-recorder</h1>

    <p> npm : <a href='https://www.npmjs.com/package/@bigear/microphone-recorder'>https://www.npmjs.com/package/@bigear/microphone-recorder </a> </p>

    <!-- Draw the action buttons -->
    <button id='start-btn' v-on:click='handleClickStart'>Start recording</button>
    <button id='stop-btn' v-on:click='handleClickStop' disabled>Stop recording</button>

    <ul id='recordingslist'></ul>
  </div>
</template>

<script>
import Recorder from '@bigear/microphone-recorder'
const DEFAULT_AUDIO_FORMAT = 'audio/wav'

export default {
  data: function() {
    return {
      audio_stream: null,
      audio_context: null,
      recorder: null
    }
  },
  mounted() {
    this.Initialize()
  },
  methods: {
    Initialize: function() {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        window.URL = window.URL || window.webkitURL
        this.audio_context = new AudioContext()
      } catch (e) {
        alert('No web audio support in this browser!')
      }
    },
    stopRecording: function(callback) {
      const { recorder, audio_stream } = this
      recorder && recorder.stop()
      audio_stream.getAudioTracks()[0].stop()

      // Disable Stop button and enable Record button !
      document.getElementById('start-btn').disabled = false
      document.getElementById('stop-btn').disabled = true

      if (typeof callback == 'function') {
          recorder.exportWAV(DEFAULT_AUDIO_FORMAT, function(blob) {
            callback(blob)
            recorder.clear()
          })
      }
    },
    appendBlobToListItem: function(AudioBLOB) {
      const url = URL.createObjectURL(AudioBLOB)
      const li = document.createElement('li')
      const au = document.createElement('audio')
      const hf = document.createElement('a')

      au.controls = true
      au.src = url
      hf.href = url
      hf.download = new Date().toISOString() + '.wav'
      hf.innerHTML = hf.download
      li.appendChild(au)
      li.appendChild(hf)
      document.getElementById('recordingslist').appendChild(li)
    },
    handleClickStop: function() {
      this.stopRecording(this.appendBlobToListItem)
    },
    handleClickStart: function() {
      const { audio_context } = this
      navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStreamObject)=>{
          this.audio_stream = mediaStreamObject
          const input = audio_context.createMediaStreamSource(mediaStreamObject)
          const recorder = new Recorder(input)
          recorder && recorder.record()
          this.recorder = recorder
          document.getElementById('start-btn').disabled = true
          document.getElementById('stop-btn').disabled = false
      })
    }
  },
  asyncData({ store }) {}
}
</script>

<style>
ul {
  list-style: none;
}

#recordingslist audio {
  display: block;
  margin-bottom: 10px;
}
</style>
