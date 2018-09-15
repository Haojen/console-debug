<template>
    <div class="trigger-widget">
        <Halo @click.native="onTriggerEv" @dbclick.native="ondblClick"></Halo>
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
      },
      ondblClick() {
        console.log('dbl click')
      }
    }
  }
</script>