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
            width: 48px;
            height: 48px;
        }
        &.size-large {}

        &.theme-default {
            $spacing: 7px;

            $color1: rgb(97,97,97);
            $color2: rgb(117,117,117);
            $color3: rgb(158,158,158);

            opacity: 0.7;
            background: $color1;
            border: $spacing solid $color2;
            box-shadow: 0 0 0 $spacing $color3;

            &.active {

                width: 55px;
                height: 55px;

                transition: background-color .8s,
                box-shadow .8s, width .8s, height .8s, opacity 0.4s;

                opacity: 1;
                background: $color1;
                border: $spacing solid $color2;
                box-shadow: 0 0 0 $spacing $color3;
            }

            &.inactive {
                transition: background-color .8s,
                            box-shadow .8s,
                            width .8s,
                            height .8s,
                            transform .4s, opacity 0.8s;
            }
        }
    }
</style>