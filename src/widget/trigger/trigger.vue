<template>
    <div class="trigger-widget">
        <button @click="onTriggerEv"></button>
    </div>
</template>

<script>
  export default {
    name: "trigger",
    data() {
      return {
        state: false
      }
    },
    methods: {
      onTriggerEv() {
        this.$bus.emit.showConsole({
          state: this.state = !this.state
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .trigger-widget {
        position: fixed;
        right: 0;
        bottom: 200px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: orange;
        button {
            width: 100%;
            height: 100%;
        }
    }
</style>