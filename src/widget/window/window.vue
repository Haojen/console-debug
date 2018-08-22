<template>
    <div class="window-widget debug" v-resize>
        <Navigation-bar></Navigation-bar>
    </div>
</template>

<script>
  import NavigationBar from '../navigation-bar/navigation-bar'
  export default {
    name: "window",
    components: {
      NavigationBar
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