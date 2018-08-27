import Vue from 'vue'

const bus = new Vue()

export default {
  on: {
    clearLogs: callback => bus.$on('clearLogs', callback),
    networkRequest: callback => bus.$on('NETWORK_REQUEST', callback)
  },
  emit: {
    clearLogs: () => bus.$emit('clearLogs'),
    networkRequest: () => bus.$emit('networkRequest')
  }
}
