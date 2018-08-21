<template>
    <div class="log-page">
        <Trigger @trigger="onToggleConsoleEv"></Trigger>
    </div>
</template>

<script>
  import Trigger from './widget/trigger/trigger'

  export default {
    name: "index",
    components: {
      Trigger
    },
    methods: {
      onToggleConsoleEv() {
        console.log('toggle')
      }
    }
  }
</script>

<style scoped lang="scss">
    .log-page {

    }
</style>