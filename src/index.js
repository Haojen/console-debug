import Vue from 'vue'
// import App from './App'
import App from './index.vue'
import '../static/css/index.scss'

import './directive/index'

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})