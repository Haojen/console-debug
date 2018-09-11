<template>
    <div id="__KASHMIR">
        <!--\Kashmir-->
        <component :is="trigger"></component>
        <Windows :show.sync="showWindow"></Windows>
    </div>
</template>

<script>
  import Windows from './widget/window/window'
  import defaultTrigger from './widget/trigger/trigger'

  export default {
    name: "index",
    components: {
      Windows,
      defaultTrigger
    },
    data() {
      return {
        trigger: null,
        showWindow: false,
      }
    },
    mounted() {
      const {trigger} = this.$config

      this.trigger = trigger + 'Trigger'
      console.log(this.trigger, 'trigger')
      this.$bus.on.showConsole( ({state}) => {
        this.showWindow = state
        console.log('get show console command', state)
      })
    }
  }
</script>