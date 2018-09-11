import Vue from 'vue'

const bus = new Vue()

export default {
  on: {
    showConsole: callback => bus.$on('showConsole', callback),
    clearLogs: callback => bus.$on('clearLogs', callback),
    networkRequest: callback => bus.$on('NETWORK_REQUEST', callback)
  },
  emit: {
    clearLogs: () => bus.$emit('clearLogs'),
    showConsole: options => bus.$emit('showConsole', options),
    networkRequest: () => bus.$emit('networkRequest')
  }
}
