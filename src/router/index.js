import Vue from 'vue'
import Home from '../pages/Home.vue'
import Sound from '../pages/Sound.vue'
import MicP5 from '../pages/MicP5.vue'
import MicAudioContext from '../pages/MicAudioContext.vue'
import AudioSys from '../pages/AudioSys.vue'
import Oscillator from '../pages/Oscillator.vue'
import RecordOscillator from '../pages/RecordOscillator.vue'
import MicP5MicDownload from '../pages/MicP5MicDownload.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function () {
  return new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Home },
      { path: '/Sound', component: Sound },
      { path: '/AudioSys', component: AudioSys },
      { path: '/Oscillator', component: Oscillator },
      { path: '/RecordOscillator', component: RecordOscillator },
      { path: '/MicP5MicDownload', component: MicP5MicDownload },
      { path: '/MicAudioContext', component: MicAudioContext },
      { path: '/MicP5', component: MicP5 }
    ]
  })
}
