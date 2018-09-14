<template>
    <div class="halo-widget"
         :class="['size-'+size, 'theme-'+theme, active]" v-halo="onHaloEv">
    </div>
</template>

<script>
  import directive from './directive'
  export default {
    name: "halo",
    directives: {
      halo: directive
    },
    data() {
      return {
        active: null,
      }
    },
    props: {
      size: {
        type: String,
        default: () => 'normal'
      },
      theme: {
        type: String,
        default: () => 'default'
      }
    },
    methods: {
      onHaloEv({state}) {
        switch (state) {
          case 'START':
            this.active = 'active'
            break;
          case 'MOVE':
            break;
          case 'END':
            this.active = 'inactive'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .halo-widget {
        border-radius: 50%;

        &.size-small {}
        &.size-normal {
            width: 50px;
            height: 50px;
        }
        &.size-large {}

        &.theme-default {
            $color1: rgb(224,224,224);
            $color2: rgb(238,238,238);
            $color3: rgb(245,245,245);
            /*border: 10px solid red;*/
            background: $color1;
            box-shadow: inset 0 0 0 7px $color2, 0 0 0 6px $color3;

            &.active {
                $color1: rgb(158,158,158);
                $color2: rgb(189,189,189);
                $color3: rgb(224,224,224);

                width: 55px;
                height: 55px;
                transition: background-color .8s, box-shadow .8s, width .8s, height .8s;

                background: $color1;
                box-shadow: inset 0 0 0 7px $color2, 0 0 0 6px $color3;
            }

            &.inactive {
                transition: background-color .8s,
                            box-shadow .8s,
                            width .8s,
                            height .8s,
                            transform .4s;
            }
        }
    }
</style>