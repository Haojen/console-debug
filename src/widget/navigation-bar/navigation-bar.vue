<template>
    <div class="navigation-bar-widget use-flex is-center is-justify-between">
        <div class="flex-1 left-side use-flex is-align-center">
            <button class="active">Log</button>
            <button>Network</button>
            <button>Storage</button>
            <button>Performance</button>
        </div>
        <div class="right-side use-flex is-center" style="margin-right: 10px;">
            <button class="control use-flex is-center iconfont icon-youce wm-1"></button>
            <button class="control use-flex is-center iconfont icon-youce wm-2"></button>
            <button class="control use-flex is-center iconfont icon-youce wm-3"></button>
            <button class="control c-1" @click="onFullScreenEv"></button>
            <button class="control c-2" @click="onMinimizeEv"></button>
            <button class="control c-3" @click="onCloseEv"></button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "navigation-bar",
    methods: {
      onCloseEv(){
        this.$emit('close')
      },
      onMinimizeEv(){
        this.$emit('minimize')
      },
      onFullScreenEv(){
        this.$emit('fullscreen')
      },
    }
  }
</script>

<style scoped lang="scss">
    .navigation-bar-widget {
        height: 30px;
        width: 100%;
        background-color: rgba(255,255,255, .12);
        border-bottom: 1px solid rgba(255, 255, 255,.1);

        button {
            color: #fff;
        }

        .left-side {
            height: 100%;
            button {
                height: 100%;
            }
            .active {
                background-color: black;
            }
        }

        .right-side {
            .control {
                width: 15px;
                height: 15px;
                margin: 0 3px;
                border-radius: 50%;
            }
            .wm-1 {
                transform: rotate(-180deg);
            }

            .wm-2 {
                transform: rotate(90deg);
            }

            .wm-4 {
                transform: rotate(-90deg);
            }

            .c-1 {
                background-color: limegreen;
            }

            .c-2 {
                background-color: yellow;
            }

            .c-3 {
                background-color: red;
            }
        }
    }

    @media screen and(max-width: 480px){
        .navigation-bar-widget {
            .left-side {
                overflow-x: auto;
                &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }
            }
            .icon-youce {display: none}
        }
    }
</style>