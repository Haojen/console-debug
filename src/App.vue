<template>
    <div id="__RADGE_DEBUG">
        <Windows :show.sync="showWindow"></Windows>
    </div>
</template>

<script>
  import Windows from './widget/window/window'

  export default {
    name: "index",
    components: {
      Windows
    },
    data() {
      return {
        showWindow: false,
      }
    },
    mounted() {
      console.log('mounted  .log-page')
      this.$bus.on.showConsole( ({state}) => {
        this.showWindow = state
        console.log('get show console command', state)
      })
    }
  }
</script>

<style scoped lang="scss">
    .log-page {
        /*background-color: gray;*/
    }
</style>