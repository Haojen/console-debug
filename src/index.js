import Vue from 'vue'
// import App from './App'
import App from './index.vue'
import '../static/css/index.scss'
import bus from './service/bus'

import './directive/index'

Vue.prototype.$bus = bus

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})