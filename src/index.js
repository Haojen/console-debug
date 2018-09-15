import Vue from 'vue'
import xhook from 'xhook'
import App from './App.vue'
import bus from './service/bus'

import '../static/css/iconfont.scss'
import '../static/css/index.scss'
import './directive/index'

Vue.prototype.$bus = bus
Vue.prototype.$xhook = xhook


Vue.prototype.$config = {
  theme: 'default',
  trigger: 'default',
}

new Vue({
  el: '#__DEBUG',
  components: {App},
  template: '<App/>',
})

export default class {
  constructor({el, trigger, theme}) {

    Vue.prototype.$config = {
      theme,
      trigger,
    }

    new Vue({
      el,
      components: {App},
      template: '<App/>',
    })
  }

  show(config) {
    console.log('run show func',config)
    bus.emit.showConsole({
      state: config.state,
    })
  }
}