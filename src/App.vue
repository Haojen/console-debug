<template>
    <div>
        <!--\Kashmir-->
        <Windows></Windows>
        <component :is="trigger"></component>
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
      }
    },
    mounted() {
      const {trigger} = this.$config

      this.trigger = trigger + 'Trigger'
    }
  }
</script>