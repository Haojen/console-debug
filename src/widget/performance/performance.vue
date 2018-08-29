<template>
    <div class="performance-widget">
        <FPS></FPS>
    </div>
</template>

<script>
  import FPS from '../fps/fps'
  export default {
    name: "performance",
    components: {FPS}
  }
</script>

<style scoped>

</style>