<template>
    <div ref="windows" class="window-widget use-flex is-column" :class="show && 'show'" v-resize>
        <header class="is-relative">
            <Header-bar :activeBar="currentPanel"
                            @windowClose="onWindowClose"
                            @windowFullscreen="onWindowFullscreen"
                            @activeNavbar="onActiveNavbarEv">
            </Header-bar>
        </header>
        <section class="flex-1 is-relative">
            <Log v-show="currentPanel === 'log'"></Log>
            <Network v-show="currentPanel === 'network'"></Network>
            <Timing v-show="currentPanel === 'timing'"></Timing>
            <Storage v-show="currentPanel === 'storage'"></Storage>
            <Performance v-show="currentPanel === 'performance'"></Performance>
        </section>
    </div>
</template>

<script>
  import Log from '../log/log'
  import Timing from '../timing/timing'
  import Network from '../network/network'
  import Storage from '../storage/storage'
  import Performance from '../performance/performance'
  import HeaderBar from '../navigation-bar/navigation-bar'
  export default {
    name: "window",
    components: {
      Log,
      Timing,
      Network,
      Storage,
      HeaderBar,
      Performance
    },
    data() {
      return {
        show: true,
        currentPanel: 'log',
      }
    },
    methods: {
      onWindowClose() {
        this.show = false
      },
      onWindowFullscreen() {
        this.$refs.windows.classList.toggle('window-full-screen')
      },
      onActiveNavbarEv(navbar) {
        this.currentPanel = navbar
      },
    },
    created() {
      this.$bus.on.showConsole( () => this.show = !this.show)
    }
  }
</script>

<style lang="scss" scoped>
    .window-widget {
        position: fixed;
        left: 0;
        top: 55vh;
        z-index: 1;
        width: 100vw;
        height: 45vh;

        color: #ffffff;
        font-size: 16px;
        transform: translateY(100vh);
        background-color: rgba(0,0,0,.9);
        -webkit-overflow-scrolling: touch;
        font-family: Consolas, Lucida Console, monospace;

        &.show {
            will-change: auto;
            transform: translateY(0);
        }

        &.window-full-screen {
            will-change: auto;
            top: 0!important;
            left: 0!important;
            width: 100vw!important;
            height: 100vh!important;
            transition:width, height, .38s;
        }

        > header {
            z-index: 1;
        }
        > section {
            z-index: 1;
            overflow: auto;
        }
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