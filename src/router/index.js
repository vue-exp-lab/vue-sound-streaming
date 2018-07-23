import Vue from 'vue'
import Home from '../pages/Home.vue'
import Sound from '../pages/Sound.vue'
import Mic from '../pages/Mic.vue'
import AudioSys from '../pages/AudioSys.vue'
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
      { path: '/Mic', component: Mic }
    ]
  })
}
