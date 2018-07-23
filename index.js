var main = require('./components/main.vue')
module.exports =  {
    install(Vue, options) {
        Vue.component('zenlog', main.default)
    }
}
