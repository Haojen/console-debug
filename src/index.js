import xhook from 'xhook'
import Vue from 'vue'
// import App from './App'
import App from './index.vue'
import bus from './service/bus'

import '../static/css/index.scss'
import './directive/index'

Vue.prototype.$bus = bus
Vue.prototype.$xhook = xhook

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})