<template>
    <div class="trigger-widget">
        <Halo @click.native="onTriggerEv"></Halo>
    </div>
</template>

<script>
  import Halo from '../../service/halo/halo'
  export default {
    name: "trigger",
    data() {
      return {
        state: false
      }
    },
    components: {Halo},
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

    }
</style>