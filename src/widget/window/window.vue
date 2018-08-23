<template>
    <div class="window-widget use-flex is-column" :class="show && 'show'" v-resize>
        <header>
            <Navigation-bar :activeNavbar="defaultActiveNavbar"
                            @windowClose="onWindowClose"
                            @windowMinimize="onWindowMinimize"
                            @windowFullscreen="onWindowFullscreen"
                            @activeNavbar="onActiveNavbarEv">
            </Navigation-bar>
        </header>
        <section class="flex-1">
            <Log></Log>
        </section>
    </div>
</template>

<script>
  import NavigationBar from '../navigation-bar/navigation-bar'
  import Log from '../log/log'
  export default {
    name: "window",
    components: {
      NavigationBar,
      Log
    },
    props: {
      show: Boolean,
    },
    data() {
      return {
        defaultActiveNavbar: 'network'
      }
    },
    methods: {
      onWindowClose() {
        this.$emit('update:show', false)
      },
      onWindowMinimize() {
        console.log('m')
      },
      onWindowFullscreen() {
        console.log('f')
      },
      onActiveNavbarEv(navbar) {
        console.debug(navbar,'navbar')
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
        transition: transform .68s;
        background-color: rgba(0,0,0,.95);
        -webkit-overflow-scrolling: touch;

        &.show {
            transform: translateY(0);
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