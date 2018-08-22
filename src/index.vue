<template>
    <div class="log-page debug">
        <Trigger @trigger="onToggleConsoleEv"></Trigger>
        <Windows></Windows>
    </div>
</template>

<script>
  import Trigger from './widget/trigger/trigger'
  import Windows from './widget/window/window'

  export default {
    name: "index",
    components: {
      Trigger,
      Windows
    },
    methods: {
      onToggleConsoleEv() {
        console.log('toggle')
      },
    }
  }
</script>

<style scoped lang="scss">
    .log-page {
        height: 100vh;
        background-color: gray;
    }
</style>