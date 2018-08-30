<template>
    <div ref="fpsWidget" class="fps-widget is-full-width is-full-height">
    </div>
</template>

<script>
  import Chart from 'chart.js'
  import Stats from '../../../lib/stats'
  export default {
    name: "fps",
    data(){
      return {

      }
    },
    methods: {
      getFPS() {
        this.stats.begin()
        this.stats.end()
        window.requestAnimationFrame(this.getFPS)
      },
    },
    mounted() {
      const fpsWidget = this.$refs.fpsWidget,
        {width, height} = fpsWidget.getBoundingClientRect()
      this.stats = new Stats(width, height)
      this.stats.showPanel(0)
      fpsWidget.appendChild(this.stats.dom)
      this.getFPS()
    }
  }
</script>

<style scoped lang="scss">
    .fps-widget {
        canvas {
            /*transform: rotateX(180deg);*/
            /*transform: rotateY(180deg);*/
        }
    }
</style>