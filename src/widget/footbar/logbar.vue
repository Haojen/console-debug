<template>
    <div class="footbar-log-widget is-full-height is-full-width use-flex is-align-center is-justify-between">
        <div>
            <button @click="onClearEv"><i class="iconfont icon-clear"></i></button>
        </div>
        <div>
            <i class="iconfont icon-cuowu"></i>
            <span v-text="logAmount.error"></span>
            <i class="iconfont icon-jinggao1"></i>
            <span v-text="logAmount.warn"></span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "log",
    props: {
      logAmount: {
        type: Object,
        default: () => ({warn: 0, error: 0})
      }
    },
    methods: {
      onClearEv() {
        this.$emit('clearLog')
      }
    }
  }
</script>

<style scoped lang="scss">
    .footbar-log-widget {
        width: 100%;
        height: 26px;
        padding: 0 8px;

        .icon-clear {
            color: #C4C4C4;
        }
        .icon-cuowu {
            color: red;
        }

        .icon-jinggao1 {
            color: yellow;
        }
    }
</style>