<template>
    <div class="window-widget debug" v-resize>
        <Navigation-bar @windowClose="onWindowClose"
                        @windowMinimize="onWindowMinimize"
                        @windowFullscreen="onWindowFullscreen">
        </Navigation-bar>
    </div>
</template>

<script>
  import NavigationBar from '../navigation-bar/navigation-bar'
  export default {
    name: "window",
    components: {
      NavigationBar
    },
    methods: {
      onWindowClose() {
        console.log('c')
      },
      onWindowMinimize() {
        console.log('m')
      },
      onWindowFullscreen() {
        console.log('f')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .window-widget {
        position: fixed;
        top: 55vh;
        left: 0;
        width: 100vw;
        height: 45vh;
        color: #ffffff;
        background-color: rgba(0,0,0,.95);
    }

    @media screen and (max-width: 480px){
        .window-widget {

        }
    }

    @media screen and (max-width: 1408px){
        .window-widget {
            left: 0;
            top: 55vh;
            width: 100vw;
            height: 45vh;
        }
    }

</style>