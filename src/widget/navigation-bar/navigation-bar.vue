<template>
    <div class="navigation-bar-widget use-flex is-center is-justify-between">
        <div class="flex-1 left-side is-full-height use-flex is-align-center">
            <button class="is-full-height"
                    v-for="feature in Features"
                    :class="activeFeature === feature.id && 'active'"
                    v-text="feature.name" @click="onSwitchFeatureEv(feature.id)"></button>
        </div>
        <div class="right-side use-flex is-center" style="margin-right: 10px;">
            <!--<button class="control use-flex is-center iconfont icon-youce wm-1"></button>-->
            <!--<button class="control use-flex is-center iconfont icon-youce wm-2"></button>-->
            <!--<button class="control use-flex is-center iconfont icon-youce wm-3"></button>-->
            <button class="control c-1" @click="onFullScreenEv"></button>
            <button class="control c-3" @click="onCloseEv"></button>
        </div>
    </div>
</template>

<script>
  import NavConfig from './feature.config'
  export default {
    name: "navigation-bar",
    data() {
      return {
        Features: NavConfig,
        activeFeature: this.activeBar
      }
    },
    props: {
      activeBar: {
        type: String,
        default: () => 'log'
      }
    },
    methods: {
      onCloseEv(){
        this.$emit('windowClose')
      },
      onFullScreenEv(){
        this.$emit('windowFullscreen')
      },
      onSwitchFeatureEv(feature) {
        // console.log(feature)
        this.activeFeature = feature
        this.$emit('activeNavbar', feature)
      }
    }
  }
</script>

<style scoped lang="scss">
    .navigation-bar-widget {
        height: 30px;
        width: 100%;
        user-select: none;
        background-color: rgba(255,255,255, .16);

        .left-side {
            button {
                color: #c4c4c4;
                padding: 0 10px;
                font-size: 15px;
            }
            .active {
                color: #fff;
                background-color: black;
            }
        }

        .right-side {
            .control {
                padding: 0;
                width: 20px;
                height: 20px;
                margin: 0 6px;
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