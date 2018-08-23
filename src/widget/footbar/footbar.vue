<template>
    <div class="footbar-widget use-flex is-center is-full-height is-full-width">
        <Log v-if="bar === 'log'" @clear="onClearEvt"></Log>
    </div>
</template>

<script>
  import Log from './logbar'
  export default {
    name: "footbar",
    props: {
      activeBar: {
        type: String,
        default: () => 'log'
      },
      whiteList: {
        type: Array,
        default: () => ['log']
      }
    },
    components: {Log},
    computed: {
      bar() {
        return this.whiteList.includes(this.activeBar) ? this.activeBar : false
      }
    },
    methods: {
      onClearEvt() {
        this.$emit('clearLog')
      }
    }
  }
</script>

<style scoped lang="scss">
    .footbar-widget {
        width: 100%;
        height: 26px;
        padding: 0 8px;
    }
</style>