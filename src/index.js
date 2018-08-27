import Network from './service/network'
import Vue from 'vue'
// import App from './App'
import App from './index.vue'
import '../static/css/index.scss'
import bus from './service/bus'

import './directive/index'

new Network()

Vue.prototype.$bus = bus

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})