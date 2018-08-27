<template>
    <div ref="windows" class="window-widget use-flex is-column" :class="{show}" v-resize>
        <header>
            <Header-bar :activeBar="currentPanel"
                            @windowClose="onWindowClose"
                            @windowMinimize="onWindowMinimize"
                            @windowFullscreen="onWindowFullscreen"
                            @activeNavbar="onActiveNavbarEv">
            </Header-bar>
        </header>
        <section class="flex-1">
            <Log v-show="currentPanel === 'log'" @logAmount="onLogAmountEv"></Log>
            <Network v-show="currentPanel === 'network'"></Network>
        </section>
        <footer>
            <Log-bar v-show="currentPanel === 'log'"
                     :logAmount="logAmount"
                     @clearLog="onClearLogsEv"></Log-bar>
        </footer>
    </div>
</template>

<script>
  import Log from '../log/log'
  import LogBar from '../footbar/logbar'
  import Network from '../network/network'
  import HeaderBar from '../navigation-bar/navigation-bar'
  export default {
    name: "window",
    components: {
      Log,
      LogBar,
      Network,
      HeaderBar
    },
    props: {
      show: Boolean,
    },
    data() {
      return {
        currentPanel: 'network',
        logAmount: {
          warn: 0,
          error: 0,
        },
      }
    },
    methods: {
      onWindowClose() {
        this.$emit('update:show', false)
      },
      onWindowMinimize() {
        this.$refs.windows.classList.toggle('window-minimize')
      },
      onWindowFullscreen() {
        this.$refs.windows.classList.toggle('window-full-screen')
      },
      onActiveNavbarEv(navbar) {
        this.currentPanel = navbar
      },
      onLogAmountEv(amount) {
        this.logAmount = amount
      },
      onClearLogsEv() {
        this.$bus.emit.clearLogs()
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
        transform: translateY(100vh);
        transition: translateY, width, height, .38s;
        background-color: rgba(0,0,0,.95);
        -webkit-overflow-scrolling: touch;

        &.show {
            will-change: auto;
            transform: translateY(0);
        }

        &.window-minimize {
            top: calc(100vh - 30px)!important;
        }

        &.window-full-screen {
            will-change: auto;
            top: 0!important;
            left: 0!important;
            width: 100vw!important;
            height: 100vh!important;
        }

        font-size: 16px;
        font-family: Consolas, Lucida Console, monospace;

        > section {
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