<template>
    <div class="timing-widget">
            asdasdasd1
    </div>
</template>

<script>
  export default {
    name: "timing",
    data() {
      return {
        entryTimingArray: []
      }
    },
    mounted() {
      this.entryTimingArray = window.performance.getEntries()
    }
  }
</script>

<style scoped>

</style>