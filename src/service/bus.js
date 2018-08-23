import Vue from 'vue'

const bus = new Vue()

export default {
  on: {
    clearLogs: callback => bus.$on('clearLogs', callback),

  },
  emit: {
    clearLogs: () => bus.$emit('clearLogs')
  }
}
