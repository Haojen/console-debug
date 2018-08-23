<template>
    <div class="trigger-widget">
        <button @click="onTriggerEv"></button>
    </div>
</template>

<script>
  export default {
    name: "trigger",
    methods: {
      onTriggerEv() {
        this.$emit('trigger')
      }
    }
  }
</script>

<style scoped lang="scss">
    .trigger-widget {
        border: none;
        outline: none;
        background: none;

        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: orange;
        button {
            width: 100%;
            height: 100%;
        }
    }
</style>